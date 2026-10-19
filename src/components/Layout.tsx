import { type ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const layoutRef      = useRef<HTMLDivElement>(null);

  // Retour en haut à chaque changement de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Barre de progression de lecture (ScrollTrigger)
  useGSAP(() => {
    if (!progressBarRef.current) return;

    const tween = gsap.fromTo(
      progressBarRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: layoutRef, dependencies: [pathname] });

  return (
    <div
      ref={layoutRef}
      className="min-h-screen flex flex-col bg-bg selection:bg-primary/18 selection:text-fg relative"
    >
      {/* Barre de progression (violet primaire, couleur fixe) */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[100] origin-left pointer-events-none"
        style={{ transformOrigin: '0% 50%' }}
      />

      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
