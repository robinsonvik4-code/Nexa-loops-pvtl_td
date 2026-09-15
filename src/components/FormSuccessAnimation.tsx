import React, { useState } from 'react';
import { motion, type Variants } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Check,
  Copy,
  MessageSquare,
  RefreshCw,
  Clock,
  ShieldCheck,
  Phone,
  Sparkles,
  ExternalLink,
  Layers,
  Calendar,
  Wallet,
  Briefcase
} from 'lucide-react';
import { COMPANY_CONTACT, getWhatsAppUrl } from '../data/mockData';
import { LeadFormData } from '../types';

interface FormSuccessAnimationProps {
  formData: LeadFormData;
  submissionId: string;
  onReset: () => void;
}

export const FormSuccessAnimation: React.FC<FormSuccessAnimationProps> = ({
  formData,
  submissionId,
  onReset
}) => {
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Format current submission timestamp
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  const getWhatsAppBriefMessage = () => {
    return `Hi Nexa Loops! I just submitted an inquiry on your website:
• Ticket ID: ${submissionId}
• Name: ${formData.fullName}
• Brand: ${formData.brandName || 'N/A'}
• Service: ${formData.service}
• Timeline: ${formData.startTime}
• Budget: ${formData.budgetRange}
• Brief: "${formData.message}"

Please connect with me to discuss next steps.`;
  };

  const handleCopyTicket = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(submissionId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2200);
    }
  };

  const handleCopySummary = () => {
    if (navigator.clipboard) {
      const summaryText = `[NEXA LOOPS COMMERCIAL INQUIRY RECEIPT]
Ticket Reference: ${submissionId}
Client Name: ${formData.fullName}
Brand/Company: ${formData.brandName || 'Not specified'}
Service Requested: ${formData.service}
Expected Timeline: ${formData.startTime}
Budget Scope: ${formData.budgetRange}
Phone: ${formData.phoneNumber}
Email: ${formData.email || 'N/A'}
Brief: ${formData.message}
Submitted: ${dateString} at ${timeString}`;

      navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2200);
    }
  };

  // Motion variants for container and children
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.09,
        delayChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      id="framer-motion-message-received"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="py-4 flex flex-col items-center text-center w-full"
    >
      {/* Animated Glowing Success Icon Badge */}
      <motion.div variants={itemVariants} className="relative mb-6">
        {/* Pulsing Emerald Radial Blur */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.45, 0.75, 0.45]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -inset-4 bg-gradient-to-r from-emerald-500/30 via-[#00F0FF]/25 to-purple-500/20 rounded-full blur-xl pointer-events-none"
        />

        {/* Ambient Orbiting Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 0.1, 0.5]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          className="absolute -inset-2 rounded-full border border-emerald-400/40 pointer-events-none"
        />

        {/* SVG Drawing Checkmark with Gradient Stroke */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#081326] border border-emerald-400/50 flex items-center justify-center shadow-[0_0_35px_rgba(52,211,153,0.35)]">
          <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 72 72">
            <defs>
              <linearGradient id="emeraldCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* Outer Circle Drawing Path */}
            <motion.circle
              cx="36"
              cy="36"
              r="30"
              fill="none"
              stroke="url(#emeraldCyanGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1, rotate: 0 }}
              transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
            />

            {/* Inner Checkmark Drawing Path */}
            <motion.path
              d="M23 37 L32 46 L50 26"
              fill="none"
              stroke="#34D399"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Pill Badge: Message Received */}
      <motion.div variants={itemVariants} className="mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(52,211,153,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>MESSAGE RECEIVED • BRIEF LOGGED</span>
        </div>
      </motion.div>

      {/* Main Title & Confirmation Text */}
      <motion.div variants={itemVariants} className="max-w-xl mx-auto mb-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-white tracking-tight leading-tight">
          Thank You, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-300">{formData.fullName}</span>!
        </h3>

        <p className="mt-2.5 text-sm sm:text-base text-gray-300 leading-relaxed">
          Your project inquiry was accepted by the Nexa Loops enquiry system. Keep the reference below for follow-up, and our team will respond as soon as possible during business hours.
        </p>
      </motion.div>

      {/* Official Commercial Receipt Card */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-xl rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 backdrop-blur-xl text-left relative overflow-hidden mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Top Edge Gradient Accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-400 via-[#00F0FF] to-purple-500" />

        {/* Header with Reference Ticket & Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-0.5">
              COMMERCIAL INQUIRY TICKET
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono font-bold text-white tracking-wider">
                {submissionId}
              </span>
              <button
                type="button"
                onClick={handleCopyTicket}
                title="Copy reference ticket"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 text-[11px] font-medium transition-colors"
              >
                {copiedTicket ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-gray-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Status: Enquiry Received</span>
            </div>
            <span className="text-[10px] text-gray-400 block mt-1">
              Logged {dateString} • {timeString}
            </span>
          </div>
        </div>

        {/* Parameter Recap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1 mb-1">
              <Layers className="w-3 h-3 text-purple-400" /> Service
            </span>
            <span className="text-xs font-semibold text-white block truncate" title={formData.service}>
              {formData.service}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-[#00F0FF]" /> Timeline
            </span>
            <span className="text-xs font-semibold text-cyan-300 block truncate" title={formData.startTime}>
              {formData.startTime}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1 mb-1">
              <Wallet className="w-3 h-3 text-emerald-400" /> Budget
            </span>
            <span className="text-xs font-semibold text-emerald-300 block truncate" title={formData.budgetRange}>
              {formData.budgetRange}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1 mb-1">
              <Briefcase className="w-3 h-3 text-pink-400" /> Brand
            </span>
            <span className="text-xs font-semibold text-white block truncate" title={formData.brandName || 'Direct'}>
              {formData.brandName || 'Direct Client'}
            </span>
          </div>
        </div>

        {/* Message Extract */}
        <div className="pt-3.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
            Submitted Brief:
          </span>
          <p className="text-xs text-gray-300 italic line-clamp-2 bg-black/20 p-2.5 rounded-lg border border-white/5">
            "{formData.message}"
          </p>
        </div>
      </motion.div>

      {/* Immediate Next Actions Hub */}
      <motion.div variants={itemVariants} className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
        {/* Fast-Track WhatsApp Dispatch */}
        <a
          id="confirm-whatsapp-btn"
          href={getWhatsAppUrl(getWhatsAppBriefMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 group"
        >
          <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>FAST-TRACK ON WHATSAPP</span>
          <ExternalLink className="w-3 h-3 opacity-70 ml-0.5" />
        </a>

        {/* Copy Formatted Brief Button */}
        <button
          type="button"
          onClick={handleCopySummary}
          className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
        >
          {copiedSummary ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">BRIEF COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-400" />
              <span>COPY BRIEF</span>
            </>
          )}
        </button>

        {/* Reset / New Enquiry */}
        <button
          type="button"
          onClick={onReset}
          className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
          <span>NEW ENQUIRY</span>
        </button>
      </motion.div>

      {/* Production SLA & Assurances */}
      <motion.div
        variants={itemVariants}
        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-gray-400"
      >
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>SLA: Under 2 hours</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Confidentiality Protected (NDA)</span>
        </span>
        <a
          href={`tel:${COMPANY_CONTACT.rawPhone}`}
          className="flex items-center gap-1.5 text-purple-300 hover:text-purple-200 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Direct Hotline: {COMPANY_CONTACT.phone}</span>
        </a>
      </motion.div>
    </motion.div>
  );
};
