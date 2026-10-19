import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Calendar, Layers, CheckCircle2, ShieldCheck, 
  Clock, Quote, Building, Compass, PhoneCall, Check, Tag, ArrowUpRight, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger, useGSAP } from '../motion/gsap';
import { cn } from '@/src/lib/utils';
import { useTranslation } from 'react-i18next';
import FamiliesSection from '../components/FamiliesSection';
import MethodSection from '../components/MethodSection';
import StatsAndEventSection from '../components/StatsAndEventSection';

const poleShowcase = [
  { 
    id: 'event',
    name: 'IROKO Event', 
    categoryKey: 'home.famBusinessTitle',
    categoryFallback: 'Famille Business',
    statusKey: 'common.operational',
    statusFallback: 'Opérationnel',
    desc: 'Agence de communication 360°, conseil en stratégie de marque, régie événementielle et production.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    link: '/poles'
  },
  { 
    id: 'academia',
    name: 'IROKO Academia', 
    categoryKey: 'home.famBusinessTitle',
    categoryFallback: 'Famille Business',
    statusKey: 'common.upcoming',
    statusFallback: 'À venir',
    desc: 'Formations professionnelles certifiantes, masterclasses exécutives et ateliers pour dirigeants.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    link: '/poles'
  },
  { 
    id: 'engineering',
    name: 'IROKO Engineering', 
    categoryKey: 'home.famBusinessTitle',
    categoryFallback: 'Famille Business',
    statusKey: 'common.upcoming',
    statusFallback: 'À venir',
    desc: 'Ingénierie technique, conception de systèmes et solutions industrielles pérennes.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    link: '/poles'
  },
  { 
    id: 'app',
    name: 'IROKO App', 
    categoryKey: 'home.famDigitalTitle',
    categoryFallback: 'Famille Digital',
    statusKey: 'common.upcoming',
    statusFallback: 'À venir',
    desc: 'Développement d’applications mobiles et web modernes, architecture logicielle et UX/UI soignée.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    link: '/poles'
  },
  { 
    id: 'gestion',
    name: 'IROKO Gestion & Compta', 
    categoryKey: 'home.famDigitalTitle',
    categoryFallback: 'Famille Digital',
    statusKey: 'common.upcoming',
    statusFallback: 'À venir',
    desc: 'Logiciels de gestion comptable, facturation, suivi de trésorerie et pilotage administratif d’entreprise.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    link: '/poles'
  },
  { 
    id: 'cloud',
    name: 'IROKO Cloud', 
    categoryKey: 'home.famDigitalTitle',
    categoryFallback: 'Famille Digital',
    statusKey: 'common.upcoming',
    statusFallback: 'À venir',
    desc: 'Hébergement cloud haute performance, DevOps, infogérance et continuité d’activité sécurisée.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    link: '/poles'
  },
];

const testimonials = [
  {
    name: "Dr. Paul M.",
    role: "Directeur de Cabinet — Conférence Panafricaine",
    text: "La prestation d’IROKO Event pour notre sommet annuel a été irréprochable. Conseil en communication, scénographie et ponctualité exemplaire.",
    city: "Yaoundé"
  },
  {
    name: "Sandrine E.",
    role: "Directrice Générale d'Entreprise",
    text: "La clarté des tarifs et le sérieux de la méthode IROKO nous ont totalement convaincus. Une équipe d’une grande rigueur professionnelle.",
    city: "Douala"
  },
  {
    name: "Marc V.",
    role: "Partenaire Institutionnel",
    text: "Une holding structurée, incarnant les vraies valeurs de l'Iroko : vision à long terme, rigueur et complémentarité stratégique des pôles.",
    city: "Paris / Berlin"
  }
];

