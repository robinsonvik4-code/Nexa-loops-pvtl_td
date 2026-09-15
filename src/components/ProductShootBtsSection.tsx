import React, { useState } from 'react';
import { PRODUCT_SHOOT_BTS_DATA } from '../data/mockData';
import { Sparkles, ArrowRight, Camera, CheckCircle2, Sliders, Layers } from 'lucide-react';

interface ProductShootBtsSectionProps {
  onQuoteClick: (quoteType: string) => void;
}

export const ProductShootBtsSection: React.FC<ProductShootBtsSectionProps> = ({ onQuoteClick }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<'bts' | 'final'>('final');

  const currentItem = PRODUCT_SHOOT_BTS_DATA[selectedProjectIndex];

  const workflowSteps = [
    'Product placement',
    'Lighting adjustment',
    'Camera closeups',
    'Macro photography',
    'Studio setup',
    'Creative direction',
    'Final product result'
  ];

  return (
    <section id="product-bts" className="relative py-24 md:py-32 bg-[#060A1C] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00F0FF] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Studio Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            FROM SETUP TO FINAL SHOT
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            See the rigorous technical workflow transforming raw product geometry into clean, high-ticket commercial visuals.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pan-India Product Intake: Courier your products to our studio from any city in India</span>
          </div>

          {/* Contextual CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onQuoteClick('Product Shoot Quote')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-105 transition-all"
            >
              GET PRODUCT SHOOT QUOTE
            </button>
            <button
              onClick={() => onQuoteClick('Photos + Video Package')}
              className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/15 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            >
              PHOTOS + VIDEO PACKAGE
            </button>
            <button
              onClick={() => onQuoteClick('Monthly Product Content Retainer')}
              className="px-6 py-3 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 text-xs font-bold uppercase tracking-wider transition-all"
            >
              MONTHLY PRODUCT CONTENT
            </button>
          </div>
        </div>

        {/* Workflow Checklist Badges */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] font-medium text-gray-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Project Selector Tabs */}
        <div className="flex justify-center mb-8 gap-2">
          {PRODUCT_SHOOT_BTS_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedProjectIndex === idx
                  ? 'bg-white/15 text-white border border-purple-400/50 shadow-md'
                  : 'bg-white/[0.03] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Interactive BTS -> FINAL RESULT Stage Container */}
        <div className="rounded-3xl bg-[#080D26] border border-white/15 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
          
          {/* Toggle Switch between BTS and Final Result */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                {currentItem.clientCategory}
              </span>
              <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white">
                {currentItem.title}
              </h3>
            </div>

            {/* Interactive Switch Pill */}
            <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/15">
              <button
                onClick={() => setActiveView('bts')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeView === 'bts'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Behind The Scenes</span>
              </button>

              <button
                onClick={() => setActiveView('final')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeView === 'final'
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#3B82F6] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Final Commercial Shot</span>
              </button>
            </div>
          </div>

          {/* Visual Showcase Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
            
            {/* Image Stage */}
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <img
                src={activeView === 'bts' ? currentItem.btsImage : currentItem.finalImage}
                alt={`${currentItem.title} - ${activeView === 'bts' ? 'BTS Setup' : 'Final Result'}`}
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* View Overlay Tag */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md border ${
                    activeView === 'bts'
                      ? 'bg-purple-900/80 text-purple-200 border-purple-400/40'
                      : 'bg-emerald-900/80 text-emerald-200 border-emerald-400/40'
                  }`}
                >
                  {activeView === 'bts' ? '🎥 Studio Setup & Lighting Rig' : '✨ Commercial Final Output'}
                </span>
              </div>
            </div>

            {/* Stage Notes Breakdown */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                {activeView === 'bts' ? 'Production Setup Details' : 'Commercial Deliverable Merits'}
              </div>

              <div className="space-y-3">
                {(activeView === 'bts' ? currentItem.setupNotes : currentItem.finalResultNotes).map((note, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => onQuoteClick(`Product Shoot: ${currentItem.title}`)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Production Level</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
