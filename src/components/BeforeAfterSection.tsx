import {useContent} from '../admin/content';
import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_DATA as DEFAULT_BEFORE_AFTER_DATA } from '../data/mockData';
import { BeforeAfterItem } from '../types';
import { Sparkles, MoveHorizontal, Sliders, ArrowRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  onEnquireEditing: (editingType: string) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onEnquireEditing }) => {
  const BEFORE_AFTER_DATA = useContent('beforeAfter', DEFAULT_BEFORE_AFTER_DATA);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem: BeforeAfterItem = BEFORE_AFTER_DATA[selectedItemIndex] || BEFORE_AFTER_DATA[0];

  const updateSliderPos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updateSliderPos(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updateSliderPos(e.touches[0].clientX);
    }
  };

  if (!currentItem) return null;
  return (
    <section id="before-after" className="relative py-24 md:py-32 bg-[#050814] border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-3">
            <Sliders className="w-3 h-3" />
            <span>High-End Retouching & Post-Production</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            PRECISION CRAFT IN EVERY PIXEL
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Drag the slider to examine raw camera sensor captures versus our master commercial color grades and retouching passes.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {BEFORE_AFTER_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedItemIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedItemIndex === idx
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                    : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Before / After Slider Showcase */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-[#080D26] border border-white/15 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                  {currentItem.category}
                </span>
                <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                  {currentItem.title}
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {currentItem.description}
                </p>
              </div>

              <button
                onClick={() => onEnquireEditing(currentItem.category)}
                className="shrink-0 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Enquire This Polish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Draggable Canvas Box */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl bg-black"
            >
              {/* After Image (Background / Right Side) */}
              <img
                src={currentItem.afterImage}
                alt={currentItem.afterLabel || 'After result'}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Image (Clipped / Left Side) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.beforeImage}
                  alt={currentItem.beforeLabel || 'Before capture'}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                  }}
                />
              </div>

              {/* LEFT: BEFORE Label */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-extrabold uppercase tracking-widest text-gray-300">
                  BEFORE • {currentItem.beforeLabel}
                </span>
              </div>

              {/* RIGHT: AFTER Label */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md border border-white/30 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
                  AFTER • {currentItem.afterLabel}
                </span>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Draggable Circular Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#050814] border-2 border-white shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center justify-center text-white cursor-ew-resize">
                  <MoveHorizontal className="w-4 h-4 text-[#00F0FF]" />
                </div>
              </div>

              {/* Hint badge at bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-gray-300 border border-white/10 flex items-center gap-1.5">
                  <MoveHorizontal className="w-3 h-3 text-purple-400" />
                  <span>Drag slider left / right</span>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
