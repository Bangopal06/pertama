// Footer HTML yang sama untuk semua halaman
const footerHTML = `
    <div class="footer-main">
        <div class="container">
            <div class="footer-content">

                <!-- Kolom 1: Brand -->
                <div class="footer-col footer-brand-col">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                        <img src="img/logo.png" alt="Logo" style="width:44px;height:44px;object-fit:contain;">
                        <div>
                            <div style="font-size:14px;font-weight:800;color:white;letter-spacing:0.5px;text-transform:uppercase;">SDIT Al-Madinah</div>
                            <div style="font-size:11px;color:#fbbf24;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Kebumen</div>
                        </div>
                    </div>
                    <p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:0;">Sekolah berbasis Islam terpadu yang mencetak generasi berakhlak mulia, cerdas, dan berprestasi.</p>
                </div>

                <!-- Kolom 2: Sekolah Kami -->
                <div class="footer-col">
                    <h3>Sekolah Kami</h3>
                    <ul style="list-style:none;padding:0;margin:0;">
                        <li style="display:flex;align-items:center;gap:8px;margin-bottom:9px;font-size:13.5px;color:rgba(255,255,255,0.7);">🏫 TK/KB Yaa Bunayya Kebumen</li>
                        <li style="display:flex;align-items:center;gap:8px;margin-bottom:9px;font-size:13.5px;color:rgba(255,255,255,0.7);">🏫 SDIT Al-Madinah Kebumen</li>
                        <li style="display:flex;align-items:center;gap:8px;margin-bottom:9px;font-size:13.5px;color:rgba(255,255,255,0.7);">🏫 SMP Integral Hidayatullah Kebumen</li>
                        <li style="display:flex;align-items:center;gap:8px;margin-bottom:9px;font-size:13.5px;color:rgba(255,255,255,0.7);">🏫 RA'I Nurul Huda Pengaringan</li>
                        <li style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:rgba(255,255,255,0.7);">🏫 KB TK Yaa Bunayya 2 Sruweng</li>
                    </ul>
                </div>

                <!-- Kolom 3: Hubungi Kami -->
                <div class="footer-col">
                    <h3>Hubungi Kami</h3>
                    <ul style="list-style:none;padding:0;margin:0;">
                        <li style="display:flex;align-items:flex-start;gap:8px;margin-bottom:10px;font-size:13.5px;color:rgba(255,255,255,0.7);">
                            <span style="margin-top:2px;">📍</span>
                            <span>Jl. Tentara Pelajar No.48, Kutosari, Kec. Kebumen, Jawa Tengah 54317</span>
                        </li>
                        <li style="display:flex;align-items:center;gap:8px;margin-bottom:10px;font-size:13.5px;color:rgba(255,255,255,0.7);">
                            <span>📞</span>
                            <a href="https://wa.me/6285113253248" style="color:rgba(255,255,255,0.7);text-decoration:none;">0851-1325-3248</a>
                        </li>
                        <li style="display:flex;align-items:center;gap:8px;font-size:13.5px;color:rgba(255,255,255,0.7);">
                            <span>⏰</span>
                            <span>Senin – Jumat, 07.00–15.00 WIB</span>
                        </li>
                    </ul>
                </div>

                <!-- Kolom 4: Navigasi -->
                <div class="footer-col">
                    <h3>Navigasi</h3>
                    <ul style="list-style:none;padding:0;margin:0;">
                        <li style="margin-bottom:9px;"><a href="index.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13.5px;display:flex;align-items:center;gap:6px;transition:color .2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">› Beranda</a></li>
                        <li style="margin-bottom:9px;"><a href="profil.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13.5px;display:flex;align-items:center;gap:6px;transition:color .2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">› Profil Sekolah</a></li>
                        <li style="margin-bottom:9px;"><a href="program.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13.5px;display:flex;align-items:center;gap:6px;transition:color .2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">› Program Unggulan</a></li>
                        <li style="margin-bottom:9px;"><a href="berita.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13.5px;display:flex;align-items:center;gap:6px;transition:color .2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">› Informasi</a></li>
                        <li style="margin-bottom:9px;"><a href="kontak.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:13.5px;display:flex;align-items:center;gap:6px;transition:color .2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">› Kontak</a></li>
                        <li><a href="https://spmb-aiis.vercel.app/" target="_blank" style="color:#fbbf24;text-decoration:none;font-size:13.5px;display:flex;align-items:center;gap:6px;font-weight:600;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#fbbf24'">› Pendaftaran PPDB</a></li>
                    </ul>
                </div>

            </div><!-- end footer-content -->

            <!-- Social Media - bawah semua kolom, tengah -->
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;gap:12px;">
                <a href="https://www.instagram.com/sditalmadinahkebumen/" target="_blank" style="width:34px;height:34px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;color:white;text-decoration:none;transition:background .2s;" onmouseover="this.style.background='#e1306c'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.facebook.com/fb.sditalmadinahkebumen" target="_blank" style="width:34px;height:34px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;color:white;text-decoration:none;transition:background .2s;" onmouseover="this.style.background='#1877f2'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://wa.me/6285113253248" target="_blank" style="width:34px;height:34px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:background .2s;" onmouseover="this.style.background='#25d366'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="16" height="16">
                </a>
                <a href="https://www.youtube.com/@sditalmadinahkebumen" target="_blank" style="width:34px;height:34px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;color:white;text-decoration:none;transition:background .2s;" onmouseover="this.style.background='#ff0000'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                </a>
            </div>
        <div class="container">
            <p>© 2025 Yayasan Al-Madinah Kebumen. All rights reserved.</p>
        </div>
    </div>
`;

// Load footer saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');
    if (footer && !footer.querySelector('.footer-top')) {
        footer.innerHTML = footerHTML;
    }

    // Hamburger menu toggle
    window.toggleMenu = function() {
        const menu = document.querySelector('.nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (menu) menu.classList.toggle('open');
        if (hamburger) hamburger.classList.toggle('active');
    };

    // Close menu when link clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (menu) menu.classList.remove('open');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Scroll animations
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => animObserver.observe(el));

    // Floating WhatsApp button
    const waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/6285113253248';
    waBtn.target = '_blank';
    waBtn.title = 'Chat WhatsApp - 085113253248';
    waBtn.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="34" height="34" alt="WhatsApp">`;
    waBtn.style.cssText = `position:fixed;bottom:25px;right:25px;background:#25d366;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(37,211,102,0.5);z-index:9999;transition:transform 0.3s,box-shadow 0.3s;text-decoration:none;`;
    waBtn.onmouseover = () => { waBtn.style.transform = 'scale(1.1)'; waBtn.style.boxShadow = '0 6px 20px rgba(37,211,102,0.7)'; };
    waBtn.onmouseout  = () => { waBtn.style.transform = 'scale(1)';   waBtn.style.boxShadow = '0 4px 15px rgba(37,211,102,0.5)'; };
    document.body.appendChild(waBtn);
});
