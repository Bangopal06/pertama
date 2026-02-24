-- ============================================
-- COPY SEMUA SQL INI KE SUPABASE SQL EDITOR
-- LALU KLIK "RUN"
-- ============================================

-- BAGIAN 1: UPDATE TABEL PPDB
-- Tambah kolom untuk sistem login siswa
ALTER TABLE ppdb 
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS no_pendaftaran TEXT UNIQUE;

-- BAGIAN 2: TABEL DOKUMEN SISWA
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

-- BAGIAN 3: TABEL PEMBAYARAN SISWA
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

-- BAGIAN 4: SETUP STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public)
VALUES ('dokumen-siswa', 'dokumen-siswa', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('bukti-pembayaran', 'bukti-pembayaran', true)
ON CONFLICT (id) DO NOTHING;

-- BAGIAN 5: STORAGE POLICIES
CREATE POLICY IF NOT EXISTS "Allow public upload dokumen-siswa"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'dokumen-siswa');

CREATE POLICY IF NOT EXISTS "Allow public read dokumen-siswa"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dokumen-siswa');

CREATE POLICY IF NOT EXISTS "Allow public delete dokumen-siswa"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'dokumen-siswa');

CREATE POLICY IF NOT EXISTS "Allow public upload bukti-pembayaran"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'bukti-pembayaran');

CREATE POLICY IF NOT EXISTS "Allow public read bukti-pembayaran"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bukti-pembayaran');

CREATE POLICY IF NOT EXISTS "Allow public delete bukti-pembayaran"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'bukti-pembayaran');

-- ============================================
-- SELESAI!
-- Setelah RUN berhasil, kembali ke test-database.html
-- dan klik "Jalankan Test" lagi
-- ============================================
