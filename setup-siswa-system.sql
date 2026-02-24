-- ============================================
-- SETUP SISTEM SISWA (STUDENT PORTAL)
-- ============================================
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Update tabel PPDB - tambah kolom username dan password
ALTER TABLE ppdb 
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS no_pendaftaran TEXT UNIQUE;

-- 2. Tabel untuk dokumen siswa
CREATE TABLE IF NOT EXISTS siswa_dokumen (
  id BIGSERIAL PRIMARY KEY,
  ppdb_id BIGINT REFERENCES ppdb(id) ON DELETE CASCADE,
  jenis_dokumen TEXT NOT NULL,
  nama_file TEXT NOT NULL,
  file_url TEXT NOT NULL,
  ukuran_file INTEGER,
  status TEXT DEFAULT 'pending',
  catatan TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;

-- 3. Tabel untuk pembayaran
CREATE TABLE IF NOT EXISTS siswa_pembayaran (
  id BIGSERIAL PRIMARY KEY,
  ppdb_id BIGINT REFERENCES ppdb(id) ON DELETE CASCADE,
  jenis_pembayaran TEXT NOT NULL,
  jumlah DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'belum_bayar',
  bukti_url TEXT,
  tanggal_bayar TIMESTAMPTZ,
  tanggal_verifikasi TIMESTAMPTZ,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE siswa_pembayaran DISABLE ROW LEVEL SECURITY;

-- 4. Insert data pembayaran default untuk setiap pendaftar
-- (akan dijalankan via trigger atau manual)

-- ============================================
-- SELESAI!
-- ============================================
