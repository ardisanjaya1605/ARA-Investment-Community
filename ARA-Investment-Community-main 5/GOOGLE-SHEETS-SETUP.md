# ARA Financial Alchemy — Google Sheets Lead Setup

Spreadsheet target: **Data Financial Alchemy ARA**

## 1. Buat spreadsheet
Di Google Drive buat Google Spreadsheet dengan nama persis:

`Data Financial Alchemy ARA`

Sheet `Leads` akan dibuat otomatis oleh Apps Script.

## 2. Pasang Apps Script
Buka spreadsheet -> **Extensions -> Apps Script**.

Salin isi:
`data/Code.gs`

Jalankan fungsi `setupSheet()` satu kali dan berikan permission yang diminta.

## 3. Deploy sebagai Web App
Di Apps Script:
- Deploy -> New deployment
- Type: Web app
- Execute as: Me
- Who has access: Anyone

Salin URL Web App yang diberikan Google.

## 4. Hubungkan website
Buka:

`js/lead-config.js`

Ganti:

`PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

dengan URL Web App Google Apps Script.

Contoh:

`window.ARA_LEAD_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec';`

## 5. Alur data

Website ARA
-> Form Lead
-> Google Apps Script Web App
-> Spreadsheet **Data Financial Alchemy ARA**
-> Sheet **Leads**

## Data yang disimpan

Timestamp, source, nama lengkap, email, WhatsApp, kota,
pengalaman investasi, tujuan investasi, profil risiko,
horizon investasi, kisaran dana, produk yang diminati,
model konsultasi, pesan/kebutuhan, dan consent.

## Catatan
Untuk target yang benar-benar deterministik, isi `SPREADSHEET_ID`
di `data/Code.gs`. Jika dikosongkan, script mencari spreadsheet
berdasarkan nama `Data Financial Alchemy ARA`.
