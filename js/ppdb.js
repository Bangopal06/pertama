document.getElementById('ppdb-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    
    try {
        // Generate username dan password
        const noPendaftaran = 'PPDB' + Date.now().toString().slice(-8);
        const username = formData.get('nisn');
        const password = Math.random().toString(36).slice(-8);
        
        const { data, error } = await window.supabaseClient
            .from('ppdb')
            .insert([{
                nama: formData.get('nama'),
                nisn: formData.get('nisn'),
                tempat_lahir: formData.get('tempat_lahir'),
                tanggal_lahir: formData.get('tanggal_lahir'),
                jenis_kelamin: formData.get('jenis_kelamin'),
                asal_sekolah: formData.get('asal_sekolah'),
                alamat: formData.get('alamat'),
                telepon: formData.get('telepon'),
                email: formData.get('email'),
                no_pendaftaran: noPendaftaran,
                username: username,
                password: password,
                status: 'pending'
            }])
            .select();
        
        if (error) throw error;
        
        console.log('PPDB berhasil, data:', data[0]);
        
        // Buat data pembayaran default
        await window.supabaseClient
            .from('siswa_pembayaran')
            .insert([{
                ppdb_id: data[0].id,
                jenis_pembayaran: 'Biaya Pendaftaran',
                jumlah: 500000,
                status: 'belum_bayar'
            }]);
        
        // Tampilkan info login
        alert(`Pendaftaran berhasil!\n\nNo. Pendaftaran: ${noPendaftaran}\nUsername (NISN): ${username}\nPassword: ${password}\n\nSimpan informasi ini untuk login ke portal siswa.`);
        
        // Auto login dan redirect ke portal siswa
        localStorage.setItem('siswa_id', data[0].id);
        localStorage.setItem('siswa_nama', data[0].nama);
        localStorage.setItem('siswa_username', username);
        
        // Redirect ke portal siswa
        setTimeout(() => {
            window.location.href = 'siswa/dashboard.html';
        }, 1000);
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Daftar Sekarang';
    }
});
