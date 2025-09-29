document.addEventListener('DOMContentLoaded', () => {
    // --- Ganti nama file ini sesuai dengan file foto yang Anda miliki ---
    const photoFiles = [
        'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg',
        'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg'
    ];

    // ... (kode variabel lainnya sama) ...
    const playButton = document.getElementById('play-button');
    const startScreen = document.getElementById('start-screen');
    const greetingSection = document.getElementById('greeting-section');
    const audio = document.getElementById('background-music');
    const visualWrapper = document.querySelector('.visual-wrapper');
    const galleryBtnContainer = document.getElementById('gallery-button-container');
    const showGalleryButton = document.getElementById('show-gallery-button');
    const sliderContainer = document.getElementById('gallery-slider-container');
    const galleryTrack = document.getElementById('gallery-track');
    const backgroundPhotosDivs = document.querySelectorAll('.background-photos');
    let slides = [];
    let currentSlideIndex = 0;

    playButton.addEventListener('click', () => {
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
        backgroundPhotosDivs.forEach(div => {
            if(div.innerHTML !== "") return;
            allBgPhotos.forEach(fileName => {
                const img = document.createElement('img');
                img.src = fileName;
                img.classList.add('bg-photo');
                div.appendChild(img);
            });
        });
    }

    // Fungsi untuk memulai galeri foto besar
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

                // --- BUAT ELEMEN UNTUK EFEK LOVE BURST ---
                const loveOverlay = document.createElement('div');
                loveOverlay.classList.add('love-burst-overlay');
                for (let i = 0; i < 4; i++) { // Buat 4 hati
                    const heart = document.createElement('div');
                    heart.classList.add('burst-heart');
                    heart.innerHTML = '💖';
                    loveOverlay.appendChild(heart);
                }
                slide.appendChild(loveOverlay);

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

    // Fungsi untuk menampilkan slide besar
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active', 'previous'));
        const activeSlide = slides[index];
        const prevIndex = (index === 0) ? slides.length - 1 : index - 1;
        slides[prevIndex].classList.add('previous');
        activeSlide.classList.add('active');

        // --- PICU ANIMASI LOVE BURST ---
        const loveOverlay = activeSlide.querySelector('.love-burst-overlay');
        if (loveOverlay) {
            loveOverlay.classList.remove('animate'); // Reset
            // Paksa reflow agar animasi bisa diputar ulang
            void loveOverlay.offsetWidth; 
            loveOverlay.classList.add('animate');
        }

        if (index === 0) {
            const caption = activeSlide.querySelector('.photo-caption');
            if (caption) {
                caption.classList.remove('fade-in-up', 'fade-out');
                setTimeout(() => caption.classList.add('fade-in-up'), 500);
                setTimeout(() => caption.classList.add('fade-out'), 4500);
            }
        }
    }

    // Fungsi untuk membuat hati bergerak
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
