async function loadNews() {
    const newsContainer = document.getElementById('news-list');
    
    try {
        const { data: berita, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .order('tanggal', { ascending: false })
            .limit(3);
        
        if (error) throw error;
        
        if (!berita || berita.length === 0) {
            newsContainer.innerHTML = '<p>Belum ada berita tersedia.</p>';
            return;
        }
        
        newsContainer.innerHTML = berita.map(b => `
            <div class="news-card">
                <h3>${b.judul}</h3>
                <p class="news-meta">${b.kategori} - ${new Date(b.tanggal).toLocaleDateString('id-ID')}</p>
                <p>${b.konten.substring(0, 150)}...</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = '<p>Gagal memuat berita.</p>';
    }
}

loadNews();
