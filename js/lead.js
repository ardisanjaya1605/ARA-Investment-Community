/* ARA FINANCIAL ALCHEMY — LEAD INTAKE */
(() => {
  'use strict';

  // Change only this URL after deploying apps-script/Code.gs as a Web App.
  const LEAD_ENDPOINT = window.ARA_LEAD_ENDPOINT || 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  const form = document.getElementById('araLeadForm');
  if (!form) return;

  const status =
    document.getElementById('formStatus') ||
    document.getElementById('status');

  function collectLeadData() {
    const fd = new FormData(form);
    return {
      submitted_at: new Date().toISOString(),
      source: 'ARA Financial Alchemy Website',
      full_name: fd.get('full_name') || '',
      email: fd.get('email') || '',
      whatsapp: fd.get('whatsapp') || '',
      city: fd.get('city') || '',
      investment_experience: fd.get('investment_experience') || '',
      investment_objective: fd.get('investment_objective') || '',
      risk_profile: fd.get('risk_profile') || fd.get('risk') || '',
      investment_horizon: fd.get('investment_horizon') || fd.get('horizon') || '',
      capital_range: fd.get('capital_range') || '',
      product_interest: fd.get('product_interest') || '',
      model_interest: fd.get('model_interest') || '',
      message: fd.get('message') || '',
      consent: !!(document.getElementById('consent')?.checked || fd.get('consent'))
    };
  }

  function setStatus(text, ok) {
    if (!status) return;
    status.className = ok ? 'status ok' : 'status err';
    status.textContent = text;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      setStatus('Mohon lengkapi field yang wajib diisi.', false);
      form.reportValidity();
      return;
    }

    const payload = collectLeadData();
    if (!payload.consent) {
      setStatus('Mohon setujui penggunaan data untuk keperluan konsultasi.', false);
      return;
    }

    if (LEAD_ENDPOINT.includes('PASTE_GOOGLE_APPS_SCRIPT')) {
      setStatus('Form sudah siap, tetapi URL Google Apps Script belum dipasang.', false);
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const original = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = 'Mengirim...'; }

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({ok: response.ok}));
      if (!response.ok || result.ok === false) throw new Error(result.message || 'Gagal menyimpan lead.');

      setStatus('Profil berhasil dikirim. Tim ARA akan menghubungi Anda untuk konsultasi.', true);
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('Data belum tersimpan. Silakan coba lagi.', false);
    } finally {
      if (button) { button.disabled = false; button.textContent = original; }
    }
  });
})();
