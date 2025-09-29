document.addEventListener('DOMContentLoaded', () => {
    // ... (kode variabel lainnya sama) ...
    const photoFiles = [
        'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg',
        'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg'
    ];
    const playButton = document.getElementById('play-button');
    const startScreen = document.getElementById('start-screen');
    const greetingSection = document.getElementById('greeting-section');
    const audio = document.getElementById('background-music');
    const visualWrapper = document.querySelector('.visual-wrapper');
    const galleryBtnContainer = document.getElementById('gallery-button-container');
    const showGalleryButton = document.getElementById('show-gallery-button');
    const sliderContainer = document.getElementById('gallery-slider-container');
    const galleryTrack = document.getElementById('gallery-track');
    let slides = [];
    let currentSlideIndex = 0;

    // --- PERUBAHAN DI SINI ---
    // Pilih SEMUA elemen .background-photos, bukan hanya satu
    const backgroundPhotosDivs = document.querySelectorAll('.background-photos');

    playButton.addEventListener('click', () => {
        // ... (kode di dalam fungsi ini sama) ...
        startScreen.style.display = 'none';
        greetingSection.style.display = 'flex';
        audio.play();
        setInterval(createVisual, 500);
        setupBackgroundPhotos();
        setTimeout(() => {
            galleryBtnContainer.style.display = 'block';
        }, 1000);
    });
    
    showGalleryButton.addEventListener('click', startGallery);

    function setupBackgroundPhotos() {
        const allBgPhotos = Array(10).fill([...photoFiles]).flat();
        
        // --- PERUBAHAN DI SINI ---
        // Loop untuk mengisi SETIAP baris foto
        backgroundPhotosDivs.forEach(div => {
            allBgPhotos.forEach(fileName => {
                const img = document.createElement('img');
                img.src = fileName;
                img.classList.add('bg-photo');
                div.appendChild(img);
            });
        });
    }

    // ... (Fungsi startGallery, showSlide, createVisual tidak ada perubahan) ...
    function startGallery() {
        greetingSection.style.display = 'none';
        sliderContainer.style.display = 'block';
        if (slides.length === 0) {
            photoFiles.forEach((fileName, index) => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                const img = document.createElement('img');
                img.src = fileName;
                img.classList.add('gallery-photo');
                slide.appendChild(img);
                if (index === 0) {
                    const caption = document.createElement('div');
                    caption.classList.add('photo-caption');
                    caption.innerText = 'tunggu sayang ini foto nya bergulir otomatis, jadiii jangan keluar dulu yaa';
                    slide.appendChild(caption);
                }
                galleryTrack.appendChild(slide);
                slides.push(slide);
            });
        }
        showSlide(currentSlideIndex);
        setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }, 5500);
    }
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        const activeSlide = slides[index];
        activeSlide.classList.add('active');
        if (index === 0) {
            const caption = activeSlide.querySelector('.photo-caption');
            if (caption) {
                caption.classList.remove('fade-in-up', 'fade-out');
                setTimeout(() => caption.classList.add('fade-in-up'), 500);
                setTimeout(() => caption.classList.add('fade-out'), 4500);
            }
        }
    }
    function createVisual() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 7 + 's';
        visualWrapper.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 10000);
    }
});