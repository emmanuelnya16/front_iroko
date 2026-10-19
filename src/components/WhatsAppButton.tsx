import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function WhatsAppButton() {
  const { i18n } = useTranslation();
  const phoneNumber = '237693129205'; 
  const message = encodeURIComponent(
    i18n.language === 'en'
      ? 'Hello IROKO Group, I would like information regarding a project or quote...'
      : i18n.language === 'de'
      ? 'Guten Tag IROKO Gruppe, ich interessiere mich für Ihre Leistungen und ein Angebot...'
      : 'Bonjour Groupe IROKO, je souhaite des informations concernant un projet ou un devis...'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#0A0B14] hover:bg-[#531FF5] border border-white/20 text-white rounded-full flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.45)] group transition-colors duration-300 cursor-pointer"
      aria-label="Contacter IROKO sur WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={26} className="text-white transition-transform group-hover:scale-110" />
        {/* Brand connection point */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF8500] ring-2 ring-[#0A0B14]" />
      </div>

      <span className="absolute right-full mr-3.5 bg-[#0A0B14] text-white border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
        {i18n.language === 'en' ? 'Direct WhatsApp' : i18n.language === 'de' ? 'Direkt per WhatsApp' : 'WhatsApp Direct'}
      </span>
    </motion.a>
  );
}
