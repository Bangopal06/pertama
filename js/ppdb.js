document.getElementById('ppdb-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    
    try {
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
                email: formData.get('email')
            }]);
        
        if (error) throw error;
        
        alert('Pendaftaran berhasil! Silakan tunggu informasi selanjutnya melalui email.');
        e.target.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Daftar Sekarang';
    }
});
