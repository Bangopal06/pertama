// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    
    const formData = {
        nama: this.nama.value,
        email: this.email.value,
        telepon: this.telepon.value,
        subjek: this.subjek.value,
        pesan: this.pesan.value,
        status: 'belum_dibaca'
    };
    
    try {
        // Simpan ke Supabase
        const { data, error } = await window.supabaseClient
            .from('kontak')
            .insert([formData])
            .select();
        
        if (error) throw error;
        
        // Show success message
        alert('✅ Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.');
        
        // Reset form
        this.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Pesan';
    }
});
