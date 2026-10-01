import React, { useState } from 'react';
import { KarmicSynthesisResult, PlanetaryPosition } from '../types/jyotish';
import { RASHI_LIST } from '../engine/jyotishEngine';

interface DivisionalChartsSVGProps {
  result: KarmicSynthesisResult;
}

const PLANET_ABBR: Record<string, string> = {
  Ascendant: 'As',
  Sun: 'Su',
  Moon: 'Mo',
  Mars: 'Ma',
  Mercury: 'Me',
  Jupiter: 'Ju',
  Venus: 'Ve',
  Saturn: 'Sa',
  Rahu: 'Ra',
  Ketu: 'Ke',
};

export const DivisionalChartsSVG: React.FC<DivisionalChartsSVGProps> = ({ result }) => {
  const [chartStyle, setChartStyle] = useState<'south' | 'north'>('south');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition>(
    result.planets.find((p) => p.id === 'Ketu') || result.planets[0]
  );

  const allBodies = [result.ascendant, ...result.planets];

  const d1ByRashi: Record<number, PlanetaryPosition[]> = {};
  const d9ByRashi: Record<number, PlanetaryPosition[]> = {};
  for (let i = 0; i < 12; i++) {
    d1ByRashi[i] = [];
    d9ByRashi[i] = [];
  }
  for (const body of allBodies) {
    d1ByRashi[body.rashiIndex]?.push(body);
    d9ByRashi[body.navamshaIndex]?.push(body);
  }

  const d1ByHouse: Record<number, PlanetaryPosition[]> = {};
  const d9ByHouse: Record<number, PlanetaryPosition[]> = {};
  for (let h = 1; h <= 12; h++) {
    d1ByHouse[h] = [];
    d9ByHouse[h] = [];
  }
  const d9AscIndex = result.ascendant.navamshaIndex;
  for (const body of allBodies) {
    d1ByHouse[body.house]?.push(body);
    const d9House = ((body.navamshaIndex - d9AscIndex + 12) % 12) + 1;
    d9ByHouse[d9House]?.push(body);
  }

  const southGridCells: Array<{ rashiIndex: number; row: number; col: number }> = [
    { rashiIndex: 11, row: 0, col: 0 },
    { rashiIndex: 0, row: 0, col: 1 },
    { rashiIndex: 1, row: 0, col: 2 },
    { rashiIndex: 2, row: 0, col: 3 },
    { rashiIndex: 3, row: 1, col: 3 },
    { rashiIndex: 4, row: 2, col: 3 },
    { rashiIndex: 5, row: 3, col: 3 },
    { rashiIndex: 6, row: 3, col: 2 },
    { rashiIndex: 7, row: 3, col: 1 },
    { rashiIndex: 8, row: 3, col: 0 },
    { rashiIndex: 9, row: 2, col: 0 },
    { rashiIndex: 10, row: 1, col: 0 },
  ];

  const northHouseCenters: Record<number, { x: number; y: number }> = {
    1: { x: 160, y: 88 },
    2: { x: 82, y: 42 },
    3: { x: 42, y: 82 },
    4: { x: 92, y: 160 },
    5: { x: 42, y: 238 },
    6: { x: 82, y: 278 },
    7: { x: 160, y: 232 },
    8: { x: 238, y: 278 },
    9: { x: 278, y: 238 },
    10: { x: 228, y: 160 },
    11: { x: 278, y: 82 },
    12: { x: 238, y: 42 },
  };

  const renderSouthChart = (
    title: string,
    subtitle: string,
    byRashi: Record<number, PlanetaryPosition[]>,
    ascRashiIdx: number
  ) => (
    <div className="border border-stone-300 bg-[#FBF9F5] p-5">
      <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
          <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-xs font-mono-tabular text-stone-600">
          Lagna: {RASHI_LIST[ascRashiIdx].name} ({RASHI_LIST[ascRashiIdx].sanskrit})
        </span>
      </div>

      <div className="grid grid-cols-4 border-t border-l border-stone-800/80 aspect-square max-w-[360px] mx-auto bg-[#F7F4EE]">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => {
            if ((row === 1 || row === 2) && (col === 1 || col === 2)) {
              if (row === 1 && col === 1) {
                return (
                  <div
                    key="center-box"
                    className="col-span-2 row-span-2 border-r border-b border-stone-800/80 flex flex-col items-center justify-center p-4 text-center bg-[#FBF9F5]"
                  >
                    <span className="font-display text-lg font-semibold text-stone-900 tracking-wide">
                      {title.split('·')[0].trim()}
                    </span>
                    <span className="text-xs text-stone-500 mt-1">
                      {result.coordinates.city}, {result.coordinates.country}
                    </span>
                    <span className="text-[11px] font-mono-tabular text-stone-500 mt-1">
                      {result.input.dateOfBirth} · {result.input.birthTime}
                    </span>
                  </div>
                );
              }
              return null;
            }

            const cell = southGridCells.find((c) => c.row === row && c.col === col)!;
            const rashi = RASHI_LIST[cell.rashiIndex];
            const occupants = byRashi[cell.rashiIndex] || [];
            const isAsc = cell.rashiIndex === ascRashiIdx;

            return (
              <div
                key={`${row}-${col}`}
                className={`border-r border-b border-stone-800/80 p-2 flex flex-col justify-between relative min-h-[78px] ${
                  isAsc ? 'bg-[#9A3412]/8' : ''
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono-tabular">
                  <span>{rashi.sanskrit.slice(0, 5)}</span>
                  {isAsc && <span className="text-[#9A3412] font-semibold">ASC</span>}
                </div>
                <div className="flex flex-wrap gap-1 my-1">
                  {occupants.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlanet(p)}
                      className={`text-xs font-mono-tabular px-1 py-0.5 transition-colors cursor-pointer ${
                        selectedPlanet.id === p.id
                          ? 'bg-[#9A3412] text-white font-semibold'
                          : p.id === 'Ascendant'
                          ? 'text-[#9A3412] font-semibold underline'
                          : 'text-stone-900 hover:bg-stone-200'
                      }`}
                      title={`${p.id} in ${rashi.name} (D60: ${p.shastiamsha.name})`}
                    >
                      {PLANET_ABBR[p.id]}
                      {p.isRetrograde && p.id !== 'Rahu' && p.id !== 'Ketu' ? 'ᴿ' : ''}
                    </button>
                  ))}
                </div>
                <div className="text-[9px] text-stone-400 font-mono-tabular text-right">
                  {rashi.index + 1}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const renderNorthChart = (
    title: string,
    subtitle: string,
    byHouse: Record<number, PlanetaryPosition[]>,
    ascRashiIdx: number
  ) => (
    <div className="border border-stone-300 bg-[#FBF9F5] p-5">
      <div className="flex items-baseline justify-between border-b border-stone-200 pb-3 mb-4">
        <div>
          <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
          <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-xs font-mono-tabular text-stone-600">
          Lagna: {RASHI_LIST[ascRashiIdx].name}
        </span>
      </div>

      <div className="max-w-[360px] mx-auto">
        <svg
          viewBox="0 0 320 320"
          className="w-full h-auto bg-[#F7F4EE] border border-stone-800"
          role="img"
          aria-label={title}
        >
          <rect x="2" y="2" width="316" height="316" fill="none" stroke="#292524" strokeWidth="1.5" />
          <line x1="2" y1="2" x2="318" y2="318" stroke="#292524" strokeWidth="1.2" />
          <line x1="318" y1="2" x2="2" y2="318" stroke="#292524" strokeWidth="1.2" />
          <polygon
            points="160,2 318,160 160,318 2,160"
            fill="none"
            stroke="#292524"
            strokeWidth="1.2"
          />

          {Object.entries(northHouseCenters).map(([hStr, pt]) => {
            const h = Number(hStr);
            const rashiNum = ((ascRashiIdx + h - 1) % 12) + 1;
            const occupants = (byHouse[h] || []).filter((p) => p.id !== 'Ascendant');
            const labelStr = occupants
              .map(
                (p) =>
                  `${PLANET_ABBR[p.id]}${
                    p.isRetrograde && p.id !== 'Rahu' && p.id !== 'Ketu' ? 'ᴿ' : ''
                  }`
              )
              .join(' ');

            return (
              <g key={h}>
                <text
                  x={pt.x}
                  y={pt.y - 10}
                  textAnchor="middle"
                  className="fill-stone-400 text-[9px] font-mono-tabular"
                >
                  {rashiNum}
                </text>
                <text
                  x={pt.x}
                  y={pt.y + 6}
                  textAnchor="middle"
                  className="fill-stone-900 text-[11px] font-mono-tabular font-semibold"
                >
                  {labelStr || '·'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300 pb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-stone-500">
            Internal Spatial-Mathematical Matrix · Lahiri Ayanamsha
          </p>
          <h2 className="text-3xl font-semibold text-stone-900 mt-1">
            Divisional Harmonic Architecture (D1 · D9 · D60)
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            This technical workbench displays the celestial vector calculations, Navamsha soul trajectory, and all 60 Parashara Shastiamsha past-life deities governing each planet.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-200/80 border border-stone-300 self-start">
          <button
            type="button"
            onClick={() => setChartStyle('south')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              chartStyle === 'south'
                ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            South Indian Grid
          </button>
          <button
            type="button"
            onClick={() => setChartStyle('north')}
            className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              chartStyle === 'north'
                ? 'bg-[#FBF9F5] text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            North Indian Kundali
          </button>
        </div>
      </div>

      {/* Telemetry Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-b border-stone-200 pb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">Lahiri Ayanamsha</div>
          <div className="text-2xl font-mono-tabular font-semibold text-stone-900 mt-1">
            {result.lahiriAyanamshaDegrees.toFixed(4)}
            <span className="text-xs font-mono-tabular text-stone-500 ml-1">deg</span>
          </div>
          <div className="text-xs text-stone-500 mt-0.5">Chitra Paksha Precession</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">Julian Ephemeris Day</div>
          <div className="text-2xl font-mono-tabular font-semibold text-stone-900 mt-1">
            {result.julianDay.toFixed(2)}
            <span className="text-xs font-mono-tabular text-stone-500 ml-1">JD</span>
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            UTC {result.coordinates.utcOffsetHours >= 0 ? `+${result.coordinates.utcOffsetHours}` : result.coordinates.utcOffsetHours}h
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">Geodetic Location</div>
          <div className="text-2xl font-mono-tabular font-semibold text-stone-900 mt-1">
            {result.coordinates.latitude.toFixed(2)}°
            <span className="text-xs font-mono-tabular text-stone-500 ml-1">
              / {result.coordinates.longitude.toFixed(2)}°
            </span>
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            {result.coordinates.city}, {result.coordinates.country}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">Ketu D60 Deity</div>
          <div className="text-2xl font-display font-semibold text-[#9A3412] mt-1">
            {result.planets.find((p) => p.id === 'Ketu')?.shastiamsha.name}
          </div>
          <div className="text-xs text-stone-500 mt-0.5">
            {result.planets.find((p) => p.id === 'Ketu')?.shastiamsha.archetype}
          </div>
        </div>
      </div>

      {/* D1 & D9 Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {chartStyle === 'south' ? (
          <>
            {renderSouthChart(
              'Rashi Chakra · D1 Root Matrix',
              'Physical foundation, baseline defenses, and inherited conditioning',
              d1ByRashi,
              result.ascendant.rashiIndex
            )}
            {renderSouthChart(
              'Navamsha · D9 Soul Trajectory',
              'Ninth harmonic wave of relational, creative, and vocational maturation',
              d9ByRashi,
              result.ascendant.navamshaIndex
            )}
          </>
        ) : (
          <>
            {renderNorthChart(
              'Rashi Kundali · D1 Root Matrix',
              'House-centric baseline and inherited conditioning',
              d1ByHouse,
              result.ascendant.rashiIndex
            )}
            {renderNorthChart(
              'Navamsha Kundali · D9 Soul Trajectory',
              'Ninth harmonic wave of soul trajectory',
              d9ByHouse,
              result.ascendant.navamshaIndex
            )}
          </>
        )}
      </div>

      {/* Selected Graha Spotlight */}
      <div className="border border-stone-300 bg-[#F3EFE6]/60 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-300 pb-3 mb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9A3412]">
              Active Shastiamsha (D60) Spotlight · Click Any Graha in Table Below
            </span>
            <h3 className="text-2xl font-semibold text-stone-900 mt-0.5">
              {selectedPlanet.id} ({selectedPlanet.sanskritName}) in {selectedPlanet.rashiName} · Governed by {selectedPlanet.shastiamsha.name} ({selectedPlanet.shastiamsha.archetype})
            </h3>
          </div>
          <div className="text-xs font-mono-tabular text-stone-600">
            Division #{selectedPlanet.shastiamsha.index}/60 · {selectedPlanet.shastiamsha.nature}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-stone-900 mb-1">Subconscious Imprint</h4>
            <p className="text-stone-700 leading-relaxed capitalize-first">
              {selectedPlanet.shastiamsha.subconsciousImprint}.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 mb-1">Carried Vulnerability (Exile)</h4>
            <p className="text-stone-700 leading-relaxed">
              Manifests as {selectedPlanet.shastiamsha.exileWound}.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 mb-1">Protective Defense (Manager)</h4>
            <p className="text-stone-700 leading-relaxed">
              Deploys {selectedPlanet.shastiamsha.protectorStrategy}.
            </p>
          </div>
        </div>
      </div>

      {/* Complete Table */}
      <div>
        <h3 className="text-2xl font-semibold text-stone-900 mb-2">
          Complete Planetary & Shastiamsha (D60) Matrix
        </h3>
        <p className="text-xs text-stone-500 mb-4">
          Select any row to inspect its specific D60 deity imprint and psychological translation above.
        </p>

        <div className="overflow-x-auto border border-stone-300 bg-[#FBF9F5]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-300 bg-[#F3EFE6] text-xs uppercase tracking-wider text-stone-600">
                <th className="py-3 px-4 font-semibold">Graha</th>
                <th className="py-3 px-4 font-semibold">D1 Rashi</th>
                <th className="py-3 px-4 font-semibold">Bhava</th>
                <th className="py-3 px-4 font-semibold">Arc</th>
                <th className="py-3 px-4 font-semibold">D9 Navamsha</th>
                <th className="py-3 px-4 font-semibold">D60 Shastiamsha Deity</th>
                <th className="py-3 px-4 font-semibold">Structural State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {allBodies.map((body) => {
                const isSelected = selectedPlanet.id === body.id;
                const stateFlags: string[] = [];
                if (body.isRetrograde && body.id !== 'Rahu' && body.id !== 'Ketu') {
                  stateFlags.push('Vakri (Retrograde)');
                }
                if (body.isGandanta) stateFlags.push('Gandanta Knot');
                else if (body.isSandhi) stateFlags.push('Rashi Sandhi');
                if (body.dignity !== 'Neutral') stateFlags.push(body.dignity);
                if (stateFlags.length === 0) stateFlags.push('Nominal Vector');

                return (
                  <tr
                    key={body.id}
                    onClick={() => setSelectedPlanet(body)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#9A3412]/10' : 'hover:bg-stone-100/80'
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-stone-900 whitespace-nowrap">
                      {body.id} <span className="text-stone-500 font-normal">· {body.sanskritName}</span>
                    </td>
                    <td className="py-3 px-4 text-stone-800 whitespace-nowrap">
                      {body.rashiName} <span className="text-stone-400">({body.rashiSanskrit})</span>
                    </td>
                    <td className="py-3 px-4 font-mono-tabular text-stone-700">
                      H{body.house}
                    </td>
                    <td className="py-3 px-4 font-mono-tabular text-stone-700 whitespace-nowrap">
                      {body.degreeInRashi.toFixed(2)}°
                    </td>
                    <td className="py-3 px-4 text-stone-800 whitespace-nowrap">
                      {body.navamshaName}
                    </td>
                    <td className="py-3 px-4 text-stone-900">
                      <span className="font-semibold text-[#9A3412]">{body.shastiamsha.name}</span>
                      <span className="text-stone-500 text-xs ml-1.5">
                        · {body.shastiamsha.archetype}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-stone-600 whitespace-nowrap">
                      {stateFlags.join(' · ')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
