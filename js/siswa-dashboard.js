// Check login
const siswaId = localStorage.getItem('siswa_id');
const siswaNama = localStorage.getItem('siswa_nama');

if (!siswaId) {
    window.location.href = 'login.html';
}

document.getElementById('user-name').textContent = siswaNama;

let siswaData = null;

// Load data siswa
async function loadSiswaData() {
    try {
        const { data, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .eq('id', siswaId)
            .single();
        
        if (error) throw error;
        
        siswaData = data;
        displayProfilData();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal memuat data');
    }
}

function displayProfilData() {
    if (!siswaData) return;
    
    document.getElementById('no-pendaftaran').textContent = siswaData.no_pendaftaran || '-';
    
    const statusBadge = document.getElementById('status-pendaftaran');
    statusBadge.textContent = siswaData.status || 'pending';
    statusBadge.className = 'status-badge status-' + (siswaData.status || 'pending');
    
    document.getElementById('data-nama').textContent = siswaData.nama;
    document.getElementById('data-nisn').textContent = siswaData.nisn;
    document.getElementById('data-ttl').textContent = `${siswaData.tempat_lahir}, ${siswaData.tanggal_lahir}`;
    document.getElementById('data-jk').textContent = siswaData.jenis_kelamin;
    document.getElementById('data-sekolah').textContent = siswaData.asal_sekolah;
    document.getElementById('data-alamat').textContent = siswaData.alamat;
    document.getElementById('data-telepon').textContent = siswaData.telepon;
    document.getElementById('data-email').textContent = siswaData.email;
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.getAttribute('onclick')) return;
        
        e.preventDefault();
        const page = this.getAttribute('data-page');
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        document.getElementById(page + '-section').style.display = 'block';
        
        const titles = {
            'profil': 'Data Profil Saya',
            'dokumen': 'Upload Dokumen',
            'pembayaran': 'Pembayaran'
        };
        document.getElementById('page-title').textContent = titles[page];
        
        if (page === 'dokumen') loadDokumen();
        if (page === 'pembayaran') loadPembayaran();
    });
});

// Upload Dokumen
const dokumenTypes = ['kk', 'akta', 'ijazah', 'foto'];

dokumenTypes.forEach(type => {
    const fileInput = document.getElementById('file-' + type);
    fileInput.addEventListener('change', function() {
        uploadDokumen(type, this.files[0]);
    });
});

