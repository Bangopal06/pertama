# Setup Upload Gambar dari Perangkat

## Langkah Setup di Supabase (Hanya Sekali)

### 1. Buat Storage Bucket

1. Buka Supabase Dashboard
2. Klik menu **Storage** di sidebar kiri
3. Klik tombol **New bucket**
4. Isi form:
   - **Name**: `berita-images`
   - **Public bucket**: ✅ CENTANG (penting!)
5. Klik **Create bucket**

### 2. Set Policy untuk Bucket

1. Masih di halaman Storage
2. Klik bucket **berita-images** yang baru dibuat
3. Klik tab **Policies**
4. Klik **New Policy**
5. Pilih template **Allow public access** atau buat custom policy:

**Atau lebih mudah, jalankan SQL ini di SQL Editor:**

```sql
-- Policy untuk public read
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'berita-images');

-- Policy untuk upload
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'berita-images');

-- Policy untuk update
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'berita-images');

-- Policy untuk delete
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'berita-images');
```

## Cara Menggunakan

### Upload Gambar Berita:

1. **Login ke Admin Panel**
2. **Klik "Kelola Berita"**
3. **Klik "Tambah Berita"**
4. **Klik tombol "Choose File"** di bagian Upload Gambar
5. **Pilih gambar dari komputer Anda**
   - Format: JPG, PNG, GIF, WebP
   - Ukuran maksimal: 5MB
6. **Preview gambar akan muncul otomatis**
7. **Isi judul, konten, dan kategori**
8. **Klik "Simpan"**

### Gambar akan:
- ✅ Otomatis terupload ke Supabase Storage
- ✅ Tersimpan dengan nama unik
- ✅ Bisa diakses publik
- ✅ Muncul di halaman berita

## Keuntungan Upload dari Perangkat:

✅ **Lebih mudah** - Tidak perlu cari URL gambar  
✅ **Lebih cepat** - Langsung pilih dari komputer  
✅ **Lebih aman** - Gambar tersimpan di server Anda sendiri  
✅ **Gratis** - Supabase free tier: 1GB storage  

## Troubleshooting

### Error "Bucket not found"
- Pastikan bucket `berita-images` sudah dibuat
- Cek nama bucket harus persis sama

### Error "Permission denied"
- Pastikan bucket di-set sebagai **Public**
- Pastikan policy sudah dibuat dengan benar

### Gambar tidak muncul
- Cek koneksi internet
- Refresh halaman
- Cek console browser untuk error

## Tips:

1. **Gunakan gambar berkualitas baik** tapi tidak terlalu besar
2. **Compress gambar** sebelum upload jika lebih dari 2MB
3. **Gunakan format JPG** untuk foto, PNG untuk grafis
4. **Nama file tidak penting** - sistem akan generate nama unik otomatis
