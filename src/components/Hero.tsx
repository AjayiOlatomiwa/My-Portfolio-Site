/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Sparkles, Volume2, Youtube } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onPlayDemoReel: () => void;
}

export default function Hero({ onOpenBooking, onPlayDemoReel }: HeroProps) {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-black px-6 py-32 md:py-48 text-center select-none">
      
      {/* Absolute Synapse Fluid Glow Background (Matches Reference Image) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep background ambient glowing spots */}
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[150px]" />
        <div className="absolute top-1/3 left-1/2 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-neutral-900/50 blur-[130px]" />
        
        {/* Subtle, low-opacity dithered Vitruvian Man Background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/800px-Da_Vinci_Vitruve_Luc_Viatour.jpg"
            alt="Vitruvian Man"
            className="h-[105%] md:h-[125%] w-auto max-w-none object-contain opacity-[0.04] grayscale brightness-[140%] contrast-[180%] mix-blend-screen pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Subtle dither screen overlay pattern */}
          <div className="absolute inset-0 bg-repeat opacity-[0.25]" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: '4px 4px'
          }} />
        </div>

        {/* Animated Synapse Vector Lines */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="synapse-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="synapse-grad-2" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Wave Line 1 */}
          <motion.path
            d="M -100 250 C 300 120, 600 480, 1600 200"
            fill="none"
            stroke="url(#synapse-grad-1)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Wave Line 2 (Higher contrast main synapse line) */}
          <motion.path
            d="M -100 200 C 400 350, 800 50, 1600 320"
            fill="none"
            stroke="url(#synapse-grad-2)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 4.5, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Wave Line 3 (Faint background strand) */}
          <motion.path
            d="M -100 300 C 500 500, 1000 150, 1600 400"
            fill="none"
            stroke="url(#synapse-grad-1)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 5.5, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </div>

      {/* Hero Content Container with massive breathing room */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Professional Creative Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 group"
        >
          {/* Subtle Outer Glow Aura */}
          <div className="absolute -inset-1.5 rounded-full bg-white/[0.04] blur-md opacity-70 group-hover:bg-white/[0.08] group-hover:blur-lg transition-all duration-500" />
          
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border border-neutral-800 bg-neutral-950 p-1">
            <div className="h-full w-full rounded-full overflow-hidden bg-neutral-900 relative">
              <img
                src="https://unavatar.io/youtube/tstudi0s_yt"
                alt="Ajayi Olatomiwa"
                className="h-full w-full object-cover grayscale brightness-[95%] contrast-[105%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        {/* Master headline (Sleek sans-serif, high-contrast, beautiful letterspacing) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-sans text-3xl font-extrabold tracking-tight text-neutral-200 sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.15] max-w-4xl"
        >
          Hi, I&apos;m Ajayi Olatomiwa, a polymath building T-Studios. <span className="text-neutral-500 font-extrabold block mt-4 text-2xl sm:text-4xl md:text-5xl lg:text-[52px]">I love good work.</span>
        </motion.h1>

        {/* Spacious, premium subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 max-w-2xl text-xs font-normal tracking-wide text-neutral-400 sm:text-sm leading-relaxed md:px-6"
        >
          I&apos;m obsessed with translating complex thoughts or ideas into great visuals utilising creative techniques.
        </motion.p>

        {/* Action Button layout matching reference image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto rounded-full bg-neutral-200 text-black font-sans text-[11px] font-semibold tracking-[0.2em] px-8 py-4 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
          >
            START A PROJECT
          </button>

          <button
            onClick={onPlayDemoReel}
            className="w-full sm:w-auto rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900 hover:border-white hover:text-white backdrop-blur-md px-8 py-4 font-sans text-[11px] font-medium tracking-[0.2em] text-neutral-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>PLAY SHOWREEL</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
