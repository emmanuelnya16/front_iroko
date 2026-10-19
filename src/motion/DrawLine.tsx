import React, { useRef } from 'react';
import { gsap, useGSAP } from './gsap';

interface DrawLineProps {
  direction?: 'horizontal' | 'vertical';
  origin?: 'left' | 'center' | 'right' | 'top' | 'bottom';
  className?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  triggerStart?: string;
}

export default function DrawLine({
  direction = 'horizontal',
  origin,
  className = '',
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  triggerStart = 'top 80%',
}: DrawLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  const defaultOrigin = direction === 'horizontal' ? (origin || 'left') + ' center' : 'center ' + (origin || 'top');

  useGSAP(
    () => {
      const mm = gsap.matchMedia(lineRef);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(lineRef.current, { scaleX: 1, scaleY: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const isH = direction === 'horizontal';
        gsap.fromTo(
          lineRef.current,
          {
            scaleX: isH ? 0 : 1,
            scaleY: isH ? 1 : 0,
            transformOrigin: defaultOrigin,
          },
          {
            scaleX: 1,
            scaleY: 1,
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger: lineRef.current,
              start: triggerStart,
              once: true,
            },
          }
        );
      });
    },
    { scope: lineRef }
  );

  return (
    <div
      ref={lineRef}
      className={`will-change-transform ${className}`}
      aria-hidden="true"
    />
  );
}
