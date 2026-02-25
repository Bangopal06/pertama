-- ============================================
-- SETUP TABLE SLIDER
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Buat table slider
CREATE TABLE IF NOT EXISTS slider (
    id BIGSERIAL PRIMARY KEY,
    judul VARCHAR(200) NOT NULL,
    subjudul VARCHAR(200),
    deskripsi TEXT,
    gambar_url TEXT NOT NULL,
    link_url VARCHAR(500),
    link_text VARCHAR(100),
    urutan INTEGER DEFAULT 0,
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Insert slider default (3 slide)
INSERT INTO slider (judul, subjudul, deskripsi, gambar_url, link_url, link_text, urutan, aktif) 
VALUES 
    (
        'Selamat Datang di',
        'SMA NEGERI 1',
        'Centre of Comprehensive Education',
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop',
        'profil.html',
        'Pelajari Lebih Lanjut',
        1,
        true
    ),
    (
        'Membentuk Generasi',
        'UNGGUL & BERKARAKTER',
        'Pendidikan Berkualitas dengan Nilai-Nilai Islami',
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=800&fit=crop',
        'program.html',
        'Program Unggulan',
        2,
        true
    ),
    (
        'Raih Prestasi',
        'BERSAMA KAMI',
        'Fasilitas Modern & Tenaga Pengajar Profesional',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=800&fit=crop',
        'ppdb.html',
        'Daftar Sekarang',
        3,
        true
    )
ON CONFLICT DO NOTHING;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE slider ENABLE ROW LEVEL SECURITY;

-- 4. Buat policy untuk slider (semua orang bisa lihat)
DROP POLICY IF EXISTS "Allow public read access to slider" ON slider;
CREATE POLICY "Allow public read access to slider" 
ON slider FOR SELECT 
USING (aktif = true);

-- 5. Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_slider_urutan ON slider(urutan);
CREATE INDEX IF NOT EXISTS idx_slider_aktif ON slider(aktif);

-- ============================================
-- SELESAI!
-- ============================================
-- Table slider berhasil dibuat dengan 3 slide default
-- Sekarang bisa manage slider via admin panel
-- ============================================
