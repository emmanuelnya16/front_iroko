import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Search, ChevronDown, Menu, X, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';

export function useHeaderVisible(threshold = 120, delta = 6) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - last;
        if (y < 10) {
          setVisible(true);
        } else if (Math.abs(diff) >= delta) {
          if (diff > 0 && y > threshold) {
            setVisible(false);
          } else if (diff < 0) {
            setVisible(true);
          }
          last = y;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, delta]);

  return visible;
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState<'poles' | 'group' | 'lang' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const visible = useHeaderVisible(120, 6);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: 'fr' | 'en' | 'de') => {
    i18n.changeLanguage(lang);
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    navigate(`/poles?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const isAnyMenuOpen = activeDropdown !== null || isMobileMenuOpen || isSearchOpen;

  return (
    <>
      <header
        ref={navContainerRef}
        className={`fixed inset-x-[22px] top-[24px] z-50 max-w-[1840px] mx-auto transition-transform duration-300 ease-out ${
          visible || isAnyMenuOpen ? 'translate-y-0' : '-translate-y-[160%]'
        }`}
      >
        {/* Basel Area Floating White Pill */}
        <div className="relative w-full h-[96px] md:h-[103px] bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 flex items-center justify-between px-6 lg:px-8 border-0 select-none">
          
          {/* GAUCHE : Logo IROKO officiel (~108x52 px) */}
          <Link
            to="/"
            className="flex items-center pl-2 lg:pl-6 focus:outline-none group"
            aria-label="IROKO Group Accueil"
          >
            <img
              src="https://res.cloudinary.com/dtntkknaq/image/upload/v1792317987/IROKO_logo_zebpga.png"
              alt="IROKO Group Logo"
              className="h-[52px] md:h-[60px] w-auto max-w-[200px] object-contain group-hover:scale-[1.03] transition-transform duration-200"
            />
          </Link>

          {/* CENTRE : 4 liens centrés avec environ 38 px d'écart (19-20 px, graisse 500, noir, survol #531FF5) */}
          <nav className="hidden xl:flex items-center gap-[38px] absolute left-1/2 -translate-x-1/2">
            
            {/* 1. Nos pôles ▾ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'poles' ? null : 'poles')}
                onMouseEnter={() => setActiveDropdown('poles')}
                className="flex items-center gap-1.5 text-[19px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 cursor-pointer py-4"
              >
                <span>{t('nav.poles')}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${activeDropdown === 'poles' ? 'rotate-180 text-[#531FF5]' : 'opacity-70'}`}
                />
              </button>

              {/* Sous-menu Nos Pôles */}
              <AnimatePresence>
                {activeDropdown === 'poles' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[620px] bg-white rounded-[24px] shadow-[0_16px_50px_rgba(0,0,0,0.12)] p-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-6 text-left">
                      {/* Business */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#FF8500] block mb-3">
                          01. Business
                        </span>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Event
                            </Link>
                          </li>
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Academia
                            </Link>
                          </li>
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Engineering
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Digital */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#531FF5] block mb-3">
                          02. Digital
                        </span>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO App
                            </Link>
                          </li>
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Gestion & Compta
                            </Link>
                          </li>
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Cloud
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Services & Support */}
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#6B7280] block mb-3">
                          03. Services
                        </span>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Studio
                            </Link>
                          </li>
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Security
                            </Link>
                          </li>
                          <li>
                            <Link to="/poles" className="text-[17px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1">
                              IROKO Ventures
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                      <Link to="/poles" className="text-[#531FF5] font-semibold hover:underline flex items-center gap-1">
                        Consulter tous les pôles <ArrowRight size={14} />
                      </Link>
                      <span className="text-gray-400">10 pôles d'excellence</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Notre méthode */}
            <Link
              to="/methode"
              className="text-[19px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 py-4"
            >
              {t('nav.method')}
            </Link>

            {/* 3. Tarifs */}
            <Link
              to="/tarifs"
              className="text-[19px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 py-4"
            >
              {t('nav.pricing')}
            </Link>

            {/* 4. Le groupe ▾ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'group' ? null : 'group')}
                onMouseEnter={() => setActiveDropdown('group')}
                className="flex items-center gap-1.5 text-[19px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 cursor-pointer py-4"
              >
                <span>{t('nav.group')}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${activeDropdown === 'group' ? 'rotate-180 text-[#531FF5]' : 'opacity-70'}`}
                />
              </button>

              {/* Sous-menu Le groupe */}
              <AnimatePresence>
                {activeDropdown === 'group' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[280px] bg-white rounded-[24px] shadow-[0_16px_50px_rgba(0,0,0,0.12)] p-5 z-50 text-left"
                  >
                    <ul className="space-y-2">
                      <li>
                        <Link
                          to="/le-groupe"
                          className="text-[18px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1.5"
                        >
                          Vision & Symbole Iroko
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/structure"
                          className="text-[18px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1.5"
                        >
                          Notre structure
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/fondateurs"
                          className="text-[18px] font-medium text-[#0A0B14] hover:text-[#531FF5] transition-colors duration-200 block py-1.5"
                        >
                          Fondateurs & Direction
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* DROITE : Globe + Langue, Bouton rond Recherche (62px, #F7F2EF), Bouton pilule Encre "Demander un devis" */}
          <div className="flex items-center gap-3 lg:gap-[16px] pr-2 lg:pr-[12px]">
            
            {/* Globe + Sélecteur de Langue (FR / EN / DE) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-[#F7F2EF] transition-colors text-[16px] font-medium text-[#0A0B14] cursor-pointer"
                aria-label="Changer de langue"
              >
                <Globe size={19} className="text-[#0A0B14]" />
                <span className="font-semibold uppercase text-xs">{i18n.language?.substring(0, 2).toUpperCase() || 'FR'}</span>
              </button>

              <AnimatePresence>
                {activeDropdown === 'lang' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 w-[140px] z-50 text-left border border-gray-100"
                  >
                    {[
                      { code: 'fr', label: 'Français', flag: '🇫🇷' },
                      { code: 'en', label: 'English', flag: '🇬🇧' },
                      { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
                    ].map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => changeLanguage(item.code as 'fr' | 'en' | 'de')}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                          i18n.language?.startsWith(item.code)
                            ? 'bg-[#531FF5]/10 text-[#531FF5]'
                            : 'text-[#0A0B14] hover:bg-[#F7F2EF]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.code.toUpperCase()}</span>
                        </span>
                        {i18n.language?.startsWith(item.code) && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bouton bascule thème (48 px, fond #F7F2EF fixe) */}
            <ThemeToggle size={54} />

            {/* Bouton rond de recherche ~62px (#F7F2EF) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-full bg-[#F7F2EF] hover:bg-[#eee8e3] transition-colors flex items-center justify-center text-[#0A0B14] cursor-pointer"
              aria-label="Rechercher"
            >
              <Search size={21} className="text-[#0A0B14]" />
            </button>

            {/* Bouton Pilule Encre (#0A0B14) "Demander un devis" (~172x60px) */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center h-[56px] md:h-[60px] px-7 lg:px-8 rounded-full bg-[#0A0B14] hover:bg-[#1f2233] text-white font-semibold text-[15px] lg:text-[16px] transition-colors duration-200"
            >
              {t('nav.quote')}
            </Link>

            {/* Mobile Hamburger (sous 1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden w-[48px] h-[48px] rounded-full bg-[#F7F2EF] hover:bg-[#eae4df] transition-colors flex items-center justify-center text-[#0A0B14] cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MODAL RECHERCHE RAPIDE */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-32 px-6"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-[28px] p-8 shadow-2xl"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un pôle, une formule, un service..."
                  className="w-full bg-[#F7F2EF] text-[#0A0B14] text-lg rounded-full pl-14 pr-24 py-4 focus:outline-none focus:ring-2 focus:ring-[#531FF5]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-[#531FF5] text-white rounded-full text-sm font-semibold hover:bg-[#4314d6] transition-colors"
                >
                  OK
                </button>
              </form>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="text-gray-400 py-1">Suggestions :</span>
                {['IROKO Event', 'Tarifs packs', 'Academia', 'Engineering', 'Devis 48h'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/poles?q=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1 bg-[#F7F2EF] hover:bg-[#531FF5] hover:text-white text-[#0A0B14] rounded-full transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-[22px] top-[135px] max-w-[1840px] mx-auto bg-white rounded-[32px] p-8 shadow-2xl z-40 xl:hidden"
          >
            <div className="flex flex-col gap-6 text-left">
              <Link
                to="/poles"
                className="text-2xl font-bold text-[#0A0B14] hover:text-[#531FF5] transition-colors"
              >
                {t('nav.poles')}
              </Link>
              <Link
                to="/methode"
                className="text-2xl font-bold text-[#0A0B14] hover:text-[#531FF5] transition-colors"
              >
                {t('nav.method')}
              </Link>
              <Link
                to="/tarifs"
                className="text-2xl font-bold text-[#0A0B14] hover:text-[#531FF5] transition-colors"
              >
                {t('nav.pricing')}
              </Link>
              <Link
                to="/structure"
                className="text-2xl font-bold text-[#0A0B14] hover:text-[#531FF5] transition-colors"
              >
                {t('nav.structure')}
              </Link>
              <Link
                to="/fondateurs"
                className="text-2xl font-bold text-[#0A0B14] hover:text-[#531FF5] transition-colors"
              >
                {t('nav.founders')}
              </Link>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <Link
                  to="/contact"
                  className="w-full py-4 text-center rounded-full bg-[#0A0B14] text-white font-semibold text-lg"
                >
                  {t('nav.quote')}
                </Link>

                <div className="flex justify-center gap-4 pt-2">
                  {[
                    { code: 'fr', label: 'FR', flag: '🇫🇷' },
                    { code: 'en', label: 'EN', flag: '🇬🇧' },
                    { code: 'de', label: 'DE', flag: '🇩🇪' },
                  ].map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => changeLanguage(item.code as 'fr' | 'en' | 'de')}
                      className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 cursor-pointer ${
                        i18n.language?.startsWith(item.code)
                          ? 'bg-[#531FF5] text-white'
                          : 'bg-[#F7F2EF] text-[#0A0B14]'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                  {/* Bascule thème dans le menu mobile */}
                  <ThemeToggle size={44} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
