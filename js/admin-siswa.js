// Check admin login
if (!localStorage.getItem('admin_logged_in')) {
    window.location.href = 'login.html';
}

document.getElementById('admin-name').textContent = localStorage.getItem('admin_username') || 'Admin';

let allSiswa = [];

// Load siswa data
async function loadSiswa() {
    try {
        const { data, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .order('tanggal_daftar', { ascending: false });
        
        if (error) throw error;
        
        allSiswa = data;
        displaySiswa(data);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('siswa-list').innerHTML = '<p>Error loading data</p>';
    }
}

function displaySiswa(siswaList) {
    const container = document.getElementById('siswa-list');
    
    if (siswaList.length === 0) {
        container.innerHTML = '<p>Tidak ada data siswa</p>';
        return;
    }
    
    container.innerHTML = siswaList.map(siswa => `
        <div class="siswa-card">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <h3>${siswa.nama}</h3>
                    <p><strong>No. Pendaftaran:</strong> ${siswa.no_pendaftaran || '-'}</p>
                    <p><strong>NISN:</strong> ${siswa.nisn}</p>
                    <p><strong>Email:</strong> ${siswa.email}</p>
                    <p><strong>Telepon:</strong> ${siswa.telepon}</p>
                    <p><strong>Tanggal Daftar:</strong> ${new Date(siswa.tanggal_daftar).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                    <span class="status-badge status-${siswa.status || 'pending'}">${siswa.status || 'pending'}</span>
                </div>
            </div>
            <div class="btn-group">
                <button onclick="viewDetail(${siswa.id})" class="btn-primary">Lihat Detail</button>
                <button onclick="viewDokumen(${siswa.id})" class="btn-secondary">Dokumen</button>
                <button onclick="viewPembayaran(${siswa.id})" class="btn-secondary">Pembayaran</button>
            </div>
        </div>
    `).join('');
}

// Search and filter
document.getElementById('search-siswa').addEventListener('input', function() {
    filterSiswa();
});

document.getElementById('filter-status').addEventListener('change', function() {
    filterSiswa();
});

function filterSiswa() {
    const searchTerm = document.getElementById('search-siswa').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;
    
    let filtered = allSiswa;
    
    if (searchTerm) {
        filtered = filtered.filter(s => 
            s.nama.toLowerCase().includes(searchTerm) || 
            s.nisn.includes(searchTerm)
        );
    }
    
    if (statusFilter) {
        filtered = filtered.filter(s => s.status === statusFilter);
    }
    
    displaySiswa(filtered);
}

// View detail
async function viewDetail(siswaId) {
    try {
        const { data, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .eq('id', siswaId)
            .single();
        
        if (error) throw error;
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <table class="data-table">
                <tr><td><strong>No. Pendaftaran</strong></td><td>${data.no_pendaftaran || '-'}</td></tr>
                <tr><td><strong>Username</strong></td><td>${data.username || '-'}</td></tr>
                <tr><td><strong>Password</strong></td><td>${data.password || '-'}</td></tr>
                <tr><td><strong>Nama Lengkap</strong></td><td>${data.nama}</td></tr>
                <tr><td><strong>NISN</strong></td><td>${data.nisn}</td></tr>
                <tr><td><strong>Tempat, Tanggal Lahir</strong></td><td>${data.tempat_lahir}, ${data.tanggal_lahir}</td></tr>
                <tr><td><strong>Jenis Kelamin</strong></td><td>${data.jenis_kelamin}</td></tr>
                <tr><td><strong>Asal Sekolah</strong></td><td>${data.asal_sekolah}</td></tr>
                <tr><td><strong>Alamat</strong></td><td>${data.alamat}</td></tr>
                <tr><td><strong>Telepon</strong></td><td>${data.telepon}</td></tr>
                <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
                <tr><td><strong>Status</strong></td><td><span class="status-badge status-${data.status}">${data.status}</span></td></tr>
            </table>
            <div class="btn-group" style="margin-top: 20px;">
                <button onclick="updateStatus(${siswaId}, 'verified')" class="btn-primary">Verifikasi</button>
                <button onclick="updateStatus(${siswaId}, 'rejected')" class="btn-danger">Tolak</button>
            </div>
        `;
        
        document.getElementById('modal-detail').style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal memuat detail');
    }
}

// View dokumen
async function viewDokumen(siswaId) {
    try {
        const { data, error } = await window.supabaseClient
            .from('siswa_dokumen')
            .select('*')
            .eq('ppdb_id', siswaId)
            .order('uploaded_at', { ascending: false });
        
        if (error) throw error;
        
        const modalBody = document.getElementById('modal-body');
        
        if (data.length === 0) {
            modalBody.innerHTML = '<p>Belum ada dokumen yang diupload</p>';
        } else {
            modalBody.innerHTML = `
                <h3>Dokumen yang Diupload</h3>
                ${data.map(doc => `
                    <div class="dokumen-list">
                        <h4>${doc.jenis_dokumen.toUpperCase()}</h4>
                        <p><strong>File:</strong> ${doc.nama_file}</p>
                        <p><strong>Upload:</strong> ${new Date(doc.uploaded_at).toLocaleString('id-ID')}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${doc.status}">${doc.status}</span></p>
                        ${doc.catatan ? '<p><strong>Catatan:</strong> ' + doc.catatan + '</p>' : ''}
                        <div class="btn-group">
                            <a href="${doc.file_url}" target="_blank" class="btn-secondary">Lihat File</a>
                            <button onclick="verifyDokumen(${doc.id}, 'verified')" class="btn-primary">Verifikasi</button>
                            <button onclick="verifyDokumen(${doc.id}, 'rejected')" class="btn-danger">Tolak</button>
                        </div>
                    </div>
                `).join('')}
            `;
        }
        
        document.getElementById('modal-detail').style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal memuat dokumen');
    }
}

// View pembayaran
async function viewPembayaran(siswaId) {
    try {
        const { data, error } = await window.supabaseClient
            .from('siswa_pembayaran')
            .select('*')
            .eq('ppdb_id', siswaId)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const modalBody = document.getElementById('modal-body');
        
        if (data.length === 0) {
            modalBody.innerHTML = '<p>Belum ada data pembayaran</p>';
        } else {
            modalBody.innerHTML = `
                <h3>Data Pembayaran</h3>
                ${data.map(payment => `
                    <div class="pembayaran-list">
                        <h4>${payment.jenis_pembayaran}</h4>
                        <p><strong>Jumlah:</strong> Rp ${parseInt(payment.jumlah).toLocaleString('id-ID')}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${payment.status}">${payment.status}</span></p>
                        ${payment.tanggal_bayar ? '<p><strong>Tanggal Bayar:</strong> ' + new Date(payment.tanggal_bayar).toLocaleString('id-ID') + '</p>' : ''}
                        ${payment.bukti_url ? '<p><a href="' + payment.bukti_url + '" target="_blank">Lihat Bukti Transfer</a></p>' : '<p><em>Belum upload bukti</em></p>'}
                        ${payment.catatan ? '<p><strong>Catatan:</strong> ' + payment.catatan + '</p>' : ''}
                        ${payment.bukti_url ? `
                            <div class="btn-group">
                                <button onclick="verifyPembayaran(${payment.id}, 'verified')" class="btn-primary">Verifikasi</button>
                                <button onclick="verifyPembayaran(${payment.id}, 'rejected')" class="btn-danger">Tolak</button>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            `;
        }
        
        document.getElementById('modal-detail').style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal memuat pembayaran');
    }
}

// Update status siswa
async function updateStatus(siswaId, status) {
    if (!confirm(`Yakin ingin mengubah status menjadi ${status}?`)) return;
    
    try {
        const { error } = await window.supabaseClient
            .from('ppdb')
            .update({ status: status })
            .eq('id', siswaId);
        
        if (error) throw error;
        
        alert('Status berhasil diupdate');
        closeModal();
        loadSiswa();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal update status');
    }
}

// Verify dokumen
async function verifyDokumen(dokumenId, status) {
    const catatan = status === 'rejected' ? prompt('Masukkan catatan penolakan:') : null;
    
    try {
        const { error } = await window.supabaseClient
            .from('siswa_dokumen')
            .update({ 
                status: status,
                catatan: catatan
            })
            .eq('id', dokumenId);
        
        if (error) throw error;
        
        alert('Dokumen berhasil diverifikasi');
        closeModal();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal verifikasi dokumen');
    }
}

// Verify pembayaran
async function verifyPembayaran(pembayaranId, status) {
    const catatan = status === 'rejected' ? prompt('Masukkan catatan penolakan:') : null;
    
    try {
        const { error } = await window.supabaseClient
            .from('siswa_pembayaran')
            .update({ 
                status: status,
                catatan: catatan,
                tanggal_verifikasi: new Date().toISOString()
            })
            .eq('id', pembayaranId);
        
        if (error) throw error;
        
        alert('Pembayaran berhasil diverifikasi');
        closeModal();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal verifikasi pembayaran');
    }
}

function closeModal() {
    document.getElementById('modal-detail').style.display = 'none';
}

function logout() {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
    window.location.href = 'login.html';
}

// Load data on page load
loadSiswa();
