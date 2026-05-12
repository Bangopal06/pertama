if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = '../login.html';
}

const adminNameEl = document.getElementById('admin-name');
if (adminNameEl) {
    adminNameEl.textContent = 'Halo, ' + (localStorage.getItem('adminName') || 'Admin');
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Apakah Anda yakin ingin keluar dari halaman admin?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminUser');
        window.location.href = '../login.html';
    }
});

async function updateStats() {
    try {
        const queries = [
            window.supabaseClient.from('berita').select('*', { count: 'exact', head: true }),
            window.supabaseClient.from('ppdb').select('*', { count: 'exact', head: true }),
            window.supabaseClient.from('kontak').select('*', { count: 'exact', head: true }),
            window.supabaseClient.from('program').select('*', { count: 'exact', head: true }),
            window.supabaseClient.from('ekskul').select('*', { count: 'exact', head: true }),
            window.supabaseClient.from('fasilitas').select('*', { count: 'exact', head: true }),
        ];

        const results = await Promise.all(queries);

        const ids = ['total-berita', 'total-ppdb', 'total-kontak', 'total-program', 'total-ekskul', 'total-fasilitas'];
        results.forEach((res, i) => {
            const el = document.getElementById(ids[i]);
            if (el) el.textContent = res.count || 0;
        });

    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

updateStats();
