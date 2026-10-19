import { Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  /** Taille optionnelle (défaut 48 px pour desktop) */
  size?: number;
}

/**
 * Bouton de bascule thème clair / sombre.
 *
 * Design :
 * - Rond, fond #F7F2EF FIXE (appartient à la pilule du header qui ne change jamais).
 * - Au survol : fond légèrement plus sombre (#EEE8E3), transition 150 ms.
 *   Pas d'agrandissement, pas de scale().
 * - Icône Lucide Sun ou Moon 20 px, couleur #0A0B14 fixe.
 * - aria-label dynamique (FR / EN / DE via i18n), aria-pressed.
 * - Focus clavier : outline 2 px violet (outline-primary via focus-visible).
 *
 * Placement :
 * - Desktop : entre le sélecteur de langue et le bouton de recherche.
 * - Mobile  : dans le drawer, à côté des sélecteurs de langue.
 */
export default function ThemeToggle({ size = 48 }: ThemeToggleProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const label  = isDark ? t('nav.themeSwitchToLight') : t('nav.themeSwitchToDark');

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#EEE8E3';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#F7F2EF';
  };

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: size, height: size, backgroundColor: '#F7F2EF', flexShrink: 0 }}
      className="rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {isDark
        ? <Sun  size={20} color="#0A0B14" strokeWidth={2} aria-hidden="true" />
        : <Moon size={20} color="#0A0B14" strokeWidth={2} aria-hidden="true" />
      }
    </button>
  );
}
