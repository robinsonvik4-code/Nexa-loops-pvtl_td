# Current setup — 15 September 2026

- Supabase database setup applied and checked in project `qfqjponpijxbytipjjzo`.
- Owner account `robinsonvik4@gmail.com` exists and has a confirmed email.
- Project URL, publishable key and owner UUID are filled in `.env.example`.
- Do not create another project or owner account. Database and owner creation steps below are retained as reference only.
- Still required: add the Supabase server secret in Vercel private environment settings, deploy the complete project, then test real login and a form submission. The ChatGPT connector connection does not supply a server secret to your website.
- Get your server secret from https://supabase.com/dashboard/project/qfqjponpijxbytipjjzo/settings/api-keys . Keep it out of source control and chat.
- In Vercel, add the first three values from `.env.example`, then set `SUPABASE_SECRET_KEY` privately. Optional email notifications use `WEB3FORMS_ACCESS_KEY`.
- No secret key or account password is included in this ZIP. No hosting deployment has been made.

---

# Nexa Loops — Admin Panel

Admin panel ka code website mein integrated hai. Route: `/admin`.
**Abhi live nahi hai. Actual login aur database ko activate karne ke liye neeche ka one-time setup zaroori hai.** Koi default password ya demo login nahi diya gaya hai.

## Panel mein kya hai

- Overview: new enquiries, active conversations, portfolio and service counts.
- Enquiries: website form submissions, search, status, private notes, JSON export.
- Portfolio, services, reels/videos, before/after examples: add, edit, delete and reorder.
- Client reviews: publish only after client approval.
- Content backup: download a JSON snapshot from Overview. Restore/import UI is not included.
- Responsive desktop/mobile interface, accessible labels, keyboard focus within editors.
- Published content loads when a visitor opens/reloads the website. The open tab does not update automatically.

This package extends `Nexa_Loops_Secure_Vercel_Final.zip` and keeps its public website design. Existing example content remains until you replace it. No new invented client testimonials were added.

## 1. Database and owner login

1. Create your own project at https://supabase.com/dashboard.
2. Open SQL Editor. Paste and run the complete `database/setup.sql` file once.
3. In Authentication → Users, create your owner email/password user. Use a unique strong password. Confirm the email or use the dashboard's confirmed-user creation option as appropriate.
4. Copy that user's UUID for `ADMIN_USER_ID`. Only this exact user can open admin data, even if another user signs in successfully.
5. Disable new-user signups in your project's Auth settings; there is no signup screen in this panel.
6. Get your Project URL, publishable key and server secret key from the project API settings.

Never paste your password or server secret key into a chat, public code, or any `VITE_` variable.

## 2. Add server environment variables

Use Vercel → Project → Settings → Environment Variables:

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Your project's HTTPS URL |
| `SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |
| `SUPABASE_SECRET_KEY` | Supabase server secret key |
| `ADMIN_USER_ID` | The owner's exact user UUID |
| `WEB3FORMS_ACCESS_KEY` | Optional: existing Web3Forms key for email notification |

Once the database is connected, a valid enquiry is saved in the panel even without Web3Forms. With Web3Forms configured, the server also attempts an email notification. Email failure does not remove the saved enquiry; email retries/notification-delivery tracking are not included. If database persistence fails, the form displays an error instead of claiming the enquiry was saved.

## 3. Run on your laptop

Install Node.js 22 or later. In the extracted project folder:

```sh
npm ci
```

Copy `.env.example` to `.env.local` and fill in your real values. Delete the optional Web3Forms placeholder line if you don't use email notifications.

```sh
npm run dev
```

Open http://localhost:3000/admin. The script starts both the React website and its local API. For local login use `localhost` (a trustworthy local browser origin), not a LAN IP over plain HTTP. The session cookie is always Secure.

Without configuration the public website uses its existing content, and the admin page clearly displays “Admin setup pending”. It does not simulate successful saves.

## 4. Deploy when you are ready

Upload this project's source to your GitHub repository, then import it in Vercel as a Vite project. Build command: `npm run build`. Output: `dist`.

Keep the `api/`, `lib/`, `vercel.json`, package files, public files and source in the repository. Uploading **only** the `dist` folder to static hosting will not run the admin API or the enquiry backend. This package is prepared for Vercel; it was not deployed during creation.

Add the environment variables before deployment, then visit your HTTPS domain followed by `/admin` and sign in. Changing environment variables requires a redeployment.

## Media and daily use

- Images/video use direct HTTPS media links or existing local `/public` asset paths. An image URL must point to an image, not a Drive/Dropbox preview webpage. Reels require browser-playable direct video URLs.
- Direct file uploads, hosting of large video files, automatic image resizing and arbitrary homepage text/contact editing are not included.
- “Save to website” publishes the changed collection immediately. There is no draft/publish approval stage.
- Deleting the last item creates an intentionally empty collection. Original examples will not reappear.
- Existing collection filters are preserved. Choose the matching industry/category in the editor.
- If another session changed the same collection, the panel refuses a stale save. Reload before editing again.
- Enquiry exports include personal contact details. Store downloaded exports privately.
- Download the content JSON before major changes. Keep periodic database backups using your database provider. Backups are manual; automatic scheduling is not configured.

## Login and security boundaries

- Credentials are verified by Supabase Auth. The server independently checks the owner's UUID on each protected request.
- Session tokens are in HttpOnly, Secure, SameSite=Strict cookies, never localStorage. Sessions last at most one hour; sign in again after expiry. Unsaved edits remain on screen if a save fails.
- POST actions require the same Origin/Host. Database tables enable RLS and revoke anonymous/authenticated direct access; only the server has the elevated secret.
- Authenticated content changes validate fields and media protocols. SQL content versions prevent silent overwrite by stale tabs.
- Login attempts and enquiries use persistent database rate buckets (5 attempts per 10-minute bucket). Login buckets include hashed IP plus email. Provider auth limits also apply. At Vercel's edge, additional bot protection can be configured separately.
- Enquiry IPs are hashed with a server secret before rate-limit storage. Old rate buckets are deleted during subsequent requests.
- This version uses email/password login. It does not include MFA enrollment or an MFA code screen; accounts with verified MFA factors are denied instead of bypassing their second factor. Hosting-account 2FA is separate from application login.
- Password-reset UI is not included. Reset/recover your owner account through Supabase Auth's administrative workflow; never change the owner UUID to an untrusted user.
- No system is guaranteed hack-proof. Actual account configuration, live HTTPS, Supabase permissions, and a real end-to-end submission still need verification after connection.

## Validation

```sh
npm run lint
npm run build
npm run test:admin
```

Backend tests mock Supabase/email responses and cover unauthorized/non-owner access, cross-origin rejection, stale-save conflicts, media validation, public/private data separation, secure cookies and durable lead storage when email delivery fails. They do not verify your real account or database.

References: [Supabase Auth](https://supabase.com/docs/guides/auth), [password login](https://supabase.com/docs/guides/auth/passwords), [database access controls](https://supabase.com/docs/guides/database/postgres/row-level-security), [API secret handling](https://supabase.com/docs/guides/getting-started/api-keys).
