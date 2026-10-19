import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, HelpCircle, ShieldCheck, Clock, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Tarifs() {
  const { t } = useTranslation();

  const packs = [
    {
      name: t('pricing.pack1.name'),
      price: t('pricing.pack1.price'),
      unit: t('pricing.pack1.unit'),
      desc: t('pricing.pack1.desc'),
      popular: false,
      features: [
        t('pricing.pack1.feat1'),
        t('pricing.pack1.feat2'),
        t('pricing.pack1.feat3'),
        t('pricing.pack1.feat4'),
        'Assistance technique pendant les allocutions',
        'Câblage sécurisé et conformité électrique'
      ],
      btnText: 'Choisir ce pack',
      btnType: 'outline'
    },
    {
      name: t('pricing.pack2.name'),
      price: t('pricing.pack2.price'),
      unit: t('pricing.pack2.unit'),
      desc: t('pricing.pack2.desc'),
      popular: true,
      features: [
        t('pricing.pack2.feat1'),
        t('pricing.pack2.feat2'),
        t('pricing.pack2.feat3'),
        t('pricing.pack2.feat4'),
        'Ambiance lumineuse dînatoire et dynamique pour la fête',
        'Micros HF sans fil pour maîtres de cérémonie',
        'Tests acoustiques approfondis 3h avant ouverture'
      ],
      btnText: 'Réserver ce pack',
      btnType: 'primary'
    },
    {
      name: t('pricing.pack3.name'),
      price: t('pricing.pack3.price'),
      unit: t('pricing.pack3.unit'),
      desc: t('pricing.pack3.desc'),
      popular: false,
      features: [
        t('pricing.pack3.feat1'),
        t('pricing.pack3.feat2'),
        t('pricing.pack3.feat3'),
        t('pricing.pack3.feat4'),
        'Scénographe et régisseur général dédiés',
        'Régie vidéo en direct et retransmission simultanée',
        'Plan 3D d\'implantation et coordination générale'
      ],
      btnText: 'Demander une étude sur-mesure',
      btnType: 'outline'
    }
  ];

  const options = [
    { name: t('pricing.opt1'), price: t('pricing.price1'), desc: '2 têtes amplifiées haut de gamme, table de mixage numérique, 2 micros HF Shure/Sennheiser.' },
    { name: t('pricing.opt2'), price: t('pricing.price2'), desc: '8 projecteurs LED autonomes sur batterie, programmables aux couleurs de votre charte graphique.' },
    { name: t('pricing.opt3'), price: t('pricing.price3'), desc: 'Écran LED haute luminosité Pitch 2.6mm pour intérieur ou Pitch 3.9mm extérieur avec scaler vidéo.' },
    { name: t('pricing.opt4'), price: t('pricing.price4'), desc: 'Canapés Chesterfield, fauteuils scandinaves, tables basses et mange-debout avec tabourets hauts.' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg text-fg">
      {/* HEADER SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-surface/40 via-bg to-bg relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('pricing.badge')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              Nos Formules & <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal text-4xl sm:text-6xl md:text-7xl">tarifs</span>
            </h1>
            <p className="text-fg-muted text-lg md:text-xl font-light leading-relaxed">
              {t('pricing.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* PACKS TARIFF SECTION */}
      <section className="py-16 px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="p-4 bg-surface border border-line/12 shadow-sm mb-12 flex items-center gap-3 text-xs text-fg">
            <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
            <span>
              {t('pricing.customNotice')}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packs.map((pack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col justify-between p-8 md:p-10 border transition-all duration-300 rounded-2xl ${
                  pack.popular
                    ? 'bg-surface border-2 border-primary shadow-xl shadow-primary/10 scale-105 z-10'
                    : 'bg-surface border-line/12 hover:border-primary/40 shadow-sm'
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-200" />
                    Formule Recommandée
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-black uppercase text-fg mb-2">{pack.name}</h3>
                  <p className="text-xs text-fg-muted mb-6 leading-relaxed">{pack.desc}</p>

                  <div className="mb-8 pb-8 border-b border-line/12">
                    <span className="text-4xl md:text-5xl font-black text-primary font-mono">{pack.price}</span>
                    <span className="text-xs text-fg-muted block mt-1 uppercase tracking-wider">{pack.unit}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-fg">
                        <Check size={16} className="text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-4 text-center text-xs font-black uppercase tracking-widest transition-all rounded-full ${
                    pack.popular
                      ? 'bg-gradient-blend hover:opacity-95 text-white shadow-lg shadow-primary/30'
                      : 'border border-line/20 hover:border-fg text-fg hover:bg-fg hover:text-bg'
                  }`}
                >
                  {pack.btnText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIONS & MATÉRIEL À LA CARTE */}
      <section className="py-20 px-6 bg-bg-alt border-t border-line/12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              Flexibilité Totale
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-fg">
              {t('pricing.optionsTitle')}
            </h2>
            <p className="text-fg-muted text-sm">
              {t('pricing.optionsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((opt, i) => (
              <div
                key={i}
                className="p-6 bg-surface border border-line/12 shadow-sm rounded-xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h4 className="text-base font-black uppercase text-fg">{opt.name}</h4>
                  <span className="text-sm font-black text-primary font-mono shrink-0">{opt.price}</span>
                </div>
                <p className="text-xs text-fg-muted leading-relaxed mb-4">{opt.desc}</p>
                <Link
                  to="/contact"
                  className="text-[10px] font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors flex items-center gap-1 self-start"
                >
                  Ajouter au devis <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary hover:bg-[#4314d6] text-white px-8 py-4 font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary/20 rounded-full"
            >
              {t('pricing.btnQuote')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
