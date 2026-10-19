/**
 * FamiliesSection.tsx
 * Section 1 — "Aperçu des trois familles de pôles"
 * 
 * Design: Chamfered cards with circuit SVG, DrawSVG trace,
 * MotionPath orange dot, SplitText title reveal.
 * 
 * All i18n keys, links, and data preserved from original.
 */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Building, Layers, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText, useGSAP } from '../motion/gsap';

/* ─── Family data (same i18n keys as before) ─── */
const familiesData = [
  {
    icon: Compass,
    badgeKey: 'home.famBusinessBadge',
    titleKey: 'home.famBusinessTitle',
    descKey: 'home.famBusinessDesc',
    poles: ['IROKO Event (Opérationnel)', 'IROKO Academia', 'IROKO Engineering'],
    // Chamfer: small-top-left, big-bottom-right
    chamfer: 20,
    clipPath: (c: number) =>
      `polygon(${c}px 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%, 0 ${c}px)`,
    num: '01',
    accentFrom: '#531FF5',
  },
  {
    icon: Building,
    badgeKey: 'home.famDigitalBadge',
    titleKey: 'home.famDigitalTitle',
    descKey: 'home.famDigitalDesc',
    poles: ['IROKO App', 'IROKO Gestion & Compta', 'IROKO Cloud'],
    chamfer: 28,
    clipPath: (c: number) =>
      `polygon(0 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% 100%, ${c}px 100%, 0 calc(100% - ${c}px))`,
    num: '02',
    accentFrom: '#8B66FF',
  },
  {
    icon: Layers,
    badgeKey: 'home.famServicesBadge',
    titleKey: 'home.famServicesTitle',
    descKey: 'home.famServicesDesc',
    poles: ['IROKO Studio', 'IROKO Security', 'IROKO Ventures'],
    chamfer: 24,
    clipPath: (c: number) =>
      `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`,
    num: '03',
    accentFrom: '#FF8500',
  },
];

/* ─── Circuit SVG path for desktop (connects 3 cards) ─── */
const CIRCUIT_PATH_DESKTOP =
  'M 0,300 L 80,300 L 100,280 L 100,120 L 120,100 L 330,100 L 350,120 L 350,280 L 370,300 L 480,300 L 500,280 L 500,120 L 520,100 L 730,100 L 750,120 L 750,280 L 770,300 L 880,300 L 900,280 L 900,120 L 920,100 L 1100,100';

const CIRCUIT_PATH_MOBILE =
  'M 50,0 L 50,120 L 70,140 L 70,300 L 50,320 L 50,440 L 70,460 L 70,620 L 50,640 L 50,760';

/* Circuit node positions for desktop (where each card "activates") */
const CIRCUIT_NODES_DESKTOP = [
  { cx: 240, cy: 100 },
  { cx: 630, cy: 100 },
  { cx: 1010, cy: 100 },
];

const CIRCUIT_NODES_MOBILE = [
  { cx: 50, cy: 120 },
  { cx: 50, cy: 440 },
  { cx: 50, cy: 760 },
];

