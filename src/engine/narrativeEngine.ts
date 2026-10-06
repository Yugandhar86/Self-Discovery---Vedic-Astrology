import type {
  AttachmentDynamics,
  AttachmentStyleName,
  BigFiveDimension,
  BirthInput,
  IFSMapping,
  KarmicSynthesisResult,
  LifeFacetsImpact,
  NarrativeReportSections,
  PlanetaryPosition,
  StructuralAnomaly,
} from '../types/jyotish.ts';
import {
  calculatePlanetaryMatrix,
  formatRawSchemaInput,
  HOUSE_PSYCHOLOGY,
  RASHI_LIST,
} from './jyotishEngine.ts';
import {
  KETU_HOUSE_DATA,
  MARS_FIREFIGHTER_HOUSE_DATA,
  POLARITY_DESCRIPTIONS,
  SATURN_MANAGER_HOUSE_DATA,
} from './karmicPolarityData.ts';

function buildPersonalizedAttachmentFacets(
  primaryStyle: AttachmentStyleName,
  secondaryPull: string,
  moon: PlanetaryPosition,
  moonHouseInfo: { name: string; arena: string },
  venus: PlanetaryPosition,
  venusHouseInfo: { name: string; arena: string },
  saturn: PlanetaryPosition,
  saturnHouseInfo: { name: string; arena: string }
): LifeFacetsImpact {
  if (primaryStyle === 'Dismissive-Avoidant') {
    return {
      vocationAndMoney: `Operating as a solitary contractor in ${saturnHouseInfo.arena}. Deep within your emotional processing, you distrust commercial co-mingling, preferring to carry 100% of operational responsibility rather than endure the vulnerability of relying on an unreliable partner.`,
      creativeVoiceAndVisibility: `Guarded creative delivery; you present polished, highly intellectualized work while discounting public applause as superficial because praise does not penetrate your protective perimeter.`,
      somaticHealthAndNervousSystem: `Hypo-arousal masking acute stress; you ignore early physical symptoms in chronic muscular holding patterns until your body forces a total solitary down-regulation.`,
      familyLineageAndAncestralRoles: `Playing the polite, accomplished relative who shows up with financial or logistical aid while keeping all personal struggles, heartaches, and vulnerabilities strictly invisible.`,
      existentialTrustAndSolitude: `Radical self-sufficiency treated as spiritual dogma; you struggle to surrender to divine grace because relying on anything unseen feels like an existential risk.`,
      interpersonalAndRomanticBonds: `The autonomous fortress: pulling partners close with your stability in ${venusHouseInfo.arena}, then retreating into cold, monosyllabic distance when emotional dependence deepens.`,
    };
  }

  if (primaryStyle === 'Anxious-Preoccupied') {
    return {
      vocationAndMoney: `Over-functioning as the workplace caretaker in ${moonHouseInfo.arena}. You obsess over email tone and managerial body language, staying late to fix other people's deliverables out of an underlying dread of being deemed expendable.`,
      creativeVoiceAndVisibility: `Intense hunger for emotional resonance; when a public offering or creative proposal receives quiet or delayed feedback, your system enters an impostor syndrome spiral.`,
      somaticHealthAndNervousSystem: `Hyper-arousal, rapid pulse, and digestive flutter whenever interpersonal friction surfaces in your professional or personal orbit.`,
      familyLineageAndAncestralRoles: `The family's emotional sponge; absorbing ancestral guilt and sibling distress, feeling personally responsible for the happiness of the entire lineage.`,
      existentialTrustAndSolitude: `Solitude quickly turns into existential ache and abandonment panic; you constantly seek external connection to reassure your nervous system of safety.`,
      interpersonalAndRomanticBonds: `Hyper-vigilant temperature checking: interpreting a partner's quietness or need for space in ${venusHouseInfo.arena} as catastrophic loss of love, triggering urgent protest behavior.`,
    };
  }

  if (primaryStyle === 'Fearful-Avoidant (Disorganized)') {
    return {
      vocationAndMoney: `Volatile professional cycles in ${saturnHouseInfo.arena}: launching collaborative ventures with incandescent passion, then experiencing claustrophobic panic and abruptly severing equity ties when expectations mount.`,
      creativeVoiceAndVisibility: `Raw, electrifying, and deeply transformative voice that captivates audiences, followed by acute vulnerability hangovers where you hide or delete your public presence.`,
      somaticHealthAndNervousSystem: `Whiplash between sympathetic fight-or-flight agitation and parasympathetic dorsal collapse, requiring intensive grounding to stabilize.`,
      familyLineageAndAncestralRoles: `Intense push-pull dynamic with parents and relatives: fierce protective loyalty punctuated by explosive boundary ruptures when past emotional injuries are touched.`,
      existentialTrustAndSolitude: `Vacillating between mystical longing for cosmic union and acute paranoia that life itself is fundamentally rigged with trapdoors.`,
      interpersonalAndRomanticBonds: `The approach-avoidance storm: drawing lovers in with breathtaking soul depth, then feeling suffocated and picking fights to regain solitary breathing room in ${venusHouseInfo.arena}.`,
    };
  }

  // Earned Secure variations
  return {
    vocationAndMoney: `Grounded leadership and transparent delegation in ${saturnHouseInfo.arena}; communicating expectations with clarity and sharing financial equity without panic or hyper-control.`,
    creativeVoiceAndVisibility: `Sharing your gifts with sovereign confidence in ${venusHouseInfo.arena}; receiving praise with genuine gratitude and evaluating critique without personal collapse.`,
    somaticHealthAndNervousSystem: `Attuned somatic regulation; noticing when stress accumulates and pausing to restore parasympathetic calm before physical symptoms manifest.`,
    familyLineageAndAncestralRoles: `Holding calm, compassionate boundaries with relatives; refusing to be pulled into generational dysfunction while maintaining warm, sovereign contact.`,
    existentialTrustAndSolitude: `Resting in authentic existential trust, knowing that both solitary independence and deep interdependence are natural expressions of your soul.`,
    interpersonalAndRomanticBonds: `Real-time relational repair in ${venusHouseInfo.arena}; naming emotional triggers openly and asking for closeness without defensive withdrawal or protest games.`,
  };
}

