document.addEventListener('DOMContentLoaded', () => {
    // --- Ganti nama file ini sesuai dengan file foto yang Anda miliki ---
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
    const backgroundPhotosDivs = document.querySelectorAll('.background-photos');
    const backToMenuButton = document.getElementById('back-to-menu-button');
    let slides = [];
    let currentSlideIndex = 0;
    let galleryInterval;
    let visualHeartsInterval; // Variabel baru untuk interval hati terbang

    playButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        greetingSection.style.display = 'flex';
        audio.play().catch(e => console.log("Audio play failed"));
        
        // Mulai interval hati terbang untuk layar awal dan sapaan
        if (visualHeartsInterval) clearInterval(visualHeartsInterval); // Hapus interval lama jika ada
        visualHeartsInterval = setInterval(createVisual, 800); 
        
        setupBackgroundPhotos();
        setTimeout(() => {
            galleryBtnContainer.style.display = 'block';
        }, 1000);
    });
    
    showGalleryButton.addEventListener('click', startGallery);

    backToMenuButton.addEventListener('click', () => {
        clearInterval(galleryInterval);
        sliderContainer.style.display = 'none';
        greetingSection.style.display = 'flex';
        currentSlideIndex = 0;
        
        // Lanjutkan hati terbang saat kembali ke greeting section
        if (visualHeartsInterval) clearInterval(visualHeartsInterval);
        visualHeartsInterval = setInterval(createVisual, 800);
    });

    function setupBackgroundPhotos() {
        const allBgPhotos = Array(10).fill([...photoFiles]).flat();
        backgroundPhotosDivs.forEach(div => {
            if(div.hasChildNodes()) return;
            allBgPhotos.forEach(fileName => {
                const img = document.createElement('img');
                img.src = fileName;
                img.classList.add('bg-photo');
                div.appendChild(img);
            });
        });
    }

    function startGallery() {
        greetingSection.style.display = 'none';
        sliderContainer.style.display = 'block';
        
        // Hentikan hati terbang dari visualWrapper saat galeri aktif
        if (visualHeartsInterval) clearInterval(visualHeartsInterval);

        if (slides.length === 0) {
            photoFiles.forEach((fileName, index) => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                const img = document.createElement('img');
                img.src = fileName;
                img.classList.add('gallery-photo');
                slide.appendChild(img);

                const loveOverlay = document.createElement('div');
                loveOverlay.classList.add('love-burst-container');
                for (let i = 0; i < 5; i++) {
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
        
        clearInterval(galleryInterval);
        galleryInterval = setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }, 5500);
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active', 'previous'));
        
        const activeSlide = slides[index];
        const prevIndex = (index === 0) ? slides.length - 1 : index - 1;
        
        slides[prevIndex].classList.add('previous');
        activeSlide.classList.add('active');

        // Logic untuk efek hati terbang khusus di galeri
        if (index === 0 || index === 1) { // Hanya untuk foto 1 (index 0) dan foto 2 (index 1)
            // Pastikan tidak ada duplikasi interval jika sudah berjalan
            if (!activeSlide.hasAttribute('data-heart-interval')) {
                const heartIntervalId = setInterval(() => createHeartForSlide(activeSlide), 800);
                activeSlide.setAttribute('data-heart-interval', heartIntervalId);
            }
        } else {
            // Hentikan dan hapus hati terbang untuk slide lainnya
            slides.forEach((s, idx) => {
                if (idx !== 0 && idx !== 1 && s.hasAttribute('data-heart-interval')) {
                    clearInterval(parseInt(s.getAttribute('data-heart-interval')));
                    s.removeAttribute('data-heart-interval');
                    s.querySelectorAll('.slide-heart').forEach(h => h.remove()); // Hapus hati yang masih ada
                }
            });
            // Pastikan hati terbang dari visualWrapper juga tidak muncul di slide 3-10
            visualWrapper.querySelectorAll('.heart').forEach(h => h.remove());
            if (visualHeartsInterval) clearInterval(visualHeartsInterval);
        }

        const loveOverlay = activeSlide.querySelector('.love-burst-container');
        if (loveOverlay) {
            loveOverlay.classList.remove('animate');
            void loveOverlay.offsetWidth; // Trigger reflow
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

    // Fungsi untuk membuat hati terbang umum (untuk start screen dan greeting)
    function createVisual() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 7) + 's';
        visualWrapper.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 12000);
    }

    // Fungsi baru untuk membuat hati terbang khusus di dalam slide
    function createHeartForSlide(slideElement) {
        const heart = document.createElement('div');
        heart.classList.add('heart', 'slide-heart'); // Tambahkan class 'slide-heart'
        heart.innerText = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 7) + 's';
        slideElement.appendChild(heart); // Tambahkan hati ke dalam slide aktif
        setTimeout(() => { heart.remove(); }, 12000);
    }
});
