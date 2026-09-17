import React from 'react';
import { ArrowRight, MessageSquare, Play } from 'lucide-react';
import { getWhatsAppUrl } from '../data/mockData';

interface HeroProps {
  onStartProjectClick: () => void;
  onExploreWorkClick: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProjectClick,
  onExploreWorkClick,
  onSelectService
}) => {
  const serviceLinks = ['Reels & Shorts', 'Product Shoots', 'Web Development'];

  return (
    <section id="home" className="nexa-cinematic-hero">
      <div className="nexa-hero-grid" aria-hidden="true" />
      <div className="nexa-hero-glow nexa-hero-glow-one" aria-hidden="true" />
      <div className="nexa-hero-glow nexa-hero-glow-two" aria-hidden="true" />

      <div className="nexa-hero-shell">
        <div className="nexa-hero-copy">
          <div className="nexa-hero-eyebrow">
            NEXA LOOPS / CREATIVE + DIGITAL STUDIO
          </div>

          <h1 className="nexa-hero-title" aria-label="Ideas that move. Brands that grow.">
            <span className="nexa-title-row">
              <span className="nexa-title-mask"><span>IDEAS</span></span>
            </span>
            <span className="nexa-title-row nexa-title-gradient">
              <span className="nexa-title-mask"><span>THAT MOVE.</span></span>
            </span>
          </h1>

          <div className="nexa-hero-bottom-row">
            <p className="nexa-hero-description">
              High-retention content, product shoots, web experiences and performance marketing — shaped under one creative direction for ambitious brands.
            </p>

            <div className="nexa-hero-actions">
              <button onClick={onStartProjectClick} className="nexa-cinematic-cta">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button onClick={onExploreWorkClick} className="nexa-cinematic-secondary">
                <Play className="w-4 h-4 fill-current" />
                <span>Explore Work</span>
              </button>

              <a
                href={getWhatsAppUrl('Hi Nexa Loops, I would like to discuss a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="nexa-cinematic-whatsapp"
                aria-label="Chat with Nexa Loops on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="nexa-hero-service-row">
            <span className="nexa-hero-service-label">Core disciplines</span>
            <div className="nexa-hero-service-links">
              {serviceLinks.map((service) => (
                <button key={service} onClick={() => onSelectService(service)}>
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="nexa-hero-art-wrap" aria-label="Nexa Loops creative production visual">
          <div className="nexa-hero-art">
            <div className="nexa-art-lines" aria-hidden="true" />
            <div className="nexa-art-panel" aria-hidden="true" />
            <div className="nexa-art-orbit" aria-hidden="true">
              <span className="nexa-art-orbit-core" />
              <span className="nexa-art-orbit-ring ring-one" />
              <span className="nexa-art-orbit-ring ring-two" />
            </div>

            <div className="nexa-art-copy">
              <span>Creative production • digital growth</span>
              <strong>From brief to<br />final frame.</strong>
            </div>

            <div className="nexa-art-links">
              {serviceLinks.map((service, index) => (
                <button key={service} onClick={() => onSelectService(service)}>
                  <span>0{index + 1}</span>
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="nexa-scroll-mark" aria-hidden="true">Scroll to explore</div>
    </section>
  );
};
