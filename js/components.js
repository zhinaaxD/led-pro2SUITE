// Gestion des composants réutilisables
document.addEventListener('alpine:init', () => {
    // Composant Header
    Alpine.data('siteHeader', () => ({
        mobileMenuOpen: false,
        async init() {
            // Charger le contenu du header
            const response = await fetch('/components/header.html');
            const html = await response.text();
            this.$el.innerHTML = html;
        }
    }));

    // Composant Footer
    Alpine.data('siteFooter', () => ({
        currentYear: new Date().getFullYear(),
        async init() {
            // Charger le contenu du footer
            const response = await fetch('/components/footer.html');
            const html = await response.text();
            // Remplacer l'année dans le footer
            const updatedHtml = html.replace('2025', this.currentYear);
            this.$el.innerHTML = updatedHtml;
        }
    }));
});
