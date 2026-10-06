import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { synthesizeKarmicReport } from './src/engine/narrativeEngine.ts';
import type { BirthInput, NarrativeReportSections } from './src/types/jyotish.ts';
import {
  KETU_HOUSE_DATA,
  MARS_FIREFIGHTER_HOUSE_DATA,
  POLARITY_DESCRIPTIONS,
  SATURN_MANAGER_HOUSE_DATA,
} from './src/engine/karmicPolarityData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are the advanced analytical backend and interpretive engine for a next-generation Behavioral and Psychic Trajectory application. Your function is to process subconscious blueprint mappings and generate a highly elaborative, deeply subjective, and psychologically grounded "Karmic Trajectory & Behavioral Report."

CRITICAL INTELLECTUAL PROPERTY & DATA OBFUSCATION FIREWALL:
1. ABSOLUTE OBFUSCATION OF RAW METRICS: Never display, mention, or reference specific astrological degrees, planetary longitudes, specific house numbers (do not say "in the 8th house" or "10th house"), ascendants (Lagnas), or zodiac sign names (do not say "Scorpio", "Taurus", "Moon in Scorpio").
2. ZERO TECHNICAL MECHANISM DISCLOSURE: Do not explain the math, celestial calculations, or structural algorithms used to arrive at the conclusion. Keep the internal system logic entirely invisible to the user. The user must only experience the highly narrative, subjective output.
3. FLUID NARRATIVE INTEGRATION: Instead of listing out technical parameters (like "Ketu in the 8th House means..."), seamlessly weave the insights into intuitive, deeply personalized prose (e.g., write instead: "Deep within your subconscious blueprint lies an ancient, unlearned defensive mechanism that causes your nervous system to collapse into hyper-independence during conflict...").
4. FRAMEWORK TRANSLATION: Do not overtly state "Based on Internal Family Systems" or "According to Attachment Theory." Instead, integrate the concepts naturally. Refer to "your inner protective parts," "vulnerable hidden spaces," and "your automatic behavioral scripts in relationships" rather than using clinical or clinical-diagnostic textbook labeling.

DESIGN & TONE GUIDELINES:
- Speak directly to the user ("You", "Your soul", "Your psyche") to make the delivery intensely personal, intimate, and experiential rather than detached or academic.
- Frame all interpretations subjectively as a bespoke, tailored mirror reflecting the individual's inner world, existential journey, and lived experience.
- MANDATORY "ECHO" MECHANISM: For every past-life tendency identified, explicitly show its exact current-life behavioral footprint across ALL FACETS OF LIFE:
  1. Vocation, Career, Authority & Financial Security
  2. Creative Expression, Voice & Public Visibility
  3. Somatic Health, Nervous System & Stress holding patterns
  4. Family of Origin, Lineage Expectations & Ancestral Roles
  5. Existential Trust, Solitude & Spiritual Surrender
  6. Interpersonal, Friendship & Romantic Bonds
- MANDATORY SECTION-ALIGNED LAYMAN LANGUAGE TRANSLATION: For each of the three sections, include an exhaustive, highly elaborative "### Layman Language Translation" subsection.
  CRITICAL: The layman language translation MUST NOT be generic or boilerplate. It MUST be directly, intimately derived from and meticulously aligned with the specific synthesized findings, archetypes, and dynamics revealed in THAT specific section:
  - In Section 1: The Layman Translation must directly translate the *specific* identified vulnerable core, the *specific* primary protective strategist, and the *specific* emergency override reaction, giving real, concrete scenarios in the office, with money, in the body, with family, and in solitude based directly on their synthesized profile.
  - In Section 2: The Layman Translation must directly reflect the *specific* relational blueprint diagnosed (e.g. describing the actual anxious spirals, hyper-vigilance, over-checking messages, fear of abandonment, or fortress of self-sufficiency) AND the *specific* structural friction fault lines that were identified.
  - In Section 3: The Layman Translation must directly ground the *specific* growth vector, mature sovereign presence, and the *specific* personality trait shifts into concrete, everyday behavioral transformations across career, finances, physical health, creative projects, family boundaries, and intimate partnerships.
