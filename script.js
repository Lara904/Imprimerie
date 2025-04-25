const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const carouselContainer = document.querySelector('.carousel-container');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let autoSlideInterval;
let isPaused = false;

// Fonction pour mettre à jour le carrousel
function updateCarousel() {
    const slideWidth = carouselContainer.clientWidth;
    slide.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

    // Marquer l'image visible avec aria-live
    images.forEach((img, index) => {
        if (index === currentIndex) {
            img.setAttribute('aria-live', 'polite');
        } else {
            img.removeAttribute('aria-live');
        }
    });
}

// Navigation suivante
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= images.length) currentIndex = 0;
    updateCarousel();
});

// Navigation précédente
prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = images.length - 1;
    updateCarousel();
});

// Fonction pour lancer le défilement automatique
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!isPaused) {
            currentIndex++;
            if (currentIndex >= images.length) currentIndex = 0;
            updateCarousel();
        }
    }, 4000);
}

// Pause au hover
carouselContainer.addEventListener('mouseenter', () => {
    isPaused = true;
});

carouselContainer.addEventListener('mouseleave', () => {
    isPaused = false;
});

// Recalcul dynamique si la taille de la fenêtre change
window.addEventListener('resize', updateCarousel);

// Initialisation au chargement
window.addEventListener('load', () => {
    updateCarousel();
    startAutoSlide();
});

// Améliorations d'accessibilité
nextBtn.setAttribute('tabindex', '0');
prevBtn.setAttribute('tabindex', '0');
nextBtn.setAttribute('aria-label', 'Image suivante');
prevBtn.setAttribute('aria-label', 'Image précédente');