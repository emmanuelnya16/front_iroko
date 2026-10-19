/**
 * src/motion/gsap.ts
 * Central GSAP plugin registration — imported once in main.tsx.
 * Every plugin used anywhere in the project is registered here.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin,
  SplitText,
  useGSAP
);

// Project-wide defaults matching the motion language
gsap.defaults({
  duration: 0.9,
  ease: 'power4.out',
});

export { gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText, useGSAP };
