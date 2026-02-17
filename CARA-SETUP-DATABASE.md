# 🚀 Cara Setup Database Supabase (5 Menit)

## Langkah 1: Buka Supabase SQL Editor

1. Buka browser dan pergi ke https://supabase.com
2. Login ke akun Anda
3. Pilih project Anda (yang sudah dibuat sebelumnya)
4. Di sidebar kiri, klik **SQL Editor** (icon ⚡)

## Langkah 2: Jalankan SQL

1. Klik tombol **New query** (atau gunakan query yang sudah ada)
2. Buka file `SETUP-DATABASE-LENGKAP.sql` di folder project
3. **Copy SEMUA isi file** (Ctrl+A lalu Ctrl+C)
4. **Paste** ke SQL Editor di Supabase (Ctrl+V)
5. Klik tombol **RUN** (atau tekan Ctrl+Enter)

## Langkah 3: Tunggu Selesai

- Tunggu beberapa detik sampai muncul pesan "Success"
- Jika ada error, coba run lagi (biasanya karena tabel sudah ada)

## Langkah 4: Verifikasi

1. Di sidebar kiri, klik **Table Editor**
2. Anda akan melihat 4 tabel baru:
   - ✅ `berita` (3 data sample)
   - ✅ `program` (5 data sample)
   - ✅ `ppdb` (kosong, akan terisi saat ada pendaftar)
   - ✅ `admin_users` (1 admin default)

## Langkah 5: Test Login Admin

1. Buka website Anda
2. Klik tombol **Admin** di navbar
3. Login dengan:
   - **Username**: `admin`
   - **Password**: `admin123`
4. Anda akan masuk ke dashboard admin

## ✅ Selesai!

Sekarang Anda bisa:
- ✅ Kelola Berita (tambah, edit, hapus)
- ✅ Kelola Program (tambah, edit, hapus)
- ✅ Lihat Data PPDB (pendaftar)
- ✅ Upload gambar untuk berita dan program

## 🎯 Yang Sudah Dibuat Otomatis:

### Tabel Berita
- 3 berita sample sudah tersedia
- Siap untuk ditambah/edit via admin

### Tabel Program
- 5 program unggulan sudah tersedia:
  1. Qur'an dan Ulumuddin
  2. Adab dan Akhlak
  3. Sains dan Teknologi
  4. Pembelajaran Bilingual
  5. Penumbuhan Leadership

### Tabel PPDB
- Siap menerima pendaftaran siswa baru
- Data akan masuk otomatis saat ada yang daftar

### Admin User
- Username: `admin`
- Password: `admin123`
- **PENTING**: Ganti password setelah login pertama!

## 🔧 Troubleshooting

### Error: "relation already exists"
- **Solusi**: Tabel sudah ada, tidak perlu run lagi
- Atau hapus tabel lama dulu di Table Editor

### Error: "permission denied"
- **Solusi**: Pastikan Anda login sebagai owner project
- Atau cek RLS settings di tabel

### Website masih error
- **Solusi**: 
  1. Refresh halaman website (Ctrl+F5)
  2. Clear browser cache
  3. Cek console browser (F12) untuk error detail

## 📝 Catatan Penting

1. **Backup Data**: Jika sudah ada data, backup dulu sebelum run SQL
2. **Password Admin**: Ganti password default setelah login
3. **RLS Disabled**: Semua tabel sudah disable RLS untuk kemudahan
4. **Data Sample**: Bisa dihapus/edit sesuai kebutuhan

## 🎉 Selamat!

Database Anda sudah siap digunakan. Sekarang Anda bisa mengelola website sekolah dengan mudah melalui admin panel!

---

**Butuh bantuan?** Cek console browser (F12) untuk melihat error detail.
