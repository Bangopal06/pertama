// Footer HTML yang sama untuk semua halaman
const footerHTML = `
    <div class="footer-top">
        <div class="container">
            <div class="footer-campuses">
                <div class="campus-item">
                    <h4>Kampus 1</h4>
                    <div class="social-icons">
                        <a href="#" target="_blank" title="Facebook">📘</a>
                        <a href="#" target="_blank" title="Instagram">📷</a>
                        <a href="#" target="_blank" title="YouTube">📺</a>
                        <a href="#" target="_blank" title="TikTok">🎵</a>
                    </div>
                </div>
                <div class="campus-item">
                    <h4>Kampus 2</h4>
                    <div class="social-icons">
                        <a href="#" target="_blank" title="Facebook">📘</a>
                        <a href="#" target="_blank" title="Instagram">📷</a>
                        <a href="#" target="_blank" title="YouTube">📺</a>
                        <a href="#" target="_blank" title="TikTok">🎵</a>
                    </div>
                </div>
                <div class="campus-item">
                    <h4>Kampus 3</h4>
                    <div class="social-icons">
                        <a href="#" target="_blank" title="Facebook">📘</a>
                        <a href="#" target="_blank" title="Instagram">📷</a>
                        <a href="#" target="_blank" title="YouTube">📺</a>
                        <a href="#" target="_blank" title="TikTok">🎵</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
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
                    <p><strong>Whatsapp:</strong><br>0812 331 60000</p>
                    <p><strong>Operasional:</strong><br>08.00 WIB - 17.00 WIB</p>
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
});
