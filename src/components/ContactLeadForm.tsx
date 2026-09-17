import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Mail, MapPin, MessageSquare, Phone, RefreshCw, Send, Sparkles } from 'lucide-react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { LeadFormData } from '../types';
import {
  LEAD_BUDGET_OPTIONS,
  LEAD_SERVICE_OPTIONS,
  LEAD_TIMELINE_OPTIONS,
  mapServiceToLeadOption
} from '../data/leadFormOptions';

declare const __WEB3FORMS_ACCESS_KEY__: string;

interface ContactLeadFormProps {
  initialService?: string;
  initialTimeline?: string;
  initialMessage?: string;
}

const emptyForm = (service = 'Social Media Management', timeline = 'AS SOON AS POSSIBLE', message = ''): LeadFormData => ({
  fullName: '',
  phoneNumber: '',
  email: '',
  brandName: '',
  service: mapServiceToLeadOption(service),
  budgetRange: 'Not sure / Discuss first',
  startTime: timeline,
  message
});

const addHidden = (form: HTMLFormElement, name: string, value: string) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
};

const addWeb3FormsBotcheck = (form: HTMLFormElement) => {
  const botcheck = document.createElement('input');
  botcheck.type = 'checkbox';
  botcheck.name = 'botcheck';
  botcheck.tabIndex = -1;
  botcheck.setAttribute('aria-hidden', 'true');
  botcheck.style.display = 'none';
  form.appendChild(botcheck);
};

