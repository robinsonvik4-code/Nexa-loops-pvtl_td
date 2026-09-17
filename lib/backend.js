export const serverConfigured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
export const configured = () => Boolean(serverConfigured() && process.env.SUPABASE_PUBLISHABLE_KEY && process.env.ADMIN_USER_ID);

export async function sb(path, {auth = false, token, ...options} = {}) {
  const key = auth ? process.env.SUPABASE_PUBLISHABLE_KEY : process.env.SUPABASE_SECRET_KEY;
  const response = await fetch(`${process.env.SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: key,
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type':'application/json',
      ...options.headers
    },
    signal: AbortSignal.timeout(12000)
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error('Backend request failed');
    error.status = response.status;
    throw error;
  }
  return data;
}

function readCookie(req, name) {
  return (req.headers.cookie || '')
    .split(';')
    .map(v => v.trim())
    .find(v => v.startsWith(`${name}=`))
    ?.slice(name.length + 1) || '';
}

export function cookie(req) {
  return readCookie(req, '__Host-nl_session') || readCookie(req, 'nl_session');
}

export function setSession(res, token, seconds = 3600) {
  const maxAge = Math.max(0, Math.min(Number(seconds) || 0, 3600));
  const secureCookie = `__Host-nl_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}; Priority=High`;
  const retireLegacyCookie = 'nl_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0; Priority=High';
  res.setHeader('Set-Cookie', [secureCookie, retireLegacyCookie]);
}

export async function authorize(req) {
  const token = cookie(req);
  if (!token) return null;
  try {
    const user = await sb('/auth/v1/user', {auth:true, token});
    return user.id === process.env.ADMIN_USER_ID && !user.factors?.some(f=>f.status==='verified') ? user : null;
  } catch {
    return null;
  }
}

export function sameOrigin(req) {
  const fetchSite = String(req.headers['sec-fetch-site'] || '').toLowerCase();
  if (fetchSite === 'cross-site') return false;

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host) return false;

  try {
    const originUrl = new URL(origin);
    return originUrl.protocol === 'https:' && originUrl.host === host;
  } catch {
    return false;
  }
}

export const collections = ['portfolio','services','reels','beforeAfter','testimonials'];

const fields = {
  portfolio:['id','title','industry','service','description','image','tags'],
  services:['id','title','shortDesc','category','icon','popular'],
  reels:['id','title','category','description','thumbnail','videoUrl','tag'],
  beforeAfter:['id','title','category','description','beforeImage','afterImage','beforeLabel','afterLabel'],
  testimonials:['id','name','company','quote']
};

const required = {
  portfolio:['title','image','industry','service'],
  services:['title','shortDesc','category','icon'],
  reels:['title','thumbnail','videoUrl','category'],
  beforeAfter:['title','beforeImage','afterImage'],
  testimonials:['name','quote']
};

const enums = {industry:['FASHION','JEWELLERY','REAL ESTATE','PRODUCT','WEBSITES','SOCIAL MEDIA']};

export function validateContent(key, items) {
  if (!collections.includes(key) || !Array.isArray(items) || items.length > 200) throw new Error('Invalid collection');
  const ids = new Set();

  return items.map(item => {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !/^[\w-]{1,80}$/.test(item.id) || ids.has(item.id)) {
      throw new Error('Invalid or duplicate ID');
    }
    ids.add(item.id);

    for (const f of required[key]) {
      if (typeof item[f] !== 'string' || !item[f].trim()) throw new Error(`Please fill ${f}`);
    }

    const result = {};
    for (const f of fields[key]) {
      const v = item[f];
      if (f === 'popular') {
        result[f] = Boolean(v);
        continue;
      }
      if (f === 'tags') {
        if (!Array.isArray(v) || v.length > 12 || v.some(t=>typeof t !== 'string' || t.length>100)) throw new Error('Invalid tags');
        result[f] = v;
        continue;
      }
      if (v === undefined) {
        result[f]='';
        continue;
      }
      if (typeof v !== 'string' || v.length > 3000) throw new Error('Text too long');
      if (/image|thumbnail|videoUrl/i.test(f) && v) {
        if (!(v.startsWith('/') && !v.startsWith('//'))) {
          let u;
          try { u = new URL(v); } catch { throw new Error('Use a valid HTTPS media link'); }
          if (u.protocol !== 'https:' || u.username || u.password) throw new Error('Use HTTPS media links');
        }
      }
      if (enums[f] && !enums[f].includes(v)) throw new Error('Invalid category');
      result[f]=v.trim();
    }

    if (key==='services' && !['content','shoots','tech','growth','design'].includes(result.category)) throw new Error('Invalid service category');
    if (key==='reels' && !['Fashion','Jewellery','Real Estate','Beauty','Products','Business Promotions'].includes(result.category)) throw new Error('Invalid reel category');
    return result;
  });
}
