window.addEventListener('DOMContentLoaded', getData);

const linkFeatured = "http://colorless.in/wordpress-portfolio/kai/wp-json/wp/v2/event?categories=7&_embed";

function getData() {
    fetch(linkFeatured)
        .then(res => res.json())
        .then(handleData)
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

    if(featuredEvent.event_date_to == false) {
        featuredCopy.querySelector(".twoDates").classList.add("hide"); // Hide if there is no second date
    }

    featuredCopy.querySelector(".featured-img-event").src = featuredEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;

    featuredCopy.querySelector(".featured-paragraph").innerHTML = featuredEvent.press_release;
    
    document.querySelector(".featuredMain").appendChild(featuredCopy);

}