- DO NOT INCLUDE a section on behavioral integration or action steps. The report consists strictly of the three analytical sections.`;

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const HOST = '0.0.0.0';

  // 1. Immediate Health Check Endpoints for Google Cloud Run container liveness/readiness probes
  app.get(['/healthz', '/health', '/api/health'], (_req, res) => {
    res.status(200).send('OK');
  });

  app.use(express.json({ limit: '2mb' }));

  app.post('/api/synthesize', async (req, res) => {
    try {
      const { input, mode } = req.body as {
        input: BirthInput;
        mode?: 'instant' | 'deep-llm';
      };

      if (!input || !input.birthTime || !input.dateOfBirth || !input.placeOfBirth) {
        res.status(400).json({ error: 'Missing required birth parameters.' });
        return;
      }

      const baseResult = synthesizeKarmicReport(input);

      if (mode === 'deep-llm' && process.env.GEMINI_API_KEY) {
        try {
          const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              },
            },
          });

          const ketu = baseResult.planets.find((p) => p.id === 'Ketu')!;
          const rahu = baseResult.planets.find((p) => p.id === 'Rahu')!;
          const moon = baseResult.planets.find((p) => p.id === 'Moon')!;
          const saturn = baseResult.planets.find((p) => p.id === 'Saturn')!;
          const venus = baseResult.planets.find((p) => p.id === 'Venus')!;

          const polarityKey = `${ketu.house}-${rahu.house}`;
          const polarity = POLARITY_DESCRIPTIONS[polarityKey] || POLARITY_DESCRIPTIONS['1-7'];
          const ketuData = KETU_HOUSE_DATA[ketu.house] || KETU_HOUSE_DATA[1];
          const saturnData = SATURN_MANAGER_HOUSE_DATA[saturn.house] || SATURN_MANAGER_HOUSE_DATA[10];
          const marsData = MARS_FIREFIGHTER_HOUSE_DATA[baseResult.planets.find((p) => p.id === 'Mars')!.house] || MARS_FIREFIGHTER_HOUSE_DATA[1];

          const matrixContext = `
BIRTH INPUT PARAMETERS:
- Birth Time: ${input.birthTime}
- Date of Birth: ${input.dateOfBirth}
- Gender: ${input.gender}
- Place of Birth: ${input.placeOfBirth}

INTERNAL GEOMETRIC & DIVISIONAL MATRIX:
- Ascendant (Lagna): ${baseResult.ascendant.rashiName} (D9 Navamsha: ${baseResult.ascendant.navamshaName}, D60 Deity: ${baseResult.ascendant.shastiamsha.name} - ${baseResult.ascendant.shastiamsha.archetype})
- Ketu (Past-Life Node): ${ketu.rashiName} in House ${ketu.house}, D9: ${ketu.navamshaName}, D60 Deity: ${ketu.shastiamsha.name} (${ketu.shastiamsha.subconsciousImprint})
- Rahu (Evolutionary Vector): ${rahu.rashiName} in House ${rahu.house}, D9: ${rahu.navamshaName}, D60 Deity: ${rahu.shastiamsha.name}
- Nodal Axis Polarity: ${polarity.axisName} (Past Karmic Ceiling: "${polarity.karmicCeiling}"; Rahu Call: "${polarity.rahuEvolutionaryCall}")
- Moon (Psyche/Attachment): ${moon.rashiName} in House ${moon.house}, D9: ${moon.navamshaName}, D60 Deity: ${moon.shastiamsha.name}
- Saturn (Manager Defense): ${saturn.rashiName} in House ${saturn.house}, D60 Deity: ${saturn.shastiamsha.name}, Retrograde: ${saturn.isRetrograde}
- Venus (Value/Intimacy Vector): ${venus.rashiName} in House ${venus.house}, D9: ${venus.navamshaName}, D60 Deity: ${venus.shastiamsha.name}
- Structural Anomalies: ${baseResult.anomalies.map((a) => `${a.type} (${a.planetsInvolved.join('/')}) - Psychological: ${a.psychologicalLoop} - Career: ${a.vocationalEcho} - Somatic: ${a.somaticSignature} - Attachment: ${a.attachmentEcho}`).join('; ') || 'None (harmonious longitudinal distribution)'}
- IFS Mapping:
  * Exile: "${baseResult.ifs.exile.archetypeTitle}" (Origin: ${baseResult.ifs.exile.astrologicalOrigin}; Core Belief: ${baseResult.ifs.exile.coreBelief}; Somatic: ${baseResult.ifs.exile.somaticLocation})
    - Workday Trigger: ${ketuData.realWorldTuesdayScenario.workplace}
    - Money Trigger: ${ketuData.realWorldTuesdayScenario.money}
  * Manager: "${baseResult.ifs.manager.archetypeTitle}" (${saturnData.managerTitle}; Rule: "${saturnData.coreVigilanceRule}"; Focus: ${saturnData.focusArena})
    - High-Stakes Scenario: ${saturnData.weeklyWorkdayScenario}
  * Firefighter: "${baseResult.ifs.firefighter.archetypeTitle}" (${marsData.firefighterTitle}; Trigger: "${marsData.emergencyTrigger}"; Action: "${marsData.emergencyAction}")
- Attachment Architecture: ${baseResult.attachment.primaryStyle} (Secondary Pull: ${baseResult.attachment.secondaryPull}; Core Fear: ${baseResult.attachment.coreIntimacyFear}; Conflict Loop: ${baseResult.attachment.conflictTriggerLoop})
- Big Five Baseline vs Target: ${baseResult.bigFive.map((b) => `${b.trait}: Baseline ${b.baselineScore}% (${b.karmicDefaultLabel}) -> Target ${b.reconditionedTarget}% (${b.evolutionaryTargetLabel})`).join('; ')}

