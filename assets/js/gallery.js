// // Gallery-specific JavaScript

// class Gallery {
//     constructor() {
//         this.currentFilter = 'all';
//         this.items = galleryData;
//     }

//     filter(category) {
//         this.currentFilter = category;
//         if (category === 'all') {
//             return this.items;
//         }
//         return this.items.filter(item => item.category === category);
//     }

//     getItem(id) {
//         return this.items.find(item => item.id === id);
//     }

//     getNextItem(currentId) {
//         const filtered = this.filter(this.currentFilter);
//         const currentIndex = filtered.findIndex(item => item.id === currentId);
//         return filtered[(currentIndex + 1) % filtered.length];
//     }

//     getPreviousItem(currentId) {
//         const filtered = this.filter(this.currentFilter);
//         const currentIndex = filtered.findIndex(item => item.id === currentId);
//         return filtered[(currentIndex - 1 + filtered.length) % filtered.length];
//     }

//     sort(by = 'title') {
//         return [...this.items].sort((a, b) => {
//             if (by === 'title') {
//                 return a.title.localeCompare(b.title);
//             }
//             if (by === 'artist') {
//                 return a.artist.localeCompare(b.artist);
//             }
//             return 0;
//         });
//     }
// }

// const gallery = new Gallery();

// // Event delegation for gallery items
// document.addEventListener('click', (e) => {
//     if (e.target.closest('.gallery-item')) {
//         const item = e.target.closest('.gallery-item');
//         const itemId = parseInt(item.dataset.id);
//         openLightbox(itemId);
//     }
// });

/*
==========================================================
 JANAKIRAMAN PORTFOLIO
 Gallery Module
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    buildFeatured();

    buildCategoryFilters();

    buildGallery("All");

});


/* ======================================================
   Featured Works
====================================================== */

function buildFeatured() {

    const container = document.getElementById("featuredGrid");

    if (!container) return;

    const featured = artworks.filter(item => item.featured);

    container.innerHTML = "";

    featured.forEach(item => {

        container.appendChild(createArtworkCard(item, true));

    });

}


/* ======================================================
   Category Filters
====================================================== */

function buildCategoryFilters() {

    const filterContainer = document.getElementById("categoryFilters");

    if (!filterContainer) return;

    categories.forEach(category => {

        const button = document.createElement("button");

        button.className = "filter-btn";

        button.textContent = category;

        if (category === "All") {

            button.classList.add("active");

        }

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            buildGallery(category);

        });

        filterContainer.appendChild(button);

    });

}


/* ======================================================
   Gallery Builder
====================================================== */

function buildGallery(category) {

    const grid = document.getElementById("galleryGrid");

    if (!grid) return;

    grid.innerHTML = "";

    let list = artworks;

    if (category !== "All") {

        list = artworks.filter(item => item.category === category);

    }

    list.forEach(item => {

        const card = createArtworkCard(item);

        card.classList.add("visible");

        grid.appendChild(card);


    });

}


/* ======================================================
   Artwork Card
====================================================== */

function createArtworkCard(item, featured = false) {

    const card = document.createElement("article");

    card.className = featured
        ? "artwork-card featured-card"
        : "artwork-card";

    card.dataset.id = item.id;

    card.innerHTML = `

    <div class="image-wrapper">

        <img
            src="${item.image}"
            alt="${item.title}"
            loading="lazy">

        <div class="overlay">

            <span class="view-art">
                View Artwork →
            </span>

        </div>

    </div>

        <div class="artwork-info">

            <span class="category">

                ${item.category}

            </span>

            <h3>

                ${item.title}

            </h3>

            <p>

                ${item.medium}

            </p>


        </div>

    `;

    card.addEventListener("click", () => {

        openLightbox(item.id);

    });

    return card;

}


/* ======================================================
   Utilities
====================================================== */

function capitalize(text) {

    return text.charAt(0).toUpperCase() + text.slice(1);

}