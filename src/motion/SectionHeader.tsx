import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap, SplitText, useGSAP } from './gsap';

interface SectionHeaderProps {
  badge?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  divider?: boolean;
  action?: React.ReactNode;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  divider = true,
  action,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  useGSAP(
    () => {
      const mm = gsap.matchMedia(headerRef);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [badgeWrapRef.current, titleRef.current, subtitleRef.current, lineRef.current],
          { opacity: 1, y: 0, scaleX: 1, clearProps: 'transform' }
        );
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        // 1. Badge slide up behind overflow mask
        if (badgeWrapRef.current) {
          const badgeInner = badgeWrapRef.current.firstElementChild;
          if (badgeInner) {
            tl.fromTo(
              badgeInner,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
              0
            );
          }
        }

        // 2. Title with SplitText lines
        if (titleRef.current) {
          const split = SplitText.create(titleRef.current, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'section-split-line',
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
                  stagger: 0.08,
                }
              );
            },
          });

          // Add to timeline if split returned lines
          if (split.lines && split.lines.length > 0) {
            tl.fromTo(
              split.lines,
              { yPercent: 110, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.08 },
              0.1
            );
          }
        }

        // 3. Subtitle fade + rise
        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
            0.25
          );
        }

        // 4. Gradient divider line scaleX
        if (lineRef.current) {
          const origin = align === 'center' ? 'center center' : align === 'right' ? 'right center' : 'left center';
          tl.fromTo(
            lineRef.current,
            { scaleX: 0, transformOrigin: origin },
            { scaleX: 1, duration: 0.8, ease: 'power3.out' },
            0.35
          );
        }
      });
    },
    { scope: headerRef, dependencies: [i18n.language, title, subtitle] }
  );

  const alignClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start';

  const lineAlign = align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : 'mr-auto';

  return (
    <div
      ref={headerRef}
      className={`section-header-block flex flex-col relative mb-12 lg:mb-16 ${alignClass} ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-4">
        <div className={`flex flex-col ${alignClass} w-full`}>
          {badge && (
            <div ref={badgeWrapRef} className="overflow-hidden mb-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF8500]">
                {badge}
              </div>
            </div>
          )}

          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] text-white tracking-tight"
          >
            {title}
          </h2>

          {subtitle && (
            <p
              ref={subtitleRef}
              className={`text-white/70 text-sm md:text-base leading-relaxed mt-3 max-w-xl ${align === 'center' ? 'mx-auto' : ''}`}
            >
              {subtitle}
            </p>
          )}

          {divider && (
            <div
              ref={lineRef}
              className={`w-16 h-0.5 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mt-4 rounded-full ${lineAlign}`}
            />
          )}
        </div>

        {action && (
          <div className="shrink-0 mb-2 md:mb-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
