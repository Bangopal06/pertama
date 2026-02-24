document.getElementById('siswa-login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memproses...';
    
    try {
        // Cari siswa berdasarkan username dan password
        const { data, error } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .or(`username.eq.${username},no_pendaftaran.eq.${username}`)
            .eq('password', password)
            .single();
        
        if (error || !data) {
            alert('Username atau password salah!');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Masuk';
            return;
        }
        
        // Simpan session
        localStorage.setItem('siswa_id', data.id);
        localStorage.setItem('siswa_nama', data.nama);
        localStorage.setItem('siswa_username', data.username || data.no_pendaftaran);
        
        // Redirect ke dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Masuk';
    }
});
