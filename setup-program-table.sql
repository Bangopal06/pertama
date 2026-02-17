-- Tabel untuk program unggulan
CREATE TABLE IF NOT EXISTS program (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  deskripsi_lengkap TEXT,
  gambar_url TEXT,
  kegiatan TEXT[], -- Array untuk menyimpan list kegiatan
  urutan INTEGER DEFAULT 0,
  aktif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS untuk kemudahan (atau buat policy sesuai kebutuhan)
ALTER TABLE program DISABLE ROW LEVEL SECURITY;

-- Insert data default program
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
);