function deriveIFSMapping(
  ascendant: PlanetaryPosition,
  planets: PlanetaryPosition[]
): IFSMapping {
  const ketu = planets.find((p) => p.id === 'Ketu')!;
  const moon = planets.find((p) => p.id === 'Moon')!;
  const saturn = planets.find((p) => p.id === 'Saturn')!;
  const mars = planets.find((p) => p.id === 'Mars')!;
  const rahu = planets.find((p) => p.id === 'Rahu')!;

  const ketuHouseInfo = HOUSE_PSYCHOLOGY[ketu.house];
  const saturnHouseInfo = HOUSE_PSYCHOLOGY[saturn.house];
  const marsHouseInfo = HOUSE_PSYCHOLOGY[mars.house];
  const ketuRashi = RASHI_LIST[ketu.rashiIndex];
  const moonRashi = RASHI_LIST[moon.rashiIndex];

  const ketuData = KETU_HOUSE_DATA[ketu.house] || KETU_HOUSE_DATA[1];
  const saturnData = SATURN_MANAGER_HOUSE_DATA[saturn.house] || SATURN_MANAGER_HOUSE_DATA[10];
  const marsData = MARS_FIREFIGHTER_HOUSE_DATA[mars.house] || MARS_FIREFIGHTER_HOUSE_DATA[1];

  const exileTitle = `The Solitary Witness of the Inner Sanctuary`;
  const managerTitle = `The Strategic Architect of Order & Composure`;
  const firefighterTitle = `The Sovereign Breaker of False Containment`;

  return {
    exile: {
      role: 'Vulnerable Core (Hidden Vulnerability)',
      archetypeTitle: exileTitle,
      astrologicalOrigin: `Subconscious memory of ${ketuData.pastLifeSurvivalGenius}`,
      coreBelief: `"If I allow myself to need unguarded support in ${ketuHouseInfo.arena}, I will face ${ketuData.exileCoreDread}."`,
      pastLifeImprint: `Ingrained subconscious memory: ${ketu.shastiamsha.subconsciousImprint}. You developed ${ketuData.pastLifeSurvivalGenius} within your emotional foundation.`,
      currentLifeFootprint: `Manifests today as ${ketu.shastiamsha.exileWound} focused specifically in ${ketuHouseInfo.arena}.`,
      somaticLocation: ketuData.exileSomaticFascia,
      unburdeningKey: `Witnessing this part from adult self-leadership without demanding that it justify its existence through hyper-competence or self-erasure.`,
      lifeFacets: ketuData.facets,
    },
    manager: {
      role: 'Primary Protector (Strategic Guardian)',
      archetypeTitle: managerTitle,
      astrologicalOrigin: `Instinctive drive toward structural self-reliance and order in ${saturnHouseInfo.arena}`,
      coreBelief: `"I must anticipate every structural, financial, and emotional variable in ${saturnHouseInfo.arena} so my vulnerable core is never blindsided by ${ketuData.exileCoreDread}."`,
      pastLifeImprint: `Carries the memory of survival requiring unyielding composure, strategic patience, and self-denial in ${saturnHouseInfo.arena}.`,
      currentLifeFootprint: `Operates as ${saturnData.coreVigilanceRule}—managing your standing and output in ${saturnHouseInfo.arena}.`,
      somaticLocation: saturnData.somaticLocation,
      unburdeningKey: `Honoring its years of tireless protection while gently proving that your adult presence can handle unpredictability in ${saturnHouseInfo.arena} without collapsing.`,
      lifeFacets: saturnData.facets,
    },
    firefighter: {
      role: 'Emergency Reflex (Reactive Override)',
      archetypeTitle: firefighterTitle,
      astrologicalOrigin: `Emergency impulse to break tension when emotional overwhelm threatens`,
      coreBelief: `"When control fails in ${saturnHouseInfo.arena} and vulnerability threatens to flood the body, I must immediately sever the tension and reset the field."`,
      pastLifeImprint: `Emergency instinct: choosing ${marsData.emergencyAction.toLowerCase()} over prolonged helplessness.`,
      currentLifeFootprint: `Deploys when cornered: ${marsData.emergencyTrigger} Triggering: ${marsData.emergencyAction}`,
      somaticLocation: `Sympathetic nervous system surge through ${mars.house === 1 ? 'facial blood flow and cranial muscles' : mars.house === 4 ? 'solar plexus, chest, and throat' : 'chest and extremities'}—either an acute flash of heat demanding action or an icy numbness.`,
      unburdeningKey: `Recognizing the physiological wave before acting on the impulse to blow up a project or cut off a relationship; providing safe, embodied discharge.`,
      lifeFacets: marsData.facets,
    },
    selfLeadershipAnchor: `Anchored in your unburdened sovereign center: a spacious, unhurried, compassionate witness capable of holding both fierce autonomy and courageous collaboration across all life arenas.`,
    mandatoryEchoSummary: `Subconscious Imprint ➔ Vulnerable Core (${ketu.shastiamsha.exileWound}) ➔ Guarded daily by Strategic Guardian & Emergency Reflex.`,
  };
}

