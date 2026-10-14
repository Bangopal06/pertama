let allBeritaData = [];

function buildCard(b) {
    const excerpt = b.konten.length > 150 ? b.konten.substring(0, 150) + '...' : b.konten;
    const katClass = b.kategori === 'PPDB' ? 'news-category ppdb' : 'news-category';
    return `
        <div class="news-card" data-kategori="${b.kategori}">
            <img src="${b.gambar_url || 'https://via.placeholder.com/400x250?text=Berita+Sekolah'}"
                 alt="${b.judul}" class="news-image" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/400x250?text=Berita+Sekolah'">
            <div class="news-content">
                <span class="${katClass}">${b.kategori}</span>
                <h3>${b.judul}</h3>
                <p class="news-meta">${new Date(b.tanggal).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'long', day: 'numeric'
                })}</p>
                <p class="news-excerpt">${excerpt}</p>
                <a href="berita-detail.html?id=${b.id}" class="btn-read-more">Baca Selengkapnya →</a>
            </div>
        </div>`;
}

function renderBerita(kat) {
    const container = document.getElementById('all-news');
    const filtered = kat === 'semua' ? allBeritaData : allBeritaData.filter(b => b.kategori === kat);
    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b;">Tidak ada berita kategori ini.</p>`;
    } else {
        container.innerHTML = filtered.map(buildCard).join('');
    }
}

async function loadAllNews() {
    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = `
        <div style="text-align:center;padding:40px;grid-column:1/-1;">
            <div style="display:inline-block;width:50px;height:50px;border:5px solid #f3f3f3;border-top:5px solid #1e3a8a;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <p style="margin-top:20px;color:#64748b;">Memuat berita...</p>
        </div>`;

    try {
        const { data, error } = await window.supabaseClient
            .from('berita')
            .select('id, judul, konten, kategori, gambar_url, tanggal')
            .order('tanggal', { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {
            newsContainer.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b;">Belum ada berita tersedia.</p>';
            return;
        }

        allBeritaData = data;
        renderBerita('semua');

        // Filter button logic
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderBerita(this.dataset.kat);
            });
        });

    } catch (err) {
        console.error('Error loading news:', err);
        newsContainer.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#dc2626;">Gagal memuat berita. Silakan refresh halaman.</p>';
    }
}

// CSS spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
    .news-category.ppdb { background: #dcfce7; color: #16a34a; }
`;
document.head.appendChild(style);

loadAllNews();
