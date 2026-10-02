import type {
  ArchivalPreset,
  BirthInput,
  GenderOption,
  GeographicCoordinates,
  PlanetaryPosition,
  PlanetId,
  ShastiamshaDeityInfo,
  StructuralAnomaly,
} from '../types/jyotish.ts';

export const RASHI_LIST: Array<{
  index: number;
  name: string;
  sanskrit: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Movable' | 'Fixed' | 'Dual';
  ruler: PlanetId;
  psychologicalDomain: string;
}> = [
  { index: 0, name: 'Aries', sanskrit: 'Mesha', element: 'Fire', modality: 'Movable', ruler: 'Mars', psychologicalDomain: 'instinctual autonomy, pioneering initiative, and somatic assertion' },
  { index: 1, name: 'Taurus', sanskrit: 'Vrishabha', element: 'Earth', modality: 'Fixed', ruler: 'Venus', psychologicalDomain: 'material containment, sensory endurance, and foundational security' },
  { index: 2, name: 'Gemini', sanskrit: 'Mithuna', element: 'Air', modality: 'Dual', ruler: 'Mercury', psychologicalDomain: 'cognitive agility, perceptual dialectics, and communicative versatility' },
  { index: 3, name: 'Cancer', sanskrit: 'Karka', element: 'Water', modality: 'Movable', ruler: 'Moon', psychologicalDomain: 'visceral belonging, emotional attunement, and protective maternal instinct' },
  { index: 4, name: 'Leo', sanskrit: 'Simha', element: 'Fire', modality: 'Fixed', ruler: 'Sun', psychologicalDomain: 'sovereign self-authorship, creative radiance, and dignified leadership' },
  { index: 5, name: 'Virgo', sanskrit: 'Kanya', element: 'Earth', modality: 'Dual', ruler: 'Mercury', psychologicalDomain: 'diagnostic precision, somatic discernment, and systemic craftsmanship' },
  { index: 6, name: 'Libra', sanskrit: 'Tula', element: 'Air', modality: 'Movable', ruler: 'Venus', psychologicalDomain: 'dyadic equilibrium, relational reciprocity, and aesthetic harmony' },
  { index: 7, name: 'Scorpio', sanskrit: 'Vrishchika', element: 'Water', modality: 'Fixed', ruler: 'Mars', psychologicalDomain: 'subterranean depth, psychological crisis-alchemy, and unshakeable loyalty' },
  { index: 8, name: 'Sagittarius', sanskrit: 'Dhanu', element: 'Fire', modality: 'Dual', ruler: 'Jupiter', psychologicalDomain: 'teleological purpose, philosophical horizon-seeking, and moral integrity' },
  { index: 9, name: 'Capricorn', sanskrit: 'Makara', element: 'Earth', modality: 'Movable', ruler: 'Saturn', psychologicalDomain: 'structural endurance, vocational discipline, and earned authority' },
  { index: 10, name: 'Aquarius', sanskrit: 'Kumbha', element: 'Air', modality: 'Fixed', ruler: 'Saturn', psychologicalDomain: 'systemic innovation, collective vision, and objective intellectual detachment' },
  { index: 11, name: 'Pisces', sanskrit: 'Meena', element: 'Water', modality: 'Dual', ruler: 'Jupiter', psychologicalDomain: 'transpersonal empathy, spiritual dissolution, and mythic imagination' },
];

export const HOUSE_PSYCHOLOGY: Record<number, {
  name: string;
  sanskrit: string;
  arena: string;
  unconsciousFear: string;
  evolutionaryTask: string;
}> = {
  1: {
    name: 'First Bhava (Lagna)',
    sanskrit: 'Tanu Bhava',
    arena: 'embodied identity, vitality, physical presence, and the right to exist without apology',
    unconsciousFear: 'that unfiltered self-expression will trigger immediate rejection, punishment, or erasure',
    evolutionaryTask: 'inhabiting your physical and vocational presence without defensive armor or shrinking',
  },
  2: {
    name: 'Second Bhava',
    sanskrit: 'Dhana Bhava',
    arena: 'financial security, material net worth, family conditioning, voice, and intrinsic self-worth',
    unconsciousFear: 'sudden poverty, material collapse, or being cast out of the family lineage',
    evolutionaryTask: 'anchoring internal abundance and speaking your truth without bargaining for survival',
  },
  3: {
    name: 'Third Bhava',
    sanskrit: 'Sahaja Bhava',
    arena: 'courageous action, creative skills, commercial initiative, sibling bonds, and direct voice',
    unconsciousFear: 'being publicly ridiculed, silenced, or paralyzed at the moment of decisive execution',
    evolutionaryTask: 'taking bold creative and entrepreneurial risks and speaking with unedited authority',
  },
  4: {
    name: 'Fourth Bhava',
    sanskrit: 'Sukha Bhava',
    arena: 'emotional sanctuary, ancestral roots, home, mothering dynamics, and resting nervous-system peace',
    unconsciousFear: 'that no environment is truly safe enough to let your guard down and rest',
    evolutionaryTask: 'cultivating a solid internal sanctuary independent of outer chaos or family demands',
  },
  5: {
    name: 'Fifth Bhava',
    sanskrit: 'Putra Bhava',
    arena: 'creative genius, risk capital, joyful self-expression, romantic play, and heart-intelligence',
    unconsciousFear: 'being judged as mediocre, flawed, or foolish when revealing your authentic creative core',
    evolutionaryTask: 'creating and leading from uninhibited heart-intelligence rather than perfectionist performance',
  },
  6: {
    name: 'Sixth Bhava',
    sanskrit: 'Ripu Bhava',
    arena: 'daily work execution, somatic health, immune resilience, conflict navigation, and boundary service',
    unconsciousFear: 'being overwhelmed by disorder, chronic illness, litigation, or unpayable debts',
    evolutionaryTask: 'transforming compulsive anxiety and over-fixing into grounded, sustainable somatic rhythms',
  },
  7: {
    name: 'Seventh Bhava',
    sanskrit: 'Yuvati Bhava',
    arena: 'business partnerships, public contracts, intimate marriage, and dyadic projection mirroring',
    unconsciousFear: 'losing your sovereignty through engulfment or being betrayed once fully exposed',
    evolutionaryTask: 'practicing transparent, peer-level agreements where both autonomy and intimacy thrive',
  },
  8: {
    name: 'Eighth Bhava',
    sanskrit: 'Randhra Bhava',
    arena: 'shared assets, joint financial ventures, psychological shadow integration, and crisis metamorphosis',
    unconsciousFear: 'sudden betrayal, catastrophic loss of control, or emotional ruin in shared undertakings',
    evolutionaryTask: 'metabolizing hidden fear, navigating financial/emotional uncertainty, and surrendering hyper-control',
  },
  9: {
    name: 'Ninth Bhava',
    sanskrit: 'Dharma Bhava',
    arena: 'higher vocation, life philosophy, mentorship, international expansion, and ethical compass',
    unconsciousFear: 'nihilistic disillusionment, dogmatic betrayal, or discovering life lacks meaning',
    evolutionaryTask: 'building an unshakeable, lived philosophical framework that guides all commercial and personal choices',
  },
  10: {
    name: 'Tenth Bhava',
    sanskrit: 'Karma Bhava',
    arena: 'career mastery, public reputation, executive authority, social impact, and relationship to power',
    unconsciousFear: 'public failure, disgrace, impostor exposure, or having your value reduced solely to output',
    evolutionaryTask: 'stepping into visionary, ethical leadership that serves your soul rather than appeasing critics',
  },
  11: {
    name: 'Eleventh Bhava',
    sanskrit: 'Labha Bhava',
    arena: 'revenue streams, professional networks, large-scale ambitions, community impact, and peer circles',
    unconsciousFear: 'remaining an isolated outsider even while standing in the center of an accomplished group',
    evolutionaryTask: 'monetizing your unique gifts and collaborating with allies without compromising your individuality',
  },
  12: {
    name: 'Twelfth Bhava',
    sanskrit: 'Vyaya Bhava',
    arena: 'unconscious processing, sleep/subconscious health, solitary retreat, investments, and transpersonal surrender',
    unconsciousFear: 'dissolution, energetic bankruptcy, isolation, or being forgotten by the waking world',
    evolutionaryTask: 'honoring your need for deep restorative sanctuary while remaining fully grounded in daily execution',
  },
};

