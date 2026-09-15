import React from 'react';

interface LogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  showTagline = false,
  size = 'md',
  className = '',
  onClick
}) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 42 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]';

  return (
    <div
      id="nexa-loops-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-all duration-300 ${onClick ? 'cursor-pointer hover:opacity-95' : ''} ${className}`}
    >
      {/* Nexa Loops Infinity Loop Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize * 1.35}
          height={iconSize}
          viewBox="0 0 54 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_12px_rgba(168,85,247,0.55)] transition-transform duration-500 hover:scale-105"
        >
          <defs>
            {/* Nexa Loops signature gradient: Electric Blue -> Purple -> Magenta */}
            <linearGradient id="nexaLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="25%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>

            <linearGradient id="nexaGlowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Underlay glow path */}
          <path
            d="M17 6C23 6 27 16 32 16C37 16 41 12 41 8C41 4 37 2 32 2C26 2 21 12 17 16C12 16 8 12 8 8C8 4 12 2 17 2C22 2 27 12 32 16C37 20 41 24 41 24C41 28 37 30 32 30C26 30 21 20 17 16C12 12 8 8 8 8"
            stroke="url(#nexaGlowGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            filter="url(#softGlow)"
          />

          {/* Primary Infinity Loop Double Torus Geometry */}
          <path
            d="M16 8 C11 8 7 11.5 7 16 C7 20.5 11 24 16 24 C21.5 24 25.5 18 28.5 14 C31.5 10 35.5 8 40 8 C45 8 49 11.5 49 16 C49 20.5 45 24 40 24 C34.5 24 30.5 18 27.5 14 C24.5 10 20.5 8 16 8 Z"
            stroke="url(#nexaLoopGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Core light accent dots */}
          <circle cx="28" cy="15" r="1.5" fill="#FFFFFF" opacity="0.9" />
          <circle cx="16" cy="16" r="1.2" fill="#00F0FF" />
          <circle cx="40" cy="16" r="1.2" fill="#EC4899" />
        </svg>
      </div>

      {/* Wordmark typography:
          "Nexa" = White
          "Loop" = Purple / Magenta gradient
          Final "s" = White
      */}
      <div className="flex flex-col">
        <div className={`font-['Space_Grotesk',sans-serif] font-bold tracking-tight leading-none ${textSize}`}>
          <span className="text-white">Nexa</span>
          <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#EC4899] bg-clip-text text-transparent ml-1">
            Loop
          </span>
          <span className="text-white">s</span>
        </div>

        {showTagline && (
          <span className={`tracking-[0.24em] font-semibold text-gray-400 mt-1 uppercase leading-none ${taglineSize}`}>
            INNOVATE. CONNECT. ELEVATE.
          </span>
        )}
      </div>
    </div>
  );
};
