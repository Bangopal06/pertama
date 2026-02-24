-- ============================================
-- SQL SETUP YANG SUDAH DIPERBAIKI
-- Copy dan paste SQL ini ke Supabase SQL Editor
-- ============================================

-- BAGIAN 1: UPDATE TABEL PPDB
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

-- BAGIAN 5: STORAGE POLICIES (DIPERBAIKI)
-- Policy untuk dokumen-siswa
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow public upload dokumen-siswa'
  ) THEN
    CREATE POLICY "Allow public upload dokumen-siswa"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'dokumen-siswa');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow public read dokumen-siswa'
  ) THEN
    CREATE POLICY "Allow public read dokumen-siswa"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'dokumen-siswa');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow public delete dokumen-siswa'
  ) THEN
    CREATE POLICY "Allow public delete dokumen-siswa"
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'dokumen-siswa');
  END IF;
END $$;

-- Policy untuk bukti-pembayaran
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow public upload bukti-pembayaran'
  ) THEN
    CREATE POLICY "Allow public upload bukti-pembayaran"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'bukti-pembayaran');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow public read bukti-pembayaran'
  ) THEN
    CREATE POLICY "Allow public read bukti-pembayaran"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'bukti-pembayaran');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Allow public delete bukti-pembayaran'
  ) THEN
    CREATE POLICY "Allow public delete bukti-pembayaran"
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'bukti-pembayaran');
  END IF;
END $$;

-- ============================================
-- SELESAI!
-- ============================================
