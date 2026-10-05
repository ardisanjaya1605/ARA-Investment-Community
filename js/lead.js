(() => {
  // Setelah Google Apps Script Web App dibuat, masukkan URL-nya di bawah.
  const LEAD_ENDPOINT =
    window.ARA_LEAD_ENDPOINT ||
    'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  const form =
    document.querySelector('#contact form') ||
    document.querySelector('form[data-lead-form]') ||
    document.querySelector('form');

  if (!form) return;

  const value = (name) => {
    const el = form.querySelector(`[name="${name}"]`);
    return el ? el.value.trim() : '';
  };

  const checked = (name) => {
    const el = form.querySelector(`[name="${name}"]`);
    return !!(el && el.checked);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const consent = checked('consent');
    if (!consent) {
      alert('Mohon setujui penggunaan data untuk keperluan konsultasi.');
      return;
    }

    const payload = {
      submitted_at: new Date().toISOString(),
      source: 'ARA Financial Alchemy',
      full_name: value('full_name'),
      email: value('email'),
      whatsapp: value('whatsapp'),
      city: value('city'),
      investment_experience: value('investment_experience'),
      investment_objective: value('investment_objective'),
      risk_profile: value('risk_profile'),
      investment_horizon: value('investment_horizon'),
      capital_range: value('capital_range'),
      product_interest: value('product_interest'),
      model_interest: value('model_interest'),
      message: value('message'),
      consent
    };

    if (!payload.full_name || !payload.email || !payload.whatsapp) {
      alert('Nama, email, dan WhatsApp wajib diisi.');
      return;
    }

    if (LEAD_ENDPOINT.includes('PASTE_GOOGLE')) {
      alert('Backend Lead belum dikonfigurasi. Masukkan URL Google Apps Script Web App ke js/lead.js.');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const oldText = button ? button.textContent : '';
    if (button) {
      button.disabled = true;
      button.textContent = 'Mengirim...';
    }

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!result.ok) throw new Error(result.message || 'Gagal menyimpan lead.');

      alert('Terima kasih. Data Anda sudah diterima dan tim ARA Financial Alchemy akan menghubungi Anda.');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Data belum berhasil dikirim. Silakan coba kembali.');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = oldText;
      }
    }
  });
})();
