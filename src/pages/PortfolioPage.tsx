import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReelsSection } from '../components/ReelsSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { ShootBtsSection } from '../components/ShootBtsSection';
import { ProductShootBtsSection } from '../components/ProductShootBtsSection';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import { Sparkles, Film, ArrowRight, Play, Camera, Sliders, Layers } from 'lucide-react';
import { getWhatsAppUrl } from '../data/mockData';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'reels' | 'bts' | 'grading'>('all');

  const handleWantThisStyle = (reelTitle: string, category: string) => {
    navigate('/contact', {
      state: {
        service: 'Reels / Shorts',
        message: `I want the style: "${reelTitle}" (${category} Reel). Please share quote and delivery schedule.`
      }
    });
  };

  const handleProjectInquire = (projectTitle: string, serviceName: string) => {
    let matchedService = 'Content Creation';
    if (serviceName.includes('Web')) matchedService = 'Website Development';
    else if (serviceName.includes('Shoots') || serviceName.includes('Shoot')) matchedService = 'Product Shoot';
    else if (serviceName.includes('Social Media')) matchedService = 'Social Media Management';

    navigate('/contact', {
      state: {
        service: matchedService,
        message: `I liked your work on "${projectTitle}" (${serviceName}) and want something similar for my brand.`
      }
    });
  };

  const handleBtsCta = (planType: string) => {
    let targetService = 'Brand Shoot';
    if (planType.includes('Model')) targetService = 'Model Management';
    else if (planType.includes('Reels')) targetService = 'Reels / Shorts';

    navigate('/contact', {
      state: {
        service: targetService,
        message: `I would like to enquire about: ${planType}. Please provide details on packages and setup.`
      }
    });
  };

  const handleProductShootQuote = (quoteType: string) => {
    navigate('/contact', {
      state: {
        service: 'Product Shoot',
        message: `I'd like to get a quote for: ${quoteType}. Please share deliverables, studio availability, and pricing.`
      }
    });
  };

  const handleEnquireEditing = (editingType: string) => {
    navigate('/contact', {
      state: {
        service: editingType.includes('Video') ? 'Video Editing' : 'Image Editing',
        message: `I need professional ${editingType} service for my commercial project. Please share turnaround times.`
      }
    });
  };

  return (
    <div className="pt-24 pb-16 bg-[#050814] min-h-screen">
      {/* 1. Portfolio Header */}
      <section className="relative pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-pink-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Film className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>NEXA LOOPS MEDIA & PRODUCTION LAB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Commercial Work, Reels & <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]">
              Behind The Scenes
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed">
            Explore our high-converting vertical reels, studio commercials, lighting setups, and raw-to-cinematic DaVinci color grades.
          </p>

          {/* Quick Filter Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Work & Labs</span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'reels'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Vertical Reels</span>
            </button>

            <button
              onClick={() => setActiveTab('bts')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'bts'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Studio Shoot BTS</span>
            </button>

            <button
              onClick={() => setActiveTab('grading')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'grading'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/[0.04] text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Color Grading Lab</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Reels Section */}
      {(activeTab === 'all' || activeTab === 'reels') && (
        <section id="portfolio-reels-section">
          <ReelsSection onWantThisStyle={handleWantThisStyle} />
        </section>
      )}

      {/* 3. Commercial Projects Showcase */}
      {(activeTab === 'all') && (
        <section id="portfolio-case-studies">
          <PortfolioSection onProjectInquire={handleProjectInquire} />
        </section>
      )}

      {/* 4. Studio Shoot BTS */}
      {(activeTab === 'all' || activeTab === 'bts') && (
        <section id="portfolio-bts-section">
          <ShootBtsSection onBtsCtaClick={handleBtsCta} />
          <ProductShootBtsSection onQuoteClick={handleProductShootQuote} />
        </section>
      )}

      {/* 5. Before / After Color Grading */}
      {(activeTab === 'all' || activeTab === 'grading') && (
        <section id="portfolio-grading-section">
          <BeforeAfterSection onEnquireEditing={handleEnquireEditing} />
        </section>
      )}

      {/* 6. Bottom Conversion Strip */}
      <section className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-purple-900/30 border border-purple-500/30 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready for your brand to look this good?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Book our studio, camera crew, or vertical reels team. We handle concept, talent, shooting, editing, and audio design.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <span>Book Shoot / Get Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={getWhatsAppUrl('Hi Nexa Loops, I reviewed your portfolio and want to discuss a shoot.')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
