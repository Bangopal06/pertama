-- Setup Supabase Storage untuk upload gambar berita

-- 1. Buat bucket untuk menyimpan gambar berita
INSERT INTO storage.buckets (id, name, public)
VALUES ('berita-images', 'berita-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set policy agar semua orang bisa melihat gambar (public read)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'berita-images');

-- 3. Set policy agar bisa upload gambar (public insert)
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'berita-images');

-- 4. Set policy agar bisa update gambar
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'berita-images');

-- 5. Set policy agar bisa delete gambar
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'berita-images');
