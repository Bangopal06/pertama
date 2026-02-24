# 🚀 Panduan Setup Supabase untuk Portal Siswa

## Langkah 1: Buka Supabase Dashboard

1. Buka browser dan pergi ke: https://supabase.com
2. Login ke akun Supabase Anda
3. Pilih project yang sudah Anda buat

---

## Langkah 2: Setup Database (SQL)

### A. Buka SQL Editor

1. Di sidebar kiri, klik **"SQL Editor"**
2. Klik tombol **"New query"**

### B. Copy & Paste SQL

1. Buka file: `SETUP-LENGKAP-SUPABASE.sql`
2. Copy SEMUA isi file tersebut
3. Paste ke SQL Editor di Supabase
4. Klik tombol **"RUN"** (atau tekan Ctrl+Enter)

### C. Verifikasi Berhasil

Jika berhasil, Anda akan melihat pesan:
```
Success. No rows returned
```

---

## Langkah 3: Cek Tabel Sudah Dibuat

1. Di sidebar kiri, klik **"Table Editor"**
2. Anda harus melihat tabel-tabel berikut:
   - ✅ `ppdb` (sudah ada, tapi ada kolom baru)
   - ✅ `siswa_dokumen` (baru)
   - ✅ `siswa_pembayaran` (baru)

### Cek Kolom Baru di Tabel PPDB

Klik tabel `ppdb`, pastikan ada kolom:
- `username` (text)
- `password` (text)
- `status` (text)
- `no_pendaftaran` (text)

---

## Langkah 4: Cek Storage Buckets

1. Di sidebar kiri, klik **"Storage"**
2. Anda harus melihat 2 bucket baru:
   - ✅ `dokumen-siswa`
   - ✅ `bukti-pembayaran`

### Jika Bucket Tidak Muncul (Manual)

Jika bucket tidak otomatis dibuat, buat manual:

1. Klik tombol **"New bucket"**
2. Buat bucket pertama:
   - Name: `dokumen-siswa`
   - Public bucket: **✅ CENTANG**
   - Klik "Create bucket"
3. Buat bucket kedua:
   - Name: `bukti-pembayaran`
   - Public bucket: **✅ CENTANG**
   - Klik "Create bucket"

---

## Langkah 5: Cek Storage Policies

### A. Cek Policy Dokumen-Siswa

1. Klik bucket **"dokumen-siswa"**
2. Klik tab **"Policies"**
3. Anda harus melihat 3 policies:
   - ✅ Allow public upload dokumen-siswa
   - ✅ Allow public read dokumen-siswa
   - ✅ Allow public delete dokumen-siswa

### B. Cek Policy Bukti-Pembayaran

1. Klik bucket **"bukti-pembayaran"**
2. Klik tab **"Policies"**
3. Anda harus melihat 3 policies:
   - ✅ Allow public upload bukti-pembayaran
   - ✅ Allow public read bukti-pembayaran
   - ✅ Allow public delete bukti-pembayaran

### Jika Policy Tidak Muncul (Manual)

Jika policy tidak otomatis dibuat, jalankan SQL ini:

```sql
-- Policy untuk dokumen-siswa
CREATE POLICY "Allow public upload dokumen-siswa"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'dokumen-siswa');

CREATE POLICY "Allow public read dokumen-siswa"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dokumen-siswa');

-- Policy untuk bukti-pembayaran
CREATE POLICY "Allow public upload bukti-pembayaran"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'bukti-pembayaran');

CREATE POLICY "Allow public read bukti-pembayaran"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bukti-pembayaran');
```

---

## Langkah 6: Test Koneksi

### A. Test Pendaftaran Siswa

1. Buka file `ppdb.html` di browser
2. Isi form pendaftaran dengan data test
3. Klik "Daftar Sekarang"
4. Jika berhasil, akan muncul popup dengan:
   - No. Pendaftaran
   - Username (NISN)
   - Password

