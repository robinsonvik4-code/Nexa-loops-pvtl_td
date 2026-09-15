import {useContent} from '../admin/content';
import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS as DEFAULT_PORTFOLIO_PROJECTS } from '../data/mockData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PortfolioCardSkeleton } from './skeletons/PortfolioCardSkeleton';

interface PortfolioSectionProps {
  onProjectInquire: (projectName: string, serviceName: string) => void;
}

interface PortfolioCardProps {
  project: (typeof DEFAULT_PORTFOLIO_PROJECTS)[number];
  onProjectInquire: (projectName: string, serviceName: string) => void;
}

const PortfolioCardItem: React.FC<PortfolioCardProps> = ({ project, onProjectInquire }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div
      id={`portfolio-card-${project.id}`}
      className="group rounded-3xl bg-[#090E26]/80 border border-white/10 hover:border-purple-500/40 overflow-hidden flex flex-col justify-between backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_-12px_rgba(139,92,246,0.3)]"
    >
      {/* Image Container with Progressive Skeleton Loader */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#070B20]">
        {/* Skeleton Shimmer while image is loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#090E28] animate-pulse">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent animate-pulse" />
            <div className="absolute top-4 left-4 w-20 h-5 rounded-full bg-white/10" />
            <div className="w-10 h-10 rounded-full bg-purple-500/10 blur-sm" />
          </div>
        )}

        <img
          src={project.image}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090E26] via-transparent to-transparent opacity-80" />

        {/* Industry Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-extrabold uppercase tracking-widest text-[#00F0FF]">
            {project.industry}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-1">
            {project.service}
          </div>

          <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-white leading-snug group-hover:text-purple-200 transition-colors">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-gray-300 leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contextual CTA */}
        <div className="mt-8 pt-5 border-t border-white/[0.08]">
          <button
            onClick={() => onProjectInquire(project.title, project.service)}
            className="w-full py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white text-gray-200 border border-white/10 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <span>CREATE SOMETHING LIKE THIS</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onProjectInquire }) => {
  const PORTFOLIO_PROJECTS = useContent('portfolio', DEFAULT_PORTFOLIO_PROJECTS);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const filterTabs = [
    'ALL',
    'FASHION',
    'JEWELLERY',
    'REAL ESTATE',
    'PRODUCT',
    'WEBSITES',
    'SOCIAL MEDIA'
  ];

  const handleFilterChange = (tab: string) => {
    if (tab === activeFilter) return;
    setIsFiltering(true);
    setActiveFilter(tab);
    setTimeout(() => {
      setIsFiltering(false);
    }, 280);
  };

  const filteredProjects = activeFilter === 'ALL'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.industry === activeFilter);

  return (
    <section id="work" className="relative py-24 md:py-32 bg-[#060A1C] border-t border-white/5">
      {/* Background glow pools */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[#00F0FF] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Selected Case Studies & Commercial Craft</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            WORK THAT MAKES BRANDS LOOK BETTER
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Real commercial photography, bespoke code, and high-production content executed with obsessive attention to craft.
          </p>

          {/* Industry Filter Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterChange(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#8B5CF6] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                    : 'bg-white/[0.04] text-gray-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isFiltering ? (
            /* Skeleton Screens during dynamic filter loading */
            Array.from({ length: 6 }).map((_, idx) => (
              <PortfolioCardSkeleton key={`portfolio-skeleton-${idx}`} />
            ))
          ) : (
            filteredProjects.map((project) => (
              <PortfolioCardItem
                key={project.id}
                project={project}
                onProjectInquire={onProjectInquire}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

