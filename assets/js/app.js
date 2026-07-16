// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('Water Color Gallery App Initialized');
    
    setupEventListeners();
    renderGallery();
    setupServiceWorker();
}

function setupEventListeners() {
    // Add event listeners for interactive elements
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    // Handle keyboard shortcuts
    if (event.key === 'Escape') {
        // Close lightbox if open
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    }
}

function renderGallery() {
    const galleryContainer = document.getElementById('app');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = `
        <header>
            <div class="container">
                <h1>Water Color Gallery</h1>
                <p>Explore the beauty of watercolor art</p>
            </div>
        </header>
        <nav>
            <div class="container">
                <ul>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>
        <main>
            <section class="gallery-container" id="gallery">
                <h2 class="gallery-title">Featured Artworks</h2>
                <div class="gallery-filters" id="filters"></div>
                <div class="gallery-grid" id="gallery-grid"></div>
            </section>
        </main>
        <footer>
            <p>&copy; 2026 Water Color Gallery. All rights reserved.</p>
        </footer>
        <div id="lightbox" class="lightbox"></div>
    `;

    renderFilters();
    renderGalleryItems(galleryData);
}

function renderFilters() {
    const filtersContainer = document.getElementById('filters');
    if (!filtersContainer) return;

    filtersContainer.innerHTML = categories.map(category => `
        <button class="filter-btn ${category === 'all' ? 'active' : ''}" data-category="${category}">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
    `).join('');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
}

function handleFilterClick(event) {
    const category = event.target.dataset.category;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const filtered = category === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === category);
    
    renderGalleryItems(filtered);
}

function renderGalleryItems(items) {
    const gallery = document.getElementById('gallery-grid');
    if (!gallery) return;

    gallery.innerHTML = items.map(item => `
        <div class="gallery-item" data-id="${item.id}" onclick="openLightbox(${item.id})">
            <img src="${item.image}" alt="${item.title}" class="gallery-item-image">
            <div class="gallery-item-overlay">
                <div class="gallery-item-overlay-text">Click to view</div>
            </div>
            <div class="gallery-item-info">
                <h3 class="gallery-item-title">${item.title}</h3>
                <p class="gallery-item-artist">by ${item.artist}</p>
            </div>
        </div>
    `).join('');
}

function openLightbox(itemId) {
    const item = galleryData.find(i => i.id === itemId);
    if (!item) return;

    const lightbox = document.getElementById('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
            <img src="${item.image}" alt="${item.title}" class="lightbox-image">
            <div class="lightbox-info">
                <h2>${item.title}</h2>
                <p>by ${item.artist}</p>
                <p>${item.description}</p>
            </div>
        </div>
    `;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Service worker registration would go here
        // navigator.serviceWorker.register('sw.js');
    }
}
