/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

const PARTNERS = [
  'Nils Glenn',
  'Strategic Solutions Global',
  'JayTech Design Studios',
  'Jan Jekielek, Epoch Times',
  'Bible Animations',
  'Agadon Creative',
  'Waterlight Save Initiative',
  'i-Heal',
  'and more...'
];

const COUNTRIES = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Nigeria', flag: '🇳🇬' }
];

export default function TrustedCompanies() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-black py-20 md:py-28 border-t border-b border-neutral-900 select-none overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative">
        
        {/* Selected Clients & Collaborators List (Beautifully written, no logos) */}
        <div className="px-6 md:px-12 mb-24 text-center">
          <h2 className="font-sans text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-200 mb-12 leading-tight">
            Trusted By
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 border-t border-neutral-900 pt-8 text-left">
            {PARTNERS.map((client) => (
              <div
                key={client}
                className="font-sans text-base md:text-lg font-bold text-neutral-300 hover:text-white transition-colors duration-300 tracking-tight flex items-center space-x-3 group"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 group-hover:bg-white transition-colors duration-300" />
                <span>{client}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countries network section with generous whitespace */}
        <div className="mt-20 px-6 md:px-12 border-t border-neutral-900/50 pt-20 text-center">
          <h3 className="font-sans text-xl md:text-2xl font-extrabold tracking-tight text-neutral-200 mb-10">
            Global footprint
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {COUNTRIES.map((country) => (
              <div
                key={country.name}
                className="group border border-neutral-900 bg-neutral-950/20 hover:border-neutral-800 rounded-2xl p-8 md:p-10 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-4"
              >
                <span className="text-5xl md:text-6xl select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </span>
                <span className="font-sans text-sm md:text-base font-bold text-neutral-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