const D60_RAW_LIST: Array<{
  name: string;
  nature: 'Saumya' | 'Krura';
  archetype: string;
  imprint: string;
  exile: string;
  protector: string;
}> = [
  { name: 'Ghora', nature: 'Krura', archetype: 'The Fierce Threshold Guardian', imprint: 'acute survival intensity and exposure to sudden structural upheaval', exile: 'a terrified inner witness that expects calm moments to shatter without warning', protector: 'a hyper-vigilant scanning Manager that preemptively braces for crisis across career, finances, and relationships' },
  { name: 'Rakshasa', nature: 'Krura', archetype: 'The Sovereign Insurgent', imprint: 'instinctual defiance against coercive authority and raw self-preservation', exile: 'a shamed part convinced its natural hunger, ambition, and intensity are dangerous', protector: 'a combative Firefighter that cuts ties or pushes back aggressively before anyone can control you' },
  { name: 'Deva', nature: 'Saumya', archetype: 'The Luminous Harmonizer', imprint: 'refined ethical grace, aesthetic idealism, and conflict aversion', exile: 'a fragile child-part overwhelmed by human coarseness, betrayal, or commercial greed', protector: 'a perfectionist Manager that over-polishes your public persona to prevent criticism' },
  { name: 'Kubera', nature: 'Saumya', archetype: 'The Steward of Sanctuary', imprint: 'deep responsibility for material preservation, financial vigilance, and protective stewardship', exile: 'an exhausted part carrying the ancestral burden of keeping everyone financially and emotionally afloat', protector: 'a resource-guarding Manager that equates safety with total financial self-reliance and never asking for aid' },
  { name: 'Yaksha', nature: 'Saumya', archetype: 'The Keeper of Hidden Current', imprint: 'magnetic sensitivity to unspoken motives, secrecy, and guarded assets', exile: 'a misunderstood part that feels unseen behind its own charm and professional competence', protector: 'an enigmatic Manager that fascinates and guides others while keeping the private self firmly walled off' },
  { name: 'Kinnara', nature: 'Saumya', archetype: 'The Creative Muse', imprint: 'creative liminality, artistic longing, and acute sensitivity to mundane routine', exile: 'a homesick part that feels trapped inside corporate or rigid domestic structures', protector: 'a daydreaming Firefighter that escapes into conceptual abstraction when life feels demanding' },
  { name: 'Bhrashta', nature: 'Krura', archetype: 'The Displaced Architect', imprint: 'memories of sudden loss of status, professional displacement, or revoked privilege', exile: 'a grieving part haunted by the dread of professional obsolescence, bankruptcy, or being cast out', protector: 'a relentless overachieving Manager determined to build an unshakeable career and reputation' },
  { name: 'Kulaghna', nature: 'Krura', archetype: 'The Lineage Pattern-Breaker', imprint: 'rupture with inherited familial paradigms and the heavy price of individuation', exile: 'a lonely part carrying guilt for refusing to live out family scripts and expectations', protector: 'a fiercely independent Manager that refuses to lean on family or institutions for support' },
  { name: 'Garala', nature: 'Krura', archetype: 'The Alchemist of Harsh Truths', imprint: 'absorbing unspoken toxicity, institutional politics, or emotional poison in past environments', exile: 'a somatizing part holding undigested stress and chronic professional/relational distrust', protector: 'a cynical, razor-sharp diagnostic Manager that sniffs out hidden agendas and hypocrisy instantly' },
  { name: 'Vahni', nature: 'Krura', archetype: 'The Sacred Pyre', imprint: 'consuming mental drive, vocational sacrifice, and relentless kinetic energy', exile: 'a burned-out part terrified that slowing down means ceasing to have value in the world', protector: 'an intensity-seeking Firefighter that incinerates stagnation through relentless work sprints or radical resets' },
  { name: 'Maya', nature: 'Krura', archetype: 'The Strategic Navigator', imprint: 'navigating complex social games, institutional ambiguity, and shifting allegiances', exile: 'a disoriented part unsure who is genuinely authentic and who is merely performing', protector: 'a chameleon Manager that masters every room while keeping its core convictions hidden' },
  { name: 'Purishaka', nature: 'Krura', archetype: 'The Shadow Excavator', imprint: 'confronting raw, unvarnished human nature and institutional debris', exile: 'a burdened part feeling contaminated by having to carry dirty secrets or salvage broken teams', protector: 'a compartmentalizing Manager that seals feelings inside airtight intellectual vaults' },
  { name: 'Apampati', nature: 'Saumya', archetype: 'The Oceanic Sovereign', imprint: 'vast emotional containment, silent depth, and deep moral conviction', exile: 'a submerged part holding massive responsibility that refuses to burden colleagues or partners', protector: 'an unshakeable, calm Manager that maintains a tranquil exterior even when systems are burning' },
  { name: 'Marutwan', nature: 'Saumya', archetype: 'The Gale of Swift Agency', imprint: 'restless strategic mobility, rapid execution, and refusal to be caged', exile: 'a claustrophobic part terrified of bureaucratic stagnation or emotional entrapment', protector: 'a hyper-mobile Firefighter that pivots to a new venture or project the moment the current one feels stagnant' },
  { name: 'Kaala', nature: 'Krura', archetype: 'The Inexorable Timekeeper', imprint: 'stern awareness of mortality, deadlines, career stakes, and unforgiving consequences', exile: 'a Somber part convinced that time is running out and mistakes are permanent', protector: 'an austere, self-critical Manager enforcing punishing work standards and austere discipline' },
  { name: 'Sarpa', nature: 'Krura', archetype: 'The Coiled Kundalini Sentinel', imprint: 'primordial psychological acumen, strategic secrecy, and unwavering vigilance', exile: 'a betrayed part remembering what happened when business or personal vulnerability was exposed prematurely', protector: 'a watchful Manager that scrutinizes every contract, person, and agreement before taking a step' },
  { name: 'Amrita', nature: 'Saumya', archetype: 'The Vessel of Nectar', imprint: 'restorative resilience, cellular endurance, and ethical grace after ordeal', exile: 'a porous empathic part that absorbs the exhaustion and stress of coworkers, family, and partners', protector: 'a caretaker Manager that attempts to fix everyone else’s problems to justify its own space' },
  { name: 'Indu', nature: 'Saumya', archetype: 'The Lunar Mirror', imprint: 'deep emotional attunement, creative fertility, and cyclical sensitivity', exile: 'a vulnerable part deeply bruised by harsh criticism, corporate coldness, or dismissal', protector: 'a pleasing Manager that tracks micro-expressions in colleagues and bosses to avoid conflict' },
  { name: 'Mridu', nature: 'Saumya', archetype: 'The Gentle Craftsman', imprint: 'refined diplomacy, tactile precision, and revulsion toward brutality or chaos', exile: 'a delicate part that freezes when confronted with shouting, aggressive competition, or office politics', protector: 'a conflict-defusing Manager that over-accommodates and softens hard truths to keep peace' },
  { name: 'Komala', nature: 'Saumya', archetype: 'The Unfolding Lotus', imprint: 'creative purity, fresh vision, and devotion to beauty and integrity', exile: 'a tender creative part grieving the commodification of its passion', protector: 'a cautious Manager that curates private environments and hesitates to release work publicly' },
  { name: 'Heramba', nature: 'Saumya', archetype: 'The Strategic Problem-Solver', imprint: 'paradoxical wisdom, calm amidst commercial storm, and protective shelter', exile: 'a parentified part that had to become the capable executive adult long before its time', protector: 'an omnipotent-fixer Manager that takes on every crisis so others don’t drop the ball' },
  { name: 'Brahma', nature: 'Saumya', archetype: 'The Conceptual Architect', imprint: 'generative intellect, systems design, and foundational ambition', exile: 'an isolated part living inside theoretical models, disconnected from bodily warmth', protector: 'an abstracting Manager that retreats into grand strategic frameworks when messy reality intrudes' },
  { name: 'Vishnu', nature: 'Saumya', archetype: 'The Coherent Preserver', imprint: 'institutional sustaining power, relational balance, and dependable leadership', exile: 'an exhausted part terrified that if it stops holding the center, the business or family will collapse', protector: 'a stabilizing Manager that suppresses personal exhaustion to remain the bedrock' },
  { name: 'Maheshwara', nature: 'Saumya', archetype: 'The Radical Dissolver', imprint: 'ascetic clarity, fearless liquidation of obsolete forms, and deep stillness', exile: 'a detached part that preemptively lets go of ambitions or ties before they can be taken away', protector: 'a minimalist Firefighter that cuts projects or ties clean when integrity is compromised' },
  { name: 'Deva (Uttara)', nature: 'Saumya', archetype: 'The Clarified Witness', imprint: 'noble conscience, ethical leadership, and high vocational standards', exile: 'a part ashamed of ordinary human fatigue, anger, or commercial greed', protector: 'a moralizing Manager that demands flawless conduct in yourself and colleagues' },
  { name: 'Ardra', nature: 'Saumya', archetype: 'The Renewal Storm', imprint: 'cathartic breakthrough after prolonged creative or vocational tension', exile: 'a storm-weary part holding years of unshed grief and repressed frustration', protector: 'a stoic dam-keeper Manager afraid that if you show real emotion, everything will unravel' },
  { name: 'Kalinasha', nature: 'Saumya', archetype: 'The Dissolver of Gridlock', imprint: 'cutting through institutional hypocrisy and restoring clean momentum', exile: 'a part deeply frustrated by bureaucracy, mediocrity, and wasted potential', protector: 'a blunt truth-telling Manager that forces issues prematurely to relieve anxiety' },
  { name: 'Kshiteesa', nature: 'Saumya', archetype: 'The Sovereign Leader', imprint: 'civic responsibility, executive grit, and protective stewardship', exile: 'a burdened part that equates delegating or needing rest with shameful inadequacy', protector: 'an executive Manager that stays in high-alert command mode 24/7' },
  { name: 'Kamalakara', nature: 'Saumya', archetype: 'The Prosperous Spring', imprint: 'natural commercial magnetism, creative abundance, and relational warmth', exile: 'a part afraid it is only valued for its financial productivity or what it provides', protector: 'an over-giving Manager that never allows others to see you in need' },
  { name: 'Gulika', nature: 'Krura', archetype: 'The Saturnine Gravity', imprint: 'heavy karmic debt, delayed gratification, and grueling vocational endurance', exile: 'a constricted part carrying chronic dread that disaster is lurking around the corner', protector: 'a hyper-cautious Manager that restricts celebration and joy to avoid bad luck' },
  { name: 'Mrityu', nature: 'Krura', archetype: 'The Catalyst of Endings', imprint: 'navigating irreversible organizational, financial, and personal endings', exile: 'a part terrified of obsolescence, abandonment, and sudden disruption of life foundations', protector: 'a preemptive detachment Firefighter that cuts investments or ties before they fail' },
  { name: 'Kaala (Danda)', nature: 'Krura', archetype: 'The Strict Judge', imprint: 'uncompromising realism, financial conservatism, and self-discipline', exile: 'a judged part feeling perpetually inadequate before an internal audit committee', protector: 'a harsh inner-critic Manager that berates your performance before outsiders can' },
  { name: 'Davagni', nature: 'Krura', archetype: 'The Transformative Wildfire', imprint: 'sudden catalytic disruption that clears out obsolete structures', exile: 'a startled nervous system that associates passionate drive with burnout and destruction', protector: 'a firefighting part that either suppresses all ambition or blows up existing structures in rebellion' },
  { name: 'Ghora (Uttara)', nature: 'Krura', archetype: 'The Night Watchman', imprint: 'immense stamina under prolonged professional or personal siege', exile: 'an exhausted sentinel part that has forgotten how to relax or truly sleep', protector: 'a tactical Manager that treats leisure as an irresponsible lapse in vigilance' },
  { name: 'Yama', nature: 'Krura', archetype: 'The Arbiter of Duty', imprint: 'absolute boundary enforcement, contractual rigor, and ethical spine', exile: 'a rigid part terrified of moral or financial failure', protector: 'a rule-bound Manager that prioritizes duty and obligation over happiness' },
  { name: 'Kantaka', nature: 'Krura', archetype: 'The Sharp Thorn', imprint: 'acute radar for micro-inefficiencies, hidden risks, and defensive barbedness', exile: 'a vulnerable core surrounded by thorns to prevent being taken advantage of in business or love', protector: 'a sarcastic, guarded Manager that uses intellectual sharpness to keep others at bay' },
  { name: 'Sudha', nature: 'Saumya', archetype: 'The Restorative Spring', imprint: 'soothing conflict resolution, collaborative harmony, and gentle endurance', exile: 'a conflict-weary part that suppresses its own valid anger to keep business and home peaceful', protector: 'a mediator Manager that over-accommodates unreasonable demands' },
  { name: 'Amrita (Shuddha)', nature: 'Saumya', archetype: 'The Incorruptible Essence', imprint: 'spiritual resilience, moral authenticity, and quiet self-worth', exile: 'a solitary part that feels alienated from shallow commercial games', protector: 'a self-contained Manager that retreats into private work and disdains self-promotion' },
  { name: 'Purnachandra', nature: 'Saumya', archetype: 'The Complete Luminary', imprint: 'integrated emotional intelligence, public warmth, and expressive leadership', exile: 'a part that feels responsible for illuminating and uplifting everyone around it', protector: 'a cheerful, charismatic Manager that conceals its own fatigue and self-doubt' },
  { name: 'Vishadagdha', nature: 'Krura', archetype: 'The Tempered Steel', imprint: 'surviving career betrayal or financial ruin through fierce self-sufficiency', exile: 'a scorched part that vowed never again to depend on a partner, investor, or boss', protector: 'a hyper-independent Manager that rejects help even when drowning in workload' },
  { name: 'Kulanasa', nature: 'Krura', archetype: 'The Maverick Pioneer', imprint: 'walking away from traditional family businesses or cultural scripts', exile: 'a rootless part yearning for validation while defying the tribe', protector: 'an iconoclastic Firefighter that disrupts stability whenever things feel too predictable' },
  { name: 'Vamshakshaya', nature: 'Krura', archetype: 'The Final Chapter', imprint: 'closing out multi-generational cycles and building a path from zero', exile: 'a lonely part feeling it must invent the wheel with no ancestral blueprint', protector: 'a stoic pioneer Manager that distrusts traditional advice or safety nets' },
  { name: 'Utpata', nature: 'Krura', archetype: 'The Lightning Pivot', imprint: 'disruptive breakthroughs, electric intuition, and sudden pivots', exile: 'a nervous system wired for adrenaline and allergic to mundane consistency', protector: 'a restless Firefighter that triggers dramatic career pivots when boredom strikes' },
  { name: 'Kaala (Chakrika)', nature: 'Krura', archetype: 'The Wheel of Patience', imprint: 'immense long-range endurance and compounding strategic focus', exile: 'a waiting part feeling its real life and true work are perpetually delayed', protector: 'an over-preparing Manager that refuses to launch until conditions are 100% risk-free' },
  { name: 'Saumya', nature: 'Saumya', archetype: 'The Clear Strategist', imprint: 'gentle intellectual poise, non-combative success, and clear vision', exile: 'a quiet part whose insights get talked over by aggressive voices in the boardroom', protector: 'a polite Manager that yields territory rather than engaging in dirty fights' },
  { name: 'Komala (Navina)', nature: 'Saumya', archetype: 'The Rare Artisan', imprint: 'subtle craft, emotional nuance, and deep integrity in workmanship', exile: 'a sensitive part easily overwhelmed by the noise of modern hustle culture', protector: 'a selective Manager that limits public exposure to protect creative peace' },
  { name: 'Sheetala', nature: 'Saumya', archetype: 'The Cool Oasis', imprint: 'bringing calm discernment to crisis environments and heated negotiations', exile: 'a chilled part that freezes its own passion to remain the calm adult in the storm', protector: 'a detached, clinical Manager that suppresses enthusiasm to stay objective' },
  { name: 'Karaladamshtra', nature: 'Krura', archetype: 'The Fierce Protector', imprint: 'unyielding defense of assets, loved ones, and personal sovereignty', exile: 'a cornered part that once experienced severe boundary violations or theft', protector: 'an intimidating Firefighter that bares teeth the moment it senses exploitation' },
  { name: 'Chandramukhi', nature: 'Saumya', archetype: 'The Magnetic Mirror', imprint: 'relational resonance, executive charisma, and perceptive attunement', exile: 'a part afraid that if it is not constantly impressive or attractive, it will be discarded', protector: 'an image-conscious Manager that manicures public perception meticulously' },
  { name: 'Praveena', nature: 'Saumya', archetype: 'The Master Virtuoso', imprint: 'consummate technical mastery, strategic brilliance, and precision execution', exile: 'a perfectionist part convinced it is only worthy when demonstrating superior competence', protector: 'a hyper-competent Manager that refuses to delegate and avoids any arena it cannot dominate' },
  { name: 'Kalapavaka', nature: 'Krura', archetype: 'The Crucible Fire', imprint: 'relentless internal transmutation and forging strength through ordeal', exile: 'a weary part tired of every life milestone feeling like an intense test of character', protector: 'a Spartan Manager that turns even health, hobbies, and downtime into self-discipline drills' },
  { name: 'Dandayudha', nature: 'Krura', archetype: 'The Iron Scepter', imprint: 'uncompromising leadership, moral spine, and refusal to compromise standards', exile: 'a tender part locked behind an iron posture of invulnerability', protector: 'a stern Manager that forbids admitting exhaustion, pain, or uncertainty' },
  { name: 'Nirmala', nature: 'Saumya', archetype: 'The Stainless Mirror', imprint: 'absolute ethical transparency, clean business practices, and spotless conscience', exile: 'a scrupulous part tortured by guilt over normal human errors or commercial compromises', protector: 'a purifying Manager that obsessively polices your speech, finances, and motives' },
  { name: 'Saumya (Uttara)', nature: 'Saumya', archetype: 'The Generous Sage', imprint: 'broad horizon, mentorship, and building ethical institutions for the long term', exile: 'a trusting part devastated when encountering bad faith, greed, or betrayal in partners', protector: 'a rationalizing Manager that makes excuses for underperforming or manipulative associates' },
  { name: 'Krura', nature: 'Krura', archetype: 'The Surgical Knife', imprint: 'unflinching pragmatism, cutting away dead weight, and radical honesty', exile: 'a scarred part that learned vulnerability leads to exploitation', protector: 'a blunt, unsentimental Manager that makes ruthless cuts before anyone can wound you' },
  { name: 'Atisheetala', nature: 'Saumya', archetype: 'The Glacial Sanctuary', imprint: 'unshakeable composure during catastrophic failure and deep mental fortitude', exile: 'a frozen part that dissociated during overwhelming childhood or career storms', protector: 'a dissociative Firefighter that pulls consciousness into ice-cold detachment when stressed' },
  { name: 'Amrita (Parama)', nature: 'Saumya', archetype: 'The Healing Spring', imprint: 'profound capacity to revive failing ventures, heal trauma, and restore hope', exile: 'a part carrying the grief of ventures or people it poured itself into but could not save', protector: 'a rescuer Manager drawn toward broken people, failing companies, and impossible crusades' },
  { name: 'Payodhi', nature: 'Saumya', archetype: 'The Boundless Reservoir', imprint: 'vast intellectual, emotional, and financial containment capacity', exile: 'a deep part that feels no one ever understands the full scale of what it carries', protector: 'a self-contained Manager that offers shelter to others while keeping its own depths inaccessible' },
  { name: 'Bhramana', nature: 'Krura', archetype: 'The Restless Seeker', imprint: 'perpetual innovation, kinetic wanderlust, and refusal to settle for comfortable complacency', exile: 'a homeless part convinced that the grass is always greener on the next horizon', protector: 'a nomad Firefighter that upends stable jobs or homes whenever routine sets in' },
  { name: 'Chandrarekha', nature: 'Saumya', archetype: 'The Crescent of Dawn', imprint: 'delicate renewal, intuitive vision, and planting seeds for the next paradigm', exile: 'a nascent part protective of its fragile dreams and vulnerable aspirations', protector: 'a guarded Manager that keeps your truest creative and spiritual ambitions hidden until fully realized' },
];

