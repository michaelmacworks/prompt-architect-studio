import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { aliases } from '../src/content.js';
const root = resolve('dist');
const port = Number(process.env.PAS_PREVIEW_PORT || 4174);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.webmanifest':'application/manifest+json','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server = http.createServer(async (req,res) => {
 try {
  const url = new URL(req.url,'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname);
  if (aliases[pathname]) {res.writeHead(301,{Location:aliases[pathname]});res.end();return;}
  if (pathname.startsWith('/api/')) {res.writeHead(404,{'Content-Type':'text/plain'});res.end('This demonstration has no API endpoint.');return;}
  let file = resolve(root, '.'+pathname);
  if (file !== root && !file.startsWith(root+sep)) {res.writeHead(404);res.end();return;}
  let status = 200;
  try { if ((await stat(file)).isDirectory()) file = resolve(file,'index.html'); await stat(file); }
  catch {try{await stat(file+'.html');file=file+'.html';}catch{file=resolve(root,'404.html');status=404;}}
  const extension = file.slice(file.lastIndexOf('.'));
  const body = await readFile(file);
  res.writeHead(status,{'Content-Type':types[extension]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
  res.end(req.method === 'HEAD' ? undefined : body);
 } catch {res.writeHead(500,{'Content-Type':'text/plain'});res.end('Preview could not read this file.');}
});
server.listen(port,'127.0.0.1',()=>console.log('Full local prototype: http://127.0.0.1:'+port+'/'));
