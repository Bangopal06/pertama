-- Jalankan di Supabase SQL Editor
ALTER TABLE berita ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;
