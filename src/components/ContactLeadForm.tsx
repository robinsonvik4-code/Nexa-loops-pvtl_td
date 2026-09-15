import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { LeadFormData } from '../types';
import { LEAD_SERVICE_OPTIONS, LEAD_BUDGET_OPTIONS, LEAD_TIMELINE_OPTIONS, mapServiceToLeadOption } from '../data/leadFormOptions';
import { FormSuccessAnimation } from './FormSuccessAnimation';
import {
  Send,
  Phone,
  MessageSquare,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Mail,
  MapPin
} from 'lucide-react';

interface ContactLeadFormProps {
  initialService?: string;
  initialTimeline?: string;
  initialMessage?: string;
}

export const ContactLeadForm: React.FC<ContactLeadFormProps> = ({
  initialService = '',
  initialTimeline = 'AS SOON AS POSSIBLE',
  initialMessage = ''
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    brandName: '',
    service: mapServiceToLeadOption(initialService || 'Social Media Management'),
    budgetRange: 'Not sure / Discuss first',
    startTime: initialTimeline || 'AS SOON AS POSSIBLE',
    message: initialMessage || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const formStartedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: mapServiceToLeadOption(initialService) }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialTimeline) {
      setFormData(prev => ({ ...prev, startTime: initialTimeline }));
    }
  }, [initialTimeline]);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const serviceOptions = LEAD_SERVICE_OPTIONS;
  const budgetOptions = LEAD_BUDGET_OPTIONS;
  const timelineOptions = LEAD_TIMELINE_OPTIONS;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,16}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a short description of your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate() || isSubmitting) return;

    setSubmitError('');
    setIsSubmitting(true);

    const formElement = e.currentTarget;
    const honeypot = (formElement.elements.namedItem('website') as HTMLInputElement | null)?.value || '';

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          formStartedAt: formStartedAtRef.current
        })
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok || !result?.submissionId) {
        throw new Error(result?.message || 'Unable to send your enquiry right now.');
      }

      setSubmissionId(result.submissionId);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your enquiry right now. Please use WhatsApp or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      brandName: '',
      service: 'Social Media Management',
      budgetRange: 'Not sure / Discuss first',
      startTime: 'AS SOON AS POSSIBLE',
      message: ''
    });
    setIsSubmitted(false);
    setErrors({});
    setSubmitError('');
    formStartedAtRef.current = Date.now();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#060A1C] border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-pink-600/10 to-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Direct Commercial Enquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
            LET'S BUILD SOMETHING GREAT.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Tell us about your brand vision, upcoming campaign, or production requirement. We’ll review your brief and respond as soon as possible during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards & Quick Direct Reaches */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <div className="p-6 rounded-3xl bg-[#080D26]/90 border border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-bold font-['Space_Grotesk',sans-serif] text-white mb-4">
                Fast-Track Communication
              </h3>
              
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Prefer direct communication? Connect directly with our creative directors for immediate consultation.
              </p>

              {/* Direct Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  id="contact-call-now-btn"
                  href={`tel:${COMPANY_CONTACT.rawPhone}`}
                  className="py-3.5 px-4 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-[#00F0FF] hover:bg-cyan-500/25 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL NOW (+91 75999 93336)</span>
                </a>

                <a
                  id="contact-whatsapp-btn"
                  href={getWhatsAppUrl('Hi Nexa Loops, I visited your website and would like to discuss a project.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP US INSTANTLY</span>
                </a>
              </div>
            </div>

            {/* Official Agency Details */}
            <div className="p-6 rounded-3xl bg-[#080D26]/90 border border-white/10 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Phone & WhatsApp:</span>
                  <a href={`tel:${COMPANY_CONTACT.rawPhone}`} className="text-white font-semibold hover:text-[#00F0FF] transition-colors">
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Official Email:</span>
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-white font-semibold hover:text-[#00F0FF] transition-colors break-all">
                    {COMPANY_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Studio Location:</span>
                  <span className="text-white font-semibold">
                    {COMPANY_CONTACT.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Promise */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 leading-relaxed">
              🔒 <strong className="text-gray-200">Privacy-first enquiries:</strong> Your form is sent through our secure server endpoint and is not exposed with a public mail key in the browser.
            </div>
          </div>

          {/* Right Column: Lead Form or Success State */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-[#080D26]/95 border border-purple-500/30 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <FormSuccessAnimation
                    key="form-success-animation"
                    formData={formData}
                    submissionId={submissionId}
                    onReset={handleResetForm}
                  />
                ) : (
                  /* Primary Lead Generation Form */
                  <motion.form
                    key="nexa-lead-form"
                    id="nexa-lead-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                    
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Full Name <span className="text-pink-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        autoComplete="name"
                        maxLength={80}
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                          errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-purple-400'
                        } text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Phone Number <span className="text-pink-500">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={30}
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                          errors.phoneNumber ? 'border-rose-500' : 'border-white/10 focus:border-purple-400'
                        } text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@brand.com"
                        autoComplete="email"
                        maxLength={120}
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                          errors.email ? 'border-rose-500' : 'border-white/10 focus:border-purple-400'
                        } text-sm text-white placeholder-gray-500 focus:outline-none transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Business / Brand Name */}
                    <div>
                      <label htmlFor="brandName" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Business / Brand Name
                      </label>
                      <input
                        id="brandName"
                        type="text"
                        value={formData.brandName}
                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                        placeholder="e.g. Astra Jewel Studio"
                        autoComplete="organization"
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Service Required Dropdown */}
                    <div className="sm:col-span-2">
                      <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Service Required <span className="text-pink-500">*</span>
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090E28] border border-white/15 focus:border-purple-400 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#080D26] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label htmlFor="budgetRange" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        id="budgetRange"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090E28] border border-white/15 focus:border-purple-400 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-[#080D26] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Start Time */}
                    <div>
                      <label htmlFor="startTime" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Preferred Start Time
                      </label>
                      <select
                        id="startTime"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#090E28] border border-white/15 focus:border-purple-400 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        {timelineOptions.map((t) => (
                          <option key={t} value={t} className="bg-[#080D26] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Message */}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Project Message / Brief <span className="text-pink-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you'd like to achieve, target platforms, or specific styles..."
                        maxLength={2000}
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${
                          errors.message ? 'border-rose-500' : 'border-white/10 focus:border-purple-400'
                        } text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-y`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                  </div>

                  {submitError && (
                    <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submission Button */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-400">
                      🔒 Server-validated enquiry • Anti-spam protected
                    </span>

                    <button
                      id="submit-enquiry-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#EC4899] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>SENDING BRIEF...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>SEND PROJECT ENQUIRY</span>
                        </>
                      )}
                    </button>
                  </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
