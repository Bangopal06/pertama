# Panduan Portal Siswa - Sistem PPDB

## 📋 Fitur Portal Siswa

Portal siswa memungkinkan calon siswa yang sudah mendaftar untuk:
1. Melihat data profil pendaftaran
2. Upload dokumen persyaratan (KK, Akta, Ijazah, Foto)
3. Upload bukti pembayaran pendaftaran
4. Melihat status verifikasi dokumen dan pembayaran

---

## 🚀 Setup Awal

### 1. Setup Database

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- File: setup-siswa-system.sql
```

Ini akan membuat:
- Kolom tambahan di tabel `ppdb` (username, password, status, no_pendaftaran)
- Tabel `siswa_dokumen` untuk menyimpan data dokumen
- Tabel `siswa_pembayaran` untuk menyimpan data pembayaran

### 2. Setup Storage

Di Supabase Dashboard → Storage:

1. Buat 2 bucket baru:
   - `dokumen-siswa`
   - `bukti-pembayaran`

2. Set kedua bucket menjadi PUBLIC atau tambahkan policy:

```sql
-- Allow upload
CREATE POLICY "Allow public upload" ON storage.objects 
FOR INSERT TO public 
WITH CHECK (bucket_id = 'dokumen-siswa');

CREATE POLICY "Allow public upload" ON storage.objects 
FOR INSERT TO public 
WITH CHECK (bucket_id = 'bukti-pembayaran');

-- Allow read
CREATE POLICY "Allow public read" ON storage.objects 
FOR SELECT TO public 
USING (bucket_id = 'dokumen-siswa');

CREATE POLICY "Allow public read" ON storage.objects 
FOR SELECT TO public 
USING (bucket_id = 'bukti-pembayaran');
```

---

## 👨‍🎓 Alur Penggunaan untuk Siswa

### Langkah 1: Pendaftaran PPDB

1. Siswa mengisi form di `ppdb.html`
2. Setelah submit, sistem otomatis generate:
   - **No. Pendaftaran**: PPDB12345678
   - **Username**: NISN siswa
   - **Password**: Random 8 karakter
3. Muncul popup dengan info login
4. Info juga akan dikirim ke email (jika sudah setup email)

### Langkah 2: Login ke Portal Siswa

1. Buka `/siswa/login.html`
2. Masukkan username (NISN) dan password
3. Klik "Masuk"

### Langkah 3: Upload Dokumen

1. Klik menu "Upload Dokumen"
2. Upload 4 dokumen wajib:
   - Kartu Keluarga (PDF/JPG/PNG, max 2MB)
   - Akta Kelahiran (PDF/JPG/PNG, max 2MB)
   - Ijazah/SKHUN (PDF/JPG/PNG, max 2MB)
   - Pas Foto 3x4 (JPG/PNG, max 2MB)
3. Setiap dokumen akan otomatis tersimpan
4. Status awal: "pending" (menunggu verifikasi admin)

### Langkah 4: Pembayaran

1. Klik menu "Pembayaran"
2. Lihat informasi pembayaran (default: Rp 500.000)
3. Transfer ke rekening sekolah
4. Upload bukti transfer
5. Tunggu verifikasi dari admin

---

## 👨‍💼 Alur untuk Admin

### Akses Halaman Admin Siswa

1. Login ke admin panel
2. Klik menu "Data Siswa"
3. Akan muncul daftar semua siswa yang mendaftar

### Fitur Admin:

1. **Filter & Search**
   - Cari berdasarkan nama atau NISN
   - Filter berdasarkan status (pending/verified/rejected)

2. **Lihat Detail Siswa**
   - Klik "Lihat Detail"
   - Lihat semua data pribadi siswa
   - Lihat username dan password siswa
   - Verifikasi atau tolak pendaftaran

3. **Verifikasi Dokumen**
   - Klik "Dokumen"
   - Lihat semua dokumen yang diupload
   - Klik "Lihat File" untuk melihat dokumen
   - Klik "Verifikasi" untuk approve
   - Klik "Tolak" untuk reject (bisa tambah catatan)

4. **Verifikasi Pembayaran**
   - Klik "Pembayaran"
   - Lihat bukti transfer
   - Verifikasi atau tolak pembayaran
   - Tambahkan catatan jika perlu

---

## 📁 Struktur File

```
/siswa/
  ├── login.html              # Halaman login siswa
  └── dashboard.html          # Dashboard siswa

/admin/
  └── siswa.html              # Halaman admin kelola siswa

/js/
  ├── siswa-login.js          # Logic login siswa
  ├── siswa-dashboard.js      # Logic dashboard siswa
  └── admin-siswa.js          # Logic admin kelola siswa

setup-siswa-system.sql        # SQL untuk setup database
SETUP-STORAGE-SISWA.md        # Panduan setup storage
```

---

## 🔐 Keamanan

⚠️ **PENTING untuk Production:**

1. **Password Hashing**: Saat ini password disimpan plain text. Untuk production, gunakan bcrypt atau argon2
2. **Session Management**: Gunakan JWT atau session yang lebih aman
3. **File Validation**: Tambahkan validasi file type dan virus scan
4. **Rate Limiting**: Batasi jumlah upload per waktu
5. **HTTPS**: Pastikan menggunakan HTTPS

---

## 💰 Konfigurasi Pembayaran

Edit di `js/siswa-dashboard.js` dan `js/ppdb.js`:

```javascript
// Ubah jumlah pembayaran
jumlah: 500000  // Ganti sesuai biaya pendaftaran
```

Tambah jenis pembayaran lain di `siswa/dashboard.html`:

```html
<option value="Biaya Seragam">Biaya Seragam</option>
<option value="Biaya Buku">Biaya Buku</option>
```

---

## 🎨 Kustomisasi

### Ubah Dokumen yang Diperlukan

Edit di `siswa/dashboard.html` dan `js/siswa-dashboard.js`:

```javascript
const dokumenTypes = ['kk', 'akta', 'ijazah', 'foto', 'surat_sehat'];
```

### Ubah Status Badge

Edit di CSS:

```css
.status-pending { background: #ffc107; }
.status-verified { background: #28a745; }
.status-rejected { background: #dc3545; }
```

---

## 🐛 Troubleshooting

### Upload Gagal
- Cek ukuran file (max 2MB)
- Cek format file (PDF, JPG, PNG)
- Cek policy storage di Supabase

### Login Gagal
- Pastikan username dan password benar
- Cek di tabel `ppdb` apakah data sudah ada
- Cek console browser untuk error

### Dokumen Tidak Muncul
- Cek bucket storage sudah dibuat
- Cek policy storage sudah benar
- Cek data di tabel `siswa_dokumen`

---

## 📞 Support

Jika ada masalah, cek:
1. Console browser (F12)
2. Network tab untuk error API
3. Supabase logs di dashboard

---

## ✅ Checklist Setup

- [ ] Jalankan `setup-siswa-system.sql`
- [ ] Buat bucket `dokumen-siswa`
- [ ] Buat bucket `bukti-pembayaran`
- [ ] Set policy storage
- [ ] Test pendaftaran siswa baru
- [ ] Test login siswa
- [ ] Test upload dokumen
- [ ] Test upload pembayaran
- [ ] Test verifikasi admin

Selamat menggunakan Portal Siswa! 🎉
