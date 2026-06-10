// ========================
// FILTRADO DE GALERÍA
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtrar items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Animación de entrada
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// Animación CSS para fade in
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
        
        // Solo prevenir si es un enlace interno
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Cerrar menú móvil si está abierto (para futuros expandibles)
            closeNav();
        }
    });
});

// ========================
// BOTÓN CTA EN HEADER
// ========================

const ctaHeader = document.querySelector('.cta-header');
if (ctaHeader) {
    ctaHeader.addEventListener('click', function() {
        window.open('https://wa.me/528332366963?text=Hola!%20Me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios%20de%20XV%20a%C3%B1os', '_blank');
    });
}

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

// Observar elementos para animación
document.querySelectorAll('.package-card, .process-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================
// FUNCIONES AUXILIARES
// ========================

function closeNav() {
    // Función vacía para expansión futura
}

// ========================
// TRACKING Y ANALYTICS (Opcional)
// ========================

// Rastrear clics en botones de WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        // Aquí puedes agregar analytics si lo deseas
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

// Precargar imágenes hero
preloadImages(['hero-01.jpg', 'hero-02.jpg', 'about-01.jpg']);

// ========================
// VALIDACIÓN DE ENLACES
// ========================

// Asegurar que los enlaces de redes sociales se abren en nueva pestaña
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
        // Opcional: mostrar imagen de fallback
        // this.src = 'fallback-image.jpg';
    });
});

// ========================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ========================

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar comportamiento en móvil si es necesario
if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
}

// ========================
// CONTADOR DE VISITAS (Opcional - requiere backend)
// ========================

// Descomentar si quieres agregar tracking básico
/*
function trackVisit() {
    fetch('/api/track-visit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            timestamp: new Date(),
            userAgent: navigator.userAgent
        })
    }).catch(err => console.log('Tracking error:', err));
}

trackVisit();
*/