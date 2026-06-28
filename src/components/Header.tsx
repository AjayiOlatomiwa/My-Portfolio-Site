/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Compass, X } from 'lucide-react';

interface HeaderProps {
  activeView: 'client' | 'admin';
  clientSubView?: 'home' | 'all-work' | 'play' | 'about';
  onToggleView: (view: 'client' | 'admin') => void;
  onOpenBooking: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({
  activeView,
  clientSubView = 'home',
  onToggleView,
  onOpenBooking,
  onScrollToSection
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'play', label: 'PLAY ASSETS' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'remarks', label: 'TESTIMONIALS' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleMenuItemClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className={`${isMenuOpen ? 'fixed inset-0 z-[2000] bg-black/98' : 'sticky top-0 z-[100] bg-black/40 border-b border-neutral-900/10'} backdrop-blur-md transition-all duration-300`}>
      <div className={`mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-12 relative ${isMenuOpen ? 'z-[2100]' : ''}`}>
        {/* Minimalist Text Logo */}
        <button
          onClick={() => {
            onToggleView('client');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMenuOpen(false);
          }}
          className={`font-sans text-base font-extrabold tracking-tight transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-neutral-200 hover:text-white'}`}
        >
          T-Studios
        </button>

        <div className="flex items-center space-x-6">
          {/* Dynamic Controls / Mode Toggle - Only shown to return to Live Site when already logged in as Admin */}
          {activeView === 'admin' && (
            <button
              onClick={() => onToggleView('client')}
              className="flex items-center space-x-2 rounded-full border border-neutral-900 bg-neutral-950/80 px-4 py-2 font-sans text-[10px] tracking-wide text-neutral-400 hover:border-neutral-750 hover:text-white transition-all duration-300"
            >
              <Compass className="h-3 w-3 text-neutral-400" />
              <span className="hidden sm:inline font-bold">Live site</span>
            </button>
          )}

          {/* Staggered Nav Icon - Requested by user */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex flex-col items-end space-y-1.5 p-2 relative"
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 45, y: 8, width: '24px', backgroundColor: '#ffffff' } : { width: '12px', backgroundColor: '#a3a3a3' }}
              className="h-0.5 transition-all duration-300 group-hover:bg-white"
            />
            <motion.div
              animate={isMenuOpen ? { opacity: 0 } : { width: '18px', backgroundColor: '#a3a3a3' }}
              className="h-0.5 transition-all duration-300 group-hover:bg-white"
            />
            <motion.div
              animate={isMenuOpen ? { rotate: -45, y: -8, width: '24px', backgroundColor: '#ffffff' } : { width: '24px', backgroundColor: '#a3a3a3' }}
              className="h-0.5 transition-all duration-300 group-hover:bg-white"
            />
          </button>
        </div>
      </div>

      {/* Full-screen Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-start md:justify-center overflow-y-auto pt-32 md:pt-0"
          >
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8 max-w-3xl px-6 py-12 md:py-0 items-center justify-items-center">
              {menuItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`group relative font-sans text-sm md:text-base font-bold tracking-[0.25em] transition-all duration-500 text-center ${
                    clientSubView === item.id
                      ? 'text-white'
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <span className="relative z-10 block transform transition-transform duration-500 group-hover:scale-105">{item.label}</span>
                  {/* Red underline accent */}
                  <span className="absolute -bottom-1.5 left-0 h-[1px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                onClick={() => {
                  onOpenBooking();
                  setIsMenuOpen(false);
                }}
                className="md:col-span-2 mt-8 md:mt-12 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-white hover:text-black hover:border-white text-sm font-bold tracking-widest px-12 py-5 text-white font-sans transition-all duration-500 group overflow-hidden"
              >
                <span className="relative z-10">BOOK A SESSION</span>
              </motion.button>
            </nav>

            <div className="absolute bottom-12 left-12 hidden md:block">
              <span className="font-mono text-[10px] text-neutral-700 tracking-[0.3em] leading-loose">
                // Global footprint<br />
                // Retention optimized flow
              </span>
            </div>
            
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

