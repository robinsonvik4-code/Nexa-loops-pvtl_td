import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Zap, Target, Video, Globe, Camera, Layers, CheckCircle } from 'lucide-react';

interface CreativeLeadEngineProps {
  onNodeSelect?: (serviceName: string) => void;
}

export const CreativeLeadEngine: React.FC<CreativeLeadEngineProps> = ({ onNodeSelect }) => {
  const [activeNode, setActiveNode] = useState<string>('REELS');
  const [pulseCount, setPulseCount] = useState<number>(142);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nodes = ['CONTENT', 'ADS', 'WEBSITES', 'SHOOTS', 'REELS'];
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      setActiveNode(randomNode);
      setPulseCount((prev) => prev + 1);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const nodes = [
    {
      id: 'CONTENT',
      label: 'CONTENT',
      sub: 'Viral Storytelling',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      glow: 'shadow-pink-500/30',
      pos: 'top-2 left-6 md:top-4 md:left-8',
      serviceQuery: 'Content Creation'
    },
    {
      id: 'ADS',
      label: 'ADS',
      sub: 'High-ROI Scaling',
      icon: Target,
      color: 'from-amber-400 to-orange-500',
      glow: 'shadow-orange-500/30',
      pos: 'top-2 right-6 md:top-4 md:right-8',
      serviceQuery: 'Digital Advertising'
    },
    {
      id: 'SHOOTS',
      label: 'SHOOTS',
      sub: 'Studio & Macro 4K',
      icon: Camera,
      color: 'from-cyan-400 to-blue-500',
      glow: 'shadow-cyan-500/30',
      pos: 'bottom-4 left-4 md:bottom-8 md:left-6',
      serviceQuery: 'Product Photography'
    },
    {
      id: 'WEBSITES',
      label: 'WEBSITES',
      sub: 'High-Speed Tech',
      icon: Globe,
      color: 'from-blue-500 to-indigo-600',
      glow: 'shadow-blue-500/30',
      pos: 'bottom-4 right-4 md:bottom-8 md:right-6',
      serviceQuery: 'Website Development'
    },
    {
      id: 'REELS',
      label: 'REELS',
      sub: 'Vertical Attention',
      icon: Video,
      color: 'from-purple-500 to-fuchsia-600',
      glow: 'shadow-purple-500/30',
      pos: 'left-1/2 -translate-x-1/2 -top-6 md:-top-4',
      serviceQuery: 'Reels / Video Shorts'
    }
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="creative-lead-engine-container"
      className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
      style={{
        perspective: '1000px',
        transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Background Ambient Glow & Circular Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-purple-600/15 via-cyan-500/10 to-pink-500/15 blur-3xl" />
        <div className="w-[78%] h-[78%] rounded-full border border-purple-500/20 animate-[spin_60s_linear_infinite]" />
        <div className="w-[60%] h-[60%] rounded-full border border-cyan-500/25 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
        <div className="w-[42%] h-[42%] rounded-full border border-pink-500/20" />
      </div>

      {/* SVG Vector Energy Transmission Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Connected Lines converging to center (250, 250) */}
        {/* REELS top: (250, 50) */}
        <line
          x1="250"
          y1="75"
          x2="250"
          y2="200"
          stroke="url(#lineGrad)"
          strokeWidth={activeNode === 'REELS' ? 2.5 : 1}
          strokeDasharray="4 4"
          filter="url(#glowFilter)"
          className="transition-all duration-300"
        />
        {/* CONTENT top-left: (90, 110) */}
        <line
          x1="120"
          y1="120"
          x2="210"
          y2="210"
          stroke="url(#lineGrad)"
          strokeWidth={activeNode === 'CONTENT' ? 2.5 : 1}
          strokeDasharray="4 4"
          filter="url(#glowFilter)"
        />
        {/* ADS top-right: (400, 110) */}
        <line
          x1="380"
          y1="120"
          x2="290"
          y2="210"
          stroke="url(#lineGrad)"
          strokeWidth={activeNode === 'ADS' ? 2.5 : 1}
          strokeDasharray="4 4"
          filter="url(#glowFilter)"
        />
        {/* SHOOTS bottom-left: (110, 390) */}
        <line
          x1="130"
          y1="380"
          x2="210"
          y2="290"
          stroke="url(#lineGrad)"
          strokeWidth={activeNode === 'SHOOTS' ? 2.5 : 1}
          strokeDasharray="4 4"
          filter="url(#glowFilter)"
        />
        {/* WEBSITES bottom-right: (390, 390) */}
        <line
          x1="370"
          y1="380"
          x2="290"
          y2="290"
          stroke="url(#lineGrad)"
          strokeWidth={activeNode === 'WEBSITES' ? 2.5 : 1}
          strokeDasharray="4 4"
          filter="url(#glowFilter)"
        />
      </svg>

      {/* Central Engine Core: LEADS */}
      <div
        id="engine-core-leads"
        onClick={() => onNodeSelect?.('All Services (Full Growth)')}
        className="relative z-20 group cursor-pointer"
        title="Nexa Loops Conversion Engine: Generating Enquiries"
      >
        {/* Radiant Pulse Rings */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#A855F7]/30 via-[#EC4899]/30 to-[#00F0FF]/30 blur-xl animate-pulse-slow" />
        <div className="absolute -inset-2 rounded-full border border-purple-400/40 animate-ping opacity-25 pointer-events-none" />

        <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full bg-[#080D26]/90 border-2 border-purple-500/50 backdrop-blur-2xl p-3 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:scale-105">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#00F0FF] mb-1">
            <Zap className="w-3 h-3 animate-bounce" />
            ENGINE CORE
          </div>

          <div className="text-2xl md:text-3xl font-extrabold font-['Space_Grotesk',sans-serif] tracking-wider text-white">
            LEADS
          </div>

          <div className="text-[11px] font-semibold text-gray-300 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>High Conversion</span>
          </div>

          <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.08] text-[9px] font-mono text-purple-200 border border-white/10">
            Active: <span className="font-bold text-white">{activeNode}</span>
          </div>
        </div>
      </div>

      {/* Satellite Service Nodes */}
      {nodes.map((node) => {
        const isActive = activeNode === node.id;
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            onClick={() => {
              setActiveNode(node.id);
              onNodeSelect?.(node.serviceQuery);
            }}
            className={`absolute z-20 cursor-pointer ${node.pos} transition-all duration-300 transform`}
          >
            <div
              className={`flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-2.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                isActive
                  ? 'bg-[#0E1538] border-purple-400 text-white shadow-lg scale-105 ' + node.glow
                  : 'bg-[#080D26]/80 border-white/10 text-gray-300 hover:border-white/30 hover:text-white hover:scale-102'
              }`}
            >
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr ${node.color} text-white shadow-md`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs md:text-sm font-bold font-['Space_Grotesk',sans-serif] tracking-wide text-white">
                  {node.label}
                </span>
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">
                  {node.sub}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Real-Time Conversion Toast Simulation */}
      <div className="absolute -bottom-6 md:-bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B1030]/90 border border-emerald-500/30 text-[10px] md:text-xs text-gray-200 shadow-xl backdrop-blur-md">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>New inquiry generated via <strong className="text-white font-semibold">{activeNode}</strong> funnel</span>
        </div>
      </div>
    </div>
  );
};
