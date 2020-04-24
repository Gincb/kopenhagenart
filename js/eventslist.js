window.addEventListener('DOMContentLoaded', getData);

const linkEvents = "http://colorless.in/wordpress-portfolio/kai/wp-json/wp/v2/event?_embed";

function getData() {

    const urlParams = new URLSearchParams(window.location.search);
    const the_event_id = urlParams.get("event_id");

    if(the_event_id) {
        fetch("http://colorless.in/wordpress-portfolio/kai/wp-json/wp/v2/event/" + the_event_id + "?_embed")
            .then(res => res.json())
            .then(showEventList)
    } else {
        fetch(linkEvents)
        .then(res => res.json())
        .then(handleData)
    }

}

function handleData(eventEvents) {
    // console.log(eventEvents);
    eventEvents.forEach(showEventList);
}

function showEventList(eventList) {
    console.log(eventList);
    
    const eventsTemplate = document.querySelector(".events-template").content;
    const eventsCopy = eventsTemplate.cloneNode(true); // made copy

    eventsCopy.querySelector(".events-title").textContent = eventList.title.rendered;
    eventsCopy.querySelector(".events-artist").textContent = eventList.artist;
    eventsCopy.querySelector(".events-date").textContent = eventList.event_date;
    eventsCopy.querySelector(".events-date-to").textContent = eventList.event_date_to;

    if(eventList.event_date_to == false) {
        eventsCopy.querySelector(".twoDates").classList.add("hide"); // Hide if there is no second date
    }

    eventsCopy.querySelector(".events-img-event").src = eventList._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
    eventsCopy.querySelector(".events-img-thumbnail").src = eventList._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    const description = eventsCopy.querySelector(".events-paragraph");
    if (description) {
        description.innerHTML = eventList.press_release;
    }


    eventsCopy.querySelector(".events-price").textContent = eventList.price;
    eventsCopy.querySelector(".events-prices-to").textContent = eventList.price_to;
    const price = eventsCopy.querySelector(".events-prices");
    if (price) {
        if(eventList.price == false) {
            eventsCopy.querySelector(".events-prices").classList.add("hide"); // Hide if there is no second date
        } else if(eventList.price_to == false && eventList.price == false) {
            eventsCopy.querySelector(".twoPrices").classList.add("hide"); // Hide if there is no second date
        }
    }
    
    const a = eventsCopy.querySelector('.read-more');
    if(a) {
        a.href += eventList.id;
    }
    

    document.querySelector(".eventsMain").appendChild(eventsCopy);
}