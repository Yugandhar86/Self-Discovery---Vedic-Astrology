import React, { useState } from 'react';
import { KarmicSynthesisResult } from '../types/jyotish';

interface IFSAttachmentStudioProps {
  result: KarmicSynthesisResult;
  mirrorImagePath: string;
}

type InnerArchetype = 'vulnerableCore' | 'proactiveProtector' | 'reactiveEmergency';
type LifePillar = 'relationships' | 'career' | 'vitality';

export const IFSAttachmentStudio: React.FC<IFSAttachmentStudioProps> = ({
  result,
  mirrorImagePath,
}) => {
  const [activeArchetype, setActiveArchetype] = useState<InnerArchetype>('vulnerableCore');
  const [activePillar, setActivePillar] = useState<LifePillar>('relationships');
  const [imgError, setImgError] = useState(false);

  const archetypeData = {
    vulnerableCore: {
      title: 'Your Deeply Hidden Vulnerable Core',
      roleSubtitle: 'The tender space holding ancient memories & fear of exposure',
      coreBelief: result.ifs.exile.coreBelief.replace(/"/g, ''),
      somaticArea: result.ifs.exile.somaticLocation,
      pastGenesis: `Born from ancient soul chapters where trusting others without a defensive perimeter resulted in profound betrayal, sudden displacement, or emotional exile. It learned that needing support was dangerous.`,
      currentBehavior: `In modern life, this part quietly hides behind your adult competence. It braces your nervous system whenever someone invites you to relax your guard, delegate a high-stakes decision, or speak an unpolished truth.`,
      unburdeningKey: `Reassuring this tender space from your grounded adult presence that the ancient danger is over, and that you are now fully equipped to protect its safety without emotional isolation.`,
    },
    proactiveProtector: {
      title: 'Your Proactive Day-to-Day Protector Parts',
      roleSubtitle: 'The strategic inner guardian enforcing order, competence & composure',
      coreBelief: `I must anticipate every variable and maintain absolute self-reliance so my vulnerable core is never blindsided again.`,
      somaticArea: result.ifs.manager.somaticLocation,
      pastGenesis: `Forged as an operational shield to guarantee survival through relentless discipline, emotional self-containment, and hyper-preparedness. It believes safety is an engineering problem to be solved.`,
      currentBehavior: `Operates as the chief operating officer of your daily life. It convinces you that you must carry 100% of the burden at work, scrutinize communications for perfection, and maintain private financial reserves.`,
      unburdeningKey: `Inviting this guardian to step down from 24/7 emergency vigilance, learning that collaborative delegation and genuine rest do not invite catastrophe.`,
    },
    reactiveEmergency: {
      title: 'Your Reactive Emergency Coping Mechanisms',
      roleSubtitle: 'The sudden override reflexes that sever tension when overwhelmed',
      coreBelief: `When pressure threatens to flood the body, I must immediately sever the tension and restore sovereign control at any cost.`,
      somaticArea: result.ifs.firefighter.somaticLocation,
      pastGenesis: `Developed as an emergency circuit breaker. When prolonged emotional chaos or bad faith breached the perimeter, this part learned to blow up the field or retreat into icy silence rather than endure helplessness.`,
      currentBehavior: `Deploys when your perimeter is breached by unexpected disrespect or emotional entrapment. It triggers abrupt communication cutoffs, sudden boundary resets, or fierce verbal counter-attacks to force immediate space.`,
      unburdeningKey: `Recognizing the physiological wave of adrenaline before acting on the impulse to burn bridges or retreat; grounding the nervous system in physical safety first.`,
    },
  };

  const pillarData = {
    relationships: {
      title: 'Relationships, Intimacy & Sacred Vulnerability',
      subtitle: 'How ancient conditioning and your growth stretch play out in partnership',
      defaultHabit: `When romantic intimacy deepens toward unvetted vulnerability, a silent alarm sounds within your chest. You find yourself hyper-focusing on small flaws in your partner, withdrawing behind polite busyness, or provoking subtle conflict to regain breathing room. Your system instinctively tests whether love will cost you your freedom.`,
      growthStretch: `Your evolutionary stretch invites you into sacred interdependence. You realize that true power is not surviving in a solitary fortress, but having the courage to lean unguardedly upon another. When tender or overwhelmed, you voice your honest need directly: "My nervous system is in sensory overload; I just need you to hold space for me while I reset."`,
      experiment: `Share one tender, unarmored feeling with your partner or a close ally before you have had time to intellectualize or defend it.`,
    },
    career: {
      title: 'Career, Purpose & Wealth Sovereignty',
      subtitle: 'How ancient conditioning and your growth stretch play out in professional life',
      defaultHabit: `In the workplace, ancient conditioning manifests as the lone-wolf operator syndrome. When project deadlines tighten or teammates falter, your default reflex is not to convene an alignment meeting; you quietly take the entire workload upon your shoulders, executing with meticulous perfectionism late into the night. With capital, you operate under an unshakeable scarcity soundtrack, keeping private reserves and avoiding equity partnerships out of fear of losing control.`,
      growthStretch: `Leaning into your growth vector means stepping center-stage into visionary collaborative leadership. You pitch your high-conviction ideas, delegate operational milestones with transparent accountability, and command premium compensation for your intellectual property without apology. You treat wealth not as a defensive moat, but as an energetic resource for collective impact.`,
      experiment: `Select one recurring operational task that you stubbornly manage alone and delegate it entirely to a trusted colleague, consciously letting go of micromanagement.`,
    },
    vitality: {
      title: 'Vitality, Somatic Health & Inner Peace',
      subtitle: 'How stress holding patterns and restorative calm manifest in the physical body',
      defaultHabit: `Under chronic stress, your body registers tension as physical bracing across your shoulders, jaw, and solar plexus. You tend to live from the neck up, ignoring early physical signals of fatigue until your body forces a total shutdown. When exhausted, solitude can feel like an anxious bunker where your mind simulates catastrophic scenarios.`,
      growthStretch: `Stepping into vitality means reclaiming your body as an unhurried temple. You deliberately interrupt the habit of physical holding through conscious breathwork, firm work curfews, and meals without digital screens. Solitude transforms from an anxious fortress into a nourishing sanctuary of deep spiritual trust and cellular renewal.`,
      experiment: `Practice the 3-Minute Somatic Anchor: place one hand over your heart or stomach, take three slow diaphragmatic breaths, and speak out loud: "In this moment, I am safe, supported, and grounded."`,
    },
  };

  const activeA = archetypeData[activeArchetype];
  const activeP = pillarData[activePillar];

  return (
    <div className="space-y-14">
      {/* SECTION 2: THE INNER ARCHETYPES */}
      <section className="space-y-6">
        <div className="border-b border-stone-300 pb-6">
          <p className="text-xs uppercase tracking-widest text-[#9A3412]">
            Section 02 · The Inner Archetypes
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
            2. THE INNER ARCHETYPES: Your Subconscious Cast of Characters
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
            Your psyche is populated by an exquisitely organized cast of internal characters born from ancient soul conditioning. Explore your deeply hidden vulnerable core, your proactive day-to-day protector parts, and your reactive emergency coping mechanisms.
          </p>
        </div>

        {/* 3 Archetype Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['vulnerableCore', 'proactiveProtector', 'reactiveEmergency'] as InnerArchetype[]).map(
            (archKey) => {
              const item = archetypeData[archKey];
              const isSelected = activeArchetype === archKey;
              return (
                <button
                  key={archKey}
                  type="button"
                  onClick={() => setActiveArchetype(archKey)}
                  className={`p-4 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#9A3412] bg-[#FBF9F5] shadow-xs'
                      : 'border-stone-300 bg-[#F3EFE6]/60 hover:bg-[#FBF9F5]'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#9A3412]">
                    {isSelected ? '● Active Archetype' : '○ Select Archetype'}
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 mt-1">{item.title}</h3>
                  <p className="text-xs text-stone-600 mt-0.5 line-clamp-2">{item.roleSubtitle}</p>
                </button>
              );
            }
          )}
        </div>

        {/* Detailed Archetype Dossier */}
        <div className="border border-stone-300 bg-[#FBF9F5] p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              Subconscious Character Profile
            </span>
            <h3 className="text-2xl font-semibold text-stone-900 mt-1">{activeA.title}</h3>
            <p className="text-sm text-stone-600 mt-0.5">{activeA.roleSubtitle}</p>
          </div>

          <blockquote className="p-4 bg-[#F3EFE6] border-l-2 border-[#9A3412] font-display text-lg italic text-stone-900 leading-relaxed">
            "{activeA.coreBelief}"
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-4 bg-[#F3EFE6]/50 border border-stone-200 space-y-1.5">
              <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
                Ancient Conditioning & Genesis
              </h4>
              <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                {activeA.pastGenesis}
              </p>
            </div>
            <div className="p-4 bg-[#F3EFE6]/50 border border-stone-200 space-y-1.5">
              <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider">
                Current-Life Behavioral Expression
              </h4>
              <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                {activeA.currentBehavior}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm border-t border-stone-200 pt-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                Somatic Holding Center in the Body:
              </span>
              <span className="font-medium text-stone-900">{activeA.somaticArea}</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold block mb-1">
                The Unburdening Key:
              </span>
              <span className="text-stone-800 leading-relaxed text-xs sm:text-sm">
                {activeA.unburdeningKey}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SPHERES OF EXISTENCE */}
      <section className="space-y-6 pt-6 border-t border-stone-300">
        <div className="border-b border-stone-300 pb-6">
          <p className="text-xs uppercase tracking-widest text-[#9A3412]">
            Section 03 · Real-World Behavioral Footprints
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
            3. THE SPHERES OF EXISTENCE: Real-World Behavioral Footprints
          </h2>
          <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
            How your ancient default baggage and your emerging evolutionary stretch zones materialize as automatic habits across three practical, everyday life pillars: Relationships, Career/Purpose, and Vitality.
          </p>
        </div>

        {/* 3 Pillar Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['relationships', 'career', 'vitality'] as LifePillar[]).map((pillKey) => {
            const p = pillarData[pillKey];
            const isSelected = activePillar === pillKey;
            return (
              <button
                key={pillKey}
                type="button"
                onClick={() => setActivePillar(pillKey)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#9A3412] bg-[#FBF9F5] shadow-xs'
                    : 'border-stone-300 bg-[#F3EFE6]/60 hover:bg-[#FBF9F5]'
                }`}
              >
                <div className="text-xs font-semibold text-[#9A3412]">
                  {isSelected ? '● Active Pillar' : '○ Select Pillar'}
                </div>
                <h3 className="text-sm font-semibold text-stone-900 mt-1">{p.title}</h3>
                <p className="text-xs text-stone-600 mt-0.5 line-clamp-2">{p.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Pillar Behavioral Transformation Card */}
        <div className="border border-stone-300 bg-[#FBF9F5] p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              Practical Pillar Analysis
            </span>
            <h3 className="text-2xl font-semibold text-stone-900 mt-1">{activeP.title}</h3>
            <p className="text-sm text-stone-600 mt-0.5">{activeP.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* The Conditioned Default */}
            <div className="p-5 bg-[#F3EFE6] border-l-4 border-stone-400 space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-stone-600 block">
                Conditioned Past Default (The Armor)
              </span>
              <p className="text-stone-800 text-sm leading-relaxed">{activeP.defaultHabit}</p>
            </div>

            {/* The Evolutionary Growth Stretch */}
            <div className="p-5 bg-[#F3EFE6] border-l-4 border-[#9A3412] space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#9A3412] block">
                Evolutionary Growth Stretch (Mature Sovereignty)
              </span>
              <p className="text-stone-800 text-sm leading-relaxed">{activeP.growthStretch}</p>
            </div>
          </div>

          {/* Practical Grounded Experiment */}
          <div className="p-5 bg-stone-900 text-[#FBF9F5] space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#FDBA74] block">
              Grounded Everyday Micro-Experiment
            </span>
            <p className="text-sm leading-relaxed text-stone-200">{activeP.experiment}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
