if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = '../login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (confirm('Apakah Anda yakin ingin keluar dari halaman admin?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminUser');
        window.location.href = '../login.html';
    }
});

let editingId = null;
let currentImageUrl = null;

document.getElementById('btn-tambah').addEventListener('click', function() {
    document.getElementById('form-slider').style.display = 'block';
    document.getElementById('form-title').textContent = 'Tambah Slide Baru';
    document.getElementById('slider-form').reset();
    document.getElementById('preview-img').style.display = 'none';
    document.getElementById('upload-progress').style.display = 'none';
    document.getElementById('file-upload-section').style.display = 'block';
    document.getElementById('url-input-section').style.display = 'none';
    document.getElementById('aktif').checked = true;
    currentImageUrl = null;
    editingId = null;
    window.scrollTo(0, document.getElementById('form-slider').offsetTop);
});

document.getElementById('btn-batal').addEventListener('click', function() {
    document.getElementById('form-slider').style.display = 'none';
    document.getElementById('slider-form').reset();
    document.getElementById('preview-img').style.display = 'none';
    document.getElementById('upload-progress').style.display = 'none';
    currentImageUrl = null;
    editingId = null;
});

// Toggle antara file upload dan URL input
document.querySelectorAll('input[name="image-type"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const fileSection = document.getElementById('file-upload-section');
        const urlSection = document.getElementById('url-input-section');
        const preview = document.getElementById('preview-img');
        
        if (this.value === 'file') {
            fileSection.style.display = 'block';
            urlSection.style.display = 'none';
            document.getElementById('gambar_url').value = '';
        } else {
            fileSection.style.display = 'none';
            urlSection.style.display = 'block';
            document.getElementById('gambar_file').value = '';
            preview.style.display = 'none';
        }
    });
});

// Preview gambar dari URL
document.getElementById('gambar_url').addEventListener('input', function(e) {
    const url = e.target.value;
    const preview = document.getElementById('preview-img');
    
    if (url) {
        preview.src = url;
        preview.style.display = 'block';
        preview.onerror = function() {
            preview.style.display = 'none';
            showNotification('URL gambar tidak valid atau tidak bisa diakses', 'error');
        };
        currentImageUrl = url;
    } else {
        preview.style.display = 'none';
        currentImageUrl = null;
    }
});

// Preview gambar saat file dipilih
document.getElementById('gambar_file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('preview-img');
    
    if (file) {
        // Validasi ukuran file (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('Ukuran file terlalu besar! Maksimal 10MB', 'error');
            e.target.value = '';
            return;
        }
        
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            showNotification('File harus berupa gambar!', 'error');
            e.target.value = '';
            return;
        }
        
        // Preview gambar
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.src = event.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
});

