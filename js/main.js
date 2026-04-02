// ===== PORTFOLIO JAVASCRIPT =====

// Verberg de loading screen zodra alle assets (incl. images) geladen zijn.
window.addEventListener('load', () => {
    // Zoek de loader op elke pagina; als hij niet bestaat stoppen we direct.
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) {
        return;
    }

    // Start fade-out transitie via CSS class.
    loadingScreen.classList.add('hidden');

    // Verwijder de node na de animatie om onnodige DOM-elementen te vermijden.
    setTimeout(() => {
        loadingScreen.remove();
    }, 400);
});

// Initialiseer scroll-animaties zodra de DOM beschikbaar is.
document.addEventListener('DOMContentLoaded', () => {
    // Alle elementen die een reveal-animatie krijgen bij in beeld komen.
    const animatedElements = document.querySelectorAll('.feature-card, .project-card, .about-card, .skills-section');

    // Als de pagina geen geanimeerde blokken heeft, hoeven we geen observer te maken.
    if (!animatedElements.length) {
        return;
    }

    // IntersectionObserver triggert animatie wanneer element in viewport komt.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Zet zichtbaar en reset de begin-offset die in CSS/JS gebruikt wordt.
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Observeer dit element niet langer voor betere performance.
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Minimaal 20% zichtbaar voordat animatie start.
        threshold: 0.2,

        // Start iets eerder, zodat animatie al begint net voordat het midden in beeld is.
        rootMargin: '0px 0px -100px 0px'
    });

    // Registreer elk element bij de observer.
    animatedElements.forEach((element) => observer.observe(element));
});
