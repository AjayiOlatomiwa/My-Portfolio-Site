/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ArrowUpRight, X } from 'lucide-react';

export default function AboutSection() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section id="about" className="relative bg-black py-28 md:py-40 px-6 md:px-12 border-b border-neutral-900/40 overflow-hidden text-center">
      {/* Absolute Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10 flex flex-col items-center">
        {/* Content Grouping with Rhythm */}
        <div className="space-y-8 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-200 tracking-tight leading-[1.1]"
          >
            About <span className="text-neutral-500">T-Studios</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-center"
          >
            <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
              I love good work. I believe every project is an opportunity to make good work. Finely crafted, collaborative work that challenges both me &amp; my team, and inspires awe in the viewers. We believe in taking our time to craft good work and expand the boundaries.
            </p>

            <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
              At T-Studios, we&apos;re committed to work. But we’re also committed to time outside of work, doing things we love.
            </p>
          </motion.div>
        </div>

        {/* User Photo Center Aligned Below Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="relative group w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-neutral-800 bg-neutral-950 p-2 shadow-2xl transition-all duration-500 hover:border-neutral-700 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900 border border-neutral-900 flex items-center justify-center">
              <img
                src="https://unavatar.io/youtube/tstudi0s_yt"
                alt="Ajayi Olatomiwa"
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="mt-4 font-mono text-[9px] tracking-widest text-neutral-500 uppercase">// Ajayi Olatomiwa</div>
        </motion.div>
      </div>

      {/* Interactive Calendly Overlay Sheet */}
      <AnimatePresence>
        {isCalendlyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-4xl h-[85vh] rounded-3xl border border-neutral-900 bg-neutral-950 p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            >
              {/* Overlay Modal Header */}
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <div>
                  <span className="font-mono text-[8px] text-red-500 tracking-widest block mb-1">// Introductory meeting</span>
                  <h3 className="font-sans text-base font-extrabold text-white tracking-wider">Book a call</h3>
                </div>
                <button
                  onClick={() => setIsCalendlyOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-850 text-neutral-400 hover:border-white hover:text-white hover:bg-neutral-900 transition-all focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Seamless Calendly Embedded Container */}
              <div className="flex-1 w-full h-full pt-4 rounded-2xl overflow-hidden bg-neutral-950/40">
                <iframe
                  src="https://calendly.com/tstudios227/introductory-call?hide_landing_page_details=1&hide_gdpr_banner=1"
                  className="w-full h-full border-0"
                  title="Calendly Scheduling"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
