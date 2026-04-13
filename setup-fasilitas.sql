-- Jalankan di Supabase SQL Editor
CREATE TABLE IF NOT EXISTS fasilitas (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    icon VARCHAR(10) DEFAULT '🏫',
    gambar_url TEXT,
    urutan INTEGER DEFAULT 0,
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fasilitas DISABLE ROW LEVEL SECURITY;

CREATE INDEX idx_fasilitas_urutan ON fasilitas(urutan);

-- Sample data
INSERT INTO fasilitas (nama, deskripsi, icon, urutan) VALUES
('Ruang Kelas', 'Ruang kelas ber-AC dengan fasilitas multimedia modern', '🏫', 1),
('Laboratorium', 'Lab IPA, Komputer, dan Bahasa yang lengkap', '🔬', 2),
('Perpustakaan', 'Perpustakaan digital dengan koleksi buku lengkap', '📚', 3),
('Lapangan Olahraga', 'Lapangan serbaguna untuk berbagai kegiatan olahraga', '⚽', 4),
('Masjid', 'Masjid sekolah untuk kegiatan ibadah dan keagamaan', '🕌', 5),
('Aula Serbaguna', 'Aula besar untuk acara sekolah dan kegiatan siswa', '🎭', 6);
