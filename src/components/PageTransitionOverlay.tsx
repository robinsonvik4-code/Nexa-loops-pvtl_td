import React, { createContext, useContext, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface TransitionContextType {
  triggerTransition: (action?: () => void, label?: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

export const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({ children }) => {
  // Reading scroll progress line
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Instant execution without intrusive top text or popup
  const triggerTransition = useCallback((action?: () => void, _label?: string) => {
    if (action) {
      action();
    }
  }, []);

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning: false }}>
      {/* Top subtle reading scroll progress line */}
      <div
        id="scroll-progress-container"
        className="fixed top-0 left-0 right-0 z-[99999] h-[2px] pointer-events-none overflow-hidden"
      >
        <motion.div
          style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
          className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]"
        />
      </div>

      {/* Main Website Content */}
      {children}
    </TransitionContext.Provider>
  );
};

