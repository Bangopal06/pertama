# 🔐 Sistem Login Terpadu

## Fitur Baru: Satu Halaman Login untuk Admin & Siswa

Sekarang sistem menggunakan **satu halaman login** yang otomatis mendeteksi apakah yang login adalah admin atau siswa.

---

## 📍 Akses Login

### Dari Website:
Klik tombol **"Login"** di menu navigasi (sebelumnya "Admin")

### Langsung:
Buka file `login.html` di browser

---

## 👥 Cara Login

### 🔹 Login sebagai Admin:

**Username:** admin  
**Password:** admin123

Setelah login, akan otomatis redirect ke **Admin Dashboard**

### 🔹 Login sebagai Siswa:

**Username:** NISN atau No. Pendaftaran  
**Password:** Password yang diterima saat pendaftaran

Contoh:
- Username: **99** (NISN)
- Password: **ueeugd1l**

Setelah login, akan otomatis redirect ke **Dashboard Siswa**

---

## 🔄 Cara Kerja Sistem

1. **User memasukkan username & password**
2. **Sistem cek database admin_users:**
   - Jika cocok → Login sebagai Admin → Redirect ke `admin/dashboard.html`
3. **Jika tidak cocok, cek database ppdb:**
   - Cari berdasarkan username, no_pendaftaran, atau NISN
   - Jika cocok → Login sebagai Siswa → Redirect ke `siswa/dashboard.html`
4. **Jika tidak ada yang cocok:**
   - Tampilkan pesan error

---

## 📁 File yang Terlibat

| File | Fungsi |
|------|--------|
| `login.html` | Halaman login terpadu |
| `js/unified-login.js` | Logic untuk cek admin atau siswa |
| `admin/dashboard.html` | Dashboard admin |
| `siswa/dashboard.html` | Dashboard siswa |

---

## ✅ Keuntungan Sistem Terpadu

1. **User-friendly:** Satu halaman untuk semua user
2. **Otomatis:** Sistem deteksi role secara otomatis
3. **Aman:** Cek kredensial di database
4. **Mudah:** User tidak perlu tahu halaman login mana yang harus diakses

---

## 🧪 Test Login

### Test Admin:
1. Buka `login.html`
2. Username: **admin**
3. Password: **admin123**
4. Klik "Masuk"
5. ✅ Harus masuk ke Admin Dashboard

### Test Siswa:
1. Buka `login.html`
2. Username: **99** (atau NISN siswa lain)
3. Password: **ueeugd1l** (atau password siswa lain)
4. Klik "Masuk"
5. ✅ Harus masuk ke Dashboard Siswa

---

## 🔒 Keamanan

### Session Management:
- **Admin:** Disimpan di `localStorage` dengan key `admin_logged_in`
- **Siswa:** Disimpan di `localStorage` dengan key `siswa_id`

### Logout:
- Admin: Klik "Logout" di dashboard admin
- Siswa: Klik "Keluar" di dashboard siswa

---

## 🎨 Kustomisasi

### Ubah Teks Tombol:
Edit `index.html` dan file HTML lainnya:
```html
<li><a href="login.html" class="btn-admin">Login</a></li>
```

Ganti "Login" dengan:
- "Masuk"
- "Sign In"
- "Portal"
- dll.

### Ubah Style:
Edit `css/admin.css` untuk mengubah tampilan halaman login

---

## 📝 Catatan Penting

1. **Password Plain Text:** Saat ini password disimpan plain text. Untuk production, gunakan hashing (bcrypt, argon2)
2. **Session Storage:** Menggunakan localStorage. Untuk production, gunakan JWT atau session yang lebih aman
3. **Multiple Login:** User bisa login di multiple tab/browser

---

## 🆘 Troubleshooting

### Login gagal terus:
- Cek username dan password benar
- Cek koneksi ke Supabase
- Buka Console browser (F12) untuk lihat error

### Redirect tidak jalan:
- Cek file `admin/dashboard.html` dan `siswa/dashboard.html` ada
- Cek path file benar

### Session hilang:
- Jangan clear localStorage browser
- Jangan gunakan mode incognito untuk testing

---

## 🎉 Selesai!

Sistem login terpadu sudah siap digunakan. Semua tombol "Admin" di website sudah diganti menjadi "Login" dan akan otomatis mendeteksi role user.

**Happy coding! 🚀**
