// ============================================
// FOTOSHOT - LANDING PAGE XV AÑOS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================
    // MODAL DE GALERÍA POR TIRAS DE FOTOS
    // Cada .photo-strip es una galería independiente.
    // Al abrir una foto, se navega solo entre las
    // fotos de ESA tira.
    // ========================

    let visibleImages = [];      // fotos de la tira actualmente abierta
    let currentImageIndex = 0;

    const imageModal = document.getElementById('imageModal');
    const modalImage = document.querySelector('.modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const currentImageSpan = document.querySelector('.current-image');
    const totalImagesSpan = document.querySelector('.total-images');

    // Delegación de eventos en cada tira de fotos
    document.querySelectorAll('.photo-strip').forEach(strip => {
        strip.addEventListener('click', function (e) {
            const item = e.target.closest('.strip-item');
            if (!item) return;

            // Las imágenes navegables son solo las de esta tira
            visibleImages = Array.from(strip.querySelectorAll('.strip-item'));
            currentImageIndex = visibleImages.indexOf(item);
            if (currentImageIndex === -1) return;

            openModal();
        });
    });

    function openModal() {
        showImage(currentImageIndex);
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function showImage(index) {
        const img = visibleImages[index].querySelector('img');

        modalImage.classList.add('changing');
        setTimeout(() => {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalImage.classList.remove('changing');
        }, 120);

        currentImageSpan.textContent = index + 1;
        totalImagesSpan.textContent = visibleImages.length;
        updateNavButtons();
    }

    function updateNavButtons() {
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === visibleImages.length - 1;
    }

    function showNextImage() {
        if (currentImageIndex < visibleImages.length - 1) {
            currentImageIndex++;
            showImage(currentImageIndex);
        }
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showImage(currentImageIndex);
        }
    }

    function closeModal() {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showPrevImage();
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showNextImage();
    });

    closeBtn.addEventListener('click', closeModal);

    imageModal.addEventListener('click', function (e) {
        if (e.target === imageModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!imageModal.classList.contains('show')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Swipe en móvil
    let touchStartX = 0;
    modalImage.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modalImage.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) showNextImage();
            else showPrevImage();
        }
    }, { passive: true });

    // ========================
    // NAVEGACIÓN SUAVE (anclas)
    // ========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================
    // SCROLL ANIMATIONS
    // ========================

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.package-card, .video-card-v, .video-card-h, .subsection').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================
    // ENLACES EXTERNOS
    // ========================

    document.querySelectorAll('a[href*="instagram"], a[href*="facebook"], a[href*="youtube"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // ========================
    // MANEJO DE ERRORES DE IMÁGENES
    // ========================

    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            console.warn('Imagen no encontrada:', this.src);
        });
    });
});