/* ARA FINANCIAL ALCHEMY — APP */

(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const rupiah = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);

  window.compound = function(){
    const p=Number($('pv').value)||0, r=(Number($('rate').value)||0)/100, n=Number($('years').value)||0;
    $('fv').textContent=rupiah(p*Math.pow(1+r,n));
  };
  window.breakEven = function(){
    const f=Number($('fixed').value)||0,p=Number($('price').value)||0,v=Number($('variable').value)||0;
    $('be').textContent=p>v?Math.ceil(f/(p-v)).toLocaleString('id-ID')+' unit':'Tidak valid';
  };

  document.querySelectorAll('.product-btn').forEach(btn=>btn.addEventListener('click',()=>{
    $('productInterest').value=btn.dataset.product||'';
    $('contact').scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>$('productInterest').focus({preventScroll:true}),450);
  }));

  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver((entries,obs)=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}});
    },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
    revealItems.forEach(el=>io.observe(el));
  }else revealItems.forEach(el=>el.classList.add('is-visible'));

  const header=document.querySelector('.site-header');
  const syncHeader=()=>header.classList.toggle('scrolled',window.scrollY>12);
  syncHeader(); window.addEventListener('scroll',syncHeader,{passive:true});

  const navLinks=[...document.querySelectorAll('.nav a')];
  const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if('IntersectionObserver' in window){
    const nio=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(s=>nio.observe(s));
  }

  const form=$('leadForm'),status=$('status');
  const clean=(v,max=1000)=>String(v??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').trim().slice(0,max);
  let submitting=false;

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(submitting)return;
    const raw=Object.fromEntries(new FormData(form).entries());

    if(clean(raw.website,100)){
      status.className='status err';status.textContent='Permintaan tidak dapat diproses.';return;
    }

    const data={
      name:clean(raw.name,80),email:clean(raw.email,120).toLowerCase(),whatsapp:clean(raw.whatsapp,25),
      city:clean(raw.city,80),risk:clean(raw.risk,30),horizon:clean(raw.horizon,30),
      product_interest:clean(raw.product_interest,120),message:clean(raw.message,1000),consent:true
    };

    if(!data.name||!data.email||!data.whatsapp||!data.risk||!data.horizon){
      status.className='status err';status.textContent='Mohon lengkapi data wajib terlebih dahulu.';return;
    }

    submitting=true;status.className='status ok';status.textContent='Mengamankan dan mengirim data...';
    try{
      const r=await fetch('/api/leads',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data),credentials:'same-origin'
      });
      let result={};try{result=await r.json()}catch(_){}
      if(!r.ok||result.success!==true)throw new Error('Request failed');
      status.textContent='Terima kasih. Data Anda telah diterima ARA.';form.reset();
    }catch(_){
      status.className='status err';status.textContent='Pengiriman belum tersedia atau terjadi gangguan. Silakan coba lagi.';
    }finally{submitting=false}
  });

  compound();breakEven();
})();
