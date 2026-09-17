import crypto from 'node:crypto';
import {configured, sb, authorize, cookie, setSession, sameOrigin, collections, validateContent} from '../lib/backend.js';

const MAX_BODY_BYTES = 700000;
const LOGIN_WINDOW_MESSAGE = 'Too many login attempts. Try again in ten minutes.';

const clientIp = (req) => String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
const bucketHash = (value) => crypto.createHmac('sha256', process.env.SUPABASE_SECRET_KEY).update(value).digest('hex');

async function acceptLoginAttempt(ip, email) {
  const buckets = [
    bucketHash(`login-combo:${ip}:${email}`),
    bucketHash(`login-ip:${ip}`),
    bucketHash(`login-account:${email}`)
  ];

  for (const bucket of buckets) {
    const allowed = await sb('/rest/v1/rpc/nl_accept_attempt', {
      method:'POST',
      body:JSON.stringify({bucket})
    });
    if (!allowed) return false;
  }
  return true;
}

export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('Pragma','no-cache');
  res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');

  const action = req.query.action || 'session';
  if (!['GET','POST'].includes(req.method)) return res.status(405).json({message:'Method not allowed'});

  if (req.method === 'POST') {
    const contentLength = Number(req.headers['content-length'] || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return res.status(413).json({message:'Content is too large'});
    if (!sameOrigin(req)) return res.status(403).json({message:'Request origin not allowed'});
  }

  if (!configured()) return res.status(503).json({message:'Admin setup pending. Follow ADMIN_SETUP.md to connect your database and owner account.'});

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (JSON.stringify(body).length > MAX_BODY_BYTES) return res.status(413).json({message:'Content is too large'});

  try {
    if(action === 'login' && req.method === 'POST') {
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      const password = typeof body.password === 'string' ? body.password : '';

      if (!email || !password || email.length > 254 || password.length > 256 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({message:'Enter your email and password'});
      }

      const ip = clientIp(req);
      if (!(await acceptLoginAttempt(ip, email))) return res.status(429).json({message:LOGIN_WINDOW_MESSAGE});

      let login;
      try {
        login = await sb('/auth/v1/token?grant_type=password', {
          auth:true,
          method:'POST',
          body:JSON.stringify({email,password})
        });
      } catch {
        return res.status(401).json({message:'Login failed. Check your credentials or try again later.'});
      }

      if(login.user?.id !== process.env.ADMIN_USER_ID) return res.status(403).json({message:'This account has no admin access'});
      if(login.user?.factors?.some(f=>f.status==='verified')) return res.status(403).json({message:'This account requires MFA. The current panel does not support MFA sign-in yet.'});

      setSession(res, login.access_token, Math.min(login.expires_in || 3600,3600));
      return res.json({email:login.user.email});
    }

    if(action === 'logout' && req.method === 'POST') {
      const token = cookie(req);
      setSession(res,'',0);
      if(token) await sb('/auth/v1/logout',{auth:true,token,method:'POST'}).catch(()=>{});
      return res.json({ok:true});
    }

    const user = await authorize(req);
    if(!user) return res.status(401).json({message:'Please sign in to continue'});

    if(action === 'session' && req.method === 'GET') return res.json({email:user.email});

    if(action === 'backup' && req.method === 'GET') {
      const [content, leads] = await Promise.all([
        sb('/rest/v1/nl_content?select=*&order=key.asc'),
        sb('/rest/v1/nl_leads?select=*&order=created_at.desc&limit=5000')
      ]);
      return res.json({
        backup_version:1,
        generated_at:new Date().toISOString(),
        content,
        leads
      });
    }

    if(action === 'content') {
      if(req.method==='GET') return res.json(await sb('/rest/v1/nl_content?select=*'));

      const {key,version} = body;
      if(!collections.includes(key) || !Number.isInteger(version) || version<0) return res.status(400).json({message:'Invalid content version'});

      let items;
      try { items=validateContent(key,body.items); } catch(e) { return res.status(400).json({message:e.message}); }

      const saved = await sb(`/rest/v1/nl_content?key=eq.${key}&version=eq.${version}`, {
        method:'PATCH',
        headers:{Prefer:'return=representation'},
        body:JSON.stringify({items,version:version+1,updated_at:new Date().toISOString()})
      });
      if(!saved?.length) return res.status(409).json({message:'Content changed in another session. Refresh before editing again.'});
      return res.json(saved[0]);
    }

    if(action === 'leads') {
      if(req.method==='GET') return res.json(await sb('/rest/v1/nl_leads?select=*&order=created_at.desc&limit=1000'));

      if(!/^[a-f0-9-]{36}$/.test(body.id) || !['New','Contacted','In progress','Completed','Archived'].includes(body.status) || typeof body.notes!=='string' || body.notes.length>3000) {
        return res.status(400).json({message:'Invalid lead update'});
      }

      const saved=await sb(`/rest/v1/nl_leads?id=eq.${body.id}`, {
        method:'PATCH',
        headers:{Prefer:'return=representation'},
        body:JSON.stringify({status:body.status,notes:body.notes})
      });
      if(!saved.length) return res.status(404).json({message:'Lead not found'});
      return res.json(saved[0]);
    }

    return res.status(404).json({message:'Action not found'});
  } catch (error) {
    console.error('[admin] request failed', error?.status || error?.message || 'unknown');
    return res.status(502).json({message:'Unable to reach your database. Check setup or try again.'});
  }
}
