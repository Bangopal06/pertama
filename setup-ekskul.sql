-- ============================================
-- SETUP TABEL EKSTRAKURIKULER
-- Jalankan di Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS ekskul (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    gambar_url TEXT,
    urutan INTEGER DEFAULT 0,
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ekskul DISABLE ROW LEVEL SECURITY;

-- Update storage bucket ekskul-images sebagai public
UPDATE storage.buckets SET public = true WHERE id = 'ekskul-images';

-- Sample data
INSERT INTO ekskul (nama, deskripsi, urutan) VALUES
('Sepak Bola', 'Melatih kerja sama tim dan sportivitas', 1),
('Seni Lukis', 'Mengembangkan kreativitas dan ekspresi diri', 2),
('Musik & Nasyid', 'Seni musik Islami dan pengembangan bakat vokal', 3),
('Pencak Silat', 'Bela diri dan pelestarian budaya bangsa', 4),
('Robotik & IT', 'Teknologi dan pemrograman untuk era digital', 5),
('Tahfidz Qur''an', 'Program hafalan Al-Qur''an terstruktur', 6),
('Renang', 'Olahraga renang untuk kesehatan fisik', 7),
('Pramuka', 'Pembentukan karakter dan jiwa kepemimpinan', 8);
