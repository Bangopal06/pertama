-- ============================================
-- FIX STORAGE POLICY - Jalankan di Supabase SQL Editor
-- ============================================
-- Pastikan semua storage bucket bisa diakses public

-- 1. Drop existing policies (jika ada)
DROP POLICY IF EXISTS "Public Access berita-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access program-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access slider-images" ON storage.objects;

DROP POLICY IF EXISTS "Allow authenticated upload berita" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload program" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated upload slider" ON storage.objects;

DROP POLICY IF EXISTS "Allow authenticated delete berita" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete program" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete slider" ON storage.objects;

-- 2. Buat policy baru untuk PUBLIC READ (semua orang bisa lihat)
CREATE POLICY "Public Access berita-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'berita-images');

CREATE POLICY "Public Access program-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'program-images');

CREATE POLICY "Public Access slider-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'slider-images');

-- 3. Policy untuk UPLOAD (authenticated users bisa upload)
CREATE POLICY "Allow authenticated upload berita"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'berita-images');

CREATE POLICY "Allow authenticated upload program"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'program-images');

CREATE POLICY "Allow authenticated upload slider"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'slider-images');

-- 4. Policy untuk DELETE (authenticated users bisa hapus)
CREATE POLICY "Allow authenticated delete berita"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'berita-images');

CREATE POLICY "Allow authenticated delete program"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'program-images');

CREATE POLICY "Allow authenticated delete slider"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'slider-images');

-- 5. Policy untuk UPDATE (authenticated users bisa update)
CREATE POLICY "Allow authenticated update berita"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'berita-images');

CREATE POLICY "Allow authenticated update program"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'program-images');

CREATE POLICY "Allow authenticated update slider"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'slider-images');

-- ============================================
-- SELESAI!
-- ============================================
-- Sekarang semua gambar di storage bisa diakses public
-- Refresh halaman admin dan homepage untuk test
-- ============================================
