window.addEventListener('DOMContentLoaded', getData);

const linkFeatured = "http://colorless.in/wordpress-portfolio/kai/wp-json/wp/v2/event?categories=7&_embed";

function getData() {

    const urlParams = new URLSearchParams(window.location.search);
    const the_featured_id = urlParams.get("featured_id");

    if (the_featured_id) {
        fetch("http://colorless.in/wordpress-portfolio/kai/wp-json/wp/v2/event/" + the_featured_id + "?_embed")
            .then(res => res.json())
            .then(showFeaturedEvent)
    } else {
        fetch(linkFeatured)
            .then(res => res.json())
            .then(handleData)
    }
}

function handleData(featuredEvents) {
    // console.log(featuredEvents);
    featuredEvents.forEach(showFeaturedEvent);
}

function showFeaturedEvent(featuredEvent) {
    console.log(featuredEvent);

    const featuredTemplate = document.querySelector(".featured-template").content;
    const featuredCopy = featuredTemplate.cloneNode(true); // made copy

    featuredCopy.querySelector(".featured-title").textContent = featuredEvent.title.rendered;
    featuredCopy.querySelector(".featured-artist").textContent = featuredEvent.artist;
    featuredCopy.querySelector(".featured-date").textContent = featuredEvent.event_date;
    featuredCopy.querySelector(".featured-date-to").textContent = featuredEvent.event_date_to;

    if (featuredEvent.event_date_to == false) {
        featuredCopy.querySelector(".twoDates").classList.add("hide"); // Hide if there is no second date
    }

    featuredCopy.querySelector(".featured-img-event").src = featuredEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;

    const description = featuredCopy.querySelector(".featured-paragraph");
    if (description) {
        description.innerHTML = featuredEvent.press_release;
    }

    const a = featuredCopy.querySelector('.read-more');
    if (a) {
        a.href += featuredEvent.id;
    }

    document.querySelector(".featuredMain").appendChild(featuredCopy);

}
