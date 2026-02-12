document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Login...';
    
    try {
        const { data, error } = await window.supabaseClient
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();
        
        if (error || !data) {
            alert('Username atau password salah!');
            return;
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(data));
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Username atau password salah!');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});
