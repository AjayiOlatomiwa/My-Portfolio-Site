/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const renderAnswer = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-red-500 hover:text-red-400 underline transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="bg-black py-40 md:py-56 px-6 md:px-12 border-b border-neutral-900/30"
    >
      <div className="mx-auto max-w-4xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center space-x-2 font-mono text-xs text-neutral-500 tracking-widest mb-4">
            <HelpCircle className="h-4 w-4 text-red-500" />
            <span>FAQ support</span>
          </div>
          <h2 className="font-sans text-xl font-semibold tracking-tight text-neutral-200 md:text-3xl">
            Common questions
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const itemNumber = (index + 1).toString().padStart(2, '0');
            return (
              <div
                key={item.id}
                className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-red-500/30 bg-neutral-950/40 shadow-[0_4px_20px_rgba(239,68,68,0.03)]' 
                    : 'border-neutral-900 bg-neutral-950/20 hover:border-red-500/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-sans text-sm sm:text-base font-semibold tracking-tight text-white hover:text-neutral-300">
                    <span className="font-mono text-xs text-neutral-500 mr-3 inline-block">[{itemNumber}]</span>
                    {item.question}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-neutral-400 transition-all duration-300 ${
                    isOpen ? 'border-red-500 text-red-500 rotate-45 bg-red-500/5' : 'border-neutral-800'
                  }`}>
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-neutral-900 px-6 pb-6 pt-4 font-sans text-sm text-neutral-400 leading-relaxed">
                        {renderAnswer(item.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
}
