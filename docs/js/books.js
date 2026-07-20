const prog=document.getElementById('progress');
addEventListener('scroll',()=>{
  const h=document.documentElement;
  prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});

const io=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.14,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv,.imgrv').forEach(el=>io.observe(el));

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
