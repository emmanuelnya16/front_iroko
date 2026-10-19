import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Applique le thème sur <html> sans passer par React state
 * (utilisé aussi avant le montage, depuis le script inline index.html).
 * withTransition = false au premier montage (pas d'animation de changement).
 */
function applyTheme(theme: Theme, withTransition = false): void {
  const root = document.documentElement;

  if (withTransition) {
    root.classList.add('theme-transitioning');
    // Retire la classe après la durée de transition (200 ms + marge)
    window.setTimeout(() => root.classList.remove('theme-transitioning'), 260);
  }

  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;

  const metaTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#080C14' : '#FFFFFF');
  }

  // Événement personnalisé pour les animations GSAP qui lisent des vars CSS
  // (ne modifie aucun composant React, ne relance aucune animation)
  window.dispatchEvent(new CustomEvent<{ theme: Theme }>('themechange', { detail: { theme } }));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lit l'attribut déjà posé par le script inline (pas de flash)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const attr = document.documentElement.getAttribute('data-theme');
    return (attr === 'dark' || attr === 'light') ? attr : 'light';
  });

  // Synchronisation initiale (au cas où le script inline n'a pas encore tourné)
  useEffect(() => {
    applyTheme(theme, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synchronisation multi-onglets via localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'iroko-theme') return;
      const next: Theme = e.newValue === 'dark' ? 'dark' : 'light';
      setThemeState(next);
      applyTheme(next, false); // pas d'animation dans un autre onglet
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setTheme = (next: Theme): void => {
    // Stocke uniquement quand l'utilisateur a explicitement choisi
    localStorage.setItem('iroko-theme', next);
    setThemeState(next);
    applyTheme(next, true);
  };

  const toggleTheme = (): void => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
