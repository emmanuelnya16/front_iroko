import React, { useRef } from 'react';
import { gsap, useGSAP } from './gsap';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  parallax?: boolean;
  children?: React.ReactNode;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  parallax = false,
  children,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(containerRef);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(containerRef.current, { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(imgRef.current, { scale: 1, yPercent: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Voile curtain lift (clip-path inset 100% 0 0 0 -> 0) + inner image scale 1.25 -> 1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        tl.fromTo(
          containerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
          },
          0
        );

        tl.fromTo(
          imgRef.current,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
          },
          0
        );

        // 2. Parallax option with scrub (+- 6% on y)
        if (parallax && imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden will-change-[clip-path] ${className}`}
      style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
      />
      {children}
    </div>
  );
}
