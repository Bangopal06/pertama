-- ============================================
-- SETUP LENGKAP DATABASE + STORAGE SUPABASE
-- UNTUK PORTAL SISWA
-- ============================================
-- Copy paste SEMUA SQL ini ke Supabase SQL Editor
-- Lalu klik RUN
-- ============================================

-- BAGIAN 1: UPDATE TABEL PPDB
-- ============================================
-- Tambah kolom untuk sistem login siswa
ALTER TABLE ppdb 
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS no_pendaftaran TEXT UNIQUE;

-- BAGIAN 2: TABEL DOKUMEN SISWA
-- ============================================
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

-- Disable RLS untuk siswa_dokumen
ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;

-- BAGIAN 3: TABEL PEMBAYARAN SISWA
-- ============================================
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

-- Disable RLS untuk siswa_pembayaran
ALTER TABLE siswa_pembayaran DISABLE ROW LEVEL SECURITY;

-- BAGIAN 4: SETUP STORAGE BUCKETS
-- ============================================
-- Buat bucket untuk dokumen siswa
INSERT INTO storage.buckets (id, name, public)
VALUES ('dokumen-siswa', 'dokumen-siswa', true)
ON CONFLICT (id) DO NOTHING;

-- Buat bucket untuk bukti pembayaran
INSERT INTO storage.buckets (id, name, public)
VALUES ('bukti-pembayaran', 'bukti-pembayaran', true)
ON CONFLICT (id) DO NOTHING;

-- BAGIAN 5: STORAGE POLICIES
-- ============================================

-- Policy untuk UPLOAD dokumen-siswa
CREATE POLICY IF NOT EXISTS "Allow public upload dokumen-siswa"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'dokumen-siswa');

-- Policy untuk READ dokumen-siswa
CREATE POLICY IF NOT EXISTS "Allow public read dokumen-siswa"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dokumen-siswa');

-- Policy untuk DELETE dokumen-siswa (optional)
CREATE POLICY IF NOT EXISTS "Allow public delete dokumen-siswa"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'dokumen-siswa');

-- Policy untuk UPLOAD bukti-pembayaran
CREATE POLICY IF NOT EXISTS "Allow public upload bukti-pembayaran"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'bukti-pembayaran');

-- Policy untuk READ bukti-pembayaran
CREATE POLICY IF NOT EXISTS "Allow public read bukti-pembayaran"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bukti-pembayaran');

-- Policy untuk DELETE bukti-pembayaran (optional)
CREATE POLICY IF NOT EXISTS "Allow public delete bukti-pembayaran"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'bukti-pembayaran');

-- ============================================
-- SELESAI! ✅
-- ============================================
-- Database dan Storage sudah siap digunakan!
-- 
-- Langkah selanjutnya:
-- 1. Test pendaftaran siswa di ppdb.html
-- 2. Login di /login.html
-- 3. Upload dokumen dan pembayaran
-- ============================================
