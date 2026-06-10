// ========================
// VARIABLES GLOBALES
// ========================

let currentType = 'senoritas';  // Tipo seleccionado por defecto
let currentFilter = 'default';  // Filtro seleccionado por defecto

// ========================
// FILTRADO DE DOS NIVELES
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const typeFilterButtons = document.querySelectorAll('.type-filter-btn');
    const categoryFilterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const presesionFilterBtn = document.getElementById('presesion-filter');

    // Filtros de tipo (Señoritas / Jóvenes)
    typeFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentType = this.getAttribute('data-type');
            
            // Actualizar botones activos
            typeFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Mostrar/Ocultar botón "Presesión" según el tipo
            if (currentType === 'jovenes') {
                presesionFilterBtn.style.display = 'none';
            } else {
                presesionFilterBtn.style.display = 'inline-block';
            }

            // Resetear filtro de categoría a "Por defecto"
            currentFilter = 'default';
            categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="default"]').classList.add('active');

            // Aplicar filtros
            updateGallery();
        });
    });

    // Filtros de categoría (Casual / Formal / Presesión)
    categoryFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            
            // Actualizar botones activos
            categoryFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Aplicar filtros
            updateGallery();
        });
    });

    // Función para actualizar la galería
    function updateGallery() {
        galleryItems.forEach(item => {
            const itemType = item.getAttribute('data-type');
            const itemCategory = item.getAttribute('data-category');
            const isDefault = item.getAttribute('data-default') === 'true';

            let shouldShow = false;

            // Si el tipo coincide
            if (itemType === currentType) {
                // Si el filtro es "por defecto", mostrar solo los items marcados con data-default
                if (currentFilter === 'default') {
                    shouldShow = isDefault;
                } 
                // Si el filtro es una categoría específica, mostrar todos los de esa categoría
                else if (itemCategory === currentFilter) {
                    shouldShow = true;
                }
            }

            // Mostrar u ocultar item
            if (shouldShow) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Inicializar galería con valores por defecto
    updateGallery();
});

// ========================
// MODAL DE IMAGEN AMPLIADA
// ========================

const imageModal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const closeBtn = document.querySelector('.close');

// Abrir modal al hacer click en una imagen
document.querySelectorAll('.gallery-item:not(.hidden) img').forEach(img => {
    img.parentElement.addEventListener('click', function() {
        // Evitar abrir modal si el item está oculto
        if (!this.classList.contains('hidden')) {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            modalImage.src = imgSrc;
            modalImage.alt = imgAlt;
            imageModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Re-agregar listeners cuando se actualiza la galería
function addImageModalListeners() {
    document.querySelectorAll('.gallery-item:not(.hidden) img').forEach(img => {
        img.parentElement.addEventListener('click', function() {
            if (!this.classList.contains('hidden')) {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                modalImage.src = imgSrc;
                modalImage.alt = imgAlt;
                imageModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Cerrar modal
closeBtn.addEventListener('click', closeModal);
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        closeModal();
    }
});

function closeModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========================
// ANIMACIÓN CSS FADE IN
// ========================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ========================
// NAVEGACIÓN SUAVE
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================
// SCROLL ANIMATIONS
// ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.package-card, .process-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================
// RASTREO DE CLICS
// ========================

document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Usuario haciendo clic en WhatsApp:', this.href);
    });
});

// ========================
// PRECARGA DE IMÁGENES
// ========================

function preloadImages(imageArray) {
    imageArray.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

preloadImages(['assets/images/hero-01.jpg', 'assets/images/hero-02.jpg', 'assets/images/about-01.jpg']);

// ========================
// VALIDACIÓN DE ENLACES
// ========================

document.querySelectorAll('a[href*="instagram"], a[href*="facebook"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ========================
// MANEJO DE ERRORES DE IMÁGENES
// ========================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Imagen no encontrada:', this.src);
    });
});

// ========================
// DETECCIÓN DE DISPOSITIVO
// ========================

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
}