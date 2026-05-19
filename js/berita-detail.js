// Get berita ID from URL
const urlParams = new URLSearchParams(window.location.search);
const beritaId = urlParams.get('id');

if (!beritaId) {
    window.location.href = 'berita.html';
}

// Load berita detail
async function loadBeritaDetail() {
    try {
        const { data, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .eq('id', beritaId)
            .single();
        
        if (error) throw error;
        
        if (!data) {
            alert('Berita tidak ditemukan');
            window.location.href = 'berita.html';
            return;
        }
        
        // Update page title
        document.title = data.judul + ' - SMA Negeri 1';
        
        // Display berita
        document.getElementById('article-category').textContent = data.kategori;
        document.getElementById('article-title').textContent = data.judul;
        document.getElementById('article-date').textContent = new Date(data.tanggal).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        if (data.gambar_url) {
            document.getElementById('article-image').src = data.gambar_url;
            document.getElementById('article-image').alt = data.judul;
        } else {
            document.getElementById('article-image').style.display = 'none';
        }
        
        // Format konten dengan paragraf dan foto
        const kontenFormatted = data.konten.split('\n').map(p => {
            const fotoMatch = p.match(/^\[foto:(.*?)\]$/);
            if (fotoMatch) {
                return `<div style="margin:20px 0; text-align:center;"><img src="${fotoMatch[1]}" alt="Foto" style="max-width:100%; border-radius:10px; box-shadow:0 4px 15px rgba(0,0,0,0.1);"></div>`;
            }
            return p ? `<p>${p}</p>` : '';
        }).join('');
        document.getElementById('article-content').innerHTML = kontenFormatted;
        
        // Setup share buttons
        const currentUrl = window.location.href;
        const shareText = encodeURIComponent(data.judul);
        
        document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        document.getElementById('share-tw').href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;
        document.getElementById('share-wa').href = `https://wa.me/?text=${shareText}%20${currentUrl}`;
        
        // Load related news
        loadRelatedNews(data.kategori, data.id);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal memuat berita');
        window.location.href = 'berita.html';
    }
}

// Load related news
async function loadRelatedNews(kategori, currentId) {
    try {
        const { data, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .eq('kategori', kategori)
            .neq('id', currentId)
            .order('tanggal', { ascending: false })
            .limit(3);
        
        if (error) throw error;
        
        const relatedContainer = document.getElementById('related-news');
        
        if (data.length === 0) {
            relatedContainer.innerHTML = '<p>Tidak ada berita terkait</p>';
            return;
        }
        
        relatedContainer.innerHTML = data.map(berita => `
            <div class="news-card">
                <img src="${berita.gambar_url || 'https://via.placeholder.com/400x250'}" alt="${berita.judul}">
                <div class="news-content">
                    <span class="news-category">${berita.kategori}</span>
                    <h3>${berita.judul}</h3>
                    <p class="news-date">${new Date(berita.tanggal).toLocaleDateString('id-ID')}</p>
                    <a href="berita-detail.html?id=${berita.id}" class="btn-read-more">Baca Selengkapnya →</a>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Load on page load
loadBeritaDetail();
