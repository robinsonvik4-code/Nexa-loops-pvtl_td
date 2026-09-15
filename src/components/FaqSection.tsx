import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, getWhatsAppUrl } from '../data/mockData';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Search,
  Clock,
  DollarSign,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface FaqSectionProps {
  onAskQuestion?: (questionContext: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onAskQuestion }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'ALL',
    'Process & Timelines',
    'Pricing & Commercials',
    'Partnership & Rights'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Process & Timelines':
        return <Clock className="w-4 h-4 text-[#00F0FF]" />;
      case 'Pricing & Commercials':
        return <DollarSign className="w-4 h-4 text-purple-400" />;
      case 'Partnership & Rights':
        return <ShieldCheck className="w-4 h-4 text-pink-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-cyan-300" />;
    }
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.highlight && item.highlight.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCustomQuestionClick = (topic?: string) => {
    if (onAskQuestion) {
      onAskQuestion(topic || 'General FAQ Inquiry');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-[#040716] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background glow pools */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/10 via-cyan-500/10 to-pink-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>TRANSPARENCY & EXPECTATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            FREQUENTLY ASKED QUESTIONS.
          </h2>

          <p className="mt-4 text-base text-gray-300 max-w-2xl font-normal leading-relaxed">
            Clear, honest answers regarding turnaround timelines, pricing milestones, studio gear inclusions, and intellectual property rights before we initiate your campaign.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-10 space-y-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#00F0FF] via-[#8B5CF6] to-[#EC4899] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] scale-105'
                    : 'bg-white/[0.04] text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., NDA, turnaround, equipment, raw files)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all backdrop-blur-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-white/[0.02] border border-white/5">
              <HelpCircle className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <p className="text-sm text-gray-300 font-medium">No questions matched &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                }}
                className="mt-3 text-xs text-[#00F0FF] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden backdrop-blur-md ${
                    isOpen
                      ? 'bg-[#0A102E]/95 border-purple-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.15)]'
                      : 'bg-[#080D24]/70 border-white/[0.08] hover:border-white/20 hover:bg-[#090F2C]/80'
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                        {getCategoryIcon(faq.category)}
                      </div>
                      
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">
                            {faq.category}
                          </span>
                          {faq.highlight && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[10px] font-mono text-[#00F0FF] font-semibold">
                              {faq.highlight}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk',sans-serif] leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-gray-300 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#00F0FF] bg-cyan-500/10 border-cyan-500/30' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/[0.06]">
                          {/* Mobile Highlight pill */}
                          {faq.highlight && (
                            <div className="sm:hidden mb-3">
                              <span className="inline-block px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[10px] font-mono text-[#00F0FF] font-bold">
                                KEY TAKEAWAY: {faq.highlight}
                              </span>
                            </div>
                          )}

                          <p className="font-normal">{faq.answer}</p>

                          {/* Contextual Ask button for this question */}
                          <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                            <span className="text-xs text-gray-400 font-mono">
                              Need clarification on this specific policy?
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCustomQuestionClick(faq.question)}
                              className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
                            >
                              <span>Enquire about this</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Direct Contact / Still Have Questions Card */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-purple-900/30 via-[#0B1030] to-pink-900/20 border border-purple-500/30 p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-[#00F0FF] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>DIRECT EXECUTIVE ACCESS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk',sans-serif] text-white">
              Have a specific brief or unique project scope?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-lg">
              Our creative director is available for instant WhatsApp consultations or custom NDA discussions prior to product sample shipment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={getWhatsAppUrl('Hi Nexa Loops, I reviewed your FAQ section and have a custom project question regarding...')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => handleCustomQuestionClick('General Inquiry')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              <span>Submit Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
