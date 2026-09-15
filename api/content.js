import {configured,sb} from '../lib/backend.js';
export default async function handler(req,res) {
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET') return res.status(405).json({message:'Method not allowed'});
 if(!configured()) return res.json({});
 try {
  const rows = await sb('/rest/v1/nl_content?select=key,items');
  return res.json(Object.fromEntries(rows.filter(r=>r.items!==null).map(r=>[r.key,r.items])));
 } catch {return res.status(503).json({message:'Content unavailable'});}
}
