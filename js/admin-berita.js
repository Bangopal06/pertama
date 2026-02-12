if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
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
                
                // Coba upload ke Supabase Storage
                const uploadedUrl = await uploadImage(file);
                
                // Jika upload gagal (bucket belum ada), convert ke base64
                if (!uploadedUrl) {
                    console.log('Upload ke storage gagal, menggunakan base64...');
                    gambarUrl = await convertToBase64(file);
                } else {
                    gambarUrl = uploadedUrl;
                }
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
            
            alert('Berita berhasil diupdate!');
        } else {
            const { data, error } = await window.supabaseClient
                .from('berita')
                .insert([beritaData])
                .select();
            
            console.log('Response insert:', { data, error });
            
            if (error) throw error;
            
            alert('Berita berhasil ditambahkan!');
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
        alert('Terjadi kesalahan: ' + (error.message || 'Unknown error'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan';
    }
});

// Fungsi untuk convert gambar ke base64 (fallback jika storage belum setup)
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function uploadImage(file) {
    const progressDiv = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    try {
        progressDiv.style.display = 'block';
        progressText.textContent = 'Uploading...';
        progressBar.style.width = '30%';
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        progressBar.style.width = '60%';
        
        // Upload ke Supabase Storage
        const { data, error } = await window.supabaseClient.storage
            .from('berita-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) {
            console.error('Storage error:', error);
            progressDiv.style.display = 'none';
            return null; // Return null jika gagal, akan fallback ke base64
        }
        
        progressBar.style.width = '90%';
        
        // Get public URL
        const { data: urlData } = window.supabaseClient.storage
            .from('berita-images')
            .getPublicUrl(filePath);
        
        progressBar.style.width = '100%';
        progressText.textContent = 'Upload berhasil!';
        
        setTimeout(() => {
            progressDiv.style.display = 'none';
            progressBar.style.width = '0%';
        }, 1000);
        
        return urlData.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        progressDiv.style.display = 'none';
        return null; // Return null untuk fallback ke base64
    }
}

async function loadBerita() {
    try {
        console.log('Loading berita...');
        
        const { data: berita, error } = await window.supabaseClient
            .from('berita')
            .select('*')
            .order('tanggal', { ascending: false });
        
        console.log('Load berita response:', { berita, error });
        
        if (error) throw error;
        
        const tbody = document.getElementById('berita-list');
        
        if (!berita || berita.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">Belum ada berita</td></tr>';
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
        console.error('Error loading berita:', error);
        alert('Error loading berita: ' + error.message);
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
            
            loadBerita();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus berita.');
        }
    }
}

loadBerita();
