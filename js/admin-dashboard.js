if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
});

function updateStats() {
    const berita = JSON.parse(localStorage.getItem('berita') || '[]');
    const ppdb = JSON.parse(localStorage.getItem('ppdb') || '[]');
    
    document.getElementById('total-berita').textContent = berita.length;
    document.getElementById('total-ppdb').textContent = ppdb.length;
    
    const today = new Date().toDateString();
    const beritaHariIni = berita.filter(b => new Date(b.tanggal).toDateString() === today);
    document.getElementById('berita-hari-ini').textContent = beritaHariIni.length;
}

updateStats();
