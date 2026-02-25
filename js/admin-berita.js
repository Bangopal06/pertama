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
    document.getElementById('form-berita').style.display = 'block';
    document.getElementById('form-title').textContent = 'Tambah Berita Baru';
    document.getElementById('berita-form').reset();
    document.getElementById('preview-img').style.display = 'none';
    document.getElementById('upload-progress').style.display = 'none';
    document.getElementById('file-upload-section').style.display = 'block';
    document.getElementById('url-input-section').style.display = 'none';
    currentImageUrl = null;
    editingId = null;
});

document.getElementById('btn-batal').addEventListener('click', function() {
    document.getElementById('form-berita').style.display = 'none';
    document.getElementById('berita-form').reset();
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
            alert('URL gambar tidak valid atau tidak bisa diakses');
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
        // Validasi ukuran file (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran file terlalu besar! Maksimal 5MB');
            e.target.value = '';
            return;
        }
        
        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar!');
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

document.getElementById('berita-form').addEventListener('submit', async function(e) {
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
                
                // Upload ke Supabase Storage (WAJIB, tidak ada fallback)
                const uploadedUrl = await uploadImage(file);
                
                // Jika upload gagal, stop dan tampilkan error
                if (!uploadedUrl) {
                    showNotification('Upload gambar gagal! Pastikan bucket sudah dibuat dengan menjalankan setup-storage-images.sql', 'error');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Simpan';
                    return; // Stop proses
                }
                
                gambarUrl = uploadedUrl;
            }
        }
        
        // Jika tidak ada gambar, gunakan placeholder
        if (!gambarUrl) {
            gambarUrl = 'https://via.placeholder.com/800x400?text=Berita+Sekolah';
        }
        
        const beritaData = {
            judul: document.getElementById('judul').value,
            konten: document.getElementById('konten').value,
            kategori: document.getElementById('kategori').value,
            gambar_url: gambarUrl,
            tanggal: new Date().toISOString()
        };
        
        console.log('Mengirim data:', beritaData);
        
        if (editingId) {
            const { data, error } = await window.supabaseClient
                .from('berita')
                .update(beritaData)
                .eq('id', editingId)
                .select();
            
            console.log('Response update:', { data, error });
            
            if (error) throw error;
            
            showNotification('Berita berhasil diupdate!', 'success');
        } else {
            const { data, error } = await window.supabaseClient
                .from('berita')
                .insert([beritaData])
                .select();
            
            console.log('Response insert:', { data, error });
            
            if (error) throw error;
            
            showNotification('Berita berhasil ditambahkan!', 'success');
        }
        
        document.getElementById('form-berita').style.display = 'none';
        document.getElementById('berita-form').reset();
        document.getElementById('preview-img').style.display = 'none';
        document.getElementById('upload-progress').style.display = 'none';
        currentImageUrl = null;
        editingId = null;
        loadBerita();
    } catch (error) {
        console.error('Error detail:', error);
        showNotification('Terjadi kesalahan: ' + (error.message || 'Unknown error'), 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan';
    }
});

// Fungsi untuk convert gambar ke base64 (fallback jika storage belum setup)
async function uploadImage(file) {
    const progressDiv = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    try {
        progressDiv.style.display = 'block';
        progressText.textContent = 'Mengupload gambar...';
        progressBar.style.width = '30%';
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        console.log('Uploading file:', fileName);
        progressBar.style.width = '60%';
        
        // Upload ke Supabase Storage
        const { data, error } = await window.supabaseClient.storage
            .from('berita-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) {
            console.error('Storage upload error:', error);
            progressDiv.style.display = 'none';
            
            // Tampilkan error yang jelas
            if (error.message.includes('Bucket not found')) {
                showNotification('Bucket berita-images belum dibuat! Jalankan setup-storage-images.sql di Supabase SQL Editor.', 'error');
            } else if (error.message.includes('new row violates row-level security')) {
                showNotification('Error: Tidak ada permission untuk upload. Cek RLS policy di Supabase.', 'error');
            } else {
                showNotification('Error upload: ' + error.message, 'error');
            }
            
            return null; // Return null jika gagal, akan fallback ke base64
        }
        
        console.log('Upload success:', data);
        progressBar.style.width = '90%';
        
        // Get public URL
        const { data: urlData } = window.supabaseClient.storage
            .from('berita-images')
            .getPublicUrl(filePath);
        
        console.log('Public URL:', urlData.publicUrl);
        
        progressBar.style.width = '100%';
        progressText.textContent = 'Upload berhasil!';
        
        setTimeout(() => {
            progressDiv.style.display = 'none';
            progressBar.style.width = '0%';
        }, 1000);
        
        showNotification('Gambar berhasil diupload ke Supabase Storage!', 'success');
        return urlData.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        progressDiv.style.display = 'none';
        showNotification('Error upload gambar: ' + error.message, 'error');
        return null; // Return null untuk fallback ke base64
    }
}

async function loadBerita() {
    const tbody = document.getElementById('berita-list');
    
    try {
        console.log('Loading berita...');
        
        // Cek apakah Supabase client tersedia
        if (!window.supabaseClient) {
            tbody.innerHTML = '<tr><td colspan="5" style="color: red;">Supabase client tidak tersedia. Cek konfigurasi.</td></tr>';
            return;
        }
        
        const { data: berita, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .order('tanggal', { ascending: false });
        
        console.log('Load berita response:', { berita, error });
        
        if (error) {
            console.error('Database error:', error);
            tbody.innerHTML = `<tr><td colspan="5" style="color: red;">Error: ${error.message}<br><small>Pastikan tabel 'berita' sudah dibuat di Supabase</small></td></tr>`;
            return;
        }
        
        if (!berita || berita.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">Belum ada berita. Klik "Tambah Berita" untuk membuat berita baru.</td></tr>';
            return;
        }
        
        tbody.innerHTML = berita.map(b => `
            <tr>
                <td><img src="${b.gambar_url || 'https://via.placeholder.com/100x60?text=No+Image'}" alt="${b.judul}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
                <td>${b.judul}</td>
                <td>${b.kategori}</td>
                <td>${new Date(b.tanggal).toLocaleDateString('id-ID')}</td>
                <td>
                    <button class="btn-edit" onclick="editBerita(${b.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteBerita(${b.id})">Hapus</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Exception loading berita:', error);
        tbody.innerHTML = `<tr><td colspan="5" style="color: red;">Error: ${error.message}<br><small>Cek console browser (F12) untuk detail</small></td></tr>`;
    }
}

async function editBerita(id) {
    try {
        const { data: item, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        if (item) {
            document.getElementById('form-berita').style.display = 'block';
            document.getElementById('form-title').textContent = 'Edit Berita';
            document.getElementById('judul').value = item.judul;
            document.getElementById('konten').value = item.konten;
            document.getElementById('kategori').value = item.kategori;
            
            // Show preview if image exists
            const preview = document.getElementById('preview-img');
            if (item.gambar_url) {
                preview.src = item.gambar_url;
                preview.style.display = 'block';
                currentImageUrl = item.gambar_url;
            }
            
            editingId = id;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteBerita(id) {
    if (confirm('Yakin ingin menghapus berita ini?')) {
        try {
            const { error } = await window.supabaseClient
                .from('berita')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            showNotification('Berita berhasil dihapus!', 'success');
            loadBerita();
        } catch (error) {
            console.error('Error:', error);
            showNotification('Terjadi kesalahan saat menghapus berita.', 'error');
        }
    }
}

loadBerita();
