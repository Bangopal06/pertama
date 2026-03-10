// Check login
const siswaId = localStorage.getItem('siswa_id');
const siswaNama = localStorage.getItem('siswa_nama');

console.log('=== DEBUG SISWA DASHBOARD ===');
console.log('siswa_id:', siswaId);
console.log('siswa_nama:', siswaNama);

if (!siswaId) {
    console.error('siswa_id tidak ditemukan di localStorage!');
    alert('Sesi login tidak ditemukan. Silakan login kembali.');
    window.location.href = '../login.html';
}

document.getElementById('user-name').textContent = siswaNama;

let siswaData = null;

// Load data siswa
async function loadSiswaData() {
    console.log('=== LOADING SISWA DATA ===');
    console.log('Fetching data for siswa_id:', siswaId);
    
    try {
        const { data, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .eq('id', siswaId)
            .single();
        
        console.log('Query result:', { data, error });
        
        if (error) {
            console.error('Database error:', error);
            throw error;
        }
        
        if (!data) {
            console.error('No data found for siswa_id:', siswaId);
            alert('Data siswa tidak ditemukan!');
            return;
        }
        
        siswaData = data;
        console.log('siswaData loaded:', siswaData);
        displayProfilData();
        
    } catch (error) {
        console.error('Error loading siswa data:', error);
        alert('Gagal memuat data: ' + error.message);
    }
}

function displayProfilData() {
    console.log('=== DISPLAYING PROFIL DATA ===');
    
    if (!siswaData) {
        console.error('siswaData is null or undefined!');
        return;
    }
    
    console.log('Displaying data:', siswaData);
    
    document.getElementById('no-pendaftaran').textContent = siswaData.no_pendaftaran || '-';
    
    const statusBadge = document.getElementById('status-pendaftaran');
    statusBadge.textContent = siswaData.status || 'pending';
    statusBadge.className = 'status-badge status-' + (siswaData.status || 'pending');
    
    document.getElementById('data-nama').textContent = siswaData.nama || '-';
    document.getElementById('data-nisn').textContent = siswaData.nisn || '-';
    document.getElementById('data-ttl').textContent = `${siswaData.tempat_lahir || '-'}, ${siswaData.tanggal_lahir || '-'}`;
    document.getElementById('data-jk').textContent = siswaData.jenis_kelamin || '-';
    document.getElementById('data-sekolah').textContent = siswaData.asal_sekolah || '-';
    document.getElementById('data-alamat').textContent = siswaData.alamat || '-';
    document.getElementById('data-telepon').textContent = siswaData.telepon || '-';
    document.getElementById('data-email').textContent = siswaData.email || '-';
    
    console.log('✅ Data profil berhasil ditampilkan');
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
    if (confirm('Apakah Anda yakin ingin keluar dari portal siswa?')) {
        localStorage.removeItem('siswa_id');
        localStorage.removeItem('siswa_nama');
        localStorage.removeItem('siswa_username');
        window.location.href = '../login.html';
    }
}

// Load initial data
console.log('=== INITIALIZING DASHBOARD ===');
console.log('Starting to load siswa data...');

// Pastikan supabaseClient sudah ready
if (window.supabaseClient) {
    loadSiswaData();
} else {
    console.error('Supabase client not ready!');
    // Retry after 1 second
    setTimeout(() => {
        if (window.supabaseClient) {
            loadSiswaData();
        } else {
            alert('Koneksi database gagal. Silakan refresh halaman.');
        }
    }, 1000);
}


// Handle document upload buttons
let currentDocType = '';
const uploadedDocs = {}; // Track uploaded documents

// Load existing documents
async function loadExistingDocuments() {
    try {
        const { data, error } = await window.supabaseClient
            .from('siswa_dokumen')
            .select('*')
            .eq('siswa_id', siswaId);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            data.forEach(doc => {
                uploadedDocs[doc.jenis_dokumen] = doc.file_url;
                updateDocumentUI(doc.jenis_dokumen, doc.file_url);
            });
        }
    } catch (error) {
        console.error('Error loading documents:', error);
    }
}

