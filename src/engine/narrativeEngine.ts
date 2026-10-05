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

  // SECTION 1: THE IMPLICIT CODE + BESPOKE LAYMAN LANGUAGE TRANSLATION (ALL LIFE FACETS)
  const section1ImplicitCode = `## 1. THE IMPLICIT CODE: Subconscious Memory Architecture & Inner Protective Dynamics

You did not arrive in this life as an unwritten slate. Beneath your conscious professional ambitions and the composed, capable presence you project to the world, your psyche operates from a deeply grooved set of unlearned instincts—an implicit memory architecture forged long before you ever spoke your first word in ${input.placeOfBirth.split(',')[0]}. When nobody is watching, when fatigue strips away your social conditioning, or when unexpected pressure rattles your day, your nervous system automatically slides back into an ancient gravitational well of instinctual self-reliance and protective containment.

In the deeper architecture of your inner world, this current represents a domain you have already over-mastered to the point of exhaustion. You carry an ingrained muscle memory of ${ketu.shastiamsha.subconsciousImprint}. Because your internal system has deeply rehearsed the high-stakes navigation of ${ketuHouse.arena}, you instinctively know how to read the unspoken physics of a room before anyone else realizes a shift has occurred. Yet what once served as your supreme survival genius has now calcified into an invisible pattern of over-reliance. You treat self-containment in your work, money, family, and relationships not as a choice, but as an existential mandate.

### The Hidden Vulnerability: ${ifs.exile.archetypeTitle}
Deep beneath your adult competence lives a tender, sequestered space within your psyche. This vulnerable core carries a visceral, pre-verbal conviction: *${ifs.exile.coreBelief.replace(/"/g, '')}*

Whenever life invites you to lean unguardedly on colleagues, to delegate high-stakes decisions, to voice an unpolished truth, or to leave your heart unprotected, this vulnerable space stirs in the subterranean tissues of your ${ifs.exile.somaticLocation}. It remembers the ancient cost of exposure: what happened when trust was extended without a backup plan, or when your natural sensitivity was met with volatility or displacement. To prevent you from ever re-experiencing that primordial hollowness, your internal system organized a sophisticated, two-tiered protective garrison around this tender core.

### Your Primary Protective Strategist: ${ifs.manager.archetypeTitle}
To ensure that your vulnerable core is never exposed in daily life, your psyche operates a tireless, hyper-vigilant inner guardian. This protective strategist functions as the chief operating officer of your waking personality. It believes that emotional safety is an operational problem that can be solved through relentless discipline, hyper-preparedness, emotional composure, and total self-reliance in ${saturnHouse.arena}.

- **The Behavioral Footprint of Your Primary Strategist Across Life Spheres:**
  - **Vocation & Wealth:** ${saturnData.facets.vocationAndMoney}
  - **Creative Voice & Visibility:** ${saturnData.facets.creativeVoiceAndVisibility}
  - **Somatic Health & Nervous System:** ${saturnData.facets.somaticHealthAndNervousSystem}
  - **Family Lineage & Expectations:** ${saturnData.facets.familyLineageAndAncestralRoles}
  - **Solitude & Meaning:** ${saturnData.facets.existentialTrustAndSolitude}
  - **Intimate Partnerships:** ${saturnData.facets.interpersonalAndRomanticBonds}

### Your Emergency Override Reflex: ${ifs.firefighter.archetypeTitle}
Even the most disciplined protective strategist cannot control every variable of life. When an unexpected betrayal, a sharp public critique, institutional bad faith, or prolonged emotional chaos breaches your perimeter and threatens to flood your nervous system with raw dread, your psyche deploys an emergency override reflex. This part does not negotiate; its sole objective is to sever the escalating pressure, shock the system into containment, and restore immediate psychological sovereignty.

- **The Behavioral Footprint of Your Emergency Reflex Across Life Spheres:**
  - **Vocation & Wealth:** ${marsData.facets.vocationAndMoney}
  - **Creative Voice & Visibility:** ${marsData.facets.creativeVoiceAndVisibility}
  - **Somatic Health & Nervous System:** ${marsData.facets.somaticHealthAndNervousSystem}
  - **Family Lineage & Expectations:** ${marsData.facets.familyLineageAndAncestralRoles}
  - **Solitude & Meaning:** ${marsData.facets.existentialTrustAndSolitude}
  - **Intimate Partnerships:** ${marsData.facets.interpersonalAndRomanticBonds}

---

### Translating Your Implicit Code into Daily Reality
Let us translate this psychological blueprint into your visceral, weekly human experience across every arena of living:

1. **The Real-World Anatomy of Your Vulnerable Core:**
   - **The Core Visceral Feeling:** Deep inside, specifically centered in your ${ifs.exile.somaticLocation}, lives an unspoken assumption: *${ifs.exile.coreBelief.replace(/"/g, '')}* This isn't theoretical philosophy; it is a physical bracing that enters your body the moment life asks you to relax your guard in ${ketuHouse.arena}.
   - **In Career & Workplace Authority:** ${ketuData.facets.vocationAndMoney}
     *Concrete Workday Scenario:* ${ketuData.realWorldTuesdayScenario.workplace}
   - **With Money & Material Security:** ${ketuData.realWorldTuesdayScenario.money}
   - **In Creative Voice & Public Visibility:** ${ketuData.facets.creativeVoiceAndVisibility}
     *What happens when sharing your work:* ${ketuData.realWorldTuesdayScenario.creative}
   - **In Your Body & Nervous System:** ${ketuData.facets.somaticHealthAndNervousSystem} Stored primarily in your ${ketuData.exileSomaticFascia}.
   - **In Family Lineage & Ancestral Dynamics:** ${ketuData.facets.familyLineageAndAncestralRoles}
     *Your lineage default:* ${ketuData.realWorldTuesdayScenario.family}
   - **In Solitude & Existential Meaning:** ${ketuData.facets.existentialTrustAndSolitude}
     *When completely alone:* ${ketuData.realWorldTuesdayScenario.solitude}
   - **In Romantic & Intimate Bonds:** ${ketuData.facets.interpersonalAndRomanticBonds}
     *The intimate reflex:* ${ketuData.realWorldTuesdayScenario.romance}

2. **How Your Primary Protective Strategist Dictates Your Waking Life:**
   - **Its Operating Logic:** This guardian operates on the core rule: *"${saturnData.coreVigilanceRule}"*
   - **At Work & In Projects:** ${saturnData.facets.vocationAndMoney}
     *A typical high-stakes scenario:* ${saturnData.weeklyWorkdayScenario}
   - **In Public Persona & Creative Presentation:** ${saturnData.facets.creativeVoiceAndVisibility}
   - **In Daily Somatic Rhythm:** ${saturnData.facets.somaticHealthAndNervousSystem} Physically held in your ${saturnData.somaticLocation}.
   - **In Family & Ancestral Responsibilities:** ${saturnData.facets.familyLineageAndAncestralRoles}
   - **In Friendships & Partnerships:** ${saturnData.facets.interpersonalAndRomanticBonds}

3. **How Your Emergency Reflex Takes Over When the Perimeter Fails:**
   - **The Emergency Threshold:** When the workload or boundary pressure breaches the perimeter:
     *Trigger point:* ${marsData.emergencyTrigger}
     *Emergency override action:* ${marsData.emergencyAction}
   - **In Career & Finance:** ${marsData.facets.vocationAndMoney}
   - **In Creative & Public Life:** ${marsData.facets.creativeVoiceAndVisibility}
   - **In Physical Health & Sleep:** ${marsData.facets.somaticHealthAndNervousSystem}
   - **In Family Lineage & Solitude:** ${marsData.facets.familyLineageAndAncestralRoles} and ${marsData.facets.existentialTrustAndSolitude}
   - **In Personal Relationships:** ${marsData.facets.interpersonalAndRomanticBonds}

4. **The Synthesized Weekly Feedback Loop:**
   In plain English, your life repeatedly oscillates through this three-stage cycle:
   1. **The Subtle Dread of Exposure:** Uncertainty touches your life in ${ketuHouse.arena}, triggering fear of ${ketuData.exileCoreDread}.
   2. **The Guardian's Hyper-Vigilance:** You respond through disciplined self-reliance—applying ${saturnData.coreVigilanceRule} in ${saturnHouse.arena}.
   3. **The Emergency Reset:** When pressure overloads your capacity, your emergency reflex intervenes via ${marsData.emergencyAction.toLowerCase()}.
   True liberation begins not by fighting these parts, but by anchoring in your unburdened sovereign center—letting your inner strategist take real rest and reassuring your vulnerable core that its safety is now protected by a capable, grounded adult.`;

  // SECTION 2: THE STRUCTURAL KNOTS + BESPOKE LAYMAN LANGUAGE TRANSLATION (ALL LIFE FACETS)
  const activeRetrogrades = planets.filter(
    (p) => p.isRetrograde && p.id !== 'Rahu' && p.id !== 'Ketu'
  );
  const gandantaList = planets.filter((p) => p.isGandanta);
  const sandhiList = planets.filter((p) => p.isSandhi && !p.isGandanta);

  let anomalyWorkplaceDetail = '';
  if (activeRetrogrades.some((p) => p.id === 'Mercury')) {
    anomalyWorkplaceDetail = ` You compulsively proofread contracts, proposals, and communications multiple times, agonizing over subtle phrasing and dreading that a verbal oversight will be used against you in deal negotiations.`;
  } else if (activeRetrogrades.some((p) => p.id === 'Mars')) {
    anomalyWorkplaceDetail = ` You tend to internalize professional irritation until your threshold is breached, leading to sudden, uncompromising boundary resets or abrupt resignations rather than quiet, incremental compromise.`;
  } else if (activeRetrogrades.some((p) => p.id === 'Saturn')) {
    anomalyWorkplaceDetail = ` You carry an unshakeable conviction that nobody else possesses the operational stamina to execute properly in ${saturnHouse.arena}, leading to severe chronic overwork and an inability to delegate.`;
  } else if (activeRetrogrades.some((p) => p.id === 'Jupiter')) {
    anomalyWorkplaceDetail = ` You possess an inherent skepticism of conventional corporate platitudes and hollow hierarchies, insisting that commercial ventures adhere to your uncompromising ethical standard.`;
  } else if (gandantaList.length > 0 || sandhiList.length > 0) {
    anomalyWorkplaceDetail = ` Major career transitions provoke acute existential tension, tempting you to abruptly terminate contracts when projects reach an institutional plateau.`;
  } else {
    anomalyWorkplaceDetail = ` You maintain an unreadable, composed poker face in executive meetings, projecting an aura of quiet authority even when navigating high-stakes operational friction.`;
  }

  let laymanWorkplace = '';
  if (attachment.primaryStyle === 'Dismissive-Avoidant') {
    laymanWorkplace = `In professional execution within ${saturnHouse.arena}, your natural presence establishes you as an autonomous island of competence. When project deadlines slip or collaborators falter, your instinct is not to convene meetings; you quietly absorb the deliverable, execute it in solitary concentration with meticulous rigor, and present it as an accomplished fact.${anomalyWorkplaceDetail} You treat reliance on others as a structural risk, preferring the exhaustion of carrying 100% of the burden to the vulnerability of being let down by an under-performing partner.`;
  } else if (attachment.primaryStyle === 'Anxious-Preoccupied') {
    laymanWorkplace = `In your vocational arena within ${saturnHouse.arena}, you tend to act as the empathic shock-absorber and caretaker for team dynamics. You arrive early, stay late to polish flawed deliverables submitted by peers, and hyper-attune to the micro-expressions of managers and clients.${anomalyWorkplaceDetail} If an executive sends a terse, formal communication without warm pleasantries, your system experiences an adrenaline drop: *"Did I drop the ball? Am I about to be marginalized?"* You immediately spend twenty minutes crafting an overly accommodating reply to re-establish safety and belonging.`;
  } else if (attachment.primaryStyle === 'Fearful-Avoidant (Disorganized)') {
    laymanWorkplace = `In leadership and deal negotiations around ${saturnHouse.arena}, you experience a high-voltage push-pull cycle. You enter commercial alliances with charismatic brilliance and all-in dedication, solving impossible bottlenecks. But as expectations harden and colleagues begin relying heavily upon your presence, an acute claustrophobic panic sets in.${anomalyWorkplaceDetail} You begin perceiving subtle exploitation or institutional bad faith, triggering an impulse to burn bridges and exit cleanly, only to grieve the lost momentum weeks later in solitary reflection.`;
  } else {
    laymanWorkplace = `In executive leadership and commercial negotiations around ${saturnHouse.arena}, you balance structural boundaries with empathetic listening. You set firm contractual milestones and hold team members accountable without emotional reactivity.${anomalyWorkplaceDetail} When high-stakes emergencies arise, you notice old urges to step in and micromanage, but consciously choose to empower your team through direct, transparent alignment.`;
  }

  let anomalyMoneyDetail = '';
  if (saturn.isRetrograde) {
    anomalyMoneyDetail = ` You experience a persistent scarcity soundtrack—an unshakeable worry that no matter how substantial your net worth grows, a single structural catastrophe could wipe out your reserves, driving you to maintain ironclad liquidity buffers.`;
  } else if (venus.isRetrograde) {
    anomalyMoneyDetail = ` You experience an unconventional relationship with valuation; you frequently wrestle with pricing your intellectual property at true market value, fearing that charging high rates will commodify your sacred craftsmanship.`;
  } else {
    anomalyMoneyDetail = ` Financial ambiguity is intensely distressing to your nervous system; you require transparent ledgers, unambiguous equity terms, and clearly defined exit clauses before committing resources.`;
  }

  let laymanMoney = '';
  if (attachment.primaryStyle === 'Dismissive-Avoidant') {
    laymanMoney = `With capital allocation, wealth generation, and commercial contracts, your core imperative is absolute sovereignty. The prospect of co-mingling funds, taking on venture debt with restrictive covenants, or depending on a business partner's financial discipline triggers immediate resistance.${anomalyMoneyDetail} You keep private savings reserves and distinct revenue streams that nobody else can access or monitor, viewing personal liquidity as the ultimate fortress ensuring nobody can ever force your hand.`;
  } else if (attachment.primaryStyle === 'Anxious-Preoccupied') {
    laymanMoney = `In commercial transactions and personal finances, you frequently blur boundaries between financial health and emotional connection. You struggle to negotiate top-tier compensation for your labor in ${saturnHouse.arena}, often accepting lower rates out of fear that standing firm will offend clients or employers.${anomalyMoneyDetail} You may lend money to relatives or bail out friends who fail to repay you, finding it agonizingly difficult to demand repayment because asserting financial boundaries feels like an emotional severance.`;
  } else if (attachment.primaryStyle === 'Fearful-Avoidant (Disorganized)') {
    laymanMoney = `Your relationship with money swings between periods of rigorous, self-denying austerity in ${saturnHouse.arena} and sudden, compensatory spending sprees when emotional pressure reaches a breaking point.${anomalyMoneyDetail} You approach commercial agreements and equity partnerships with intense scrutiny, often sensing hidden traps in the fine print and vacillating between wanting total financial independence and craving a wealthy benefactor who will shoulder the burden.`;
  } else {
    laymanMoney = `You manage wealth and commercial risk with clarity, pragmatism, and generosity. You establish clear financial divisions in joint ventures and negotiate compensation that accurately honors your experience.${anomalyMoneyDetail} You treat money not as an emotional substitute, but as an energetic resource to be cultivated, protected, and circulated with intentionality.`;
  }

  let laymanSomatic = `Your physical body and autonomic nervous system serve as the true barometer for your internal tension. Stress does not evaporate through intellectual analysis—it lodges directly in your ${saturnData.somaticLocation}. When deadlines intensify or relational ambiguity lingers in ${venusHouse.arena}, your nervous system engages ${
    attachment.primaryStyle === 'Anxious-Preoccupied'
      ? 'a sympathetic fight-or-flight hyper-arousal: your heart rate accelerates, breathing becomes shallow in the upper chest, stomach acid surges, and your mind races through scenarios late into the night, preventing deep restorative REM sleep.'
      : attachment.primaryStyle === 'Dismissive-Avoidant'
        ? 'a parasympathetic dorsal-vagal freeze: your facial micro-expressions become rigid, cervical fascia and jaw tighten, and your consciousness detaches from somatic signals—allowing you to work through physical exhaustion and chronic pain until your body forces a total shutdown.'
        : 'an autonomic whiplash: rapid oscillations between sympathetic panic (racing pulse, solar plexus clenching, hot restlessness) and sudden dorsal collapse (brain fog, heavy limbs, and a sudden urge to sleep for fourteen hours in a darkened room).'
  } When depleted, your only reliable cure is solitary sensory deprivation in your private sanctuary, letting your nervous system slowly reset away from human demands.`;

  let laymanFamily = `Within your family lineage and ancestral expectations, your early conditioning defined the specific historical role you were assigned. ${
    attachment.primaryStyle === 'Dismissive-Avoidant'
      ? `You inhabit the role of the polite, accomplished family anchor who arrives with logistical solutions, legal advice, or financial support, but maintains an impenetrable barrier around your private emotional world. If parents or relatives pry into your vulnerabilities, disappointments, or heartaches, you skillfully deflect the inquiry toward current events, career updates, or real estate.`
      : attachment.primaryStyle === 'Anxious-Preoccupied'
        ? `You have functioned as the generational emotional sponge—attuning to parental anxieties, acting as the peacemaker between feuding relatives, and carrying an unconscious burden of guilt whenever anyone in your lineage suffers, instinctively believing that the happiness of your family system rests squarely on your shoulders.`
        : `Your family dynamic is defined by an intense approach-avoidance rhythm: fierce protective devotion and pride for your roots, contrasted with sharp, painful boundary ruptures or extended periods of silence when ancestral hypocrisies, emotional double-binds, or childhood wounds are re-opened during holiday gatherings.`
  }`;

  let laymanRomance = `In romantic intimacy, the dialogue between your deep instinctual emotional needs, your capacity for shared vulnerability, and your highest relational potential creates an exquisitely specific emotional choreography. You offer partners grounded loyalty, aesthetic depth, and protective stability. However, as the relationship deepens toward true, unvetted vulnerability—discussing permanent cohabitation, emotional reliance, or mutual surrender—your core knot triggers: *${attachment.coreIntimacyFear.replace(/\bin [^,.]+/g, '')}* ${
    attachment.primaryStyle === 'Dismissive-Avoidant'
      ? `A silent alarm sounds in your chest. You suddenly find yourself hyper-focusing on microscopic flaws in your partner, craving days of unbroken solitude, and pouring your focus into work. When your partner expresses hurt or asks for emotional presence, you retreat behind a wall of polite reason: *"I'm fine, just stressed with work"*, unconsciously daring them to see through your defense, yet pushing them away if they step closer.`
      : attachment.primaryStyle === 'Anxious-Preoccupied'
        ? `Any brief emotional coolness, delayed text reply, or need for partner solitude triggers an intense dread of abandonment. You enter hyper-vigilant "temperature checking"—asking *"Are we okay?"* or offering unneeded favors to earn reassurance. When your partner feels smothered and pulls back to breathe, their withdrawal confirms your worst fear, accelerating the panic cycle.`
        : `You experience the classic intimacy storm: you meet someone and experience an electric, magnetic soul connection, opening up with breathtaking vulnerability. But once mutual commitment solidifies, your system interprets love as an inescapable cage. You pick sudden arguments, pull away coldly, or threaten to end the connection. Yet the moment your partner actually packs their bags or emotionally detaches, a terrifying surge of loss hits you, and you scramble frantically to pull them back into the fold.`
  }`;

  let laymanEarnedSecurity = `The embodied pathway to earned relational security and inner equilibrium is illuminated by your highest evolutionary trajectory:
- **In High-Stakes Workplace Negotiations:** When operational friction or ambiguous directives arise in ${saturnHouse.arena}, resist your default impulse to ${attachment.primaryStyle === 'Dismissive-Avoidant' ? 'silently take over the entire workload in isolation' : attachment.primaryStyle === 'Anxious-Preoccupied' ? 'over-apologize and assume personal fault' : 'abruptly terminate the project'}. Instead, schedule a 15-minute alignment checkpoint to calmly articulate expectations and deliverables in writing.
- **With Capital Partnerships & Contracts:** Ensure all equity distributions, risk allocations, and milestone criteria are drafted with explicit, transparent terms before committing capital, protecting your psychological safety through clear agreements rather than defensive suspicion.
- **In Intimate Partnership Moments:** When emotional claustrophobia or fear of engulfment flares in ${venusHouse.arena}, replace protective withdrawal or reactive protest with a grounded verbal script: *"I love and value our connection, and right now my nervous system is in sensory overload. Give me twenty minutes of quiet downtime to reset, and I will come back ready to listen and connect with you fully."*`;

  const section2StructuralKnots = `## 2. THE STRUCTURAL KNOTS: Core Friction Fault Lines & Relational Blueprints

Where your implicit code reveals your default defensive posture, your deeper structural friction points reveal the exact fault lines where your emotional energy folds back upon itself. These friction points do not simply affect your romantic connections; they dictate how you relate to money, vocational authority, creative risk, family lineage, and bodily health.

### The Architecture of Your Relational Blueprint
In interpersonal dynamics, your instinctual pattern crystallizes around an underlying reflex toward **${
    attachment.primaryStyle === 'Dismissive-Avoidant'
      ? 'protective self-containment and vigilant autonomy'
      : attachment.primaryStyle === 'Anxious-Preoccupied'
        ? 'attuned vigilance and an urgent need for reassurance'
        : 'an intense approach-avoidance rhythm between deep craving for connection and acute fear of engulfment'
  }**, accompanied by an undercurrent of **${attachment.secondaryPull.replace(/\bin [^,.]+/g, '')}**.

In the psychological choreography of your emotional world, the tension between your deep instinctual emotional needs, your capacity for shared vulnerability, and your internal demands for structural containment produces an exquisite dynamic: *${attachment.coreIntimacyFear.replace(/\bin [^,.]+/g, '')}* When intimacy, partnership, or deep commercial collaboration deepens in ${venusHouse.arena}, your nervous system responds not with open surrender, but with an automatic protective reflex: *${attachment.protestOrWithdrawalBehavior.replace(/\bin [^,.]+/g, '')}*

During moments of friction—whether with a client, co-founder, parent, or partner—this dynamic unfolds into an unconscious loop: *${attachment.conflictTriggerLoop.replace(/\bin [^,.]+/g, '')}*

### The Interconnected Circuit of Internal Friction Fault Lines
Rather than isolated quirks, the internal friction points in your psyche operate as a continuous, unified circuit, each tension point reinforcing the next:

#### Primary Friction Fault Line: The Inward Psychological Crucible
In your internal architecture, an intense, inward-turning current creates a continuous psychological undertow: an instinct to intensely scrutinize your thoughts and feelings before allowing them into the outside world. When stress rises, you experience a sharp contrast between your composed external demeanor and an internal whirlwind of mental auditing.

At the somatic level, your nervous system registers this tension through muscular tightness across your ${saturnData.somaticLocation}, shallow breath holding during complex problem-solving, and a reluctance to speak until every word has been vetted for complete precision.

In your daily life, this inner friction echoes directly across your pursuits: in executive decisions, you compulsively double-check proposals and strategic directives, fearing that a subtle oversight will be used against you. In creative expressions, you endlessly refine drafts in private, agonizing over whether your work is ready for public scrutiny. In relationships, you hold back your spontaneous reactions, needing time alone to sort through what you really feel before articulating it.

### How These Friction Fault Lines Form a Closed Loop
These tension points do not fire in isolation. In your lived experience, they operate as a closed-loop system: when professional or deadline pressure mounts in ${saturnHouse.arena}, your inner guardian immediately tightens its perimeter. If unexpected emotional vulnerability, ambiguous communication, or interpersonal tension surfaces around ${venusHouse.arena}, your system forces an immediate reflexive retreat inward, converting raw feelings into analytical vigilance, physical containment, and self-reliant shielding.

---

### Translating Your Structural Knots into Everyday Experience
Let us translate this exact psychological matrix into an experiential, everyday narrative of what you actually think, feel, and do across every sphere of life:

1. **In Workplace Authority, Deal Negotiations & Leadership:**
   ${laymanWorkplace}

2. **With Money, Capital Allocation & Commercial Risk:**
   ${laymanMoney}

3. **In Your Body, Nervous System & Somatic Holding:**
   ${laymanSomatic}

4. **In Family Lineage & Ancestral Dynamics:**
   ${laymanFamily}

5. **In Romantic Intimacy, Vulnerability & Deep Bonds:**
   ${laymanRomance}

6. **The Pathway to Earned Relational Ease in Plain English:**
   ${laymanEarnedSecurity}`;

  // SECTION 3: THE EVOLUTIONARY FRONTIER + BESPOKE LAYMAN LANGUAGE TRANSLATION (ALL LIFE FACETS)
  let navAscDescription = '';
  if (navAscRashi.element === 'Fire') {
    navAscDescription = `Emerging from conditioned hesitation or protective armor, your mature presence radiates decisive, sovereign courage. In high-stakes leadership moments and organizational crossroads within ${rahuHouse.arena}, you stop asking for unanimous consensus or doubting your authority; you step forward as an unhesitating visionary.`;
  } else if (navAscRashi.element === 'Earth') {
    navAscDescription = `Grounding volatile anxieties or fluctuating instincts, your mature presence embodies patient architectural mastery. You replace hyper-vigilant hustle with sustainable operational rhythms, building enduring systems and ventures in ${rahuHouse.arena} that compound long-term value without demanding physical exhaustion.`;
  } else if (navAscRashi.element === 'Air') {
    navAscDescription = `Transcending the territorial fortress of early defenses, your mature presence acts as an objective strategic synthesizer, diplomat, and innovator. You articulate complex visions with effortless clarity, convening key stakeholders and negotiating high-value alliances in ${rahuHouse.arena} with unshakeable perspective.`;
  } else {
    navAscDescription = `Softening rigid emotional containment, your mature presence commands through magnetic empathic depth and intuitive timing. You read the unspoken psychological currents of rooms and partnerships, guiding people through profound transformations without absorbing their distress into your own system.`;
  }

  let navMoonDescription = `In your early conditioning, you digested emotional stress through ${
    moon.rashiElement === 'Water'
      ? 'turbulent emotional absorption, intense sensitivity, and protective isolation'
      : moon.rashiElement === 'Earth'
        ? 'somatic muscular bracing, stoic self-containment, and treating vulnerability as an operational risk'
        : moon.rashiElement === 'Air'
          ? 'compulsive mental looping, over-analyzing relational subtexts, and restless nervous energy'
          : 'adrenal urgency, reactive frustration, and an impulse to force immediate outcomes'
  }. In your mature psychological center, you develop an unshakeable interior sanctuary. When external friction arises in ${saturnHouse.arena} or ${venusHouse.arena}, your nervous system no longer spirals; you anchor into self-compassionate discernment, holding space for complex feelings without losing your center.`;

  let navVenusDescription = `In earlier chapters, you approached love, creativity, and financial pricing with protective armor—either under-valuing your gifts or keeping intimate partners at a safe distance. In your mature relational center, your relational capacity transforms into sacred reciprocity. You command premium compensation for your intellectual property without guilt, establish immovable contractual boundaries, and welcome deep, unarmored intimacy where mutual vulnerability is celebrated as true power.`;

  const bigFiveNarrativeBlocks = bigFive
    .map((dim, idx) => {
      return `#### Trait 0${idx + 1}: ${dim.trait}
- **Calibration Shift:** Baseline ${dim.baselineScore}% (*${dim.karmicDefaultLabel}*) ➔ Target ${dim.reconditionedTarget}% (*${dim.evolutionaryTargetLabel}*)
- **The Unconscious Default:** ${dim.shadowExpression}
- **The Mature Evolution:** ${dim.selfLedExpression}
- **The Daily Behavioral Stretch:** ${dim.stretchMechanism}
- **Impact Across Living Spheres:** ${dim.lifeArenaImpact}`;
    })
    .join('\n\n');

  const section3EvolutionaryFrontier = `## 3. THE EVOLUTIONARY FRONTIER: Your Highest Behavioral Realignment & Growth Trajectory

If your subconscious memory blueprint describes the ancient fortress you built to survive the past, your growth frontier describes the exact evolutionary medicine required to make you whole in this lifetime across your career, finances, creative voice, health, family, and relationships.

Your soul did not arrive in ${input.placeOfBirth.split(',')[0]} to endlessly repeat the familiar, exhausted survival loops of your past conditioning in ${ketuHouse.arena}. It deliberately chose the electric, unvetted, and generative stretch zone of **${rahuHouse.arena}**, demanding that you embody the courage of **${rahuRashi.psychologicalDomain}**. To your inner protective parts, this growth frontier initially feels hazardous and destabilizing. Where your ancient reflex demands guaranteed safety and pre-calculated outcomes before taking a single step, your growth frontier demands that you step into the arena *before* you feel fully ready—to risk **${rahuHouse.evolutionaryTask}**.

### The Core Evolutionary Polarity: ${sanitizedAxisName}
- **The Exhausted Comfort Zone You Are Leaving Behind:** ${polarity.karmicCeiling} In your lived experience, this manifests as an over-developed reflex to retreat into solitary containment in ${ketuHouse.arena} whenever modern adult demands feel chaotic.
- **The Growth Frontier Calling You Forward:** ${polarity.rahuEvolutionaryCall} Stepping across this threshold requires you to embody grounded boldness within ${rahuHouse.arena}, allowing yourself to be seen, compensated, and trusted without demanding a guaranteed emergency parachute.

### Your Mature Horizon: Who You Become When the Armor Drops
As the defensive armor is unburdened, the ripened fruit of your consciousness emerges into full view:

- **In Executive Authority & Career Direction:** ${navAscDescription}
- **In Creative Voice & Public Radiance:** ${navVenusDescription}
- **In Somatic Health & Nervous System Regulation:** ${navMoonDescription}
- **In Family Lineage & Generational Healing:** Operating from your centered, mature consciousness, you release the historical role of the family fixer or emotional sponge. You relate to relatives with genuine warmth and practical kindness while upholding sovereign, calm boundaries that protect your private peace.
- **In Intimate Vulnerability & Sacred Partnership:** The guarded reflex softens into real-time transparency. You risk asking for what you need, welcoming true interdependence and mutual devotion without the underlying terror of entrapment or sudden loss.

### The Realignment of Your Everyday Presence & Behavioral Footprint
As you systematically unburden your vulnerable core and invite your primary protective parts to step down from 24/7 hyper-vigilance, your daily behavioral footprint undergoes a measurable, structural realignment:

${bigFiveNarrativeBlocks}

---

### Translating Your Growth Frontier into Daily Life
Let us translate this grand evolutionary roadmap into an experiential, real-world narrative of how you actually think, feel, decide, and live when operating from your unburdened, mature presence across every arena of life:

1. **The Visceral Leap Across Living Spheres:**
   - **In Career, Workplace Authority & Deal-Making:** On a typical high-stakes workday, leaning into your growth frontier means resisting your default impulse to retreat into the comfortable, solitary technical bunker of ${ketuHouse.arena}. Instead of quietly doing the work yourself and hoping leadership notices, you step directly into ${rahuHouse.arena}—pitching your high-conviction ideas, facilitating key decision-making meetings, and accepting the scaled responsibility that matches your true intellect.
   - **With Money, Capital Allocation & Wealth Sovereignty:** In financial management and commercial negotiations, stepping into your growth frontier means dismantling the old scarcity reflex or compulsive financial isolation. You stop discounting your rates or avoiding equity partnerships out of fear of conflict. You price your services at fair market value, establish transparent joint-venture contracts, and view capital not as a frantic survival moat, but as an energetic resource for collective impact.
   - **In Creative Voice, Originality & Public Stature:** You stop treating your creative projects as private secrets to be hidden until they are flawless. You publish your writings, launch your products, or voice your boldest perspectives in ${rahuHouse.arena} while they are raw and vital, trusting that your authentic frequency will magnetically attract aligned peers and collaborators.
   - **In the Physical Body, Nervous System & Somatic Restoration:** Your body physically registers this evolutionary leap as a profound, cellular sigh of relief. You deliberately interrupt the chronic habit of holding tension in your ${saturnData.somaticLocation}. You institute non-negotiable sleep rhythms, step away from digital screens during meals, and allow your body to experience deep, unhurried parasympathetic restoration.
   - **In Family Lineage & Ancestral Dynamics:** In real-world family interactions, you stop participating in inherited generational guilt triangles. When relatives attempt to draw you into old conflicts or demand that you play the compliant caretaker, you smile with genuine warmth and say: *"I love you dearly, and I know you have the strength to resolve this yourself."* You break centuries of lineage codependency by remaining lovingly sovereign.
   - **In Solitude, Spiritual Peace & Existential Surrender:** When spending time alone in your personal sanctuary, solitude ceases to be an anxious bunker where your mind simulates worst-case disasters. It becomes a sacred, nourishing temple of renewal where you commune with the deeper intelligence of existence, knowing at the cellular level that you are guided and protected.
   - **In Romantic Intimacy & Sacred Interdependence:** In the living room with your intimate partner, stepping into your frontier means replacing your conditioned withdrawal or anxious protest with courageous vulnerability. When feeling tender or overwhelmed, you don't shut down behind work or pick a petty fight; you look your partner in the eyes, take a breath, and say: *"I am feeling a little tender right now, and I just need you to hold me for five minutes."* You discover that being fully known does not destroy your freedom—it deepens it.

2. **Operating From Your Mature Sovereign Consciousness in Plain English:**
   - **Your Executive Presence in Action:** In executive meetings, client presentations, or unexpected crises, you no longer react from conditioned defensiveness. You carry yourself with grounded posture, breathe into your abdomen, and communicate with natural authority, poise, and clarity.
   - **Your Emotional Poise in Action:** When unexpected emotional friction, client criticism, or partner distance occurs, your inner emotional center acts as a steady gyroscope. You don't flood into panic or numbness; you validate your own feelings, self-soothe with compassion, and respond with thoughtful discernment.
   - **Your Relational Maturity in Action:** In commercial contract negotiations, creative collaborations, and romantic relationships, you operate from an innate certainty of your worth. You attract collaborators and lovers who meet you with equal respect, mutual transparency, and sacred reciprocity.

3. **Five Concrete Real-World Behavioral Micro-Experiments:**
   - **Micro-Experiment 01 (For Emotional Sensitivity ➔ Grounded Equanimity):** When a sudden wave of threat-scanning or catastrophic worry spikes around your career or personal life, practice the **3-Minute Somatic Anchor**. Place one hand firmly on your ${saturnData.somaticLocation}, take 3 slow diaphragmatic breaths, and speak out loud: *"My system is recalling an ancient protective defense; in this exact moment, I am safe and fully capable of handling reality."*
   - **Micro-Experiment 02 (For Receptivity ➔ Creative Fluidity):** Practice the **70% Threshold Rule**. When developing a new proposal, artistic creation, or business initiative, release it to collaborators or your audience when you are 70% satisfied rather than waiting for 100% conceptual certainty, allowing real-world engagement to polish the final outcome.
   - **Micro-Experiment 03 (For Craftsmanship ➔ Devotional Rhythm):** Institute the **Sacred Work Curfew**. Once this week, close your laptop at a predetermined evening hour regardless of unfinished tasks. Choose one operational responsibility in ${saturnHouse.arena} to delegate entirely without surveillance, trusting your team and honoring your body's right to rest.
   - **Micro-Experiment 04 (For Relational Generosity ➔ Sovereign Boundaries):** Practice the **Clean Single-Sentence Boundary**. When a client, colleague, or family member requests labor or compromises that infringe upon your health or fair value, decline with warmth in a single declarative sentence without offering defensive apologies or over-explanations.
   - **Micro-Experiment 05 (For Visibility ➔ Authentic Presence):** Take the **Center-Stage Step**. In your next professional meeting or public forum within ${rahuHouse.arena}, voice your perspective first, share your authentic accomplishments without self-effacing humor, and allow yourself to be acknowledged and compensated at scale.`;

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
