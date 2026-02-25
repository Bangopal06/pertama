# 🚀 MULAI DISINI - Setup Portal Siswa

## Cara Tercepat Setup Database & Storage

### Opsi 1: Gunakan Setup Helper (RECOMMENDED) ⭐

1. **Buka file ini di browser:**
   ```
   setup-helper.html
   ```

2. **Ikuti langkah-langkah interaktif:**
   - Copy SQL otomatis
   - Link langsung ke Supabase
   - Checklist verifikasi
   - Test koneksi otomatis

### Opsi 2: Manual Setup

1. **Buka Supabase Dashboard:**
   - Login ke https://supabase.com
   - Pilih project Anda

2. **Jalankan SQL:**
   - Klik "SQL Editor" → "New query"
   - Copy isi file `SETUP-LENGKAP-SUPABASE.sql`
   - Paste dan klik "RUN"

3. **Verifikasi:**
   - Cek tabel: ppdb, siswa_dokumen, siswa_pembayaran
   - Cek storage: dokumen-siswa, bukti-pembayaran

---

## 📁 File-File Penting

| File | Fungsi |
|------|--------|
| `setup-helper.html` | 🌟 Helper interaktif untuk setup |
| `SETUP-LENGKAP-SUPABASE.sql` | SQL untuk setup database & storage |
| `PANDUAN-SETUP-SUPABASE.md` | Panduan detail step-by-step |
| `CARA-GUNAKAN-PORTAL-SISWA.md` | Panduan penggunaan sistem |

---

## 🎯 Setelah Setup Selesai

### Test Sistem:

1. **Daftar Siswa Baru:**
   - Buka `ppdb.html`
   - Isi form pendaftaran
   - Simpan username & password yang muncul

2. **Login Portal Siswa:**
   - Buka `login.html`
   - Login dengan username & password
   - Test upload dokumen

3. **Verifikasi Admin:**
   - Buka `admin/siswa.html`
   - Login sebagai admin
   - Verifikasi dokumen siswa

---

## ✅ Checklist Setup

- [ ] SQL sudah dijalankan di Supabase
- [ ] Tabel siswa_dokumen & siswa_pembayaran sudah ada
- [ ] Bucket dokumen-siswa & bukti-pembayaran sudah ada
- [ ] Test daftar siswa baru berhasil
- [ ] Test login siswa berhasil
- [ ] Test upload dokumen berhasil
- [ ] Test verifikasi admin berhasil

---

## 🆘 Butuh Bantuan?

### Error Umum:

**"relation siswa_dokumen does not exist"**
→ Jalankan ulang SQL di Supabase

**"bucket not found"**
→ Buat bucket manual di Storage

**Upload file gagal**
→ Cek policy storage & ukuran file (max 2MB)

### Dokumentasi Lengkap:

- `PANDUAN-SETUP-SUPABASE.md` - Setup detail
- `CARA-GUNAKAN-PORTAL-SISWA.md` - Cara pakai sistem

---

## 🎉 Selamat!

Jika semua checklist ✅, sistem portal siswa Anda sudah siap digunakan!

**Fitur yang tersedia:**
- ✅ Pendaftaran siswa otomatis generate username & password
- ✅ Portal siswa untuk upload dokumen
- ✅ Upload bukti pembayaran
- ✅ Admin panel untuk verifikasi
- ✅ Status tracking real-time

**Selamat menggunakan! 🚀**
