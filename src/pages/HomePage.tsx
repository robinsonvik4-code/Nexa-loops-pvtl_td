import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mapServiceToLeadOption } from '../data/leadFormOptions';
import { Hero } from '../components/Hero';
import { TrustedBySection } from '../components/TrustedBySection';
import { ServicesSection } from '../components/ServicesSection';
import { ReelsSection } from '../components/ReelsSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { ShootBtsSection } from '../components/ShootBtsSection';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import { WhyNexaLoops } from '../components/WhyNexaLoops';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCta } from '../components/FinalCta';
import { ArrowRight, Sparkles, Layers, Video, Film, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/contact');
  };

  const handleExploreWork = () => {
    navigate('/portfolio');
  };

  const handleServiceSelect = (serviceTitle: string) => {
    navigate('/contact', {
      state: {
        service: mapServiceToLeadOption(serviceTitle),
        message: `I'm interested in ${serviceTitle} and would like to discuss my project.`
      }
    });
  };

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

  const handleEnquireEditing = (editingType: string) => {
    navigate('/contact', {
      state: {
        service: editingType.includes('Video') ? 'Video Editing' : 'Image Editing',
        message: `I need professional ${editingType} service for my commercial project. Please share turnaround times.`
      }
    });
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        onStartProjectClick={handleStartProject}
        onExploreWorkClick={handleExploreWork}
        onSelectService={handleServiceSelect}
      />

      {/* 2. Trusted By Brand Collaborations Section */}
      <TrustedBySection />

      {/* 3. Quick Navigation Bar Between Pages */}
      <div className="relative py-6 bg-[#040714] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EXPLORE NEXA LOOPS DIVISIONS:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/services')}
                className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>All 15 Services</span>
                <ArrowRight className="w-3 h-3 ml-0.5 text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/portfolio')}
                className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-pink-600/20 border border-white/10 hover:border-pink-500/40 text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-pink-400" />
                <span>Reels & Shoot BTS</span>
                <ArrowRight className="w-3 h-3 ml-0.5 text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/40 text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>About Studio</span>
                <ArrowRight className="w-3 h-3 ml-0.5 text-gray-400" />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Instant Quote</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Disciplines / Services Grid with Link to dedicated /services page */}
      <section className="relative">
        <ServicesSection onServiceSelect={handleServiceSelect} />
        <div className="pb-16 flex justify-center bg-[#050814]">
          <button
            onClick={() => navigate('/services')}
            className="group px-7 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-purple-600/20 border border-purple-500/30 hover:border-purple-500/60 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(168,85,247,0.15)] flex items-center gap-3"
          >
            <span>Explore All 15 Production & Tech Services in Detail</span>
            <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 4. Trending Reels & Vertical Shorts */}
      <section className="relative">
        <ReelsSection onWantThisStyle={handleWantThisStyle} />
      </section>

      {/* 5. Our Work / Case Studies */}
      <section className="relative">
        <PortfolioSection onProjectInquire={handleProjectInquire} />
        <div className="pb-16 flex justify-center bg-[#050814]">
          <button
            onClick={() => navigate('/portfolio')}
            className="group px-7 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-pink-600/20 border border-pink-500/30 hover:border-pink-500/60 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(236,72,153,0.15)] flex items-center gap-3"
          >
            <span>View Complete Portfolio, Shoot BTS & Grading Lab</span>
            <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 6. Shoot BTS Highlights */}
      <ShootBtsSection onBtsCtaClick={handleBtsCta} />

      {/* 7. Before & After Retouching / Color Grading */}
      <BeforeAfterSection onEnquireEditing={handleEnquireEditing} />

      {/* 8. Why Nexa Loops */}
      <WhyNexaLoops onDiscussProjectClick={handleStartProject} />

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. Final Conversion Banner */}
      <FinalCta onStartProjectClick={handleStartProject} />
    </div>
  );
};