const CITY_GAZETTEER: Record<string, { lat: number; lng: number; tz: number }> = {
  'kyoto, japan': { lat: 35.0116, lng: 135.7681, tz: 9 },
  'tokyo, japan': { lat: 35.6762, lng: 139.6503, tz: 9 },
  'osaka, japan': { lat: 34.6937, lng: 135.5023, tz: 9 },
  'varanasi, india': { lat: 25.3176, lng: 82.9739, tz: 5.5 },
  'mumbai, india': { lat: 19.076, lng: 72.8777, tz: 5.5 },
  'new delhi, india': { lat: 28.6139, lng: 77.209, tz: 5.5 },
  'delhi, india': { lat: 28.6139, lng: 77.209, tz: 5.5 },
  'bengaluru, india': { lat: 12.9716, lng: 77.5946, tz: 5.5 },
  'bangalore, india': { lat: 12.9716, lng: 77.5946, tz: 5.5 },
  'chennai, india': { lat: 13.0827, lng: 80.2707, tz: 5.5 },
  'kolkata, india': { lat: 22.5726, lng: 88.3639, tz: 5.5 },
  'hyderabad, india': { lat: 17.385, lng: 78.4867, tz: 5.5 },
  'pune, india': { lat: 18.5204, lng: 73.8567, tz: 5.5 },
  'jaipur, india': { lat: 26.9124, lng: 75.7873, tz: 5.5 },
  'rishikesh, india': { lat: 30.0869, lng: 78.2676, tz: 5.5 },
  'zurich, switzerland': { lat: 47.3769, lng: 8.5417, tz: 1 },
  'geneva, switzerland': { lat: 46.2044, lng: 6.1432, tz: 1 },
  'london, united kingdom': { lat: 51.5074, lng: -0.1278, tz: 0 },
  'london, uk': { lat: 51.5074, lng: -0.1278, tz: 0 },
  'edinburgh, united kingdom': { lat: 55.9533, lng: -3.1883, tz: 0 },
  'paris, france': { lat: 48.8566, lng: 2.3522, tz: 1 },
  'berlin, germany': { lat: 52.52, lng: 13.405, tz: 1 },
  'munich, germany': { lat: 48.1351, lng: 11.582, tz: 1 },
  'vienna, austria': { lat: 48.2082, lng: 16.3738, tz: 1 },
  'rome, italy': { lat: 41.9028, lng: 12.4964, tz: 1 },
  'milan, italy': { lat: 45.4642, lng: 9.19, tz: 1 },
  'florence, italy': { lat: 43.7696, lng: 11.2558, tz: 1 },
  'madrid, spain': { lat: 40.4168, lng: -3.7038, tz: 1 },
  'barcelona, spain': { lat: 41.3874, lng: 2.1686, tz: 1 },
  'lisbon, portugal': { lat: 38.7223, lng: -9.1393, tz: 0 },
  'amsterdam, netherlands': { lat: 52.3676, lng: 4.9041, tz: 1 },
  'stockholm, sweden': { lat: 59.3293, lng: 18.0686, tz: 1 },
  'oslo, norway': { lat: 59.9139, lng: 10.7522, tz: 1 },
  'copenhagen, denmark': { lat: 55.6761, lng: 12.5683, tz: 1 },
  'athens, greece': { lat: 37.9838, lng: 23.7275, tz: 2 },
  'istanbul, turkey': { lat: 41.0082, lng: 28.9784, tz: 3 },
  'cairo, egypt': { lat: 30.0444, lng: 31.2357, tz: 2 },
  'dubai, uae': { lat: 25.2048, lng: 55.2708, tz: 4 },
  'dubai, united arab emirates': { lat: 25.2048, lng: 55.2708, tz: 4 },
  'singapore, singapore': { lat: 1.3521, lng: 103.8198, tz: 8 },
  'hong kong, china': { lat: 22.3193, lng: 114.1694, tz: 8 },
  'shanghai, china': { lat: 31.2304, lng: 121.4737, tz: 8 },
  'beijing, china': { lat: 39.9042, lng: 116.4074, tz: 8 },
  'taipei, taiwan': { lat: 25.033, lng: 121.5654, tz: 8 },
  'seoul, south korea': { lat: 37.5665, lng: 126.978, tz: 9 },
  'bangkok, thailand': { lat: 13.7563, lng: 100.5018, tz: 7 },
  'jakarta, indonesia': { lat: -6.2088, lng: 106.8456, tz: 7 },
  'ubud, indonesia': { lat: -8.5069, lng: 115.2625, tz: 8 },
  'manila, philippines': { lat: 14.5995, lng: 120.9842, tz: 8 },
  'sydney, australia': { lat: -33.8688, lng: 151.2093, tz: 10 },
  'melbourne, australia': { lat: -37.8136, lng: 144.9631, tz: 10 },
  'auckland, new zealand': { lat: -36.8485, lng: 174.7633, tz: 12 },
  'new york, usa': { lat: 40.7128, lng: -74.006, tz: -5 },
  'new york, united states': { lat: 40.7128, lng: -74.006, tz: -5 },
  'los angeles, usa': { lat: 34.0522, lng: -118.2437, tz: -8 },
  'los angeles, united states': { lat: 34.0522, lng: -118.2437, tz: -8 },
  'san francisco, usa': { lat: 37.7749, lng: -122.4194, tz: -8 },
  'san francisco, united states': { lat: 37.7749, lng: -122.4194, tz: -8 },
  'chicago, usa': { lat: 41.8781, lng: -87.6298, tz: -6 },
  'boston, usa': { lat: 42.3601, lng: -71.0589, tz: -5 },
  'seattle, usa': { lat: 47.6062, lng: -122.3321, tz: -8 },
  'austin, usa': { lat: 30.2672, lng: -97.7431, tz: -6 },
  'miami, usa': { lat: 25.7617, lng: -80.1918, tz: -5 },
  'denver, usa': { lat: 39.7392, lng: -104.9903, tz: -7 },
  'toronto, canada': { lat: 43.6532, lng: -79.3832, tz: -5 },
  'vancouver, canada': { lat: 49.2827, lng: -123.1207, tz: -8 },
  'montreal, canada': { lat: 45.5017, lng: -73.5673, tz: -5 },
  'mexico city, mexico': { lat: 19.4326, lng: -99.1332, tz: -6 },
  'sao paulo, brazil': { lat: -23.5505, lng: -46.6333, tz: -3 },
  'rio de janeiro, brazil': { lat: -22.9068, lng: -43.1729, tz: -3 },
  'buenos aires, argentina': { lat: -34.6037, lng: -58.3816, tz: -3 },
  'santiago, chile': { lat: -33.4489, lng: -70.6693, tz: -4 },
  'bogota, colombia': { lat: 4.711, lng: -74.0721, tz: -5 },
  'lima, peru': { lat: -12.0464, lng: -77.0428, tz: -5 },
  'cape town, south africa': { lat: -33.9249, lng: 18.4241, tz: 2 },
  'johannesburg, south africa': { lat: -26.2041, lng: 28.0473, tz: 2 },
  'nairobi, kenya': { lat: -1.2921, lng: 36.8219, tz: 3 },
  'lagos, nigeria': { lat: 6.5244, lng: 3.3792, tz: 1 },
};