function deriveAttachmentDynamics(
  ascendant: PlanetaryPosition,
  planets: PlanetaryPosition[],
  anomalies: StructuralAnomaly[]
): AttachmentDynamics {
  const moon = planets.find((p) => p.id === 'Moon')!;
  const venus = planets.find((p) => p.id === 'Venus')!;
  const saturn = planets.find((p) => p.id === 'Saturn')!;
  const ketu = planets.find((p) => p.id === 'Ketu')!;
  const rahu = planets.find((p) => p.id === 'Rahu')!;

  const moonHouseInfo = HOUSE_PSYCHOLOGY[moon.house];
  const venusHouseInfo = HOUSE_PSYCHOLOGY[venus.house];
  const saturnHouseInfo = HOUSE_PSYCHOLOGY[saturn.house];

  const hasGandantaOrSandhi = anomalies.some(
    (a) => a.type === 'Gandanta Knot' || a.type === 'Rashi Sandhi Junction'
  );
  const hasRetroInner = planets.some(
    (p) => (p.id === 'Venus' || p.id === 'Mercury' || p.id === 'Mars') && p.isRetrograde
  );

  let primaryStyle: AttachmentStyleName = 'Fearful-Avoidant (Disorganized)';
  let secondaryPull = `Dismissive-Avoidant self-reliance across ${saturnHouseInfo.arena} and personal relationships`;

  if (moon.rashiElement === 'Earth' || moon.rashiElement === 'Air') {
    if (ketu.house === 1 || ketu.house === 4 || ketu.house === 7 || saturn.isRetrograde) {
      primaryStyle = 'Dismissive-Avoidant';
      secondaryPull = `Covert longing for emotional resonance masked by formidable intellectual autonomy in ${saturnHouseInfo.arena}`;
    } else {
      primaryStyle = 'Earned Secure with Avoidant Undertones';
      secondaryPull = `Reflexive intellectualization when emotional friction surfaces in ${venusHouseInfo.arena}`;
    }
  } else if (moon.rashiElement === 'Water') {
    if (hasGandantaOrSandhi || hasRetroInner) {
      primaryStyle = 'Fearful-Avoidant (Disorganized)';
      secondaryPull = `Oscillation between intense empathic dedication in ${moonHouseInfo.arena} and sudden self-protective withdrawal`;
    } else {
      primaryStyle = 'Anxious-Preoccupied';
      secondaryPull = `Caretaker over-functioning in ${moonHouseInfo.arena} followed by silent exhaustion when unreciprocated`;
    }
  } else {
    if (hasGandantaOrSandhi) {
      primaryStyle = 'Fearful-Avoidant (Disorganized)';
      secondaryPull = `Passionate creative drive followed by sudden claustrophobic autonomy defense in ${venusHouseInfo.arena}`;
    } else {
      primaryStyle = 'Earned Secure with Anxious Undertones';
      secondaryPull = `Urgency for immediate relational resolution and discomfort with ambiguity in ${venusHouseInfo.arena}`;
    }
  }

  const lifeFacetsExpression = buildPersonalizedAttachmentFacets(
    primaryStyle,
    secondaryPull,
    moon,
    moonHouseInfo,
    venus,
    venusHouseInfo,
    saturn,
    saturnHouseInfo
  );

  let coreIntimacyFear = '';
  let protestOrWithdrawalBehavior = '';
  let conflictTriggerLoop = '';

  if (primaryStyle === 'Dismissive-Avoidant') {
    coreIntimacyFear = `That surrendering your self-protective independence in ${venusHouseInfo.arena} will compromise your sovereign autonomy, leaving you reliant on people who will inevitably fail or restrict you.`;
    protestOrWithdrawalBehavior = `When sensing emotional demands or subtle critique in ${venusHouseInfo.arena}, your nervous system shuts down vulnerability—retreating into hyper-rational composure, solitary execution in ${saturnHouseInfo.arena}, and emotional silence.`;
    conflictTriggerLoop = `In moments of tension around ${saturnHouseInfo.arena} or ${venusHouseInfo.arena}, others interpret your composed silence as cold indifference; their frustration causes you to retreat further behind intellectual walls, confirming your belief that reliance on others is hazardous.`;
  } else if (primaryStyle === 'Anxious-Preoccupied') {
    coreIntimacyFear = `That failing to be constantly attuned, helpful, and indispensable in ${moonHouseInfo.arena} will reveal you as expendable, provoking sudden abandonment or emotional exile.`;
    protestOrWithdrawalBehavior = `When sensing emotional coolness, delayed responses, or ambiguity in ${venusHouseInfo.arena}, your nervous system spikes into hyper-arousal—compulsively over-explaining, double-checking agreements, or taking on extra labor in ${saturnHouseInfo.arena} to guarantee belonging.`;
    conflictTriggerLoop = `Your urgent bids for connection in ${venusHouseInfo.arena} are experienced by partners or colleagues as overwhelming pressure; when they withdraw to catch their breath, your abandonment panic spikes, intensifying the protest cycle.`;
  } else if (primaryStyle === 'Fearful-Avoidant (Disorganized)') {
    coreIntimacyFear = `That entering genuine intimacy in ${venusHouseInfo.arena} is an impossible double-bind: maintaining distance starves you of deep soul connection, while stepping close leaves you vulnerable to betrayal, engulfment, or humiliation.`;
    protestOrWithdrawalBehavior = `A turbulent approach-avoidance pendulum: initiating profound, magnetic intimacy in ${venusHouseInfo.arena}, followed by acute claustrophobic panic and abrupt, preemptive severance of ties when emotional vulnerability deepens.`;
    conflictTriggerLoop = `You draw people in with incandescent emotional depth, but as commitments solidify in ${saturnHouseInfo.arena}, you feel cornered and pick fights or vanish; when they pull back, panic strikes and you scramble to pull them back, producing chronic emotional whiplash.`;
  } else {
    coreIntimacyFear = `That under severe structural exhaustion or relational betrayal in ${venusHouseInfo.arena}, your old defenses will tempt you to close your heart and revert to solitary fortress mentality.`;
    protestOrWithdrawalBehavior = `Recognizing micro-impulses to withdraw or over-control in ${saturnHouseInfo.arena}, and consciously choosing to pause, ground the nervous system, and communicate with non-defensive vulnerability.`;
    conflictTriggerLoop = `Sensing relational discord early and initiating grounded, compassionate repair in ${venusHouseInfo.arena} before defensive armor can calcify.`;
  }

  const earnedSecurityPathway = `Consciously naming your micro-withdrawals in real time across work, money, and intimacy before protective walls harden.`;

  return {
    primaryStyle,
    secondaryPull,
    astrologicalCatalyst: `The internal friction between your deep instinctual emotional needs, your capacity for shared vulnerability, and your demands for structural self-containment`,
    coreIntimacyFear,
    protestOrWithdrawalBehavior,
    conflictTriggerLoop,
    earnedSecurityPathway,
    mandatoryEchoSummary: `Emotional Digestion ➔ Relational Containment Reflex ➔ Sovereign Intimacy Pattern.`,
    lifeFacetsExpression,
  };
}

