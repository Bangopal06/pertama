// Footer HTML yang sama untuk semua halaman
const footerHTML = `
    <div class="footer-main">
        <div class="container">
            <div class="footer-logo">
                <h3>SMA NEGERI 1</h3>
                <p>International Islamic Boarding School</p>
            </div>
            
            <div class="footer-content">
                <div class="footer-col">
                    <h3>Ar-Rohmah</h3>
                    <ul>
                        <li><a href="#">Kampus 1</a></li>
                        <li><a href="#">Kampus 2</a></li>
                        <li><a href="#">Kampus 3</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Pendaftaran</h3>
                    <ul>
                        <li><a href="ppdb.html">Panduan Pendaftaran</a></li>
                        <li><a href="#">Pengumuman</a></li>
                        <li><a href="#">F.A.Q</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Sekolah kami</h3>
                    <ul>
                        <li><a href="#">Ma'had Ar Rohmah Bogor</a></li>
                        <li><a href="#">SMK Tulungagung</a></li>
                        <li><a href="#">Al Fattah Batu</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Hubungi Kami</h3>
                    <p><strong>Whatsapp:</strong><br>085113253248</p>
                    <p><strong>Operasional:</strong><br>08.00 WIB - 17.00 WIB</p>
                    <a href="https://wa.me/6285113253248" target="_blank" style="display:inline-block; margin-top:8px; background:#25d366; color:white; padding:8px 16px; border-radius:20px; text-decoration:none; font-size:13px; font-weight:600;">💬 Chat WhatsApp</a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="footer-bottom">
        <div class="container">
            <p>&copy; 2025, SMA Negeri 1 International Islamic Boarding School</p>
        </div>
    </div>
`;

// Load footer saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');
    if (footer && !footer.querySelector('.footer-top')) {
        footer.innerHTML = footerHTML;
    }
    
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