export const ARCHIVAL_PRESETS: ArchivalPreset[] = [
  {
    id: 'kyoto-1991',
    label: 'Case I · Kyoto, 1991',
    kicker: 'Ketu in 4th · Ghora D60 · Retrograde Mercury Sandhi',
    summary: 'Subterranean emotional containment, professional hyper-vigilance, and Dismissive-Avoidant self-reliance across career and home.',
    input: {
      birthTime: '14:35',
      dateOfBirth: '18/11/1991',
      gender: 'Female',
      placeOfBirth: 'Kyoto, Japan',
    },
  },
  {
    id: 'zurich-1984',
    label: 'Case II · Zurich, 1984',
    kicker: 'Saturn-Moon Knot · Sarpa D60 · Gandanta Venus',
    summary: 'Stoic vocational endurance paired with acute financial anxiety and Fearful-Avoidant boundary dynamics.',
    input: {
      birthTime: '04:15',
      dateOfBirth: '09/05/1984',
      gender: 'Male',
      placeOfBirth: 'Zurich, Switzerland',
    },
  },
  {
    id: 'varanasi-1996',
    label: 'Case III · Varanasi, 1996',
    kicker: 'Rahu-Moon Eclipse · Amrita D60 · Retrograde Jupiter',
    summary: 'Porous empathic absorption in work teams, caretaker over-functioning, and deep spiritual longing.',
    input: {
      birthTime: '21:50',
      dateOfBirth: '03/07/1996',
      gender: 'Female',
      placeOfBirth: 'Varanasi, India',
    },
  },
  {
    id: 'newyork-1989',
    label: 'Case IV · New York, 1989',
    kicker: 'Ketu in 10th · Bhrashta D60 · Mars-Saturn Opposition',
    summary: 'Relentless executive over-achievement shielding an ancient fear of career displacement, moving into authentic creative authority.',
    input: {
      birthTime: '08:20',
      dateOfBirth: '24/06/1989',
      gender: 'Other',
      placeOfBirth: 'New York, USA',
    },
  },
];

