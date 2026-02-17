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
                <img src="${b.gambar_url || 'https://via.placeholder.com/400x250?text=Berita+Sekolah'}" alt="${b.judul}" class="news-image">
                <div class="news-content">
                    <h3>${b.judul}</h3>
                    <p class="news-meta">${b.kategori} - ${new Date(b.tanggal).toLocaleDateString('id-ID')}</p>
                    <p>${b.konten.substring(0, 150)}...</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = '<p>Gagal memuat berita.</p>';
    }
}

async function loadProgram() {
    const programContainer = document.getElementById('program-grid');
    
    try {
        const { data: program, error } = await window.supabaseClient
            .from('program')
            .select('*')
            .eq('aktif', true)
            .order('urutan', { ascending: true })
            .limit(5);
        
        if (error) throw error;
        
        if (!program || program.length === 0) {
            programContainer.innerHTML = '<p>Belum ada program tersedia.</p>';
            return;
        }
        
        programContainer.innerHTML = program.map(p => `
            <div class="program-card">
                <img src="${p.gambar_url || 'https://via.placeholder.com/400x250?text=Program'}" alt="${p.judul}">
                <div class="program-content">
                    <h3>${p.judul}</h3>
                    <p>${p.deskripsi}</p>
                    <a href="program.html" class="link-more">Lebih Lanjut...</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading program:', error);
        programContainer.innerHTML = '<p>Gagal memuat program.</p>';
    }
}

loadNews();
loadProgram();
