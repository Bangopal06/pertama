# Cara Upload Gambar ke Supabase Storage

## Langkah 1: Setup Storage Buckets

1. **Login ke Supabase Dashboard**
   - Buka https://supabase.com/dashboard
   - Pilih project Anda

2. **Buka SQL Editor**
   - Klik menu "SQL Editor" di sidebar kiri
   - Klik "New query"

3. **Jalankan SQL Setup**
   - Buka file `setup-storage-images.sql`
   - Copy semua isi file
   - Paste ke SQL Editor
   - Klik tombol "Run" atau tekan `Ctrl+Enter`

4. **Verifikasi Buckets Berhasil Dibuat**
   - Klik menu "Storage" di sidebar
   - Seharusnya ada 3 buckets:
     - `berita-images` (untuk gambar berita)
     - `program-images` (untuk gambar program)
     - `slider-images` (untuk gambar slider/banner)

## Langkah 2: Upload Gambar Manual (Testing)

### Via Supabase Dashboard:

1. **Buka Storage**
   - Klik menu "Storage" di sidebar
   - Pilih bucket (misalnya `berita-images`)

2. **Upload File**
   - Klik tombol "Upload file"
   - Pilih gambar dari komputer
   - Klik "Upload"

3. **Get Public URL**
   - Klik pada gambar yang sudah diupload
   - Klik "Get URL" atau "Copy URL"
   - URL akan seperti: `https://[project-id].supabase.co/storage/v1/object/public/berita-images/nama-file.jpg`

## Langkah 3: Upload via Admin Panel

Sistem admin panel sudah support upload gambar ke Supabase Storage:

### Upload Gambar Berita:

1. Login ke admin panel
2. Klik menu "Kelola Berita"
3. Klik "Tambah Berita"
4. Pilih "Upload File" (bukan URL)
5. Pilih gambar dari komputer
6. Gambar otomatis diupload ke `berita-images` bucket
7. URL otomatis tersimpan di database

### Upload Gambar Program:

1. Login ke admin panel
2. Klik menu "Kelola Program"
3. Klik "Tambah Program"
4. Pilih "Upload File"
5. Pilih gambar
6. Gambar otomatis diupload ke `program-images` bucket

## Storage Buckets yang Tersedia

### 1. berita-images
- **Untuk:** Gambar berita/artikel
- **Max Size:** 5MB per file
- **Format:** JPG, PNG, GIF, WebP
- **Public:** Ya (bisa diakses siapa saja)

### 2. program-images
- **Untuk:** Gambar program unggulan
- **Max Size:** 5MB per file
- **Format:** JPG, PNG, GIF, WebP
- **Public:** Ya

### 3. slider-images
- **Untuk:** Gambar slider/banner homepage
- **Max Size:** 10MB per file (lebih besar untuk kualitas banner)
- **Format:** JPG, PNG, GIF, WebP
- **Public:** Ya

## Keuntungan Menggunakan Supabase Storage

✅ **Performa Lebih Cepat**
- Gambar di-host di CDN global
- Loading website lebih cepat
- Bandwidth unlimited

✅ **Hemat Space**
- Tidak menyimpan gambar di server website
- Tidak memberatkan repository Git
- Mudah backup dan restore

✅ **Terorganisir**
- Gambar terpisah per kategori (berita, program, slider)
- Mudah manage dan hapus gambar lama
- Auto-generate URL

✅ **Aman**
- Upload hanya bisa dilakukan admin
- File type validation
- Size limit protection

## Format URL Gambar

Setelah upload, URL gambar akan seperti ini:

```
https://[project-id].supabase.co/storage/v1/object/public/berita-images/1234567890-abc123.jpg
```

Struktur:
- `[project-id]` = ID project Supabase Anda
- `berita-images` = Nama bucket
- `1234567890-abc123.jpg` = Nama file (auto-generated untuk unique)

## Tips Optimasi Gambar

### Sebelum Upload:

1. **Resize gambar** ke ukuran yang sesuai:
   - Berita: 800x600px atau 1200x800px
   - Program: 600x400px
   - Slider: 1920x1080px atau 1600x900px

2. **Compress gambar** untuk mengurangi ukuran file:
   - Gunakan tools: TinyPNG, Squoosh, ImageOptim
   - Target: < 500KB untuk berita/program
   - Target: < 1MB untuk slider

3. **Gunakan format yang tepat**:
   - JPG: Untuk foto/gambar kompleks
   - PNG: Untuk gambar dengan transparansi
   - WebP: Format modern, ukuran lebih kecil (recommended)

### Tools Rekomendasi:

- **Online:** 
  - https://tinypng.com (compress)
  - https://squoosh.app (resize & compress)
  - https://www.iloveimg.com (resize)

- **Desktop:**
  - GIMP (free, open source)
  - Photoshop
  - Paint.NET

## Cara Menghapus Gambar Lama

### Via Supabase Dashboard:

1. Buka Storage
2. Pilih bucket
3. Centang gambar yang ingin dihapus
4. Klik "Delete"
5. Confirm

### Via Admin Panel:

Saat menghapus berita/program, gambar otomatis terhapus dari storage (jika sudah diimplementasikan).

## Troubleshooting

### Error: "Bucket not found"
**Solusi:** Jalankan file `setup-storage-images.sql` di SQL Editor

### Error: "File too large"
**Solusi:** 
- Compress gambar sebelum upload
- Max 5MB untuk berita/program
- Max 10MB untuk slider

### Error: "Invalid file type"
**Solusi:** 
- Hanya support JPG, PNG, GIF, WebP
- Convert gambar ke format yang didukung

### Gambar tidak muncul di website
**Solusi:**
- Cek URL gambar di browser
- Pastikan bucket bersifat PUBLIC
- Clear browser cache
- Cek console browser untuk error

### Upload lambat
**Solusi:**
- Compress gambar terlebih dahulu
- Cek koneksi internet
- Gunakan format WebP untuk ukuran lebih kecil

## Migrasi Gambar Lama

Jika Anda sudah punya berita dengan gambar dari URL eksternal (Unsplash, dll):

1. **Download gambar** dari URL lama
2. **Upload ke Supabase Storage** via dashboard
3. **Copy URL baru** dari Supabase
4. **Update database** dengan URL baru:

```sql
UPDATE berita 
SET gambar_url = 'https://[project-id].supabase.co/storage/v1/object/public/berita-images/new-image.jpg'
WHERE id = 1;
```

Atau update via admin panel (edit berita → ganti gambar).

## Monitoring Storage Usage

1. Buka Supabase Dashboard
2. Klik "Settings" → "Usage"
3. Lihat "Storage" usage
4. Free tier: 1GB storage
5. Jika perlu lebih, upgrade ke Pro plan

## Best Practices

1. **Naming Convention:**
   - Gunakan nama file yang deskriptif
   - Contoh: `berita-ppdb-2024.jpg` bukan `IMG_1234.jpg`

2. **Organize by Date:**
   - Buat folder per tahun/bulan jika perlu
   - Contoh: `2024/01/berita-ppdb.jpg`

3. **Delete Unused Images:**
   - Hapus gambar lama yang tidak terpakai
   - Hemat storage space

4. **Backup Regular:**
   - Download gambar penting secara berkala
   - Simpan backup di tempat lain

5. **Use CDN:**
   - Supabase Storage sudah menggunakan CDN
   - Gambar otomatis di-cache di edge locations
   - Loading lebih cepat untuk user di berbagai lokasi
