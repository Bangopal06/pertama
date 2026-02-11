function loadAllNews() {
    const berita = JSON.parse(localStorage.getItem('berita') || '[]');
    const newsContainer = document.getElementById('all-news');
    
    if (berita.length === 0) {
        newsContainer.innerHTML = '<p>Belum ada berita tersedia.</p>';
        return;
    }
    
    newsContainer.innerHTML = berita.map(b => `
        <div class="news-card">
            <h3>${b.judul}</h3>
            <p class="news-meta">${b.kategori} - ${new Date(b.tanggal).toLocaleDateString('id-ID')}</p>
            <p>${b.konten}</p>
        </div>
    `).join('');
}

loadAllNews();
