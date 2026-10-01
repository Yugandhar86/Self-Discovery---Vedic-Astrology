import React, { useState } from 'react';
import { IFSPartDetail, KarmicSynthesisResult } from '../types/jyotish';

interface IFSAttachmentStudioProps {
  result: KarmicSynthesisResult;
  mirrorImagePath: string;
}

export const IFSAttachmentStudio: React.FC<IFSAttachmentStudioProps> = ({
  result,
  mirrorImagePath,
}) => {
  const [selectedPartRole, setSelectedPartRole] = useState<'exile' | 'manager' | 'firefighter'>('exile');
  const [selfLeadershipLevel, setSelfLeadershipLevel] = useState<number>(65);
  const [selectedLifeFacet, setSelectedLifeFacet] = useState<
    'vocationAndMoney' | 'creativeVoiceAndVisibility' | 'somaticHealthAndNervousSystem' | 'familyLineageAndAncestralRoles' | 'existentialTrustAndSolitude' | 'interpersonalAndRomanticBonds'
  >('vocationAndMoney');
  const [imgError, setImgError] = useState(false);

  const partMap: Record<'exile' | 'manager' | 'firefighter', IFSPartDetail> = {
    exile: result.ifs.exile,
    manager: result.ifs.manager,
    firefighter: result.ifs.firefighter,
  };

  const activePart = partMap[selectedPartRole];

  const facetLabels: Record<typeof selectedLifeFacet, string> = {
    vocationAndMoney: 'Vocation, Leadership & Money',
    creativeVoiceAndVisibility: 'Creative Voice & Visibility',
    somaticHealthAndNervousSystem: 'Somatic Health & Nervous System',
    familyLineageAndAncestralRoles: 'Family Lineage & Ancestral Roles',
    existentialTrustAndSolitude: 'Existential Trust & Spirituality',
    interpersonalAndRomanticBonds: 'Interpersonal & Romantic Bonds',
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6">
        <p className="text-xs uppercase tracking-widest text-[#9A3412]">
          All Facets of Life Studio · IFS · Attachment · Big Five
        </p>
        <h2 className="text-3xl font-semibold text-stone-900 mt-1">
          IFS Parts Work Across Career, Money, Body & Bonds
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl">
          Your karmic trajectory and past-life Shastiamsha imprints do not operate solely in romantic relationships. Explore how your Exile, Manager, and Firefighter parts manifest across your career authority, financial choices, creative courage, bodily health, family lineage, and existential trust.
        </p>
      </div>

      {/* Life Facet Switcher Tabs */}
      <div className="border border-stone-300 bg-[#F3EFE6] p-4">
        <div className="text-xs uppercase tracking-wider text-stone-600 mb-2 font-semibold">
          Select Life Sphere to Inspect Active Dynamics:
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {(
            Object.keys(facetLabels) as Array<typeof selectedLifeFacet>
          ).map((facetKey) => (
            <button
              key={facetKey}
              type="button"
              onClick={() => setSelectedLifeFacet(facetKey)}
              className={`p-2.5 text-xs text-left transition-colors cursor-pointer border ${
                selectedLifeFacet === facetKey
                  ? 'bg-[#FBF9F5] border-[#9A3412] text-stone-900 font-semibold shadow-xs'
                  : 'bg-[#FBF9F5]/70 border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-[#FBF9F5]'
              }`}
            >
              {facetLabels[facetKey]}
            </button>
          ))}
        </div>
      </div>

      {/* 1. IFS Parts Constellation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold text-stone-900">
              01. Active Sub-Personality Constellation
            </h3>
            <div className="flex items-center gap-1 p-1 bg-stone-200/80 border border-stone-300">
              <button
                type="button"
                onClick={() => setSelectedPartRole('exile')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPartRole === 'exile'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Exile (Core Vulnerability)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPartRole('manager')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPartRole === 'manager'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Manager (Proactive Shield)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPartRole('firefighter')}
                className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedPartRole === 'firefighter'
                    ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Firefighter (Emergency Reset)
              </button>
            </div>
          </div>

          {/* Detailed Part Dossier */}
          <div className="border border-stone-300 bg-[#FBF9F5] p-6 space-y-5">
            <div className="border-b border-stone-200 pb-4">
              <div className="text-xs uppercase tracking-widest text-[#9A3412]">
                {activePart.role}
              </div>
              <h4 className="text-2xl font-semibold text-stone-900 mt-1">
                {activePart.archetypeTitle}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Celestial Root: {activePart.astrologicalOrigin}
              </p>
            </div>

            <blockquote className="p-4 bg-[#F3EFE6] border-l-2 border-[#9A3412] font-display text-lg italic text-stone-900">
              {activePart.coreBelief}
            </blockquote>

            {/* Selected Facet Highlight */}
            <div className="p-4 bg-[#F3EFE6]/80 border border-[#9A3412]/30">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] mb-1">
                Expression in {facetLabels[selectedLifeFacet]}:
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                {activePart.lifeFacets[selectedLifeFacet]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-semibold text-stone-900 mb-1">
                  Metaphysical Cause (D60 Origin)
                </h5>
                <p className="text-stone-700 leading-relaxed">{activePart.pastLifeImprint}</p>
              </div>
              <div>
                <h5 className="font-semibold text-stone-900 mb-1">
                  Behavioral Footprint (The Current Echo)
                </h5>
                <p className="text-stone-700 leading-relaxed">{activePart.currentLifeFootprint}</p>
              </div>
              <div>
                <h5 className="font-semibold text-stone-900 mb-1">Somatic Body Location</h5>
                <p className="text-stone-700 leading-relaxed">{activePart.somaticLocation}</p>
              </div>
              <div>
                <h5 className="font-semibold text-[#9A3412] mb-1">Self-Led Unburdening Key</h5>
                <p className="text-stone-700 leading-relaxed">{activePart.unburdeningKey}</p>
              </div>
            </div>
          </div>

          {/* Interactive Self-Leadership Slider */}
          <div className="border border-stone-300 bg-[#F3EFE6]/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500">
                  Interactive State Calibration
                </span>
                <h4 className="text-lg font-semibold text-stone-900">
                  Protector Blending vs. Navamsha Self-Leadership
                </h4>
              </div>
              <span className="text-xl font-mono-tabular font-semibold text-[#9A3412]">
                {selfLeadershipLevel}% Self-Led
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={95}
              value={selfLeadershipLevel}
              onChange={(e) => setSelfLeadershipLevel(Number(e.target.value))}
              aria-label="Self-Leadership Calibration"
              className="w-full accent-[#9A3412] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-stone-500 font-mono-tabular">
              <span>10% · High Threat Vigilance</span>
              <span>50% · Conscious Dual-Awareness</span>
              <span>95% · Navamsha Soul Leadership</span>
            </div>

            <div className="p-4 bg-[#FBF9F5] border border-stone-200 text-sm text-stone-800 leading-relaxed">
              {selfLeadershipLevel < 40 ? (
                <p>
                  <strong className="text-stone-900">High Protector Blending:</strong> Your{' '}
                  <em>{result.ifs.manager.archetypeTitle}</em> runs the show across work, money, and personal boundaries. Uncertainty in {facetLabels[selectedLifeFacet]} registers as a crisis; you automatically over-work, withdraw, or micromanage to keep the Exile protected.
                </p>
              ) : selfLeadershipLevel < 75 ? (
                <p>
                  <strong className="text-stone-900">Dual-Awareness State:</strong> You notice the familiar tension in your jaw or stomach, but instead of compulsively reacting, your adult Self steps in to observe: *"I see my protector getting nervous about {facetLabels[selectedLifeFacet].toLowerCase()}, but I am capable of holding this."*
                </p>
              ) : (
                <p>
                  <strong className="text-[#9A3412]">Navamsha Self-Leadership:</strong>{' '}
                  {result.ifs.selfLeadershipAnchor} You approach {facetLabels[selectedLifeFacet].toLowerCase()} with grounded authority, clarity, and creative freedom.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Art Plate & Echo Chain */}
        <div className="lg:col-span-4 space-y-6">
          <figure className="border border-stone-300 bg-[#F3EFE6] p-3">
            {!imgError ? (
              <img
                src={mirrorImagePath}
                alt="Concentric Psychological Parts Reflection"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full aspect-4/3 object-cover border border-stone-200"
              />
            ) : (
              <div className="w-full aspect-4/3 bg-[#EBE6DF] flex items-center justify-center p-4 text-center">
                <span className="font-display text-sm italic text-stone-600">
                  Plate II — Concentric Mirror of Parts Architecture
                </span>
              </div>
            )}
            <figcaption className="text-xs italic text-stone-600 mt-2">
              Plate II — The internal ecology of Exiles and Protectors orbiting your core Navamsha Self.
            </figcaption>
          </figure>

          <div className="border border-stone-300 bg-[#FBF9F5] p-5 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#9A3412]">
              The Full-Life Echo Chain
            </div>
            <p className="text-sm text-stone-800 leading-relaxed font-medium">
              {result.ifs.mandatoryEchoSummary}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Attachment Dynamics Across Facets */}
      <div className="border-t border-stone-300 pt-10 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#9A3412]">
            Interpersonal, Professional & Familial Mirroring
          </p>
          <h3 className="text-2xl font-semibold text-stone-900 mt-1">
            02. Attachment Dynamics: {result.attachment.primaryStyle}
          </h3>
          <p className="text-sm text-stone-600 mt-1">
            Secondary Pull: {result.attachment.secondaryPull}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-stone-300 bg-[#FBF9F5] p-5">
            <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
              Vocation & Money Attachment
            </div>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              {result.attachment.lifeFacetsExpression.vocationAndMoney}
            </p>
          </div>
          <div className="border border-stone-300 bg-[#FBF9F5] p-5">
            <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
              Creative Voice & Visibility
            </div>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              {result.attachment.lifeFacetsExpression.creativeVoiceAndVisibility}
            </p>
          </div>
          <div className="border border-stone-300 bg-[#FBF9F5] p-5">
            <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
              Somatic Stress & Body
            </div>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              {result.attachment.lifeFacetsExpression.somaticHealthAndNervousSystem}
            </p>
          </div>
          <div className="border border-stone-300 bg-[#FBF9F5] p-5">
            <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
              Family of Origin Lineage
            </div>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              {result.attachment.lifeFacetsExpression.familyLineageAndAncestralRoles}
            </p>
          </div>
          <div className="border border-stone-300 bg-[#FBF9F5] p-5">
            <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
              Existential Purpose & Solitude
            </div>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              {result.attachment.lifeFacetsExpression.existentialTrustAndSolitude}
            </p>
          </div>
          <div className="border border-stone-300 bg-[#F3EFE6] p-5">
            <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
              Intimacy & Romantic Bonds
            </div>
            <p className="text-sm text-stone-800 mt-2 leading-relaxed">
              {result.attachment.lifeFacetsExpression.interpersonalAndRomanticBonds}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Big Five Reconditioning Across Arenas */}
      <div className="border-t border-stone-300 pt-10 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500">
            Karmic Default Baseline vs. Navamsha Self-Led Target
          </p>
          <h3 className="text-2xl font-semibold text-stone-900 mt-1">
            03. Big Five Personality Reconditioning Matrix
          </h3>
        </div>

        <div className="space-y-6">
          {result.bigFive.map((dim) => (
            <div key={dim.trait} className="border border-stone-300 bg-[#FBF9F5] p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-200 pb-4 mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-stone-900">{dim.trait}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Shifting from <strong>{dim.karmicDefaultLabel}</strong> ➔{' '}
                    <strong className="text-[#9A3412]">{dim.evolutionaryTargetLabel}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono-tabular">
                  <span className="text-stone-600">
                    Baseline: <strong>{dim.baselineScore}%</strong>
                  </span>
                  <span aria-hidden="true">➔</span>
                  <span className="text-[#9A3412] font-semibold">
                    Target: {dim.reconditionedTarget}%
                  </span>
                </div>
              </div>

              {/* Comparative Dual Bars */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-36 text-stone-500 shrink-0">Karmic Default</span>
                  <div className="flex-1 h-2 bg-stone-200 overflow-hidden">
                    <div className="h-full bg-stone-500" style={{ width: `${dim.baselineScore}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="w-36 text-[#9A3412] font-medium shrink-0">Self-Led Target</span>
                  <div className="flex-1 h-2 bg-stone-200 overflow-hidden">
                    <div className="h-full bg-[#9A3412]" style={{ width: `${dim.reconditionedTarget}%` }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm pt-2">
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                    Shadow Expression
                  </div>
                  <p className="text-stone-700 leading-relaxed">{dim.shadowExpression}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9A3412] mb-1">
                    Self-Led Integration
                  </div>
                  <p className="text-stone-700 leading-relaxed">{dim.selfLedExpression}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Life Arena Impact
                  </div>
                  <p className="text-stone-700 leading-relaxed">{dim.lifeArenaImpact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
