# Setup Storage untuk Portal Siswa

## Langkah-langkah Setup di Supabase

### 1. Buat Storage Buckets

Masuk ke Supabase Dashboard → Storage → Create bucket

Buat 2 bucket baru:
- **dokumen-siswa** (untuk KK, Akta, Ijazah, Foto)
- **bukti-pembayaran** (untuk bukti transfer)

### 2. Set Public Access

Untuk setiap bucket:
1. Klik bucket name
2. Klik "Policies"
3. Klik "New Policy"
4. Pilih "For full customization"

### 3. Policy untuk Upload (INSERT)

```sql
-- Policy untuk dokumen-siswa
CREATE POLICY "Allow public upload dokumen-siswa"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'dokumen-siswa');

-- Policy untuk bukti-pembayaran
CREATE POLICY "Allow public upload bukti-pembayaran"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'bukti-pembayaran');
```

### 4. Policy untuk Read (SELECT)

```sql
-- Policy untuk dokumen-siswa
CREATE POLICY "Allow public read dokumen-siswa"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dokumen-siswa');

-- Policy untuk bukti-pembayaran
CREATE POLICY "Allow public read bukti-pembayaran"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bukti-pembayaran');
```

### 5. Jalankan SQL untuk Tabel

Jalankan file `setup-siswa-system.sql` di SQL Editor

## Cara Menggunakan

### Untuk Siswa:
1. Daftar PPDB di halaman ppdb.html
2. Setelah daftar, akan muncul popup dengan:
   - No. Pendaftaran
   - Username (NISN)
   - Password (random 8 karakter)
3. Login di `/siswa/login.html`
4. Upload dokumen dan bukti pembayaran

### Untuk Admin:
- Buat halaman admin untuk verifikasi dokumen dan pembayaran
- Lihat data di tabel `siswa_dokumen` dan `siswa_pembayaran`

## Struktur File

```
/siswa/
  - login.html          (Login portal siswa)
  - dashboard.html      (Dashboard siswa)

/js/
  - siswa-login.js      (Logic login)
  - siswa-dashboard.js  (Logic dashboard)
```

## Catatan Penting

1. Password disimpan plain text (untuk demo). Di production, gunakan hashing!
2. File size limit: 2MB per file
3. Format file: PDF, JPG, PNG
4. Biaya pendaftaran default: Rp 500.000

## Testing

1. Daftar siswa baru di ppdb.html
2. Catat username dan password yang muncul
3. Login di siswa/login.html
4. Test upload dokumen dan pembayaran
