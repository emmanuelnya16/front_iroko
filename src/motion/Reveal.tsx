import React, { useRef } from 'react';
import { gsap, useGSAP } from './gsap';

interface RevealProps {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  triggerStart?: string;
  className?: string;
}

export default function Reveal({
  children,
  y = 50,
  duration = 0.9,
  ease = 'power4.out',
  delay = 0,
  triggerStart = 'top 80%',
  className = '',
}: RevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(elRef);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(elRef.current, { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          elRef.current,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            delay,
            scrollTrigger: {
              trigger: elRef.current,
              start: triggerStart,
              once: true,
            },
          }
        );
      });
    },
    { scope: elRef }
  );

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
