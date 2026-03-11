-- ============================================
-- JALANKAN SQL INI UNTUK FIX SEMUA MASALAH
-- Copy SEMUA dan paste di Supabase SQL Editor
-- ============================================

-- 1. DROP dan RECREATE tabel siswa_dokumen
DROP TABLE IF EXISTS siswa_dokumen CASCADE;

CREATE TABLE siswa_dokumen (
    id BIGSERIAL PRIMARY KEY,
    siswa_id BIGINT NOT NULL REFERENCES ppdb(id) ON DELETE CASCADE,
    jenis_dokumen VARCHAR(50) NOT NULL,
    nama_file VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    ukuran_file INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    catatan TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    verified_by VARCHAR(100),
    UNIQUE(siswa_id, jenis_dokumen)
);

-- 2. DISABLE RLS
ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;

-- 3. Buat index
CREATE INDEX idx_siswa_dokumen_siswa ON siswa_dokumen(siswa_id);
CREATE INDEX idx_siswa_dokumen_jenis ON siswa_dokumen(jenis_dokumen);
CREATE INDEX idx_siswa_dokumen_status ON siswa_dokumen(status);

-- 4. Set bucket siswa-documents sebagai public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'siswa-documents';

-- 5. Cek hasil
SELECT 'Tabel siswa_dokumen' as info, tablename as name, rowsecurity::text as value
FROM pg_tables 
WHERE tablename = 'siswa_dokumen'
UNION ALL
SELECT 'Bucket siswa-documents' as info, id as name, public::text as value
FROM storage.buckets 
WHERE id = 'siswa-documents';

-- ============================================
-- SELESAI!
-- Sekarang coba upload dokumen lagi
-- ============================================
