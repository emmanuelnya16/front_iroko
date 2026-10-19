/**
 * MethodSection.tsx
 * Section 3 — « Notre Méthode »
 * 
 * Strict Design System:
 * - Solid, opaque card fills (no halos, no blur, no glassmorphism, no neon shadows).
 * - System of shapes: 6px rounded rectangle with ONE 44px diagonal chamfer on a specific corner
 *   + 12px radius semicircular notch on the left edge where the path enters.
 * - Exact high-contrast palette (Brand + Neutral solids, identical in light & dark modes).
 * - Fixed HUD counter « ÉTAPE 02 / 05 » in primary font with tabular numbers.
 * - Sinuous path passes strictly BEHIND the opaque cards.
 * - Orange travelling dot docks into each card's notch with a crisp mechanical scale pulse.
 * - Pinned desktop scene (end: "+=400%", scrub: 1) with 5 labels and travelling at ~40% screen width.
 * - Mobile (<1024px): Natural scroll with vertical traced line and batch entrances.
 * - Reduced motion: Clean, static vertical layout.
 */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText, useGSAP } from '../motion/gsap';

interface StepCardConfig {
  num: string;
  rubriqueKey: string;
  defaultRubrique: string;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
  tag: string;
  // Visual Styles
  bgColor: string;
  textColor: string;
  accentColor: string;
  boxShadow?: string;
  chamferClass: string;
  paddingClass: string;
  // Positions on desktop stage (3600 x 640)
  cardLeft: number;
  cardTop: number;
  notchY: number; // 70px from card top
}

