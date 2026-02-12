# Setup Supabase untuk Website Sekolah

## Langkah 1: Buat Project di Supabase

1. Kunjungi https://supabase.com dan buat akun
2. Buat project baru
3. Catat URL dan anon key dari Settings > API

## Langkah 2: Buat Tabel di Supabase

Jalankan SQL berikut di SQL Editor Supabase:

```sql
-- Tabel untuk berita
CREATE TABLE berita (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  konten TEXT NOT NULL,
  kategori TEXT NOT NULL,
  tanggal TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel untuk pendaftar PPDB
CREATE TABLE ppdb (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  nisn TEXT NOT NULL,
  tempat_lahir TEXT NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin TEXT NOT NULL,
  asal_sekolah TEXT NOT NULL,
  alamat TEXT NOT NULL,
  telepon TEXT NOT NULL,
  email TEXT NOT NULL,
  tanggal_daftar TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel untuk admin users
CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert admin default (password: admin123)
INSERT INTO admin_users (username, password) 
VALUES ('admin', 'admin123');

-- Enable Row Level Security
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE ppdb ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy untuk berita (public bisa read, admin bisa semua)
CREATE POLICY "Berita dapat dibaca semua orang" ON berita
  FOR SELECT USING (true);

CREATE POLICY "Admin dapat mengelola berita" ON berita
  FOR ALL USING (true);

-- Policy untuk PPDB (public bisa insert, admin bisa read/delete)
CREATE POLICY "Publik dapat mendaftar PPDB" ON ppdb
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin dapat melihat data PPDB" ON ppdb
  FOR SELECT USING (true);

CREATE POLICY "Admin dapat menghapus data PPDB" ON ppdb
  FOR DELETE USING (true);

-- Policy untuk admin_users (hanya untuk authentication)
CREATE POLICY "Admin dapat login" ON admin_users
  FOR SELECT USING (true);
```

## Langkah 3: Update Konfigurasi

Edit file `js/supabase-config.js` dan ganti:
- `YOUR_SUPABASE_URL` dengan URL project Anda
- `YOUR_SUPABASE_ANON_KEY` dengan anon key Anda

## Langkah 4: Selesai!

Refresh halaman dan aplikasi akan menggunakan Supabase sebagai database.
