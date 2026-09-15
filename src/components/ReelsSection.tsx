import {useContent} from '../admin/content';
import React, { useState, useRef } from 'react';
import { REELS_DATA as DEFAULT_REELS_DATA, getWhatsAppUrl } from '../data/mockData';
import { ReelItem } from '../types';
import { ReelCardSkeleton } from './skeletons/ReelCardSkeleton';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Play, Pause, Volume2, VolumeX, X, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReelsSectionProps {
  onWantThisStyle: (styleName: string, category: string) => void;
}

interface ReelCardItemProps {
  reel: ReelItem;
  onOpenModal: (reel: ReelItem) => void;
}

const ReelCardItem: React.FC<ReelCardItemProps> = ({ reel, onOpenModal }) => {
  const [thumbLoaded, setThumbLoaded] = useState<boolean>(false);

  return (
    <div
      id={`reel-card-${reel.id}`}
      onClick={() => onOpenModal(reel)}
      className="shrink-0 w-[240px] md:w-auto aspect-[9/16] rounded-2xl overflow-hidden relative cursor-pointer group snap-center border border-white/10 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(236,72,153,0.3)] bg-[#0A0E24]"
    >
      {/* Thumbnail Skeleton Shimmer while loading */}
      {!thumbLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-3 bg-[#0A1030] animate-pulse">
          <div className="flex items-center justify-between">
            <div className="w-16 h-5 rounded-full bg-white/10" />
            <div className="w-7 h-7 rounded-full bg-white/10" />
          </div>
          <div className="space-y-1.5 pb-1">
            <div className="w-14 h-2.5 rounded bg-pink-400/20" />
            <div className="w-4/5 h-3.5 rounded bg-white/15" />
            <div className="w-3/5 h-3.5 rounded bg-white/10" />
          </div>
        </div>
      )}

      {/* Thumbnail Image */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        onLoad={() => setThumbLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
          thumbLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

      {/* Category & Tag Pill */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#00F0FF] border border-white/10">
          {reel.category}
        </span>
        <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-pink-500 transition-colors">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </span>
      </div>

      {/* Bottom Card Info */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300">
          {reel.tag}
        </span>
        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mt-0.5">
          {reel.title}
        </h3>
        <div className="mt-2 text-[11px] font-semibold text-purple-300 flex items-center gap-1 group-hover:text-pink-300">
          <span>View Style</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
};

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onWantThisStyle }) => {
  const REELS_DATA = useContent('reels', DEFAULT_REELS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Fashion',
    'Jewellery',
    'Real Estate',
    'Beauty',
    'Products',
    'Business Promotions'
  ];

  const handleCategoryChange = (cat: string) => {
    if (cat === selectedCategory) return;
    setIsFiltering(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsFiltering(false);
    }, 260);
  };

  const filteredReels = selectedCategory === 'All'
    ? REELS_DATA
    : REELS_DATA.filter(r => r.category === selectedCategory);

  const handleOpenModal = (reel: ReelItem) => {
    setActiveModalReel(reel);
    setIsVideoLoading(true);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const handleCloseModal = () => {
    setActiveModalReel(null);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="reels" className="relative py-24 md:py-32 bg-[#050814] border-t border-white/5 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" />
              <span>9:16 Vertical Video Production</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-none">
              SHORT CONTENT.
              <br />
              <span className="bg-gradient-to-r from-[#C084FC] via-[#EC4899] to-[#F43F5E] bg-clip-text text-transparent">
                BIG ATTENTION.
              </span>
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl">
              Engineered with psychological hooks, pacing, and 4K cinema optics that convert passive scrollers into committed customers.
            </p>
          </div>

          {/* Carousel desktop controls */}
          <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              aria-label="Previous reels"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              aria-label="Next reels"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Reel Cards - Horizontal scroll snap on mobile, grid/carousel on desktop */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-5 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-6 md:pb-0 scrollbar-none"
        >
          {isFiltering ? (
            /* Skeletons while dynamic category is switching */
            Array.from({ length: 6 }).map((_, idx) => (
              <ReelCardSkeleton key={`reel-skeleton-${idx}`} />
            ))
          ) : (
            filteredReels.map((reel) => (
              <ReelCardItem
                key={reel.id}
                reel={reel}
                onOpenModal={handleOpenModal}
              />
            ))
          )}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-center gap-2 text-xs text-gray-400 mt-2">
          <span>Swipe horizontally to view all reels</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

      </div>

      {/* Premium Video Modal */}
      {activeModalReel && (
        <div
          id="reel-preview-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0E24] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-white border border-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left 9:16 Video Player Column */}
            <div className="relative w-full md:w-[380px] shrink-0 bg-black aspect-[9/16] max-h-[55vh] md:max-h-[85vh] flex items-center justify-center overflow-hidden">
              {/* Buffering/Loading Skeleton Screen */}
              {isVideoLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070A1E] backdrop-blur-md animate-pulse">
                  <div className="w-12 h-12 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin mb-3 shadow-[0_0_20px_rgba(236,72,153,0.4)]" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                    BUFFERING 4K EDITORIAL MASTER
                  </span>
                  <span className="text-[9px] font-mono text-gray-400 mt-1">
                    9:16 CINEMATOGRAPHY
                  </span>
                </div>
              )}

              <video
                ref={videoRef}
                src={activeModalReel.videoUrl}
                poster={activeModalReel.thumbnail}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onLoadedData={() => setIsVideoLoading(false)}
                onCanPlay={() => setIsVideoLoading(false)}
                onWaiting={() => setIsVideoLoading(true)}
                onPlaying={() => setIsVideoLoading(false)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isVideoLoading ? 'opacity-40' : 'opacity-100'
                }`}
              />

              {/* In-video controls overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>

            {/* Right Information & Lead Generation Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto flex-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                    {activeModalReel.category} Reel
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {activeModalReel.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white mt-3">
                  {activeModalReel.title}
                </h3>

                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  {activeModalReel.description}
                </p>

                {/* Production Attributes Checklist */}
                <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Production Highlights Included
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Cinema 4K Resolution</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span>Dynamic Viral Hook</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>Custom Sound Design</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Full Color Grade</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Conversion CTAs */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                {/* Button 1: I WANT THIS STYLE */}
                <button
                  id="modal-i-want-this-style-btn"
                  onClick={() => {
                    onWantThisStyle(activeModalReel.title, activeModalReel.category);
                    handleCloseModal();
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#EC4899] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>I WANT THIS STYLE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Button 2: ASK ON WHATSAPP */}
                <a
                  id="modal-ask-on-whatsapp-btn"
                  href={getWhatsAppUrl(`Hi Nexa Loops, I liked your ${activeModalReel.category} Reel style (${activeModalReel.title}) and want something similar for my brand.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm uppercase tracking-wider hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>ASK ON WHATSAPP</span>
                </a>

                <p className="text-center text-[11px] text-gray-400 mt-1">
                  Immediate response via WhatsApp • Direct production consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