document.getElementById('slider-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menyimpan...';
    
    try {
        let gambarUrl = currentImageUrl;
        
        // Cek apakah menggunakan URL atau file upload
        const imageType = document.querySelector('input[name="image-type"]:checked').value;
        
        if (imageType === 'url') {
            // Gunakan URL yang diinput
            gambarUrl = document.getElementById('gambar_url').value || currentImageUrl;
        } else {
            // Upload gambar jika ada file baru
            const fileInput = document.getElementById('gambar_file');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                
                // Upload ke Supabase Storage (WAJIB)
                const uploadedUrl = await uploadImage(file);
                
                // Jika upload gagal, stop
                if (!uploadedUrl) {
                    showNotification('Upload gambar gagal! Pastikan bucket sudah dibuat dengan menjalankan setup-storage-images.sql', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Simpan';
                    return;
                }
                
                gambarUrl = uploadedUrl;
            }
        }
        
        // Validasi gambar wajib ada
        if (!gambarUrl) {
            showNotification('Gambar wajib diisi!', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Simpan';
            return;
        }
        
        const sliderData = {
            judul: document.getElementById('judul').value,
            subjudul: document.getElementById('subjudul').value,
            deskripsi: document.getElementById('deskripsi').value,
            gambar_url: gambarUrl,
            link_url: document.getElementById('link_url').value || null,
            link_text: document.getElementById('link_text').value || null,
            urutan: parseInt(document.getElementById('urutan').value),
            aktif: document.getElementById('aktif').checked
        };
        
        if (editingId) {
            const { data, error } = await window.supabaseClient
                .from('slider')
                .update(sliderData)
                .eq('id', editingId)
                .select();
            
            if (error) throw error;
            
            showNotification('Slide berhasil diupdate!', 'success');
        } else {
            const { data, error } = await window.supabaseClient
                .from('slider')
                .insert([sliderData])
                .select();
            
            if (error) throw error;
            
            showNotification('Slide berhasil ditambahkan!', 'success');
        }
        
        document.getElementById('form-slider').style.display = 'none';
        document.getElementById('slider-form').reset();
        document.getElementById('preview-img').style.display = 'none';
        document.getElementById('upload-progress').style.display = 'none';
        currentImageUrl = null;
        editingId = null;
        loadSlider();
    } catch (error) {
        console.error('Error detail:', error);
        showNotification('Terjadi kesalahan: ' + (error.message || 'Unknown error'), 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan';
    }
});

async function uploadImage(file) {
    const progressDiv = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    try {
        progressDiv.style.display = 'block';
        progressText.textContent = 'Mengupload gambar slider...';
        progressBar.style.width = '30%';
        
        const fileExt = file.name.split('.').pop();
        const fileName = `slider-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        console.log('Uploading slider image:', fileName);
        progressBar.style.width = '60%';
        
        const { data, error } = await window.supabaseClient.storage
            .from('slider-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) {
            console.error('Storage upload error:', error);
            progressDiv.style.display = 'none';
            
            if (error.message.includes('Bucket not found')) {
                showNotification('Bucket slider-images belum dibuat! Jalankan setup-storage-images.sql di Supabase SQL Editor.', 'error');
            } else if (error.message.includes('new row violates row-level security')) {
                showNotification('Error: Tidak ada permission untuk upload. Cek RLS policy di Supabase.', 'error');
            } else {
                showNotification('Error upload: ' + error.message, 'error');
            }
            
            return null;
        }
        
        console.log('Upload success:', data);
        progressBar.style.width = '90%';
        
        const { data: urlData } = window.supabaseClient.storage
            .from('slider-images')
            .getPublicUrl(filePath);
        
        console.log('Public URL:', urlData.publicUrl);
        
        progressBar.style.width = '100%';
        progressText.textContent = 'Upload berhasil!';
        
        setTimeout(() => {
            progressDiv.style.display = 'none';
            progressBar.style.width = '0%';
        }, 1000);
        
        showNotification('Gambar slider berhasil diupload ke Supabase Storage!', 'success');
        return urlData.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        progressDiv.style.display = 'none';
        showNotification('Error upload gambar: ' + error.message, 'error');
        return null;
    }
}

async function loadSlider() {
    const container = document.getElementById('slider-preview');
    
    try {
        const { data: slider, error } = await window.supabaseClient
            .from('slider')
            .select('*')
            .order('urutan', { ascending: true });
        
        if (error) throw error;
        
        if (!slider || slider.length === 0) {
            container.innerHTML = '<p>Belum ada slide. Klik "Tambah Slide" untuk membuat slide baru.</p>';
            return;
        }
        
        container.innerHTML = slider.map(s => `
            <div class="slider-card">
                <img src="${s.gambar_url}" alt="${s.judul}">
                <div class="slider-card-content">
                    <h3>${s.judul} ${s.subjudul}</h3>
                    <p>${s.deskripsi || ''}</p>
                    <p><strong>Urutan:</strong> ${s.urutan}</p>
                    <span class="badge ${s.aktif ? 'badge-active' : 'badge-inactive'}">
                        ${s.aktif ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <div class="slider-card-actions">
                        <button class="btn-edit" onclick="editSlider(${s.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteSlider(${s.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading slider:', error);
        container.innerHTML = '<p style="color: red;">Error loading slider.</p>';
    }
}

async function editSlider(id) {
    try {
        const { data: item, error } = await window.supabaseClient
            .from('slider')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        if (item) {
            document.getElementById('form-slider').style.display = 'block';
            document.getElementById('form-title').textContent = 'Edit Slide';
            document.getElementById('judul').value = item.judul;
            document.getElementById('subjudul').value = item.subjudul;
            document.getElementById('deskripsi').value = item.deskripsi || '';
            document.getElementById('link_url').value = item.link_url || '';
            document.getElementById('link_text').value = item.link_text || '';
            document.getElementById('urutan').value = item.urutan;
            document.getElementById('aktif').checked = item.aktif;
            
            // Show preview if image exists
            const preview = document.getElementById('preview-img');
            if (item.gambar_url) {
                preview.src = item.gambar_url;
                preview.style.display = 'block';
                currentImageUrl = item.gambar_url;
            }
            
            editingId = id;
            window.scrollTo(0, document.getElementById('form-slider').offsetTop);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error loading slide data', 'error');
    }
}

async function deleteSlider(id) {
    if (confirm('Yakin ingin menghapus slide ini?')) {
        try {
            const { error } = await window.supabaseClient
                .from('slider')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            showNotification('Slide berhasil dihapus!', 'success');
            loadSlider();
        } catch (error) {
            console.error('Error:', error);
            showNotification('Terjadi kesalahan saat menghapus slide.', 'error');
        }
    }
}

loadSlider();
