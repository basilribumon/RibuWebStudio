import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = process.argv[2] ?? '.';
const root = fileURLToPath(new URL(`../${base}/`, import.meta.url));
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain','.mp4':'video/mp4','.webm':'video/webm' };
createServer(async (req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const safe=normalize(pathname).replace(/^([/\\]|\.\.(?:[/\\]|$))+/, '');
    let path=join(root,safe||'index.html');
    try {
      if((await stat(path)).isDirectory()) path=join(path,'index.html');
    } catch {
      const publicPath=join(root,'public',safe);
      try { await stat(publicPath); path=publicPath; }
      catch { path=join(root,'index.html'); }
    }
    const body=await readFile(path);res.writeHead(200,{'content-type':types[extname(path)]||'application/octet-stream'});res.end(body);
  } catch { res.writeHead(404);res.end('Not found'); }
}).listen(Number(process.env.PORT)||4173,()=>console.log(`LYROX STUDIO at http://localhost:${Number(process.env.PORT)||4173}`));
