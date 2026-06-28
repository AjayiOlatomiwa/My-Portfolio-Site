import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'play' | 'view' | 'close'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Buttery-smooth spring physics for organic trailing effect
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Event delegation to capture premium hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('button, a, select, input, textarea, [role="button"], .cursor-pointer');
      
      if (interactive) {
        setIsHovered(true);
        
        // Contextual cursors
        if (interactive.classList.contains('cursor-play') || interactive.getAttribute('data-cursor') === 'play') {
          setCursorType('play');
        } else if (interactive.classList.contains('cursor-view') || interactive.getAttribute('data-cursor') === 'view') {
          setCursorType('view');
        } else if (interactive.classList.contains('cursor-close') || interactive.getAttribute('data-cursor') === 'close') {
          setCursorType('close');
        } else {
          setCursorType('default');
        }
      } else {
        setIsHovered(false);
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Add CSS globally to hide native cursor on premium desktops
    const style = document.createElement('style');
    style.innerHTML = `
      @media (min-width: 768px) {
        body, button, a, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.85 : isHovered ? 1.6 : 1,
            backgroundColor: cursorType !== 'default' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0)',
            borderColor: cursorType !== 'default' ? 'rgba(239, 68, 68, 0.4)' : isHovered ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.3)',
            borderWidth: cursorType !== 'default' ? '0px' : '1px',
            width: cursorType !== 'default' ? 64 : 32,
            height: cursorType !== 'default' ? 64 : 32,
            boxShadow: isHovered ? '0 0 12px rgba(239, 68, 68, 0.3)' : '0 0 0px rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="flex items-center justify-center rounded-full border border-white/30 bg-transparent transition-all"
        >
          {/* Label inside outer ring if hovering specific states */}
          <AnimatePresence>
            {cursorType === 'play' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-sans text-[9px] font-bold uppercase tracking-widest text-white bg-red-600 rounded-full px-2.5 py-1 shadow shadow-red-500/30"
              >
                PLAY
              </motion.span>
            )}
            {cursorType === 'view' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-sans text-[9px] font-bold uppercase tracking-widest text-white bg-red-600 rounded-full px-2.5 py-1 shadow shadow-red-500/30"
              >
                VIEW
              </motion.span>
            )}
            {cursorType === 'close' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-sans text-[9px] font-bold uppercase tracking-widest text-white bg-red-600 rounded-full px-2.5 py-1 shadow shadow-red-500/30"
              >
                EXIT
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Center High-Contrast Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 0.4 : 1,
            opacity: cursorType !== 'default' ? 0 : 1,
            backgroundColor: isHovered ? '#ef4444' : '#ffffff',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(239,68,68,0.5)]"
        />
      </motion.div>
    </>
  );
}
