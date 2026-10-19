import { Link } from 'react-router-dom';
import { Globe, ArrowUpRight, Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="w-full bg-[#161616] text-white pt-[110px] pb-[60px] px-6 lg:px-[72px] border-0">
      <div className="max-w-[1840px] mx-auto">
        
        {/* GRILLE DES 5 COLONNES (1.5fr repeat(4, 1fr) avec ~35px d'écart) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-[35px] items-start">
          
          {/* COLONNE 1 : Logo technologique IROKO + "Envie d'en savoir plus ?" + Sous-titre + Bouton violet pilule+rond + Réseaux */}
          <div className="flex flex-col items-start pr-0 lg:pr-6">
            <Link to="/" className="mb-8 block group" aria-label="Accueil IROKO Group">
              <img
                src="https://res.cloudinary.com/dtntkknaq/image/upload/v1792318421/Logo_technologique_IROKO_violet_et_orange_dfh6o4.png"
                alt="IROKO Group Logo Technologique"
                className="h-[52px] sm:h-[60px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <h3 className="text-[26px] lg:text-[28px] font-medium text-white leading-tight mb-4">
              {i18n.language === 'en' ? 'Want to know more?' : i18n.language === 'de' ? 'Möchten Sie mehr erfahren?' : 'Envie d’en savoir plus ?'}
            </h3>
            
            <p className="text-[17px] lg:text-[19px] font-normal text-white/70 leading-snug mb-8 max-w-[380px]">
              {i18n.language === 'en' 
                ? 'Connect with our leadership to build sustainable synergies.' 
                : i18n.language === 'de' 
                ? 'Sprechen Sie mit uns über zukunftssichere Synergien.'
                : 'Échangeons sur vos ambitions et les synergies de nos dix pôles.'}
            </p>

            {/* Bouton Basel Area violet : pilule + rond flèche ↗ */}
            <Link
              to="/contact"
              className="inline-flex items-center group cursor-pointer"
            >
              <span className="h-[56px] px-7 bg-[#531FF5] text-white font-medium text-[16px] rounded-l-full flex items-center justify-center transition-colors duration-200 group-hover:bg-[#4314d6]">
                {t('nav.quote')}
              </span>
              <span className="w-[56px] h-[56px] bg-[#531FF5] text-white rounded-r-full flex items-center justify-center border-l border-white/20 transition-colors duration-200 group-hover:bg-[#4314d6]">
                <ArrowUpRight size={24} className="text-white" />
              </span>
            </Link>

            {/* Réseaux sociaux : ~55 px plus bas, blancs, ~26 px, espacés de ~50 px */}
            <div className="mt-[45px] flex items-center gap-[50px]">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#531FF5] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={26} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-white/80 hover:text-[#531FF5] transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube size={28} />
              </a>
            </div>
          </div>

          {/* COLONNE 2 : Business */}
          <div className="flex flex-col">
            <h4 className="text-[26px] lg:text-[28px] font-medium text-white mb-[45px]">
              Business
            </h4>
            <ul className="space-y-[22px]">
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Event
                </Link>
              </li>
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Academia
                </Link>
              </li>
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* COLONNE 3 : Digital */}
          <div className="flex flex-col">
            <h4 className="text-[26px] lg:text-[28px] font-medium text-white mb-[45px]">
              Digital
            </h4>
            <ul className="space-y-[22px]">
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO App
                </Link>
              </li>
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Gestion & Compta
                </Link>
              </li>
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Cloud
                </Link>
              </li>
            </ul>
          </div>

          {/* COLONNE 4 : Services & Support */}
          <div className="flex flex-col">
            <h4 className="text-[26px] lg:text-[28px] font-medium text-white mb-[45px]">
              Services & Support
            </h4>
            <ul className="space-y-[22px]">
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Studio
                </Link>
              </li>
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Security
                </Link>
              </li>
              <li>
                <Link
                  to="/poles"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Ventures
                </Link>
              </li>
            </ul>
          </div>

          {/* COLONNE 5 : Le groupe */}
          <div className="flex flex-col">
            <h4 className="text-[26px] lg:text-[28px] font-medium text-white mb-[45px]">
              {t('nav.group')}
            </h4>
            <ul className="space-y-[22px]">
              <li>
                <Link
                  to="/le-groupe"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  IROKO Holding
                </Link>
              </li>
              <li>
                <Link
                  to="/structure"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  {t('nav.structure')}
                </Link>
              </li>
              <li>
                <Link
                  to="/methode"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  {t('nav.method')}
                </Link>
              </li>
              <li>
                <Link
                  to="/tarifs"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[18px] lg:text-[20px] font-normal text-white/80 hover:text-[#531FF5] transition-colors duration-200 block"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRE DU BAS : Trait fin 1 px blanc 10 %, puis ~40 px en dessous : 1 seule ligne à 18 px */}
        <div className="mt-[90px] pt-[40px] border-t border-white/10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 text-[16px] xl:text-[18px] text-white/60">
          
          {/* Gauche : Globe + Langue + Copyright */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10 text-white">
              <Globe size={18} className="text-white" />
              <button
                onClick={() => changeLanguage('fr')}
                className={`text-xs font-semibold transition-colors cursor-pointer ${i18n.language?.startsWith('fr') ? 'text-[#FF8500]' : 'text-white/60 hover:text-white'}`}
              >
                FR
              </button>
              <span className="text-white/30">/</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`text-xs font-semibold transition-colors cursor-pointer ${i18n.language?.startsWith('en') ? 'text-[#FF8500]' : 'text-white/60 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/30">/</span>
              <button
                onClick={() => changeLanguage('de')}
                className={`text-xs font-semibold transition-colors cursor-pointer ${i18n.language?.startsWith('de') ? 'text-[#FF8500]' : 'text-white/60 hover:text-white'}`}
              >
                DE
              </button>
            </div>
            
            <span>
              {i18n.language === 'en' 
                ? '© 2026 IROKO Group. All Rights Reserved.' 
                : i18n.language === 'de' 
                ? '© 2026 IROKO Group. Alle Rechte vorbehalten.' 
                : '© 2026 IROKO Group. Tous droits réservés.'}
            </span>
          </div>

          {/* Droite : Mentions légales, Confidentialité, Conditions, Crédit */}
          <div className="flex flex-wrap items-center gap-6 xl:gap-[25px]">
            <Link to="/contact" className="hover:text-white transition-colors duration-200">
              {i18n.language === 'en' ? 'Legal Notice' : i18n.language === 'de' ? 'Impressum' : 'Mentions légales'}
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">
              {i18n.language === 'en' ? 'Privacy Policy' : i18n.language === 'de' ? 'Datenschutz' : 'Politique de confidentialité'}
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-200">
              {i18n.language === 'en' ? 'Terms & Conditions' : i18n.language === 'de' ? 'AGB' : 'Conditions générales'}
            </Link>
            
            {/* Crédit */}
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-white/40 pl-2 border-l border-white/10">
              Emmanuel Nya DevFullStack
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
