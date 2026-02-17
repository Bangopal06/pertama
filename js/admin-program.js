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
    document.getElementById('form-program').style.display = 'block';
    document.getElementById('form-title').textContent = 'Tambah Program Baru';
    document.getElementById('program-form').reset();
    document.getElementById('preview-img').style.display = 'none';
    document.getElementById('upload-progress').style.display = 'none';
    document.getElementById('file-upload-section').style.display = 'block';
    document.getElementById('url-input-section').style.display = 'none';
    document.getElementById('aktif').checked = true;
    currentImageUrl = null;
    editingId = null;
});

document.getElementById('btn-batal').addEventListener('click', function() {
    document.getElementById('form-program').style.display = 'none';
    document.getElementById('program-form').reset();
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
        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran file terlalu besar! Maksimal 5MB');
            e.target.value = '';
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar!');
            e.target.value = '';
            return;
        }
        
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

document.getElementById('program-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menyimpan...';
    
    try {
        let gambarUrl = currentImageUrl;
        
        const imageType = document.querySelector('input[name="image-type"]:checked').value;
        
        if (imageType === 'url') {
            gambarUrl = document.getElementById('gambar_url').value || currentImageUrl;
        } else {
            const fileInput = document.getElementById('gambar_file');
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const uploadedUrl = await uploadImage(file);
                
                if (!uploadedUrl) {
                    console.log('Upload ke storage gagal, menggunakan base64...');
                    gambarUrl = await convertToBase64(file);
                } else {
                    gambarUrl = uploadedUrl;
                }
            }
        }
        
        if (!gambarUrl) {
            gambarUrl = 'https://via.placeholder.com/600x400?text=Program';
        }
        
        // Parse kegiatan dari textarea (satu per baris)
        const kegiatanText = document.getElementById('kegiatan').value;
        const kegiatanArray = kegiatanText.split('\n').filter(k => k.trim() !== '');
        
        const programData = {
            judul: document.getElementById('judul').value,
            deskripsi: document.getElementById('deskripsi').value,
            deskripsi_lengkap: document.getElementById('deskripsi_lengkap').value,
            gambar_url: gambarUrl,
            kegiatan: kegiatanArray,
            urutan: parseInt(document.getElementById('urutan').value) || 0,
            aktif: document.getElementById('aktif').checked,
            updated_at: new Date().toISOString()
        };
        
        console.log('Mengirim data:', programData);
        
        if (editingId) {
            const { data, error } = await window.supabaseClient
                .from('program')
                .update(programData)
                .eq('id', editingId)
                .select();
            
            if (error) throw error;
            alert('Program berhasil diupdate!');
        } else {
            const { data, error } = await window.supabaseClient
                .from('program')
                .insert([programData])
                .select();
            
            if (error) throw error;
            alert('Program berhasil ditambahkan!');
        }
        
        document.getElementById('form-program').style.display = 'none';
        document.getElementById('program-form').reset();
        document.getElementById('preview-img').style.display = 'none';
        document.getElementById('upload-progress').style.display = 'none';
        currentImageUrl = null;
        editingId = null;
        loadProgram();
    } catch (error) {
        console.error('Error detail:', error);
        alert('Terjadi kesalahan: ' + (error.message || 'Unknown error'));
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan';
    }
});

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
        
        const fileExt = file.name.split('.').pop();
        const fileName = `program-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        progressBar.style.width = '60%';
        
        const { data, error } = await window.supabaseClient.storage
            .from('berita-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) {
            console.error('Storage error:', error);
            progressDiv.style.display = 'none';
            return null;
        }
        
        progressBar.style.width = '90%';
        
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
        return null;
    }
}

async function loadProgram() {
    try {
        const { data: program, error } = await window.supabaseClient
            .from('program')
            .select('*')
            .order('urutan', { ascending: true });
        
        if (error) throw error;
        
        const tbody = document.getElementById('program-list');
        
        if (!program || program.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">Belum ada program</td></tr>';
            return;
        }
        
        tbody.innerHTML = program.map(p => `
            <tr>
                <td>${p.urutan}</td>
                <td><img src="${p.gambar_url || 'https://via.placeholder.com/100x60?text=No+Image'}" alt="${p.judul}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 5px;"></td>
                <td>${p.judul}</td>
                <td><span class="status-badge ${p.aktif ? 'status-active' : 'status-inactive'}">${p.aktif ? 'Aktif' : 'Nonaktif'}</span></td>
                <td>
                    <button class="btn-edit" onclick="editProgram(${p.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProgram(${p.id})">Hapus</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading program:', error);
        alert('Error loading program: ' + error.message);
    }
}

async function editProgram(id) {
    try {
        const { data: item, error } = await window.supabaseClient
            .from('program')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        if (item) {
            document.getElementById('form-program').style.display = 'block';
            document.getElementById('form-title').textContent = 'Edit Program';
            document.getElementById('judul').value = item.judul;
            document.getElementById('deskripsi').value = item.deskripsi;
            document.getElementById('deskripsi_lengkap').value = item.deskripsi_lengkap || '';
            document.getElementById('urutan').value = item.urutan || 0;
            document.getElementById('aktif').checked = item.aktif;
            
            // Set kegiatan (array to textarea)
            if (item.kegiatan && Array.isArray(item.kegiatan)) {
                document.getElementById('kegiatan').value = item.kegiatan.join('\n');
            }
            
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

async function deleteProgram(id) {
    if (confirm('Yakin ingin menghapus program ini?')) {
        try {
            const { error } = await window.supabaseClient
                .from('program')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            loadProgram();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus program.');
        }
    }
}

loadProgram();
