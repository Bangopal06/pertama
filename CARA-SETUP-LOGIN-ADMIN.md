# Cara Setup Login Admin dengan Supabase

## Langkah 1: Setup Database Admin

1. **Login ke Supabase Dashboard**
   - Buka https://supabase.com/dashboard
   - Pilih project Anda

2. **Buka SQL Editor**
   - Klik menu "SQL Editor" di sidebar kiri
   - Klik "New query"

3. **Jalankan SQL Setup**
   - Buka file `setup-admin-table.sql`
   - Copy semua isi file
   - Paste ke SQL Editor
   - Klik tombol "Run" atau tekan `Ctrl+Enter`

4. **Verifikasi Table Berhasil Dibuat**
   - Klik menu "Table Editor" di sidebar
   - Cari table `admin_users`
   - Seharusnya ada 2 admin default:
     - Username: `admin`, Password: `admin123`
     - Username: `admin2`, Password: `admin456`

## Langkah 2: Test Login

1. **Buka halaman login**
   - Buka `login.html` di browser

2. **Login sebagai admin**
   - Username: `admin`
   - Password: `admin123`
   - Klik "Masuk"

3. **Seharusnya redirect ke admin dashboard**

## Cara Menambah Admin Baru

### Opsi 1: Via Supabase Dashboard (Mudah)

1. Buka Supabase Dashboard
2. Klik "Table Editor"
3. Pilih table `admin_users`
4. Klik "Insert" → "Insert row"
5. Isi data:
   - username: (username baru)
   - password: (password baru)
   - nama_lengkap: (nama lengkap admin)
   - email: (email admin)
   - role: admin atau super_admin
   - aktif: true
6. Klik "Save"

### Opsi 2: Via SQL Editor

```sql
INSERT INTO admin_users (username, password, nama_lengkap, email, role) 
VALUES ('username_baru', 'password_baru', 'Nama Admin', 'email@sekolah.com', 'admin');
```

## Cara Mengubah Password Admin

### Via Supabase Dashboard:

1. Buka Table Editor
2. Pilih table `admin_users`
3. Cari admin yang ingin diubah
4. Klik pada cell password
5. Ubah password
6. Klik "Save"

### Via SQL Editor:

```sql
UPDATE admin_users 
SET password = 'password_baru' 
WHERE username = 'admin';
```

## Cara Menonaktifkan Admin

```sql
UPDATE admin_users 
SET aktif = false 
WHERE username = 'admin2';
```

## Cara Menghapus Admin

```sql
DELETE FROM admin_users 
WHERE username = 'admin2';
```

## Keamanan

### ⚠️ PENTING untuk Production:

Sistem ini menggunakan plain text password untuk kemudahan development. Untuk production, sebaiknya:

1. **Gunakan password hashing** (bcrypt, argon2)
2. **Implementasi rate limiting** untuk mencegah brute force
3. **Gunakan HTTPS** untuk enkripsi data
4. **Implementasi 2FA** (Two-Factor Authentication)
5. **Log semua aktivitas login**

### Tips Keamanan:

1. **Gunakan password yang kuat**
   - Minimal 12 karakter
   - Kombinasi huruf besar, kecil, angka, simbol
   - Contoh: `Admin@2024!Secure`

2. **Jangan share credentials**
   - Setiap admin punya akun sendiri
   - Jangan pakai akun bersama

3. **Ganti password secara berkala**
   - Minimal 3 bulan sekali
   - Setelah admin keluar/resign

4. **Monitor aktivitas login**
   - Cek siapa yang login
   - Kapan terakhir login
   - Dari mana login

## Troubleshooting

### Error: "relation admin_users does not exist"
**Solusi:** Jalankan file `setup-admin-table.sql` di Supabase SQL Editor

### Error: "Username atau password salah"
**Solusi:** 
- Cek di Table Editor apakah admin ada
- Pastikan kolom `aktif` = true
- Pastikan username dan password benar (case sensitive)

### Login berhasil tapi redirect ke login lagi
**Solusi:**
- Clear browser cache
- Clear localStorage (F12 → Application → Local Storage → Clear)
- Coba login lagi

### Tidak bisa akses halaman admin
**Solusi:**
- Pastikan sudah login
- Cek localStorage ada key `isLoggedIn` = true
- Refresh halaman

## Role Admin

Ada 2 role admin:

1. **super_admin**
   - Akses penuh ke semua fitur
   - Bisa manage admin lain
   - Bisa ubah setting sistem

2. **admin**
   - Akses ke fitur admin biasa
   - Tidak bisa manage admin lain
   - Tidak bisa ubah setting sistem

(Note: Saat ini belum ada pembatasan role, semua admin punya akses sama. Bisa dikembangkan nanti jika diperlukan)

## Login Siswa

Login siswa tetap menggunakan table `ppdb`:
- Username: NISN atau No. Pendaftaran
- Password: Auto-generate saat daftar PPDB

Tidak perlu setup tambahan untuk login siswa.
