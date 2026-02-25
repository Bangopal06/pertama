# Cara Menambah Berita Sample

Jika berita tidak muncul di website, kemungkinan database masih kosong. Ikuti salah satu cara berikut:

## Cara 1: Menggunakan Test Berita (PALING MUDAH)

1. Buka file `test-berita.html` di browser
2. Klik tombol **"Test Load Berita"** untuk cek apakah ada berita
3. Jika kosong, klik tombol **"Tambah Berita Sample"**
4. Refresh halaman `index.html` atau `berita.html`
5. Berita seharusnya sudah muncul

## Cara 2: Menggunakan SQL Editor di Supabase

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Klik menu **SQL Editor** di sidebar kiri
4. Buka file `insert-berita-sample.sql`
5. Copy semua isi file tersebut
6. Paste ke SQL Editor di Supabase
7. Klik tombol **Run** atau tekan `Ctrl+Enter`
8. Refresh website Anda

## Cara 3: Menggunakan Admin Panel

1. Login ke admin panel di `admin/dashboard.html`
   - Username: `admin`
   - Password: `admin123`
2. Klik menu **Berita** di sidebar
3. Klik tombol **Tambah Berita**
4. Isi form berita:
   - Judul
   - Konten
   - Kategori
   - URL Gambar (opsional)
5. Klik **Simpan**

## Troubleshooting

### Berita masih tidak muncul setelah ditambahkan?

1. **Cek Console Browser**
   - Tekan `F12` untuk buka Developer Tools
   - Lihat tab Console
   - Cek apakah ada error merah

2. **Cek Koneksi Database**
   - Buka `test-berita.html`
   - Klik "Test Koneksi Database"
   - Jika gagal, cek file `js/supabase-config.js`

3. **Hard Refresh Browser**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

4. **Cek Table Berita di Supabase**
   - Login ke Supabase Dashboard
   - Klik menu **Table Editor**
   - Pilih table `berita`
   - Pastikan ada data di dalamnya

## Struktur Table Berita

Table `berita` harus memiliki kolom:
- `id` (int8, primary key, auto-increment)
- `judul` (text)
- `konten` (text)
- `kategori` (text)
- `gambar_url` (text, nullable)
- `tanggal` (timestamp with time zone)
- `created_at` (timestamp with time zone)

Jika table belum ada, jalankan SQL setup dari file `SETUP-LENGKAP-SUPABASE.sql`
