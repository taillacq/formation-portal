/* Aperçu facultatif, Node 18+ ; aucune installation de paquet. */
'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8'};
const server=http.createServer((req,res)=>{
  let rel;try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);rel=pathname.replace(/^\/formation-portal(?=\/|$)/,'').replace(/^\/+/, '')||'index.html';}catch{res.writeHead(400);res.end();return;}
  const file=path.resolve(root,rel);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Introuvable');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
});
server.listen(4173,'127.0.0.1',()=>console.log('Aperçu : http://127.0.0.1:4173/formation-portal/'));
