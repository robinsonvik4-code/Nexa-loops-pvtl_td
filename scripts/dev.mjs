import http from 'node:http';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
// Local development only. Node loads the untracked environment file.
if(fs.existsSync('.env.local')) process.loadEnvFile('.env.local');
const handlers={admin:(await import('../api/admin.js')).default,content:(await import('../api/content.js')).default,lead:(await import('../api/lead.js')).default};
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const handler=handlers[url.pathname.slice(5)];
 res.status=n=>{res.statusCode=n;return res;};res.json=data=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));};
 if(!handler)return res.status(404).json({message:'Not found'});
 req.query=Object.fromEntries(url.searchParams);
 try {let raw='';for await(const c of req){raw+=c;if(raw.length>700000)return res.status(413).json({message:'Too large'});}req.body=raw?JSON.parse(raw):{};await handler(req,res);}catch{res.status(400).json({message:'Invalid request'});}
});
server.listen(3001,'127.0.0.1');
const vite=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1'],{stdio:'inherit'});
function stop(){server.close();vite.kill();}
process.on('SIGINT',stop);process.on('SIGTERM',stop);vite.on('exit',()=>{server.close();});
