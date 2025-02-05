document.addEventListener('alpine:init', () => {
    Alpine.data('categoriesSlider', () => ({
        currentOffset: 0,
        cardWidth: 320 + 24, // card width + gap
        containerWidth: 0,
        totalWidth: 0,
        atStart: true,
        atEnd: false,

        init() {
            this.containerWidth = this.$el.querySelector('.overflow-hidden').offsetWidth;
            this.totalWidth = this.$el.querySelector('.flex').offsetWidth;
            this.updateNavigation();

            window.addEventListener('resize', () => {
                this.containerWidth = this.$el.querySelector('.overflow-hidden').offsetWidth;
                this.updateNavigation();
            });
        },

        next() {
            const maxOffset = this.totalWidth - this.containerWidth;
            this.currentOffset = Math.min(this.currentOffset + this.cardWidth, maxOffset);
            this.updateNavigation();
        },

        previous() {
            this.currentOffset = Math.max(this.currentOffset - this.cardWidth, 0);
            this.updateNavigation();
        },

        updateNavigation() {
            this.atStart = this.currentOffset === 0;
            this.atEnd = this.currentOffset >= this.totalWidth - this.containerWidth;
        }
    }));
});
