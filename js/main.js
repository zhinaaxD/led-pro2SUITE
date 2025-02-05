// Main JavaScript file for LED Pro website

// Initialize AOS with optimized settings
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load GSAP only when needed
    const loadGSAP = () => {
        if (typeof gsap === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js';
            script.onload = () => {
                gsap.registerPlugin(ScrollTrigger);
                initGSAPAnimations();
            };
            document.head.appendChild(script);
        }
    };

    // Initialize AOS with performance optimizations
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        disable: window.innerWidth < 768,
        startEvent: 'load'
    });

    // Load GSAP after initial page render
    requestIdleCallback(() => loadGSAP());
});

// GSAP Animations
function initGSAPAnimations() {
    // Categories slider component
    Alpine.data('categoriesSlider', () => ({
        currentIndex: 0,
        autoRotateInterval: null,
        isHovered: false,
        
        init() {
            this.startAutoRotate();
            this.setupResizeListener();
            this.initGSAPAnimations();
        },

        initGSAPAnimations() {
            gsap.set("[data-animate]", { opacity: 0, y: 20 });
            
            ScrollTrigger.batch("[data-animate]", {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                }),
                once: true
            });

            // Optimisation des performances
            ScrollTrigger.config({ limitCallbacks: true });
            gsap.config({ nullTargetWarn: false });
        },

        startAutoRotate() {
            if (!this.isHovered) {
                this.autoRotateInterval = setInterval(() => {
                    this.next();
                }, 5000);
            }
        },

        stopAutoRotate() {
            if (this.autoRotateInterval) {
                clearInterval(this.autoRotateInterval);
                this.autoRotateInterval = null;
            }
        },

        handleMouseEnter() {
            this.isHovered = true;
            this.stopAutoRotate();
        },

        handleMouseLeave() {
            this.isHovered = false;
            this.startAutoRotate();
        },

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
            this.updateSliderPosition();
        },

        previous() {
            this.currentIndex = this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
            this.updateSliderPosition();
        },

        get totalSlides() {
            return document.querySelectorAll('.category-slide').length;
        },

        updateSliderPosition() {
            const slider = document.querySelector('.categories-slider');
            if (slider) {
                const slideWidth = slider.querySelector('.category-slide').offsetWidth;
                gsap.to(slider, {
                    x: -this.currentIndex * slideWidth,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        },

        setupResizeListener() {
            const debouncedResize = debounce(() => {
                this.updateSliderPosition();
            }, 250);

            window.addEventListener('resize', debouncedResize, { passive: true });
        }
    }));

    // Product card component
    Alpine.data('productCard', () => ({
        init() {
            this.initHoverEffect();
        },

        initHoverEffect() {
            gsap.utils.toArray('.product-card').forEach(card => {
                const image = card.querySelector('img');
                const content = card.querySelector('.card-content');

                card.addEventListener('mouseenter', () => {
                    gsap.to(image, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    gsap.to(content, {
                        y: -5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    gsap.to(content, {
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        }
    }));
}

// Initialize Alpine.js components and stores
document.addEventListener('alpine:init', () => {
    // Global app store
    Alpine.store('app', {
        mobileMenuOpen: false,
        scrolled: false,
        darkMode: localStorage.getItem('darkMode') === 'true',
        
        init() {
            this.initScrollHandler();
            this.initLazyLoading();
            this.initDarkMode();
            this.initMobileMenu();
        },

        initScrollHandler() {
            window.addEventListener('scroll', () => {
                this.scrolled = window.pageYOffset > 20;
                this.updateHeaderVisibility();
            }, { passive: true });
        },
        
        initDarkMode() {
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
            }
        },

        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode);
            document.documentElement.classList.toggle('dark');
        },
        
        toggleMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuButton = document.getElementById('mobile-menu-button');

            if (mobileMenu && mobileMenuButton) {
                mobileMenu.classList.toggle('active', this.mobileMenuOpen);
                mobileMenuButton.setAttribute('aria-expanded', this.mobileMenuOpen);
                mobileMenu.setAttribute('aria-hidden', !this.mobileMenuOpen);
                document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
            }
        },

        updateHeaderVisibility() {
            const header = document.querySelector('header');
            if (header) {
                if (this.scrolled) {
                    header.classList.add('bg-white/95', 'backdrop-blur-sm', 'dark:bg-gray-900/95');
                    header.classList.remove('bg-white', 'dark:bg-gray-900');
                } else {
                    header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'dark:bg-gray-900/95');
                    header.classList.add('bg-white', 'dark:bg-gray-900');
                }
            }
        },

        initLazyLoading() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        
                        if (!src) return;

                        // Préchargement de l'image
                        const preloadImage = new Image();
                        preloadImage.onload = () => {
                            img.src = src;
                            img.removeAttribute('data-src');
                            img.classList.add('animate-fade-in');
                        };
                        preloadImage.onerror = () => {
                            console.warn(`Impossible de charger l'image: ${src}`);
                            img.classList.add('image-error');
                        };
                        preloadImage.src = src;
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => imageObserver.observe(img));
        },

        initMobileMenu() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.querySelector('.mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');

                mobileMenuButton.addEventListener('click', () => {
                    this.toggleMenu();
                });

                // Fermer le menu en cliquant en dehors
                document.addEventListener('click', (event) => {
                    if (this.mobileMenuOpen && 
                        !mobileMenuButton.contains(event.target) && 
                        !mobileMenu.contains(event.target)) {
                        this.toggleMenu();
                    }
                });

                // Fermer le menu avec la touche Escape
                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape' && this.mobileMenuOpen) {
                        this.toggleMenu();
                    }
                });
            }
        }
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.classList.add('aos-animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Initialize GSAP animations
    gsap.from('.hero-content', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.hero-image', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });
});
