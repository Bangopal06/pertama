if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

function loadPPDB() {
    const ppdb = JSON.parse(localStorage.getItem('ppdb') || '[]');
    const tbody = document.getElementById('ppdb-list');
    
    tbody.innerHTML = ppdb.map(p => `
        <tr>
            <td>${p.nama}</td>
            <td>${p.nisn}</td>
            <td>${p.asal_sekolah}</td>
            <td>${p.telepon}</td>
            <td>${p.email}</td>
            <td>${new Date(p.tanggal_daftar).toLocaleDateString('id-ID')}</td>
            <td>
                <button class="btn-view" onclick="viewDetail(${p.id})">Detail</button>
                <button class="btn-delete" onclick="deletePPDB(${p.id})">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function viewDetail(id) {
    const ppdb = JSON.parse(localStorage.getItem('ppdb') || '[]');
    const item = ppdb.find(p => p.id === id);
    
    if (item) {
        alert(`Detail Pendaftar:\n\nNama: ${item.nama}\nNISN: ${item.nisn}\nTempat Lahir: ${item.tempat_lahir}\nTanggal Lahir: ${item.tanggal_lahir}\nJenis Kelamin: ${item.jenis_kelamin}\nAsal Sekolah: ${item.asal_sekolah}\nAlamat: ${item.alamat}\nTelepon: ${item.telepon}\nEmail: ${item.email}`);
    }
}

function deletePPDB(id) {
    if (confirm('Yakin ingin menghapus data pendaftar ini?')) {
        let ppdb = JSON.parse(localStorage.getItem('ppdb') || '[]');
        ppdb = ppdb.filter(p => p.id !== id);
        localStorage.setItem('ppdb', JSON.stringify(ppdb));
        loadPPDB();
    }
}

document.getElementById('btn-export').addEventListener('click', function() {
    const ppdb = JSON.parse(localStorage.getItem('ppdb') || '[]');
    const csv = 'Nama,NISN,Tempat Lahir,Tanggal Lahir,Jenis Kelamin,Asal Sekolah,Alamat,Telepon,Email\n' +
        ppdb.map(p => `${p.nama},${p.nisn},${p.tempat_lahir},${p.tanggal_lahir},${p.jenis_kelamin},${p.asal_sekolah},"${p.alamat}",${p.telepon},${p.email}`).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-ppdb.csv';
    a.click();
});

loadPPDB();
