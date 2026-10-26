(function () {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const meta = document.getElementById('themeColorMeta');
  if (!button) return;
  const icon = button.querySelector('.theme-icon');
  const label = button.querySelector('.theme-label');
  const stored = (() => { try { return localStorage.getItem('ara-theme'); } catch (_) { return null; } })();
  const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  function applyTheme(theme) {
    const light = theme === 'light';
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', String(light));
    button.setAttribute('aria-label', light ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
    if (icon) icon.textContent = light ? '☾' : '☼';
    if (label) label.textContent = light ? 'Dark mode' : 'Light mode';
    if (meta) meta.setAttribute('content', light ? '#f3f1eb' : '#080909');
    try { localStorage.setItem('ara-theme', theme); } catch (_) { /* private browsing may disable storage */ }
  }
  applyTheme(stored === 'light' || stored === 'dark' ? stored : 'dark');
  button.addEventListener('click', () => applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));
})();
