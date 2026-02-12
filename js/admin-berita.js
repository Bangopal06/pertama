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

document.getElementById('btn-tambah').addEventListener('click', function() {
    document.getElementById('form-berita').style.display = 'block';
    document.getElementById('form-title').textContent = 'Tambah Berita Baru';
    document.getElementById('berita-form').reset();
    editingId = null;
});

document.getElementById('btn-batal').addEventListener('click', function() {
    document.getElementById('form-berita').style.display = 'none';
    document.getElementById('berita-form').reset();
    editingId = null;
});

document.getElementById('berita-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menyimpan...';
    
    try {
        const beritaData = {
            judul: document.getElementById('judul').value,
            konten: document.getElementById('konten').value,
            kategori: document.getElementById('kategori').value,
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
            tbody.innerHTML = '<tr><td colspan="4">Belum ada berita</td></tr>';
            return;
        }
        
        tbody.innerHTML = berita.map(b => `
            <tr>
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
