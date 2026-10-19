/**
 * src/motion/theme.ts
 * Utilitaires pour lire les tokens CSS à l'exécution et réagir
 * aux changements de thème sans relancer les animations GSAP.
 *
 * Usage :
 *   getCssVar('--primary')           // "83 31 245"
 *   getCssRgb('--primary')           // "rgb(83 31 245)"
 *   getCssRgb('--primary', 0.15)     // "rgb(83 31 245 / 0.15)"
 *   getActiveTheme()                 // "light" | "dark"
 *   onThemeChange(cb)                // subscription, retourne un unsubscribe
 */

import type { Theme } from '../context/ThemeContext';

/** Lit une variable CSS sur l'élément racine (ou un élément donné). */
export function getCssVar(
  name: string,
  el: Element = document.documentElement,
): string {
  const prop = name.startsWith('--') ? name : `--${name}`;
  return getComputedStyle(el).getPropertyValue(prop).trim();
}

/** Retourne la valeur rgb() avec opacité optionnelle. */
export function getCssRgb(name: string, alpha?: number): string {
  const val = getCssVar(name);
  return alpha !== undefined
    ? `rgb(${val} / ${alpha})`
    : `rgb(${val})`;
}

/** Thème actif selon l'attribut data-theme de <html>. */
export function getActiveTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

/**
 * S'abonne à l'événement "themechange" sans recréer les animations.
 * Retourne une fonction de désabonnement.
 *
 * @example
 *   const off = onThemeChange((theme) => {
 *     gsap.set(ref.current, { color: getCssRgb('--fg') });
 *   });
 *   // dans le cleanup useGSAP : return () => { off(); tween.kill(); }
 */
export function onThemeChange(
  callback: (theme: Theme) => void,
): () => void {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<{ theme: Theme }>).detail;
    callback(detail?.theme ?? getActiveTheme());
  };
  window.addEventListener('themechange', handler);
  return () => window.removeEventListener('themechange', handler);
}
