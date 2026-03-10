# 📚 Cara Menggunakan Portal Siswa

## 🎯 Fitur Portal Siswa

Portal siswa memiliki 3 menu utama:
1. **Data Profil Saya** - Lihat data pendaftaran
2. **Upload Dokumen** - Upload 4 dokumen wajib
3. **Pembayaran** - Upload bukti pembayaran

---

## 📋 Setup Awal (Admin)

### 1. Buat Tabel Database
Jalankan SQL ini di Supabase SQL Editor:
```sql
-- File: SETUP-DOKUMEN-SISWA.sql
```

### 2. Buat Storage Bucket
Di Supabase Dashboard > Storage:
1. Klik "New bucket"
2. Nama: `siswa-documents`
3. Centang "Public bucket"
4. Max file size: 2MB
5. Allowed MIME types: `application/pdf`, `image/jpeg`, `image/png`
6. Klik "Create bucket"

---

## 👨‍🎓 Cara Siswa Upload Dokumen

### Dokumen yang Diperlukan (4 Dokumen Wajib):
1. **Kartu Keluarga (KK)** - Format: PDF/JPG/PNG, Max 2MB
2. **Akta Kelahiran** - Format: PDF/JPG/PNG, Max 2MB
3. **Ijazah/SKHUN SMP** - Format: PDF/JPG/PNG, Max 2MB
4. **Pas Foto 3x4** - Background Merah/Biru, Format: JPG/PNG, Max 2MB

### Langkah Upload:
1. Login ke portal siswa menggunakan NISN
2. Klik menu "Upload Dokumen"
3. Klik tombol "Unggah" pada dokumen yang ingin diupload
4. Pilih file dari komputer (max 2MB)
5. Tunggu proses upload selesai
6. Status akan berubah menjadi ✓ (centang hijau)
7. Tombol berubah menjadi "Unduh" untuk melihat file yang sudah diupload

### Catatan Penting:
- ⚠️ Hanya bisa upload 1 file per dokumen
- ⚠️ Upload file baru akan mengganti file lama
- ⚠️ Status kosong = belum upload
- ✅ Status ✓ = sudah upload, menunggu verifikasi admin

---

## 🔧 Troubleshooting

### Error: "Ukuran file terlalu besar"
- Pastikan file maksimal 2MB
- Kompres file PDF atau resize gambar

### Error: "Format file tidak didukung"
- Gunakan format: PDF, JPG, atau PNG
- Jangan gunakan format lain (DOC, DOCX, dll)

### Error: "Gagal upload dokumen"
- Cek koneksi internet
- Pastikan bucket `siswa-documents` sudah dibuat
- Pastikan bucket bersifat Public
- Cek console browser untuk error detail

### File tidak muncul setelah upload
- Refresh halaman (F5)
- Logout dan login kembali
- Cek di Supabase Storage apakah file sudah terupload

---

## 🎓 Alur Lengkap Pendaftaran Siswa

1. **Daftar PPDB** di halaman `/ppdb.html`
2. **Login** menggunakan NISN yang diberikan
3. **Cek Data Profil** di menu "Data Profil Saya"
4. **Upload Dokumen** (4 dokumen wajib)
5. **Upload Bukti Pembayaran** di menu "Pembayaran"
6. **Tunggu Verifikasi** dari admin
7. **Cek Status** secara berkala di dashboard

---

## 📞 Bantuan

Jika mengalami kendala, hubungi admin sekolah atau IT support.
