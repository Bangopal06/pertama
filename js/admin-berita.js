if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
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

document.getElementById('berita-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const berita = JSON.parse(localStorage.getItem('berita') || '[]');
    const newBerita = {
        id: editingId || Date.now(),
        judul: document.getElementById('judul').value,
        konten: document.getElementById('konten').value,
        kategori: document.getElementById('kategori').value,
        tanggal: new Date().toISOString()
    };
    
    if (editingId) {
        const index = berita.findIndex(b => b.id === editingId);
        berita[index] = newBerita;
    } else {
        berita.push(newBerita);
    }
    
    localStorage.setItem('berita', JSON.stringify(berita));
    document.getElementById('form-berita').style.display = 'none';
    document.getElementById('berita-form').reset();
    editingId = null;
    loadBerita();
});

function loadBerita() {
    const berita = JSON.parse(localStorage.getItem('berita') || '[]');
    const tbody = document.getElementById('berita-list');
    
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
}

function editBerita(id) {
    const berita = JSON.parse(localStorage.getItem('berita') || '[]');
    const item = berita.find(b => b.id === id);
    
    if (item) {
        document.getElementById('form-berita').style.display = 'block';
        document.getElementById('form-title').textContent = 'Edit Berita';
        document.getElementById('judul').value = item.judul;
        document.getElementById('konten').value = item.konten;
        document.getElementById('kategori').value = item.kategori;
        editingId = id;
    }
}

function deleteBerita(id) {
    if (confirm('Yakin ingin menghapus berita ini?')) {
        let berita = JSON.parse(localStorage.getItem('berita') || '[]');
        berita = berita.filter(b => b.id !== id);
        localStorage.setItem('berita', JSON.stringify(berita));
        loadBerita();
    }
}

loadBerita();
