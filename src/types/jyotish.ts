export type GenderOption = 'Male' | 'Female' | 'Other';

export interface BirthInput {
  birthTime: string;     // HH:MM in 24-Hour format
  dateOfBirth: string;   // DD/MM/YYYY
  gender: GenderOption;
  placeOfBirth: string;  // City, Country
}

export interface GeographicCoordinates {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  utcOffsetHours: number;
  isResolvedFromGazetteer: boolean;
}

export type PlanetId =
  | 'Ascendant'
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu';

export interface ShastiamshaDeityInfo {
  index: number; // 1 to 60
  name: string;
  sanskrit: string;
  nature: 'Saumya (Benefic / Harmonious)' | 'Krura (Fierce / Catalytic)';
  archetype: string;
  subconsciousImprint: string;
  exileWound: string;
  protectorStrategy: string;
}

export interface PlanetaryPosition {
  id: PlanetId;
  sanskritName: string;
  tropicalLongitude: number;
  siderealLongitude: number;
  dailyMotion: number;
  rashiIndex: number; // 0 to 11
  rashiName: string;
  rashiSanskrit: string;
  rashiElement: 'Fire' | 'Earth' | 'Air' | 'Water';
  degreeInRashi: number;
  house: number; // 1 to 12 from Lagna
  navamshaIndex: number; // 0 to 11 (D9)
  navamshaName: string;
  navamshaSanskrit: string;
  shastiamsha: ShastiamshaDeityInfo; // D60
  isRetrograde: boolean;
  isSandhi: boolean;      // Within 2.2 degrees of sign border
  isGandanta: boolean;    // Water-Fire junction knot
  dignity: 'Exalted' | 'Own Sign' | 'Debilitated' | 'Friend' | 'Neutral' | 'Enemy';
}

export interface StructuralAnomaly {
  id: string;
  type: 'Retrograde (Vakri)' | 'Gandanta Knot' | 'Rashi Sandhi Junction' | 'Nodal Eclipse Vector' | 'Angular Friction (Drishti)';
  planetsInvolved: PlanetId[];
  structuralCause: string;
  psychologicalLoop: string;
  somaticSignature: string;
  attachmentEcho: string;
  vocationalEcho: string;
  creativeEcho: string;
}

export interface LifeFacetsImpact {
  vocationAndMoney: string;
  creativeVoiceAndVisibility: string;
  somaticHealthAndNervousSystem: string;
  familyLineageAndAncestralRoles: string;
  existentialTrustAndSolitude: string;
  interpersonalAndRomanticBonds: string;
}

export interface IFSPartDetail {
  role:
    | 'Exile (Carried Vulnerability)'
    | 'Manager (Proactive Protector)'
    | 'Firefighter (Reactive Protector)'
    | 'Vulnerable Core (Hidden Vulnerability)'
    | 'Primary Protector (Strategic Guardian)'
    | 'Emergency Reflex (Reactive Override)'
    | string;
  archetypeTitle: string;
  astrologicalOrigin: string;
  coreBelief: string;
  pastLifeImprint: string;
  currentLifeFootprint: string;
  somaticLocation: string;
  unburdeningKey: string;
  lifeFacets: LifeFacetsImpact;
}

export interface IFSMapping {
  exile: IFSPartDetail;
  manager: IFSPartDetail;
  firefighter: IFSPartDetail;
  selfLeadershipAnchor: string;
  mandatoryEchoSummary: string;
}

export type AttachmentStyleName =
  | 'Dismissive-Avoidant'
  | 'Anxious-Preoccupied'
  | 'Fearful-Avoidant (Disorganized)'
  | 'Earned Secure with Avoidant Undertones'
  | 'Earned Secure with Anxious Undertones';

export interface AttachmentDynamics {
  primaryStyle: AttachmentStyleName;
  secondaryPull: string;
  astrologicalCatalyst: string;
  coreIntimacyFear: string;
  protestOrWithdrawalBehavior: string;
  conflictTriggerLoop: string;
  earnedSecurityPathway: string;
  mandatoryEchoSummary: string;
  lifeFacetsExpression: LifeFacetsImpact;
}

export interface BigFiveDimension {
  trait:
    | 'Neuroticism (Emotional Sensitivity)'
    | 'Openness to Experience'
    | 'Conscientiousness'
    | 'Agreeableness'
    | 'Extraversion'
    | 'Emotional Sensitivity & Somatic Equanimity'
    | 'Receptivity to Experience & Creative Fluidity'
    | 'Sustained Craftsmanship & Devotional Rhythm'
    | 'Relational Generosity & Sovereign Boundaries'
    | 'Sovereign Visibility & Authentic Presence'
    | string;
  baselineScore: number;       // 0 to 100
  reconditionedTarget: number; // 0 to 100
  karmicDefaultLabel: string;
  evolutionaryTargetLabel: string;
  shadowExpression: string;
  selfLedExpression: string;
  stretchMechanism: string;
  lifeArenaImpact: string;
}

export interface NarrativeReportSections {
  section1ImplicitCode: string;
  section2StructuralKnots: string;
  section3EvolutionaryFrontier: string;
}

export interface KarmicSynthesisResult {
  input: BirthInput;
  rawInputFormatted: string;
  coordinates: GeographicCoordinates;
  julianDay: number;
  lahiriAyanamshaDegrees: number;
  ascendant: PlanetaryPosition;
  planets: PlanetaryPosition[];
  anomalies: StructuralAnomaly[];
  ifs: IFSMapping;
  attachment: AttachmentDynamics;
  bigFive: BigFiveDimension[];
  narrative: NarrativeReportSections;
  fullMarkdown: string;
  generationSource: 'deterministic-jyotish-engine' | 'gemini-enhanced-synthesis';
}

export interface ArchivalPreset {
  id: string;
  label: string;
  kicker: string;
  summary: string;
  input: BirthInput;
}