function deriveBigFiveDimensions(
  ascendant: PlanetaryPosition,
  planets: PlanetaryPosition[]
): BigFiveDimension[] {
  const moon = planets.find((p) => p.id === 'Moon')!;
  const saturn = planets.find((p) => p.id === 'Saturn')!;
  const jupiter = planets.find((p) => p.id === 'Jupiter')!;
  const mercury = planets.find((p) => p.id === 'Mercury')!;
  const venus = planets.find((p) => p.id === 'Venus')!;
  const mars = planets.find((p) => p.id === 'Mars')!;
  const rahu = planets.find((p) => p.id === 'Rahu')!;
  const ketu = planets.find((p) => p.id === 'Ketu')!;

  const baseNeuroticism = Math.min(88, Math.max(58, 64 + (moon.shastiamsha.nature.startsWith('Krura') ? 14 : 4) + (moon.isSandhi ? 8 : 0)));
  const targetNeuroticism = Math.max(28, baseNeuroticism - 34);

  const baseOpenness = Math.min(92, Math.max(62, 68 + (jupiter.rashiElement === 'Air' || jupiter.rashiElement === 'Water' ? 12 : 6)));
  const targetOpenness = Math.min(96, baseOpenness + 12);

  const baseConscientiousness = Math.min(90, Math.max(55, 66 + (saturn.dignity === 'Own Sign' || saturn.dignity === 'Exalted' ? 14 : 6)));
  const targetConscientiousness = Math.min(88, Math.max(72, baseConscientiousness + 6));

  const baseAgreeableness = Math.min(85, Math.max(48, 58 + (venus.rashiElement === 'Water' || venus.rashiElement === 'Air' ? 12 : -4)));
  const targetAgreeableness = 76;

  const baseExtraversion = Math.min(82, Math.max(42, 52 + (ascendant.rashiElement === 'Fire' || ascendant.rashiElement === 'Air' ? 14 : -6)));
  const targetExtraversion = Math.min(84, baseExtraversion + 16);

  return [
    {
      trait: 'Emotional Sensitivity & Somatic Equanimity',
      baselineScore: baseNeuroticism,
      reconditionedTarget: targetNeuroticism,
      karmicDefaultLabel: 'Hyper-Vigilant Threat Scanning',
      evolutionaryTargetLabel: 'Self-Led Somatic Equanimity',
      shadowExpression: `Your baseline nervous system runs covert background simulations of potential disaster across career, finances, health, and relationships, mistaking chronic vigilance for safety.`,
      selfLedExpression: `As your vulnerable core is unburdened and met with calm adult presence, that acute sensitivity transforms into high-resolution intuitive perception without sympathetic nervous system flooding.`,
      stretchMechanism: `Anchoring in your present growth frontier and trusting your capacity to handle uncertainty in real time.`,
      lifeArenaImpact: `Career & Money: Replaces catastrophic forecasting with strategic resource stewardship. Health: Prevents adrenal burn. Relationships: Calms over-analysis of subtle emotional cues.`,
    },
    {
      trait: 'Receptivity to Experience & Creative Fluidity',
      baselineScore: baseOpenness,
      reconditionedTarget: targetOpenness,
      karmicDefaultLabel: 'Selective Conceptual Mastery',
      evolutionaryTargetLabel: 'Embodied Experiential Fluidity',
      shadowExpression: `You possess immense intellectual depth, yet your inner guardian restricts real-world experimentation when an outcome cannot be guaranteed in advance.`,
      selfLedExpression: `Stepping into your mature presence allows curiosity to move from mental conceptualization into direct action—welcoming creative play, career pivots, and unscripted experiences.`,
      stretchMechanism: `Releasing the need to master an arena conceptually before allowing yourself to participate as an authentic beginner.`,
      lifeArenaImpact: `Creative Voice: Releasing unpolished work without fear of critique. Vocation: Venturing into novel, high-leverage initiatives. Spirituality: Moving from conceptual study to direct living experience.`,
    },
    {
      trait: 'Sustained Craftsmanship & Devotional Rhythm',
      baselineScore: baseConscientiousness,
      reconditionedTarget: targetConscientiousness,
      karmicDefaultLabel: 'Compulsive Armor & Over-Responsibility',
      evolutionaryTargetLabel: 'Aligned Devotional Craft',
      shadowExpression: `An ingrained, punishing work ethic where rest feels unearned and minor professional oversights trigger intense internal self-monitoring.`,
      selfLedExpression: `When discipline is decoupled from survival anxiety, your craft becomes joyful, sustainable mastery with abundant space for restoration and community.`,
      stretchMechanism: `Replacing punitive self-monitoring with rhythm-based devotion and trusting others to hold shared responsibilities.`,
      lifeArenaImpact: `Health: Honoring circadian rhythms and restorative downtime. Vocation: Delegating operational tasks without anxiety. Family: Refusing to fix problems that belong to other adults.`,
    },
    {
      trait: 'Relational Generosity & Sovereign Boundaries',
      baselineScore: baseAgreeableness,
      reconditionedTarget: targetAgreeableness,
      karmicDefaultLabel: 'Polarized Compliance or Fortified Autonomy',
      evolutionaryTargetLabel: 'Boundary-Rich Compassion',
      shadowExpression: `You alternate between over-accommodating colleagues, clients, and partners to keep the peace, and suddenly erecting rigid emotional walls when feeling exploited.`,
      selfLedExpression: `In your mature presence, you stay warm, generous, and collaborative while upholding clear, non-defensive boundaries from the outset.`,
      stretchMechanism: `Voicing personal preferences, financial terms, and emotional boundaries early so resentment never has to accumulate.`,
      lifeArenaImpact: `Career: Negotiating fair compensation without apology. Relationships: Disagreeing without withdrawing love. Lineage: Breaking guilt-based ancestral obligations with grace.`,
    },
    {
      trait: 'Sovereign Visibility & Authentic Presence',
      baselineScore: baseExtraversion,
      reconditionedTarget: targetExtraversion,
      karmicDefaultLabel: 'Guarded Selective Visibility',
      evolutionaryTargetLabel: 'Sovereign Relational Presence',
      shadowExpression: `While you possess natural presence and insight, an ancient reflex pulls you into private retreat, masking your true capabilities behind safe, low-profile roles.`,
      selfLedExpression: `By leaning into your growth frontier, you stop performing energy for others and show up with authentic, sustainable personal and leadership visibility.`,
      stretchMechanism: `Allowing yourself to be seen, recognized, and compensated at scale rather than hiding behind private competence.`,
      lifeArenaImpact: `Vocation: Claiming leadership, speaking opportunities, and market visibility. Creative Voice: Sharing your creations unreservedly. Community: Building an aligned, inspiring network.`,
    },
  ];
}

