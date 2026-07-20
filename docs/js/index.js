/* ============ preloader ============ */
const imgs=[1,2,3,4,5,6,7,8,9,10].map(n=>`https://shimamura-yoshihiro.jp/wp-content/themes/simamurahp/image/firstview/fv_${String(n).padStart(2,'0')}.jpg`);
const slidesEl=document.getElementById('slides');
imgs.forEach((src,i)=>{const d=document.createElement('div');d.className='s'+(i===0?' on':'');d.style.backgroundImage=`url("${src}")`;slidesEl.appendChild(d);});

let progress=0,loaded=0;
const lbar=document.getElementById('lbarfill'),lcount=document.getElementById('lcount');
function setP(p){progress=Math.max(progress,p);lbar.style.width=progress+'%';lcount.textContent=Math.round(progress);}
const pre=imgs.slice(0,4).map(src=>new Promise(res=>{const im=new Image();im.onload=im.onerror=()=>{loaded++;setP(20+loaded*18);res();};im.src=src;}));
const tick=setInterval(()=>setP(progress+Math.random()*6),180);
Promise.race([Promise.all(pre),new Promise(r=>setTimeout(r,3500))]).then(()=>{
  clearInterval(tick);setP(100);
  setTimeout(()=>{document.getElementById('loader').classList.add('done');document.querySelector('.hero').classList.add('ready');},450);
});

/* ============ hero slideshow ============ */
let cur=0;
setInterval(()=>{
  const s=slidesEl.children;
  s[cur].classList.remove('on');
  cur=(cur+1)%s.length;
  s[cur].classList.add('on');
},7000);

/* ============ scroll progress ============ */
const prog=document.getElementById('progress');
addEventListener('scroll',()=>{
  const h=document.documentElement;
  prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});

/* ============ reveals ============ */
const io=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.18,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv,.mask,.imgrv').forEach(el=>io.observe(el));

/* ============ counters ============ */
const cio=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,to=+el.dataset.to,comma=el.dataset.comma;
    const dur=1800,t0=performance.now();
    function step(t){
      const k=Math.min(1,(t-t0)/dur),ease=1-Math.pow(1-k,4);
      let v=Math.round(to*ease);
      el.textContent=comma?v.toLocaleString():v;
      if(k<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    cio.unobserve(el);
  });
},{threshold:.6});
document.querySelectorAll('.cnt').forEach(el=>cio.observe(el));

/* ============ ticker duplicate ============ */
const tt=document.getElementById('tickertrack');
tt.innerHTML+=tt.innerHTML;

/* ============ gentle parallax on ghost words & hero ============ */
const ghosts=document.querySelectorAll('.ghost');
addEventListener('scroll',()=>{
  const y=scrollY;
  ghosts.forEach(g=>{
    const r=g.getBoundingClientRect();
    if(r.top<innerHeight&&r.bottom>0){g.style.transform=`translateY(${(r.top-innerHeight/2)*0.08}px)`;}
  });
  const hero=document.querySelector('.hero-inner');
  if(hero&&y<innerHeight){hero.style.transform=`translateY(${y*0.18}px)`;hero.style.opacity=1-y/(innerHeight*0.9);}
},{passive:true});

/* ============ mobile menu ============ */
const menuBtn=document.getElementById('menuBtn');
const mobileNav=document.getElementById('mobileNav');
function closeMenu(){
  mobileNav.classList.remove('open');
  menuBtn.classList.remove('active');
  menuBtn.setAttribute('aria-expanded','false');
}
menuBtn.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('active',open);
  menuBtn.setAttribute('aria-expanded',String(open));
});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
