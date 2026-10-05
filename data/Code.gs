const SPREADSHEET_TITLE = 'Data Financial Alchemy ARA';
const SHEET_NAME = 'Leads';

const HEADERS = [
  'Timestamp', 'Source', 'Nama Lengkap', 'Email', 'WhatsApp', 'Kota Domisili',
  'Pengalaman Investasi', 'Tujuan Investasi', 'Profil Risiko',
  'Horizon Investasi', 'Kisaran Dana', 'Produk yang Diminati',
  'Model Konsultasi', 'Pesan / Kebutuhan', 'Consent'
];

function doGet() {
  return jsonResponse_({ ok: true, service: 'ARA Financial Alchemy Lead Collector' });
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (!data.full_name || !data.email || !data.whatsapp || data.consent !== true) {
      return jsonResponse_({ ok: false, message: 'Data wajib belum lengkap atau consent belum diberikan.' });
    }

    const files = DriveApp.getFilesByName(SPREADSHEET_TITLE);
    if (!files.hasNext()) {
      throw new Error('Spreadsheet "' + SPREADSHEET_TITLE + '" belum ditemukan di Google Drive.');
    }

    const spreadsheet = SpreadsheetApp.open(files.next());
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([
      data.submitted_at || new Date().toISOString(),
      data.source || 'ARA Financial Alchemy',
      data.full_name || '',
      data.email || '',
      data.whatsapp || '',
      data.city || '',
      data.investment_experience || '',
      data.investment_objective || '',
      data.risk_profile || '',
      data.investment_horizon || '',
      data.capital_range || '',
      data.product_interest || '',
      data.model_interest || '',
      data.message || '',
      data.consent === true ? 'YES' : 'NO'
    ]);

    return jsonResponse_({ ok: true, message: 'Lead berhasil disimpan.' });
  } catch (err) {
    return jsonResponse_({ ok: false, message: err.message });
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
