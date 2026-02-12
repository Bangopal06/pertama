# Cara Menambahkan Gambar ke Berita

## Langkah 1: Update Tabel di Supabase

1. Buka Supabase Dashboard
2. Pergi ke SQL Editor
3. Copy paste SQL berikut dan klik Run:

```sql
ALTER TABLE berita ADD COLUMN IF NOT EXISTS gambar_url TEXT;
```

## Langkah 2: Tambah Berita dengan Gambar

1. Login ke admin panel
2. Klik "Kelola Berita"
3. Klik "Tambah Berita"
4. Isi form berita:
   - Judul
   - **Gambar URL**: Masukkan URL gambar (contoh di bawah)
   - Konten
   - Kategori
5. Klik Simpan

## Contoh URL Gambar yang Bisa Digunakan:

### Gambar Sekolah/Pendidikan:
- https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800
- https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800
- https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800

### Gambar Prestasi/Trophy:
- https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800
- https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800

### Gambar Kegiatan:
- https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800
- https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800

### Gambar Pengumuman:
- https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800
- https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800

## Tips:

1. **Gunakan gambar berkualitas tinggi** dengan resolusi minimal 800x400 px
2. **Format yang didukung**: JPG, PNG, WebP
3. **Jika tidak ada URL gambar**, sistem akan menggunakan gambar placeholder otomatis
4. **Preview gambar** akan muncul saat Anda memasukkan URL

## Sumber Gambar Gratis:

- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

Pastikan gambar yang digunakan bebas hak cipta atau memiliki lisensi yang sesuai!
