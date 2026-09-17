import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type IntroPhase = 'hidden' | 'loading' | 'leaving';

export const SiteMotion: React.FC = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<IntroPhase>('hidden');

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isHome = location.pathname === '/';
    const seen = sessionStorage.getItem('nexaIntroSeen') === '1';

    if (!isHome || seen || reducedMotion) {
      root.classList.add('nexa-intro-complete');
      setPhase('hidden');
      setProgress(100);
      return;
    }

    root.classList.remove('nexa-intro-complete');
    setProgress(0);
    setPhase('loading');

    let current = 0;
    let leaveTimer: number | undefined;
    let hideTimer: number | undefined;

    const interval = window.setInterval(() => {
      current = Math.min(100, current + Math.max(3, Math.ceil(Math.random() * 8)));
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(interval);
        leaveTimer = window.setTimeout(() => {
          root.classList.add('nexa-intro-complete');
          sessionStorage.setItem('nexaIntroSeen', '1');
          setPhase('leaving');
          hideTimer = window.setTimeout(() => setPhase('hidden'), 1150);
        }, 180);
      }
    }, 55);

    return () => {
      window.clearInterval(interval);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      root.classList.add('nexa-intro-complete');
    };
  }, [location.pathname]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    frame = window.requestAnimationFrame(() => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>('#main-content section:not(#home), #main-content .nexa-reveal-block')
      );

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach((target) => target.classList.add('nexa-scroll-visible'));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add('nexa-scroll-visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
      );

      targets.forEach((target) => {
        target.classList.add('nexa-scroll-reveal');
        observer?.observe(target);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [location.pathname]);

  if (phase === 'hidden') return null;

  return (
    <>
      <div className={`nexa-loader ${phase === 'leaving' ? 'nexa-loader-leaving' : ''}`} aria-hidden="true">
        <div className="nexa-loader-inner">
          <img src="/logo.png" alt="" className="nexa-loader-logo" />
          <div className="nexa-loader-counter">{String(progress).padStart(3, '0')}</div>
          <div className="nexa-loader-line" />
        </div>
      </div>
      <div className={`nexa-reveal-mask ${phase === 'leaving' ? 'nexa-mask-leaving' : ''}`} aria-hidden="true" />
    </>
  );
};
