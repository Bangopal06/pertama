-- Jalankan di Supabase SQL Editor
ALTER TABLE ekskul DISABLE ROW LEVEL SECURITY;

-- Set bucket ekskul-images sebagai public (jika sudah dibuat)
UPDATE storage.buckets SET public = true WHERE id = 'ekskul-images';

-- Cek hasilnya
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'ekskul';
SELECT id, public FROM storage.buckets WHERE id = 'ekskul-images';