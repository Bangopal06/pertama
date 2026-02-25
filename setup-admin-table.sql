-- ============================================
-- SETUP TABLE ADMIN - VERSI SEDERHANA
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Hapus table lama jika ada (hati-hati, ini akan menghapus semua data!)
DROP TABLE IF EXISTS admin_users CASCADE;

-- 2. Buat table admin_users
CREATE TABLE admin_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(20) DEFAULT 'admin',
    aktif BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insert admin default
INSERT INTO admin_users (username, password, nama_lengkap, email, role) 
VALUES 
    ('admin', 'admin123', 'Administrator', 'admin@sekolah.com', 'super_admin'),
    ('admin2', 'admin456', 'Admin Kedua', 'admin2@sekolah.com', 'admin');

-- 4. Enable Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Buat policy untuk admin_users (hanya bisa dibaca, tidak bisa diubah dari client)
DROP POLICY IF EXISTS "Allow read access to admin_users" ON admin_users;
CREATE POLICY "Allow read access to admin_users" 
ON admin_users FOR SELECT 
USING (true);

-- 6. Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_aktif ON admin_users(aktif);

-- ============================================
-- SELESAI!
-- ============================================
-- Sekarang Anda bisa login dengan:
-- Username: admin, Password: admin123
-- atau
-- Username: admin2, Password: admin456
-- ============================================