**SIMPAN username dan password ini!**

### B. Cek Data di Database

1. Kembali ke Supabase Dashboard
2. Klik **"Table Editor"** → pilih tabel `ppdb`
3. Anda harus melihat data siswa yang baru didaftarkan
4. Cek kolom `username`, `password`, `no_pendaftaran` sudah terisi

### C. Test Login Siswa

1. Buka `siswa/login.html` di browser
2. Masukkan username dan password yang tadi
3. Klik "Masuk"
4. Jika berhasil, akan redirect ke dashboard siswa

### D. Test Upload Dokumen

1. Di dashboard siswa, klik menu **"Upload Dokumen"**
2. Upload file test (gambar atau PDF, max 2MB)
3. Jika berhasil, file akan muncul di list

### E. Cek File di Storage

1. Kembali ke Supabase Dashboard
2. Klik **"Storage"** → pilih bucket `dokumen-siswa`
3. Anda harus melihat file yang baru diupload

---

## ✅ Checklist Setup

Pastikan semua ini sudah ✅:

### Database
- [ ] Tabel `ppdb` punya kolom: username, password, status, no_pendaftaran
- [ ] Tabel `siswa_dokumen` sudah dibuat
- [ ] Tabel `siswa_pembayaran` sudah dibuat

### Storage
- [ ] Bucket `dokumen-siswa` sudah dibuat dan PUBLIC
- [ ] Bucket `bukti-pembayaran` sudah dibuat dan PUBLIC
- [ ] Policy upload untuk `dokumen-siswa` aktif
- [ ] Policy read untuk `dokumen-siswa` aktif
- [ ] Policy upload untuk `bukti-pembayaran` aktif
- [ ] Policy read untuk `bukti-pembayaran` aktif

### Testing
- [ ] Bisa daftar siswa baru di ppdb.html
- [ ] Dapat username & password setelah daftar
- [ ] Bisa login di siswa/login.html
- [ ] Bisa upload dokumen
- [ ] File muncul di Supabase Storage
- [ ] Bisa upload bukti pembayaran

---

## 🐛 Troubleshooting

### Error: "relation siswa_dokumen does not exist"
**Solusi:** Jalankan ulang SQL di `SETUP-LENGKAP-SUPABASE.sql`

### Error: "new row violates row-level security policy"
**Solusi:** Pastikan RLS disabled dengan SQL:
```sql
ALTER TABLE siswa_dokumen DISABLE ROW LEVEL SECURITY;
ALTER TABLE siswa_pembayaran DISABLE ROW LEVEL SECURITY;
```

### Error: "bucket not found"
**Solusi:** Buat bucket manual di Storage → New bucket

### Error: "permission denied for storage"
**Solusi:** Cek policy storage, pastikan ada policy untuk INSERT dan SELECT

### Upload file gagal
**Solusi:** 
1. Cek ukuran file (max 2MB)
2. Cek format file (PDF, JPG, PNG)
3. Cek bucket sudah PUBLIC
4. Cek policy storage sudah benar

### Login gagal
**Solusi:**
1. Cek username dan password benar
2. Cek di tabel ppdb apakah kolom username dan password terisi
3. Buka Console browser (F12) untuk lihat error

---

## 📞 Bantuan Lebih Lanjut

Jika masih ada masalah:

1. **Cek Console Browser** (F12 → Console tab)
2. **Cek Network Tab** (F12 → Network tab) untuk lihat error API
3. **Cek Supabase Logs** (Dashboard → Logs)

---

## 🎉 Setup Selesai!

Jika semua checklist sudah ✅, sistem portal siswa Anda sudah siap digunakan!

**Langkah selanjutnya:**
1. Test semua fitur (daftar, login, upload)
2. Buat akun siswa test untuk demo
3. Test verifikasi dari admin panel
4. Sesuaikan biaya pembayaran jika perlu
5. Deploy ke hosting (Netlify, Vercel, dll)

Selamat! 🚀