export const ContactLeadForm: React.FC<ContactLeadFormProps> = ({
  initialService = '',
  initialTimeline = 'AS SOON AS POSSIBLE',
  initialMessage = ''
}) => {
  const [formData, setFormData] = useState<LeadFormData>(
    emptyForm(initialService || 'Social Media Management', initialTimeline, initialMessage)
  );
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const formStartedAtRef = useRef(Date.now());

  useEffect(() => {
    if (initialService) setFormData((prev) => ({ ...prev, service: mapServiceToLeadOption(initialService) }));
  }, [initialService]);

  useEffect(() => {
    if (initialTimeline) setFormData((prev) => ({ ...prev, startTime: initialTimeline }));
  }, [initialTimeline]);

  useEffect(() => {
    if (initialMessage) setFormData((prev) => ({ ...prev, message: initialMessage }));
  }, [initialMessage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('lead') !== 'sent') return;

    try {
      const saved = sessionStorage.getItem('nexaLeadSuccess');
      if (saved) {
        const parsed = JSON.parse(saved) as { formData?: LeadFormData; submissionId?: string };
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.submissionId) setSubmissionId(parsed.submissionId);
      }
      setIsSubmitted(true);
      sessionStorage.removeItem('nexaLeadSuccess');
      window.history.replaceState({}, '', '/contact');
    } catch {
      setIsSubmitted(true);
      window.history.replaceState({}, '', '/contact');
    }
  }, []);

  const validate = () => {
    const next: Partial<Record<keyof LeadFormData, string>> = {};
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');

    if (formData.fullName.trim().length < 2) next.fullName = 'Please enter your full name';
    if (phoneDigits.length < 8 || phoneDigits.length > 15) next.phoneNumber = 'Please enter a valid phone number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Please enter a valid email address';
    if (!formData.service) next.service = 'Please select a service';
    if (formData.message.trim().length < 5) next.message = 'Please add a short project brief';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitNativeWeb3Forms = (ticketId: string) => {
    const accessKey = typeof __WEB3FORMS_ACCESS_KEY__ === 'string' ? __WEB3FORMS_ACCESS_KEY__.trim() : '';
    if (!accessKey) throw new Error('Web3Forms access key is missing from the current Vercel build.');

    const nativeForm = document.createElement('form');
    nativeForm.method = 'POST';
    nativeForm.action = 'https://api.web3forms.com/submit';
    nativeForm.style.display = 'none';

    addHidden(nativeForm, 'access_key', accessKey);
    addHidden(nativeForm, 'subject', `Nexa Loops Lead | ${formData.service} | ${formData.fullName}`);
    addHidden(nativeForm, 'from_name', 'Nexa Loops Website');
    addHidden(nativeForm, 'name', formData.fullName.trim());
    addHidden(nativeForm, 'phone', formData.phoneNumber.trim());
    addHidden(nativeForm, 'brand', formData.brandName.trim() || 'Not provided');
    addHidden(nativeForm, 'service', formData.service);
    addHidden(nativeForm, 'budget', formData.budgetRange);
    addHidden(nativeForm, 'timeline', formData.startTime);
    addHidden(nativeForm, 'ticket_id', ticketId);
    addHidden(nativeForm, 'message', formData.message.trim());
    if (formData.email.trim()) addHidden(nativeForm, 'email', formData.email.trim());
    addHidden(nativeForm, 'redirect', `${window.location.origin}/contact?lead=sent`);
    addWeb3FormsBotcheck(nativeForm);

    sessionStorage.setItem('nexaLeadSuccess', JSON.stringify({ formData, submissionId: ticketId }));
    document.body.appendChild(nativeForm);
    nativeForm.submit();
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
        body: JSON.stringify({ ...formData, website: honeypot, formStartedAt: formStartedAtRef.current })
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok || !result?.submissionId) {
        throw new Error(result?.message || 'Unable to validate your enquiry right now.');
      }
      if (result?.botBlocked) {
        throw new Error('Unable to send your enquiry right now. Please refresh the page and try again.');
      }

      submitNativeWeb3Forms(result.submissionId);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your enquiry right now. Please use WhatsApp or call us.');
    }
  };

  const resetForm = () => {
    setFormData(emptyForm());
    setErrors({});
    setSubmitError('');
    setSubmissionId('');
    setIsSubmitted(false);
    setIsSubmitting(false);
    formStartedAtRef.current = Date.now();
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="relative py-24 md:py-32 bg-[#060A1C] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-500/30 bg-[#080D26]/95 p-8 sm:p-12 text-center shadow-2xl">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Enquiry Sent Successfully</h2>
            <p className="mt-4 text-gray-300">Your project brief has been submitted to Nexa Loops.</p>
            {submissionId && <p className="mt-2 text-xs font-mono text-cyan-300">Reference: {submissionId}</p>}
            <button onClick={resetForm} className="mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider">
              Send Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  const fieldClass = 'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors';
  const labelClass = 'block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5';

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#060A1C] border-t border-white/5">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/10 via-pink-600/10 to-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#C084FC] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" /> Direct Commercial Enquiries
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">LET'S BUILD SOMETHING GREAT.</h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">Tell us what you need and we’ll receive the complete brief by email.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-3xl bg-[#080D26]/90 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Direct Contact</h3>
              <div className="space-y-3">
                <a href={`tel:${COMPANY_CONTACT.rawPhone}`} className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 text-cyan-300">
                  <Phone className="w-4 h-4" /> {COMPANY_CONTACT.phone}
                </a>
                <a href={getWhatsAppUrl('Hi Nexa Loops, I want to discuss a project.')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 text-emerald-300">
                  <MessageSquare className="w-4 h-4" /> WhatsApp Us
                </a>
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-pink-500/10 text-pink-300 break-all">
                  <Mail className="w-4 h-4" /> {COMPANY_CONTACT.email}
                </a>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5" /> {COMPANY_CONTACT.location}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 rounded-3xl bg-[#080D26]/95 border border-purple-500/30 p-6 sm:p-9 shadow-2xl">
            <form id="nexa-lead-form" onSubmit={handleSubmit} noValidate>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input className={fieldClass} value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="e.g. Rahul Sharma" />
                  {errors.fullName && <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>}
                </div>

                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input className={fieldClass} type="tel" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} placeholder="e.g. +91 98765 43210" />
                  {errors.phoneNumber && <p className="mt-1 text-xs text-rose-400">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input className={fieldClass} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. rahul@brand.com" />
                  {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                </div>

                <div>
                  <label className={labelClass}>Business / Brand Name</label>
                  <input className={fieldClass} value={formData.brandName} onChange={(e) => setFormData({ ...formData, brandName: e.target.value })} placeholder="Your brand name" />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Service Required *</label>
                  <select className={`${fieldClass} bg-[#090E28]`} value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    {LEAD_SERVICE_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Budget Range</label>
                  <select className={`${fieldClass} bg-[#090E28]`} value={formData.budgetRange} onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}>
                    {LEAD_BUDGET_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Preferred Start Time</label>
                  <select className={`${fieldClass} bg-[#090E28]`} value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}>
                    {LEAD_TIMELINE_OPTIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Project Message / Brief *</label>
                  <textarea className={`${fieldClass} min-h-[120px] resize-y`} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us what you want to achieve..." />
                  {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
                </div>
              </div>

              {submitError && (
                <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400">Secure validation • Spam protected • Native Web3Forms delivery</span>
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#EC4899] text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <><RefreshCw className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Project Enquiry</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
