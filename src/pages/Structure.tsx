import { motion } from 'motion/react';
import { Layers, Sparkles, Building, Briefcase, ArrowRight, CheckCircle2, ShieldCheck, Scale, TrendingUp, Laptop, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Structure() {
  const { t } = useTranslation();

  const holdingRoles = [
    {
      icon: Scale,
      title: 'Gouvernance & Cohérence',
      desc: 'Fixation des orientations stratégiques, maintien des valeurs fondamentales et garant de l’exigence de qualité à travers tous les pôles.'
    },
    {
      icon: TrendingUp,
      title: 'Stratégie de Groupe & Ressources',
      desc: 'Allocation optimale des moyens humains, financiers et technologiques pour soutenir la croissance durable de chaque branche.'
    },
    {
      icon: ShieldCheck,
      title: 'Synergies & Transversalité',
      desc: 'Faciliter la coopération entre pôles pour offrir aux clients et partenaires des solutions complètes sous une bannière unique.'
    }
  ];

  const families = [
    {
      number: '01',
      title: 'Famille Business',
      icon: Sparkles,
      desc: 'Les pôles de service, au cœur de la relation client : communication 360°, formation d’excellence et ingénierie technique.',
      poles: [
        { name: 'IROKO Event', status: 'Opérationnel', detail: 'Agence de communication 360°, régie événementielle, branding et édition' },
        { name: 'IROKO Academia', status: 'À venir', detail: 'Formations professionnelles certifiantes et masterclasses exécutives' },
        { name: 'IROKO Engineering', status: 'À venir', detail: 'Ingénierie technique de pointe, R&D et solutions technologiques' }
      ]
    },
    {
      number: '02',
      title: 'Famille Digital',
      icon: Laptop,
      desc: 'Les pôles de produits et solutions technologiques : applications mobiles, logiciels de gestion financière et hébergement cloud résilient.',
      poles: [
        { name: 'IROKO App', status: 'À venir', detail: 'Développement d’applications mobiles et plateformes logicielles' },
        { name: 'IROKO Gestion & Compta', status: 'À venir', detail: 'Logiciels de comptabilité, facturation et gestion administrative pour PME' },
        { name: 'IROKO Cloud', status: 'À venir', detail: 'Infrastructures cloud haute disponibilité, DevOps et infogérance 24/7' }
      ]
    },
    {
      number: '03',
      title: 'Famille Services & Support',
      icon: Film,
      desc: 'Les pôles qui protègent, valorisent et font grandir l’écosystème : studio audiovisuel, cybersécurité et investissement d’amorçage.',
      poles: [
        { name: 'IROKO Studio', status: 'À venir', detail: 'Production audiovisuelle, photographie publicitaire et contenus de marque' },
        { name: 'IROKO Security', status: 'À venir', detail: 'Cybersécurité, audits de vulnérabilités, protection des données et RGPD' },
        { name: 'IROKO Ventures', status: 'À venir', detail: 'Accompagnement de projets entrepreneuriaux et investissements stratégiques' }
      ]
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
              {t('structure.badge')}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
              Notre <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal text-4xl sm:text-6xl md:text-7xl">structure</span>
            </h1>
            <p className="text-fg-muted text-lg md:text-xl font-light leading-relaxed">
              {t('structure.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* RÔLE DE LA HOLDING */}
      <section className="py-20 px-6 bg-bg-alt border-y border-line/12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              Le Tronc qui Porte l'Ensemble
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4 text-fg">
              {t('structure.holdingTitle')}
            </h2>
            <p className="text-fg-muted text-base md:text-lg leading-relaxed">
              {t('structure.holdingDesc')}
            </p>
            <div className="mt-4 p-4 bg-surface border border-line/12 rounded-xl text-xs text-fg-muted shadow-sm">
              {t('structure.legalNotice')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {holdingRoles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="p-8 bg-surface border border-line/12 hover:border-primary/50 shadow-sm rounded-2xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-black uppercase mb-3 text-fg">{role.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{role.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LES 3 FAMILLES DE PÔLES */}
      <section className="py-24 px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-3 block">
              ORGANISATION SECTORIELLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase mb-6 tracking-tight text-fg">
              Trois Familles, Neuf Pôles Complémentaires
            </h2>
            <p className="text-fg-muted text-base md:text-lg">
              Une structuration équilibrée entre services opérationnels aux clients, création de produits technologiques et fonctions de soutien stratégique.
            </p>
          </div>

          <div className="space-y-12">
            {families.map((family, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-line/12 bg-surface p-8 md:p-12 hover:border-primary/40 shadow-sm rounded-2xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-line/12 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-3xl font-black text-primary">{family.number}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase text-fg">{family.title}</h3>
                      <p className="text-sm text-fg-muted mt-1 max-w-2xl">{family.desc}</p>
                    </div>
                  </div>
                  <Link
                    to="/poles"
                    className="self-start md:self-center px-4 py-2 bg-bg-alt hover:bg-primary hover:text-white text-fg text-xs font-bold uppercase tracking-wider transition-colors border border-line/12 rounded-full flex items-center gap-2"
                  >
                    <span>Voir les fiches</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {family.poles.map((pole, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-6 bg-bg-alt border border-line/10 hover:border-primary/40 rounded-xl transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-black uppercase text-fg text-base">{pole.name}</h4>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-full ${
                              pole.status === 'Opérationnel'
                                ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                                : 'bg-surface text-fg-muted border border-line/12'
                            }`}
                          >
                            {pole.status}
                          </span>
                        </div>
                        <p className="text-xs text-fg-muted leading-relaxed mb-4">{pole.detail}</p>
                      </div>
                      {pole.status === 'Opérationnel' && (
                        <Link
                          to="/tarifs"
                          className="text-[10px] font-black uppercase tracking-wider text-primary hover:text-accent flex items-center gap-1 mt-auto"
                        >
                          Consulter les packs & tarifs <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* BANDEAU SYNERGIES */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-primary/10 via-surface to-accent/10 border border-line/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl font-black uppercase text-fg">Un Projet Multi-Pôles ?</h3>
              <p className="text-sm text-fg-muted leading-relaxed">
                Notre holding coordonne directement l'ensemble des interventions pour les projets nécessitant à la fois de la communication 360°, des solutions logicielles et de l’ingénierie technique.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-primary text-white hover:bg-[#4314d6] px-8 py-4 font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-primary/25 rounded-full shrink-0"
            >
              Échanger avec la Direction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
