async function loadProgramDetail() {
    const container = document.getElementById('program-detail-grid');
    
    if (!container) {
        console.error('Container program-detail-grid tidak ditemukan');
        return;
    }
    
    // Cek apakah Supabase client tersedia
    if (!window.supabaseClient) {
        console.log('Supabase client tidak tersedia, menggunakan data default');
        loadDefaultProgramDetail();
        return;
    }
    
    try {
        const { data: program, error } = await window.supabaseClient
            .from('program')
            .select('*')
            .eq('aktif', true)
            .order('urutan', { ascending: true});
        
        // Jika ada error (termasuk tabel tidak ada), gunakan data default
        if (error) {
            console.log('Error dari database, menggunakan data default:', error.message);
            loadDefaultProgramDetail();
            return;
        }
        
        // Jika tidak ada data, gunakan data default
        if (!program || program.length === 0) {
            console.log('Tidak ada data program, menggunakan data default');
            loadDefaultProgramDetail();
            return;
        }
        
        // Tampilkan data dari database
        console.log('Menampilkan', program.length, 'program dari database');
        container.innerHTML = program.map(p => `
            <div class="program-detail-card">
                <img src="${p.gambar_url || 'https://via.placeholder.com/600x400?text=Program'}" alt="${p.judul}">
                <div class="program-detail-content">
                    <h2>${p.judul}</h2>
                    <p>${p.deskripsi_lengkap || p.deskripsi}</p>
                    ${p.kegiatan && Array.isArray(p.kegiatan) && p.kegiatan.length > 0 ? `
                        <h3>Kegiatan Program:</h3>
                        <ul>
                            ${p.kegiatan.map(k => `<li>${k}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Exception saat load program:', error);
        loadDefaultProgramDetail();
    }
}

function loadDefaultProgramDetail() {
    const container = document.getElementById('program-detail-grid');
    
    if (!container) {
        console.error('Container tidak ditemukan');
        return;
    }
    
    console.log('Menampilkan data program default');
    
    const defaultProgram = [
        {
            judul: "Qur'an dan Ulumuddin",
            deskripsi_lengkap: "Program menghafal dan memahami Al-Qur'an serta ilmu agama (aqidah, hadits, fiqh) dan lain-lain dengan metode yang mudah dan menyenangkan untuk meningkatkan kecintaan terhadap Al-Qur'an dan keimanan.",
            gambar_url: "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600",
            kegiatan: ["Tahfidz Al-Qur'an dengan metode Tilawati", "Kajian Tafsir dan Ulumul Qur'an", "Pembelajaran Hadits dan Fiqih", "Praktik ibadah sehari-hari"]
        },
        {
            judul: "Adab dan Akhlak",
            deskripsi_lengkap: "Praktik langsung sopan santun dalam keseharian dengan pembinaan karakter dan kepribadian yang islami, mulia, dan berakhlak baik kepada Allah, sesama, dan lingkungan.",
            gambar_url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600",
            kegiatan: ["Pembinaan akhlak dan karakter islami", "Praktik adab keseharian", "Mentoring dan bimbingan spiritual", "Kegiatan sosial dan kepedulian"]
        },
        {
            judul: "Sains dan Teknologi",
            deskripsi_lengkap: "Mengintegrasikan eksperimen laboratorium dan pembelajaran berbasis proyek, dan teknologi digital. Memfasilitasi kemampuan sains untuk melek teknologi dan yang siap menghadapi era digital.",
            gambar_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
            kegiatan: ["Praktikum laboratorium IPA", "Pembelajaran coding dan robotika", "Project-based learning", "Kompetisi sains dan teknologi"]
        },
        {
            judul: "Pembelajaran Bilingual",
            deskripsi_lengkap: "Program pembelajaran bilingual mencakup bahasa Arab, Inggris, dan Indonesia dalam lingkungan yang mendukung untuk meningkatkan kemampuan komunikasi global.",
            gambar_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
            kegiatan: ["English Day dan Arabic Day", "Conversation class dengan native speaker", "Pembelajaran mata pelajaran dalam bahasa asing", "Kompetisi debat dan pidato"]
        },
        {
            judul: "Penumbuhan Leadership",
            deskripsi_lengkap: "Belajar hidup mandiri dengan kultur Pesantren, latihan kepemimpinan, kedisiplinan, tanggung jawab, dan jiwa wirausaha untuk menjadi pemimpin masa depan.",
            gambar_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
            kegiatan: ["Leadership training dan outbound", "Organisasi siswa (OSIS, MPK)", "Kepanitiaan event sekolah", "Entrepreneurship dan kewirausahaan"]
        }
    ];
    
    container.innerHTML = defaultProgram.map(p => `
        <div class="program-detail-card">
            <img src="${p.gambar_url}" alt="${p.judul}">
            <div class="program-detail-content">
                <h2>${p.judul}</h2>
                <p>${p.deskripsi_lengkap}</p>
                <h3>Kegiatan Program:</h3>
                <ul>
                    ${p.kegiatan.map(k => `<li>${k}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Tunggu DOM ready sebelum load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProgramDetail);
} else {
    loadProgramDetail();
}
