-- ============================================
-- FIX SLIDER RLS POLICY
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 1. Drop semua policy lama
DROP POLICY IF EXISTS "Allow public read slider" ON slider;
DROP POLICY IF EXISTS "Allow authenticated insert slider" ON slider;
DROP POLICY IF EXISTS "Allow authenticated update slider" ON slider;
DROP POLICY IF EXISTS "Allow authenticated delete slider" ON slider;

-- 2. Disable RLS sementara untuk testing (OPSIONAL - hanya untuk development)
-- ALTER TABLE slider DISABLE ROW LEVEL SECURITY;

-- ATAU gunakan policy yang lebih permisif:

-- 3. Policy untuk SELECT (semua orang bisa lihat)
CREATE POLICY "Public can view slider"
ON slider FOR SELECT
TO public
USING (true);

-- 4. Policy untuk INSERT (semua orang bisa insert - untuk development)
CREATE POLICY "Public can insert slider"
ON slider FOR INSERT
TO public
WITH CHECK (true);

-- 5. Policy untuk UPDATE (semua orang bisa update - untuk development)
CREATE POLICY "Public can update slider"
ON slider FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- 6. Policy untuk DELETE (semua orang bisa delete - untuk development)
CREATE POLICY "Public can delete slider"
ON slider FOR DELETE
TO public
USING (true);

-- ============================================
-- SELESAI!
-- ============================================
-- Sekarang coba lagi tambah/edit slider
-- 
-- CATATAN KEAMANAN:
-- Policy ini sangat permisif (public bisa CRUD)
-- Untuk production, ganti dengan policy yang lebih ketat
-- menggunakan authentication
-- ============================================
