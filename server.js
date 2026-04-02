// ══════════════════════════════════════
// KasirGO — server.js (Node.js)
// Jalankan: node server.js
// Buka: http://localhost:3000
// ══════════════════════════════════════

// TAMBAHKAN INI: Memanggil modul yang dibutuhkan
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  // Menggabungkan path folder saat ini dengan file yang diminta
  const filePath = path.join(__dirname, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeType, 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  💙 KasirGO Server berjalan!');
  console.log('');
  console.log(`  Buka di browser: http://localhost:${PORT}`);
  console.log('');
  console.log('  Tekan Ctrl+C untuk menghentikan server.');
  console.log('');
});