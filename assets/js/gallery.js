// Gallery-specific JavaScript

class Gallery {
    constructor() {
        this.currentFilter = 'all';
        this.items = galleryData;
    }

    filter(category) {
        this.currentFilter = category;
        if (category === 'all') {
            return this.items;
        }
        return this.items.filter(item => item.category === category);
    }

    getItem(id) {
        return this.items.find(item => item.id === id);
    }

    getNextItem(currentId) {
        const filtered = this.filter(this.currentFilter);
        const currentIndex = filtered.findIndex(item => item.id === currentId);
        return filtered[(currentIndex + 1) % filtered.length];
    }

    getPreviousItem(currentId) {
        const filtered = this.filter(this.currentFilter);
        const currentIndex = filtered.findIndex(item => item.id === currentId);
        return filtered[(currentIndex - 1 + filtered.length) % filtered.length];
    }

    sort(by = 'title') {
        return [...this.items].sort((a, b) => {
            if (by === 'title') {
                return a.title.localeCompare(b.title);
            }
            if (by === 'artist') {
                return a.artist.localeCompare(b.artist);
            }
            return 0;
        });
    }
}

const gallery = new Gallery();

// Event delegation for gallery items
document.addEventListener('click', (e) => {
    if (e.target.closest('.gallery-item')) {
        const item = e.target.closest('.gallery-item');
        const itemId = parseInt(item.dataset.id);
        openLightbox(itemId);
    }
});
