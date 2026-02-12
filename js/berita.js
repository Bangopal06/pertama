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
        
        newsContainer.innerHTML = berita.map(b => `
            <div class="news-card">
                <img src="${b.gambar_url || 'https://via.placeholder.com/400x250?text=Berita+Sekolah'}" alt="${b.judul}" class="news-image">
                <div class="news-content">
                    <h3>${b.judul}</h3>
                    <p class="news-meta">${b.kategori} - ${new Date(b.tanggal).toLocaleDateString('id-ID')}</p>
                    <p>${b.konten}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = '<p>Gagal memuat berita.</p>';
    }
}

loadAllNews();
