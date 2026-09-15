import React from 'react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { Phone, Video, Camera, Globe, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface StickyLeadFeaturesProps {
  onQuickActionSelect: (serviceName: string) => void;
}

export const StickyLeadFeatures: React.FC<StickyLeadFeaturesProps> = ({ onQuickActionSelect }) => {
  return (
    <>
      {/* Floating Desktop & Tablet WhatsApp + Call Buttons */}
      <div
        id="floating-lead-actions"
        className="fixed bottom-20 md:bottom-8 right-4 md:right-7 z-40 flex flex-col items-end gap-3 pointer-events-auto"
      >
        {/* Floating Call Button */}
        <a
          id="sticky-floating-call"
          href={`tel:${COMPANY_CONTACT.rawPhone}`}
          className="group relative flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-full bg-[#080D26] border border-cyan-500/40 text-[#00F0FF] shadow-[0_4px_20px_rgba(0,240,255,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Call Nexa Loops"
          title="Direct Phone Call: +91 75999 93336"
        >
          <Phone className="w-5 h-5" />
          <span className="hidden md:group-hover:inline-block absolute right-16 px-3 py-1.5 rounded-xl bg-[#080D26] border border-white/10 text-xs font-semibold text-white whitespace-nowrap shadow-lg">
            Call +91 75999 93336
          </span>
        </a>

        {/* Floating WhatsApp Button with pulsating ring */}
        <a
          id="sticky-floating-whatsapp"
          href={getWhatsAppUrl('Hi Nexa Loops, I visited your website and would like to discuss a project.')}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-13 h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.45)] hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Chat with Nexa Loops on WhatsApp"
          title="Chat on WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
          
          <WhatsAppIcon className="w-6 h-6 text-white" />
          <span className="hidden md:group-hover:inline-block absolute right-16 px-3 py-1.5 rounded-xl bg-[#080D26] border border-white/10 text-xs font-semibold text-white whitespace-nowrap shadow-lg">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Bottom Quick-Action Bar (Clean, App-like Bar) */}
      <div
        id="mobile-bottom-quick-bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050814]/95 border-t border-white/10 backdrop-blur-xl px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
      >
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {/* Action 1: REELS */}
          <button
            onClick={() => onQuickActionSelect('Reels / Video Shorts')}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors text-center"
          >
            <Video className="w-4 h-4 text-purple-400 mb-0.5" />
            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-tighter">
              REELS
            </span>
          </button>

          {/* Action 2: PRODUCT SHOOT */}
          <button
            onClick={() => onQuickActionSelect('Product Photography')}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors text-center"
          >
            <Camera className="w-4 h-4 text-[#00F0FF] mb-0.5" />
            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-tighter truncate w-full">
              SHOOT
            </span>
          </button>

          {/* Action 3: WEBSITE */}
          <button
            onClick={() => onQuickActionSelect('Website Development')}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors text-center"
          >
            <Globe className="w-4 h-4 text-pink-400 mb-0.5" />
            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-tighter">
              WEBSITE
            </span>
          </button>

          {/* Action 4: GET QUOTE */}
          <button
            onClick={() => onQuickActionSelect('Custom Project')}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-center shadow-md active:scale-95 transition-all"
          >
            <ArrowUpRight className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              GET QUOTE
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
