# ARA Financial Alchemy — Lead Spreadsheet Integration

Spreadsheet yang digunakan:
**Data Financial Alchemy ARA**

File template:
`Data Financial Alchemy ARA.xlsx`

## Cara menghubungkan website ke Google Drive

1. Buat/buka Google Sheets di Drive dengan judul **Data Financial Alchemy ARA**.
2. Buka **Extensions → Apps Script**.
3. Salin isi `data/Code.gs` ke Apps Script.
4. Deploy → New deployment → Web app.
5. Execute as: **Me**.
6. Who has access: **Anyone** (sesuaikan kebijakan keamanan Anda).
7. Salin URL Web App.
8. Tempel URL tersebut ke `js/lead.js` pada `LEAD_ENDPOINT`.
9. Pastikan field form Kontak menggunakan nama field yang sesuai.
10. Deploy website.

## Kolom lead
Timestamp, Source, Nama Lengkap, Email, WhatsApp, Kota Domisili,
Pengalaman Investasi, Tujuan Investasi, Profil Risiko, Horizon Investasi,
Kisaran Dana, Produk yang Diminati, Model Konsultasi, Pesan / Kebutuhan, Consent.

Spreadsheet tidak perlu dipublikasikan. Backend Apps Script berjalan menggunakan akun pemilik spreadsheet.
