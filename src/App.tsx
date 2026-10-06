/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, Copy, Compass, RefreshCw, SlidersHorizontal } from 'lucide-react';
import {
  ARCHIVAL_PRESETS,
  formatRawSchemaInput,
  parseRawSchemaInput,
} from './engine/jyotishEngine';
import { synthesizeKarmicReport } from './engine/narrativeEngine';
import { BirthInput, GenderOption, KarmicSynthesisResult } from './types/jyotish';
import { MarkdownNarrativeView } from './components/MarkdownNarrativeView';
import { DivisionalChartsSVG } from './components/DivisionalChartsSVG';
import { IFSAttachmentStudio } from './components/IFSAttachmentStudio';

import heroMandalaImg from './assets/images/archival_jyotish_mandala_1790862931248.jpg';
import ifsPortraitImg from './assets/images/psychological_ifs_portrait_1790862945852.jpg';

type ActiveTab = 'narrative' | 'matrix' | 'psychology';

export default function App() {
  const defaultInput: BirthInput = ARCHIVAL_PRESETS[0].input;

  const [birthInput, setBirthInput] = useState<BirthInput>(defaultInput);
  const [rawSchemaText, setRawSchemaText] = useState<string>(() =>
    formatRawSchemaInput(defaultInput)
  );
  const [inputMode, setInputMode] = useState<'structured' | 'raw'>('raw');
  const [synthesisMode, setSynthesisMode] = useState<'instant' | 'deep-llm'>('instant');
  const [result, setResult] = useState<KarmicSynthesisResult>(() =>
    synthesizeKarmicReport(defaultInput)
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>('narrative');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState<boolean>(false);
  const [consoleOpenMobile, setConsoleOpenMobile] = useState<boolean>(false);

  const updateStructuredField = <K extends keyof BirthInput>(
    field: K,
    value: BirthInput[K]
  ) => {
    const next = { ...birthInput, [field]: value };
    setBirthInput(next);
    setRawSchemaText(formatRawSchemaInput(next));
  };

  const handleRawTextChange = (val: string) => {
    setRawSchemaText(val);
    const parsed = parseRawSchemaInput(val, birthInput);
    setBirthInput(parsed);
  };

  const handleSelectPreset = (presetInput: BirthInput) => {
    setBirthInput(presetInput);
    setRawSchemaText(formatRawSchemaInput(presetInput));
    const immediate = synthesizeKarmicReport(presetInput);
    setResult(immediate);
    setStatusMessage(
      `Calibrated multidimensional soul matrix for ${presetInput.placeOfBirth}.`
    );
  };

  const handleExecuteSynthesis = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeInput =
      inputMode === 'raw' ? parseRawSchemaInput(rawSchemaText, birthInput) : birthInput;

    setBirthInput(activeInput);
    setRawSchemaText(formatRawSchemaInput(activeInput));
    setIsSynthesizing(true);
    setStatusMessage(
      'Synthesizing multidimensional soul matrix, inner archetypes & real-world behavioral spheres...'
    );

    const localSynthesis = synthesizeKarmicReport(activeInput);
    setResult(localSynthesis);

    if (synthesisMode === 'deep-llm') {
      try {
        const response = await fetch('/api/synthesize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: activeInput, mode: 'deep-llm' }),
        });
        if (response.ok) {
          const serverData = (await response.json()) as KarmicSynthesisResult;
          setResult(serverData);
        }
      } catch {
        // Fallback is already localSynthesis
      }
    }

    setIsSynthesizing(false);
    setStatusMessage(
      `Synthesis complete for ${activeInput.placeOfBirth} (${activeInput.dateOfBirth} at ${activeInput.birthTime}).`
    );
  };

  const handleCopyFullReport = async () => {
    try {
      await navigator.clipboard.writeText(result.fullMarkdown);
      setCopiedHeader(true);
      setTimeout(() => setCopiedHeader(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      {/* Top Bar Contract: 3 Zones */}
      <header className="sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-xs border-b border-stone-300 px-6 py-4 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark matching metadata.json */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('narrative');
          }}
          className="font-display text-2xl font-semibold tracking-tight text-stone-900 whitespace-nowrap"
        >
          Jyotish Soul Synthesis
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            type="button"
            onClick={() => setActiveTab('narrative')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'narrative'
                ? 'text-stone-900 border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Soul Chronicles Monograph
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'matrix'
                ? 'text-stone-900 border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Multidimensional Soul Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('psychology')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'psychology'
                ? 'text-stone-900 border-b-2 border-[#9A3412] font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Inner Archetypes & Spheres
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setConsoleOpenMobile((o) => !o)}
            className="lg:hidden px-3 py-2 text-xs font-medium border border-stone-300 bg-[#F3EFE6] text-stone-900 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Parameters
          </button>
          <button
            type="button"
            onClick={handleCopyFullReport}
            className="px-4 py-2 text-xs font-medium bg-[#9A3412] text-white hover:bg-[#7C2D12] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            {copiedHeader ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedHeader ? 'Copied Report' : 'Export Markdown'}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center overflow-x-auto border-b border-stone-300 bg-[#F3EFE6] px-4 py-2 gap-4 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('narrative')}
          className={`whitespace-nowrap py-1 ${
            activeTab === 'narrative' ? 'text-[#9A3412] font-semibold underline' : 'text-stone-600'
          }`}
        >
          01. Soul Chronicles
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`whitespace-nowrap py-1 ${
            activeTab === 'matrix' ? 'text-[#9A3412] font-semibold underline' : 'text-stone-600'
          }`}
        >
          02. Multidimensional Matrix
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('psychology')}
          className={`whitespace-nowrap py-1 ${
            activeTab === 'psychology' ? 'text-[#9A3412] font-semibold underline' : 'text-stone-600'
          }`}
        >
          03. Inner Archetypes & Spheres
        </button>
      </div>

      {/* Workspace */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Left Parameter Column */}
        <aside
          className={`lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-stone-300 bg-[#F3EFE6]/65 p-6 space-y-6 ${
            consoleOpenMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-[#9A3412]">
              Natal Parameter Console
            </p>
            <h2 className="text-xl font-semibold text-stone-900 mt-0.5">
              Input Schema
            </h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Enter raw parameters in the strict 4-line format or use guided fields to compute the D1/D9/D60 matrix and multi-facet psychological synthesis.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-200/90 border border-stone-300">
            <button
              type="button"
              onClick={() => setInputMode('raw')}
              className={`flex-1 py-1.5 px-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                inputMode === 'raw'
                  ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Strict 4-Line Schema
            </button>
            <button
              type="button"
              onClick={() => setInputMode('structured')}
              className={`flex-1 py-1.5 px-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                inputMode === 'structured'
                  ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Guided Fields
            </button>
          </div>

          <form onSubmit={handleExecuteSynthesis} className="space-y-4">
            {inputMode === 'raw' ? (
              <div>
                <label
                  htmlFor="raw-schema-textarea"
                  className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5"
                >
                  Raw Birth Parameter Block
                </label>
                <textarea
                  id="raw-schema-textarea"
                  rows={5}
                  value={rawSchemaText}
                  onChange={(e) => handleRawTextChange(e.target.value)}
                  className="w-full border border-stone-300 bg-[#FBF9F5] p-3 font-mono-tabular text-xs leading-relaxed text-stone-900 focus:outline-none focus:border-[#9A3412]"
                  placeholder="- Birth Time: 14:35&#10;- Date of Birth: 18/11/1991&#10;- Gender: Female&#10;- Place of Birth: Kyoto, Japan"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Format: HH:MM (24-Hr) · DD/MM/YYYY · Male/Female/Other · City, Country
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label
                    htmlFor="input-birthtime"
                    className="block text-xs uppercase tracking-wider text-stone-600 mb-1"
                  >
                    Birth Time (24-Hour HH:MM)
                  </label>
                  <input
                    id="input-birthtime"
                    type="text"
                    value={birthInput.birthTime}
                    onChange={(e) => updateStructuredField('birthTime', e.target.value)}
                    placeholder="14:35"
                    className="w-full border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm font-mono-tabular text-stone-900 focus:outline-none focus:border-[#9A3412]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-dob"
                    className="block text-xs uppercase tracking-wider text-stone-600 mb-1"
                  >
                    Date of Birth (DD/MM/YYYY)
                  </label>
                  <input
                    id="input-dob"
                    type="text"
                    value={birthInput.dateOfBirth}
                    onChange={(e) => updateStructuredField('dateOfBirth', e.target.value)}
                    placeholder="18/11/1991"
                    className="w-full border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm font-mono-tabular text-stone-900 focus:outline-none focus:border-[#9A3412]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="input-gender"
                    className="block text-xs uppercase tracking-wider text-stone-600 mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="input-gender"
                    value={birthInput.gender}
                    onChange={(e) =>
                      updateStructuredField('gender', e.target.value as GenderOption)
                    }
                    className="w-full border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#9A3412]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="input-place"
                    className="block text-xs uppercase tracking-wider text-stone-600 mb-1"
                  >
                    Place of Birth (City, Country)
                  </label>
                  <input
                    id="input-place"
                    type="text"
                    value={birthInput.placeOfBirth}
                    onChange={(e) => updateStructuredField('placeOfBirth', e.target.value)}
                    placeholder="Kyoto, Japan"
                    className="w-full border border-stone-300 bg-[#FBF9F5] px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-[#9A3412]"
                  />
                </div>
              </div>
            )}

            <div className="pt-1">
              <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">
                Interpretive Engine Mode
              </div>
              <div className="grid grid-cols-2 gap-1 p-1 bg-stone-200/80 border border-stone-300">
                <button
                  type="button"
                  onClick={() => setSynthesisMode('instant')}
                  className={`py-1.5 px-2 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    synthesisMode === 'instant'
                      ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Deterministic Matrix
                </button>
                <button
                  type="button"
                  onClick={() => setSynthesisMode('deep-llm')}
                  className={`py-1.5 px-2 text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    synthesisMode === 'deep-llm'
                      ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Deep AI Synthesis
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSynthesizing}
              className="w-full py-2.5 px-4 bg-stone-900 text-[#FBF9F5] text-xs font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSynthesizing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Synthesizing Matrix...
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5" />
                  Generate Multi-Facet Report
                </>
              )}
            </button>
          </form>

          {statusMessage && (
            <div className="p-3 border border-stone-300 bg-[#FBF9F5] text-xs text-stone-700 leading-relaxed">
              {statusMessage}
            </div>
          )}

          <div className="border-t border-stone-300 pt-5 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-500">
              Active Soul Dimensions
            </div>
            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Core Identity:</span>
                <span className="font-medium text-stone-900">
                  Conscious Waking Interface
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Evolutionary Vector:</span>
                <span className="font-semibold text-[#9A3412]">
                  Sacred Interdependence
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Relational Blueprint:</span>
                <span className="font-medium text-stone-900">
                  {result.attachment.primaryStyle.split(' ')[0]} Protection
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Subconscious Origin:</span>
                <span className="text-stone-800">
                  Ancient Unlearned Genius
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-300 pt-5 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-500">
              Archival Case Profiles
            </div>
            <div className="space-y-2.5">
              {ARCHIVAL_PRESETS.map((preset) => {
                const isCurrent =
                  preset.input.dateOfBirth === birthInput.dateOfBirth &&
                  preset.input.birthTime === birthInput.birthTime;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.input)}
                    className={`w-full text-left p-3 border transition-colors cursor-pointer ${
                      isCurrent
                        ? 'border-[#9A3412] bg-[#FBF9F5]'
                        : 'border-stone-300 bg-[#FBF9F5]/60 hover:bg-[#FBF9F5]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-stone-900">{preset.label}</div>
                    <div className="text-[11px] text-[#9A3412] mt-0.5">{preset.kicker}</div>
                    <p className="text-[11px] text-stone-600 mt-1 leading-normal">
                      {preset.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Viewport */}
        <main className="lg:col-span-8 xl:col-span-9 p-6 sm:p-10 lg:p-12">
          {activeTab === 'narrative' && (
            <MarkdownNarrativeView result={result} heroImagePath={heroMandalaImg} />
          )}

          {activeTab === 'matrix' && <DivisionalChartsSVG result={result} />}

          {activeTab === 'psychology' && (
            <IFSAttachmentStudio result={result} mirrorImagePath={ifsPortraitImg} />
          )}
        </main>
      </div>

      <footer className="border-t border-stone-300 bg-[#F3EFE6]/50 px-6 py-6 text-xs text-stone-500">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Jyotish Soul Synthesis · Multidimensional Soul Matrix & Experiential Behavioral Mapping
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('narrative')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Soul Chronicles Monograph
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Multidimensional Matrix
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setActiveTab('psychology')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Inner Archetypes & Spheres
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleCopyFullReport}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Copy Markdown
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
