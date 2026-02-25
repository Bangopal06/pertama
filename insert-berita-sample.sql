-- Insert berita sample untuk testing
-- Jalankan SQL ini di Supabase SQL Editor

INSERT INTO berita (judul, konten, kategori, gambar_url, tanggal) VALUES
(
    'Pembukaan PPDB Tahun Ajaran 2024/2025',
    'SMA Negeri 1 membuka pendaftaran peserta didik baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2024. Calon siswa dapat mendaftar secara online melalui website sekolah. Persyaratan pendaftaran meliputi fotokopi ijazah SMP, kartu keluarga, dan pas foto terbaru. Untuk informasi lebih lanjut, silakan hubungi panitia PPDB atau kunjungi website resmi sekolah.',
    'Pengumuman',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
    NOW()
),
(
    'Prestasi Siswa di Olimpiade Sains Nasional',
    'Siswa SMA Negeri 1 berhasil meraih medali emas dalam Olimpiade Sains Nasional bidang Matematika. Prestasi ini merupakan hasil kerja keras dan dedikasi siswa serta pembinaan dari guru-guru yang kompeten. Selamat kepada para juara yang telah mengharumkan nama sekolah di tingkat nasional. Semoga prestasi ini dapat memotivasi siswa lain untuk terus berprestasi.',
    'Prestasi',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
    NOW()
),
(
    'Kegiatan Bakti Sosial di Desa Sekitar',
    'SMA Negeri 1 mengadakan kegiatan bakti sosial di desa sekitar sekolah sebagai bentuk kepedulian terhadap masyarakat. Kegiatan ini meliputi pembagian sembako dan layanan kesehatan gratis. Seluruh siswa dan guru berpartisipasi aktif dalam kegiatan ini. Kegiatan bakti sosial ini merupakan bagian dari program pendidikan karakter yang bertujuan menumbuhkan rasa empati dan kepedulian sosial.',
    'Kegiatan',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    NOW()
),
(
    'Workshop Teknologi dan Inovasi',
    'Sekolah mengadakan workshop teknologi dan inovasi untuk meningkatkan kemampuan siswa dalam bidang teknologi informasi. Workshop ini menghadirkan narasumber dari industri teknologi terkemuka. Materi yang dibahas meliputi pemrograman, desain grafis, dan pengembangan aplikasi mobile. Diharapkan siswa dapat mengaplikasikan ilmu yang didapat dalam kehidupan sehari-hari.',
    'Kegiatan',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    NOW()
),
(
    'Peringatan Hari Pendidikan Nasional',
    'SMA Negeri 1 memperingati Hari Pendidikan Nasional dengan berbagai kegiatan menarik. Acara dimulai dengan upacara bendera yang diikuti seluruh warga sekolah. Dilanjutkan dengan lomba-lomba edukatif seperti cerdas cermat, pidato, dan pentas seni. Kegiatan ini bertujuan untuk menumbuhkan semangat belajar dan cinta tanah air.',
    'Pengumuman',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    NOW()
);