export function generateExhaustiveNarrative(
  input: BirthInput,
  ascendant: PlanetaryPosition,
  planets: PlanetaryPosition[],
  anomalies: StructuralAnomaly[],
  ifs: IFSMapping,
  attachment: AttachmentDynamics,
  bigFive: BigFiveDimension[]
): NarrativeReportSections {
  const moon = planets.find((p) => p.id === 'Moon')!;
  const mars = planets.find((p) => p.id === 'Mars')!;
  const venus = planets.find((p) => p.id === 'Venus')!;
  const saturn = planets.find((p) => p.id === 'Saturn')!;
  const rahu = planets.find((p) => p.id === 'Rahu')!;
  const ketu = planets.find((p) => p.id === 'Ketu')!;
  const sun = planets.find((p) => p.id === 'Sun')!;
  const mercury = planets.find((p) => p.id === 'Mercury')!;
  const jupiter = planets.find((p) => p.id === 'Jupiter')!;

  const ascRashi = RASHI_LIST[ascendant.rashiIndex];
  const ketuRashi = RASHI_LIST[ketu.rashiIndex];
  const rahuRashi = RASHI_LIST[rahu.rashiIndex];
  const moonRashi = RASHI_LIST[moon.rashiIndex];
  const saturnRashi = RASHI_LIST[saturn.rashiIndex];
  const venusRashi = RASHI_LIST[venus.rashiIndex];
  const sunRashi = RASHI_LIST[sun.rashiIndex];
  const mercuryRashi = RASHI_LIST[mercury.rashiIndex];
  const jupiterRashi = RASHI_LIST[jupiter.rashiIndex];
  const navAscRashi = RASHI_LIST[ascendant.navamshaIndex];
  const navVenusRashi = RASHI_LIST[venus.navamshaIndex];
  const navMoonRashi = RASHI_LIST[moon.navamshaIndex];
  const navSaturnRashi = RASHI_LIST[saturn.navamshaIndex];

  const ketuHouse = HOUSE_PSYCHOLOGY[ketu.house];
  const rahuHouse = HOUSE_PSYCHOLOGY[rahu.house];
  const saturnHouse = HOUSE_PSYCHOLOGY[saturn.house];
  const venusHouse = HOUSE_PSYCHOLOGY[venus.house];
  const moonHouse = HOUSE_PSYCHOLOGY[moon.house];

  const ketuData = KETU_HOUSE_DATA[ketu.house] || KETU_HOUSE_DATA[1];
  const saturnData = SATURN_MANAGER_HOUSE_DATA[saturn.house] || SATURN_MANAGER_HOUSE_DATA[10];
  const marsData = MARS_FIREFIGHTER_HOUSE_DATA[mars.house] || MARS_FIREFIGHTER_HOUSE_DATA[1];

  const polarityKey = `${ketu.house}-${rahu.house}`;
  const polarity = POLARITY_DESCRIPTIONS[polarityKey] || POLARITY_DESCRIPTIONS['1-7'];
  const sanitizedAxisName = polarity.axisName
    .replace(/\(\d+(st|nd|rd|th)\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // SECTION 1: THE CHRONICLES OF TIME: Your Multidimensional Soul Matrix
  const section1ImplicitCode = `## 1. THE CHRONICLES OF TIME: Your Multidimensional Soul Matrix

You did not arrive in this world as a blank canvas or an unformed slate. Your human journey in ${input.placeOfBirth.split(',')[0]} is the physical crystallization of an ancient, multidimensional odyssey—a continuous thread of consciousness woven across epochs. When experienced from within, your existence does not operate as a single-dimensional personality. Instead, your psyche functions as an interconnected, three-tiered continuum: a conscious waking presence engaging the world, a maturing evolutionary compass guiding your unfolding future, and a subterranean root system carrying unlearned instincts from forgotten horizons.

### The First Dimension: The Core Identity Layer
At the surface of your waking awareness lies your primary worldly interface—the distinct energetic signature, cognitive orientation, and instinctual temperament through which you engage daily reality. This is the conscious vessel you inhabit every day. It shapes how your voice sounds in an executive room, how you absorb new information, and how you naturally organize your energy and commitments.

In your everyday existence, this conscious layer presents as ${ascRashi.psychologicalDomain.toLowerCase()}. You naturally filter external reality through ${
    ascRashi.element === 'Fire'
      ? 'an electric impulse toward initiative, sovereign movement, and decisive clarity'
      : ascRashi.element === 'Earth'
        ? 'a patient, discerning pragmatism that demands tangible results, structural stability, and grounded excellence'
        : ascRashi.element === 'Air'
          ? 'a nimble, intellectual curiosity that constantly synthesizes concepts, decodes social nuance, and seeks mental resonance'
          : 'a deep, perceptive emotional radar that attunes to unspoken currents, atmospheric moods, and subterranean human truths'
  }. Yet while this outer self provides your functional interface with society, it is only the threshold of a far deeper psychic continuum.

### The Second Dimension: The Hidden Evolutionary Compass
Beneath your daily persona lives a subtle, maturing soul current—an internal navigational compass that remains quiet in early youth but exerts an increasingly magnetic pull as your life deepens. Where your outer personality reflects who you were conditioned to be by family and culture, this second dimension reflects who your consciousness is actively striving to become.

This evolutionary compass is calibrated toward ${navAscRashi.psychologicalDomain.toLowerCase()}. If your outer layer tends toward protective caution or analytical reserve, this interior compass urges you toward ${
    navAscRashi.element === 'Fire'
      ? 'unhesitating creative courage and sovereign visibility'
      : navAscRashi.element === 'Earth'
        ? 'enduring craftsmanship, sustainable mastery, and grounded stewardship'
        : navAscRashi.element === 'Air'
          ? 'spacious objectivity, visionary diplomacy, and unburdened communication'
          : 'profound empathic wisdom and heartfelt emotional presence'
  }. As you encounter life's inevitable turning points—career transitions, heartbreak, or existential awakenings—your outer persona gradually yields to the quiet authority of this inner compass. You discover that mature fulfillment does not come from polishing your past armor, but from surrendering to this ripened frequency.

### The Third Dimension: The Ancient Deep-Seated Karmic Root System
Deepest of all, beneath conscious thought and conscious aspiration, lies your ancient karmic root system—the subterranean bedrock of your subconscious memory. Long before you drew your first breath, your nervous system was already imprinted with ${ketu.shastiamsha.subconsciousImprint}.

This subterranean layer holds the residual muscle memory of lifetimes spent navigating ${ketuHouse.arena}. In those distant chapters, your survival, dignity, and belonging depended entirely on your ability to maintain absolute self-sufficiency and vigilance. Because your internal system over-mastered this territory to the point of spiritual exhaustion, you arrived in this life with an innate genius for reading unspoken dynamics, managing crisis, and enduring isolation. Yet because this root system is unlearned, it operates like an invisible gravitational current: whenever you feel tired, threatened, or misunderstood, your entire biology instinctively retreats into this ancient, solitary stronghold, treating vulnerability not as an invitation to connection, but as an existential hazard.

---

### Translating the Multidimensional Soul Matrix into Your Waking Experience
When these three dimensions interface with daily reality, they create your signature way of experiencing the world:
- **Your Everyday Conscious Interface:** You walk into meetings and social gatherings with the natural presence of ${ascRashi.psychologicalDomain.toLowerCase()}, organizing tasks with quiet discipline.
- **Your Subconscious Gravitational Pull:** Under pressure, your ancient roots pull you backward into protective isolation—reminding you of the ancient vow that total self-sufficiency in ${ketuHouse.arena} is your only guarantee of safety.
- **Your Maturing Evolutionary Pull:** In moments of stillness, your hidden compass whispers that true power lies forward in ${navAscRashi.psychologicalDomain.toLowerCase()}—inviting you to stop surviving from your ancient roots and begin creating from your sovereign future.`;

  // SECTION 2: THE INNER ARCHETYPES: Your Subconscious Cast of Characters
  const section2StructuralKnots = `## 2. THE INNER ARCHETYPES: Your Subconscious Cast of Characters

To survive the pressures of human living while safeguarding your ancient, tender core, your subconscious psyche has populated itself with an exquisitely organized cast of internal characters. These are not clinical pathologies or mental flaws; they are devoted inner sub-personalities born from your soul's historical conditioning. Each part carries a distinct job description, an unspoken belief system, and a visceral home in your physical body. When life proceeds smoothly, you barely notice their choreography; but the moment emotional stakes rise, this cast takes the stage to protect you from reliving primordial wounds.

### Your Deeply Hidden Vulnerable Core
At the quiet center of your internal world lives your most delicate, sequestered inner part—a tender child of consciousness that carries the accumulated weight of your unlearned past. This vulnerable core holds a visceral, pre-verbal conviction: *"${ifs.exile.coreBelief.replace(/"/g, '')}"*

Centering its physical resonance in your ${ifs.exile.somaticLocation}, this tender space remembers the ancient cost of unconditional trust: the bitter taste of betrayal when your boundaries dropped, the icy silence when your vulnerability was met with neglect, or the sudden loss of autonomy when you leaned too heavily upon others. Because this part still experiences emotional exposure as life-threatening, it has spent your entire life in protective sequestration, guarded day and night by devoted inner protectors who vowed that you would never again be cast into the wilderness.

### Your Proactive Day-to-Day Protector Parts
To ensure that your vulnerable core is never exposed to modern hazards, your psyche appointed a formidable, hyper-vigilant inner guardian to manage your daily existence. This is the strategist, the tireless architect of order who directs your waking personality. Its core operating rule is simple yet relentless: *"${saturnData.coreVigilanceRule}"*

This proactive protector firmly believes that emotional safety can be achieved through impeccable competence, emotional self-containment, relentless preparation, and total operational autonomy in ${saturnHouse.arena}:
- **In Professional Execution:** It convinces you that you must carry 100% of the burden, mistrusting collaborative delegation and agonizing over minute imperfections before any deliverable leaves your desk.
- **With Money & Capital:** It enforces strict liquidity moats and private financial reserves, viewing capital as the ultimate defensive wall against dependency.
- **In the Physical Body:** It stores its vigilance as chronic muscular bracing across your ${saturnData.somaticLocation}, keeping your system in a state of quiet, high-functioning tension.

### Your Reactive Emergency Coping Mechanisms
Even the most meticulous proactive protector cannot foresee every contingency. When life catches you off-guard—a sudden personal betrayal, harsh public scrutiny, or an emotional intimacy so intense that your defensive perimeter threatens to collapse—your psyche unleashes its reactive emergency coping mechanisms.

This is the emergency override switch of your nervous system. Unlike your patient, orderly day-to-day protector, this part has no interest in long-term diplomacy or polite reputation. Its singular mandate is to break the immediate emotional circuit, shock the field into containment, and restore absolute psychological sovereignty at any cost:
- **The Emergency Trigger Point:** When cornered by ${marsData.emergencyTrigger.toLowerCase()}, this emergency part intervenes with swift, uncompromising intensity—triggering ${marsData.emergencyAction.toLowerCase()}.
- **The Somatic Surge:** It unleashes a sudden sympathetic jolt: a surge of heat to the head, tightening in the solar plexus, or an abrupt freeze into cold, unyielding silence.
- **The Interpersonal Reset:** In relationships, it prompts you to abruptly cut off communication, pack your bags, or speak an unvarnished, scorching truth that forces others to step back, preserving your autonomy even at the price of burning bridges.

---

### How Ancient Conditioning Triggers This Subconscious Cast in Daily Life
In your lived reality, these internal archetypes form a seamless, automated loop:
1. **The Stirring of the Vulnerable Core:** Uncertainty or relational ambiguity arises in ${ketuHouse.arena}, threatening your vulnerable core with the dread of ${ketuData.exileCoreDread}.
2. **The Proactive Protector's Mobilization:** Your inner strategist steps in to enforce rigorous control—working harder, tightening routines, and retreating into analytical fortress mode in ${saturnHouse.arena}.
3. **The Emergency Reset:** If emotional pressure breaches that fortress, your reactive emergency part fires, abruptly resetting the field.
True emotional freedom begins not by banishing these loyal protectors, but by helping them realize that the ancient crisis has passed—and that your grounded, adult sovereign self is now fully capable of holding your safety.`;

  // SECTION 3: THE SPHERES OF EXISTENCE: Real-World Behavioral Footprints
  const section3EvolutionaryFrontier = `## 3. THE SPHERES OF EXISTENCE: Real-World Behavioral Footprints

Your ancient soul conditioning and your emerging growth frontier do not remain abstract philosophies; they leave unmistakable footprints across the concrete terrain of your modern daily life. Every week, your conditioned past baggage and your future evolutionary stretch play out across three fundamental pillars of living: your intimate relationships, your career and worldly purpose, and your physical vitality.

### Pillar 1: Relationships, Intimacy & Sacred Vulnerability
In your intimate and romantic partnerships, the dance between your ancient defensive armor and your longing for deep connection creates a powerful emotional choreography:
- **Your Conditioned Default:** When romantic intimacy begins to deepen toward genuine, unconditional vulnerability—such as moving in together, sharing emotional dependencies, or making irrevocable commitments—a silent alarm sounds within your system. Your core reflex urges you to preserve autonomy. You may find yourself hyper-attuning to minor partner flaws, retreating behind an impenetrable wall of polite busyness, or provoking subtle arguments to create physical and emotional breathing room. You unconsciously test whether love will demand the surrender of your freedom.
- **Your Evolutionary Stretch:** Your growth frontier invites you into sacred interdependence. Here, you discover that true strength is not the ability to survive in a solitary fortress, but the courage to lean unguardedly upon another. Instead of withdrawing into silence when tender or overwhelmed, you look your partner in the eyes and voice your raw truth without defense: *"My nervous system is feeling tender and overloaded right now; I don't need you to fix it, I just need you to hold space for me while I reset."* You learn that being truly known does not diminish your sovereignty—it anchors it.

### Pillar 2: Career, Worldly Purpose & Wealth Sovereignty
In your professional execution, executive decision-making, and commercial negotiations, your internal archetypes dictate how you handle power, responsibility, and capital:
- **Your Conditioned Default:** In the modern workplace, your ancient baggage manifests as the lone-wolf operator syndrome. When project deadlines tighten or collaborators struggle, your instinct is not to align or ask for support; you quietly take the entire workload upon your shoulders, executing with meticulous perfectionism late into the night. With finances, you operate under an unshakeable soundtrack of scarcity or radical self-reliance—preferring to carry 100% of the operational risk rather than trust a co-founder or commercial partner.
- **Your Evolutionary Stretch:** Leaning into your growth vector means stepping center-stage into shared visionary leadership. You resist the urge to hide in the solitary technical bunker. You pitch your high-conviction ideas, delegate operational milestones with transparent accountability, and command fair market compensation for your intellectual property without apology. You treat wealth not as a frantic survival moat, but as an energetic current to be circulated, grown, and shared in high-trust alliances that scale far beyond individual effort.

### Pillar 3: Vitality, Somatic Health & Inner Peace
Your physical body is the ultimate barometer of your psychic equilibrium. Stress and emotional avoidance do not evaporate into thin air; they register directly in your fascia, breath, and autonomic nervous system:
- **Your Conditioned Default:** Under sustained pressure, your body defaults to chronic tension in your ${saturnData.somaticLocation}. You tend to live from the neck up, ignoring early physical warning signs—headaches, shallow breathing, digestive clamp, or restless sleep—until your nervous system forces an abrupt crash. When exhausted, you view solitude not as restorative peace, but as an anxious bunker where your mind endlessly simulates worst-case scenarios.
- **Your Evolutionary Stretch:** Stepping into vitality requires you to reclaim your body as an unhurried sanctuary. You deliberately interrupt the habit of physical bracing. You implement firm work curfews, step away from digital screens during meals, and allow your nervous system to drop into deep, parasympathetic restoration. When spending quiet time alone, solitude transforms from an anxious fortress into a sacred wellspring of spiritual trust, where you experience at the cellular level that you are safe, supported, and whole.

---

### Real-World Behavioral Micro-Experiments for Everyday Transformation
To bridge this evolutionary roadmap into your lived reality, practice these five grounded micro-experiments this week:
1. **The 3-Minute Somatic Anchor:** When an urgent wave of anxiety or threat-scanning spikes during a busy workday, pause immediately. Place one hand over your ${saturnData.somaticLocation}, take three slow diaphragmatic breaths, and speak silently: *"This is an ancient protective reflex waking up; in this exact moment, I am safe, capable, and grounded."*
2. **The 70% Visibility Threshold:** When preparing a work proposal, creative project, or strategic memo, share it with your team when you feel 70% satisfied rather than waiting for 100% perfection, allowing collaborative momentum to replace solitary exhaustion.
3. **The Clean Single-Sentence Boundary:** When an unreasonable demand is made on your time or energy, decline with warmth in a single declarative sentence without offering defensive excuses, over-explanations, or guilt.
4. **The Transparent Vulnerability Bid:** In your primary personal relationship, share one tender, unvetted feeling before you have had time to intellectualize or armor it, inviting connection before perfection.
5. **The Sacred Operational Delegation:** Select one recurring task that you stubbornly manage alone and delegate it entirely to a trusted colleague or partner, consciously practicing the art of leaning on the collective without surveillance.`;

  return {
    section1ImplicitCode,
    section2StructuralKnots,
    section3EvolutionaryFrontier,
  };
}

export function synthesizeKarmicReport(input: BirthInput): KarmicSynthesisResult {
  const matrix = calculatePlanetaryMatrix(input);
  const ifs = deriveIFSMapping(matrix.ascendant, matrix.planets);
  const attachment = deriveAttachmentDynamics(matrix.ascendant, matrix.planets, matrix.anomalies);
  const bigFive = deriveBigFiveDimensions(matrix.ascendant, matrix.planets);
  const narrative = generateExhaustiveNarrative(
    input,
    matrix.ascendant,
    matrix.planets,
    matrix.anomalies,
    ifs,
    attachment,
    bigFive
  );

  const fullMarkdown = [
    narrative.section1ImplicitCode,
    narrative.section2StructuralKnots,
    narrative.section3EvolutionaryFrontier,
  ].join('\n\n---\n\n');

  return {
    input,
    rawInputFormatted: formatRawSchemaInput(input),
    coordinates: matrix.coordinates,
    julianDay: matrix.julianDay,
    lahiriAyanamshaDegrees: matrix.lahiriAyanamshaDegrees,
    ascendant: matrix.ascendant,
    planets: matrix.planets,
    anomalies: matrix.anomalies,
    ifs,
    attachment,
    bigFive,
    narrative,
    fullMarkdown,
    generationSource: 'deterministic-jyotish-engine',
  };
}
