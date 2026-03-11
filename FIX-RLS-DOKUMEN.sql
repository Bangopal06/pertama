-- ============================================
-- FIX RLS UNTUK TABEL siswa_dokumen
-- Copy dan jalankan di Supabase SQL Editor
-- ============================================

-- 1. Disable RLS
ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;

-- 2. Drop semua policy yang ada
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON siswa_dokumen;
DROP POLICY IF EXISTS "Enable read access for all users" ON siswa_dokumen;
DROP POLICY IF EXISTS "Enable insert for all users" ON siswa_dokumen;
DROP POLICY IF EXISTS "Enable update for all users" ON siswa_dokumen;
DROP POLICY IF EXISTS "Enable delete for all users" ON siswa_dokumen;
DROP POLICY IF EXISTS "Allow public insert" ON siswa_dokumen;
DROP POLICY IF EXISTS "Allow public select" ON siswa_dokumen;
DROP POLICY IF EXISTS "Allow public update" ON siswa_dokumen;
DROP POLICY IF EXISTS "Allow public delete" ON siswa_dokumen;

-- 3. Pastikan RLS benar-benar disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'siswa_dokumen';

-- Jika rowsecurity = true, jalankan lagi:
ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;

-- ============================================
-- SELESAI!
-- Coba upload dokumen lagi
-- ============================================
