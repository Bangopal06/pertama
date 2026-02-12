-- Tambahkan kolom gambar_url ke tabel berita
ALTER TABLE berita ADD COLUMN IF NOT EXISTS gambar_url TEXT;

-- Update berita yang sudah ada dengan gambar placeholder (opsional)
UPDATE berita SET gambar_url = 'https://via.placeholder.com/800x400?text=Berita+Sekolah' WHERE gambar_url IS NULL;
