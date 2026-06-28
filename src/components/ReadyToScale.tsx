/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap } from 'lucide-react';

interface ReadyToScaleProps {
  onStartProject: () => void;
}

export default function ReadyToScale({ onStartProject }: ReadyToScaleProps) {
  return (
    <section id="cta-scale" className="relative bg-black text-white py-40 md:py-56 px-6 md:px-12 overflow-hidden border-b border-neutral-900/40">
      
      {/* Immersive Red Ambient Sphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-red-600/[0.03] rounded-full blur-[160px] pointer-events-none" />
      
      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-repeat opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="mx-auto max-w-5xl relative z-10 text-center space-y-12">
        
        {/* Dynamic Massive Section Title */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-200 leading-tight"
          >
            Ready to scale your <span className="text-neutral-500 font-extrabold">content retention</span>?
          </motion.h2>
        </div>

        {/* Start a Project Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 rounded-full bg-white text-black hover:bg-neutral-200 px-10 py-5 font-sans text-xs font-extrabold tracking-[0.25em] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.08)] group"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>



      </div>

      {/* Retro-Tech Visual Corners */}
      <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-neutral-800/40 pointer-events-none hidden sm:block" />
      <div className="absolute top-10 right-10 w-6 h-6 border-t border-r border-neutral-800/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 left-10 w-6 h-6 border-b border-l border-neutral-800/40 pointer-events-none hidden sm:block" />
      <div className="absolute bottom-10 right-10 w-6 h-6 border-b border-r border-neutral-800/40 pointer-events-none hidden sm:block" />

    </section>
  );
}
