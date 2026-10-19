import { motion } from 'motion/react';
import { ShieldCheck, Award, Eye, Compass, Gem, Network, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();

  const values = [
    { 
      icon: Award, 
      title: t('group.values.val1'), 
      desc: t('group.values.desc1') 
    },
    { 
      icon: ShieldCheck, 
      title: t('group.values.val2'), 
      desc: t('group.values.desc2') 
    },
    { 
      icon: Gem, 
      title: t('group.values.val3'), 
      desc: t('group.values.desc3') 
    },
    { 
      icon: Network, 
      title: t('group.values.val4'), 
      desc: t('group.values.desc4') 
    },
    { 
      icon: Compass, 
      title: t('group.values.val5'), 
      desc: t('group.values.desc5') 
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg text-fg">
      {/* HEADER SECTION */}
      <section className="py-20 px-6 bg-gradient-to-b from-surface/40 via-bg to-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              {t('group.badge')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              Le Groupe <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal text-4xl sm:text-6xl md:text-7xl">IROKO</span>
            </h1>
            <p className="text-fg-muted text-lg md:text-xl font-light leading-relaxed">
              {t('group.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SYMBOLE DE L'ARBRE IROKO */}
      <section className="py-20 px-6 bg-bg-alt border-y border-line/12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent mb-4" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Origine & Symbole
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight text-fg">
              {t('group.symbolTitle')}
            </h2>
            <p className="text-fg-muted text-base md:text-lg leading-relaxed">
              {t('group.symbolText')}
            </p>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-surface border border-line/12 rounded-xl shadow-sm">
                <span className="text-xl font-black text-primary block mb-1">Enracinement</span>
                <span className="text-xs text-fg-muted">Ancrage profond et respect des fondamentaux.</span>
              </div>
              <div className="p-4 bg-surface border border-line/12 rounded-xl shadow-sm">
                <span className="text-xl font-black text-accent block mb-1">Longévité</span>
                <span className="text-xs text-fg-muted">Résistance absolue aux épreuves du temps.</span>
              </div>
              <div className="p-4 bg-surface border border-line/12 rounded-xl shadow-sm">
                <span className="text-xl font-black text-primary block mb-1">Élévation</span>
                <span className="text-xs text-fg-muted">Ambition collective et hauteur de vue.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] overflow-hidden border border-line/12 rounded-2xl shadow-sm group relative">
              <img
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
                alt="Arbre Iroko Majestueux"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-xs uppercase tracking-widest text-white/70 font-bold mb-1">Emblème de Noblesse</span>
                <p className="text-lg sm:text-xl font-cursive text-accent">« Fort comme le tronc, pérenne comme la terre. »</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-24 px-6 bg-bg-alt">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-10 bg-surface border border-line/12 relative rounded-sm shadow-sm"
          >
            <Eye size={40} className="text-primary mb-6" />
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-fg">
              {t('group.visionTitle')}
            </h3>
            <p className="text-fg-muted text-base leading-relaxed">
              {t('group.visionText')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="p-10 bg-surface border border-line/12 relative rounded-sm shadow-sm"
          >
            <Compass size={40} className="text-primary mb-6" />
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-fg">
              {t('group.missionTitle')}
            </h3>
            <p className="text-fg-muted text-base leading-relaxed">
              {t('group.missionText')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* LES 5 VALEURS CARDINALES */}
      <section className="py-24 px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-2 block">
              Nos Piliers Éthiques
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-fg">
              {t('group.valuesTitle')}
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 bg-surface border border-line/12 hover:border-primary/50 transition-colors flex flex-col justify-between group rounded-sm shadow-sm"
              >
                <div>
                  <val.icon size={36} className="text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-black uppercase mb-3 text-fg">{val.title}</h4>
                  <p className="text-sm text-fg-muted leading-relaxed">{val.desc}</p>
                </div>
                <div className="w-8 h-0.5 bg-primary/40 mt-6 group-hover:w-16 transition-all duration-300" />
              </motion.div>
            ))}

            <div className="p-8 bg-primary/10 border border-primary/30 flex flex-col justify-between rounded-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Engagements 2026</span>
                <h4 className="text-xl font-black uppercase text-fg mb-3">Rejoindre la Dynamique</h4>
                <p className="text-xs text-fg-muted leading-relaxed mb-6">
                  Vous cherchez un partenaire solide pour vos projets d'envergure ou un prestataire d'excellence ?
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-on px-5 py-3 text-xs font-black uppercase tracking-wider hover:bg-primary-hover transition-colors"
              >
                Prendre Contact <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