export function formatRawSchemaInput(input: BirthInput): string {
  return [
    `- Birth Time: ${input.birthTime}`,
    `- Date of Birth: ${input.dateOfBirth}`,
    `- Gender: ${input.gender}`,
    `- Place of Birth: ${input.placeOfBirth}`,
  ].join('\n');
}

export function parseRawSchemaInput(raw: string, fallback: BirthInput): BirthInput {
  const timeMatch = raw.match(/Birth\s*Time\s*:\s*\[?([0-2]?\d:[0-5]\d)\]?/i);
  const dobMatch = raw.match(/Date\s*of\s*Birth\s*:\s*\[?(\d{1,2}\/\d{1,2}\/\d{4})\]?/i);
  const genderMatch = raw.match(/Gender\s*:\s*\[?(Male|Female|Other)\]?/i);
  const placeMatch = raw.match(/Place\s*of\s*Birth\s*:\s*\[?([^\n\]]+)\]?/i);

  let gender: GenderOption = fallback.gender;
  if (genderMatch?.[1]) {
    const g = genderMatch[1].toLowerCase();
    if (g === 'male') gender = 'Male';
    else if (g === 'female') gender = 'Female';
    else gender = 'Other';
  }

  return {
    birthTime: timeMatch?.[1]?.trim() || fallback.birthTime,
    dateOfBirth: dobMatch?.[1]?.trim() || fallback.dateOfBirth,
    gender,
    placeOfBirth: placeMatch?.[1]?.trim() || fallback.placeOfBirth,
  };
}

export function resolveCoordinates(placeOfBirth: string): GeographicCoordinates {
  const cleaned = placeOfBirth.trim();
  const parts = cleaned.split(',').map((s) => s.trim());
  const city = parts[0] || 'Kyoto';
  const country = parts.slice(1).join(', ') || 'Japan';
  const key = `${city.toLowerCase()}, ${country.toLowerCase()}`;

  const exact = CITY_GAZETTEER[key];
  if (exact) {
    return {
      city,
      country,
      latitude: exact.lat,
      longitude: exact.lng,
      utcOffsetHours: exact.tz,
      isResolvedFromGazetteer: true,
    };
  }

  for (const [k, val] of Object.entries(CITY_GAZETTEER)) {
    if (k.startsWith(city.toLowerCase() + ',')) {
      return {
        city,
        country,
        latitude: val.lat,
        longitude: val.lng,
        utcOffsetHours: val.tz,
        isResolvedFromGazetteer: true,
      };
    }
  }

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 1000003;
  }
  const lat = Number((((hash % 11000) / 100) - 45).toFixed(4));
  const lng = Number(((((Math.floor(hash / 13)) % 30000) / 100) - 120).toFixed(4));
  const tz = Math.round(lng / 15);

  return {
    city,
    country,
    latitude: lat,
    longitude: lng,
    utcOffsetHours: tz,
    isResolvedFromGazetteer: false,
  };
}

