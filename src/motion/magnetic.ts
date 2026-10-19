import type { RefObject } from 'react';
import { useEffect } from 'react';
import { gsap } from './gsap';

export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  force: number = 0.25
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // Skip on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * force);
      yTo(relY * force);
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, force]);
}
