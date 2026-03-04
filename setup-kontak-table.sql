-- ============================================
-- SETUP TABLE KONTAK
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Buat table kontak
CREATE TABLE IF NOT EXISTS kontak (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telepon VARCHAR(50) NOT NULL,
    subjek VARCHAR(300) NOT NULL,
    pesan TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'belum_dibaca',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE kontak ENABLE ROW LEVEL SECURITY;

-- 3. Policy untuk INSERT (public bisa kirim pesan)
CREATE POLICY "Public can insert kontak"
ON kontak FOR INSERT
TO public
WITH CHECK (true);

-- 4. Policy untuk SELECT (hanya authenticated bisa lihat)
CREATE POLICY "Authenticated can view kontak"
ON kontak FOR SELECT
TO authenticated
USING (true);

-- 5. Policy untuk UPDATE (hanya authenticated bisa update status)
CREATE POLICY "Authenticated can update kontak"
ON kontak FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Policy untuk DELETE (hanya authenticated bisa hapus)
CREATE POLICY "Authenticated can delete kontak"
ON kontak FOR DELETE
TO authenticated
USING (true);

-- 7. Buat index
CREATE INDEX IF NOT EXISTS idx_kontak_status ON kontak(status);
CREATE INDEX IF NOT EXISTS idx_kontak_created ON kontak(created_at DESC);

-- ============================================
-- SELESAI!
-- ============================================
-- Sekarang pesan kontak akan tersimpan di database
-- Admin bisa lihat di admin panel
-- ============================================
