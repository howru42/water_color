/*
==========================================================
 JANAKIRAMAN PORTFOLIO
 App Controller
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    initScrollProgress();

    initBackToTop();

    initRevealAnimation();

});


/* ======================================================
 Sticky Navigation
====================================================== */

function initNavigation() {

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* ======================================================
 Scroll Progress
====================================================== */

function initScrollProgress() {

    const progress = document.getElementById("scrollProgress");

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent =
            (window.scrollY / totalHeight) * 100;

        progress.style.width = percent + "%";

    });

}


/* ======================================================
 Back To Top
====================================================== */

function initBackToTop() {

    const button = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ======================================================
 Reveal Animation
====================================================== */

function initRevealAnimation() {

    const elements = document.querySelectorAll(

        ".artwork-card, .hero-content, section"

    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach(item => observer.observe(item));

}


/* ======================================================
 Active Navigation
====================================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        const height = section.offsetHeight;

        if (

            window.scrollY >= top &&

            window.scrollY < top + height

        ) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") === "#" + current

        ) {

            link.classList.add("active");

        }

    });

});