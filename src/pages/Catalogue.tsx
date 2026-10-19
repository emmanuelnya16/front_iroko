import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Building, Briefcase, CheckCircle2, ArrowRight, X, Layers, ShieldCheck, Laptop, Cpu, Shield, Rocket, BookOpen, Film, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useTranslation } from 'react-i18next';

export default function Catalogue() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeFamily, setActiveFamily] = useState<'all' | 'fam1' | 'fam2' | 'fam3'>('all');
  const [selectedPole, setSelectedPole] = useState<any>(null);

  const polesData = [
    // Famille 1 : Business
    {
      id: 'event',
      name: 'IROKO Event',
      family: 'fam1',
      familyName: 'Famille Business',
      icon: Sparkles,
      tagline: 'Agence de communication 360° & Événements d’envergure',
      desc: 'Donner une voix forte à votre marque. Conseil en communication, identité visuelle, sites web, réseaux sociaux, organisation d’événements d’entreprise, séminaires, galas et édition.',
      status: 'Opérationnel',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      services: [
        'Conseil en stratégie de communication & identité de marque',
        'Création de sites web professionnels & présence digitale',
        'Gestion des réseaux sociaux & campagnes d’influence',
        'Organisation clé en main de séminaires, conférences & galas',
        'Régie technique globale, sonorisation & scénographie',
        'Formation en communication & édition de supports prestigieux'
      ],
      ctaText: 'Consulter la grille tarifaire',
      ctaLink: '/tarifs',
      badgeColor: 'bg-emerald-500 text-white'
    },
    {
      id: 'academia',
      name: 'IROKO Academia',
      family: 'fam1',
      familyName: 'Famille Business',
      icon: BookOpen,
      tagline: 'Formation continue & transmission des savoirs d’excellence',
      desc: 'Former la prochaine génération de leaders et d’experts. Programmes certifiants, masterclasses exécutives et ateliers sur mesure pour entreprises et professionnels.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
      services: [
        'Programmes de formation professionnelle certifiants',
        'Masterclasses pour dirigeants et cadres supérieurs',
        'Ateliers pratiques en entreprise (leadership, gestion, tech)',
        'Accompagnement pédagogique et e-learning'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },
    {
      id: 'engineering',
      name: 'IROKO Engineering',
      family: 'fam1',
      familyName: 'Famille Business',
      icon: Cpu,
      tagline: 'Ingénierie technique de pointe & projets de construction durables',
      desc: 'Conception, dimensionnement et déploiement de solutions d’ingénierie avancées, recherche & développement et projets de construction d’infrastructures techniques.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      services: [
        'Études techniques et audits de systèmes complexes',
        'Conception et dimensionnement d’infrastructures techniques',
        'Assistance à maîtrise d’ouvrage (AMO) & gestion de projets',
        'Recherche & Développement appliquée'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },

    // Famille 2 : Digital
    {
      id: 'app',
      name: 'IROKO App',
      family: 'fam2',
      familyName: 'Famille Digital',
      icon: Laptop,
      tagline: 'Développement d’applications mobiles & plateformes logicielles',
      desc: 'Création d’applications iOS, Android et solutions web scalables, alliant performance technique, ergonomie intuitive et design centré utilisateur.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
      services: [
        'Développement d’applications mobiles natives et cross-platform',
        'Conception de portails web et plateformes SaaS sur-mesure',
        'UI/UX design ergonomique et prototypage interactif',
        'Maintenance évolutive et monitoring applicatif'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },
    {
      id: 'gestion',
      name: 'IROKO Gestion & Compta',
      family: 'fam2',
      familyName: 'Famille Digital',
      icon: Calculator,
      tagline: 'Logiciels de gestion financière & comptabilité intelligente',
      desc: 'Outils et solutions logicielles dédiés à la simplification de la comptabilité, de la facturation, du suivi de trésorerie et de la gestion administrative des PME.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
      services: [
        'Logiciel de facturation, devis et suivi des créances',
        'Tenue comptable simplifiée et conformité fiscale automatisée',
        'Gestion de la paie et des déclarations sociales',
        'Tableaux de bord financiers et pilotage en temps réel'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },
    {
      id: 'cloud',
      name: 'IROKO Cloud',
      family: 'fam2',
      familyName: 'Famille Digital',
      icon: Layers,
      tagline: 'Infrastructure cloud haute disponibilité & infogérance',
      desc: 'Hébergement sécurisé, architectures cloud résilientes, infogérance 24/7 et automatisation DevOps pour garantir la continuité opérationnelle de vos outils.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      services: [
        'Hébergement cloud haute performance et sauvegardes souveraines',
        'Déploiement DevOps et intégration continue (CI/CD)',
        'Infogérance et supervision proactive 24h/24 et 7j/7',
        'Migration d’infrastructures vers le cloud'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },

    // Famille 3 : Services & Support
    {
      id: 'studio',
      name: 'IROKO Studio',
      family: 'fam3',
      familyName: 'Famille Services & Support',
      icon: Film,
      tagline: 'Production audiovisuelle, photographie & création multimédia',
      desc: 'Studio créatif dédié à la capture de vos moments forts, production de films institutionnels, motion design, podcasts et contenus de marque à fort impact émotionnel.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
      services: [
        'Captation vidéo multi-caméras 4K et direct streaming',
        'Films institutionnels, spots publicitaires et documentaires',
        'Shooting photographique corporate et produits',
        'Motion design 2D/3D et identités animées'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },
    {
      id: 'security',
      name: 'IROKO Security',
      family: 'fam3',
      familyName: 'Famille Services & Support',
      icon: Shield,
      tagline: 'Cybersécurité, audit de systèmes & protection des données',
      desc: 'Protection intégrale des actifs numériques, audits de sécurité, tests d’intrusion, conformité réglementaire (RGPD) et sensibilisation des collaborateurs.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
      services: [
        'Audits de cybersécurité et tests d’intrusion (pentests)',
        'Sécurisation des réseaux, serveurs et postes de travail',
        'Conformité protection des données et gouvernance de la sécurité',
        'Sensibilisation des équipes contre le phishing et l’ingénierie sociale'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    },
    {
      id: 'ventures',
      name: 'IROKO Ventures',
      family: 'fam3',
      familyName: 'Famille Services & Support',
      icon: Rocket,
      tagline: 'Incubation, investissement & accélération d’initiatives audacieuses',
      desc: 'Pôle d’investissement et d’accompagnement stratégique du groupe : soutien aux projets innovants, synergie d’écosystème et création de valeur entrepreneuriale.',
      status: 'À venir',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
      services: [
        'Incubation et mentorat stratégique pour porteurs de projets',
        'Financement d’amorçage et prise de participation ciblée',
        'Accès au réseau d’affaires, synergies transversales du groupe',
        'Structuration juridique, financière et levée de fonds'
      ],
      ctaText: 'Partenariat / Information',
      ctaLink: '/contact',
      badgeColor: 'bg-white/10 text-white/70'
    }
  ];

  const filteredPoles = polesData.filter(pole => {
    const matchesFamily = activeFamily === 'all' || pole.family === activeFamily;
    const matchesSearch = pole.name.toLowerCase().includes(search.toLowerCase()) ||
                          pole.tagline.toLowerCase().includes(search.toLowerCase()) ||
                          pole.desc.toLowerCase().includes(search.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-bg text-fg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-tint border border-line/12 text-primary font-mono text-xs uppercase tracking-widest mb-4 rounded-full">
            <Sparkles size={14} className="text-accent" />
            DIX PÔLES, DONT LA HOLDING
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-fg">
            Nos 9 Pôles <span className="font-cursive text-gradient-violet-orange normal-case lowercase font-normal">d'activité</span>
          </h1>
          <p className="text-lg text-fg-muted font-light leading-relaxed">
            Découvrez ce que fait chaque pôle, son public cible et ses domaines d’intervention. Une holding centrale et trois familles complémentaires pour répondre à tous vos enjeux.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-surface p-4 border border-line/12 rounded-2xl shadow-sm backdrop-blur-md">
          {/* Family Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveFamily('all')}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-full",
                activeFamily === 'all' 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "bg-bg-alt text-fg-muted hover:text-fg hover:bg-bg-alt/80"
              )}
            >
              Tous les pôles (9)
            </button>
            <button
              onClick={() => setActiveFamily('fam1')}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm",
                activeFamily === 'fam1' 
                  ? "bg-primary text-primary-on shadow-lg shadow-primary/30" 
                  : "bg-bg-alt text-fg-muted hover:text-fg hover:bg-bg-alt/80 border border-line/12"
              )}
            >
              Famille Business (3)
            </button>
            <button
              onClick={() => setActiveFamily('fam2')}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm",
                activeFamily === 'fam2' 
                  ? "bg-primary text-primary-on shadow-lg shadow-primary/30" 
                  : "bg-bg-alt text-fg-muted hover:text-fg hover:bg-bg-alt/80 border border-line/12"
              )}
            >
              Famille Digital (3)
            </button>
            <button
              onClick={() => setActiveFamily('fam3')}
              className={cn(
                "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-sm",
                activeFamily === 'fam3' 
                  ? "bg-primary text-primary-on shadow-lg shadow-primary/30" 
                  : "bg-bg-alt text-fg-muted hover:text-fg hover:bg-bg-alt/80 border border-line/12"
              )}
            >
              Services & Support (3)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" size={16} />
            <input
              type="text"
              placeholder="Rechercher un pôle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-line/12 pl-9 pr-4 py-2 text-xs text-fg placeholder:text-fg-muted/60 focus:outline-none focus:border-primary transition-colors rounded-sm"
            />
          </div>
        </div>

        {/* Operational Focus Banner (IROKO Event) */}
        <div className="mb-12 p-6 md:p-8 bg-surface-tint border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 rounded-sm">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-widest mb-1.5 border border-emerald-500/30">
                Pôle Opérationnel Actif
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase text-fg">IROKO EVENT — Agence de communication 360°</h3>
              <p className="text-fg-muted text-sm mt-1 max-w-2xl">
                Le pôle événementiel et communication du groupe est déjà opérationnel pour vos projets : stratégie de communication, branding, sites internet, production et régie d’événements d’entreprise.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/tarifs"
              className="flex-1 md:flex-initial text-center px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 rounded-sm"
            >
              Consulter les Tarifs
            </Link>
            <Link
              to="/contact"
              className="flex-1 md:flex-initial text-center px-5 py-2.5 bg-surface hover:bg-bg-alt text-fg font-bold text-xs uppercase tracking-wider transition-colors border border-line/12 rounded-sm shadow-sm"
            >
              Demander un Devis
            </Link>
          </div>
        </div>

        {/* Poles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoles.map((pole) => {
            const IconComponent = pole.icon || Briefcase;
            return (
              <motion.div
                key={pole.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "group relative bg-surface border transition-all duration-300 flex flex-col justify-between overflow-hidden rounded-2xl shadow-sm",
                  pole.status === 'Opérationnel' 
                    ? "border-emerald-500/50 hover:border-emerald-400" 
                    : "border-line/12 hover:border-primary/50"
                )}
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pole.image}
                    alt={pole.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={cn(
                      "px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest shadow-md rounded-full",
                      pole.badgeColor
                    )}>
                      {pole.status}
                    </span>
                  </div>

                  {/* Family Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white/80 font-mono text-[10px] uppercase tracking-wider rounded-full">
                      {pole.familyName}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-primary">
                      <IconComponent size={18} />
                    </div>
                    <h3 className="text-xl font-black uppercase text-white tracking-wide">
                      {pole.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      {pole.tagline}
                    </p>
                    <p className="text-sm text-fg-muted line-clamp-3 mb-6 leading-relaxed">
                      {pole.desc}
                    </p>

                    <div className="space-y-2 mb-6 border-t border-line/12 pt-4">
                      <span className="text-[11px] font-mono text-fg-muted uppercase tracking-widest block">Domaines d’intervention :</span>
                      {pole.services.slice(0, 3).map((srv, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-fg">
                          <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPole(pole)}
                      className="flex-1 py-2.5 px-3 bg-white/5 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-colors text-center border border-white/10"
                    >
                      Détails de la fiche
                    </button>
                    <Link
                      to={pole.ctaLink}
                      className={cn(
                        "py-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 rounded-sm",
                        pole.status === 'Opérationnel'
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : "bg-primary hover:bg-primary-hover text-primary-on"
                      )}
                    >
                      <span>{pole.status === 'Opérationnel' ? 'Tarifs' : 'Contact'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Drawer Details */}
        <AnimatePresence>
          {selectedPole && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border border-line/12 max-w-2xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl text-fg"
              >
                <button
                  onClick={() => setSelectedPole(null)}
                  className="absolute top-6 right-6 text-fg-muted hover:text-fg transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-bg-alt text-fg-muted border border-line/12 font-mono text-[10px] uppercase rounded-sm">
                    {selectedPole.familyName}
                  </span>
                  <span className={cn("px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase rounded-sm", selectedPole.badgeColor)}>
                    {selectedPole.status}
                  </span>
                </div>

                <h2 className="text-3xl font-black uppercase text-fg mb-2">
                  {selectedPole.name}
                </h2>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
                  {selectedPole.tagline}
                </p>

                <p className="text-fg-muted text-sm leading-relaxed mb-6">
                  {selectedPole.desc}
                </p>

                <div className="bg-bg-alt border border-line/12 p-5 mb-8 rounded-sm">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-fg-muted mb-4">
                    Catalogue des prestations & expertises :
                  </h4>
                  <ul className="space-y-3">
                    {selectedPole.services.map((srv: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-fg">
                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    to={selectedPole.ctaLink}
                    onClick={() => setSelectedPole(null)}
                    className={cn(
                      "w-full sm:flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-colors rounded-sm",
                      selectedPole.status === 'Opérationnel'
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                        : "bg-primary hover:bg-primary-hover text-primary-on"
                    )}
                  >
                    {selectedPole.ctaText}
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setSelectedPole(null)}
                    className="w-full sm:flex-1 py-3 bg-surface hover:bg-bg-alt text-fg text-xs font-bold uppercase tracking-wider text-center transition-colors border border-line/12 rounded-sm shadow-sm"
                  >
                    Poser une question au groupe
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Structure Link Footer */}
        <div className="mt-20 p-8 border border-white/10 bg-white/[0.02] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-black uppercase text-white mb-2">
              Comment ces 9 pôles s’articulent-ils ?
            </h4>
            <p className="text-sm text-white/60 max-w-xl">
              Découvrez l'organisation en holding centrale et les synergies entre nos 3 familles sectorielles dans notre section structure.
            </p>
          </div>
          <Link
            to="/structure"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20 flex items-center gap-2 shrink-0"
          >
            <span>Voir notre organisation</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