function normalizeDegrees(deg: number): number {
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function computeJulianDay(dateOfBirth: string, birthTime: string, utcOffsetHours: number): number {
  const [ddStr, mmStr, yyyyStr] = dateOfBirth.split('/');
  const [hhStr, minStr] = birthTime.split(':');

  let day = parseInt(ddStr || '18', 10);
  let month = parseInt(mmStr || '11', 10);
  let year = parseInt(yyyyStr || '1991', 10);
  const hour = parseInt(hhStr || '14', 10);
  const minute = parseInt(minStr || '35', 10);

  if (isNaN(day) || day < 1 || day > 31) day = 18;
  if (isNaN(month) || month < 1 || month > 12) month = 11;
  if (isNaN(year) || year < 1800 || year > 2200) year = 1991;

  const utHours = hour + minute / 60 - utcOffsetHours;

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }

  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);

  const jd0 =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5;

  return jd0 + utHours / 24;
}

export function computeLahiriAyanamsha(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const ayanamsha = 23.857092 + T * 1.396971 + T * T * 0.000308;
  return Number(ayanamsha.toFixed(4));
}

function computeTropicalAscendant(jd: number, lat: number, lng: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const gmst = normalizeDegrees(
    280.46061837 +
      360.98564736629 * (jd - 2451545.0) +
      0.000387933 * T * T -
      (T * T * T) / 38710000.0
  );
  const lst = normalizeDegrees(gmst + lng);
  const ramc = degToRad(lst);
  const eps = degToRad(23.4392911 - 0.0130042 * T);
  const phi = degToRad(lat);

  const y = Math.cos(ramc);
  const x = -Math.sin(ramc) * Math.cos(eps) - Math.tan(phi) * Math.sin(eps);
  let asc = radToDeg(Math.atan2(y, x));
  return normalizeDegrees(asc);
}

function computeTropicalLongitudesAtJd(jd: number): Record<Exclude<PlanetId, 'Ascendant'>, number> {
  const d = jd - 2451545.0;
  const T = d / 36525.0;

  const L0 = normalizeDegrees(280.46646 + 0.98564736 * d);
  const M_sun = normalizeDegrees(357.52911 + 0.98560028 * d);
  const M_sun_rad = degToRad(M_sun);
  const C_sun =
    (1.914602 - 0.004817 * T) * Math.sin(M_sun_rad) +
    0.019993 * Math.sin(2 * M_sun_rad) +
    0.000289 * Math.sin(3 * M_sun_rad);
  const sunLon = normalizeDegrees(L0 + C_sun);

  const earthLonRad = degToRad(normalizeDegrees(sunLon + 180));
  const e_earth = 0.016708634 - 0.000042037 * T;
  const earthR = (1.000001018 * (1 - e_earth * e_earth)) / (1 + e_earth * Math.cos(degToRad(M_sun + C_sun)));

  const L_moon = normalizeDegrees(218.3165 + 13.17639648 * d);
  const M_moon = normalizeDegrees(134.9634 + 13.06499295 * d);
  const D_moon = normalizeDegrees(297.8502 + 12.19074912 * d);
  const F_moon = normalizeDegrees(93.2721 + 13.22935024 * d);

  const moonLon = normalizeDegrees(
    L_moon +
      6.2888 * Math.sin(degToRad(M_moon)) +
      1.274 * Math.sin(degToRad(2 * D_moon - M_moon)) +
      0.6583 * Math.sin(degToRad(2 * D_moon)) +
      0.2136 * Math.sin(degToRad(2 * M_moon)) -
      0.1851 * Math.sin(M_sun_rad) -
      0.1143 * Math.sin(degToRad(2 * F_moon))
  );

  const computePlanetGeocentric = (
    L_deg: number,
    a: number,
    e: number,
    w_bar: number,
    node: number
  ): number => {
    const M = normalizeDegrees(L_deg - w_bar);
    const M_rad = degToRad(M);
    let E = M_rad + e * Math.sin(M_rad) * (1 + e * Math.cos(M_rad));
    for (let i = 0; i < 3; i++) {
      E = E - (E - e * Math.sin(E) - M_rad) / (1 - e * Math.cos(E));
    }
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const v = radToDeg(Math.atan2(yv, xv));
    const r = Math.sqrt(xv * xv + yv * yv);
    const helioLon = degToRad(normalizeDegrees(v + w_bar));

    const x_geo = r * Math.cos(helioLon) - earthR * Math.cos(earthLonRad);
    const y_geo = r * Math.sin(helioLon) - earthR * Math.sin(earthLonRad);
    return normalizeDegrees(radToDeg(Math.atan2(y_geo, x_geo)));
  };

  const mercuryLon = computePlanetGeocentric(
    normalizeDegrees(252.2509 + 4.09233445 * d),
    0.387098,
    0.205635,
    77.4561,
    48.3309
  );

  const venusLon = computePlanetGeocentric(
    normalizeDegrees(181.9798 + 1.60213034 * d),
    0.72333,
    0.006773,
    131.5637,
    76.6799
  );

  const marsLon = computePlanetGeocentric(
    normalizeDegrees(355.433 + 0.52403295 * d),
    1.523688,
    0.093405,
    336.0602,
    49.5581
  );

  const jupiterLon = computePlanetGeocentric(
    normalizeDegrees(34.3515 + 0.08308529 * d),
    5.202603,
    0.048498,
    14.3312,
    100.4644
  );

  const saturnLon = computePlanetGeocentric(
    normalizeDegrees(50.0774 + 0.03345965 * d),
    9.554909,
    0.055546,
    92.5988,
    113.6655
  );

  const rahuLon = normalizeDegrees(125.044555 - 0.05295376 * d);
  const ketuLon = normalizeDegrees(rahuLon + 180);

  return {
    Sun: sunLon,
    Moon: moonLon,
    Mars: marsLon,
    Mercury: mercuryLon,
    Jupiter: jupiterLon,
    Venus: venusLon,
    Saturn: saturnLon,
    Rahu: rahuLon,
    Ketu: ketuLon,
  };
}

export function computeNavamshaIndex(siderealLon: number): number {
  const rashiIndex = Math.floor(siderealLon / 30) % 12;
  const degreeInRashi = siderealLon % 30;
  const padaIndex = Math.floor(degreeInRashi / (30 / 9));

  const startMap: Record<number, number> = {
    0: 0, 4: 0, 8: 0,
    1: 9, 5: 9, 9: 9,
    2: 6, 6: 6, 10: 6,
    3: 3, 7: 3, 11: 3,
  };
  const startSign = startMap[rashiIndex] ?? 0;
  return (startSign + padaIndex) % 12;
}

export function computeShastiamshaDeity(siderealLon: number): ShastiamshaDeityInfo {
  const rashiIndex = Math.floor(siderealLon / 30) % 12;
  const degreeInRashi = siderealLon % 30;
  const partIndexZeroBased = Math.min(59, Math.floor(degreeInRashi * 2));

  const isOddSign = rashiIndex % 2 === 0;
  const deitySlot = isOddSign ? partIndexZeroBased : 59 - partIndexZeroBased;
  const raw = D60_RAW_LIST[deitySlot] || D60_RAW_LIST[0];

  return {
    index: deitySlot + 1,
    name: raw.name,
    sanskrit: `${raw.name} Shastiamsha`,
    nature: raw.nature === 'Saumya' ? 'Saumya (Benefic / Harmonious)' : 'Krura (Fierce / Catalytic)',
    archetype: raw.archetype,
    subconsciousImprint: raw.imprint,
    exileWound: raw.exile,
    protectorStrategy: raw.protector,
  };
}

