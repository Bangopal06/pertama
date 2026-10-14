async function loadNews() {
    const newsContainer = document.getElementById('news-list');
    if (!newsContainer) return; // Elemen tidak ada, skip
    
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
    if (!programContainer) return; // Elemen tidak ada, skip
    
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

async function loadEkskul() {
    const grid = document.getElementById('ekskul-grid');
    if (!grid) return;

    try {
        const { data, error } = await window.supabaseClient
            .from('ekskul')
            .select('*')
            .eq('aktif', true)
            .order('urutan', { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            grid.innerHTML = '<p style="color:white;text-align:center;padding:20px;">Belum ada data ekskul.</p>';
            return;
        }

        // Build single card HTML
        function buildCard(e) {
            const foto1 = e.gambar_url || '';
            const foto2 = e.gambar2_url || '';
            const hasTwo = foto1 && foto2;

            const photoSlider = foto1
                ? `<div class="ekskul-photos${hasTwo ? ' has-two' : ''}">
                       <img src="${foto1}" alt="${e.nama}" loading="lazy" onerror="this.style.display='none'">
                       ${hasTwo ? `<img src="${foto2}" alt="${e.nama} 2" loading="lazy" onerror="this.style.display='none'">` : ''}
                   </div>`
                : `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#1e40af,#3b82f6);"></div>`;

            const dots = hasTwo
                ? `<div class="ekskul-dots">
                       <span class="ekskul-dot active"></span>
                       <span class="ekskul-dot"></span>
                   </div>`
                : '';

            return `
                <div class="ekskul-card">
                    ${photoSlider}
                    <div class="ekskul-overlay"></div>
                    ${dots}
                    <div class="ekskul-card-body">
                        <h3>${e.nama}</h3>
                        ${e.deskripsi ? `<div class="ekskul-card-desc">${e.deskripsi}</div>` : ''}
                    </div>
                </div>`;
        }

        const cardHTML = data.map(buildCard).join('');
        // Duplicate for seamless infinite loop
        grid.innerHTML = cardHTML + cardHTML;

        // Foto 1 = default, Foto 2 = tampil saat hover via CSS
        // Dots update on mouseenter/mouseleave
        grid.querySelectorAll('.ekskul-card').forEach(card => {
            const photos = card.querySelector('.ekskul-photos.has-two');
            if (!photos) return;
            const dots = card.querySelectorAll('.ekskul-dot');
            card.addEventListener('mouseenter', () => {
                dots[0]?.classList.remove('active');
                dots[1]?.classList.add('active');
            });
            card.addEventListener('mouseleave', () => {
                dots[1]?.classList.remove('active');
                dots[0]?.classList.add('active');
            });
        });

    } catch (err) {
        console.error('Error loading ekskul:', err);
    }
}

loadEkskul();

// ===== POSTINGAN TERBARU =====
async function loadPostinganTerbaru() {
    const grid = document.getElementById('postingan-grid');
    if (!grid) return;

    try {
        const { data, error } = await window.supabaseClient
            .from('berita')
            .select('id, judul, konten, kategori, gambar_url, tanggal')
            .order('tanggal', { ascending: false })
            .limit(6);

        if (error) throw error;
        if (!data || data.length === 0) {
            grid.innerHTML = '<p style="text-align:center;color:#6b7280;grid-column:1/-1;">Belum ada postingan.</p>';
            return;
        }

        const katColor = {
            'Akademik':   '#1e3a8a',
            'Prestasi':   '#7c3aed',
            'Kegiatan':   '#0891b2',
            'Pengumuman': '#d97706',
            'PPDB':       '#16a34a'
        };

        grid.innerHTML = data.map(b => {
            const excerpt = b.konten
                ? b.konten.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                : '';
            const tgl = new Date(b.tanggal).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' });
            const color = katColor[b.kategori] || '#1e3a8a';
            const posisi = b.foto_posisi || 'center';
            return `
                <a href="berita-detail.html?id=${b.id}" class="post-card">
                    <div class="post-img">
                        <img src="${b.gambar_url || 'https://via.placeholder.com/400x220?text=Berita'}"
                             alt="${b.judul}" loading="lazy"
                             style="object-position:${posisi};"
                             onerror="this.src='https://via.placeholder.com/400x220?text=Berita'">
                        <span class="post-kat" style="background:${color}">${b.kategori}</span>
                    </div>
                    <div class="post-body">
                        <h4>${b.judul}</h4>
                        <p>${excerpt}</p>
                        <span class="post-tgl">📅 ${tgl}</span>
                    </div>
                </a>`;
        }).join('');

    } catch (err) {
        console.error('Error loading postingan:', err);
    }
}

loadPostinganTerbaru();
