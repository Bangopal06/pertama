// Slider functionality
let currentSlideIndex = 0;
let slides = [];
let slideInterval;
let sliderData = [];

// Load slider data from Supabase
async function loadSliderData() {
    try {
        const { data, error } = await window.supabaseClient
            .from('slider')
            .select('*')
            .eq('aktif', true)
            .order('urutan', { ascending: true });

        if (error) throw error;

        sliderData = data || [];
        renderSlider();
    } catch (error) {
        console.error('Error loading slider:', error);
        // Show default slide if error
        renderDefaultSlider();
    }
}

// Render slider HTML
function renderSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!sliderContainer || !dotsContainer) return;

    // Clear existing content
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    // If no slides, show default
    if (sliderData.length === 0) {
        renderDefaultSlider();
        return;
    }

    // Create slides
    sliderData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = index === 0 ? 'slide active' : 'slide';
        
        const buttons = slide.link_url ? 
            `<div class="slide-buttons">
                <a href="${slide.link_url}" class="btn-hero btn-primary">${slide.link_text || 'Pelajari Lebih Lanjut'}</a>
            </div>` : '';

        slideDiv.innerHTML = `
            <img src="${slide.gambar_url}" alt="${slide.judul}">
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <h1 class="slide-title">${slide.judul}</h1>
                <h2 class="slide-subtitle">${slide.subjudul}</h2>
                <p class="slide-description">${slide.deskripsi || ''}</p>
                ${buttons}
            </div>
        `;
        
        sliderContainer.appendChild(slideDiv);

        // Create dot
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'dot active' : 'dot';
        dot.onclick = () => currentSlide(index);
        dotsContainer.appendChild(dot);
    });

    // Update slides reference
    slides = document.querySelectorAll('.slide');
    
    // Start auto slide
    if (slides.length > 1) {
        autoSlide();
    }
}

// Render default slider if no data
function renderDefaultSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!sliderContainer || !dotsContainer) return;

    sliderContainer.innerHTML = `
        <div class="slide active">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop" alt="Siswa Belajar">
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <h1 class="slide-title">Selamat Datang di</h1>
                <h2 class="slide-subtitle">SMA NEGERI 1</h2>
                <p class="slide-description">Centre of Comprehensive Education</p>
                <div class="slide-buttons">
                    <a href="profil.html" class="btn-hero btn-primary">Pelajari Lebih Lanjut</a>
                    <a href="ppdb.html" class="btn-hero btn-secondary">Informasi Pendaftaran</a>
                </div>
            </div>
        </div>
    `;

    dotsContainer.innerHTML = '<span class="dot active" onclick="currentSlide(0)"></span>';
    slides = document.querySelectorAll('.slide');
}

// Show slide
function showSlide(index) {
    if (slides.length === 0) return;

    // Reset if out of bounds
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active from all dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Next/Previous controls
function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetInterval();
}

// Dot controls
function currentSlide(index) {
    showSlide(index);
    resetInterval();
}

// Auto slide
function autoSlide() {
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000); // Change slide every 5 seconds
}

// Reset interval when user manually changes slide
function resetInterval() {
    clearInterval(slideInterval);
    if (slides.length > 1) {
        autoSlide();
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    loadSliderData();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            if (slides.length > 1) {
                autoSlide();
            }
        });
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});
