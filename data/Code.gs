/*******************************************************
 * ARA FINANCIAL ALCHEMY — GOOGLE SHEETS LEAD DATABASE
 *
 * Spreadsheet title:
 * Data Financial Alchemy ARA
 *
 * Recommended:
 * 1. Put this Apps Script in the Google Sheet itself
 *    (Extensions -> Apps Script), OR deploy as Web App.
 * 2. If you know the Spreadsheet ID, put it in
 *    SPREADSHEET_ID for deterministic targeting.
 *******************************************************/

const SPREADSHEET_TITLE = 'Data Financial Alchemy ARA';
const SPREADSHEET_ID = ''; // Optional: paste the Spreadsheet ID here.
const SHEET_NAME = 'Leads';

const HEADERS = [
  'submitted_at',
  'source',
  'full_name',
  'email',
  'whatsapp',
  'city',
  'investment_experience',
  'investment_objective',
  'risk_profile',
  'investment_horizon',
  'capital_range',
  'product_interest',
  'model_interest',
  'message',
  'consent'
];

function setupSheet() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');

  return 'Sheet "' + SHEET_NAME + '" siap digunakan.';
}

function doPost(e) {
  try {
    const payload = JSON.parse(
      (e && e.postData && e.postData.contents) || '{}'
    );

    if (!payload.full_name || !payload.email || !payload.whatsapp) {
      return json_({ ok: false, message: 'Field wajib belum lengkap.' });
    }

    if (payload.consent !== true) {
      return json_({
        ok: false,
        message: 'Consent wajib diberikan.'
      });
    }

    const ss = getSpreadsheet_();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setValues([HEADERS]);
      sheet.setFrozenRows(1);
    }

    const row = HEADERS.map((header) => payload[header] ?? '');
    sheet.appendRow(row);

    return json_({ ok: true, message: 'Lead tersimpan.' });
  } catch (err) {
    console.error(err);
    return json_({
      ok: false,
      message: String(err.message || err)
    });
  }
}

function doGet() {
  return json_({
    ok: true,
    service: 'ARA Financial Alchemy Lead Intake'
  });
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID.trim()) {
    return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
  }

  const files = DriveApp.getFilesByName(SPREADSHEET_TITLE);

  if (!files.hasNext()) {
    throw new Error(
      'Spreadsheet "' + SPREADSHEET_TITLE +
      '" tidak ditemukan di Google Drive.'
    );
  }

  return SpreadsheetApp.open(files.next());
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
