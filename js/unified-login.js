document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memproses...';
    
    try {
        // Cek apakah login sebagai admin
        const { data: adminData, error: adminError } = await window.supabaseClient
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();
        
        if (adminData && !adminError) {
            // Login sebagai admin berhasil
            localStorage.setItem('admin_logged_in', 'true');
            localStorage.setItem('admin_username', adminData.username);
            localStorage.setItem('admin_name', adminData.nama_lengkap || 'Admin');
            
            // Redirect ke admin dashboard
            window.location.href = 'admin/dashboard.html';
            return;
        }
        
        // Jika bukan admin, cek apakah login sebagai siswa
        const { data: siswaData, error: siswaError } = await window.supabaseClient
            .from('ppdb')
            .select('*')
            .or(`username.eq.${username},no_pendaftaran.eq.${username},nisn.eq.${username}`)
            .eq('password', password)
            .single();
        
        if (siswaData && !siswaError) {
            // Login sebagai siswa berhasil
            localStorage.setItem('siswa_id', siswaData.id);
            localStorage.setItem('siswa_nama', siswaData.nama);
            localStorage.setItem('siswa_username', siswaData.username || siswaData.no_pendaftaran);
            
            // Redirect ke siswa dashboard
            window.location.href = 'siswa/dashboard.html';
            return;
        }
        
        // Jika tidak ada yang cocok
        alert('Username atau password salah!\n\nPastikan Anda memasukkan:\n- Admin: username admin\n- Siswa: NISN atau No. Pendaftaran');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Masuk';
    }
});
