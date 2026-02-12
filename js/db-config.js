// Konfigurasi Supabase - File baru untuk menghindari cache
(function() {
    const SUPABASE_URL = 'https://dyawxkqcrzawgfglzbcm.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5YXd4a3Fjcnphd2dmZ2x6YmNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NjM2MjgsImV4cCI6MjA4NjMzOTYyOH0.agf23zlfti9UUsTNiK_aQmjnGUiiFOh_3CrUOIbFMaM';
    
    // Inisialisasi Supabase client dan simpan di window
    if (!window.supabaseClient) {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase client initialized successfully');
    }
})();
