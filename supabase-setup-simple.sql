-- Hapus tabel lama jika ada (opsional)
DROP TABLE IF EXISTS berita CASCADE;
DROP TABLE IF EXISTS ppdb CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Tabel untuk berita
CREATE TABLE berita (
  id BIGSERIAL PRIMARY KEY,
  judul TEXT NOT NULL,
  konten TEXT NOT NULL,
  kategori TEXT NOT NULL,
  tanggal TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel untuk pendaftar PPDB
CREATE TABLE ppdb (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  nisn TEXT NOT NULL,
  tempat_lahir TEXT NOT NULL,
  tanggal_lahir DATE NOT NULL,
  jenis_kelamin TEXT NOT NULL,
  asal_sekolah TEXT NOT NULL,
  alamat TEXT NOT NULL,
  telepon TEXT NOT NULL,
  email TEXT NOT NULL,
  tanggal_daftar TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel untuk admin users
CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert admin default
INSERT INTO admin_users (username, password) 
VALUES ('admin', 'admin123');

-- DISABLE Row Level Security untuk testing
ALTER TABLE berita DISABLE ROW LEVEL SECURITY;
ALTER TABLE ppdb DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Atau jika ingin tetap enable RLS, gunakan policy yang sangat permisif:
-- ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ppdb ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- DROP POLICY IF EXISTS "Allow all operations" ON berita;
-- CREATE POLICY "Allow all operations" ON berita FOR ALL USING (true) WITH CHECK (true);

-- DROP POLICY IF EXISTS "Allow all operations" ON ppdb;
-- CREATE POLICY "Allow all operations" ON ppdb FOR ALL USING (true) WITH CHECK (true);

-- DROP POLICY IF EXISTS "Allow all operations" ON admin_users;
-- CREATE POLICY "Allow all operations" ON admin_users FOR ALL USING (true) WITH CHECK (true);
