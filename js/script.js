let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");
let nav = document.querySelector(".navbar");

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    nav.classList.toggle("active-overflow");
});

const backButton = document.querySelector(".back");
backButton.addEventListener("click", goBack);

function goBack() {
    window.history.back();
}