async function uploadDokumen(jenisDokumen, file) {
    if (!file) return;
    
    // Validasi ukuran (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file maksimal 2MB');
        return;
    }
    
    try {
        // Upload ke Supabase Storage
        const fileName = `${siswaId}_${jenisDokumen}_${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await window.supabaseClient.storage
            .from('dokumen-siswa')
            .upload(fileName, file);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = window.supabaseClient.storage
            .from('dokumen-siswa')
            .getPublicUrl(fileName);
        
        // Simpan ke database
        const { error: dbError } = await window.supabaseClient
            .from('siswa_dokumen')
            .insert([{
                ppdb_id: siswaId,
                jenis_dokumen: jenisDokumen,
                nama_file: file.name,
                file_url: urlData.publicUrl,
                ukuran_file: file.size
            }]);
        
        if (dbError) throw dbError;
        
        alert('Dokumen berhasil diupload!');
        loadDokumen();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal upload dokumen: ' + error.message);
    }
}

async function loadDokumen() {
    try {
        const { data, error } = await window.supabaseClient
            .from('siswa_dokumen')
            .select('*')
            .eq('ppdb_id', siswaId)
            .order('uploaded_at', { ascending: false });
        
        if (error) throw error;
        
        // Group by jenis_dokumen
        const grouped = {};
        data.forEach(doc => {
            if (!grouped[doc.jenis_dokumen]) grouped[doc.jenis_dokumen] = [];
            grouped[doc.jenis_dokumen].push(doc);
        });
        
        // Display
        dokumenTypes.forEach(type => {
            const listDiv = document.getElementById('file-' + type + '-list');
            listDiv.innerHTML = '';
            
            if (grouped[type]) {
                grouped[type].forEach(doc => {
                    const statusClass = doc.status === 'verified' ? 'status-verified' : 
                                      doc.status === 'rejected' ? 'status-rejected' : 'status-pending';
                    listDiv.innerHTML += `
                        <div class="file-item">
                            <div>
                                <strong>${doc.nama_file}</strong><br>
                                <small>Upload: ${new Date(doc.uploaded_at).toLocaleString('id-ID')}</small><br>
                                <span class="status-badge ${statusClass}">${doc.status}</span>
                                ${doc.catatan ? '<br><small>Catatan: ' + doc.catatan + '</small>' : ''}
                            </div>
                            <a href="${doc.file_url}" target="_blank" class="btn-secondary">Lihat</a>
                        </div>
                    `;
                });
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Pembayaran
async function loadPembayaran() {
    try {
        const { data, error } = await window.supabaseClient
            .from('siswa_pembayaran')
            .select('*')
            .eq('ppdb_id', siswaId)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const listDiv = document.getElementById('pembayaran-list');
        
        if (data.length === 0) {
            listDiv.innerHTML = '<p>Belum ada data pembayaran</p>';
            return;
        }
        
        listDiv.innerHTML = '';
        data.forEach(payment => {
            const statusClass = payment.status === 'verified' ? 'status-verified' : 
                              payment.status === 'rejected' ? 'status-rejected' : 'status-pending';
            
            listDiv.innerHTML += `
                <div class="payment-item">
                    <h4>${payment.jenis_pembayaran}</h4>
                    <p><strong>Jumlah:</strong> Rp ${parseInt(payment.jumlah).toLocaleString('id-ID')}</p>
                    <p><strong>Status:</strong> <span class="status-badge ${statusClass}">${payment.status}</span></p>
                    ${payment.bukti_url ? '<p><a href="' + payment.bukti_url + '" target="_blank">Lihat Bukti</a></p>' : ''}
                    ${payment.catatan ? '<p><strong>Catatan:</strong> ' + payment.catatan + '</p>' : ''}
                </div>
            `;
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('btn-upload-bukti').addEventListener('click', async function() {
    const jenisPembayaran = document.getElementById('jenis-pembayaran').value;
    const fileInput = document.getElementById('file-bukti-bayar');
    const file = fileInput.files[0];
    
    if (!jenisPembayaran) {
        alert('Pilih jenis pembayaran');
        return;
    }
    
    if (!file) {
        alert('Pilih file bukti pembayaran');
        return;
    }
    
    this.disabled = true;
    this.textContent = 'Uploading...';
    
    try {
        // Upload file
        const fileName = `${siswaId}_bukti_${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await window.supabaseClient.storage
            .from('bukti-pembayaran')
            .upload(fileName, file);
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = window.supabaseClient.storage
            .from('bukti-pembayaran')
            .getPublicUrl(fileName);
        
        // Update atau insert pembayaran
        const { error: dbError } = await window.supabaseClient
            .from('siswa_pembayaran')
            .upsert([{
                ppdb_id: siswaId,
                jenis_pembayaran: jenisPembayaran,
                jumlah: 500000,
                status: 'pending',
                bukti_url: urlData.publicUrl,
                tanggal_bayar: new Date().toISOString()
            }]);
        
        if (dbError) throw dbError;
        
        alert('Bukti pembayaran berhasil diupload!');
        fileInput.value = '';
        document.getElementById('jenis-pembayaran').value = '';
        loadPembayaran();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal upload: ' + error.message);
    } finally {
        this.disabled = false;
        this.textContent = 'Upload Bukti Pembayaran';
    }
});

function logout() {
    localStorage.removeItem('siswa_id');
    localStorage.removeItem('siswa_nama');
    localStorage.removeItem('siswa_username');
    window.location.href = 'login.html';
}

// Load initial data
loadSiswaData();
