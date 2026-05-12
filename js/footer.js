// Footer HTML yang sama untuk semua halaman
const footerHTML = `
    <div class="footer-main">
        <div class="container">
            <div class="footer-content">
                <div class="footer-col">
                    <h3 style="color:#fbbf24; font-size:22px; margin-bottom:12px;">SDIT Al-Madinah</h3>
                    <p>Lembaga pendidikan Islam terpadu yang berkomitmen mencetak generasi berakhlak mulia, cerdas, dan berwawasan global.</p>
                </div>
                <div class="footer-col">
                    <h3>Kontak</h3>
                    <p>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="16" style="vertical-align:middle; margin-right:6px;">
                        <a href="https://wa.me/6285113253248" style="color:rgba(255,255,255,0.85); text-decoration:none;">085113253248</a>
                    </p>
                    <p style="margin-top:8px;">
                        <span style="margin-right:6px;">✉️</span>
                        <a href="mailto:info@sdit-almadinah.sch.id" style="color:rgba(255,255,255,0.85); text-decoration:none;">info@sdit-almadinah.sch.id</a>
                    </p>
                    <p style="margin-top:8px;">
                        <span style="margin-right:6px;">📸</span>
                        <a href="#" style="color:rgba(255,255,255,0.85); text-decoration:none;">@sdit.almadinah</a>
                    </p>
                </div>
                <div class="footer-col">
                    <h3>Alamat</h3>
                    <p>Jl. Tentara Pelajar No.48, Kutosari, Kec. Kebumen, Kabupaten Kebumen, Jawa Tengah 54317</p>
                </div>
            </div>

            <div style="text-align:center; margin-top:40px; padding-top:25px; border-top:1px solid rgba(255,255,255,0.15);">
                <div style="display:flex; justify-content:center; gap:20px; margin-bottom:15px;">
                    <a href="https://wa.me/6285113253248" target="_blank" style="color:white; font-size:24px; text-decoration:none;" title="WhatsApp">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="28" height="28">
                    </a>
                    <a href="https://www.instagram.com/sditalmadinahkebumen/" target="_blank" style="color:white; font-size:24px; text-decoration:none;" title="Instagram">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/fb.sditalmadinahkebumen" target="_blank" style="color:white; font-size:24px; text-decoration:none;" title="Facebook">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.youtube.com/@sditalmadinahkebumen" target="_blank" style="color:white; font-size:24px; text-decoration:none;" title="YouTube">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                    </a>
                    <a href="mailto:info@sdit-almadinah.sch.id" style="color:white; font-size:24px; text-decoration:none;" title="Email">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </a>
                </div>
                <p style="color:rgba(255,255,255,0.6); font-size:13px;">© 2025 SDIT Al-Madinah. All rights reserved.</p>
            </div>
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

    // Scroll animations untuk semua halaman
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => animObserver.observe(el));
    
    // Tambahkan floating WhatsApp button
    const waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/6285113253248';
    waBtn.target = '_blank';
    waBtn.title = 'Chat WhatsApp - 085113253248';
    waBtn.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="34" height="34" alt="WhatsApp">`;
    waBtn.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        background: #25d366;
        color: white;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(37,211,102,0.5);
        z-index: 9999;
        transition: transform 0.3s, box-shadow 0.3s;
        text-decoration: none;
    `;
    waBtn.onmouseover = () => {
        waBtn.style.transform = 'scale(1.1)';
        waBtn.style.boxShadow = '0 6px 20px rgba(37,211,102,0.7)';
    };
    waBtn.onmouseout = () => {
        waBtn.style.transform = 'scale(1)';
        waBtn.style.boxShadow = '0 4px 15px rgba(37,211,102,0.5)';
    };
    document.body.appendChild(waBtn);
});
