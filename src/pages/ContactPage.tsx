import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactLeadForm } from '../components/ContactLeadForm';
import { FaqSection } from '../components/FaqSection';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const locationState = (location.state as { service?: string; timeline?: string; message?: string }) || {};

  const [prefilledService, setPrefilledService] = useState<string>(locationState.service || 'Social Media Management');
  const [prefilledTimeline, setPrefilledTimeline] = useState<string>(locationState.timeline || 'AS SOON AS POSSIBLE');
  const [prefilledMessage, setPrefilledMessage] = useState<string>(locationState.message || '');

  useEffect(() => {
    const nextState = (location.state as { service?: string; timeline?: string; message?: string }) || {};
    setPrefilledService(nextState.service || 'Social Media Management');
    setPrefilledTimeline(nextState.timeline || 'AS SOON AS POSSIBLE');
    setPrefilledMessage(nextState.message || '');
  }, [location.key, location.state]);

  const handleFaqInquiry = (topic: string) => {
    setPrefilledMessage(`Hi Nexa Loops, I was reviewing your FAQ and have a question regarding: "${topic}". Please provide more details on deliverables and process.`);
    const formElement = document.getElementById('contact');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-16 bg-[#050814] min-h-screen">
      {/* 1. Page Header */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>DIRECT STUDIO INQUIRY & QUOTE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Let’s Build Something <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]">
              Exceptional Together
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed">
            Fill out the brief below to receive a tailored proposal and delivery schedule, or chat directly with our team on WhatsApp for a faster conversation.
          </p>

          {/* Quick Contact Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <a
              href={getWhatsAppUrl('Hi Nexa Loops, I want an instant quote for my project.')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/50 transition-all flex items-start gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Fastest Response</div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">WhatsApp Chat</div>
                <div className="text-xs text-gray-400 mt-0.5">Usually the fastest channel</div>
              </div>
            </a>

            <a
              href={`tel:${COMPANY_CONTACT.rawPhone}`}
              className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 hover:border-cyan-500/50 transition-all flex items-start gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Phone Call</div>
                <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{COMPANY_CONTACT.phone}</div>
                <div className="text-xs text-gray-400 mt-0.5">Mon–Sat, 9:30 AM–8:00 PM</div>
              </div>
            </a>

            <a
              href={`mailto:${COMPANY_CONTACT.email}`}
              className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/25 hover:border-pink-500/50 transition-all flex items-start gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-pink-400 uppercase tracking-wider">Email Inquiry</div>
                <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors truncate max-w-[150px]">
                  {COMPANY_CONTACT.email}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Detailed RFPs & Briefs</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Lead Form */}
      <section className="relative">
        <ContactLeadForm
          initialService={prefilledService}
          initialTimeline={prefilledTimeline}
          initialMessage={prefilledMessage}
        />
      </section>

      {/* 3. Studio HQ & Location Details */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#00F0FF] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>STUDIO HEADQUARTERS</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Located in Aligarh. Serving Brands Across India.
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Our in-house studio is equipped for product shoots, vertical video production, podcasts, and editing suites. For brand shoots and commercial projects, our on-location production crew travels nationwide.
              </p>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Studio Base:</strong> Dauhrra Mafi, Aligarh, Uttar Pradesh
                    <div className="text-[11px] text-[#00F0FF] mt-0.5 font-medium">
                      Serving Brands Pan-India (Delhi NCR, Mumbai, Bengaluru & Nationwide)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Operating Hours:</strong> Monday – Saturday: 9:30 AM – 8:00 PM IST (Sunday by appointment)
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Turnaround Speed:</strong> Commercial quotes provided within 2 to 4 business hours.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#080D26] border border-white/10 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Direct Creative Director Consultation</h4>
              <p className="text-xs text-gray-400 max-w-sm mb-5">
                Every project is reviewed directly by our lead creatives, not handed off to outsourced entry-level contractors.
              </p>
              <a
                href={getWhatsAppUrl('Hi Nexa Loops, I want to book a direct 15-minute discovery consultation call.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Book 15-Min Discovery Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Frequently Asked Questions (FAQ) Section */}
      <section className="relative">
        <FaqSection onAskQuestion={handleFaqInquiry} />
      </section>
    </div>
  );
};
