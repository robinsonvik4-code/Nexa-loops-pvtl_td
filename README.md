# Admin panel added

Start with **ADMIN_SETUP.md** for the integrated admin panel, database setup and Vercel deployment instructions. The admin is not connected to a live account yet.

# Nexa Loops — Secure Vercel Build

Production-oriented Vite + React website for Nexa Loops.

## What was fixed

- Real lead submission flow through a Vercel serverless endpoint (`/api/lead`).
- Web3Forms access key is kept server-side in Vercel Environment Variables, not exposed in the browser bundle.
- Server-side validation for name, phone, email, service, budget, timeline and brief.
- Honeypot anti-bot field, minimum form-fill time check, same-origin check and best-effort IP rate limiting.
- Success receipt is shown only after the lead provider confirms delivery.
- Vercel SPA rewrites for `/services`, `/portfolio`, `/about`, and `/contact` so page refreshes do not 404.
- Security headers: CSP, HSTS, clickjacking protection, MIME sniffing protection, referrer policy and permissions policy.
- Fixed service-to-form mapping and invalid default budget value.
- Contact form now updates when a visitor clicks a new CTA while already on `/contact`.
- Correct sitemap routes and real local OG/logo assets.
- Removed AI Studio/Gemini/Express leftovers and unused server packages.
- Replaced unverified client logos/testimonials and absolute commercial/security claims with safer wording.
- Production sourcemaps disabled.

## Local development

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Type check:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

## Required Vercel setup for the enquiry form

1. Create/use a Web3Forms access key connected to the email that should receive Nexa Loops enquiries.
2. In Vercel open: **Project → Settings → Environment Variables**.
3. Add:

```text
WEB3FORMS_ACCESS_KEY=your_actual_access_key
```

4. Apply it to Production and Preview (Development too if you use `vercel dev`).
5. Redeploy the project.
6. Submit one test enquiry and confirm it arrives in the destination mailbox.

If the key is missing or Web3Forms is unavailable, the website does **not** show a fake success message. It asks the visitor to use WhatsApp or phone instead.

## Vercel deployment

Import the GitHub repository into Vercel. Framework detection should select **Vite** automatically.

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` already contains routing and security-header configuration.

## Important security notes

No public website can be guaranteed "100% hack-proof." This build removes the major issues found in the supplied project and reduces its attack surface. The built-in in-memory rate limiter is best-effort because serverless instances can scale independently. If form abuse becomes significant, add a distributed limiter (for example Upstash Redis/Vercel-compatible storage) and/or Cloudflare Turnstile.

Do not commit `.env` or real keys to GitHub. `.gitignore` already ignores environment files except `.env.example`.

Before launch, replace demo portfolio media and any placeholder social links with your verified Nexa Loops assets/accounts.
