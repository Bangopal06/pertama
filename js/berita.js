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
                <h3>${b.judul}</h3>
                <p class="news-meta">${b.kategori} - ${new Date(b.tanggal).toLocaleDateString('id-ID')}</p>
                <p>${b.konten}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = '<p>Gagal memuat berita.</p>';
    }
}

loadAllNews();
