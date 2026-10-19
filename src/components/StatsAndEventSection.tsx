import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap, SplitText, useGSAP } from '../motion/gsap';
import { useMagnetic } from '../motion/magnetic';
import CountUp from '../motion/CountUp';
import ImageReveal from '../motion/ImageReveal';

export default function StatsAndEventSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsWrapRef = useRef<HTMLDivElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const badgeWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const opBadgeRef = useRef<HTMLDivElement>(null);

  // Magnetic buttons
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(btn1Ref, 0.25);
  useMagnetic(btn2Ref, 0.25);

  const statsData = [
    { target: 3, suffix: '', label: t('home.stats.label1') },
    { target: 10, suffix: '', label: t('home.stats.label2') },
    { target: 5, suffix: '', label: t('home.stats.label3') },
    { target: 48, suffix: 'h', label: t('home.stats.label4') },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia(sectionRef);

      /* ── Reduced motion: everything visible immediately ── */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            cardFrameRef.current,
            badgeWrapRef.current,
            titleRef.current,
            descRef.current,
            captionRef.current,
            opBadgeRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, clearProps: 'clipPath' }
        );
        gsap.set('.stat-divider', { scaleY: 1 });
        gsap.set('.stat-label-inner', { yPercent: 0, opacity: 1 });
        gsap.set('.event-btn', { opacity: 1, y: 0 });
      });

      /* ── Standard full motion ── */
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. STATS BANNER ANIMATION
        if (statsWrapRef.current) {
          const statsTl = gsap.timeline({
            scrollTrigger: {
              trigger: statsWrapRef.current,
              start: 'top 85%',
              once: true,
            },
          });

          // Vertical dividers draw top to bottom (stagger 0.12)
          statsTl.fromTo(
            '.stat-divider',
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.12,
            },
            0
          );

          // Labels slide up from behind mask
          statsTl.fromTo(
            '.stat-label-inner',
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
            },
            0.2
          );
        }

        // 2. EVENT CARD ANIMATION
        if (cardFrameRef.current) {
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: cardFrameRef.current,
              start: 'top 75%',
              once: true,
            },
          });

          // A. Frame opens: clip-path inset from bottom to top
          cardTl.fromTo(
            cardFrameRef.current,
            { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.7 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.0,
              ease: 'power4.out',
            },
            0
          );

          // B. Badge "Pôle opérationnel"
          if (badgeWrapRef.current) {
            cardTl.fromTo(
              badgeWrapRef.current,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
              0.3
            );
          }

          // C. Title in lines via SplitText
          if (titleRef.current) {
            const splitTitle = SplitText.create(titleRef.current, {
              type: 'lines',
              mask: 'lines',
              linesClass: 'event-split-line',
            });
            if (splitTitle.lines) {
              cardTl.fromTo(
                splitTitle.lines,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: 'power4.out',
                  stagger: 0.08,
                },
                0.4
              );
            }
          }

          // D. Paragraph in lines via SplitText
          if (descRef.current) {
            const splitDesc = SplitText.create(descRef.current, {
              type: 'lines',
              mask: 'lines',
              linesClass: 'event-split-line',
            });
            if (splitDesc.lines) {
              cardTl.fromTo(
                splitDesc.lines,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power3.out',
                  stagger: 0.04,
                },
                0.55
              );
            }
          }

          // E. Magnetic buttons cascade up
          cardTl.fromTo(
            '.event-btn',
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.12,
            },
            0.7
          );

          // F. Image caption slides in
          if (captionRef.current) {
            cardTl.fromTo(
              captionRef.current,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
              0.85
            );
          }

          // G. Operational badge pops in last with elastic bounce
          if (opBadgeRef.current) {
            cardTl.fromTo(
              opBadgeRef.current,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'elastic.out(1, 0.4)',
              },
              1.0
            );
          }
        }
      });
    },
    { scope: sectionRef, dependencies: [i18n.language] }
  );

  return (
    <div ref={sectionRef} className="w-full">
      {/* ─── BANDEAU DES 4 STATISTIQUES ─── */}
      <section
        ref={statsWrapRef}
        className="w-full bg-bg-alt py-12 md:py-14 px-6 md:px-[52px] border-b border-line/12 relative z-20"
        aria-label="Statistiques clés du Groupe IROKO"
      >
        <div className="max-w-[1840px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, i) => (
            <div key={i} className="relative flex flex-col pl-6 py-2">
              {/* Vertical divider drawing top to bottom */}
              <div
                className="stat-divider absolute left-0 top-0 bottom-0 w-px bg-line/20 will-change-transform"
                style={{ transformOrigin: 'top center' }}
                aria-hidden="true"
              />

              {/* Number CountUp */}
              <CountUp
                target={stat.target}
                suffix={stat.suffix}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-fg tracking-tight font-sans block"
              />

              {/* Label sliding up behind overflow mask */}
              <div className="overflow-hidden mt-2">
                <span className="stat-label-inner block text-xs sm:text-sm font-normal text-fg-muted">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOCUS IROKO EVENT — PÔLE OPÉRATIONNEL PHARE ─── */}
      <section className="py-20 md:py-24 px-6 bg-bg relative">
        <div className="max-w-7xl mx-auto">
          {/* Card frame opening via clip-path inset from bottom to top */}
          <div
            ref={cardFrameRef}
            className="bg-surface border border-line/12 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 md:p-14 relative overflow-hidden backdrop-blur-md rounded-2xl will-change-[clip-path]"
          >
            {/* Operational badge (appearing last with elastic bounce) */}
            <div
              ref={opBadgeRef}
              className="absolute top-0 right-0 bg-[#10B981] text-white font-semibold text-[11px] uppercase tracking-wider px-4 py-1.5 flex items-center gap-1.5 shadow-lg rounded-bl-xl z-20 origin-top-right will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t('common.operational')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Text & Magnetic CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Badge */}
                <div
                  ref={badgeWrapRef}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF8500]"
                >
                  <Sparkles size={16} />
                  {t('home.eventHighlight.badge')}
                </div>

                {/* Title */}
                <h2
                  ref={titleRef}
                  className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight text-fg tracking-tight"
                >
                  {t('home.eventHighlight.title')}
                </h2>

                {/* Description */}
                <p
                  ref={descRef}
                  className="text-fg-muted text-base md:text-lg leading-relaxed font-light"
                >
                  {t('home.eventHighlight.desc')}
                </p>

                {/* Magnetic Action Buttons */}
                <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-2">
                  <Link
                    ref={btn1Ref}
                    to="/tarifs"
                    className="event-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#531FF5] hover:bg-[#4314d6] text-white font-medium text-sm transition-colors shadow-lg shadow-[#531FF5]/25 will-change-transform"
                  >
                    <span>{t('home.eventHighlight.action')}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    ref={btn2Ref}
                    to="/contact"
                    className="event-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-line/20 hover:border-[#FF8500] hover:text-[#FF8500] text-fg font-medium text-sm transition-colors will-change-transform"
                  >
                    <span>{t('home.eventHighlight.actionQuote')}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: ImageReveal with Parallax & Sliding Caption */}
              <div className="lg:col-span-5 relative">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
                  alt="IROKO Event Production"
                  className="aspect-[4/3] rounded-xl border border-line/12 group"
                  imgClassName="group-hover:scale-105 transition-transform duration-700"
                  parallax={true}
                >
                  {/* Sliding Caption */}
                  <div
                    ref={captionRef}
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-6 pointer-events-none will-change-transform"
                  >
                    <span className="text-xs uppercase tracking-wider font-medium text-white/95">
                      Régie technique & Scénographie d'exception
                    </span>
                  </div>
                </ImageReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
