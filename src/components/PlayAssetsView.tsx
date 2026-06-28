/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Check } from 'lucide-react';

interface FreeAsset {
  id: string;
  title: string;
  category: string;
  description: string;
  fileSize: string;
}

const FREE_ASSETS: FreeAsset[] = [
  {
    id: 'sfx-01',
    title: 'Analog Risers & Whooshes Pack',
    category: 'Sound FX',
    description: 'High-impact organic sweeps, low-end sub booms, and mechanical hits to drive narrative shifts.',
    fileSize: '142 MB'
  },
  {
    id: 'sfx-02',
    title: 'Paper Crinkles & Tape Tears',
    category: 'Sound FX',
    description: 'Ultra-crisp organic foley recorded in-studio. Perfect for tactile collage and kinetic titles.',
    fileSize: '89 MB'
  },
  {
    id: 'preset-01',
    title: 'Kinetic Text Presets for AE',
    category: 'After Effects',
    description: 'Animation presets featuring clean elastic slides, tracking shifts, and modern snaps.',
    fileSize: '12 MB'
  },
  {
    id: 'overlay-01',
    title: '16mm Film Grain Scan (4K Loop)',
    category: 'Overlays',
    description: 'Authentic 16mm organic grain captured on vintage Kodak stock. Ready-to-blend ProRes overlay.',
    fileSize: '1.2 GB'
  },
  {
    id: 'lut-01',
    title: 'T-Studios Slate LUT V1',
    category: 'Color Presets',
    description: 'Our signature color profile. Crushed mid-tones, balanced warmth, and cinematic off-black shadows.',
    fileSize: '4 MB'
  },
  {
    id: 'project-01',
    title: 'Split-Screen Collage Starter',
    category: 'Project Files',
    description: 'After Effects template utilizing minimalist modular grids, paint stroke mattes, and camera shakes.',
    fileSize: '45 MB'
  }
];

export default function PlayAssetsView({ onBack }: { onBack: () => void }) {
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownload = (asset: FreeAsset) => {
    try {
      const element = document.createElement('a');
      const file = new Blob(
        [`T-Studios Premium Asset Pack: ${asset.title}\nThis is a placeholder for your premium downloadable asset: ${asset.description}\nCategory: ${asset.category}\nSize: ${asset.fileSize}`], 
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${asset.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_tstudios.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      if (!downloadedIds.includes(asset.id)) {
        setDownloadedIds(prev => [...prev, asset.id]);
      }
    } catch (err) {
      console.error('Failed to trigger download', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-36 pb-48 px-6 md:px-12 selection:bg-white selection:text-black">
      <div className="mx-auto max-w-5xl">
        
        {/* Back Button with ample spacing */}
        <div className="mb-16">
          <button
            onClick={onBack}
            className="group flex items-center space-x-2 text-neutral-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back</span>
          </button>
        </div>

        {/* Minimal Header */}
        <div className="mb-24">
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            Playground.
          </h1>
          <p className="font-sans text-xs md:text-sm text-neutral-500 max-w-lg leading-relaxed">
            Freely received, freely we give. Explore snippets from some of our work. Some are experiments. We made them. But now they’re yours.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="border border-neutral-900 bg-neutral-950/30 rounded-lg p-16 flex flex-col items-center justify-center text-center space-y-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-red-500 uppercase">Status</span>
          <h2 className="font-sans text-xl md:text-2xl font-bold text-neutral-300">
            Coming Soon
          </h2>
        </div>

      </div>
    </div>
  );
}
