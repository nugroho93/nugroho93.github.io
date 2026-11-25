const C='kasir-kelontong-v3';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','fonts/pjs-500.woff2','fonts/pjs-600.woff2','fonts/pjs-700.woff2','fonts/pjs-800.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 const boleh=u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
 e.respondWith(caches.match(e.request,{ignoreSearch:u.origin===location.origin}).then(r=>r||fetch(e.request).then(res=>{if(boleh&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>caches.match('index.html'))))});
