# Security Notes

## Implemented

- CSP with a hash for the inline JSON-LD block.
- HSTS over HTTPS.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`.
- Restrictive browser permissions policy.
- Strict referrer policy.
- No exposed form-provider key in frontend code.
- Same-origin POST check on `/api/lead`.
- Server-side field allowlists and length limits.
- Honeypot and human-time check.
- Best-effort per-IP submission throttling.
- No success state until Web3Forms confirms the request.
- Source maps disabled in production.

## Operational recommendations

- Keep Vercel account 2FA enabled.
- Protect the connected GitHub account with 2FA and review app permissions.
- Rotate the Web3Forms key if it is ever exposed.
- Review Vercel deployment logs for unusual `/api/lead` traffic.
- Add Cloudflare Turnstile and a distributed rate limiter if spam volume increases.
- Keep dependencies updated and review security advisories before major upgrades.
