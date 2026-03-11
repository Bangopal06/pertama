-- ============================================
-- FIX STORAGE POLICY UNTUK siswa-documents
-- Jalankan di Supabase SQL Editor
-- ============================================

-- Cara 1: Set bucket sebagai PUBLIC (paling mudah)
UPDATE storage.buckets 
SET public = true 
WHERE id = 'siswa-documents';

-- Cek hasilnya
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'siswa-documents';

-- ============================================
-- SELESAI!
-- Bucket siswa-documents sekarang public
-- ============================================

-- CATATAN:
-- Jika masih error, set manual di Supabase Dashboard:
-- 1. Buka Storage > siswa-documents
-- 2. Klik Configuration
-- 3. Toggle "Public bucket" = ON
-- 4. Save
