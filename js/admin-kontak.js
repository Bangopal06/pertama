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

let currentFilter = '';

// Filter by status
document.getElementById('filter-status').addEventListener('change', function() {
    currentFilter = this.value;
    loadKontak();
});

async function loadKontak() {
    const tbody = document.getElementById('kontak-list');
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading...</td></tr>';
    
    try {
        let query = window.supabaseClient
            .from('kontak')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (currentFilter) {
            query = query.eq('status', currentFilter);
        }
        
        const { data: kontak, error } = await query;
        
        if (error) throw error;
        
        if (!kontak || kontak.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Belum ada pesan kontak</td></tr>';
            return;
        }
        
        tbody.innerHTML = kontak.map(k => {
            const tanggal = new Date(k.created_at).toLocaleString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <tr>
                    <td>${tanggal}</td>
                    <td>${k.nama}</td>
                    <td>${k.email}</td>
                    <td>${k.telepon}</td>
                    <td>${k.subjek}</td>
                    <td>
                        <span class="status-badge status-${k.status}">
                            ${k.status === 'belum_dibaca' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                        </span>
                    </td>
                    <td>
                        <button class="btn-edit" onclick="viewDetail(${k.id})">Lihat</button>
                        <button class="btn-delete" onclick="deleteKontak(${k.id})">Hapus</button>
                    </td>
                </tr>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error:', error);
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: red;">Error loading data</td></tr>';
    }
}

async function viewDetail(id) {
    try {
        const { data: kontak, error } = await window.supabaseClient
            .from('kontak')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        
        const tanggal = new Date(kontak.created_at).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        document.getElementById('modal-body').innerHTML = `
            <h2 style="margin-bottom: 20px; color: #333;">Detail Pesan Kontak</h2>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Tanggal:</strong><br>
                <span>${tanggal}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Nama:</strong><br>
                <span>${kontak.nama}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Email:</strong><br>
                <a href="mailto:${kontak.email}" style="color: #3498db;">${kontak.email}</a>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Telepon:</strong><br>
                <a href="tel:${kontak.telepon}" style="color: #3498db;">${kontak.telepon}</a>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Subjek:</strong><br>
                <span>${kontak.subjek}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
                <strong style="color: #666;">Pesan:</strong>
                <div class="message-detail">${kontak.pesan}</div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <strong style="color: #666;">Status:</strong><br>
                <span class="status-badge status-${kontak.status}">
                    ${kontak.status === 'belum_dibaca' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                </span>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center;">
                ${kontak.status === 'belum_dibaca' ? 
                    `<button class="btn-primary" onclick="markAsRead(${id})">Tandai Sudah Dibaca</button>` : 
                    `<button class="btn-secondary" onclick="markAsUnread(${id})">Tandai Belum Dibaca</button>`
                }
                <button class="btn-secondary" onclick="closeModal()">Tutup</button>
            </div>
        `;
        
        document.getElementById('modal-detail').style.display = 'block';
        
        // Auto mark as read jika belum dibaca
        if (kontak.status === 'belum_dibaca') {
            setTimeout(() => markAsRead(id, true), 1000);
        }
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error loading detail', 'error');
    }
}

async function markAsRead(id, silent = false) {
    try {
        const { error } = await window.supabaseClient
            .from('kontak')
            .update({ status: 'sudah_dibaca' })
            .eq('id', id);
        
        if (error) throw error;
        
        if (!silent) {
            showNotification('Status diupdate menjadi Sudah Dibaca', 'success');
        }
        
        closeModal();
        loadKontak();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error updating status', 'error');
    }
}

async function markAsUnread(id) {
    try {
        const { error } = await window.supabaseClient
            .from('kontak')
            .update({ status: 'belum_dibaca' })
            .eq('id', id);
        
        if (error) throw error;
        
        showNotification('Status diupdate menjadi Belum Dibaca', 'success');
        closeModal();
        loadKontak();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error updating status', 'error');
    }
}

async function deleteKontak(id) {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return;
    
    try {
        const { error } = await window.supabaseClient
            .from('kontak')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        
        showNotification('Pesan berhasil dihapus!', 'success');
        loadKontak();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error deleting message', 'error');
    }
}

function closeModal() {
    document.getElementById('modal-detail').style.display = 'none';
}

// Load data saat halaman dibuka
loadKontak();
