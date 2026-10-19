import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Quote, ShieldCheck, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Founders() {
  const { t } = useTranslation();

  const founders = [
    {
      name: t('founders.f1Name'),
      role: t('founders.f1Role'),
      bio: t('founders.f1Bio'),
      quote: "Construire un groupe d'envergure, c'est d'abord rassembler des talents, poser des principes intangibles et voir loin pour les générations futures.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      focus: "Vision stratégique & Développement international"
    },
    {
      name: t('founders.f2Name'),
      role: t('founders.f2Role'),
      bio: t('founders.f2Bio'),
      quote: "L'excellence ne s'improvise pas : elle repose sur des fondations solides, des processus rigoureux et une complémentarité sans faille entre nos métiers.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
      focus: "Excellence opérationnelle & Ingénierie des systèmes"
    }
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
              {t('founders.badge')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              Les Fondateurs <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal text-4xl sm:text-6xl md:text-7xl">d'IROKO</span>
            </h1>
            <p className="text-fg-muted text-lg md:text-xl font-light leading-relaxed">
              {t('founders.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOUNDERS DETAIL CARDS */}
      <section className="py-20 px-6 bg-bg">
        <div className="max-w-6xl mx-auto space-y-16">
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="border border-line/12 bg-surface p-8 md:p-12 hover:border-accent/40 shadow-sm rounded-2xl transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-5 relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line/12">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-blend text-white p-3 rounded-xl shadow-xl">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-tint border border-line/12 text-accent font-mono text-xs uppercase tracking-widest mb-4 rounded-full">
                    <Sparkles size={12} />
                    {founder.role}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase text-fg mb-2">
                    {founder.name}
                  </h2>
                  <p className="text-xs font-semibold text-fg-muted uppercase tracking-widest mb-6">
                    {founder.focus}
                  </p>

                  <p className="text-base text-fg-muted leading-relaxed mb-6 font-light">
                    {founder.bio}
                  </p>

                  <div className="p-6 bg-surface-tint border-l-4 border-accent rounded-r-xl mb-6 shadow-sm">
                    <Quote size={24} className="text-accent mb-3" />
                    <p className="text-lg sm:text-xl font-cursive text-fg leading-relaxed tracking-wide">
                      « {founder.quote} »
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-line/12">
                  <span className="text-xs font-mono uppercase tracking-widest text-fg-muted">Gouvernance Groupe IROKO</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 bg-bg-alt border-t border-line/12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-3 block">
            ÉCHANGER AVEC L’ÉQUIPE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 text-fg">
            Vous souhaitez développer un projet ou un partenariat ?
          </h2>
          <p className="text-fg-muted text-base mb-8 max-w-2xl mx-auto">
            La direction générale et les équipes des 9 pôles sont à votre disposition pour vous accompagner dans vos défis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-primary-on font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 rounded-sm"
            >
              <span>Nous contacter</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/structure"
              className="w-full sm:w-auto px-8 py-4 bg-surface hover:bg-bg-alt text-fg font-bold uppercase tracking-widest text-xs transition-all border border-line/12 shadow-sm rounded-sm"
            >
              Découvrir notre structure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
