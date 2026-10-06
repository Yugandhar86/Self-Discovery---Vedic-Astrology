import React, { useState } from 'react';
import { KarmicSynthesisResult } from '../types/jyotish';

interface DivisionalChartsSVGProps {
  result: KarmicSynthesisResult;
}

type MatrixLayer = 'core' | 'compass' | 'roots';

export const DivisionalChartsSVG: React.FC<DivisionalChartsSVGProps> = ({ result }) => {
  const [activeLayer, setActiveLayer] = useState<MatrixLayer>('core');

  const ketu = result.planets.find((p) => p.id === 'Ketu')!;
  const rahu = result.planets.find((p) => p.id === 'Rahu')!;
  const moon = result.planets.find((p) => p.id === 'Moon')!;
  const saturn = result.planets.find((p) => p.id === 'Saturn')!;
  const venus = result.planets.find((p) => p.id === 'Venus')!;

  const layerData = {
    core: {
      number: '01',
      title: 'The Core Identity Layer',
      subtitle: 'The Conscious Waking Persona & Worldly Interface',
      tagline: 'How you naturally perceive, initiate, and organize reality in daily life',
      narrative: `At the surface of your waking awareness lies your primary worldly persona. This is the conscious vessel you inhabit every single day—the natural frequency through which you think, make executive decisions, and project your authority into society. It determines how your voice resonates in a high-stakes meeting, how your nervous system absorbs sudden surprises, and how you instinctively establish order amid worldly noise. While this layer represents your most functional interface with modern culture, it is merely the outer gate of a far deeper psychic continuum.`,
      traits: [
        { label: 'Cognitive Orientation', desc: 'Discerning, strategic mental processing that synthesizes complex concepts into actionable clarity.' },
        { label: 'Worldly Presence', desc: 'Poised and self-contained, projecting an innate aura of competence and reliability.' },
        { label: 'Instinctual Tempo', desc: 'Patient and deliberate, preferring methodical craftsmanship over hurried, reactive impulses.' },
      ],
      color: '#9A3412',
    },
    compass: {
      number: '02',
      title: 'The Hidden Evolutionary Compass',
      subtitle: 'The Maturing Soul Vector & Ripening Destiny',
      tagline: 'Who your consciousness is actively striving to become as the armor drops',
      narrative: `Beneath your conditioned personality lives a subtle, maturing soul current. Quiet in early youth, this interior compass exerts an increasingly magnetic pull as adult life deepens. Where your outer personality reflects the defenses and roles you learned to survive childhood and early adulthood, this second dimension reflects the ripened fruit of your soul’s destiny. As you encounter major life crossroads—career evolutions, profound heartbreak, or spiritual surrender—your outer persona gradually softens to align with this sovereign inner trajectory.`,
      traits: [
        { label: 'Mature Leadership', desc: 'Moving from solitary control into visionary guidance that inspires and elevates collaborative partners.' },
        { label: 'Relational Evolution', desc: 'Replacing guarded hyper-vigilance with sacred, courageous transparency and mutual interdependence.' },
        { label: 'Creative Radiance', desc: 'Claiming your authentic frequency and commanding full value for your gifts without self-effacing modesty.' },
      ],
      color: '#B45309',
    },
    roots: {
      number: '03',
      title: 'The Ancient Deep-Seated Root System',
      subtitle: 'The Subconscious Bedrock & Primordial Instincts',
      tagline: 'Unlearned memories, ancient survival genius, and subterranean anchors',
      narrative: `Deepest of all, beneath conscious thought and modern ambition, lies your ancient karmic root system. Long before you drew your first breath in this lifetime, your nervous system was already shaped by an unlearned, instinctual genius for survival. In forgotten chapters of your soul's journey, you mastered the art of enduring isolation and reading unspoken room dynamics. Because your system over-rehearsed these survival patterns, you treat self-containment as a biological mandate. Understanding this root system allows you to honor its wisdom while gently stepping out of its gravitational trap.`,
      traits: [
        { label: 'Primordial Genius', desc: 'An unlearned, almost psychic instinct for reading unspoken tension and detecting operational risk before anyone else.' },
        { label: 'The Ancient Fortress', desc: 'An automatic reflex to retreat into solitary self-reliance whenever vulnerability feels hazardous.' },
        { label: 'The Unburdening Key', desc: 'Realizing that the ancient struggle is over—allowing your grounded adult self to guide your safety today.' },
      ],
      color: '#431407',
    },
  };

  const current = layerData[activeLayer];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6">
        <p className="text-xs uppercase tracking-widest text-[#9A3412]">
          Section 01 · Experiential Soul Exploration
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
          1. THE CHRONICLES OF TIME: Your Multidimensional Soul Matrix
        </h2>
        <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
          An evocative journey through the three concentric planes of your consciousness: your conscious worldly persona, your maturing evolutionary soul compass, and the ancient subconscious root system carrying unlearned instincts from forgotten horizons.
        </p>
      </div>

      {/* 3-Layer Plane Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(['core', 'compass', 'roots'] as MatrixLayer[]).map((layerKey) => {
          const l = layerData[layerKey];
          const isSelected = activeLayer === layerKey;
          return (
            <button
              key={layerKey}
              type="button"
              onClick={() => setActiveLayer(layerKey)}
              className={`p-5 text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#9A3412] bg-[#FBF9F5] shadow-xs'
                  : 'border-stone-300 bg-[#F3EFE6]/60 hover:bg-[#FBF9F5]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular font-semibold text-[#9A3412]">
                  Dimension {l.number}
                </span>
                {isSelected && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#9A3412] text-white">
                    Inspecting
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-stone-900 mt-2">{l.title}</h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                {l.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Concentric Cosmogram Visualization */}
      <div className="border border-stone-300 bg-[#FBF9F5] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Artistic Concentric Soul Mandala SVG */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
            <svg
              viewBox="0 0 320 320"
              className="w-full max-w-[280px] h-auto drop-shadow-xs"
              aria-label="Multidimensional Soul Matrix Cosmogram"
            >
              <defs>
                <radialGradient id="matrixGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#9A3412" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#9A3412" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#9A3412" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="160" cy="160" r="150" fill="url(#matrixGlow)" />

              {/* Outer Layer: Core Identity Layer */}
              <circle
                cx="160"
                cy="160"
                r="135"
                fill="none"
                stroke={activeLayer === 'core' ? '#9A3412' : '#D6D3D1'}
                strokeWidth={activeLayer === 'core' ? '3' : '1.5'}
                strokeDasharray={activeLayer === 'core' ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
              <circle
                cx="160"
                cy="25"
                r={activeLayer === 'core' ? '7' : '4'}
                fill={activeLayer === 'core' ? '#9A3412' : '#A8A29E'}
              />
              <circle
                cx="295"
                cy="160"
                r={activeLayer === 'core' ? '7' : '4'}
                fill={activeLayer === 'core' ? '#9A3412' : '#A8A29E'}
              />
              <circle
                cx="160"
                cy="295"
                r={activeLayer === 'core' ? '7' : '4'}
                fill={activeLayer === 'core' ? '#9A3412' : '#A8A29E'}
              />
              <circle
                cx="25"
                cy="160"
                r={activeLayer === 'core' ? '7' : '4'}
                fill={activeLayer === 'core' ? '#9A3412' : '#A8A29E'}
              />

              {/* Middle Layer: Hidden Evolutionary Compass */}
              <circle
                cx="160"
                cy="160"
                r="95"
                fill="none"
                stroke={activeLayer === 'compass' ? '#B45309' : '#D6D3D1'}
                strokeWidth={activeLayer === 'compass' ? '3' : '1.5'}
                strokeDasharray={activeLayer === 'compass' ? 'none' : '6 4'}
                className="transition-all duration-300"
              />
              <circle
                cx="227"
                cy="93"
                r={activeLayer === 'compass' ? '7' : '4'}
                fill={activeLayer === 'compass' ? '#B45309' : '#A8A29E'}
              />
              <circle
                cx="93"
                cy="227"
                r={activeLayer === 'compass' ? '7' : '4'}
                fill={activeLayer === 'compass' ? '#B45309' : '#A8A29E'}
              />

              {/* Inner Core: Ancient Karmic Root System */}
              <circle
                cx="160"
                cy="160"
                r="55"
                fill={activeLayer === 'roots' ? '#F3EFE6' : 'none'}
                stroke={activeLayer === 'roots' ? '#431407' : '#D6D3D1'}
                strokeWidth={activeLayer === 'roots' ? '3.5' : '1.5'}
                className="transition-all duration-300"
              />
              <circle
                cx="160"
                cy="160"
                r={activeLayer === 'roots' ? '12' : '6'}
                fill={activeLayer === 'roots' ? '#431407' : '#78716C'}
                className="transition-all duration-300"
              />

              {/* Axis cross lines */}
              <line x1="160" y1="35" x2="160" y2="285" stroke="#E7E5E4" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="35" y1="160" x2="285" y2="160" stroke="#E7E5E4" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
            <span className="text-xs italic text-stone-500 mt-3 text-center">
              Active Plane: {current.title}
            </span>
          </div>

          {/* Right: Rich Narrative Monograph Dossier */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                Dimension {current.number}
              </span>
              <h3 className="text-2xl font-semibold text-stone-900 mt-0.5">{current.title}</h3>
              <p className="text-sm font-medium text-stone-700 mt-1">{current.subtitle}</p>
            </div>

            <p className="text-stone-800 leading-relaxed text-sm sm:text-base">
              {current.narrative}
            </p>

            <div className="border-t border-stone-200 pt-4 space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-stone-600 font-semibold">
                Key Signatures of this Dimension:
              </h4>
              <div className="space-y-2.5">
                {current.traits.map((t, idx) => (
                  <div key={idx} className="p-3 bg-[#F3EFE6]/70 border border-stone-200 text-xs">
                    <span className="font-semibold text-stone-900 block mb-0.5">{t.label}:</span>
                    <span className="text-stone-700 leading-relaxed">{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Unified Continuum of Consciousness */}
      <div className="border border-stone-300 bg-[#F3EFE6]/50 p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-semibold text-stone-900">
          How These Three Dimensions Breathe Together
        </h3>
        <p className="text-sm text-stone-700 leading-relaxed">
          Your life is not a battle between these layers; it is an integrated symphony. When operating from fear or exhaustion, your awareness collapses into the ancient root system, resorting to hyper-independence. When operating on autopilot, you function through your outer identity layer with competent decorum. But when you pause, take a deep breath, and unburden your protective parts, your awareness opens into your evolutionary compass—allowing you to create, lead, and love with unhesitating sovereign presence.
        </p>
      </div>
    </div>
  );
};
