async function loadAllNews() {
    const newsContainer = document.getElementById('all-news');
    
    // Tampilkan loading indicator
    newsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
            <div style="display: inline-block; width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #64748b;">Memuat berita...</p>
        </div>
    `;
    
    try {
        const { data: berita, error } = await window.supabaseClient
            .from('berita')
            .select('id, judul, konten, kategori, gambar_url, tanggal')
            .order('tanggal', { ascending: false });
        
        if (error) throw error;
        
        if (!berita || berita.length === 0) {
            newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">Belum ada berita tersedia.</p>';
            return;
        }
        
        newsContainer.innerHTML = berita.map(b => {
            // Batasi konten menjadi excerpt (150 karakter)
            const excerpt = b.konten.length > 150 
                ? b.konten.substring(0, 150) + '...' 
                : b.konten;
            
            return `
                <div class="news-card">
                    <img src="${b.gambar_url || 'https://via.placeholder.com/400x250?text=Berita+Sekolah'}" alt="${b.judul}" class="news-image" loading="lazy">
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
        newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #dc2626;">Gagal memuat berita. Silakan refresh halaman.</p>';
    }
}

// Tambahkan CSS untuk animasi loading
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

loadAllNews();
