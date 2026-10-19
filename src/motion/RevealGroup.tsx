import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';

interface RevealGroupProps {
  children: React.ReactNode;
  childSelector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  ease?: string;
  className?: string;
  triggerStart?: string;
}

export default function RevealGroup({
  children,
  childSelector = '.reveal-item',
  stagger = 0.1,
  y = 40,
  duration = 0.85,
  ease = 'power4.out',
  className = '',
  triggerStart = 'top 85%',
}: RevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(containerRef);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(childSelector, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.batch(childSelector, {
          start: triggerStart,
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y },
              {
                opacity: 1,
                y: 0,
                duration,
                ease,
                stagger,
                overwrite: true,
              }
            );
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
