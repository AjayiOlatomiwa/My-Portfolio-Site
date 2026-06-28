/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Globe, Sparkles, Instagram, Twitter, ExternalLink, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-6 md:px-12 border-t border-neutral-900">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Left Side: Branding */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm font-bold tracking-[0.2em] text-white">T-Studios</span>
          </div>
        </div>

        {/* Center: Notice */}
        <div className="font-mono text-[10px] tracking-wider text-neutral-500">
          &copy; 2026 T-Studios. All rights reserved.
        </div>

        {/* Right Side: Specific Requested Profiles */}
        <div className="space-y-3 font-mono text-xs text-neutral-500 text-left md:text-right">
          <div className="flex flex-wrap md:justify-end gap-x-4 gap-y-2">
            <a 
              href="https://www.youtube.com/@tstudi0s_yt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-1 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Youtube className="h-3.5 w-3.5" />
              <span className="text-[10px] tracking-wider">YouTube</span>
            </a>

            <a 
              href="https://www.instagram.com/tstudi0s/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-1 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span className="text-[10px] tracking-wider">Instagram</span>
            </a>
            
            <a 
              href="https://contra.com/tstudios" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-1 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="text-[10px] tracking-wider">Contra</span>
            </a>

            <a 
              href="https://x.com/tstudi0s_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center space-x-1 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Twitter className="h-3.5 w-3.5" />
              <span className="text-[10px] tracking-wider">X / Twitter</span>
            </a>
          </div>

          <div className="flex items-center md:justify-end space-x-2 pt-1">
            <a 
              href="mailto:tstudios227@gmail.com"
              className="flex items-center space-x-2 text-neutral-400 hover:text-red-500 transition-colors"
            >
              <Mail className="h-4 w-4 text-neutral-400 group-hover:text-red-500" />
              <span>tstudios227@gmail.com</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