function evaluateDignity(planet: PlanetId, rashiIndex: number): PlanetaryPosition['dignity'] {
  const exaltation: Partial<Record<PlanetId, number>> = {
    Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 1, Ketu: 7,
  };
  const debilitation: Partial<Record<PlanetId, number>> = {
    Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0, Rahu: 7, Ketu: 1,
  };
  const ownSigns: Partial<Record<PlanetId, number[]>> = {
    Sun: [4],
    Moon: [3],
    Mars: [0, 7],
    Mercury: [2, 5],
    Jupiter: [8, 11],
    Venus: [1, 6],
    Saturn: [9, 10],
    Rahu: [10],
    Ketu: [7],
  };

  if (exaltation[planet] === rashiIndex) return 'Exalted';
  if (debilitation[planet] === rashiIndex) return 'Debilitated';
  if (ownSigns[planet]?.includes(rashiIndex)) return 'Own Sign';
  return 'Neutral';
}

const SANSKRIT_PLANET_NAMES: Record<PlanetId, string> = {
  Ascendant: 'Lagna',
  Sun: 'Surya',
  Moon: 'Chandra',
  Mars: 'Mangala',
  Mercury: 'Budha',
  Jupiter: 'Guru',
  Venus: 'Shukra',
  Saturn: 'Shani',
  Rahu: 'Rahu',
  Ketu: 'Ketu',
};

