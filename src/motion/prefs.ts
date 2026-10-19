/**
 * src/motion/prefs.ts
 * Reduced-motion utility.
 * Returns true when the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