function updateDocumentUI(docType, fileUrl) {
    const uploadBtn = document.querySelector(`.btn-upload-doc[data-doc="${docType}"]`);
    const downloadBtn = document.querySelector(`.btn-download-doc[data-doc="${docType}"]`);
    const statusCell = document.getElementById(`status-${docType}`);
    
    if (uploadBtn && downloadBtn && statusCell) {
        uploadBtn.style.display = 'none';
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.onclick = () => window.open(fileUrl, '_blank');
        statusCell.innerHTML = '<span class="status-icon">✓</span>';
    }
}

document.querySelectorAll('.btn-upload-doc').forEach(btn => {
    btn.addEventListener('click', function() {
        currentDocType = this.getAttribute('data-doc');
        
        // Warn if replacing existing file
        if (uploadedDocs[currentDocType]) {
            if (!confirm('Dokumen ini sudah ada. Upload file baru akan mengganti file lama. Lanjutkan?')) {
                return;
            }
        }
        
        document.getElementById('file-upload-hidden').click();
    });
});

document.getElementById('file-upload-hidden').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('❌ Ukuran file terlalu besar! Maksimal 2MB');
        this.value = '';
        return;
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        alert('❌ Format file tidak didukung! Gunakan PDF, JPG, atau PNG');
        this.value = '';
        return;
    }
    
    // Find the button that was clicked
    const uploadBtn = document.querySelector(`.btn-upload-doc[data-doc="${currentDocType}"]`);
    const downloadBtn = document.querySelector(`.btn-download-doc[data-doc="${currentDocType}"]`);
    const statusCell = document.getElementById(`status-${currentDocType}`);
    
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<span>⏳ Uploading...</span>';
    
    try {
        // Delete old file if exists
        if (uploadedDocs[currentDocType]) {
            const oldFileName = uploadedDocs[currentDocType].split('/').pop();
            await window.supabaseClient.storage
                .from('siswa-documents')
                .remove([`${siswaId}/${oldFileName}`]);
        }
        
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${siswaId}/${currentDocType}.${fileExt}`;
        
        const { data, error } = await window.supabaseClient.storage
            .from('siswa-documents')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true
            });
        
        if (error) throw error;
        
        // Get public URL
        const { data: urlData } = window.supabaseClient.storage
            .from('siswa-documents')
            .getPublicUrl(fileName);
        
        // Save to database
        const { error: dbError } = await window.supabaseClient
            .from('siswa_dokumen')
            .upsert({
                siswa_id: siswaId,
                jenis_dokumen: currentDocType,
                nama_file: file.name,
                file_url: urlData.publicUrl,
                ukuran_file: file.size,
                status: 'pending'
            }, {
                onConflict: 'siswa_id,jenis_dokumen'
            });
        
        if (dbError) throw dbError;
        
        // Update tracking
        uploadedDocs[currentDocType] = urlData.publicUrl;
        
        // Update UI
        updateDocumentUI(currentDocType, urlData.publicUrl);
        
        alert('✅ Dokumen berhasil diupload!');
        
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Gagal upload dokumen: ' + error.message);
        
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = `
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
            Unggah
        `;
    }
    
    // Reset file input
    this.value = '';
});

function finishUpload() {
    const uploadedCount = Object.keys(uploadedDocs).length;
    const totalDocs = document.querySelectorAll('.btn-upload-doc').length;
    
    if (uploadedCount === 0) {
        alert('⚠️ Anda belum mengupload dokumen apapun!');
        return;
    }
    
    if (uploadedCount < totalDocs) {
        const confirm = window.confirm(`Anda baru mengupload ${uploadedCount} dari ${totalDocs} dokumen wajib. Yakin ingin menutup?`);
        if (!confirm) return;
    }
    
    alert('✅ Data dokumen Anda telah tersimpan. Silakan tunggu verifikasi dari admin.');
}

// Load documents when page loads
loadExistingDocuments();
