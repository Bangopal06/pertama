async function loadAllNews() {
    const newsContainer = document.getElementById('all-news');
    
    try {
        const { data: berita, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .order('tanggal', { ascending: false });
        
        if (error) throw error;
        
        if (!berita || berita.length === 0) {
            newsContainer.innerHTML = '<p>Belum ada berita tersedia.</p>';
            return;
        }
        
        newsContainer.innerHTML = berita.map(b => {
            // Batasi konten menjadi excerpt (150 karakter)
            const excerpt = b.konten.length > 150 
                ? b.konten.substring(0, 150) + '...' 
                : b.konten;
            
            return `
                <div class="news-card">
                    <img src="${b.gambar_url || 'https://via.placeholder.com/400x250?text=Berita+Sekolah'}" alt="${b.judul}" class="news-image">
                    <div class="news-content">
                        <span class="news-category">${b.kategori}</span>
                        <h3>${b.judul}</h3>
                        <p class="news-meta">${new Date(b.tanggal).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                        <p class="news-excerpt">${excerpt}</p>
                        <a href="berita-detail.html?id=${b.id}" class="btn-read-more">Baca Selengkapnya →</a>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = '<p>Gagal memuat berita.</p>';
    }
}

loadAllNews();
