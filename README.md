# 💙 KasirGO — Aplikasi Kasir Modern PWA

> Aplikasi kasir berbasis web (PWA) dengan desain modern biru soft & putih. Lengkap dengan fitur kasir profesional, manajemen produk, laporan, dan bisa digunakan **offline**.

---

## 📁 Struktur File

```
KasirGO/
├── index.html          ← Halaman utama (single page app)
├── style.css           ← Semua styling & CSS variables
├── app.js              ← Semua logika JavaScript
├── manifest.json       ← PWA manifest (install ke homescreen)
├── service-worker.js   ← Service Worker (offline support)
├── offline.html        ← Halaman fallback saat offline
├── package.json        ← Metadata proyek Node.js
├── server.js           ← Server Node.js
├── server.py           ← Server Python
├── start.bat           ← Launcher Windows
├── start.sh            ← Launcher Mac/Linux
├── settings.json       ← Konfigurasi VS Code Live Server
└── README.md           ← Dokumentasi ini
```

---

## ✨ Fitur Lengkap

| Halaman | Fitur |
|---|---|
| 🔐 **Login/Daftar** | Multi-akun, nama usaha per akun, logo usaha |
| 📊 **Dashboard** | Statistik hari ini, grafik 7 hari, produk terlaris, stok menipis |
| 🛒 **Transaksi** | POS kasir, keranjang, diskon %, PPN otomatis, kembalian |
| 💳 **Pembayaran** | Tunai (validasi + kembalian), QRIS (konfirmasi real), Debit (konfirmasi EDC) |
| 🧾 **Struk** | Cetak struk hitam-putih thermal (80mm), nama & logo usaha |
| 📦 **Produk** | CRUD dengan DataTables, upload gambar, barcode otomatis |
| 🏷️ **Kategori** | Kelola kategori dengan icon Font Awesome |
| 📈 **Laporan** | Filter tanggal, ringkasan, export/cetak PDF profesional |
| ⚙️ **Pengaturan** | Profil toko, logo upload, pajak, header/footer struk, ganti password |
| 📱 **PWA** | Install ke homescreen, Service Worker, offline support |

---

## 🚀 Cara Menjalankan

### ⚡ Cara Tercepat — Windows
```
Klik 2x file start.bat → pilih [1] Node.js atau [2] Python
```

### ⚡ Cara Tercepat — Mac / Linux
```bash
chmod +x start.sh
./start.sh
```

---

### 🟢 Menggunakan Node.js (Direkomendasikan)

```bash
# Pastikan Node.js sudah terinstall (versi 14+)
node -v

# Jalankan server
node server.js

# Buka browser
# http://localhost:3000
```

### 🐍 Menggunakan Python

```bash
# Python 3
python3 server.py

# Atau Python (Windows)
python server.py
```

### 🔵 Menggunakan VS Code Live Server
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Buka `http://localhost:5501`

---

## 🔐 Akun Default

| Username | Password |
|---|---|
| `admin` | `admin123` |

> ⚠️ Ganti password setelah login pertama di menu **Pengaturan → Ganti Password**

---

## 📱 Instalasi PWA (Opsional)

Agar aplikasi bisa diinstall seperti aplikasi native:

1. Buka `http://localhost:3000` di browser Chrome/Edge
2. Klik ikon **Install** di address bar (atau menu ⋮ → Install)
3. KasirGO akan tersedia di desktop/homescreen
4. Bisa digunakan **offline** setelah pertama kali dibuka

### Cara Kerja Offline:
- Data produk, transaksi, kategori → disimpan di `localStorage` browser
- Aset (CSS, JS, dll) → di-cache oleh Service Worker
- Setelah online sekali, aplikasi bisa dipakai tanpa internet
- Cetak PDF & struk → tetap butuh internet (untuk font CDN)

---

## 🛠️ Teknologi

| Teknologi | Versi | Fungsi |
|---|---|---|
| Bootstrap | 5.3.3 | UI Framework |
| Font Awesome | 6.5 | Ikon |
| jQuery | 3.6.0 | DOM manipulation |
| Chart.js | 4.4.0 | Grafik penjualan |
| DataTables | 1.13.7 | Tabel interaktif |
| SweetAlert2 | 11 | Dialog konfirmasi |
| Plus Jakarta Sans | — | Font utama |
| DM Mono | — | Font angka/kode |
| **Service Worker** | — | **Offline PWA** |
| **Web App Manifest** | — | **Install ke homescreen** |

---

## 💾 Penyimpanan Data

Semua data disimpan di **localStorage** browser:

| Key | Konten |
|---|---|
| `kg_accounts` | Daftar akun pengguna |
| `kg_currentUser` | Sesi login aktif |
| `kg_settings` | Pengaturan toko (nama, logo, pajak, dll) |
| `kg_produk` | Daftar produk |
| `kg_kategori` | Daftar kategori |
| `kg_transaksi` | Riwayat transaksi |

> ⚠️ **Penting:** Data tersimpan di browser lokal. Untuk backup, gunakan fitur export PDF atau salin data localStorage secara manual. Data akan hilang jika browser dibersihkan (clear site data).

---

## 🖨️ Pengaturan Printer Struk

Untuk mencetak struk thermal 80mm:
1. Hubungkan printer thermal ke komputer
2. Set paper size ke **80mm** di pengaturan printer
3. Klik **Cetak Struk** → dialog print browser muncul
4. Pilih printer thermal → Cetak

---

## 📋 Catatan Penting

- **Browser yang didukung:** Chrome 80+, Firefox 75+, Edge 80+, Safari 13+
- **Data tersimpan lokal** — tidak ada server database
- **Multi-akun** — setiap akun memiliki nama usaha & logo sendiri
- **Logo usaha** — tersimpan sebagai base64 di localStorage
- **Popup harus diizinkan** — untuk fitur cetak PDF laporan

---

## 🐛 Troubleshooting

**DataTable error / peringatan reinitialise:**
- Sudah diperbaiki di versi ini dengan `destroyDT()` yang aman

**Export PDF tidak muncul:**
- Izinkan popup browser untuk `localhost:3000`

**Service Worker tidak aktif:**
- Pastikan mengakses via `http://localhost:3000` (bukan file://)
- Buka DevTools → Application → Service Workers → klik Register

**Data hilang setelah update browser:**
- Backup data terlebih dahulu lewat DevTools → Application → localStorage

---

## 📜 Changelog

### v3.0 (Terbaru)
- ✅ Login/Daftar multi-akun dengan nama usaha
- ✅ Pembayaran QRIS & Debit dengan konfirmasi dialog
- ✅ Struk full hitam-putih untuk printer thermal
- ✅ Perbaikan DataTable (tidak ada lagi error reinitialise)
- ✅ Export PDF laporan dengan logo & ringkasan
- ✅ Responsive mobile, tablet, desktop (portrait & landscape)
- ✅ PWA: manifest.json, service-worker.js, offline.html
- ✅ package.json untuk proyek Node.js

### v2.0
- ✅ Desain modern biru soft
- ✅ Dashboard dengan grafik Chart.js
- ✅ CRUD Produk & Kategori

### v1.0
- ✅ Rilis pertama

---

*Dibuat dengan 💙 — KasirGO v3.0*
