-- ============================================
-- SETUP STORAGE & TABLE DOKUMEN SISWA
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Drop table jika sudah ada (untuk clean install)
DROP TABLE IF EXISTS siswa_dokumen CASCADE;

-- 2. Buat table untuk menyimpan data dokumen siswa
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

-- 3. Disable RLS untuk development
ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;

-- 4. Buat index
CREATE INDEX idx_siswa_dokumen_siswa ON siswa_dokumen(siswa_id);
CREATE INDEX idx_siswa_dokumen_jenis ON siswa_dokumen(jenis_dokumen);
CREATE INDEX idx_siswa_dokumen_status ON siswa_dokumen(status);

-- ============================================
-- SETUP STORAGE BUCKET
-- ============================================
-- Jalankan di Supabase Dashboard > Storage:
-- 1. Buat bucket baru dengan nama: siswa-documents
-- 2. Set sebagai Public bucket
-- 3. Max file size: 2MB
-- 4. Allowed MIME types: application/pdf, image/jpeg, image/png

-- ============================================
-- JENIS DOKUMEN YANG DIPERLUKAN:
-- ============================================
-- 1. kk - Kartu Keluarga
-- 2. akta - Akta Kelahiran
-- 3. ijazah - Ijazah/SKHUN SMP
-- 4. foto - Pas Foto 3x4

-- ============================================
-- SELESAI!
-- ============================================