const METHOD_STEPS: StepCardConfig[] = [
  {
    num: '01',
    rubriqueKey: 'home.methodStep1Rubrique',
    defaultRubrique: 'CADRAGE INITIAL',
    titleKey: 'method.step1Title',
    defaultTitle: '1. Écouter & Cadrer',
    descKey: 'method.step1Desc',
    defaultDesc: 'Comprendre précisément les objectifs, le contexte et le périmètre du projet.',
    tag: 'Objectifs & Périmètre',
    // Carte 1 : fond violet #531FF5, texte #FFFFFF (7,3:1), accent #D9CCFF (4,9:1)
    bgColor: '#531FF5',
    textColor: '#FFFFFF',
    accentColor: '#D9CCFF',
    chamferClass: 'method-chamfer-tr', // Haut-droite
    paddingClass: 'pt-8 pb-8 pl-8 pr-12', // 48px right padding for 44px chamfer
    cardLeft: 200,
    cardTop: 20,
    notchY: 70,
  },
  {
    num: '02',
    rubriqueKey: 'home.methodStep2Rubrique',
    defaultRubrique: 'DEVIS SOUS 48H',
    titleKey: 'method.step2Title',
    defaultTitle: '2. Structurer & Chiffrer',
    descKey: 'method.step2Desc',
    defaultDesc: 'Élaborer la feuille de route technique et remettre un devis clair sous 48h ouvrées.',
    tag: 'Feuille de route & Budget',
    // Carte 2 : fond crème #F7F5F2, texte #0A0B14 (18:1), accent #531FF5 (6,7:1), contour inset 1px
    bgColor: '#F7F5F2',
    textColor: '#0A0B14',
    accentColor: '#531FF5',
    boxShadow: 'inset 0 0 0 1px rgba(10, 11, 20, 0.12)',
    chamferClass: 'method-chamfer-bl', // Bas-gauche
    paddingClass: 'pt-8 pb-12 pl-12 pr-8', // 48px left/bottom padding
    cardLeft: 780,
    cardTop: 135,
    notchY: 70,
  },
  {
    num: '03',
    rubriqueKey: 'home.methodStep3Rubrique',
    defaultRubrique: 'CONCEPTION & VALIDATION',
    titleKey: 'method.step3Title',
    defaultTitle: '3. Concevoir & Valider',
    descKey: 'method.step3Desc',
    defaultDesc: 'Créer les maquettes, scénographies et rétroplannings validés conjointement.',
    tag: 'Maquettes & Scénographie',
    // Carte 3 : fond orange #FF8500, texte #0A0B14 (8:1 - JAMAIS BLANC!), accent #0A0B14
    bgColor: '#FF8500',
    textColor: '#0A0B14',
    accentColor: '#0A0B14',
    chamferClass: 'method-chamfer-tl', // Haut-gauche
    paddingClass: 'pt-12 pb-8 pl-12 pr-8', // 48px left/top padding
    cardLeft: 1360,
    cardTop: 20,
    notchY: 70,
  },
  {
    num: '04',
    rubriqueKey: 'home.methodStep4Rubrique',
    defaultRubrique: 'RÉGIE TERRAIN',
    titleKey: 'method.step4Title',
    defaultTitle: '4. Réaliser & Déployer',
    descKey: 'method.step4Desc',
    defaultDesc: 'Mise en œuvre rigoureuse sur le terrain avec régie technique et coordination continue.',
    tag: 'Coordination & Régie',
    // Carte 4 : fond violet clair #8B66FF, texte #0A0B14 (5,1:1 - JAMAIS BLANC!), accent #0A0B14
    bgColor: '#8B66FF',
    textColor: '#0A0B14',
    accentColor: '#0A0B14',
    chamferClass: 'method-chamfer-br', // Bas-droite
    paddingClass: 'pt-8 pb-12 pl-8 pr-12', // 48px right/bottom padding
    cardLeft: 1940,
    cardTop: 135,
    notchY: 70,
  },
  {
    num: '05',
    rubriqueKey: 'home.methodStep5Rubrique',
    defaultRubrique: 'IMPACT & PÉRENNITÉ',
    titleKey: 'method.step5Title',
    defaultTitle: '5. Accompagner & Mesurer',
    descKey: 'method.step5Desc',
    defaultDesc: 'Bilan d’impact post-livraison et accompagnement durable dans le temps.',
    tag: 'Bilan & Partenariat',
    // Carte 5 : fond encre #0A0B14, texte #FFFFFF (19,6:1), accent orange #FF8500 (8:1), contour inset 1px
    bgColor: '#0A0B14',
    textColor: '#FFFFFF',
    accentColor: '#FF8500',
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.25)',
    chamferClass: 'method-chamfer-tr', // Haut-droite
    paddingClass: 'pt-8 pb-8 pl-8 pr-12', // 48px right padding
    cardLeft: 2520,
    cardTop: 20,
    notchY: 70,
  },
];

/* ─── Desktop Sinuous Path (Connects strictly behind cards into their notches) ─── */
const CIRCUIT_PATH_DESKTOP =
  'M 40,90 L 200,90 C 490,90 490,205 780,205 C 1070,205 1070,90 1360,90 C 1650,90 1650,205 1940,205 C 2230,205 2230,90 2520,90 C 2800,90 2800,150 3100,150';

/* ─── Mobile Vertical Path ─── */
const CIRCUIT_PATH_MOBILE =
  'M 20,20 C 35,150 5,350 20,500 C 35,650 5,850 20,1000 C 35,1150 5,1350 20,1500 L 20,1850';

/**
 * Remove numeric prefixes (e.g. "1. " or "2. ") from titles cleanly
 * so the giant 64px number replaces it without touching i18n dictionaries.
 */
function cleanTitle(raw: string): string {
  if (!raw) return '';
  return raw.replace(/^\d+[\.\)]\s*/, '').trim();
}

