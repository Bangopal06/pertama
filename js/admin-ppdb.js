if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
});

async function loadPPDB() {
    try {
        const { data: ppdb, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .order('tanggal_daftar', { ascending: false });
        
        if (error) throw error;
        
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
    } catch (error) {
        console.error('Error loading PPDB:', error);
    }
}

async function viewDetail(id) {
    try {
        const { data: item, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        if (item) {
            alert(`Detail Pendaftar:\n\nNama: ${item.nama}\nNISN: ${item.nisn}\nTempat Lahir: ${item.tempat_lahir}\nTanggal Lahir: ${item.tanggal_lahir}\nJenis Kelamin: ${item.jenis_kelamin}\nAsal Sekolah: ${item.asal_sekolah}\nAlamat: ${item.alamat}\nTelepon: ${item.telepon}\nEmail: ${item.email}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deletePPDB(id) {
    if (confirm('Yakin ingin menghapus data pendaftar ini?')) {
        try {
            const { error } = await window.supabaseClient
                .from('ppdb')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            
            loadPPDB();
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus data.');
        }
    }
}

document.getElementById('btn-export').addEventListener('click', async function() {
    try {
        const { data: ppdb, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .order('tanggal_daftar', { ascending: false });
        
        if (error) throw error;
        
        const csv = 'Nama,NISN,Tempat Lahir,Tanggal Lahir,Jenis Kelamin,Asal Sekolah,Alamat,Telepon,Email\n' +
            ppdb.map(p => `${p.nama},${p.nisn},${p.tempat_lahir},${p.tanggal_lahir},${p.jenis_kelamin},${p.asal_sekolah},"${p.alamat}",${p.telepon},${p.email}`).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-ppdb.csv';
        a.click();
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat export data.');
    }
});

loadPPDB();
