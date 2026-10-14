-- Jalankan di Supabase SQL Editor
ALTER TABLE berita ADD COLUMN IF NOT EXISTS foto_posisi TEXT DEFAULT 'center';
