-- ============================================
-- SETUP TABLE KONTAK - DARI AWAL
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Hapus table lama jika ada (HATI-HATI: Data akan hilang!)
DROP TABLE IF EXISTS kontak CASCADE;

-- 2. Buat table kontak baru
CREATE TABLE kontak (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    telepon VARCHAR(50) NOT NULL,
    subjek VARCHAR(300) NOT NULL,
    pesan TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'belum_dibaca',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Disable RLS untuk development (lebih mudah)
ALTER TABLE kontak DISABLE ROW LEVEL SECURITY;

-- ATAU jika ingin pakai RLS (lebih aman untuk production):
-- ALTER TABLE kontak ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "allow_public_insert" ON kontak
-- FOR INSERT TO public WITH CHECK (true);
-- 
-- CREATE POLICY "allow_authenticated_all" ON kontak
-- FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Buat index untuk performa
CREATE INDEX idx_kontak_status ON kontak(status);
CREATE INDEX idx_kontak_created ON kontak(created_at DESC);

-- 5. Insert data sample (opsional - untuk testing)
INSERT INTO kontak (nama, email, telepon, subjek, pesan, status) 
VALUES 
    ('John Doe', 'john@example.com', '08123456789', 'Pertanyaan PPDB', 'Saya ingin menanyakan tentang biaya pendaftaran.', 'belum_dibaca'),
    ('Jane Smith', 'jane@example.com', '08987654321', 'Info Fasilitas', 'Apakah ada asrama untuk siswa?', 'sudah_dibaca');

-- ============================================
-- SELESAI!
-- ============================================
-- Table kontak berhasil dibuat
-- Sekarang coba kirim pesan dari halaman kontak
-- ============================================

-- Untuk cek apakah berhasil, jalankan query ini:
-- SELECT * FROM kontak;