export default function FamiliesSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const circuitPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(sectionRef);

      /* ── Reduced motion: everything visible, no animation ── */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            '.families-title-wrap',
            '.families-subtitle',
            '.families-line',
            '.family-card',
            '.family-pole-item',
          ],
          { opacity: 1, y: 0, x: 0, rotation: 0, clearProps: 'clipPath' }
        );
        // Show the circuit path fully
        if (circuitPathRef.current) {
          gsap.set(circuitPathRef.current, { drawSVG: '100%' });
        }
      });

      /* ── Desktop: full animation ── */
      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions!;
          if (reduceMotion) return;

          // SplitText on the section title
          SplitText.create('.families-section-title', {
            type: 'lines',
            mask: 'lines',
            linesClass: 'families-split-line',
            autoSplit: true,
            onSplit(self) {
              // Add padding to mask elements to prevent descender clipping
              self.masks?.forEach((mask: HTMLElement) => {
                mask.style.paddingBlock = '0.1em';
              });

              return gsap.fromTo(
                self.lines,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 1.0,
                  ease: 'power4.out',
                  stagger: 0.08,
                  scrollTrigger: {
                    trigger: '.families-section-header',
                    start: 'top 80%',
                    once: true,
                  },
                }
              );
            },
          });

          // Subtitle fade in
          gsap.fromTo(
            '.families-subtitle',
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.families-section-header',
                start: 'top 75%',
                once: true,
              },
            }
          );

          // Gradient line scale
          gsap.fromTo(
            '.families-line',
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.families-section-header',
                start: 'top 72%',
                once: true,
              },
            }
          );

          if (isDesktop) {
            /* ── Desktop: DrawSVG circuit trace + MotionPath dot ── */
            const circuitPath = circuitPathRef.current;
            const dot = dotRef.current;

            if (circuitPath && dot) {
              // Draw the circuit on scroll
              gsap.fromTo(
                circuitPath,
                { drawSVG: '0%' },
                {
                  drawSVG: '100%',
                  ease: 'none',
                  scrollTrigger: {
                    trigger: '.families-circuit-wrap',
                    start: 'top 75%',
                    end: 'bottom 30%',
                    scrub: 0.8,
                  },
                }
              );

              // Orange dot follows the circuit path
              gsap.to(dot, {
                motionPath: {
                  path: circuitPath,
                  align: circuitPath,
                  alignOrigin: [0.5, 0.5],
                },
                ease: 'none',
                scrollTrigger: {
                  trigger: '.families-circuit-wrap',
                  start: 'top 75%',
                  end: 'bottom 30%',
                  scrub: 0.8,
                },
              });
            }

            // Cards: sequential "light up" — rise 40px, slight rotation, border glow
            const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.family-card');
            if (cards) {
              cards.forEach((card, i) => {
                const tl = gsap.timeline({
                  scrollTrigger: {
                    trigger: '.families-circuit-wrap',
                    start: `top ${75 - i * 12}%`,
                    once: true,
                  },
                });

                // Card entrance
                tl.fromTo(
                  card,
                  { opacity: 0, y: 40, rotation: -1.5 },
                  {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.9,
                    ease: 'power4.out',
                  }
                );

                // Border glow (animate CSS variable)
                tl.to(
                  card,
                  {
                    '--border-opacity': 1,
                    duration: 0.5,
                    ease: 'power2.out',
                  },
                  '<0.3'
                );

                // Pole items stagger check-in
                const poleItems = card.querySelectorAll('.family-pole-item');
                tl.fromTo(
                  poleItems,
                  { opacity: 0, x: -12 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.08,
                  },
                  '<0.2'
                );
              });
            }
          } else {
            /* ── Mobile: ScrollTrigger.batch for cards ── */
            ScrollTrigger.batch('.family-card', {
              start: 'top 85%',
              once: true,
              onEnter: (batch) => {
                gsap.fromTo(
                  batch,
                  { opacity: 0, y: 40 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power4.out',
                    stagger: 0.12,
                  }
                );
              },
            });

            // Mobile pole items batch
            ScrollTrigger.batch('.family-pole-item', {
              start: 'top 90%',
              once: true,
              onEnter: (batch) => {
                gsap.fromTo(
                  batch,
                  { opacity: 0, x: -10 },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.06,
                  }
                );
              },
            });

            // Mobile: simple vertical line draw
            if (circuitPathRef.current) {
              gsap.fromTo(
                circuitPathRef.current,
                { drawSVG: '0%' },
                {
                  drawSVG: '100%',
                  ease: 'none',
                  scrollTrigger: {
                    trigger: '.families-circuit-wrap',
                    start: 'top 80%',
                    end: 'bottom 30%',
                    scrub: 0.8,
                  },
                }
              );
            }
          }
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [i18n.language] }
  );

  return (
    <section
      ref={sectionRef}
      className="families-section py-20 md:py-24 px-6 bg-bg relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="families-section-header text-center mb-16 md:mb-20">
          <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
            {t('structure.badge')}
          </span>
          <h2 className="families-section-title text-3xl md:text-5xl font-medium mb-4 text-fg">
            {t('home.familiesTitle')}
          </h2>
          <p className="families-subtitle text-fg-muted max-w-xl mx-auto mb-6 text-sm md:text-base opacity-0">
            {t('home.familiesSubtitle')}
          </p>
          <div className="families-line w-20 h-0.5 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mx-auto origin-center" />
        </div>

        {/* ── Circuit SVG + Cards grid ── */}
        <div className="families-circuit-wrap relative">
          {/* Circuit SVG — desktop */}
          <svg
            className="families-circuit-svg hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1100 400"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            {/* Circuit path */}
            <path
              ref={circuitPathRef}
              d={CIRCUIT_PATH_DESKTOP}
              stroke="url(#circuitGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ drawSVG: '0%' } as React.CSSProperties}
            />
            {/* Circuit nodes */}
            {CIRCUIT_NODES_DESKTOP.map((node, i) => (
              <circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r="5"
                fill="#080C14"
                stroke="#531FF5"
                strokeWidth="2"
                opacity="0.6"
              />
            ))}
            {/* Orange travelling dot */}
            <circle
              ref={dotRef}
              r="6"
              fill="#FF8500"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255,133,0,0.7))' }}
            />
            {/* Gradient def */}
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#531FF5" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8B66FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF8500" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Circuit SVG — mobile (vertical line) */}
          <svg
            className="families-circuit-svg-mobile lg:hidden absolute left-6 top-0 h-full pointer-events-none z-0"
            width="100"
            preserveAspectRatio="xMidYMin meet"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={(el) => {
                // On mobile, reuse circuitPathRef if desktop path not present
                if (!circuitPathRef.current && el) {
                  (circuitPathRef as React.MutableRefObject<SVGPathElement | null>).current = el;
                }
              }}
              d={CIRCUIT_PATH_MOBILE}
              stroke="url(#circuitGradMobile)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {CIRCUIT_NODES_MOBILE.map((node, i) => (
              <circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill="#080C14"
                stroke="#531FF5"
                strokeWidth="1.5"
                opacity="0.5"
              />
            ))}
            <defs>
              <linearGradient id="circuitGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#531FF5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF8500" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch relative z-10">
            {familiesData.map((fam, i) => {
              const Icon = fam.icon;
              return (
                <div
                  key={i}
                  className="family-card relative flex flex-col items-start p-8 md:p-10 opacity-0 group"
                  style={{
                    '--chamfer': `${fam.chamfer}px`,
                    '--border-opacity': 0,
                    clipPath: fam.clipPath(fam.chamfer),
                  } as React.CSSProperties}
                >
                  {/* Background fill layer */}
                  <div
                    className="absolute inset-0 bg-surface border border-line/12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] -z-10"
                    style={{ clipPath: fam.clipPath(fam.chamfer) }}
                  />
                  {/* Border layer (slightly offset for visible edge) */}
                  <div
                    className="absolute -inset-px -z-10 transition-opacity duration-500"
                    style={{
                      clipPath: fam.clipPath(fam.chamfer + 1),
                      background: `linear-gradient(135deg, ${fam.accentFrom}33, rgba(var(--line), 0.08))`,
                      opacity: 'var(--border-opacity, 0.3)',
                    }}
                  />

                  {/* Ghost number behind title */}
                  <span
                    className="absolute top-4 right-6 text-7xl md:text-8xl font-extrabold pointer-events-none select-none"
                    style={{
                      WebkitTextStroke: `1.5px ${fam.accentFrom}22`,
                      WebkitTextFillColor: 'transparent',
                      opacity: 0.15,
                    }}
                    aria-hidden="true"
                  >
                    {fam.num}
                  </span>

                  {/* Icon in "notch" area */}
                  <div
                    className="w-12 h-12 flex items-center justify-center text-white mb-6 rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${fam.accentFrom}20`,
                      border: `1px solid ${fam.accentFrom}40`,
                    }}
                  >
                    <Icon size={24} style={{ color: fam.accentFrom }} />
                  </div>

                  {/* Badge */}
                  <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: fam.accentFrom }}>
                    {t(fam.badgeKey)}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-3 text-fg relative z-10">
                    {t(fam.titleKey)}
                  </h3>

                  {/* Description */}
                  <p className="text-fg-muted text-sm mb-6 leading-relaxed">
                    {t(fam.descKey)}
                  </p>

                  {/* Poles list */}
                  <ul className="space-y-2 mb-8 text-xs font-medium text-fg">
                    {fam.poles.map((pole, idx) => (
                      <li
                        key={idx}
                        className="family-pole-item flex items-center gap-2 opacity-0 text-fg-muted"
                      >
                        <CheckCircle2 size={15} style={{ color: fam.accentFrom }} className="shrink-0" />
                        <span>{pole}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    to="/poles"
                    className="mt-auto text-xs font-semibold uppercase tracking-wider text-primary-text hover:text-accent transition-colors flex items-center gap-1.5 group/link"
                  >
                    {t('common.discoverFamily')}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>

                  {/* Hover: chamfer grows, card lifts */}
                  <style>{`
                    .family-card:hover {
                      transform: translateY(-6px);
                      clip-path: ${fam.clipPath(36)};
                      transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1),
                                  clip-path 0.35s cubic-bezier(0.33, 1, 0.68, 1);
                    }
                  `}</style>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
