import {
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
} from '../types/jyotish';
import {
  calculatePlanetaryMatrix,
  formatRawSchemaInput,
  HOUSE_PSYCHOLOGY,
  RASHI_LIST,
} from './jyotishEngine';
import {
  KETU_HOUSE_DATA,
  MARS_FIREFIGHTER_HOUSE_DATA,
  POLARITY_DESCRIPTIONS,
  SATURN_MANAGER_HOUSE_DATA,
} from './karmicPolarityData';

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
      vocationAndMoney: `Operating as a solitary contractor in ${saturnHouseInfo.arena}. With Moon in ${moon.rashiName} and Saturn in ${saturn.rashiName}, you deeply distrust commercial co-mingling, preferring to carry 100% of operational responsibility rather than endure the vulnerability of relying on an unreliable partner.`,
      creativeVoiceAndVisibility: `Guarded creative delivery; you present polished, highly intellectualized work while discounting public applause as superficial because praise does not penetrate your protective perimeter.`,
      somaticHealthAndNervousSystem: `Hypo-arousal masking acute stress; you ignore early physical symptoms in ${saturn.rashiName}-governed areas until your body forces a total solitary down-regulation.`,
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

  const exileTitle = `The ${ketu.shastiamsha.name} Witness (${ketuHouseInfo.name} Core)`;
  const managerTitle = `The ${saturn.shastiamsha.name} Architect (${saturn.rashiName} in ${saturnHouseInfo.name})`;
  const firefighterTitle = `The ${mars.shastiamsha.name} Sovereign Breaker (${mars.rashiName} / ${marsHouseInfo.name})`;

  return {
    exile: {
      role: 'Exile (Carried Vulnerability)',
      archetypeTitle: exileTitle,
      astrologicalOrigin: `Ketu in ${ketu.rashiName} (${ketuHouseInfo.name}) under the ${ketu.shastiamsha.name} Shastiamsha, echoed by Lunar ${moon.shastiamsha.name} sensitivity in ${moonRashi.name}`,
      coreBelief: `"If I allow myself to need unguarded support in ${ketuHouseInfo.arena}, I will face ${ketuData.exileCoreDread}."`,
      pastLifeImprint: `Rooted in the ${ketu.shastiamsha.name} (${ketu.shastiamsha.archetype}) past-life stream: ${ketu.shastiamsha.subconsciousImprint}. You developed ${ketuData.pastLifeSurvivalGenius} within the realm of ${ketuRashi.psychologicalDomain}.`,
      currentLifeFootprint: `Manifests today as ${ketu.shastiamsha.exileWound} focused specifically in ${ketuHouseInfo.arena}, heightened whenever your ${moonRashi.name} Moon feels ungrounded.`,
      somaticLocation: ketuData.exileSomaticFascia,
      unburdeningKey: `Witnessing this part from adult Self-leadership without demanding that it justify its existence through hyper-competence or self-erasure.`,
      lifeFacets: ketuData.facets,
    },
    manager: {
      role: 'Manager (Proactive Protector)',
      archetypeTitle: managerTitle,
      astrologicalOrigin: `Saturn in ${saturn.rashiName} within the ${saturnHouseInfo.name} intersecting the ${ascendant.rashiName} Ascendant under the ${saturn.shastiamsha.name} current`,
      coreBelief: `"I must anticipate every structural, financial, and emotional variable in ${saturnHouseInfo.arena} so the Exile is never blindsided by ${ketuData.exileCoreDread}."`,
      pastLifeImprint: `Carries the karmic memory of ${saturn.shastiamsha.subconsciousImprint} in ${saturnHouseInfo.arena}, where survival required unyielding composure, strategic patience, and self-denial.`,
      currentLifeFootprint: `Operates as ${saturnData.coreVigilanceRule} and ${ketu.shastiamsha.protectorStrategy}—managing your standing in ${saturnHouseInfo.arena} (${saturn.rashiName}).`,
      somaticLocation: saturnData.somaticLocation,
      unburdeningKey: `Honoring its decades of tireless protection while gently proving that your adult Self can handle unpredictability in ${saturnHouseInfo.arena} without collapsing.`,
      lifeFacets: saturnData.facets,
    },
    firefighter: {
      role: 'Firefighter (Reactive Protector)',
      archetypeTitle: firefighterTitle,
      astrologicalOrigin: `Mars in ${mars.rashiName} within the ${marsHouseInfo.name} activating under acute pressure via the ${mars.shastiamsha.name} current`,
      coreBelief: `"When the Manager's control fails in ${saturnHouseInfo.arena} and the Exile's dread threatens to flood the body, I must immediately sever the tension and reset the field."`,
      pastLifeImprint: `Draws upon the emergency instinct of ${mars.shastiamsha.subconsciousImprint}—choosing ${marsData.emergencyAction.toLowerCase()} over prolonged helplessness.`,
      currentLifeFootprint: `Deploys when cornered in ${ketuHouseInfo.arena}: ${marsData.emergencyTrigger} Triggering: ${marsData.emergencyAction}`,
      somaticLocation: `Sympathetic nervous system surge through ${mars.house === 1 ? 'facial blood flow and cranial muscles' : mars.house === 4 ? 'solar plexus, chest, and throat' : 'chest and extremities'}—either an acute flash of heat demanding action or an icy numbness.`,
      unburdeningKey: `Recognizing the physiological wave before acting on the impulse to blow up a project or cut off a relationship; providing safe, embodied discharge.`,
      lifeFacets: marsData.facets,
    },
    selfLeadershipAnchor: `Anchored through your Navamsha (D9) ${ascendant.navamshaName} soul-horizon and Jupiter in ${planets.find((p) => p.id === 'Jupiter')!.rashiName}: a spacious, unhurried, compassionate witness capable of holding both fierce autonomy and courageous collaboration across all life arenas.`,
    mandatoryEchoSummary: `Past-Life ${ketu.shastiamsha.name} Imprint (${ketu.rashiName} in ${ketuHouseInfo.name}) ➔ Current-Life Exile (${ketu.shastiamsha.exileWound}) ➔ Guarded daily by ${saturn.shastiamsha.name} Manager in ${saturnHouseInfo.name} & ${mars.shastiamsha.name} Firefighter in ${marsHouseInfo.name}.`,
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

  const earnedSecurityPathway = `Anchoring through your Venus Navamsha (${venus.navamshaName}) and Rahu in ${rahu.rashiName} (${HOUSE_PSYCHOLOGY[rahu.house].name}): consciously naming your micro-withdrawals in real time across work, money, and intimacy before protective walls harden.`;

  return {
    primaryStyle,
    secondaryPull,
    astrologicalCatalyst: `Moon in ${moon.rashiName} (${moonHouseInfo.name}, ${moon.shastiamsha.name} D60) intersecting Venus in ${venus.rashiName} (${venusHouseInfo.name}, ${venus.shastiamsha.name} D60) and Saturn in ${saturn.rashiName} (${saturnHouseInfo.name})`,
    coreIntimacyFear,
    protestOrWithdrawalBehavior,
    conflictTriggerLoop,
    earnedSecurityPathway,
    mandatoryEchoSummary: `Celestial Vector (${moon.rashiName} Moon in ${moonHouseInfo.name} / ${venus.rashiName} Venus in ${venusHouseInfo.name} / ${saturn.rashiName} Saturn in ${saturnHouseInfo.name}) ➔ ${primaryStyle} Reflex ➔ ${secondaryPull}.`,
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
      trait: 'Neuroticism (Emotional Sensitivity)',
      baselineScore: baseNeuroticism,
      reconditionedTarget: targetNeuroticism,
      karmicDefaultLabel: 'Hyper-Vigilant Threat Scanning',
      evolutionaryTargetLabel: 'Self-Led Somatic Equanimity',
      shadowExpression: `Driven by Ketu's ${ketu.shastiamsha.name} imprint and Moon in ${moon.rashiName}, your baseline nervous system runs covert background simulations of potential disaster in career, finances, health, and relationships.`,
      selfLedExpression: `As you unburden the ${ketu.shastiamsha.name} Exile, that acute sensitivity transforms into high-resolution intuitive perception without sympathetic nervous system flooding.`,
      stretchMechanism: `Anchoring in the ${rahu.rashiName} Rahu evolutionary frontier (${HOUSE_PSYCHOLOGY[rahu.house].name}) and trusting your capacity to handle uncertainty in real time.`,
      lifeArenaImpact: `Career & Money: Replaces financial catastrophizing with strategic resource stewardship. Health: Prevents adrenal burnout. Relationships: Calms over-analysis of partners' moods.`,
    },
    {
      trait: 'Openness to Experience',
      baselineScore: baseOpenness,
      reconditionedTarget: targetOpenness,
      karmicDefaultLabel: 'Selective Conceptual Mastery',
      evolutionaryTargetLabel: 'Embodied Experiential Fluidity',
      shadowExpression: `With Mercury in ${mercury.rashiName} and Jupiter in ${jupiter.rashiName}, you have immense intellectual depth, yet your Manager restricts real-world experimentation when an outcome cannot be guaranteed.`,
      selfLedExpression: `Stepping into your ${ascendant.navamshaName} Navamsha allows openness to move from the head into the body—welcoming career pivots, creative play, and unscripted life experiences.`,
      stretchMechanism: `Releasing the need to master an arena conceptually before allowing yourself to participate as an authentic beginner.`,
      lifeArenaImpact: `Creative Voice: Releasing unpolished work without fear of critique. Vocation: Venturing into novel business models. Spirituality: Moving from academic study to direct mystical experience.`,
    },
    {
      trait: 'Conscientiousness',
      baselineScore: baseConscientiousness,
      reconditionedTarget: targetConscientiousness,
      karmicDefaultLabel: 'Compulsive Armor & Over-Responsibility',
      evolutionaryTargetLabel: 'Aligned Devotional Craft',
      shadowExpression: `Saturn in ${saturn.rashiName} (${saturn.shastiamsha.name} D60) wires a punishing work ethic where rest feels sinful and minor professional oversights trigger self-beratement.`,
      selfLedExpression: `When conscientiousness is decoupled from survival fear, your discipline becomes joyful, sustainable mastery with abundant space for play, rest, and community.`,
      stretchMechanism: `Replacing punitive self-monitoring with rhythm-based devotion guided by your ${saturn.navamshaName} Navamsha maturity.`,
      lifeArenaImpact: `Health: Honoring circadian rhythms and rest days. Vocation: Delegating operational tasks without anxiety. Family: Refusing to fix problems that belong to other adults.`,
    },
    {
      trait: 'Agreeableness',
      baselineScore: baseAgreeableness,
      reconditionedTarget: targetAgreeableness,
      karmicDefaultLabel: 'Polarized Compliance or Fortified Autonomy',
      evolutionaryTargetLabel: 'Boundary-Rich Compassion',
      shadowExpression: `Under Venus in ${venus.rashiName} and Mars in ${mars.rashiName}, you alternate between over-accommodating clients, family, and lovers to keep peace, and suddenly erecting iron walls when feeling exploited.`,
      selfLedExpression: `Integrating the ${venus.navamshaName} Navamsha allows you to stay warm, generous, and collaborative while upholding clear, non-defensive boundaries.`,
      stretchMechanism: `Voicing small preferences, financial terms, and emotional boundaries early so your Firefighter never has to burn down relationships.`,
      lifeArenaImpact: `Career: Negotiating fair compensation without apology. Relationships: Disagreeing without withdrawing love. Lineage: Breaking guilt-based familial obligations with grace.`,
    },
    {
      trait: 'Extraversion',
      baselineScore: baseExtraversion,
      reconditionedTarget: targetExtraversion,
      karmicDefaultLabel: 'Guarded Selective Visibility',
      evolutionaryTargetLabel: 'Sovereign Relational Presence',
      shadowExpression: `While your ${ascendant.rashiName} Ascendant carries natural presence, Ketu in the ${HOUSE_PSYCHOLOGY[ketu.house].name} pulls you into chronic retreat, masking your true gifts behind a safe, low-profile role.`,
      selfLedExpression: `By stepping into Rahu in the ${HOUSE_PSYCHOLOGY[rahu.house].name}, you stop performing energy for others and show up with authentic, sustainable executive and personal visibility.`,
      stretchMechanism: `Allowing yourself to be seen, recognized, and compensated at scale rather than hiding in private competence.`,
      lifeArenaImpact: `Vocation: Claiming leadership, public speaking, and market visibility. Creative Voice: Sharing your creations unreservedly. Community: Building a loyal, aligned tribe.`,
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

  const ascRashi = RASHI_LIST[ascendant.rashiIndex];
  const ketuRashi = RASHI_LIST[ketu.rashiIndex];
  const rahuRashi = RASHI_LIST[rahu.rashiIndex];
  const moonRashi = RASHI_LIST[moon.rashiIndex];
  const saturnRashi = RASHI_LIST[saturn.rashiIndex];
  const venusRashi = RASHI_LIST[venus.rashiIndex];
  const navAscRashi = RASHI_LIST[ascendant.navamshaIndex];
  const navVenusRashi = RASHI_LIST[venus.navamshaIndex];
  const navMoonRashi = RASHI_LIST[moon.navamshaIndex];

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

  const retroPlanets = planets.filter((p) => p.isRetrograde && p.id !== 'Rahu' && p.id !== 'Ketu');
  const retroNames =
    retroPlanets.length > 0
      ? retroPlanets.map((p) => `${p.id} (${p.sanskritName}) in ${p.rashiName}`).join(' and ')
      : `the inward-turning nodal currents across ${ketu.rashiName} and ${rahu.rashiName}`;

  // SECTION 1: THE IMPLICIT CODE + BESPOKE LAYMAN LANGUAGE TRANSLATION (ALL LIFE FACETS)
  const section1ImplicitCode = `## 1. THE IMPLICIT CODE: Subconscious Past-Life Defaults & Internal Family Systems (IFS) Mapping

You did not arrive in this life as an unwritten slate. Beneath your conscious career ambitions and the composed ${ascRashi.name} presence you project to the world, your psyche operates from a deeply grooved set of unlearned instincts—an implicit memory architecture forged before you ever spoke your first word in ${input.placeOfBirth.split(',')[0]}. When nobody is watching, when fatigue strips away your social conditioning, or when unexpected pressure rattles your day, your nervous system automatically slides back into the gravitational well of your South Node (Ketu) in ${ketuRashi.name} within your ${ketuHouse.name}, governed at the deepest cellular level by the **${ketu.shastiamsha.name}** past-life deity stream (*${ketu.shastiamsha.archetype}*) and nuanced by your Lunar **${moon.shastiamsha.name}** imprint.

In the architecture of your soul, this ${ketu.shastiamsha.name} current represents a domain you have already over-mastered to the point of spiritual exhaustion. You carry the cellular muscle-memory of ${ketu.shastiamsha.subconsciousImprint}. Because your soul spent an entire evolutionary cycle navigating the high-stakes terrain of ${ketuRashi.psychologicalDomain} inside the arena of ${ketuHouse.arena}, you instinctively know how to read the unspoken physics of a room before anyone else realizes a shift has occurred. Yet what once served as your supreme survival genius has now calcified into an invisible prison of over-reliance. You treat self-containment in your work, money, family, and relationships not as a choice, but as an existential mandate.

### The Origin of Your Core Exile: *${ifs.exile.archetypeTitle}*
Through the lens of Internal Family Systems (IFS), this ancient ${ketu.shastiamsha.name} configuration is the exact blueprint of your primary **Exile part**: *${ifs.exile.archetypeTitle}*. Deep beneath your adult competence lives ${ketu.shastiamsha.exileWound}. This younger, sequestered part of your psyche carries a visceral, pre-verbal conviction: *${ifs.exile.coreBelief}*

Whenever life invites you to lean on colleagues, to delegate high-stakes tasks, to speak an unpolished truth, or to leave your heart unarmored, this Exile stirs in the subterranean chambers of your ${ifs.exile.somaticLocation}. It remembers the ancient cost of exposure: what happened when trust was extended without a backup plan, or when your natural sensitivity was met with volatility, scarcity, or displacement. To prevent you from ever re-experiencing that primordial hollowness, your internal system organized a sophisticated, two-tiered defensive garrison around the Exile.

### The Proactive Shield: Your Manager Part (*${ifs.manager.archetypeTitle}*)
To ensure that your ${ketu.shastiamsha.name} Exile is never triggered in daily life, your psyche recruited a tireless, hyper-vigilant **Manager part** anchored in your ${saturnRashi.name} Saturn within the ${saturnHouse.name} and colored by the **${saturn.shastiamsha.name}** archetype (*${saturn.shastiamsha.archetype}*). This Manager operates as the chief operating officer of your waking personality. It believes that safety is a logistical problem that can be solved through discipline, hyper-preparedness, emotional composure, and total self-reliance in ${saturnHouse.arena}.

- **The Metaphysical-to-Behavioral Echo (Manager Footprint Across All Life Facets):**
  - **Vocation & Money:** ${saturnData.facets.vocationAndMoney}
  - **Creative Voice & Visibility:** ${saturnData.facets.creativeVoiceAndVisibility}
  - **Somatic Health & Nervous System:** ${saturnData.facets.somaticHealthAndNervousSystem}
  - **Family Lineage & Lineage Roles:** ${saturnData.facets.familyLineageAndAncestralRoles}
  - **Existential Trust & Solitude:** ${saturnData.facets.existentialTrustAndSolitude}
  - **Interpersonal & Romantic Bonds:** ${saturnData.facets.interpersonalAndRomanticBonds}

### The Emergency Override: Your Firefighter Part (*${ifs.firefighter.archetypeTitle}*)
Even the most disciplined Manager cannot control every variable of modern life. When an unexpected betrayal, a sharp public critique, institutional bad faith, or prolonged emotional chaos breaches your ${saturnRashi.name} perimeter and threatens to flood your nervous system with the Exile's raw dread, your psyche immediately deploys its **Firefighter part**: *${ifs.firefighter.archetypeTitle}*, fueled by Mars in ${mars.rashiName} under the **${mars.shastiamsha.name}** current (*${mars.shastiamsha.archetype}*).

- **The Metaphysical-to-Behavioral Echo (Firefighter Footprint Across All Life Facets):**
  - **Vocation & Money:** ${marsData.facets.vocationAndMoney}
  - **Creative Voice & Visibility:** ${marsData.facets.creativeVoiceAndVisibility}
  - **Somatic Health & Nervous System:** ${marsData.facets.somaticHealthAndNervousSystem}
  - **Family Lineage & Lineage Roles:** ${marsData.facets.familyLineageAndAncestralRoles}
  - **Existential Trust & Solitude:** ${marsData.facets.existentialTrustAndSolitude}
  - **Interpersonal & Romantic Bonds:** ${marsData.facets.interpersonalAndRomanticBonds}

---

### Layman Language Translation: What Your Specific Implicit Code Actually Feels Like in Real Life
Let's strip away all astrological and psychological jargon and examine how your exact synthesized configuration—the **${ketu.shastiamsha.name}** past-life imprint in the **${ketuHouse.name}**, proactively defended by your **${saturn.shastiamsha.name}** Manager in the **${saturnHouse.name}** and reactively salvaged by your **${mars.shastiamsha.name}** Firefighter—actually plays out in your visceral, weekly human experience across every arena of living:

1. **The Real-World Anatomy of Your Exile (*${ifs.exile.archetypeTitle}*):**
   - **The Core Visceral Feeling:** Deep inside, specifically centered in your ${ifs.exile.somaticLocation}, lives an unspoken assumption: *${ifs.exile.coreBelief}* This isn't theoretical philosophy; it is a physical bracing that enters your body the moment life asks you to relax your guard in ${ketuHouse.arena}.
   - **In Career & Workplace Authority:** ${ketuData.facets.vocationAndMoney}
     *Concrete Workday Scenario:* ${ketuData.realWorldTuesdayScenario.workplace}
   - **With Money & Material Security:** ${ketuData.realWorldTuesdayScenario.money}
   - **In Creative Voice & Public Visibility:** ${ketuData.facets.creativeVoiceAndVisibility}
     *What happens when sharing your work:* ${ketuData.realWorldTuesdayScenario.creative}
   - **In Your Body & Nervous System:** ${ketuData.facets.somaticHealthAndNervousSystem}
     *Somatic symptom profile:* ${ketuData.realWorldTuesdayScenario.somatic} Stored primarily in your ${ketuData.exileSomaticFascia}.
   - **In Family Lineage & Ancestral Dynamics:** ${ketuData.facets.familyLineageAndAncestralRoles}
     *Your lineage default:* ${ketuData.realWorldTuesdayScenario.family}
   - **In Solitude & Existential Meaning:** ${ketuData.facets.existentialTrustAndSolitude}
     *When completely alone:* ${ketuData.realWorldTuesdayScenario.solitude}
   - **In Romantic & Intimate Bonds:** ${ketuData.facets.interpersonalAndRomanticBonds}
     *The intimate reflex:* ${ketuData.realWorldTuesdayScenario.romance}

2. **How Your Specific Manager (*${saturnData.managerTitle}*) Dictates Your Waking Life:**
   - **Its Operating Logic:** Anchored in Saturn within your ${saturnHouse.name} (${saturnHouse.arena}), this Manager operates on the core rule: *"${saturnData.coreVigilanceRule}"*
   - **At Work & In Projects:** ${saturnData.facets.vocationAndMoney}
     *A typical high-stakes scenario:* ${saturnData.weeklyWorkdayScenario}
   - **In Public Persona & Creative Presentation:** ${saturnData.facets.creativeVoiceAndVisibility}
   - **In Daily Somatic Rhythm:** ${saturnData.facets.somaticHealthAndNervousSystem} Physically held in your ${saturnData.somaticLocation}.
   - **In Family & Ancestral Responsibilities:** ${saturnData.facets.familyLineageAndAncestralRoles}
   - **In Friendships & Partnerships:** ${saturnData.facets.interpersonalAndRomanticBonds}

3. **How Your Specific Firefighter (*${marsData.firefighterTitle}*) Takes Over When the Perimeter Fails:**
   - **The Emergency Threshold:** When the workload or boundary pressure in ${saturnHouse.arena} breaches the perimeter, your ${marsData.firefighterTitle} activates:
     *Trigger point:* ${marsData.emergencyTrigger}
     *Emergency override action:* ${marsData.emergencyAction}
   - **In Career & Finance:** ${marsData.facets.vocationAndMoney}
   - **In Creative & Public Life:** ${marsData.facets.creativeVoiceAndVisibility}
   - **In Physical Health & Sleep:** ${marsData.facets.somaticHealthAndNervousSystem}
   - **In Family Lineage & Solitude:** ${marsData.facets.familyLineageAndAncestralRoles} and ${marsData.facets.existentialTrustAndSolitude}
   - **In Personal Relationships:** ${marsData.facets.interpersonalAndRomanticBonds}

4. **The Synthesized Weekly Feedback Loop:**
   - In plain English, your life repeatedly oscillates through this three-stage cycle:
     1. **The Exile's Subtle Dread:** Uncertainty touches your life in ${ketuHouse.arena}, triggering fear of ${ketuData.exileCoreDread}.
     2. **The Manager's Hyper-Vigilance:** You respond through ${saturnData.managerTitle}—applying ${saturnData.coreVigilanceRule} in ${saturnHouse.arena}.
     3. **The Firefighter's Reset:** When pressure overloads your capacity, ${marsData.firefighterTitle} intervenes via ${marsData.emergencyAction.toLowerCase()}.
   - True liberation begins not by fighting these parts, but by anchoring your adult consciousness in your **${navAscRashi.name}** Navamsha Self—letting your Manager take real rest and assuring your Exile that its survival is now protected by an adult who cannot be displaced.`;

  // SECTION 2: THE STRUCTURAL KNOTS + BESPOKE LAYMAN LANGUAGE TRANSLATION (ALL LIFE FACETS)
  // Continuous, connected, non-repetitive narrative strictly aligned to the birth chart

  const activeRetrogrades = planets.filter(
    (p) => p.isRetrograde && p.id !== 'Rahu' && p.id !== 'Ketu'
  );
  const gandantaList = planets.filter((p) => p.isGandanta);
  const sandhiList = planets.filter((p) => p.isSandhi && !p.isGandanta);

  const anomaliesConnectedNarrative =
    anomalies.length > 0
      ? anomalies
          .map((anom, idx) => {
            return `#### Structural Knot 0${idx + 1}: ${anom.type} — ${anom.planetsInvolved.join(' & ')}
${anom.structuralCause}. In your internal landscape, this configuration creates a continuous psychological undertow: ${anom.psychologicalLoop}

At the cellular level, your nervous system registers this tension through ${anom.somaticSignature.toLowerCase()}

In your daily life, this knot does not stay confined to the theoretical sphere; it echoes directly across your worldly pursuits: in your executive decisions and career authority, ${anom.vocationalEcho.toLowerCase()} In your creative risk-taking and public visibility, ${anom.creativeEcho.toLowerCase()} In your relational bonds and intimacy boundaries, ${anom.attachmentEcho.toLowerCase()}`;
          })
          .join('\n\n')
      : `#### Harmonious Planetary Dialogue: Moon in ${moonRashi.name} & Saturn in ${saturnRashi.name}
Your chart presents a clean, unobstructed longitudinal distribution, allowing the primary conversation to flow directly between the emotional receptivity of your ${moonRashi.name} Moon and the pragmatic realism of your ${saturnRashi.name} Saturn, balancing creative depth with structural responsibility.`;

  // Bespoke dynamic synthesis of the 6 life facets for Layman Language Translation
  // Dynamically constructed from Lagna, Moon element & house, Saturn house & retrograde, Venus & Navamsha, and active anomalies

  let anomalyWorkplaceDetail = '';
  if (activeRetrogrades.some((p) => p.id === 'Mercury')) {
    anomalyWorkplaceDetail = ` Because your Mercury is retrograde, you compulsively proofread contracts, proposals, and emails multiple times, agonizing over subtle phrasing and dreading that a verbal oversight will be weaponized against you in deal negotiations.`;
  } else if (activeRetrogrades.some((p) => p.id === 'Mars')) {
    anomalyWorkplaceDetail = ` Because your Mars is retrograde, you tend to internalize professional irritation until your threshold is breached, leading to sudden, uncompromising boundary resets or abrupt resignations rather than quiet, incremental compromise.`;
  } else if (activeRetrogrades.some((p) => p.id === 'Saturn')) {
    anomalyWorkplaceDetail = ` Because your Saturn is retrograde, you carry an unshakeable conviction that nobody else possesses the operational stamina to execute properly in ${saturnHouse.arena}, leading to severe chronic overwork and an inability to delegate.`;
  } else if (activeRetrogrades.some((p) => p.id === 'Jupiter')) {
    anomalyWorkplaceDetail = ` Because your Jupiter is retrograde, you possess an inherent skepticism of conventional corporate platitudes and hollow hierarchies, insisting that commercial ventures adhere to your uncompromising ethical standard.`;
  } else if (gandantaList.length > 0 || sandhiList.length > 0) {
    anomalyWorkplaceDetail = ` Because of karmic threshold junctions in your chart, major career transitions provoke acute existential tension, tempting you to abruptly terminate contracts when projects reach an institutional plateau.`;
  } else {
    anomalyWorkplaceDetail = ` The direct angular dialogue between your ${moonRashi.name} Moon and ${saturnRashi.name} Saturn equips you with an unreadable, composed poker face in executive meetings, maintaining an aura of quiet authority even when navigating high-stakes operational friction.`;
  }

  let laymanWorkplace = '';
  if (attachment.primaryStyle === 'Dismissive-Avoidant') {
    laymanWorkplace = `In professional execution within ${saturnHouse.arena}, your ${ascRashi.name} rising presence and ${moon.rashiElement} Moon establish you as an autonomous island of competence. When project deadlines slip or collaborators falter, your instinct is not to convene meetings; you quietly absorb the deliverable, execute it in solitary concentration with ${saturnRashi.name} rigor, and present it as an accomplished fact.${anomalyWorkplaceDetail} You treat reliance on others as a structural risk, preferring the exhaustion of carrying 100% of the burden to the vulnerability of being let down by an under-performing partner.`;
  } else if (attachment.primaryStyle === 'Anxious-Preoccupied') {
    laymanWorkplace = `In your vocational arena within ${saturnHouse.arena}, your ${moon.rashiElement} Moon in the ${moonHouse.name} drives you to act as the empathic shock-absorber and caretaker for team dynamics. You arrive early, stay late to polish flawed deliverables submitted by peers, and hyper-attune to the micro-expressions of managers and clients.${anomalyWorkplaceDetail} If an executive sends a terse, formal communication without warm pleasantries, your system experiences an adrenaline drop: *"Did I drop the ball? Am I about to be marginalized?"* You immediately spend twenty minutes crafting an overly accommodating reply to re-establish safety and belonging.`;
  } else if (attachment.primaryStyle === 'Fearful-Avoidant (Disorganized)') {
    laymanWorkplace = `In leadership and deal negotiations around ${saturnHouse.arena}, you experience a high-voltage push-pull cycle. You enter commercial alliances with charismatic brilliance and all-in dedication, demonstrating your ${ascRashi.name} capacity to solve impossible bottlenecks. But as expectations harden and colleagues begin relying heavily upon your presence, an acute claustrophobic panic sets in.${anomalyWorkplaceDetail} You begin perceiving subtle exploitation or institutional bad faith, triggering an impulse to burn bridges and exit cleanly, only to grieve the lost momentum weeks later in solitary reflection.`;
  } else {
    laymanWorkplace = `In executive leadership and commercial negotiations around ${saturnHouse.arena}, you balance structural boundaries with empathetic listening. Supported by your ${saturnRashi.name} Saturn, you set firm contractual milestones and hold team members accountable without emotional reactivity.${anomalyWorkplaceDetail} When high-stakes emergencies arise, you notice old urges to step in and micromanage, but consciously choose to empower your team through direct, transparent alignment.`;
  }

  let anomalyMoneyDetail = '';
  if (saturn.isRetrograde) {
    anomalyMoneyDetail = ` Your retrograde Saturn creates a persistent scarcity soundtrack—an unshakeable worry that no matter how substantial your net worth grows, a single structural catastrophe could wipe out your reserves, driving you to maintain ironclad liquidity buffers.`;
  } else if (venus.isRetrograde) {
    anomalyMoneyDetail = ` Your retrograde Venus produces an unconventional relationship with valuation; you frequently wrestle with pricing your intellectual property at true market value, fearing that charging high rates will commodify your sacred craftsmanship.`;
  } else if (anomalies.some((a) => a.type === 'Angular Friction (Drishti)')) {
    anomalyMoneyDetail = ` The tension between your Moon in ${moonRashi.name} and Saturn in ${saturnRashi.name} makes financial ambiguity intensely distressing; you require transparent ledgers, unambiguous equity terms, and clearly defined exit clauses before committing resources.`;
  } else {
    anomalyMoneyDetail = ` Your Venus in ${venusRashi.name} within the ${venusHouse.name} encourages you to invest in long-term enduring value rather than volatile speculative trends, treating capital as an instrument of sovereign freedom.`;
  }

  let laymanMoney = '';
  if (attachment.primaryStyle === 'Dismissive-Avoidant') {
    laymanMoney = `With capital allocation, wealth generation, and commercial contracts, your core imperative is absolute sovereignty. The prospect of co-mingling funds, taking on venture debt with restrictive covenants, or depending on a business partner's financial discipline triggers immediate resistance.${anomalyMoneyDetail} You keep private savings reserves and distinct revenue streams that nobody else can access or monitor, viewing personal liquidity as the ultimate fortress ensuring nobody can ever force your hand.`;
  } else if (attachment.primaryStyle === 'Anxious-Preoccupied') {
    laymanMoney = `In commercial transactions and personal finances, you frequently blur boundaries between financial health and emotional connection. You struggle to negotiate top-tier compensation for your labor in ${saturnHouse.arena}, often accepting lower rates out of fear that standing firm will offend clients or employers.${anomalyMoneyDetail} You may lend money to relatives or bail out friends who fail to repay you, finding it agonizingly difficult to demand repayment because asserting financial boundaries feels like an emotional severance.`;
  } else if (attachment.primaryStyle === 'Fearful-Avoidant (Disorganized)') {
    laymanMoney = `Your relationship with money swings between periods of rigorous, self-denying austerity in ${saturnHouse.arena} and sudden, compensatory spending sprees when emotional pressure reaches a breaking point.${anomalyMoneyDetail} You approach commercial agreements and equity partnerships with intense scrutiny, often sensing hidden traps in the fine print and vacillating between wanting total financial independence and craving a wealthy benefactor who will shoulder the burden.`;
  } else {
    laymanMoney = `You manage wealth and commercial risk with clarity, pragmatism, and generosity. Guided by your Venus in ${venusRashi.name} and Saturn in ${saturnRashi.name}, you establish clear financial divisions in joint ventures and negotiate compensation that accurately honors your experience.${anomalyMoneyDetail} You treat money not as an emotional substitute, but as an energetic resource to be cultivated, protected, and circulated with intentionality.`;
  }

  let laymanSomatic = `Your physical body and autonomic nervous system serve as the true barometer for your structural planetary knots. With your Moon in ${moonRashi.name} (${moon.rashiElement} element) and Saturn anchoring your physical defenses in ${saturnRashi.name}, stress does not evaporate through intellectual analysis—it lodges directly in your ${saturnData.somaticLocation}. When deadlines intensify or relational ambiguity lingers in ${venusHouse.arena}, your nervous system engages ${
    attachment.primaryStyle === 'Anxious-Preoccupied'
      ? 'a sympathetic fight-or-flight hyper-arousal: your heart rate accelerates, breathing becomes shallow in the upper chest, stomach acid surges, and your mind races through scenarios late into the night, preventing deep restorative REM sleep.'
      : attachment.primaryStyle === 'Dismissive-Avoidant'
        ? 'a parasympathetic dorsal-vagal freeze: your facial micro-expressions become rigid, cervical fascia and jaw tighten, and your consciousness detaches from somatic signals—allowing you to work through physical exhaustion and chronic pain until your body forces a total shutdown.'
        : 'an autonomic whiplash: rapid oscillations between sympathetic panic (racing pulse, solar plexus clenching, hot restlessness) and sudden dorsal collapse (brain fog, heavy limbs, and a sudden urge to sleep for fourteen hours in a darkened room).'
  } When depleted, your only reliable cure is solitary sensory deprivation in your private sanctuary, letting your nervous system slowly reset away from human demands.`;

  let laymanFamily = `Within your family lineage and ancestral expectations, the placement of your Moon in ${moonRashi.name} (${moonHouse.name}) and Saturn in ${saturnRashi.name} defines the specific historical role you were assigned. ${
    attachment.primaryStyle === 'Dismissive-Avoidant'
      ? `You inhabit the role of the polite, accomplished family anchor who arrives with logistical solutions, legal advice, or financial support, but maintains an impenetrable barrier around your private emotional world. If parents or relatives pry into your vulnerabilities, disappointments, or heartaches, you skillfully deflect the inquiry toward current events, career updates, or real estate.`
      : attachment.primaryStyle === 'Anxious-Preoccupied'
        ? `You have functioned as the generational emotional sponge—attuning to parental anxieties, acting as the peacemaker between feuding relatives, and carrying an unconscious burden of guilt whenever anyone in your lineage suffers, instinctively believing that the happiness of your family system rests squarely on your shoulders.`
        : `Your family dynamic is defined by an intense approach-avoidance rhythm: fierce protective devotion and pride for your roots, contrasted with sharp, painful boundary ruptures or extended periods of silence when ancestral hypocrisies, emotional double-binds, or childhood wounds are re-opened during holiday gatherings.`
  }`;

  let laymanRomance = `In romantic intimacy, the matrix between your Moon in ${moonRashi.name}, Venus in ${venusRashi.name} (${venusHouse.name}), and Navamsha Venus in ${navVenusRashi.name} creates an exquisitely specific emotional choreography. You offer partners grounded loyalty, aesthetic depth, and protective stability. However, as the relationship deepens toward true, unvetted vulnerability—discussing permanent cohabitation, emotional reliance, or mutual surrender—your core knot triggers: *${attachment.coreIntimacyFear}* ${
    attachment.primaryStyle === 'Dismissive-Avoidant'
      ? `A silent alarm sounds in your chest. You suddenly find yourself hyper-focusing on microscopic flaws in your partner, craving days of unbroken solitude, and pouring your focus into work. When your partner expresses hurt or asks for emotional presence, you retreat behind a wall of polite reason: *"I'm fine, just stressed with work"*, unconsciously daring them to see through your defense, yet pushing them away if they step closer.`
      : attachment.primaryStyle === 'Anxious-Preoccupied'
        ? `Any brief emotional coolness, delayed text reply, or need for partner solitude triggers an intense dread of abandonment. You enter hyper-vigilant "temperature checking"—asking *"Are we okay?"* or offering unneeded favors to earn reassurance. When your partner feels smothered and pulls back to breathe, their withdrawal confirms your worst fear, accelerating the panic cycle.`
        : `You experience the classic intimacy storm: you meet someone and experience an electric, magnetic soul connection, opening up with breathtaking vulnerability. But once mutual commitment solidifies, your system interprets love as an inescapable cage. You pick sudden arguments, pull away coldly, or threaten to end the connection. Yet the moment your partner actually packs their bags or emotionally detaches, a terrifying surge of loss hits you, and you scramble frantically to pull them back into the fold.`
  }`;

  let laymanEarnedSecurity = `The embodied pathway to earned security is illuminated by your Venus Navamsha in **${navVenusRashi.name}** and your Rahu evolutionary trajectory in **${rahuRashi.name}** (${rahuHouse.name}):
- **In High-Stakes Workplace Negotiations:** When operational friction or ambiguous directives arise in ${saturnHouse.arena}, resist your default impulse to ${attachment.primaryStyle === 'Dismissive-Avoidant' ? 'silently take over the entire workload in isolation' : attachment.primaryStyle === 'Anxious-Preoccupied' ? 'over-apologize and assume personal fault' : 'abruptly terminate the project'}. Instead, schedule a 15-minute alignment checkpoint to calmly articulate expectations and deliverables in writing.
- **With Capital Partnerships & Contracts:** Ensure all equity distributions, risk allocations, and milestone criteria are drafted with explicit, transparent terms before committing capital, protecting your psychological safety through clear agreements rather than defensive suspicion.
- **In Intimate Partnership Moments:** When emotional claustrophobia or fear of engulfment flares in ${venusHouse.arena}, replace protective withdrawal or reactive protest with a grounded verbal script: *"I love and value our connection, and right now my nervous system is in sensory overload. Give me twenty minutes of quiet downtime to reset, and I will come back ready to listen and connect with you fully."*`;

  const section2StructuralKnots = `## 2. THE STRUCTURAL KNOTS: Core Friction Points & Attachment Dynamics

Where your Implicit Code reveals your default defensive posture, your structural planetary knots—specifically the inward-turning vectors of ${retroNames}, the sensitive sign-border junctions (*Sandhi* and *Gandanta* thresholds), and the geometric angular friction between your Moon in ${moonRashi.name}, Venus in ${venusRashi.name}, and Saturn in ${saturnRashi.name}—reveal the exact fault lines where your psychic energy folds back upon itself. These knots do not simply affect your romantic life; they dictate how you relate to money, career authority, creative risk, family lineage, and bodily health.

### The Celestial Architecture of Attachment: The Manas-Shukra-Shani Matrix
When we translate your celestial geometry into modern Attachment Theory, your interpersonal blueprint crystallizes around a **${attachment.primaryStyle}** core, driven by an undercurrent of **${attachment.secondaryPull}**.

In Jyotish psychology, the **Moon (Manas)** governs instinctual emotional digestion, **Venus (Shukra)** governs the capacity for mutual valuation and intimate vulnerability, while **Saturn (Shani)** governs structural boundaries and emotional containment. In your birth chart:
- Your Moon moves through **${moonRashi.name}** (${moon.rashiElement} element) within the **${moonHouse.name}** (${moonHouse.arena}), governed at the cellular level by the **${moon.shastiamsha.name}** past-life deity stream (*${moon.shastiamsha.subconsciousImprint}*).
- Your Venus is positioned in **${venusRashi.name}** within the **${venusHouse.name}** (${venusHouse.arena}), under the influence of the **${venus.shastiamsha.name}** deity (*${venus.shastiamsha.archetype}*).
- Your Saturn exercises structural surveillance from **${saturnRashi.name}** within the **${saturnHouse.name}** (${saturnHouse.arena})${saturn.isRetrograde ? ', retrograding inward to enforce rigorous internal accounting' : ''}.

This celestial geometry creates an exquisite tension in your psyche: *${attachment.coreIntimacyFear}* When intimacy, partnership, or commercial collaboration deepens in ${venusHouse.arena}, your nervous system responds not with open surrender, but with a protective reflex: *${attachment.protestOrWithdrawalBehavior}*

During moments of friction—whether with a client, co-founder, parent, or partner—this dynamic unfolds into an unconscious loop: *${attachment.conflictTriggerLoop}*

### The Interconnected Circuit of Structural Planetary Anomalies
Rather than isolated defects, the planetary knots in your chart operate as a continuous, unified psychic circuit, each tension point reinforcing the next:

${anomaliesConnectedNarrative}

### How These Structural Knots Form an Interconnected Psychic Circuit
These friction points do not fire in isolation. In your lived experience, they operate as a closed-loop system: when professional or deadline pressure mounts in ${saturnHouse.arena}, your ${saturnRashi.name} Saturn immediately tightens its defensive perimeter. If unexpected emotional vulnerability, ambiguous communication, or interpersonal tension surfaces around ${venusHouse.arena}, the inward torque of ${activeRetrogrades.length > 0 ? activeRetrogrades.map((p) => `Retrograde ${p.id}`).join(' and ') : 'your angular friction matrix'} forces an immediate reflexive retreat into ${moonHouse.arena}, converting raw feelings into analytical vigilance, physical containment, and self-reliant shielding.

---

### Layman Language Translation: How Your Structural Knots Actually Play Out in Daily Life
Let us strip away the astrological vectors and translate this exact matrix—your **${attachment.primaryStyle}** blueprint, your Moon in **${moonRashi.name}**, your Venus in **${venusRashi.name}**, and your specific planetary knots—into a continuous, experiential narrative of what you actually think, feel, and do across every sphere of life:

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

6. **The Embodied Pathway to Earned Security in Plain English:**
   ${laymanEarnedSecurity}`;

  // SECTION 3: THE EVOLUTIONARY FRONTIER + BESPOKE LAYMAN LANGUAGE TRANSLATION (ALL LIFE FACETS)
  const bigFiveNarrativeBlocks = bigFive
    .map((dim) => {
      return `- **${dim.trait} (Shifting from *${dim.karmicDefaultLabel}* ➔ *${dim.evolutionaryTargetLabel}*):**
  - *The Unconscious Default:* ${dim.shadowExpression}
  - *The Self-Led Reconditioning:* ${dim.selfLedExpression}
  - *The Daily Stretch:* ${dim.stretchMechanism}
  - *Life Facets Impact:* ${dim.lifeArenaImpact}`;
    })
    .join('\n\n');

  // Build dynamic, customized layman translations for each of the 5 Big Five traits
  const bigFiveLaymanDetails = bigFive
    .map((dim, idx) => {
      return `### Trait 0${idx + 1}: ${dim.trait} (Moving from ${dim.baselineScore}% Baseline ➔ ${dim.reconditionedTarget}% Evolutionary Target)
- **What the Old Karmic Default Looked Like in Daily Life (*${dim.karmicDefaultLabel}*):** ${dim.shadowExpression}
- **What Reconditioning Looks Like in Practice (*${dim.evolutionaryTargetLabel}*):** ${dim.selfLedExpression}
- **The Real-World Behavioral Stretch:** ${dim.stretchMechanism}
- **Its Concrete Impact Across Life Arenas:** ${dim.lifeArenaImpact}`;
    })
    .join('\n\n');

  const section3EvolutionaryFrontier = `## 3. THE EVOLUTIONARY FRONTIER: The Current Life Reconditioning Blueprint

If Ketu and your Shastiamsha deities describe the ancient fortress you built to survive the past, your North Node (**Rahu**) in **${rahuRashi.name}** within your **${rahuHouse.name}**—illuminated by the deeper soul-horizon of your **Navamsha (D9)** chart—describes the exact evolutionary medicine required to make you whole in this lifetime across your career, finances, creative voice, health, family, and relationships.

Your soul did not incarnate to repeat the familiar, sterile safety of ${ketuHouse.arena}. It chose the electric, unfamiliar, and deeply fertile stretch zone of ${rahuHouse.arena}, expressed through the evolutionary frequency of ${rahuRashi.psychologicalDomain}. To your Manager and Firefighter parts, this Rahu frontier initially looks messy, risky, and out of control. Where Ketu in ${ketuRashi.name} demands guaranteed safety before taking a step, Rahu in ${rahuRashi.name} asks you to step into the arena *before* you feel ready—to risk ${rahuHouse.evolutionaryTask}.

### The ${polarity.axisName}
- **The Karmic Ceiling of the Past:** ${polarity.karmicCeiling}
- **Rahu's Evolutionary Call in this Lifetime:** ${polarity.rahuEvolutionaryCall}

### The Navamsha (D9) Soul Trajectory: Who You Become When the Armor Drops
In Vedic structural psychology, the root birth matrix shows the inherited conditioning and defensive reflexes, while the **Navamsha** reveals the ripened fruit of your consciousness once those defenses are unburdened. Your Navamsha horizon shifts into **${navAscRashi.name}**, your emotional foundation ripens into **${navMoonRashi.name}**, and your capacity for relational and commercial harmony matures into **${navVenusRashi.name}**.

- **The Metaphysical-to-Behavioral Echo (The Navamsha Shift Across Life):**
  - **In Career & Leadership:** Instead of leading through hyper-control and micromanagement, your ${navAscRashi.name} Navamsha self embodies visionary delegation and collaborative stewardship. You build systems that run smoothly without demanding your physical depletion.
  - **In Creative Voice:** You stop hoarding your creative gifts. Guided by ${navVenusRashi.name}, you share your ideas, designs, or ventures with the public while remaining grounded in your own validation.
  - **In Somatic Health:** Regulated through ${navMoonRashi.name}, the chronic tension in your body melts away as your nervous system learns that it is safe to down-regulate. You sleep deeply, eat with pleasure, and listen to your body's early whisper rather than waiting for an emergency scream.
  - **In Family & Ancestral Lineage:** You release the role of the family fixer. You relate to relatives with warmth and kindness while maintaining sovereign, calm boundaries that protect your peace.
  - **In Intimacy & Friendship:** The guarded reflex of ${venusRashi.name} softens into the ${navVenusRashi.name} capacity for real-time transparency. You risk asking for what you need, welcoming true interdependence.

### Reconditioning Your Big Five Personality Matrix Across All Facets
As you systematically unburden your ${ifs.exile.archetypeTitle} and invite your ${ifs.manager.archetypeTitle} to step down from 24/7 duty, your behavioral footprint undergoes a measurable, structural realignment:

${bigFiveNarrativeBlocks}

---

### Layman Language Translation: What Stepping Into Your ${rahuRashi.name} Rahu Frontier and ${navAscRashi.name} Navamsha Actually Looks Like in Daily Life
Let's take this grand evolutionary roadmap and translate it into what your life actually looks and feels like when you stop running on your past-life defaults and start operating from your unburdened **${navAscRashi.name}** Self across every single sphere of life:

1. **The Core Shift from Your Past-Life Comfort (${ketuRashi.name} in ${ketuHouse.name}) to Your Growth Frontier (${rahuRashi.name} in ${rahuHouse.name}):**
   - **The Evolutionary Axis You Are Navigating:** *${polarity.axisName}*
   - **The Old Karmic Default You Are Leaving Behind:** In previous lifetimes and throughout your early adult conditioning, you survived by mastering **${ketuHouse.arena}**. ${polarity.karmicCeiling}
   - **The New Rahu Arena You Are Called to Inhabit:** Your soul's growth in this lifetime requires you to expand boldly into **${rahuHouse.arena}**, embodying the qualities of **${rahuRashi.psychologicalDomain}**. This means risking **${rahuHouse.evolutionaryTask}** even when your palms sweat and your Manager part protests. ${polarity.rahuEvolutionaryCall}
   - **In Career & Workplace Authority:** ${polarity.facetsShift.vocationAndMoney}
   - **With Money & Material Abundance:** Shifting from scarcity anxiety or defensive isolation in capital into sustainable wealth generation that supports your true life purpose.
   - **In Creative Voice & Visibility:** ${polarity.facetsShift.creativeVoiceAndVisibility}
   - **In Physical Health & Nervous System Regulation:** ${polarity.facetsShift.somaticHealthAndNervousSystem}
   - **In Family Lineage & Ancestral Dynamics:** ${polarity.facetsShift.familyLineageAndAncestralRoles}
   - **In Solitude & Existential Meaning:** ${polarity.facetsShift.existentialTrustAndSolitude}
   - **In Romantic Intimacy & Friendships:** ${polarity.facetsShift.interpersonalAndRomanticBonds}

2. **Operating From Your Navamsha (D9) Consciousness in Plain English:**
   - **Your ${navAscRashi.name} Navamsha Ascendant:** In high-stakes moments, you no longer react from the conditioned defensiveness of your birth chart. You pause, connect with your breath, and respond with the grounded authority and wisdom of ${navAscRashi.name}.
   - **Your Navamsha Moon in ${navMoonRashi.name}:** When unexpected emotional storms arrive, your Navamsha Moon acts as a steady anchor, providing deep self-compassion and emotional equanimity rather than falling into catastrophic spirals.
   - **Your Navamsha Venus in ${navVenusRashi.name}:** In contracts, creative projects, and romantic bonds, you operate from an innate sense of worth, attracting partnerships based on genuine peer-level reciprocity and shared values.

3. **Your Big Five Personality Transformation Grounded in Everyday Situations:**

${bigFiveLaymanDetails}`;

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