export function calculatePlanetaryMatrix(input: BirthInput): {
  coordinates: GeographicCoordinates;
  julianDay: number;
  lahiriAyanamshaDegrees: number;
  ascendant: PlanetaryPosition;
  planets: PlanetaryPosition[];
  anomalies: StructuralAnomaly[];
} {
  const coordinates = resolveCoordinates(input.placeOfBirth);
  const jd = computeJulianDay(input.dateOfBirth, input.birthTime, coordinates.utcOffsetHours);
  const ayanamsha = computeLahiriAyanamsha(jd);

  const tropAsc = computeTropicalAscendant(jd, coordinates.latitude, coordinates.longitude);
  const sidAsc = normalizeDegrees(tropAsc - ayanamsha);
  const ascRashiIndex = Math.floor(sidAsc / 30) % 12;

  const tropNow = computeTropicalLongitudesAtJd(jd);
  const tropNext = computeTropicalLongitudesAtJd(jd + 0.25);

  const buildPosition = (
    id: PlanetId,
    tropLon: number,
    dailyMotion: number,
    isRetrograde: boolean
  ): PlanetaryPosition => {
    const sidLon = normalizeDegrees(tropLon - ayanamsha);
    const rashiIndex = Math.floor(sidLon / 30) % 12;
    const rashi = RASHI_LIST[rashiIndex];
    const degInRashi = sidLon % 30;
    const house = ((rashiIndex - ascRashiIndex + 12) % 12) + 1;
    const navIndex = computeNavamshaIndex(sidLon);
    const navRashi = RASHI_LIST[navIndex];
    const d60 = computeShastiamshaDeity(sidLon);

    const isSandhi = degInRashi <= 2.4 || degInRashi >= 27.6;
    const isGandanta =
      ([3, 7, 11].includes(rashiIndex) && degInRashi >= 26.66) ||
      ([0, 4, 8].includes(rashiIndex) && degInRashi <= 3.33);

    return {
      id,
      sanskritName: SANSKRIT_PLANET_NAMES[id],
      tropicalLongitude: Number(tropLon.toFixed(4)),
      siderealLongitude: Number(sidLon.toFixed(4)),
      dailyMotion: Number(dailyMotion.toFixed(4)),
      rashiIndex,
      rashiName: rashi.name,
      rashiSanskrit: rashi.sanskrit,
      rashiElement: rashi.element,
      degreeInRashi: Number(degInRashi.toFixed(2)),
      house,
      navamshaIndex: navIndex,
      navamshaName: navRashi.name,
      navamshaSanskrit: navRashi.sanskrit,
      shastiamsha: d60,
      isRetrograde,
      isSandhi,
      isGandanta,
      dignity: evaluateDignity(id, rashiIndex),
    };
  };

  const ascendant = buildPosition('Ascendant', tropAsc, 360, false);

  const planetOrder: Array<Exclude<PlanetId, 'Ascendant'>> = [
    'Sun',
    'Moon',
    'Mars',
    'Mercury',
    'Jupiter',
    'Venus',
    'Saturn',
    'Rahu',
    'Ketu',
  ];

  const planets: PlanetaryPosition[] = planetOrder.map((pid) => {
    const lon1 = tropNow[pid];
    const lon2 = tropNext[pid];
    let diff = lon2 - lon1;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const dailyMotion = diff * 4;
    const isRetrograde =
      pid === 'Rahu' || pid === 'Ketu'
        ? true
        : pid !== 'Sun' && pid !== 'Moon' && dailyMotion < 0;

    return buildPosition(pid, lon1, dailyMotion, isRetrograde);
  });

  const anomalies: StructuralAnomaly[] = [];

  const retroPlanets = planets.filter(
    (p) => p.isRetrograde && p.id !== 'Rahu' && p.id !== 'Ketu'
  );
  for (const rp of retroPlanets) {
    const rpHouseInfo = HOUSE_PSYCHOLOGY[rp.house];
    let loop = `Introspective revision cycle in ${rpHouseInfo.arena}: turning inward to question decisions, contracts, and conversations long after they conclude, driven by ${rp.shastiamsha.name} (${rp.shastiamsha.subconsciousImprint}).`;
    let somatic = `Physical constriction in ${rp.rashiElement === 'Earth' ? 'skeletal frame and jaw' : rp.rashiElement === 'Water' ? 'gut, lymphatic system, and chest' : rp.rashiElement === 'Fire' ? 'solar plexus, blood pressure, and temples' : 'respiratory tract, throat, and shoulders'} when forced to commit without guaranteed control.`;
    let attach = `Triggers self-protective withdrawal during relational friction around ${rpHouseInfo.arena}—intellectualizing feelings rather than staying emotionally exposed.`;
    let voc = `Perfectionist paralysis in commercial execution within ${rpHouseInfo.arena}; endlessly rewriting plans to prevent any vulnerability or critique.`;
    let creat = `Guarding creative projects in private drafts, fearing that public exposure in ${rp.rashiName} will invite dilution or misunderstanding.`;

    if (rp.id === 'Mercury') {
      loop = `Recursive mental auditing in ${rpHouseInfo.arena}: your mind loops through conversations, agreements, and subtle cues, obsessively checking for hidden errors or rejection signals under the ${rp.shastiamsha.name} deity.`;
      somatic = `Throat constriction, vocal fatigue, and forehead tension when forced to make high-stakes commercial or interpersonal decisions on the spot.`;
      attach = `Analytical freezing during conflict—cross-examining partners or retreating into hyper-rational arguments when emotional vulnerability feels hazardous.`;
      voc = `Endless editing of emails, proposals, and contracts; hesitating to launch commercial initiatives until they are 100% immune to criticism.`;
      creat = `Over-intellectualizing the creative voice; editing out raw, instinctual passion in favor of structured academic or technical precision.`;
    } else if (rp.id === 'Venus') {
      loop = `Unconventional value and relational pacing in ${rpHouseInfo.arena}: craving transcendent, flawless aesthetic and soul resonance while deeply mistrusting whether ordinary reciprocity can last under ${rp.shastiamsha.name}.`;
      somatic = `Chest guarding, shallow heart-space respiration, and cold extremities when receiving romantic pursuit, unexpected generosity, or high praise.`;
      attach = `Ambivalent intimacy rhythm: yearning for profound closeness from afar, then experiencing claustrophobic panic the moment an intimate partner steps across your boundary.`;
      voc = `Complicated relationship with financial pricing and compensation—feeling your work is irreplaceable while simultaneously hesitating to claim fair market value in ${rpHouseInfo.arena}.`;
      creat = `Hoarding aesthetic masterworks in private archives, terrified that sharing them will expose your rawest soul to commercial degradation.`;
    } else if (rp.id === 'Mars') {
      loop = `Pressurized assertion vector in ${rpHouseInfo.arena}: holding back immediate boundary enforcement until resentment accumulates, leading to volcanic resets under ${rp.shastiamsha.name}.`;
      somatic = `Jaw clenching, intense solar-plexus heat, and restless muscle tension during workplace debates or encroached boundaries.`;
      attach = `Silent endurance followed by sudden, uncompromising ultimatums rather than calm, incremental boundary communication.`;
      voc = `Working in high-voltage, solitary sprints followed by physical exhaustion; bristling when forced to submit to corporate bureaucracy in ${rpHouseInfo.arena}.`;
      creat = `Fierce, unyielding creative independence; absolute refusal to dilute your artistic vision for commercial consensus.`;
    } else if (rp.id === 'Jupiter') {
      loop = `Internalized philosophical tribunal: deep skepticism toward conventional institutional dogmas and corporate platitudes, demanding all truth be tested in personal lived experience under ${rp.shastiamsha.name}.`;
      somatic = `Diaphragmatic heaviness and energetic fatigue when coerced into complying with hypocritical organizational mandates.`;
      attach = `Adopting the role of the philosophical mentor or moral anchor with partners rather than allowing yourself to be held in raw vulnerability.`;
      voc = `Rejecting standard corporate ladder climbing in ${rpHouseInfo.arena}; feeling compelled to build your own sovereign, ethical enterprise.`;
      creat = `Deep philosophical gravity; inability to produce superficial, trend-chasing creative content.`;
    } else if (rp.id === 'Saturn') {
      loop = `Hyper-developed internal auditor in ${rpHouseInfo.arena}: an unshakeable conviction that survival, solvency, and respect are only earned through grueling endurance, flawless duty, and self-denial under ${rp.shastiamsha.name}.`;
      somatic = `Chronic trapezius, spinal, and hip stiffness—carrying the structural weight of operations in ${rpHouseInfo.arena} without letting your posture drop.`;
      attach = `Dismissive-Avoidant self-reliance—viewing emotional reliance on others as a structural risk, preferring to handle all logistical and financial burdens alone.`;
      voc = `Compulsive workaholism in ${rpHouseInfo.arena}; agonizing difficulty delegating because of the dread that any dropped ball will lead to personal catastrophe.`;
      creat = `Immaculate, highly disciplined craftsmanship that struggles to allow spontaneous play or unvetted creative drafts.`;
    }

    anomalies.push({
      id: `retro-${rp.id.toLowerCase()}`,
      type: 'Retrograde (Vakri)',
      planetsInvolved: [rp.id],
      structuralCause: `Retrograde ${rp.id} (${rp.sanskritName}) in ${rp.rashiName} within the ${rpHouseInfo.name}, governed by the ${rp.shastiamsha.name} Shastiamsha`,
      psychologicalLoop: loop,
      somaticSignature: somatic,
      attachmentEcho: attach,
      vocationalEcho: voc,
      creativeEcho: creat,
    });
  }

  const gandantaPlanets = [ascendant, ...planets].filter((p) => p.isGandanta);
  for (const gp of gandantaPlanets) {
    const gpHouseInfo = HOUSE_PSYCHOLOGY[gp.house];
    anomalies.push({
      id: `gandanta-${gp.id.toLowerCase()}`,
      type: 'Gandanta Knot',
      planetsInvolved: [gp.id],
      structuralCause: `${gp.id} (${gp.sanskritName}) at the water-fire karmic threshold (${gp.rashiName} boundary in ${gpHouseInfo.name}) under ${gp.shastiamsha.name} D60`,
      psychologicalLoop: `Existential threshold knot in ${gpHouseInfo.arena}: sudden, visceral waves of "all-or-nothing" urgency where past emotional imprints demand immediate individuation.`,
      somaticSignature: `Autonomic temperature fluctuations, sudden adrenaline flushes, and acute nervous-system vigilance during life or career transitions in ${gpHouseInfo.arena}.`,
      attachmentEcho: `Triggers a Disorganized approach-avoidance panic during deepening intimacy—longing for absolute soul merger while keeping an emergency exit prepared.`,
      vocationalEcho: `Dramatic professional pivots; an impulse to burn down established bridges in ${gpHouseInfo.arena} and rebuild from absolute zero rather than iterate quietly.`,
      creativeEcho: `Transformative creative cycles; producing raw, cathartic masterpieces during crises followed by periods of complete public disappearance.`,
    });
  }

  const sandhiPlanets = planets.filter((p) => p.isSandhi && !p.isGandanta);
  for (const sp of sandhiPlanets) {
    const spHouseInfo = HOUSE_PSYCHOLOGY[sp.house];
    anomalies.push({
      id: `sandhi-${sp.id.toLowerCase()}`,
      type: 'Rashi Sandhi Junction',
      planetsInvolved: [sp.id],
      structuralCause: `${sp.id} (${sp.sanskritName}) standing on the unstable border of ${sp.rashiName} in the ${spHouseInfo.name} under ${sp.shastiamsha.name} D60`,
      psychologicalLoop: `Liminal identity suspension in ${spHouseInfo.arena}: feeling suspended between two divergent psychological scripts, producing acute second-guessing at the threshold of irrevocable decisions.`,
      somaticSignature: `Shallow respiration and peripheral restlessness whenever required to sign long-term, binding contracts in ${spHouseInfo.arena}.`,
      attachmentEcho: `Threshold-hovering in relationships—leaving unspoken escape routes open to avoid feeling permanently trapped or engulfed.`,
      vocationalEcho: `Reluctance to anchor into a single narrow professional title in ${spHouseInfo.arena}, maintaining secondary ventures or hedge strategies.`,
      creativeEcho: `Cross-disciplinary, genre-defying work that bridges traditional rigor and radical experimentation.`,
    });
  }

  const moon = planets.find((p) => p.id === 'Moon')!;
  const saturn = planets.find((p) => p.id === 'Saturn')!;
  const venus = planets.find((p) => p.id === 'Venus')!;
  const ketu = planets.find((p) => p.id === 'Ketu')!;
  const rahu = planets.find((p) => p.id === 'Rahu')!;

  const ketuHouseInfo = HOUSE_PSYCHOLOGY[ketu.house];
  const rahuHouseInfo = HOUSE_PSYCHOLOGY[rahu.house];
  const moonHouseInfo = HOUSE_PSYCHOLOGY[moon.house];
  const saturnHouseInfo = HOUSE_PSYCHOLOGY[saturn.house];
  const venusHouseInfo = HOUSE_PSYCHOLOGY[venus.house];

  const saturnMoonDist = ((moon.rashiIndex - saturn.rashiIndex + 12) % 12) + 1;
  const aspectRelation =
    saturnMoonDist === 1
      ? 'Conjunction (Yuti)'
      : saturnMoonDist === 7
        ? 'Direct Opposition (Saptama Drishti)'
        : saturnMoonDist === 4 || saturnMoonDist === 10
          ? 'Square Tension (Kendra Drishti)'
          : saturnMoonDist === 6 || saturnMoonDist === 8
            ? 'Quincunx Friction (Shadashtaka)'
            : 'Angular Dialogue';

  anomalies.push({
    id: 'saturn-moon-attachment-vector',
    type: 'Angular Friction (Drishti)',
    planetsInvolved: ['Saturn', 'Moon', 'Venus'],
    structuralCause: `${aspectRelation} linking Saturn in ${saturn.rashiName} (${saturnHouseInfo.name}) with Moon in ${moon.rashiName} (${moonHouseInfo.name}) and Venus in ${venus.rashiName} (${venusHouseInfo.name})`,
    psychologicalLoop: `Direct clash between the Moon's visceral longing for emotional attunement in ${moonHouseInfo.arena} and Saturn's unyielding demand for composure, emotional containment, and flawless performance in ${saturnHouseInfo.arena}.`,
    somaticSignature: `Automatic freezing of facial micro-expressions and tightening of cervical fascia under stress, projecting unshakeable composure while the nervous system runs at redline.`,
    attachmentEcho: `Testing whether partners can intuitively decipher your unspoken needs while your Manager actively prevents you from asking for comfort directly.`,
    vocationalEcho: `Bearing the emotional and operational weight of entire projects in ${saturnHouseInfo.arena} without asking for help, while secretly feeling unseen and unappreciated.`,
    creativeEcho: `Demanding flawless structural perfection from your creative expressions, struggling to share unpolished or emotionally messy work.`,
  });

  return {
    coordinates,
    julianDay: Number(jd.toFixed(4)),
    lahiriAyanamshaDegrees: ayanamsha,
    ascendant,
    planets,
    anomalies,
  };
}
