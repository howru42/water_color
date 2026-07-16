// Lightbox Functionality

class Lightbox {
    constructor() {
        this.currentItemId = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    open(itemId) {
        this.currentItemId = itemId;
        this.isOpen = true;
        this.render();
    }

    close() {
        this.isOpen = false;
        this.currentItemId = null;
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }

    next() {
        if (!this.currentItemId) return;
        const nextItem = gallery.getNextItem(this.currentItemId);
        if (nextItem) {
            this.open(nextItem.id);
        }
    }

    previous() {
        if (!this.currentItemId) return;
        const prevItem = gallery.getPreviousItem(this.currentItemId);
        if (prevItem) {
            this.open(prevItem.id);
        }
    }

    render() {
        const item = gallery.getItem(this.currentItemId);
        if (!item) return;

        const lightbox = document.getElementById('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close" onclick="lightboxInstance.close()">&times;</span>
                <button class="lightbox-prev" onclick="lightboxInstance.previous()">&#10094;</button>
                <img src="${item.image}" alt="${item.title}" class="lightbox-image">
                <button class="lightbox-next" onclick="lightboxInstance.next()">&#10095;</button>
                <div class="lightbox-info">
                    <h2>${item.title}</h2>
                    <p class="lightbox-artist">by ${item.artist}</p>
                    <p class="lightbox-description">${item.description}</p>
                </div>
            </div>
        `;
        lightbox.classList.add('active');
    }

    handleKeyboard(e) {
        if (!this.isOpen) return;
        
        switch(e.key) {
            case 'Escape':
                this.close();
                break;
            case 'ArrowLeft':
                this.previous();
                break;
            case 'ArrowRight':
                this.next();
                break;
        }
    }
}

const lightboxInstance = new Lightbox();

// Override global openLightbox function
function openLightbox(itemId) {
    lightboxInstance.open(itemId);
}

function closeLightbox() {
    lightboxInstance.close();
}