const internationalHubs = [
  { city: 'Douala', flag: '🇨🇲', role: 'Pôle Opérationnel IROKO Event' },
  { city: 'Yaoundé', flag: '🇨🇲', role: 'Direction & Représentation' },
  { city: 'Paris', flag: '🇫🇷', role: 'Partenariats & Réseau International' },
  { city: 'Berlin', flag: '🇩🇪', role: 'Structuration Holding (UG / GmbH)' },
  { city: 'Francfort', flag: '🇩🇪', role: 'Pôle d’Affaires & Écosystème' },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const showreelVideoRef = useRef<HTMLVideoElement>(null);
  const polesVideoRef = useRef<HTMLVideoElement>(null);



  useGSAP(() => {
    const mm = gsap.matchMedia(containerRef);

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        '.hero-title-line',
        '.hero-element',
        '.approach-card',
        '.category-card',
        '.service-card',
        '.testimonial-card',
        '.stat-number'
      ], { opacity: 1, y: 0, x: 0 });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.hero-title-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power4.out',
          stagger: 0.1,
          delay: 0.1,
        }
      );

      gsap.fromTo(
        '.hero-element',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.3,
        }
      );



      // Approaches section divider line
      gsap.fromTo(
        '.approach-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.approaches-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Cards reveal
      gsap.fromTo(
        '.approach-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.approaches-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Showcase batch entrance
      ScrollTrigger.batch('.category-card', {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.08,
            }
          );
        },
      });

      // Cinematic Full-Width Showreel Video ScrollTrigger Animation
      if (showreelVideoRef.current) {
        const videoEl = showreelVideoRef.current;
        const videoWrapper = videoEl.closest<HTMLElement>('.showreel-frame');

        // Ensure video starts playing immediately
        videoEl.play().catch(() => {});

        if (videoWrapper) {
          // Smooth scrub expanding to full-screen width with unmasking
          gsap.fromTo(
            videoWrapper,
            {
              scale: 0.94,
              borderRadius: '28px',
              opacity: 0.9,
            },
            {
              scale: 1,
              borderRadius: '0px',
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.showreel-section',
                start: 'top 85%',
                end: 'top 25%',
                scrub: 0.6,
              },
            }
          );
        }

        // Keep video playing continuously while anywhere in viewport (from top bottom to bottom top)
        ScrollTrigger.create({
          trigger: '.showreel-section',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => {
            videoEl.play().catch(() => {});
          },
          onEnterBack: () => {
            videoEl.play().catch(() => {});
          },
          onLeave: () => {
            videoEl.pause();
          },
          onLeaveBack: () => {
            videoEl.pause();
          },
        });
      }

      // Poles Video Section — cinematic entrance (mirrors showreel pattern)
      if (polesVideoRef.current) {
        const polesEl = polesVideoRef.current;
        const polesWrapper = polesEl.closest<HTMLElement>('.poles-video-frame');

        polesEl.play().catch(() => {});

        if (polesWrapper) {
          gsap.fromTo(
            polesWrapper,
            { scale: 0.94, borderRadius: '28px', opacity: 0.9 },
            {
              scale: 1,
              borderRadius: '0px',
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.poles-video-section',
                start: 'top 85%',
                end: 'top 25%',
                scrub: 0.6,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: '.poles-video-section',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => { polesEl.play().catch(() => {}); },
          onEnterBack: () => { polesEl.play().catch(() => {}); },
          onLeave: () => { polesEl.pause(); },
          onLeaveBack: () => { polesEl.pause(); },
        });

        // Staggered text reveal above the video
        gsap.fromTo(
          '.poles-video-label',
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.13,
            scrollTrigger: {
              trigger: '.poles-video-section',
              start: 'top 78%',
              once: true,
            },
          }
        );
      }

      // Hubs Marquee
      if (marqueeRef.current) {
        const marqueeTrack = marqueeRef.current.querySelector<HTMLElement>('.marquee-track');
        if (marqueeTrack) {
          const marqueeTween = gsap.to(marqueeTrack, {
            xPercent: -50,
            repeat: -1,
            duration: 26,
            ease: 'none',
          });

          ScrollTrigger.create({
            trigger: '.network-section',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const velocity = Math.abs(self.getVelocity() / 350);
              const targetTimeScale = Math.min(Math.max(1, 1 + velocity), 3.5);
              gsap.to(marqueeTween, { timeScale: targetTimeScale, duration: 0.25, overwrite: 'auto' });
              gsap.to(marqueeTween, { timeScale: 1, duration: 0.8, delay: 0.2, overwrite: false });
            },
          });

          marqueeTrack.addEventListener('mouseenter', () => marqueeTween.pause());
          marqueeTrack.addEventListener('mouseleave', () => marqueeTween.play());
        }
      }

      // Logo Showcase GSAP Animation (ScrollTrigger + 3D Tilt)
      const logoStage = containerRef.current?.querySelector<HTMLElement>('.logo-showcase-stage');
      const logoImg = containerRef.current?.querySelector<HTMLElement>('.logo-showcase-img');
      const logoGlow = containerRef.current?.querySelector<HTMLElement>('.logo-showcase-glow');
      const logoFeatures = containerRef.current?.querySelectorAll<HTMLElement>('.logo-feature-card');

      if (logoStage && logoImg) {
        // Entrance animation on scroll
        gsap.fromTo(
          logoImg,
          { scale: 0.8, opacity: 0, y: 40, rotateY: -10 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.logo-showcase-section',
              start: 'top 75%',
              once: true,
            },
          }
        );

        // Continuous subtle pulsing light
        if (logoGlow) {
          gsap.to(logoGlow, {
            scale: 1.15,
            opacity: 0.75,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Staggered reveal of description cards
        if (logoFeatures && logoFeatures.length > 0) {
          gsap.fromTo(
            logoFeatures,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.logo-showcase-section',
                start: 'top 70%',
                once: true,
              },
            }
          );
        }

        // Interactive 3D cursor tilt effect
        const onStageMouseMove = (e: MouseEvent) => {
          const rect = logoStage.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(logoImg, {
            rotateY: x * 18,
            rotateX: -y * 18,
            scale: 1.05,
            duration: 0.45,
            ease: 'power2.out',
            transformPerspective: 800,
          });
        };

        const onStageMouseLeave = () => {
          gsap.to(logoImg, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.75,
            ease: 'elastic.out(1, 0.4)',
          });
        };

        logoStage.addEventListener('mousemove', onStageMouseMove);
        logoStage.addEventListener('mouseleave', onStageMouseLeave);
      }

      // Magnetic CTA Button
      const btn = magneticBtnRef.current;
      if (!btn) return;

      const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power3' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power3' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.25);
        yTo(relY * 0.25);
      };

      const onMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      };

      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);

      return () => {
        btn.removeEventListener('mousemove', onMouseMove);
        btn.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [i18n.language] });

  return (
    <div ref={containerRef} className="overflow-hidden bg-bg text-fg">
      {/* HERO SECTION (Basel Area Inspired) */}
      <section className="hero-section relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0B14] pb-12 lg:pb-16">
        {/* Full-bleed photography (corporate leadership at right, darkened at left) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=2560"
            alt="Groupe IROKO Partenariats & Synergies"
            className="w-full h-full object-cover object-[75%_center]"
          />
          {/* Subtle directional gradients for clear contrast */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(10,11,20,0.88) 0%, rgba(10,11,20,0.65) 45%, rgba(10,11,20,0.2) 75%, rgba(10,11,20,0.1) 100%)'
            }}
          />
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(10,11,20,0.75) 0%, rgba(10,11,20,0.2) 30%, transparent 50%)'
            }}
          />
        </div>

        {/* Hero Content: comfortable pt padding, sitting cleanly above the fold */}
        <div className="w-full max-w-[1840px] mx-auto px-6 md:px-[52px] pt-[135px] md:pt-[150px] lg:pt-[160px] relative z-20 flex flex-col items-start text-left select-none">
          
          {/* Main Title: clean neo-grotesque clamp, tight line-height, perfectly balanced */}
          <h1 
            className="text-white font-normal text-left tracking-[-0.02em] leading-[0.96] m-0"
            style={{ fontSize: 'clamp(36px, 6.2vw, 102px)' }}
          >
            {/* Line 1 */}
            <span className="block whitespace-nowrap overflow-hidden hero-title-line">
              <span>{t('hero.titleLine1', 'Construire')}</span>
            </span>

            {/* Line 2 avec le logo officiel IROKO (taille légèrement au-dessus de celle du header) */}
            <span className="block whitespace-nowrap overflow-hidden hero-title-line">
              <span className="flex items-center">
                <span className="inline-flex items-center mr-4 sm:mr-6 md:mr-8 shrink-0">
                  <img
                    src="https://res.cloudinary.com/dtntkknaq/image/upload/v1792317987/IROKO_logo_zebpga.png"
                    alt="Logo IROKO"
                    className="h-[58px] sm:h-[72px] md:h-[84px] lg:h-[94px] w-auto max-w-[280px] object-contain inline-block align-middle filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
                  />
                </span>
                <span>{t('hero.titleLine2', 'aujourd’hui')}</span>
              </span>
            </span>

            {/* Line 3 */}
            <span className="block whitespace-nowrap overflow-hidden hero-title-line">
              <span>{t('hero.titleLine3', 'les entreprises')}</span>
            </span>

            {/* Line 4 */}
            <span className="block whitespace-nowrap overflow-hidden hero-title-line">
              <span>{t('hero.titleLine4', 'de demain.')}</span>
            </span>
          </h1>

          {/* Subtitle: directly visible above fold, responsive size */}
          <p className="hero-element mt-6 md:mt-8 text-white/85 font-normal text-[17px] md:text-[20px] leading-relaxed max-w-[620px] text-left">
            {t('hero.desc')}
          </p>
        </div>

        {/* Bottom Bar: Action Button on bottom-right + discreet cookie control */}
        <div className="w-full max-w-[1840px] mx-auto px-6 md:px-[52px] relative z-30 flex items-end justify-between mt-8">
          {/* Subtle discrete cookie preferences control */}
          <button
            type="button"
            onClick={() => alert('Gestion des cookies IROKO : Vos préférences sont appliquées avec succès.')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white/70 hover:text-white text-xs transition-colors cursor-pointer"
            title="Préférences cookies"
          >
            <span>🍪</span>
            <span className="hidden sm:inline">Cookies</span>
          </button>

          {/* Basel Area action button: violet pill + circle with arrow ↗ */}
          <Link
            to="/poles"
            className="inline-flex items-center group cursor-pointer shadow-2xl"
          >
            <span className="h-[54px] md:h-[60px] px-6 md:px-8 bg-[#531FF5] text-white font-medium text-[15px] md:text-[16px] rounded-l-full flex items-center justify-center transition-colors duration-200 group-hover:bg-[#4314d6]">
              {t('hero.btnPoles')}
            </span>
            <span className="w-[54px] md:h-[60px] h-[54px] bg-[#531FF5] text-white rounded-r-full flex items-center justify-center border-l border-white/20 transition-colors duration-200 group-hover:bg-[#4314d6]">
              <ArrowRight size={22} className="text-white transform -rotate-45" />
            </span>
          </Link>
        </div>
      </section>

      {/* SECTION A : STATS + MISE EN AVANT IROKO EVENT */}
      <StatsAndEventSection />

      {/* LES 3 FAMILLES DE PÔLES SECTION */}
      <FamiliesSection />

      {/* SHOWCASE DES PÔLES */}
      <section className="py-20 md:py-24 px-6 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
                {t('poles.badge')}
              </span>
              <h2 className="text-3xl md:text-5xl font-medium mb-3 text-fg">
                {t('poles.title')}
              </h2>
              <p className="text-fg-muted max-w-md text-sm">{t('poles.subtitle')}</p>
            </div>
            {/* Resolved translation key */}
            <Link to="/poles" className="text-primary-text hover:text-[#FF8500] font-semibold uppercase tracking-wider text-xs flex items-center gap-2 group transition-colors">
              {t('common.seeAll')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poleShowcase.map((pole, i) => (
              <Link key={i} to="/poles" className="category-card group relative h-96 overflow-hidden rounded-2xl border border-white/10">
                <img 
                  src={pole.image} 
                  alt={pole.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/40 to-transparent group-hover:from-[#531FF5]/90 transition-colors duration-500" />
                
                <div className="absolute top-4 right-4 z-10">
                  <span className={cn(
                    "px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border",
                    pole.statusKey === 'common.operational'
                      ? "bg-[#10B981] text-white border-transparent"
                      : "bg-black/60 text-white/80 border-white/20"
                  )}>
                    {t(pole.statusKey, pole.statusFallback)}
                  </span>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <span className="text-xs uppercase tracking-wider text-white/70 mb-1">
                    {t(pole.categoryKey, pole.categoryFallback)}
                  </span>
                  <h4 className="text-2xl font-semibold leading-tight group-hover:translate-y-[-4px] transition-transform duration-300 text-white mb-2">
                    {pole.name}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {pole.desc}
                  </p>
                  <div className="w-0 group-hover:w-10 h-0.5 bg-[#FF8500] transition-all duration-300 mt-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION SHOWREEL PLEIN ÉCRAN ANIMÉE AVEC GSAP (DIRECTEMENT APRÈS LES PÔLES) */}
      <section className="showreel-section w-full bg-bg pt-8 pb-16 md:pb-24 overflow-hidden relative">
        <div className="w-full mx-auto px-0">
          {/* Header minimaliste et élégant */}
          <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-1.5 block">
                IROKO Motion & Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-fg">
                L'Excellence Opérationnelle en Mouvement
              </h3>
            </div>
            <span className="text-xs font-mono text-fg-muted tracking-widest uppercase">
              Showreel Officiel 2026
            </span>
          </div>

          {/* Cadre vidéo pleine largeur animé au scroll avec GSAP */}
          <div className="showreel-frame w-full max-w-full overflow-hidden border-y border-line/12 bg-black shadow-2xl relative">
            <video
              ref={showreelVideoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-auto aspect-video max-h-[82vh] object-cover pointer-events-none"
            >
              <source 
                src="https://res.cloudinary.com/dtntkknaq/video/upload/v1792318859/IROKO-Showreel-2026_1_njl3pg.mp4" 
                type="video/mp4" 
              />
              Votre navigateur ne supporte pas la lecture vidéo directe.
            </video>

            {/* Vignette subtile en haut et bas pour une intégration harmonieuse */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/30" />
          </div>
        </div>
      </section>

      {/* TARIFS IROKO EVENT PREVIEW */}
      <section className="py-20 md:py-24 px-6 bg-bg-alt border-t border-line/12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
                {t('pricing.badge')} • IROKO EVENT
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mb-3 text-fg">
                {t('pricing.packsTitle')}
              </h2>
              <p className="text-fg-muted max-w-xl text-sm leading-relaxed">
                {t('pricing.subtitle')}
              </p>
            </div>
            <Link 
              to="/tarifs" 
              className="text-fg hover:text-[#FF8500] font-semibold uppercase tracking-wider text-xs flex items-center gap-2 group transition-colors py-2.5 px-5 rounded-full border border-line/20 hover:border-[#FF8500] bg-surface shadow-sm"
            >
              Voir la grille complète & options <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Transparence notice */}
          <div className="p-4 bg-surface border border-line/12 rounded-xl mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#10B981] shrink-0" />
              <span className="text-xs text-fg">
                {t('pricing.customNotice')}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-fg-muted font-medium shrink-0">
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#FF8500]" /> Devis 48h</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#10B981]" /> Tarifs clairs HT</span>
            </div>
          </div>

          {/* Grille des 3 packs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
            {/* Pack 1 */}
            <div className="bg-surface border border-line/12 p-8 rounded-2xl flex flex-col justify-between hover:border-primary/50 shadow-sm transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted bg-bg-alt px-2.5 py-1 rounded-md">
                    Essentiel Corporate
                  </span>
                  <span className="text-xs font-mono text-primary font-semibold">01</span>
                </div>
                <h3 className="text-2xl font-semibold text-fg mb-2">{t('pricing.pack1.name')}</h3>
                <p className="text-xs text-fg-muted mb-6 leading-relaxed min-h-[40px]">{t('pricing.pack1.desc')}</p>

                <div className="mb-6 pb-6 border-b border-line/12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-fg font-mono">{t('pricing.pack1.price')}</span>
                    <span className="text-xs text-fg-muted">{t('pricing.pack1.unit')}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    t('pricing.pack1.feat1'),
                    t('pricing.pack1.feat2'),
                    t('pricing.pack1.feat3'),
                    t('pricing.pack1.feat4'),
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-fg">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact?pack=presence"
                className="w-full text-center py-3.5 border border-line/20 hover:border-fg text-fg font-semibold text-xs rounded-full transition-colors block"
              >
                {t('pricing.btnChoosePack')}
              </Link>
            </div>

            {/* Pack 2 - Recommandé */}
            <div className="bg-surface border-2 border-[#531FF5] p-8 rounded-2xl flex flex-col justify-between shadow-xl relative scale-100 lg:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#531FF5] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-0.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#FF8500]" />
                Recommandé
              </div>

              <div>
                <div className="flex justify-between items-center mb-3 mt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-text bg-[#531FF5]/10 px-2.5 py-1 rounded-md">
                    Standard d'Excellence
                  </span>
                  <span className="text-xs font-mono text-primary font-semibold">02</span>
                </div>
                <h3 className="text-2xl font-semibold text-fg mb-2">{t('pricing.pack2.name')}</h3>
                <p className="text-xs text-fg-muted mb-6 leading-relaxed min-h-[40px]">{t('pricing.pack2.desc')}</p>

                <div className="mb-6 pb-6 border-b border-line/12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-fg font-mono">{t('pricing.pack2.price')}</span>
                    <span className="text-xs text-fg-muted">{t('pricing.pack2.unit')}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    t('pricing.pack2.feat1'),
                    t('pricing.pack2.feat2'),
                    t('pricing.pack2.feat3'),
                    t('pricing.pack2.feat4'),
                    'Assistance régie technique et tests préalables',
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-fg">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact?pack=evenement"
                className="w-full text-center py-3.5 bg-[#531FF5] hover:bg-[#4314d6] text-white font-semibold text-xs rounded-full transition-colors shadow-lg shadow-[#531FF5]/25 block"
              >
                {t('pricing.btnChoosePack')}
              </Link>
            </div>

            {/* Pack 3 */}
            <div className="bg-surface border border-line/12 p-8 rounded-2xl flex flex-col justify-between hover:border-primary/50 shadow-sm transition-all duration-300">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted bg-bg-alt px-2.5 py-1 rounded-md">
                    Grands Déploiements
                  </span>
                  <span className="text-xs font-mono text-primary font-semibold">03</span>
                </div>
                <h3 className="text-2xl font-semibold text-fg mb-2">{t('pricing.pack3.name')}</h3>
                <p className="text-xs text-fg-muted mb-6 leading-relaxed min-h-[40px]">{t('pricing.pack3.desc')}</p>

                <div className="mb-6 pb-6 border-b border-line/12">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-fg font-mono">{t('pricing.pack3.price')}</span>
                    <span className="text-xs text-fg-muted">{t('pricing.pack3.unit')}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    t('pricing.pack3.feat1'),
                    t('pricing.pack3.feat2'),
                    t('pricing.pack3.feat3'),
                    t('pricing.pack3.feat4'),
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-fg">
                      <Check size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact?pack=surmesure"
                className="w-full text-center py-3.5 border border-line/20 hover:border-fg text-fg font-semibold text-xs rounded-full transition-colors block"
              >
                {t('pricing.btnCustomQuote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RAYONNEMENT & HUBS STRATÉGIQUES (Douala, Yaoundé, Paris, Berlin, Francfort) */}
      <section className="network-section py-20 px-6 bg-bg border-t border-line/12 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12">
          <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
            Présence & Hubs
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-3 text-fg">
            Un Rayonnement Panafricain & International
          </h2>
          <p className="text-fg-muted max-w-xl text-sm">
            L'ancrage territorial au Cameroun conjugué à des relais institutionnels en Europe pour bâtir des synergies solides.
          </p>
        </div>

        {/* Marquee des hubs */}
        <div ref={marqueeRef} className="relative w-full overflow-hidden select-none py-2">
          <div className="marquee-track flex gap-6 w-max will-change-transform cursor-grab active:cursor-grabbing">
            {[...internationalHubs, ...internationalHubs].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "w-64 shrink-0 bg-surface p-6 border border-line/12 rounded-2xl flex flex-col items-center text-center group hover:border-[#531FF5]/60 shadow-sm transition-all duration-300",
                  item.city === 'Douala' && "border-[#531FF5]/40 bg-[#531FF5]/10"
                )}
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{item.flag}</span>
                <h4 className="text-base font-semibold text-fg mb-1">{item.city}</h4>
                <p className="text-xs text-fg-muted leading-tight">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION IDENTITÉ & SYMBOLE TECHNOLOGIQUE IROKO (ANIMÉE AVEC GSAP) */}
      <section className="logo-showcase-section py-24 px-6 bg-bg-alt border-t border-line/12 relative overflow-hidden">
        {/* Ambient lighting effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#531FF5]/20 via-[#8B66FF]/15 to-[#FF8500]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
              Symbole & Identité de Marque
            </span>
            <h2 className="text-3xl md:text-5xl font-medium mb-4 text-fg">
              L'Emblème Technologique IROKO
            </h2>
            <p className="text-fg-muted max-w-2xl mx-auto text-base font-light leading-relaxed">
              Une architecture visuelle inspirée de l'arbre séculaire : le tronc unificateur, les ramifications opérationnelles et le point orange de connexion technologique.
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#531FF5] via-[#8B66FF] to-[#FF8500] mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* GSAP 3D Interactive Stage (Logo Hero) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="logo-showcase-stage relative w-full max-w-[560px] aspect-[4/3] rounded-3xl bg-surface border border-line/12 p-8 sm:p-12 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] cursor-pointer group backdrop-blur-xl">
                {/* Pulsing ambient aura */}
                <div className="logo-showcase-glow absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#531FF5]/25 via-transparent to-[#FF8500]/25 blur-2xl opacity-50 pointer-events-none" />
                
                {/* Technological Logo Image */}
                <img
                  src="https://res.cloudinary.com/dtntkknaq/image/upload/v1792318421/Logo_technologique_IROKO_violet_et_orange_dfh6o4.png"
                  alt="Emblème Technologique IROKO"
                  className="logo-showcase-img relative z-10 max-h-[220px] sm:max-h-[270px] w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(83,31,245,0.35)]"
                />

                {/* Subtitle badge */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-fg-muted border-t border-line/12 pt-3 font-mono">
                  <span>IROKO Brand Symbol</span>
                  <span className="flex items-center gap-1.5 text-[#FF8500]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-ping" />
                    Interactif 3D GSAP
                  </span>
                </div>
              </div>
            </div>

            {/* Pillar Breakdown Cards (Animated with GSAP) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="logo-feature-card bg-surface border border-line/12 p-6 rounded-2xl hover:border-[#531FF5]/50 shadow-sm transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#531FF5]/10 flex items-center justify-center text-primary font-mono text-xs font-bold">
                    01
                  </div>
                  <h4 className="text-lg font-semibold text-fg">Le Tronc & La Holding</h4>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed font-light">
                  La structure centrale qui unifie, sécurise et alloue les ressources pour soutenir durablement chaque pôle du Groupe.
                </p>
              </div>

              <div className="logo-feature-card bg-surface border border-line/12 p-6 rounded-2xl hover:border-[#8B66FF]/50 shadow-sm transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8B66FF]/20 flex items-center justify-center text-primary font-mono text-xs font-bold">
                    02
                  </div>
                  <h4 className="text-lg font-semibold text-fg">Les Branches d'Activité</h4>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed font-light">
                  Neuf entités expertes réparties en trois familles complémentaires (Business, Digital, Services) pour répondre aux projets les plus exigeants.
                </p>
              </div>

              <div className="logo-feature-card bg-surface border border-line/12 p-6 rounded-2xl hover:border-[#FF8500]/50 shadow-sm transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF8500]/10 flex items-center justify-center text-[#FF8500] font-mono text-xs font-bold">
                    03
                  </div>
                  <h4 className="text-lg font-semibold text-fg">Le Point de Connexion Orange</h4>
                </div>
                <p className="text-sm text-fg-muted leading-relaxed font-light">
                  L'énergie singulière, l'innovation continue et le lien stratégique qui relie chaque initiative au succès collectif.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/le-groupe"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-text hover:text-[#FF8500] transition-colors"
                >
                  Découvrir la philosophie de l'Iroko <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : NOTRE MÉTHODE (Scène épinglée au scroll, 5 formes distinctes, travelling horizontal) */}
      <MethodSection />

      {/* TÉMOIGNAGES (Unique endroit avec Satisfy cursif pour les citations authentiques) */}
      <section className="py-20 md:py-24 px-6 bg-bg border-t border-line/12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-2 block">
              Confiance & Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-medium mb-3 text-fg">
              Ce que disent nos partenaires
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((tItem, i) => (
              <div key={i} className="testimonial-card bg-surface border border-line/12 p-8 rounded-2xl flex flex-col justify-between hover:border-line/25 shadow-sm transition-colors">
                <Quote size={28} className="text-[#FF8500] mb-5 opacity-90" />
                {/* Single cursive accent usage for quote styling */}
                <p className="text-fg text-base md:text-lg font-cursive leading-relaxed mb-6">
                  « {tItem.text} »
                </p>
                <div>
                  <h4 className="font-semibold text-sm text-fg">{tItem.name}</h4>
                  <p className="text-xs text-fg-muted">{tItem.role} • {tItem.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LES 10 PÔLES — SECTION VIDÉO CINÉMATIQUE */}
      <section className="poles-video-section py-20 md:py-28 px-6 bg-bg-alt border-t border-line/12 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header texte */}
          <div className="text-center mb-12 md:mb-16">
            <span className="poles-video-label text-[#FF8500] font-semibold uppercase tracking-wider text-xs mb-3 block">
              Vision &amp; Ambition
            </span>
            <h2 className="poles-video-label text-3xl md:text-5xl font-medium text-fg mb-4 leading-tight">
              Nos 10 pôles d'excellence
            </h2>
            <p className="poles-video-label text-fg-muted text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Découvrez l'ensemble de l'écosystème IROKO — trois familles, dix pôles,
              une seule vision : orchestrer l'excellence.
            </p>
            <div className="poles-video-label w-16 h-0.5 bg-gradient-to-r from-[#531FF5] to-[#FF8500] mx-auto mt-6" />
          </div>

          {/* Vidéo cinématique pleine largeur */}
          <div className="poles-video-frame relative w-full overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-line/12">
            {/* Overlay gradient top */}
            <div
              className="absolute inset-x-0 top-0 h-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(6,9,18,0.55) 0%, transparent 100%)' }}
            />
            {/* Overlay gradient bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(6,9,18,0.55) 0%, transparent 100%)' }}
            />

            <video
              ref={polesVideoRef}
              src="https://res.cloudinary.com/dtntkknaq/video/upload/v1792319834/IROKO-Les-10-poles-v2_k6yzqr.mp4"
              className="w-full h-auto block object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            {/* Badge superposé */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
              <div className="bg-[#531FF5]/80 backdrop-blur-md border border-[#531FF5]/50 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-pulse" />
                <span className="text-white text-xs font-semibold uppercase tracking-wider">10 Pôles Actifs</span>
              </div>
            </div>
          </div>

          {/* CTA vers la page structure */}
          <div className="text-center mt-10">
            <Link
              to="/structure"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF8500] hover:text-primary transition-colors"
            >
              Explorer notre structure complète <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL ÉPURÉ */}
      <section className="py-24 px-6 bg-bg-alt border-t border-line/12 relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8500] mb-3 block">
            {t('home.cta.title1')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium mb-5 leading-tight text-fg">
            {t('home.cta.title')}
          </h2>
          <p className="text-fg-muted text-base sm:text-lg mb-9 max-w-xl mx-auto leading-relaxed font-light">
            {t('home.cta.desc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Link
              ref={magneticBtnRef}
              to="/contact"
              className="bg-[#531FF5] hover:bg-[#4314d6] text-white px-8 py-4 font-semibold text-sm rounded-full transition-all shadow-xl shadow-[#531FF5]/25 inline-flex items-center gap-2.5"
            >
              <Calendar size={18} className="text-white/80" />
              {t('home.cta.btnQuote')}
            </Link>

            <Link
              to="/structure"
              className="border border-line/25 hover:border-fg text-fg px-7 py-4 font-semibold text-sm rounded-full transition-colors"
            >
              {t('home.cta.btnContact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
