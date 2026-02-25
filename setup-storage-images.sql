-- ============================================
-- SETUP STORAGE BUCKETS UNTUK GAMBAR
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Buat bucket untuk gambar berita
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'berita-images',
    'berita-images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Buat bucket untuk gambar program
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'program-images',
    'program-images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Buat bucket untuk gambar slider/banner
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'slider-images',
    'slider-images',
    true,
    10485760, -- 10MB (lebih besar untuk banner)
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 4. Policy untuk berita-images: Semua orang bisa lihat
CREATE POLICY "Public Access for berita-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'berita-images');

-- 5. Policy untuk berita-images: Admin bisa upload
CREATE POLICY "Admin can upload berita-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'berita-images');

-- 6. Policy untuk berita-images: Admin bisa update
CREATE POLICY "Admin can update berita-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'berita-images');

-- 7. Policy untuk berita-images: Admin bisa delete
CREATE POLICY "Admin can delete berita-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'berita-images');

-- 8. Policy untuk program-images: Semua orang bisa lihat
CREATE POLICY "Public Access for program-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'program-images');

-- 9. Policy untuk program-images: Admin bisa upload
CREATE POLICY "Admin can upload program-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'program-images');

-- 10. Policy untuk program-images: Admin bisa update
CREATE POLICY "Admin can update program-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'program-images');

-- 11. Policy untuk program-images: Admin bisa delete
CREATE POLICY "Admin can delete program-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'program-images');

-- 12. Policy untuk slider-images: Semua orang bisa lihat
CREATE POLICY "Public Access for slider-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'slider-images');

-- 13. Policy untuk slider-images: Admin bisa upload
CREATE POLICY "Admin can upload slider-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'slider-images');

-- 14. Policy untuk slider-images: Admin bisa update
CREATE POLICY "Admin can update slider-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'slider-images');

-- 15. Policy untuk slider-images: Admin bisa delete
CREATE POLICY "Admin can delete slider-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'slider-images');

-- ============================================
-- SELESAI!
-- ============================================
-- Storage buckets berhasil dibuat:
-- 1. berita-images (max 5MB)
-- 2. program-images (max 5MB)
-- 3. slider-images (max 10MB)
--
-- Semua bucket bersifat PUBLIC (bisa diakses siapa saja)
-- Upload/Edit/Delete hanya bisa dilakukan oleh admin
-- ============================================

-- CARA MENGGUNAKAN:
-- 1. Upload gambar via admin panel
-- 2. Gambar akan tersimpan di Supabase Storage
-- 3. URL gambar otomatis di-generate
-- 4. Website akan lebih cepat karena gambar di-host di CDN Supabase
-- ============================================
