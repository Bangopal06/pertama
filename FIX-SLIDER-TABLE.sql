-- ============================================
-- FIX SLIDER TABLE - Jalankan ini di Supabase SQL Editor
-- ============================================

-- 1. Hapus table lama jika ada (HATI-HATI: Data akan hilang!)
DROP TABLE IF EXISTS slider CASCADE;

-- 2. Buat table slider dengan struktur yang benar
CREATE TABLE slider (
    id BIGSERIAL PRIMARY KEY,
    judul VARCHAR(200) NOT NULL,
    subjudul VARCHAR(200),
    deskripsi TEXT,
    gambar_url TEXT NOT NULL,
    link_url VARCHAR(500),
    link_text VARCHAR(100),
    urutan INTEGER DEFAULT 1,
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Insert 3 slide default
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
    );

-- 4. Enable RLS
ALTER TABLE slider ENABLE ROW LEVEL SECURITY;

-- 5. Policy untuk read (semua orang bisa lihat slide aktif)
CREATE POLICY "Allow public read slider" 
ON slider FOR SELECT 
TO public
USING (true);

-- 6. Policy untuk insert/update/delete (hanya authenticated users)
CREATE POLICY "Allow authenticated insert slider" 
ON slider FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update slider" 
ON slider FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated delete slider" 
ON slider FOR DELETE 
TO authenticated
USING (true);

-- 7. Buat index
CREATE INDEX idx_slider_urutan ON slider(urutan);
CREATE INDEX idx_slider_aktif ON slider(aktif);

-- ============================================
-- SELESAI!
-- ============================================
-- Sekarang coba lagi di admin panel
-- ============================================
