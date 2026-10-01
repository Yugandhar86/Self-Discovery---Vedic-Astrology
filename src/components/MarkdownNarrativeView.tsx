import React, { useState } from 'react';
import { Check, Copy, Eye, FileText } from 'lucide-react';
import { KarmicSynthesisResult } from '../types/jyotish';

interface MarkdownNarrativeViewProps {
  result: KarmicSynthesisResult;
  heroImagePath: string;
}

function renderInlineFormatting(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith('**') && tok.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-stone-900">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) {
      return (
        <em key={i} className="italic text-stone-800">
          {tok.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}

function renderMarkdownSection(markdown: string, sectionIndex: number) {
  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let isFirstParagraphAfterH2 = false;
  let listItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`${keyPrefix}-list-${elements.length}`}
          className="my-5 space-y-3 border-l-2 border-[#9A3412]/40 pl-5"
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="text-[16px] leading-[1.8] text-stone-800">
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList(`sec-${sectionIndex}-${i}`);
      continue;
    }

    if (line === '---') {
      flushList(`sec-${sectionIndex}-${i}`);
      elements.push(
        <hr key={`hr-${i}`} className="my-8 border-t border-stone-300" />
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushList(`sec-${sectionIndex}-${i}`);
      const headingText = line.slice(3).trim();
      isFirstParagraphAfterH2 = true;
      elements.push(
        <div
          key={`h2-${i}`}
          id={`report-section-${sectionIndex + 1}`}
          className="border-b border-stone-300 pb-4 mb-6 pt-2 scroll-mt-24"
        >
          <p className="text-xs uppercase tracking-widest text-[#9A3412] mb-1">
            Chapter 0{sectionIndex + 1} · Karmic Trajectory
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight text-balance">
            {headingText}
          </h2>
        </div>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      flushList(`sec-${sectionIndex}-${i}`);
      const h3Text = line.slice(4).trim();
      const isLayman = h3Text.toLowerCase().includes('layman') || h3Text.toLowerCase().includes('plain-english');
      elements.push(
        <div
          key={`h3-${i}`}
          className={`mt-8 mb-4 ${
            isLayman ? 'bg-[#F3EFE6] p-4 border-l-4 border-[#9A3412]' : ''
          }`}
        >
          {isLayman && (
            <span className="text-[11px] uppercase tracking-widest text-[#9A3412] font-semibold block mb-1">
              Plain-English Deep-Dive · Grounded Translation
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 text-balance">
            {renderInlineFormatting(h3Text)}
          </h3>
        </div>
      );
      continue;
    }

    if (line.startsWith('#### ')) {
      flushList(`sec-${sectionIndex}-${i}`);
      const h4Text = line.slice(5).trim();
      elements.push(
        <h4
          key={`h4-${i}`}
          className="text-lg font-semibold text-stone-900 mt-6 mb-2"
        >
          {renderInlineFormatting(h4Text)}
        </h4>
      );
      continue;
    }

    if (line.startsWith('> ')) {
      flushList(`sec-${sectionIndex}-${i}`);
      const quoteText = line.slice(2).trim();
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 py-4 px-6 bg-[#F3EFE6] border-l-2 border-[#9A3412] font-display text-xl italic text-stone-900 leading-relaxed"
        >
          {renderInlineFormatting(quoteText)}
        </blockquote>
      );
      continue;
    }

    if (line.startsWith('- ') || /^\d+\.\s+/.test(line)) {
      const cleanedItem = line.replace(/^(-|\d+\.)\s+/, '');
      listItems.push(cleanedItem);
      continue;
    }

    flushList(`sec-${sectionIndex}-${i}`);

    const dropCapClass = isFirstParagraphAfterH2 ? 'editorial-dropcap' : '';
    isFirstParagraphAfterH2 = false;

    elements.push(
      <p
        key={`p-${i}`}
        className={`text-[16.5px] leading-[1.85] text-stone-800 my-4 max-w-[72ch] ${dropCapClass}`}
      >
        {renderInlineFormatting(line)}
      </p>
    );
  }

  flushList(`sec-${sectionIndex}-end`);
  return elements;
}

export const MarkdownNarrativeView: React.FC<MarkdownNarrativeViewProps> = ({
  result,
  heroImagePath,
}) => {
  const [viewMode, setViewMode] = useState<'editorial' | 'markdown'>('editorial');
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(result.fullMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const scrollToSection = (num: number) => {
    const el = document.getElementById(`report-section-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const ketu = result.planets.find((p) => p.id === 'Ketu')!;
  const rahu = result.planets.find((p) => p.id === 'Rahu')!;

  return (
    <div className="space-y-10">
      {/* Editorial Masthead */}
      <div className="border-b border-stone-300 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 uppercase tracking-widest mb-3">
          <div>
            <span>Bespoke Karmic Trajectory & Behavioral Monograph</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{result.input.placeOfBirth}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{result.input.dateOfBirth} at {result.input.birthTime}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{result.input.gender}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-stone-200/80 border border-stone-300">
              <button
                type="button"
                onClick={() => setViewMode('editorial')}
                className={`px-3 py-1 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'editorial'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Editorial Monograph
              </button>
              <button
                type="button"
                onClick={() => setViewMode('markdown')}
                className={`px-3 py-1 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === 'markdown'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Raw Markdown Source
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="px-3.5 py-1.5 text-xs font-medium bg-stone-900 text-[#FBF9F5] hover:bg-stone-800 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Markdown' : 'Copy Full Markdown'}
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight leading-[1.12] text-balance">
          The Mirror of {ketu.shastiamsha.name} & the {result.ascendant.rashiName} Horizon
        </h1>
        <p className="text-base sm:text-lg text-stone-600 mt-3 max-w-3xl leading-relaxed">
          An exhaustive, multi-dimensional translation of your subconscious past-life defaults, structural attachment knots, and evolutionary frontier—spanning career, money, creative voice, bodily health, family lineage, and intimate bonds.
        </p>

        {/* 3-Chapter Index Rail */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-600">
          <button
            type="button"
            onClick={() => scrollToSection(1)}
            className="hover:text-[#9A3412] transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            01 / The Implicit Code (IFS Mapping & Layman Translation)
          </button>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => scrollToSection(2)}
            className="hover:text-[#9A3412] transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            02 / The Structural Knots (Attachment Dynamics & Layman Translation)
          </button>
          <span className="text-stone-300" aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => scrollToSection(3)}
            className="hover:text-[#9A3412] transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            03 / The Evolutionary Frontier (Big Five Shift & Layman Translation)
          </button>
        </div>
      </div>

      {viewMode === 'markdown' ? (
        <div className="border border-stone-300 bg-[#F7F4EE] p-6">
          <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-4">
            <span className="text-xs uppercase tracking-widest text-stone-500">
              Strict 3-Section Markdown Output with Elaborative Layman Translations
            </span>
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="text-xs font-medium text-[#9A3412] hover:underline cursor-pointer"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Raw Text'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-mono-tabular text-xs leading-relaxed text-stone-800 overflow-x-auto">
            {result.fullMarkdown}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          {/* Main 70% Reading Column */}
          <div className="xl:col-span-8 space-y-14">
            <article>{renderMarkdownSection(result.narrative.section1ImplicitCode, 0)}</article>
            <article className="pt-8 border-t border-stone-300">
              {renderMarkdownSection(result.narrative.section2StructuralKnots, 1)}
            </article>
            <article className="pt-8 border-t border-stone-300">
              {renderMarkdownSection(result.narrative.section3EvolutionaryFrontier, 2)}
            </article>
          </div>

          {/* Right 30% Curatorial Rail */}
          <aside className="xl:col-span-4 space-y-8 xl:sticky xl:top-20">
            {/* Archival Plate */}
            <figure className="border border-stone-300 bg-[#F3EFE6] p-3">
              {!imgError ? (
                <img
                  src={heroImagePath}
                  alt="Archival Vedic Cosmogram and Harmonic Mandala"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full aspect-video object-cover border border-stone-200"
                />
              ) : (
                <div className="w-full aspect-video bg-[#EBE6DF] flex items-center justify-center p-4 text-center">
                  <span className="font-display text-sm italic text-stone-600">
                    Harmonic Vector Plate of {result.ascendant.rashiName} Lagna & {ketu.shastiamsha.name} Shastiamsha
                  </span>
                </div>
              )}
              <figcaption className="text-xs italic text-stone-600 mt-2.5 leading-normal">
                Plate I — Celestial Harmonic Vector: Mapping {ketu.rashiName} Ketu ({ketu.shastiamsha.name} D60) across career, money, health, and soul trajectory.
              </figcaption>
            </figure>

            {/* Facets of Life Echo Ledger */}
            <div className="border border-stone-300 bg-[#F3EFE6]/70 p-5 space-y-4">
              <div className="border-b border-stone-300 pb-2.5">
                <p className="text-[11px] uppercase tracking-widest text-[#9A3412]">
                  All Facets of Life Ledger
                </p>
                <h3 className="text-lg font-semibold text-stone-900 mt-0.5">
                  How the Karmic Code Impacts Every Sphere
                </h3>
              </div>

              <div className="space-y-3.5 text-xs leading-relaxed text-stone-700">
                <div>
                  <span className="font-semibold text-stone-900 block">Vocation, Leadership & Money:</span>
                  <span className="text-stone-600">
                    {result.ifs.exile.lifeFacets.vocationAndMoney}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2.5">
                  <span className="font-semibold text-stone-900 block">Creative Voice & Visibility:</span>
                  <span className="text-stone-600">
                    {result.ifs.exile.lifeFacets.creativeVoiceAndVisibility}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2.5">
                  <span className="font-semibold text-stone-900 block">Somatic Health & Nervous System:</span>
                  <span className="text-stone-600">
                    {result.ifs.exile.lifeFacets.somaticHealthAndNervousSystem}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2.5">
                  <span className="font-semibold text-stone-900 block">Family Lineage & Expectations:</span>
                  <span className="text-stone-600">
                    {result.ifs.exile.lifeFacets.familyLineageAndAncestralRoles}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2.5">
                  <span className="font-semibold text-stone-900 block">Existential Trust & Spirituality:</span>
                  <span className="text-stone-600">
                    {result.ifs.exile.lifeFacets.existentialTrustAndSolitude}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2.5">
                  <span className="font-semibold text-stone-900 block">Interpersonal & Intimate Bonds:</span>
                  <span className="text-stone-600">
                    {result.attachment.primaryStyle} reflex: {result.attachment.coreIntimacyFear}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Parts Snapshot */}
            <div className="border border-stone-300 bg-[#FBF9F5] p-5 space-y-3">
              <div className="text-xs uppercase tracking-widest text-stone-500">
                IFS Parts Architecture
              </div>
              <dl className="space-y-3 text-xs">
                <div className="border-b border-stone-200 pb-2.5">
                  <dt className="font-semibold text-stone-900">Exile (Vulnerability)</dt>
                  <dd className="text-stone-600 mt-0.5">{result.ifs.exile.archetypeTitle}</dd>
                </div>
                <div className="border-b border-stone-200 pb-2.5">
                  <dt className="font-semibold text-stone-900">Manager (Control)</dt>
                  <dd className="text-stone-600 mt-0.5">{result.ifs.manager.archetypeTitle}</dd>
                </div>
                <div className="border-b border-stone-200 pb-2.5">
                  <dt className="font-semibold text-stone-900">Firefighter (Escape)</dt>
                  <dd className="text-stone-600 mt-0.5">{result.ifs.firefighter.archetypeTitle}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#9A3412]">D9 Navamsha Horizon</dt>
                  <dd className="text-stone-700 mt-0.5">{result.ascendant.navamshaName} Lagna · {result.ifs.selfLeadershipAnchor}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
