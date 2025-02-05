// Wait for Alpine.js to be ready
document.addEventListener('alpine:init', () => {
    Alpine.data('heroSlider', () => ({
        currentSlide: 0,
        autoplayInterval: null,
        slides: [
            {
                image: './images/hero-1.jpg',
                title: 'Éclairez votre avenir',
                description: 'Solutions LED professionnelles pour tous vos projets',
                ctaText: 'Découvrir nos produits',
                ctaLink: '#bestsellers',
                alt: 'Solutions d\'éclairage LED professionnelles'
            },
            {
                image: './images/hero-2.jpg',
                title: 'Innovation LED',
                description: 'Technologies avancées pour un éclairage optimal',
                ctaText: 'Télécharger le catalogue',
                ctaLink: '#catalogue',
                alt: 'Technologies LED innovantes'
            },
            {
                image: './images/hero-3.jpg',
                title: 'Économies d\'énergie',
                description: 'Jusqu\'à 80% d\'économie sur votre éclairage',
                ctaText: 'Demander un devis',
                ctaLink: '#contact',
                alt: 'Économies d\'énergie avec LED'
            }
        ],

        init() {
            // Vérification de la validité des slides
            if (!Array.isArray(this.slides) || this.slides.length === 0) {
                console.error('Erreur: Aucune slide n\'est définie');
                return;
            }

            // Démarrage de l'autoplay
            this.startAutoplay();

            // Gestion des événements clavier
            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });

            // Arrêt de l'autoplay au survol
            const sliderElement = document.querySelector('[x-data="heroSlider"]');
            if (sliderElement) {
                sliderElement.addEventListener('mouseenter', () => this.stopAutoplay());
                sliderElement.addEventListener('mouseleave', () => this.startAutoplay());
            }
        },

        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        },

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        },

        nextSlide() {
            try {
                if (!Array.isArray(this.slides) || this.slides.length === 0) {
                    throw new Error('Aucune slide disponible');
                }
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            } catch (error) {
                console.error('Erreur lors du changement de slide:', error);
            }
        },

        prevSlide() {
            try {
                if (!Array.isArray(this.slides) || this.slides.length === 0) {
                    throw new Error('Aucune slide disponible');
                }
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            } catch (error) {
                console.error('Erreur lors du changement de slide:', error);
            }
        },

        goToSlide(index) {
            try {
                if (!Array.isArray(this.slides) || this.slides.length === 0) {
                    throw new Error('Aucune slide disponible');
                }
                if (index < 0 || index >= this.slides.length) {
                    throw new Error('Index de slide invalide');
                }
                this.currentSlide = index;
            } catch (error) {
                console.error('Erreur lors du changement de slide:', error);
            }
        }
    }));

    Alpine.data('slider', () => ({
        currentSlide: 0,
        slides: [
            {
                image: 'https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg',
                title: 'Professional LED Solutions',
                description: 'Illuminate your space with our premium LED lighting solutions'
            },
            {
                image: 'https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg',
                title: 'Energy Efficient Lighting',
                description: 'Save energy and reduce costs with our LED technology'
            },
            {
                image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg',
                title: 'Custom Lighting Design',
                description: 'Create the perfect ambiance with our customizable lighting options'
            }
        ],
        autoplayInterval: null,

        init() {
            this.startAutoplay();
        },

        startAutoplay() {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        },

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
        },

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        },

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        },

        goToSlide(index) {
            this.currentSlide = index;
        }
    }));
});
