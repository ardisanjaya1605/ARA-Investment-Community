/* ARA FINANCIAL ALCHEMY — PERFORMANCE HELPER */
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let ticking = false;
  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
    ticking = false;
  };
  update();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, {passive:true});
})();
