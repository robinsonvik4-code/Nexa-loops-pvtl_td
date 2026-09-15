import React from 'react';

export const ReelCardSkeleton: React.FC = () => {
  return (
    <div
      className="shrink-0 w-[240px] md:w-auto aspect-[9/16] rounded-2xl overflow-hidden relative bg-[#090E26]/90 border border-white/10 shadow-lg snap-center flex flex-col justify-between p-3"
      aria-hidden="true"
    >
      {/* Background Shimmer Wave */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1030] via-[#050814] to-[#0A1030]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-pulse" />

      {/* Top Controls Placeholder */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {/* Category Badge */}
        <div className="w-16 h-5 rounded-full bg-white/10 animate-pulse border border-white/5" />
        {/* Play Icon Circle */}
        <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse border border-white/5" />
      </div>

      {/* Ambient Center Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-pink-500/10 blur-lg animate-pulse" />
      </div>

      {/* Bottom Metadata Placeholder */}
      <div className="relative z-10 w-full space-y-2 pb-1">
        {/* Tag line */}
        <div className="w-14 h-2.5 rounded bg-pink-400/20 animate-pulse" />

        {/* Title Lines */}
        <div className="w-5/6 h-3.5 rounded bg-white/15 animate-pulse" />
        <div className="w-3/5 h-3.5 rounded bg-white/10 animate-pulse" />

        {/* View Style CTA */}
        <div className="pt-1 flex items-center gap-1.5">
          <div className="w-20 h-3 rounded bg-purple-400/20 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
