# Cara Mengelola Slider Homepage

## Akses Halaman Kelola Slider

1. Login ke admin panel di `login.html`
2. Klik menu **"Kelola Slider"** di sidebar
3. Atau akses langsung: `admin/slider.html`

## Menambah Slide Baru

1. Klik tombol **"+ Tambah Slide"**
2. Isi form dengan data berikut:
   - **Judul Utama**: Teks besar di atas (contoh: "Selamat Datang di")
   - **Sub Judul**: Teks besar di tengah (contoh: "SMA NEGERI 1")
   - **Deskripsi**: Teks kecil di bawah (opsional)
   - **Gambar**: Pilih cara upload:
     - Upload File: Pilih gambar dari komputer (max 10MB)
     - Input URL: Masukkan URL gambar dari internet
   - **Link URL**: URL tujuan saat tombol diklik (opsional)
   - **Teks Tombol**: Teks pada tombol (opsional)
   - **Urutan**: Angka urutan tampilan (1, 2, 3, dst)
   - **Aktif**: Centang untuk menampilkan di homepage

3. Klik **"Simpan"**

## Upload Gambar ke Supabase

Gambar slider akan otomatis diupload ke Supabase Storage bucket `slider-images`:
- Ukuran maksimal: 10MB
- Format: JPG, PNG, GIF
- Rekomendasi ukuran: 1920x1080px atau 1600x900px

## Edit Slide

1. Klik tombol **"Edit"** pada slide yang ingin diubah
2. Form akan muncul dengan data yang sudah terisi
3. Ubah data yang diperlukan
4. Klik **"Simpan"**

## Hapus Slide

1. Klik tombol **"Hapus"** pada slide yang ingin dihapus
2. Konfirmasi penghapusan
3. Slide akan dihapus dari database dan gambar akan dihapus dari Supabase Storage

## Mengatur Urutan Slide

- Slide dengan urutan lebih kecil akan tampil lebih dulu
- Contoh: Urutan 1 → Urutan 2 → Urutan 3
- Ubah angka urutan pada form edit untuk mengatur posisi

## Mengaktifkan/Menonaktifkan Slide

- Centang checkbox **"Aktif"** untuk menampilkan slide di homepage
- Hapus centang untuk menyembunyikan slide tanpa menghapusnya

## Tampilan di Homepage

Slider akan otomatis dimuat dari database saat homepage dibuka:
- Hanya slide yang aktif yang ditampilkan
- Slide diurutkan berdasarkan kolom `slide_order`
- Auto-slide setiap 5 detik
- Navigasi dengan tombol prev/next atau keyboard (arrow keys)
- Pause saat hover

## Troubleshooting

### Gambar tidak muncul
- Pastikan gambar sudah terupload ke Supabase Storage
- Cek URL gambar di database (harus dimulai dengan https://)
- Pastikan bucket `slider-images` sudah dibuat dan public

### Slide tidak tampil di homepage
- Pastikan checkbox "Aktif" tercentang
- Cek urutan slide (angka harus valid)
- Refresh halaman homepage (Ctrl+F5)

### Upload gagal
- Cek ukuran file (max 10MB)
- Pastikan format file adalah JPG, PNG, atau GIF
- Cek koneksi internet
- Pastikan Supabase Storage sudah dikonfigurasi dengan benar
