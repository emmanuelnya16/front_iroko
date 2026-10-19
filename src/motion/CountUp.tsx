import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap, useGSAP } from './gsap';

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  ariaLabel?: string;
}

export default function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 1.6,
  decimals = 0,
  className = '',
  ariaLabel,
}: CountUpProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat(currentLang, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  };

  const finalValueString = `${prefix}${formatNumber(target)}${suffix}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia(elRef);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (elRef.current) {
          elRef.current.textContent = finalValueString;
        }
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elRef.current,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            if (elRef.current) {
              elRef.current.textContent = `${prefix}${formatNumber(counter.val)}${suffix}`;
            }
          },
        });
      });
    },
    { scope: elRef, dependencies: [target, currentLang, prefix, suffix] }
  );

  return (
    <span
      ref={elRef}
      className={`tabular-nums ${className}`}
      aria-label={ariaLabel || finalValueString}
    >
      {/* Initial display with final target in DOM for SEO/accessibility */}
      {finalValueString}
    </span>
  );
}
