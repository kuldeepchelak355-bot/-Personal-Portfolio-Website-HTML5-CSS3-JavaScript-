const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#yr').textContent=new Date().getFullYear();
// mobile menu
$('#burger').onclick=()=>$('#links').classList.toggle('open');
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));
// theme
const root=document.documentElement;
$('#theme').onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=dark?'light':'dark'};
// active nav link
const secs=$$('main section'),links=$$('#links a[href^="#"]');
const navIO=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>navIO.observe(s));
// reveal, counters, skill bars
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('show');
t.querySelectorAll('.bar i').forEach(b=>b.style.width=b.dataset.w+'%');
t.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n;let i=0;const step=()=>{i+=Math.max(1,Math.ceil(n/40));c.textContent=Math.min(i,n);if(i<n)requestAnimationFrame(step)};step()});
io.unobserve(t)}),{threshold:.2});
$$('.reveal').forEach(el=>io.observe(el));
// project filter
$$('#filters button').forEach(b=>b.onclick=()=>{$$('#filters button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
$$('#projects article').forEach(a=>a.style.display=(b.dataset.f==='all'||a.dataset.c===b.dataset.f)?'':'none')});
// form validation
$('#form').onsubmit=e=>{e.preventDefault();const m=$('#msg');
if(!$('#name').value.trim()||!/^\S+@\S+\.\S+$/.test($('#email').value)||!$('#text').value.trim()){m.style.color='#ef4444';m.textContent='Please fill all fields with a valid email.';return}
m.style.color='#14b8a6';m.textContent='Thanks '+$('#name').value.trim()+'! Your message is ready to send once a backend is connected.';e.target.reset()};
