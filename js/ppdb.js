document.getElementById('ppdb-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const ppdb = JSON.parse(localStorage.getItem('ppdb') || '[]');
    
    const newPendaftar = {
        id: Date.now(),
        nama: formData.get('nama'),
        nisn: formData.get('nisn'),
        tempat_lahir: formData.get('tempat_lahir'),
        tanggal_lahir: formData.get('tanggal_lahir'),
        jenis_kelamin: formData.get('jenis_kelamin'),
        asal_sekolah: formData.get('asal_sekolah'),
        alamat: formData.get('alamat'),
        telepon: formData.get('telepon'),
        email: formData.get('email'),
        tanggal_daftar: new Date().toISOString()
    };
    
    ppdb.push(newPendaftar);
    localStorage.setItem('ppdb', JSON.stringify(ppdb));
    
    alert('Pendaftaran berhasil! Silakan tunggu informasi selanjutnya melalui email.');
    e.target.reset();
});
