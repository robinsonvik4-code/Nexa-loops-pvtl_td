import React from 'react';

export const PortfolioCardSkeleton: React.FC = () => {
  return (
    <div
      className="rounded-3xl bg-[#090E26]/90 border border-white/10 overflow-hidden flex flex-col justify-between backdrop-blur-md relative"
      aria-hidden="true"
    >
      {/* 16:10 Media Canvas Skeleton */}
      <div className="relative aspect-[16/10] bg-[#0A1030] overflow-hidden">
        {/* Shimmer Wave */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-pulse" />
        
        {/* Top-left Industry Badge Placeholder */}
        <div className="absolute top-4 left-4">
          <div className="w-20 h-5 rounded-full bg-white/10 animate-pulse border border-white/5" />
        </div>

        {/* Ambient Center Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 blur-md animate-pulse" />
        </div>
      </div>

      {/* Card Content Skeleton */}
      <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Service Tag */}
          <div className="w-28 h-3.5 rounded bg-purple-400/20 animate-pulse mb-3" />

          {/* Project Title */}
          <div className="w-3/4 h-6 rounded bg-white/15 animate-pulse mb-2" />
          <div className="w-1/2 h-6 rounded bg-white/10 animate-pulse mb-4" />

          {/* Description Lines */}
          <div className="space-y-2 mb-5">
            <div className="w-full h-3 rounded bg-white/5 animate-pulse" />
            <div className="w-11/12 h-3 rounded bg-white/5 animate-pulse" />
            <div className="w-4/6 h-3 rounded bg-white/5 animate-pulse" />
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="w-16 h-5 rounded-lg bg-white/5 animate-pulse" />
            <div className="w-20 h-5 rounded-lg bg-white/5 animate-pulse" />
            <div className="w-14 h-5 rounded-lg bg-white/5 animate-pulse" />
          </div>
        </div>

        {/* Bottom CTA Button Placeholder */}
        <div className="pt-5 border-t border-white/[0.06]">
          <div className="w-full h-11 rounded-xl bg-white/[0.06] animate-pulse border border-white/5 flex items-center justify-center">
            <div className="w-36 h-3 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};
