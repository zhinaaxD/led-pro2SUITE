// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        disable: window.innerWidth < 768
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero background animation
const initHeroAnimation = () => {
    gsap.to("#hero-animation", {
        backgroundPosition: "200% 50%",
        duration: 20,
        ease: "none",
        repeat: -1
    });
};

// Product cards animation
const initProductAnimations = () => {
    gsap.utils.toArray(".product-card").forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });
};

// Lazy loading for images
const initLazyLoading = () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
};

// Alpine.js store
document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        mobileMenuOpen: false,
        scrolled: false,
        
        init() {
            window.addEventListener('scroll', () => {
                this.scrolled = window.pageYOffset > 20;
            });
        },
        
        toggleMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        }
    });
});

// Initialize all
window.addEventListener('load', () => {
    initHeroAnimation();
    initProductAnimations();
    initLazyLoading();
});
