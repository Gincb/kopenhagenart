let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");
let nav = document.querySelector(".navbar");

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    nav.classList.toggle("active-overflow");
});

const backButton = document.querySelector(".back");
if (backButton) {
    backButton.addEventListener("click", goBack);
}

function goBack() {
    window.history.back();
}
/* Carousel */

function setCurrentCarousel(index) {
    const carouselStrip = document.getElementById("carouselStrip");
    const translateX = "translateX(calc(-" + ((index + 1) * 32) + "px - " + ((index * 80) + 70) + "vw))";
    carouselStrip.style.transform = translateX;

    document.querySelectorAll(".carousel-dot").forEach(d => d.classList.remove("active-dot"));
    document.querySelector(".carousel-dots li:nth-child(" + (index + 1) + ") a").classList.add("active-dot");
}

window.addEventListener('DOMContentLoaded', function() {
    let carouselIndex = 0;

    const carouselRight = document.getElementById("carouselRight");
    if (carouselRight) {
        carouselRight.addEventListener('click', function(e) {
            if (carouselIndex === 2) {
                carouselIndex = 0;
            } else {
                carouselIndex += 1;
            }
            setCurrentCarousel(carouselIndex);
        });
    }

    const carouselLeft = document.getElementById("carouselLeft");
    if (carouselLeft) {
        carouselLeft.addEventListener('click', function(e) {
            if (carouselIndex === 0) {
                carouselIndex = 2;
            } else {
                carouselIndex -= 1;
            }
            setCurrentCarousel(carouselIndex);
        });
    }

    const carouselDots = document.querySelectorAll(".carousel-dot");
    if (carouselDots && carouselDots.length) {
        carouselDots.forEach(function(d) {
            d.addEventListener('click', function(e) {
                e.preventDefault();
                const index = parseInt(e.target.hash.replace("#card", ""), 10);
                if (!isNaN(index)) {
                    carouselIndex = index - 1;
                    setCurrentCarousel(carouselIndex);
                }
            });
        });
    }
});
