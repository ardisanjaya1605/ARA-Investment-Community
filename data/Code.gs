const SPREADSHEET_TITLE = 'data lead untuk ARA Financial Alchemy';
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

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (!payload.full_name || !payload.email || !payload.whatsapp) {
      return json({ok:false, message:'Field wajib belum lengkap.'});
    }

    if (payload.consent !== true) {
      return json({ok:false, message:'Consent wajib diberikan.'});
    }

    const files = DriveApp.getFilesByName(SPREADSHEET_TITLE);
    if (!files.hasNext()) {
      throw new Error('Spreadsheet "' + SPREADSHEET_TITLE + '" tidak ditemukan di Google Drive.');
    }

    const spreadsheetFile = files.next();
    const ss = SpreadsheetApp.open(spreadsheetFile);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.setFrozenRows(1);
    }

    const row = HEADERS.map(h => payload[h] ?? '');
    sheet.appendRow(row);

    return json({ok:true, message:'Lead tersimpan.'});
  } catch (err) {
    console.error(err);
    return json({ok:false, message:String(err.message || err)});
  }
}

function doGet() {
  return json({ok:true, service:'ARA Financial Alchemy Lead Intake'});
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
