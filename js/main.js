function loadNews() {
    const berita = JSON.parse(localStorage.getItem('berita') || '[]');
    const newsContainer = document.getElementById('news-list');
    
    const latestNews = berita.slice(0, 3);
    
    if (latestNews.length === 0) {
        newsContainer.innerHTML = '<p>Belum ada berita tersedia.</p>';
        return;
    }
    
    newsContainer.innerHTML = latestNews.map(b => `
        <div class="news-card">
            <h3>${b.judul}</h3>
            <p class="news-meta">${b.kategori} - ${new Date(b.tanggal).toLocaleDateString('id-ID')}</p>
            <p>${b.konten.substring(0, 150)}...</p>
        </div>
    `).join('');
}

if (!localStorage.getItem('berita')) {
    const sampleNews = [
        {
            id: 1,
            judul: 'Pembukaan PPDB Tahun Ajaran 2024/2025',
            konten: 'SMA Negeri 1 membuka pendaftaran peserta didik baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai 1 Juni hingga 30 Juni 2024.',
            kategori: 'Pengumuman',
            tanggal: new Date().toISOString()
        },
        {
            id: 2,
            judul: 'Prestasi Siswa di Olimpiade Sains Nasional',
            konten: 'Siswa SMA Negeri 1 berhasil meraih medali emas dalam Olimpiade Sains Nasional bidang Matematika.',
            kategori: 'Prestasi',
            tanggal: new Date().toISOString()
        },
        {
            id: 3,
            judul: 'Kegiatan Bakti Sosial',
            konten: 'SMA Negeri 1 mengadakan kegiatan bakti sosial di desa sekitar sekolah sebagai bentuk kepedulian terhadap masyarakat.',
            kategori: 'Kegiatan',
            tanggal: new Date().toISOString()
        }
    ];
    localStorage.setItem('berita', JSON.stringify(sampleNews));
}

loadNews();
