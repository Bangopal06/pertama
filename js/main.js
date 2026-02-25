async function loadNews() {
    const newsContainer = document.getElementById('news-list');
    
    // Tampilkan loading
    newsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    try {
        const { data: berita, error } = await window.supabaseClient
            .from('berita')
            .select('id, judul, konten, kategori, gambar_url, tanggal')
            .order('tanggal', { ascending: false })
            .limit(3);
        
        if (error) throw error;
        
        if (!berita || berita.length === 0) {
            newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Belum ada berita tersedia.</p>';
            return;
        }
        
        newsContainer.innerHTML = berita.map(b => {
            // Batasi konten menjadi excerpt (120 karakter untuk homepage)
            const excerpt = b.konten.length > 120 
                ? b.konten.substring(0, 120) + '...' 
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
        newsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #dc2626;">Gagal memuat berita.</p>';
    }
}

async function loadProgram() {
    const programContainer = document.getElementById('program-grid');
    
    // Tampilkan loading
    programContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    try {
        const { data: program, error } = await window.supabaseClient
            .from('program')
            .select('id, judul, deskripsi, gambar_url, urutan')
            .eq('aktif', true)
            .order('urutan', { ascending: true })
            .limit(5);
        
        if (error) throw error;
        
        if (!program || program.length === 0) {
            programContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Belum ada program tersedia.</p>';
            return;
        }
        
        programContainer.innerHTML = program.map(p => `
            <div class="program-card">
                <img src="${p.gambar_url || 'https://via.placeholder.com/400x250?text=Program'}" alt="${p.judul}" loading="lazy">
                <div class="program-content">
                    <h3>${p.judul}</h3>
                    <p>${p.deskripsi}</p>
                    <a href="program.html" class="link-more">Lebih Lanjut...</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading program:', error);
        programContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #dc2626;">Gagal memuat program.</p>';
    }
}

loadNews();
loadProgram();
