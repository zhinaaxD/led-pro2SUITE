document.addEventListener('DOMContentLoaded', () => {
    // Optimisation du chargement des images
    const productImages = document.querySelectorAll('.product-image');
    
    const loadImage = (image) => {
        image.classList.add('loaded');
    };

    // Observer pour le lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    productImages.forEach(image => {
        imageObserver.observe(image);
    });
});