export default function MethodSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const circuitPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const hudCounterColRef = useRef<HTMLDivElement>(null);
  const ctaCardWrapperRef = useRef<HTMLDivElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);

  // Outer card wrappers to animate with GSAP (never animating the element with clip-path/mask)
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(sectionRef);

      /* ─── 1. REDUCED MOTION: Static list of cards ─── */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.method-card-wrapper',
            '.method-card-mobile',
            '.method-cta-wrapper',
            hudCounterColRef.current,
          ],
          { opacity: 1, scale: 1, x: 0, y: 0, clearProps: 'transform' }
        );

        if (circuitPathRef.current) gsap.set(circuitPathRef.current, { drawSVG: '100%' });
        if (mobilePathRef.current) gsap.set(mobilePathRef.current, { drawSVG: '100%' });
      });

      /* ─── 2. ACTIVE ANIMATIONS (Desktop Pinned + Mobile Scroll) ─── */
      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, isMobile, reduceMotion } = context.conditions!;
          if (reduceMotion) return;

          /* ── DESKTOP SCENE (PINNED + SCRUBBED TRAVELLING) ── */
          if (isDesktop && sectionRef.current && trackRef.current && circuitPathRef.current && dotRef.current) {
            // SplitText on section title
            SplitText.create('.method-header-title', {
              type: 'lines',
              mask: 'lines',
              linesClass: 'method-split-line',
              autoSplit: true,
              onSplit(self) {
                self.masks?.forEach((mask: HTMLElement) => {
                  mask.style.paddingBlock = '0.1em';
                });
                return gsap.fromTo(
                  self.lines,
                  { yPercent: 110, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power4.out',
                    scrollTrigger: {
                      trigger: sectionRef.current,
                      start: 'top 80%',
                      once: true,
                    },
                  }
                );
              },
            });

            // Initialize desktop card wrappers (external container): opacity 0 -> 1, y: 24 -> 0, scale 0.94 -> 1
            cardWrapperRefs.current.forEach((wrapper, idx) => {
              if (wrapper) {
                gsap.set(wrapper, {
                  opacity: idx === 0 ? 0.4 : 0,
                  y: 24,
                  scale: 0.94,
                  transformOrigin: 'left center',
                });
              }
            });

            // Initialize CTA card wrapper
            if (ctaCardWrapperRef.current) {
              gsap.set(ctaCardWrapperRef.current, { opacity: 0, y: 24, scale: 0.94 });
            }

            // SplitText instances for card titles & descriptions
            const titleSplits: SplitText[] = [];
            const descSplits: SplitText[] = [];

            METHOD_STEPS.forEach((_, idx) => {
              const tEl = document.querySelector(`.method-card-title-${idx}`);
              const dEl = document.querySelector(`.method-card-desc-${idx}`);
              if (tEl) {
                const s = SplitText.create(tEl, {
                  type: 'lines',
                  mask: 'lines',
                  linesClass: 'method-split-line',
                });
                titleSplits.push(s);
              }
              if (dEl) {
                const s = SplitText.create(dEl, {
                  type: 'lines',
                  mask: 'lines',
                  linesClass: 'method-split-line',
                });
                descSplits.push(s);
              }
            });

            // Initial state for circuit path
            gsap.set(circuitPathRef.current, { drawSVG: '0%' });

            // Master Pinned Timeline (Duration: 5.2s, 5 labels, scrub 1)
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=400%',
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            tl.addLabel('step1', 0.45);
            tl.addLabel('step2', 1.45);
            tl.addLabel('step3', 2.45);
            tl.addLabel('step4', 3.45);
            tl.addLabel('step5', 4.40);
            tl.addLabel('cta', 4.90);

            // 1. DrawSVG circuit path: 0% → 100% across total duration
            tl.to(
              circuitPathRef.current,
              {
                drawSVG: '100%',
                ease: 'none',
                duration: 5.2,
              },
              0
            );

            // 2. MotionPath orange dot: travels seamlessly along path
            tl.to(
              dotRef.current,
              {
                motionPath: {
                  path: circuitPathRef.current,
                  align: circuitPathRef.current,
                  alignOrigin: [0.5, 0.5],
                },
                ease: 'none',
                duration: 5.2,
              },
              0
            );

            // 3. Camera horizontal travelling: keeps active dot around ~40% screen width
            // Track translates from (0.4 * W - 200) to (0.4 * W - 3100)
            tl.fromTo(
              trackRef.current,
              {
                x: () => 0.4 * window.innerWidth - 200,
              },
              {
                x: () => 0.4 * window.innerWidth - 3100,
                ease: 'none',
                duration: 5.2,
              },
              0
            );

            // 4. Card arrival: external wrapper animates (opacity 0 → 1, y: 24 → 0, scale: 0.94 → 1)
            // Dot has mechanical scale pulse when entering notch
            const labelNames = ['step1', 'step2', 'step3', 'step4', 'step5'];
            const hudPercentages = [0, -20, -40, -60, -80];

            METHOD_STEPS.forEach((_, idx) => {
              const label = labelNames[idx];
              const wrapper = cardWrapperRefs.current[idx];
              const titleSplit = titleSplits[idx];
              const descSplit = descSplits[idx];

              // Wrapper entrance
              if (wrapper) {
                tl.to(
                  wrapper,
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.55,
                    ease: 'power3.out',
                  },
                  label
                );
              }

              // Mechanical scale impulse as the dot seats in the notch (no glow)
              tl.fromTo(
                dotRef.current,
                { scale: 1 },
                { scale: 1.4, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' },
                label
              );

              // SplitText line-by-line reveal
              if (titleSplit?.lines) {
                tl.fromTo(
                  titleSplit.lines,
                  { yPercent: 110, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power3.out' },
                  `${label}+=0.1`
                );
              }

              if (descSplit?.lines) {
                tl.fromTo(
                  descSplit.lines,
                  { yPercent: 110, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.03, ease: 'power3.out' },
                  `${label}+=0.15`
                );
              }

              // HUD Counter transition
              if (hudCounterColRef.current) {
                tl.to(
                  hudCounterColRef.current,
                  {
                    yPercent: hudPercentages[idx],
                    duration: 0.35,
                    ease: 'power2.out',
                  },
                  label
                );
              }
            });

            // 5. Final CTA card wrapper entrance
            if (ctaCardWrapperRef.current) {
              tl.to(
                ctaCardWrapperRef.current,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.45,
                  ease: 'power3.out',
                },
                'cta'
              );

              // Dot docks into CTA notch
              tl.fromTo(
                dotRef.current,
                { scale: 1 },
                { scale: 1.4, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' },
                'cta'
              );
            }

            // Settle time before releasing pin
            tl.to({}, { duration: 0.3 });
          }

          /* ── MOBILE SCENE (<1024px, Natural Scroll) ── */
          if (isMobile) {
            if (mobilePathRef.current) {
              gsap.fromTo(
                mobilePathRef.current,
                { drawSVG: '0%' },
                {
                  drawSVG: '100%',
                  ease: 'none',
                  scrollTrigger: {
                    trigger: '.method-mobile-cards-wrap',
                    start: 'top 80%',
                    end: 'bottom 70%',
                    scrub: 1,
                  },
                }
              );
            }

            ScrollTrigger.batch('.method-card-mobile', {
              start: 'top 85%',
              once: true,
              onEnter: (batch) => {
                gsap.fromTo(
                  batch,
                  { opacity: 0, y: 24, scale: 0.96 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.12,
                    overwrite: true,
                  }
                );
              },
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="method-section relative w-full overflow-hidden bg-bg text-fg border-t border-line/12 select-none"
      aria-label={t('method.title')}
    >
      {/* ═════════════════════════════════════════════════════════════
          DESKTOP PINNED VIEWPORT (>= 1024px)
      ═════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col justify-between relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden px-8 xl:px-14 py-6 z-10">
        
        {/* TOP HUD BAR: Header (left) & Clean Pill Counter (right) */}
        <div className="relative z-20 flex items-start justify-between w-full max-w-7xl mx-auto pointer-events-auto">
          {/* Section Header */}
          <div className="method-section-header max-w-xl">
            <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-1.5 block">
              {t('method.badge')}
            </span>
            <h2 className="method-header-title text-3xl xl:text-4xl font-semibold mb-2 text-fg">
              {t('method.title')}
            </h2>
            <p className="text-fg-muted text-xs xl:text-sm max-w-md leading-relaxed">
              {t('method.subtitle')}
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mt-2.5 rounded-full" />
          </div>

          {/* Clean Pill Counter (ÉTAPE 01 / 05 → 05 / 05) — Primary font, tabular numbers, no halo */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line/20 bg-surface text-fg shadow-none pointer-events-none select-none">
            <span className="text-[11px] font-semibold tracking-wider text-fg-muted uppercase">
              ÉTAPE
            </span>
            <div className="h-5 overflow-hidden font-sans font-bold text-[13px] tabular-nums">
              <div ref={hudCounterColRef} className="flex flex-col">
                {['01 / 05', '02 / 05', '03 / 05', '04 / 05', '05 / 05'].map((label, idx) => (
                  <span key={idx} className="h-5 leading-5 block text-fg tabular-nums tracking-wide">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── TRAVELLING STAGE (SVG Circuit Behind & Opaque Cards In Front) ─── */}
        <div className="relative w-full h-[540px] my-auto overflow-visible">
          {/* Inner translating track controlled by GSAP 'x' */}
          <div 
            ref={trackRef} 
            className="absolute top-0 left-0 w-[3600px] h-[540px] pointer-events-auto will-change-transform"
          >
            {/* SVG Circuit Path & Nodes (strictly z-0, passes BEHIND cards) */}
            <svg
              className="absolute inset-0 w-[3600px] h-[540px] pointer-events-none z-0"
              viewBox="0 0 3600 540"
              fill="none"
              aria-hidden="true"
            >
              {/* Solid brand stroke, zero halo, zero glow, zero drop-shadow */}
              <path
                ref={circuitPathRef}
                d={CIRCUIT_PATH_DESKTOP}
                stroke="#531FF5"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Path Node Anchors: strictly at card entrance notches */}
              {METHOD_STEPS.map((step, idx) => (
                <circle
                  key={idx}
                  cx={step.cardLeft}
                  cy={step.cardTop + step.notchY}
                  r="5"
                  fill="#0A0B14"
                  stroke="#531FF5"
                  strokeWidth="2"
                />
              ))}

              {/* CTA Entrance Node */}
              <circle
                cx={3100}
                cy={150}
                r="5"
                fill="#0A0B14"
                stroke="#531FF5"
                strokeWidth="2"
              />

              {/* Orange travelling dot: solid #FF8500, zero drop-shadow */}
              <circle
                ref={dotRef}
                r="6"
                fill="#FF8500"
              />
            </svg>

            {/* 5 Opaque Solid Cards with Signature Chamfer & Notch */}
            {METHOD_STEPS.map((step, idx) => (
              <div
                key={idx}
                ref={(el) => (cardWrapperRefs.current[idx] = el)}
                className="method-card-wrapper absolute z-10 will-change-transform select-none"
                style={{
                  left: `${step.cardLeft}px`,
                  top: `${step.cardTop}px`,
                  width: 'clamp(340px, 26vw, 420px)',
                }}
              >
                {/* Opaque Card Body with Chamfer and Left Edge Semicircular Notch */}
                <div
                  className={`method-card-body relative w-full h-auto rounded-[6px] method-card-notch ${step.chamferClass} ${step.paddingClass}`}
                  style={{
                    backgroundColor: step.bgColor,
                    color: step.textColor,
                    boxShadow: step.boxShadow || undefined,
                  }}
                >
                  {/* 1. Grand numéro 01 → 05 (police principale, graisse 700, 64 à 72 px, chiffres tabulaires) */}
                  <span
                    className="font-sans font-bold text-6xl xl:text-7xl tabular-nums leading-none block mb-3.5 select-none"
                    style={{ color: step.accentColor }}
                  >
                    {step.num}
                  </span>

                  {/* 2. Rubrique en majuscules (13-14 px, graisse 600, espacement 0,08 em) */}
                  <p
                    className="text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.08em] mb-2 leading-tight"
                    style={{ color: step.accentColor }}
                  >
                    {t(step.rubriqueKey, step.defaultRubrique)}
                  </p>

                  {/* 3. Titre (28 à 32 px, graisse 600, interligne 1,15 — sans préfixe "1.") */}
                  <h3
                    className={`method-card-title-${idx} text-[26px] xl:text-[30px] font-semibold leading-[1.15] mb-3.5`}
                    style={{ color: step.textColor }}
                  >
                    {cleanTitle(t(step.titleKey, step.defaultTitle))}
                  </h3>

                  {/* 4. Description (18 px, interligne 1,5, graisse 400, max-w 36ch, pleine opacité) */}
                  <p
                    className={`method-card-desc-${idx} text-[17px] xl:text-[18px] leading-[1.5] font-normal mb-6 max-w-[36ch]`}
                    style={{ color: step.textColor }}
                  >
                    {t(step.descKey, step.defaultDesc)}
                  </p>

                  {/* 5. Trait fin (currentColor à 30%) puis la ligne finale (15 px, graisse 600) */}
                  <div
                    className="w-full h-px mb-3.5"
                    style={{ backgroundColor: 'currentColor', opacity: 0.3 }}
                  />
                  <p
                    className="text-[15px] font-semibold leading-normal"
                    style={{ color: step.accentColor }}
                  >
                    {step.tag}
                  </p>
                </div>
              </div>
            ))}

            {/* Carte Finale (« Excellence & Méthode Détaillée ») */}
            <div
              ref={ctaCardWrapperRef}
              className="method-cta-wrapper absolute z-10 will-change-transform select-none"
              style={{
                left: '3100px',
                top: '80px',
                width: 'clamp(340px, 26vw, 420px)',
              }}
            >
              <div
                className="method-card-body relative w-full h-auto rounded-[6px] method-card-notch method-chamfer-tr pt-8 pb-8 pl-8 pr-12 bg-[#F7F5F2] text-[#0A0B14]"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(10, 11, 20, 0.12)',
                }}
              >
                {/* Étiquette sobre « GARANTIES OPÉRATIONNELLES » */}
                <p className="text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.08em] mb-2 text-[#531FF5]">
                  GARANTIES OPÉRATIONNELLES
                </p>

                {/* Titre */}
                <h3 className="text-[26px] xl:text-[30px] font-semibold leading-[1.15] mb-3.5 text-[#0A0B14]">
                  Excellence & Méthode Détaillée
                </h3>

                {/* Description */}
                <p className="text-[17px] xl:text-[18px] leading-[1.5] font-normal mb-6 max-w-[36ch] text-[#0A0B14]">
                  Consultez notre charte d'engagements, notre régie dédiée et nos garanties de devis sous 48h.
                </p>

                {/* Bouton plein violet #531FF5, texte blanc, sans dégradé ni halo */}
                <Link
                  to="/methode"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#531FF5] hover:bg-[#4314d6] text-white font-semibold text-[15px] transition-colors shadow-none mt-2"
                >
                  <span>Consulter la méthode détaillée et nos garanties</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HUD FOOTER: Clean discrete helper text */}
        <div className="relative z-20 flex items-center justify-between text-xs text-fg-muted pt-2.5 border-t border-line/12 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#FF8500]" />
            <span>Défilez pour parcourir les 5 étapes</span>
          </div>
          <span className="font-mono text-[11px] text-fg-muted">
            IROKO GROUP
          </span>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          MOBILE & TABLET VIEW (< 1024px)
          No Pin, Vertical Traced Line, Full-Width Solid Cards
      ═════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden px-4 sm:px-6 py-14 md:py-20 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
              {t('method.badge')}
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-fg">
              {t('method.title')}
            </h2>
            <p className="text-fg-muted max-w-md mx-auto text-xs md:text-sm leading-relaxed mb-4">
              {t('method.subtitle')}
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mx-auto rounded-full" />
          </div>

          {/* Vertical Timeline Wrapper */}
          <div className="method-mobile-cards-wrap relative pl-6 md:pl-10 space-y-8">
            {/* Sinuous / Vertical Path SVG traced on scroll */}
            <svg
              className="absolute left-1 md:left-2 top-2 bottom-6 w-8 h-full pointer-events-none z-0"
              viewBox="0 0 40 1850"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                ref={mobilePathRef}
                d={CIRCUIT_PATH_MOBILE}
                stroke="#531FF5"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Mobile Cards: Same solid colors & chamfers */}
            {METHOD_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`method-card-mobile relative w-full max-w-[560px] mx-auto rounded-[6px] method-card-notch ${step.chamferClass} p-7 md:p-8 shadow-none`}
                style={{
                  backgroundColor: step.bgColor,
                  color: step.textColor,
                  boxShadow: step.boxShadow || undefined,
                }}
              >
                {/* 1. Grand numéro */}
                <span
                  className="font-sans font-bold text-5xl md:text-6xl tabular-nums leading-none block mb-3 select-none"
                  style={{ color: step.accentColor }}
                >
                  {step.num}
                </span>

                {/* 2. Rubrique */}
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.08em] mb-1.5 leading-tight"
                  style={{ color: step.accentColor }}
                >
                  {t(step.rubriqueKey, step.defaultRubrique)}
                </p>

                {/* 3. Titre (sans préfixe) */}
                <h3
                  className="text-xl md:text-2xl font-semibold leading-[1.15] mb-3"
                  style={{ color: step.textColor }}
                >
                  {cleanTitle(t(step.titleKey, step.defaultTitle))}
                </h3>

                {/* 4. Description */}
                <p
                  className="text-[16px] md:text-[17px] leading-[1.5] font-normal mb-5 max-w-[36ch]"
                  style={{ color: step.textColor }}
                >
                  {t(step.descKey, step.defaultDesc)}
                </p>

                {/* 5. Trait fin puis ligne finale */}
                <div
                  className="w-full h-px mb-3"
                  style={{ backgroundColor: 'currentColor', opacity: 0.3 }}
                />
                <p
                  className="text-[14px] md:text-[15px] font-semibold leading-normal"
                  style={{ color: step.accentColor }}
                >
                  {step.tag}
                </p>
              </div>
            ))}

            {/* Mobile CTA Card */}
            <div className="pt-4">
              <div
                className="w-full max-w-[560px] mx-auto rounded-[6px] method-card-notch method-chamfer-tr p-7 md:p-8 bg-[#F7F5F2] text-[#0A0B14]"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(10, 11, 20, 0.12)',
                }}
              >
                <p className="text-[13px] font-semibold uppercase tracking-[0.08em] mb-2 text-[#531FF5]">
                  GARANTIES OPÉRATIONNELLES
                </p>
                <h3 className="text-xl md:text-2xl font-semibold leading-[1.15] mb-2 text-[#0A0B14]">
                  Excellence & Méthode Détaillée
                </h3>
                <p className="text-[16px] leading-[1.5] font-normal mb-5 text-[#0A0B14]">
                  Consultez notre charte d'engagements, notre régie dédiée et nos garanties de devis sous 48h.
                </p>
                <Link
                  to="/methode"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#531FF5] hover:bg-[#4314d6] text-white font-semibold text-sm transition-colors shadow-none"
                >
                  <span>Consulter la méthode détaillée et nos garanties</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
