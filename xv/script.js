// ============================================
// FOTOSHOT - LANDING PAGE XV AÑOS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================
    // VARIABLES GLOBALES
    // ========================

    let currentType = 'senoritas';   // Tipo seleccionado por defecto
    let currentFilter = 'default';   // Filtro seleccionado por defecto
    let visibleImages = [];          // Lista de imágenes visibles según filtros
    let currentImageIndex = 0;       // Índice de la imagen abierta en el modal

    const typeFilterButtons = document.querySelectorAll('.type-filter-btn');
    const categoryFilterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryGrid = document.querySelector('.gallery-grid');
    const presesionFilterBtn = document.getElementById('presesion-filter');

    const imageModal = document.getElementById('imageModal');
    const modalImage = document.querySelector('.modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const currentImageSpan = document.querySelector('.current-image');
    const totalImagesSpan = document.querySelector('.total-images');

    // ========================
    // FILTRADO DE DOS NIVELES
    // ========================

    // Filtros de tipo (Señoritas / Jóvenes)
    typeFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentType = this.getAttribute('data-type');

            typeFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Mostrar/Ocultar botón "Presesión" según el tipo
            if (presesionFilterBtn) {
                presesionFilterBtn.style.display = (currentType === 'jovenes') ? 'none' : 'inline-block';
            }

            // Resetear filtro de categoría a "Por defecto"
            currentFilter = 'default';
            categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="default"]').classList.add('active');

            updateGallery();
        });
    });

    // Filtros de categoría (Por defecto / Casual / Formal / Presesión)
    categoryFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentFilter = this.getAttribute('data-filter');

            categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            updateGallery();
        });
    });

    // Función para actualizar la galería según los filtros
    function updateGallery() {
        galleryItems.forEach(item => {
            const itemType = item.getAttribute('data-type');
            const itemCategory = item.getAttribute('data-category');
            const isDefault = item.getAttribute('data-default') === 'true';

            let shouldShow = false;

            if (itemType === currentType) {
                if (currentFilter === 'default') {
                    shouldShow = isDefault;
                } else if (itemCategory === currentFilter) {
                    shouldShow = true;
                }
            }

            if (shouldShow) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        refreshVisibleImages();
    }

    // Reconstruir lista de imágenes visibles (en orden visual)
    function refreshVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    }

    // ========================
    // MODAL CON NAVEGACIÓN
    // (delegación de eventos: SIEMPRE funciona,
    //  sin importar cuántas veces cambien los filtros)
    // ========================

    galleryGrid.addEventListener('click', function (e) {
        const item = e.target.closest('.gallery-item');
        if (!item || item.classList.contains('hidden')) return;

        refreshVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        if (currentImageIndex === -1) return;

        openModal();
    });

    function openModal() {
        showImage(currentImageIndex);
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function showImage(index) {
        const img = visibleImages[index].querySelector('img');

        // Pequeña transición de fade entre imágenes
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

    // Listeners del modal
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
        // Cerrar solo si se hace click en el fondo oscuro
        if (e.target === imageModal) {
            closeModal();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (!imageModal.classList.contains('show')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Navegación táctil (swipe) en móvil
    let touchStartX = 0;
    modalImage.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modalImage.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) showNextImage();   // Swipe izquierda → siguiente
            else showPrevImage();            // Swipe derecha → anterior
        }
    }, { passive: true });

    // ========================
    // INICIALIZAR GALERÍA
    // ========================

    updateGallery();

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
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.package-card, .process-card, .about-card').forEach(el => {
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