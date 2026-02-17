-- ============================================
-- SETUP DATABASE LENGKAP UNTUK WEBSITE SEKOLAH
-- ============================================
-- Copy paste semua SQL ini ke Supabase SQL Editor
-- Lalu klik RUN untuk membuat semua tabel sekaligus
-- ============================================

-- 1. TABEL BERITA
-- ============================================
CREATE TABLE IF NOT EXISTS berita (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  konten TEXT NOT NULL,
  kategori TEXT NOT NULL,
  gambar_url TEXT,
  tanggal TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS untuk berita
ALTER TABLE berita DISABLE ROW LEVEL SECURITY;

-- Insert data sample berita
INSERT INTO berita (judul, konten, kategori, gambar_url) VALUES
(
  'Pembukaan PPDB Tahun Ajaran 2024/2025',
  'SMA Negeri 1 membuka pendaftaran peserta didik baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2024. Calon siswa dapat mendaftar secara online melalui website sekolah.',
  'Pengumuman',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800'
),
(
  'Prestasi Siswa di Olimpiade Sains Nasional',
  'Siswa SMA Negeri 1 berhasil meraih medali emas dalam Olimpiade Sains Nasional bidang Matematika. Prestasi ini merupakan hasil kerja keras dan dedikasi siswa serta pembinaan dari guru-guru yang kompeten.',
  'Prestasi',
  'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800'
),
(
  'Kegiatan Bakti Sosial',
  'SMA Negeri 1 mengadakan kegiatan bakti sosial di desa sekitar sekolah sebagai bentuk kepedulian terhadap masyarakat. Kegiatan ini meliputi pembagian sembako dan layanan kesehatan gratis.',
  'Kegiatan',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
)
ON CONFLICT DO NOTHING;

-- 2. TABEL PROGRAM UNGGULAN
-- ============================================
CREATE TABLE IF NOT EXISTS program (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  deskripsi_lengkap TEXT,
  gambar_url TEXT,
  kegiatan TEXT[],
  urutan INTEGER DEFAULT 0,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS untuk program
ALTER TABLE program DISABLE ROW LEVEL SECURITY;

-- Insert data program unggulan
INSERT INTO program (judul, deskripsi, deskripsi_lengkap, gambar_url, kegiatan, urutan) VALUES
(
  'Qur''an dan Ulumuddin',
  'Program menghafal dan memahami Al-Qur''an serta ilmu agama dengan metode yang mudah dan menyenangkan.',
  'Program menghafal dan memahami Al-Qur''an serta ilmu agama (aqidah, hadits, fiqh) dan lain-lain dengan metode yang mudah dan menyenangkan untuk meningkatkan kecintaan terhadap Al-Qur''an dan keimanan.',
  'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600',
  ARRAY['Tahfidz Al-Qur''an dengan metode Tilawati', 'Kajian Tafsir dan Ulumul Qur''an', 'Pembelajaran Hadits dan Fiqih', 'Praktik ibadah sehari-hari'],
  1
),
(
  'Adab dan Akhlak',
  'Praktik langsung sopan santun dalam keseharian dengan pembinaan karakter yang islami.',
  'Praktik langsung sopan santun dalam keseharian dengan pembinaan karakter dan kepribadian yang islami, mulia, dan berakhlak baik kepada Allah, sesama, dan lingkungan.',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600',
  ARRAY['Pembinaan akhlak dan karakter islami', 'Praktik adab keseharian', 'Mentoring dan bimbingan spiritual', 'Kegiatan sosial dan kepedulian'],
  2
),
(
  'Sains dan Teknologi',
  'Mengintegrasikan eksperimen laboratorium dan pembelajaran berbasis proyek untuk mengembangkan kemampuan sains.',
  'Mengintegrasikan eksperimen laboratorium dan pembelajaran berbasis proyek, dan teknologi digital. Memfasilitasi kemampuan sains untuk melek teknologi dan yang siap menghadapi era digital.',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
  ARRAY['Praktikum laboratorium IPA', 'Pembelajaran coding dan robotika', 'Project-based learning', 'Kompetisi sains dan teknologi'],
  3
),
(
  'Pembelajaran Bilingual',
  'Program pembelajaran bilingual mencakup bahasa Arab, Inggris, dan Indonesia dalam lingkungan yang mendukung.',
  'Program pembelajaran bilingual mencakup bahasa Arab, Inggris, dan Indonesia dalam lingkungan yang mendukung untuk meningkatkan kemampuan komunikasi global.',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
  ARRAY['English Day dan Arabic Day', 'Conversation class dengan native speaker', 'Pembelajaran mata pelajaran dalam bahasa asing', 'Kompetisi debat dan pidato'],
  4
),
(
  'Penumbuhan Leadership',
  'Belajar hidup mandiri dengan kultur Pesantren, latihan kepemimpinan, kedisiplinan, dan tanggung jawab.',
  'Belajar hidup mandiri dengan kultur Pesantren, latihan kepemimpinan, kedisiplinan, tanggung jawab, dan jiwa wirausaha untuk menjadi pemimpin masa depan.',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
  ARRAY['Leadership training dan outbound', 'Organisasi siswa (OSIS, MPK)', 'Kepanitiaan event sekolah', 'Entrepreneurship dan kewirausahaan'],
  5
)
ON CONFLICT DO NOTHING;

-- 3. TABEL PPDB (Pendaftaran Peserta Didik Baru)
-- ============================================
CREATE TABLE IF NOT EXISTS ppdb (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  nisn TEXT NOT NULL,
  tempat_lahir TEXT NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin TEXT NOT NULL,
  asal_sekolah TEXT NOT NULL,
  alamat TEXT NOT NULL,
  telepon TEXT NOT NULL,
  email TEXT NOT NULL,
  tanggal_daftar TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS untuk PPDB
ALTER TABLE ppdb DISABLE ROW LEVEL SECURITY;

-- 4. TABEL ADMIN USERS
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nama_lengkap TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS untuk admin_users
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Insert admin default
-- Username: admin
-- Password: admin123
INSERT INTO admin_users (username, password, nama_lengkap) 
VALUES ('admin', 'admin123', 'Administrator')
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- SELESAI!
-- ============================================
-- Semua tabel sudah dibuat dengan data sample
-- Anda bisa langsung login ke admin panel dengan:
-- Username: admin
-- Password: admin123
-- ============================================
