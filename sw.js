/* 관리부 통합 업무일지 — 서비스 워커 (홈 화면 앱·빠른 시작)
   · 화면(index.html)은 항상 네트워크 먼저 → 새 버전이 바로 반영되고, 끊기면 마지막 화면으로 열림
   · 버전이 고정된 외부 라이브러리(달력·차트·엑셀·Firebase SDK·글꼴)는 한 번 받으면 기기에 저장해 다음부터 바로 사용
   · Firebase 데이터 요청은 건드리지 않음(앱이 따로 오프라인 저장) */
const V='wl-v2';
const LIB=/^https:\/\/(cdn\.jsdelivr\.net\/npm\/(sortablejs|fullcalendar|@fullcalendar|chart\.js|xlsx|browser-image-compression|firebase|pdfjs-dist|mammoth|jszip)@|www\.gstatic\.com\/firebasejs\/|fonts\.googleapis\.com\/css2|fonts\.gstatic\.com\/)/;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(['./manifest.webmanifest','./icon-192.png'])).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;let u;try{u=new URL(r.url);}catch{return;}
  if(r.mode==='navigate'&&u.origin===location.origin){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('./',cp)).catch(()=>{});}return res;}).catch(()=>caches.match('./').then(m=>m||Response.error())));return;}
  if(u.origin===location.origin&&/\.(png|webmanifest)$/.test(u.pathname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{});}return res;})));return;}
  if(LIB.test(r.url)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{});}return res;})));}
});
