/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, ArrowRight, Play, Eye, Flame, Monitor, Zap, X, Calendar, Clock, User } from 'lucide-react';
import { PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS } from '../data';
import { getYouTubeEmbedUrl } from '../utils';

interface ExploreWorkProps {
  onSelectCategory?: (id: string) => void;
  onViewAll?: () => void;
}

export default function ExploreWork({ onSelectCategory, onViewAll }: ExploreWorkProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Select high-impact projects to feature, placing ALL reels first, then the 2 specific projects requested by the user, then remaining projects, and placing proj-open-1 last.
  const reels = PORTFOLIO_PROJECTS.filter(p => p.format === '9:16 FORMAT');
  const targetIds = ['proj-evt-1', 'proj-trl-1'];
  const requestedTwo = targetIds.map(id => PORTFOLIO_PROJECTS.find(p => p.id === id)).filter(Boolean) as PortfolioProject[];
  const remainingProjects = PORTFOLIO_PROJECTS.filter(
    p => p.format !== '9:16 FORMAT' && !targetIds.includes(p.id) && p.id !== 'proj-open-1'
  );
  const lastProject = PORTFOLIO_PROJECTS.find(p => p.id === 'proj-open-1');
  const featuredProjects = [...reels, ...requestedTwo, ...remainingProjects];
  if (lastProject) {
    featuredProjects.push(lastProject);
  }

  return (
    <section id="portfolio" className="bg-black text-white py-32 md:py-48 border-b border-neutral-900/40 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-neutral-200 tracking-tight leading-tight max-w-2xl">
              Explore my work
            </h2>
            <p className="max-w-2xl text-xs font-normal tracking-wide text-neutral-400 sm:text-sm leading-relaxed italic">
              "The best edit is the one you don't notice. It flows so seamlessly that you become fully immersed in the story."
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-4">
            <button 
              onClick={onViewAll}
              className="group flex items-center space-x-3 px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold">View all projects</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {/* HORIZONTAL SCROLL PANEL */}
          <motion.div
            key="catalog"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex space-x-6 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative flex-none rounded-2xl border border-neutral-900 bg-neutral-950/40 overflow-hidden hover:border-neutral-700 transition-all duration-500 snap-center shadow-2xl cursor-pointer ${project.format === '9:16 FORMAT' ? 'w-[55vw] md:w-[250px] aspect-[9/16]' : 'w-[85vw] md:w-[600px] aspect-video'}`}
                >
                  {/* Background Visual Frame (AUTOPLAYING VIDEO) */}
                  <div className="absolute inset-0 w-full h-full bg-neutral-900">
                    {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                      <div className="w-full h-full relative pointer-events-none">
                        <iframe
                          src={getYouTubeEmbedUrl(project.videoUrl) + "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=" + (project.videoUrl.includes('v=') ? project.videoUrl.split('v=')[1] : project.videoUrl.split('/').pop()?.split('?')[0])}
                          className={`h-full w-full border-0 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 ${project.format === '9:16 FORMAT' ? 'scale-[1.02]' : 'scale-[1.35]'}`}
                          allow="autoplay"
                        />
                      </div>
                    ) : (
                      <video
                        src={project.videoUrl}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Cine corner frames */}
                    <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/30" />
                    <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/30" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/30" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/30" />

                    {/* Project Meta Tag */}
                    <div className="absolute top-6 left-6 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <span className="bg-black/60 backdrop-blur-xl text-[9px] font-mono tracking-[0.2em] text-white px-3 py-1.5 rounded-sm border border-white/10 uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Play Trigger Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white text-black scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </div>
                    <span className="mt-4 font-mono text-[9px] tracking-[0.2em] text-white uppercase font-bold">Watch Case Study</span>
                  </div>

                  {/* Content text (Clean Overlay) */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 z-20">
                    <h3 className="font-sans text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase mt-1">
                      {project.client} &bull; {project.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Indicators */}
            <div className="flex items-center justify-between pt-12 border-t border-neutral-900">
              <div className="flex items-center space-x-3">
                 <div className="h-1 w-8 bg-red-600" />
                 <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase">Scroll to explore vault</span>
               </div>
            </div>

            {/* Software Proficiency Segment */}
            <SoftwareProficiency />
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Case Study Modal Player */}
      <AnimatePresence>
        {selectedProject && (() => {
          const isPortrait = selectedProject.format === '9:16 FORMAT';
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className={`relative w-full max-h-[90vh] bg-neutral-950 rounded-2xl border border-neutral-900 overflow-y-auto ${isPortrait ? 'max-w-4xl' : 'max-w-6xl'}`}
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 border border-neutral-800 text-white hover:border-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className={`grid grid-cols-1 ${isPortrait ? 'md:grid-cols-5 gap-4 items-center p-6 md:p-8' : 'lg:grid-cols-3'}`}>
                  <div className={`${isPortrait ? 'md:col-span-2 aspect-[9/16] max-w-[320px] w-full mx-auto rounded-xl overflow-hidden border border-neutral-900 bg-black shadow-2xl' : 'lg:col-span-2 aspect-video bg-black'}`}>
                    <iframe
                      src={getYouTubeEmbedUrl(selectedProject.videoUrl) || selectedProject.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  <div className={`${isPortrait ? 'md:col-span-3 p-4 md:p-6' : 'p-8 lg:p-12'} space-y-8`}>
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.3em] text-red-500 uppercase mb-3 block">
                        {selectedProject.category}
                      </span>
                      <h2 className="font-sans text-3xl font-black text-white leading-tight">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-neutral-400 font-sans text-sm leading-relaxed">
                      <p>{selectedProject.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-900">
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-neutral-600 tracking-widest uppercase">Collaborator</span>
                        <p className="font-sans text-xs font-bold text-white">{selectedProject.client}</p>
                      </div>
                      {selectedProject.editor && (
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-neutral-600 tracking-widest uppercase">Editor</span>
                          <p className="font-sans text-xs font-bold text-white">{selectedProject.editor}</p>
                        </div>
                      )}
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-neutral-600 tracking-widest uppercase">Release</span>
                        <p className="font-sans text-xs font-bold text-white">{selectedProject.releaseYear}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-neutral-600 tracking-widest uppercase">Runtime</span>
                        <p className="font-sans text-xs font-bold text-white">{selectedProject.duration}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-neutral-600 tracking-widest uppercase">Format</span>
                        <p className="font-sans text-xs font-bold text-white">{selectedProject.format}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}

/* SOFTWARE PROFICIENCY SUBCOMPONENT WITH 3D GLASS CARD STYLING */
function SoftwareProficiency() {
  const tools = [
    {
      name: 'After Effects',
      shortName: 'Ae',
      bgGradient: 'from-[#121b33] to-[#040814]',
      borderColor: 'border-[#2b4c80]/40',
      glowColor: 'rgba(52, 109, 196, 0.4)',
      textColor: 'text-[#346dc4]',
      tag: 'COMPOSITING & MOTION',
      isCustomSvg: false
    },
    {
      name: 'Blender 3D',
      bgGradient: 'from-[#302115] to-[#0c0602]',
      borderColor: 'border-[#cc6b18]/40',
      glowColor: 'rgba(204, 107, 24, 0.4)',
      tag: '3D VFX & KINETICS',
      isCustomSvg: true,
      svgType: 'blender'
    },
    {
      name: 'Figma',
      bgGradient: 'from-[#221528] to-[#0c0410]',
      borderColor: 'border-[#a259ff]/40',
      glowColor: 'rgba(162, 89, 255, 0.35)',
      tag: 'INTERFACE & ASSETS',
      isCustomSvg: true,
      svgType: 'figma'
    },
    {
      name: 'DaVinci Resolve',
      bgGradient: 'from-[#1b253c] to-[#070b14]',
      borderColor: 'border-[#3ba9f5]/40',
      glowColor: 'rgba(59, 169, 245, 0.35)',
      tag: 'VIDEO ASSEMBLY & EDIT',
      isCustomSvg: true,
      svgType: 'davinci'
    },
    {
      name: 'Photoshop',
      shortName: 'Ps',
      bgGradient: 'from-[#0c2440] to-[#030d1a]',
      borderColor: 'border-[#00c8ff]/30',
      glowColor: 'rgba(0, 200, 255, 0.35)',
      textColor: 'text-[#00c8ff]',
      tag: 'GRAPHICS & MATTE',
      isCustomSvg: false
    },
    {
      name: 'Premiere Pro',
      shortName: 'Pr',
      bgGradient: 'from-[#2c0c40] to-[#12031a]',
      borderColor: 'border-[#ea10f2]/30',
      glowColor: 'rgba(234, 16, 242, 0.35)',
      textColor: 'text-[#ea10f2]',
      tag: 'OFFLINE CUTTING',
      isCustomSvg: false
    }
  ];

  return (
    <div className="border-t border-neutral-900/60 pt-24 space-y-16">
      <div className="space-y-4 flex flex-col items-center text-center">
        <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-neutral-200 tracking-tight">
          Software Proficiency
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {tools.map((tool, idx) => (
          <motion.div
            key={tool.name}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-neutral-800"
          >
            {/* Glowing active backdrop on hover */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${tool.glowColor} 0%, transparent 70%)`
              }}
            />

            {/* 3D Glass Iconic Frame */}
            <div 
              className={`relative h-24 w-24 rounded-2xl bg-gradient-to-br ${tool.bgGradient} border ${tool.borderColor} shadow-2xl flex flex-col justify-center items-center text-center overflow-hidden mb-4 transition-transform duration-500 group-hover:scale-105`}
              style={{
                boxShadow: `0 15px 35px -10px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.02)`
              }}
            >
              {/* Glass reflection streak */}
              <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-white/10 to-transparent skew-y-12 transform origin-top-left" />

              {!tool.isCustomSvg ? (
                /* Adobe Styled 3D Letter Logos */
                <>
                  <span className={`font-sans text-4xl font-extrabold ${tool.textColor} tracking-tight drop-shadow-[0_0_15px_${tool.glowColor}]`}>
                    {tool.shortName}
                  </span>
                </>
              ) : tool.svgType === 'blender' ? (
                /* Blender styled icon - Official highly realistic representation */
                <div className="relative flex items-center justify-center scale-[0.85]">
                  <svg width="44" height="44" viewBox="0 0 256 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M197.6 0c-3.4 0-6.8 2.6-6.8 6.8 0 .8.1 1.6.4 2.4l-15.6 15.6c-.8-.3-1.6-.4-2.4-.4-4.2 0-7.6 3.4-7.6 7.6 0 .8.1 1.6.4 2.4L143 51.5c-7.9-3.9-16.7-6.2-26.1-6.2-31.4 0-56.9 25.5-56.9 56.9 0 31.4 25.5 56.9 56.9 56.9 31.4 0 56.9-25.5 56.9-56.9 0-14.2-5.2-27.2-13.8-37.2l20.4-20.4c.8.3 1.6.4 2.4.4 4.2 0 7.6-3.4 7.6-7.6 0-.8-.1-1.6-.4-2.4l15.6-15.6c.8.3 1.6.4 2.4.4 4.2 0 7.6-3.4 7.6-7.6C216 4 207.7 0 197.6 0zm-80.7 75.1c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5-27.5-12.3-27.5-27.5 12.3-27.5 27.5-27.5z" fill="#EA7600"/>
                    <circle cx="116.9" cy="102.6" r="16.5" fill="#2285C5"/>
                  </svg>
                </div>
              ) : tool.svgType === 'figma' ? (
                /* Figma styled icon - Official five circles SVG */
                <div className="flex flex-col items-center justify-center scale-[0.9]">
                  <svg width="26" height="39" viewBox="0 0 30 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#F24E1E"/>
                    <path d="M22.5 15C26.6421 15 30 11.6421 30 7.5C30 3.35786 26.6421 0 22.5 0C18.3579 0 15 3.35786 15 7.5C15 11.6421 18.3579 15 22.5 15Z" fill="#FF7262"/>
                    <path d="M7.5 30C11.6421 30 15 26.6421 15 22.5C15 18.3579 11.6421 15 7.5 15C3.35786 15 0 18.3579 0 22.5C0 26.6421 3.35786 30 7.5 30Z" fill="#A259FF"/>
                    <path d="M7.5 45C11.6421 45 15 41.6421 15 37.5V30H0C0 34.1421 3.35786 37.5 7.5 45Z" fill="#0ACF83"/>
                    <path d="M22.5 30C26.6421 30 30 26.6421 30 22.5C30 18.3579 26.6421 15 22.5 15C18.3579 15 15 18.3579 15 22.5C15 26.6421 18.3579 30 22.5 30Z" fill="#1ABC9C"/>
                  </svg>
                </div>
              ) : (
                /* DaVinci Aperture icon - Official three-petal swirl */
                <div className="relative flex items-center justify-center scale-[0.85]">
                  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15C50 15 62 30 62 40C62 50 50 50 50 50C50 50 38 50 38 40C38 30 50 15 50 15Z" fill="#FF1A1A" />
                    <path d="M22 63C22 63 38 58 46 50C54 42 50 30 50 30C50 30 40 38 32 46C24 54 22 63 22 63Z" fill="#00FF66" />
                    <path d="M78 63C78 63 62 58 54 50C46 42 50 30 50 30C50 30 60 38 68 46C76 54 78 63 78 63Z" fill="#0066FF" />
                    <circle cx="50" cy="43" r="12" fill="black" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content info containing ONLY the Name (clean, with all metadata details removed) */}
            <div className="z-10">
              <h3 className="font-sans text-base font-extrabold text-neutral-200 group-hover:text-white transition-colors duration-300">
                {tool.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
