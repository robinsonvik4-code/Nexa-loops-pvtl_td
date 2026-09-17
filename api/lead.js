import { serverConfigured, sb, sameOrigin } from '../lib/backend.js';
import crypto from 'node:crypto';

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_BODY_BYTES = 20000;
const requestsByIp = new Map();

const SERVICE_OPTIONS = new Set([
  'Social Media Management',
  'Content Creation',
  'Reels / Shorts',
  'Product Shoot',
  'Brand Shoot',
  'Model Management',
  'Shoot Management',
  'Website Development',
  'App Development',
  'Digital Advertising',
  'Branding',
  'Video Editing',
  'Image Editing',
  'YouTube Management',
  'Other'
]);

const BUDGET_OPTIONS = new Set([
  'Not sure / Discuss first',
  'Under ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000+'
]);

const TIMELINE_OPTIONS = new Set([
  'AS SOON AS POSSIBLE',
  'THIS WEEK',
  'THIS MONTH',
  'JUST EXPLORING'
]);

const cleanText = (value, maxLength) => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n?/g, '\n')
    .trim()
    .slice(0, maxLength);
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    requestsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestsByIp.set(ip, recent);
  return false;
};

const buildTicketId = () =>
  `NL-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

const rateBucket = (value) =>
  crypto.createHmac('sha256', process.env.SUPABASE_SECRET_KEY).update(value).digest('hex');

async function acceptPersistentAttempt(bucket) {
  return sb('/rest/v1/rpc/nl_accept_attempt', {
    method:'POST',
    body:JSON.stringify({bucket})
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, message: 'Enquiry is too large.' });
  }

  if (!sameOrigin(req)) {
    return res.status(403).json({ ok: false, message: 'Request origin is not allowed.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      message: 'Too many requests. Please wait a few minutes or contact us on WhatsApp.'
    });
  }

  if (serverConfigured()) {
    try {
      const allowed = await acceptPersistentAttempt(rateBucket(`lead-ip:${ip}`));
      if (!allowed) {
        return res.status(429).json({
          ok: false,
          message: 'Too many enquiries. Please try again in ten minutes.'
        });
      }
    } catch (error) {
      console.warn(
        '[lead] database IP rate-limit check failed; continuing with local rate limit',
        error?.status || error?.message || 'unknown'
      );
    }
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (JSON.stringify(body).length > MAX_BODY_BYTES) {
    return res.status(413).json({ ok: false, message: 'Enquiry is too large.' });
  }

  if (cleanText(body.website, 120)) {
    const blockedId = buildTicketId();
    console.warn('[lead] honeypot blocked', { submissionId: blockedId });
    return res.status(200).json({ ok: true, submissionId: blockedId, botBlocked: true });
  }

  const formStartedAt = Number(body.formStartedAt || 0);
  const ageMs = Date.now() - formStartedAt;
  if (
    !Number.isFinite(formStartedAt) ||
    formStartedAt <= 0 ||
    ageMs < 1800 ||
    ageMs > 24 * 60 * 60 * 1000
  ) {
    return res.status(400).json({
      ok: false,
      message: 'Please refresh the page and try again.'
    });
  }

  const fullName = cleanText(body.fullName, 80);
  const phoneNumber = cleanText(body.phoneNumber, 30);
  const email = cleanText(body.email, 120).toLowerCase();
  const brandName = cleanText(body.brandName, 100);
  const service = cleanText(body.service, 80);
  const budgetRange = cleanText(body.budgetRange, 80);
  const startTime = cleanText(body.startTime, 80);
  const message = cleanText(body.message, 2000);

  const phoneDigits = phoneNumber.replace(/\D/g, '');
  const validEmail = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (fullName.length < 2 || fullName.length > 80) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid full name.' });
  }
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid phone number.' });
  }
  if (!validEmail) {
    return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
  }
  if (!SERVICE_OPTIONS.has(service)) {
    return res.status(400).json({ ok: false, message: 'Please select a valid service.' });
  }
  if (!BUDGET_OPTIONS.has(budgetRange)) {
    return res.status(400).json({ ok: false, message: 'Please select a valid budget range.' });
  }
  if (!TIMELINE_OPTIONS.has(startTime)) {
    return res.status(400).json({ ok: false, message: 'Please select a valid start time.' });
  }
  if (message.length < 5) {
    return res.status(400).json({ ok: false, message: 'Please add a short project brief.' });
  }

  if (serverConfigured()) {
    try {
      const identity = email ? `email:${email}` : `phone:${phoneDigits}`;
      const allowed = await acceptPersistentAttempt(rateBucket(`lead-contact:${identity}`));
      if (!allowed) {
        return res.status(429).json({
          ok: false,
          message: 'Too many enquiries from these contact details. Please wait ten minutes or use WhatsApp.'
        });
      }
    } catch (error) {
      console.warn(
        '[lead] contact rate-limit check failed; continuing with IP protection',
        error?.status || error?.message || 'unknown'
      );
    }
  }

  const submissionId = buildTicketId();
  let stored = false;

  if (serverConfigured()) {
    try {
      await sb('/rest/v1/nl_leads', {
        method: 'POST',
        body: JSON.stringify({
          ticket_id: submissionId,
          full_name: fullName,
          phone: phoneNumber,
          email,
          brand: brandName,
          service,
          budget: budgetRange,
          timeline: startTime,
          message
        })
      });
      stored = true;
    } catch (error) {
      console.error(
        '[lead] database save failed; continuing to browser email delivery',
        error?.status || error?.message || 'unknown'
      );
    }
  }

  return res.status(200).json({
    ok: true,
    submissionId,
    stored,
    deliveryMode: 'browser-web3forms'
  });
}
