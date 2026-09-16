import {serverConfigured, configured, sb} from '../lib/backend.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  const result = {
    ok: true,
    env: {
      supabaseUrl: Boolean(process.env.SUPABASE_URL),
      supabaseSecret: Boolean(process.env.SUPABASE_SECRET_KEY),
      supabasePublishable: Boolean(process.env.SUPABASE_PUBLISHABLE_KEY),
      adminUserId: Boolean(process.env.ADMIN_USER_ID),
      web3forms: Boolean(process.env.WEB3FORMS_ACCESS_KEY)
    },
    serverConfigured: serverConfigured(),
    adminConfigured: configured(),
    supabaseReachable: false,
    supabaseStatus: null
  };

  if (serverConfigured()) {
    try {
      await sb('/rest/v1/nl_leads?select=id&limit=1');
      result.supabaseReachable = true;
      result.supabaseStatus = 200;
    } catch (error) {
      result.supabaseStatus = error?.status || 500;
    }
  }

  return res.status(200).json(result);
}
