if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
});

async function updateStats() {
    try {
        const { count: totalBerita } = await window.supabaseClient
            .from('berita')
            .select('*', { count: 'exact', head: true });
        
        const { count: totalPpdb } = await window.supabaseClient
            .from('ppdb')
            .select('*', { count: 'exact', head: true });
        
        const today = new Date().toISOString().split('T')[0];
        const { count: beritaHariIni } = await window.supabaseClient
            .from('berita')
            .select('*', { count: 'exact', head: true })
            .gte('tanggal', today);
        
        document.getElementById('total-berita').textContent = totalBerita || 0;
        document.getElementById('total-ppdb').textContent = totalPpdb || 0;
        document.getElementById('berita-hari-ini').textContent = beritaHariIni || 0;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

updateStats();
