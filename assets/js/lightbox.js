console.log("Lightbox loaded");

/*
==========================================================
LIGHTBOX
==========================================================
*/

let currentArtworkIndex = 0;

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxMedium = document.getElementById("lightboxMedium");

const lightboxDescription = document.getElementById("lightboxDescription");

const lightboxStatus = document.getElementById("lightboxStatus");

const closeButton = document.getElementById("closeLightbox");

const previousButton = document.getElementById("previousArtwork");

const nextButton = document.getElementById("nextArtwork");


/* ======================================================
OPEN
====================================================== */

function openLightbox(id){

    currentArtworkIndex = artworks.findIndex(item => item.id === id);

    showArtwork();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* ======================================================
SHOW
====================================================== */

function showArtwork(){

    const artwork = artworks[currentArtworkIndex];

    lightboxImage.src = artwork.image;
    lightboxImage.loading = "eager";

    lightboxImage.alt = artwork.title;

    lightboxTitle.textContent = artwork.title;

    lightboxMedium.textContent =
        `${artwork.medium} • ${artwork.year}`;

    lightboxDescription.textContent =
        artwork.description;

    // lightboxStatus.textContent =
    //     artwork.status.toUpperCase();

    // lightboxStatus.className =
    // `status ${artwork.status}`;

}


/* ======================================================
CLOSE
====================================================== */

function closeLightbox(){

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


/* ======================================================
NEXT
====================================================== */

function nextArtwork(){

    currentArtworkIndex++;

    if(currentArtworkIndex >= artworks.length){

        currentArtworkIndex = 0;

    }

    showArtwork();

}


/* ======================================================
PREVIOUS
====================================================== */

function previousArtwork(){

    currentArtworkIndex--;

    if(currentArtworkIndex < 0){

        currentArtworkIndex =
            artworks.length - 1;

    }

    showArtwork();

}


/* ======================================================
BUTTONS
====================================================== */

closeButton.addEventListener("click", closeLightbox);

nextButton.addEventListener("click", nextArtwork);

previousButton.addEventListener("click", previousArtwork);


/* ======================================================
ESC
====================================================== */

document.addEventListener("keydown", event=>{

    if(!lightbox.classList.contains("show"))
        return;

    if(event.key==="Escape")
        closeLightbox();

    if(event.key==="ArrowRight")
        nextArtwork();

    if(event.key==="ArrowLeft")
        previousArtwork();

});


/* ======================================================
CLICK OUTSIDE
====================================================== */

lightbox.addEventListener("click", event=>{

    if(event.target===lightbox){

        closeLightbox();

    }

});