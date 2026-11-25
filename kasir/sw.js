const C='kasir-kelontong-v6';
const F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','fonts/pjs-500.woff2','fonts/pjs-600.woff2','fonts/pjs-700.woff2','fonts/pjs-800.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 // Halaman utama: ambil versi terbaru dari internet dulu, pakai cache kalau offline
 if(r.mode==='navigate'||(u.origin===location.origin&&/\/(index\.html)?$/.test(u.pathname))){
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('index.html',cp))}return res}).catch(()=>caches.match('index.html')));return}
 const boleh=u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
 e.respondWith(caches.match(r,{ignoreSearch:u.origin===location.origin}).then(x=>x||fetch(r).then(res=>{if(boleh&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
