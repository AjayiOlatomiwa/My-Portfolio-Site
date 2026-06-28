/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_PROJECTS } from '../data';
import { PortfolioProject } from '../types';
import { ArrowLeft, Play, X, ExternalLink, Calendar, Clock, User } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../utils';

interface AllWorkViewProps {
  onBack: () => void;
}

export default function AllWorkView({ onBack }: AllWorkViewProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Group projects to let all reels (9:16 FORMAT) come first
  const reels = PORTFOLIO_PROJECTS.filter(p => p.format === '9:16 FORMAT');
  const otherWorks = PORTFOLIO_PROJECTS.filter(p => p.format !== '9:16 FORMAT');
  const orderedProjects = [...reels, ...otherWorks];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-black">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-6">
            <button 
              onClick={onBack}
              className="group flex items-center space-x-2 text-neutral-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-[10px] tracking-widest uppercase">Back to Home</span>
            </button>
            <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-neutral-200 tracking-tight leading-tight">
              Selected works
            </h1>
          </div>
          <div className="pb-2">
            <p className="font-mono text-[10px] md:text-xs text-neutral-500 tracking-[0.15em] uppercase">
              {PORTFOLIO_PROJECTS.length} cinematic works curated
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {orderedProjects.map((project, index) => {
            const isPortrait = project.format === '9:16 FORMAT';
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`relative overflow-hidden rounded-xl border border-neutral-900 bg-neutral-950 group-hover:border-neutral-800 transition-colors ${isPortrait ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video'}`}>
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black scale-90 group-hover:scale-100 transition-transform">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                      <span className="font-sans text-xs font-bold tracking-widest uppercase text-white">Watch Case Study</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full font-mono text-[8px] tracking-widest text-white uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className={`mt-6 flex justify-between items-start ${isPortrait ? 'max-w-sm mx-auto' : ''}`}>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-neutral-200 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-neutral-500 font-mono text-[9px] tracking-widest uppercase">
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{project.client}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{project.duration}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
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
    </div>
  );
}