CRITICAL ANTI-OVERLAP & BESPOKE PERSONALIZATION INSTRUCTION:
Every finding, scenario, and layman language explanation MUST be exclusively personalized to this individual's birth chart. DO NOT use generic template paragraphs, generic corporate clichés (such as over-preparing slide decks unless specifically rooted in a 2nd/10th house placement), or standardized horoscope fillers. Every section must stem strictly from this chart's distinct combination of Ascendant, Ketu house, Saturn house, Mars house, Rahu polarity, Moon/Venus placements, and diagnosed attachment style.

SECTION 1 "THE CHRONICLES OF TIME: Your Multidimensional Soul Matrix" STRICT DIRECTIVES:
- Translate the multi-layered past-life evolutionary narrative into three distinct dimensions:
  1. The Core Identity Layer: The conscious persona and worldly interface.
  2. The Hidden Evolutionary Compass: The maturing soul trajectory and emerging purpose.
  3. The Ancient Deep-Seated Karmic Root System: The subterranean subconscious bedrock and unlearned survival instincts.
- Completely erase any mention of "D1", "D9", "D60", "Rashi", "Navamsha", "Shastiamsha", planetary degrees, house numbers, aspect lines, or specific deity names.

SECTION 2 "THE INNER ARCHETYPES: Your Subconscious Cast of Characters" STRICT DIRECTIVES:
- Describe the internal cast naturally as:
  1. Your deeply hidden vulnerable core (holding ancient wounds and unlearned dread of exposure).
  2. Your proactive day-to-day protector parts (the strategic inner guardians that enforce competence, control, and composure).
  3. Your reactive emergency coping mechanisms (the sudden override reflexes that sever tension, shut down, or blow up boundaries when overwhelmed).
- Show how ancient past-life conditioning triggers these exact internal characters in current-life psychology.
- Do NOT use clinical or textbook labels like "Internal Family Systems," "IFS," "Exiles," "Managers," "Firefighters," or "Attachment Theory."

SECTION 3 "THE SPHERES OF EXISTENCE: Real-World Behavioral Footprints" STRICT DIRECTIVES:
- Seamlessly transition the narrative into practical, everyday life pillars:
  1. Pillar 1: Relationships, Intimacy & Sacred Vulnerability
  2. Pillar 2: Career, Worldly Purpose & Wealth Sovereignty
  3. Pillar 3: Vitality, Somatic Health & Inner Peace
  4. Real-World Behavioral Micro-Experiments for everyday transformation.
- Do NOT map insights back to specific astrological houses (no "7th house", no "10th house"). Describe exactly how ancient baggage or evolutionary stretch zones materialize as automatic habits in modern office environments or romantic life.

1. section1ImplicitCode: Must start with "## 1. THE CHRONICLES OF TIME: Your Multidimensional Soul Matrix"
2. section2StructuralKnots: Must start with "## 2. THE INNER ARCHETYPES: Your Subconscious Cast of Characters"
3. section3EvolutionaryFrontier: Must start with "## 3. THE SPHERES OF EXISTENCE: Real-World Behavioral Footprints"
`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: matrixContext,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  section1ImplicitCode: { type: Type.STRING },
                  section2StructuralKnots: { type: Type.STRING },
                  section3EvolutionaryFrontier: { type: Type.STRING },
                },
                required: [
                  'section1ImplicitCode',
                  'section2StructuralKnots',
                  'section3EvolutionaryFrontier',
                ],
              },
            },
          });

          const text = response.text;
          if (text) {
            const parsed = JSON.parse(text.trim()) as NarrativeReportSections;
            if (
              parsed.section1ImplicitCode &&
              parsed.section2StructuralKnots &&
              parsed.section3EvolutionaryFrontier
            ) {
              const fullMarkdown = [
                parsed.section1ImplicitCode,
                parsed.section2StructuralKnots,
                parsed.section3EvolutionaryFrontier,
              ].join('\n\n---\n\n');

              res.json({
                ...baseResult,
                narrative: parsed,
                fullMarkdown,
                generationSource: 'gemini-enhanced-synthesis',
              });
              return;
            }
          }
        } catch (llmError) {
          console.warn('Deep LLM synthesis fallback to deterministic engine:', llmError);
        }
      }

      res.json(baseResult);
    } catch (err) {
      console.error('Synthesis error:', err);
      res.status(500).json({ error: 'Failed to synthesize Karmic Trajectory report.' });
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  const indexPath = path.resolve(distPath, 'index.html');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(indexPath);

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexHtmlPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
    }
    app.get('*', (_req, res) => {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(200).send('OK');
      }
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
