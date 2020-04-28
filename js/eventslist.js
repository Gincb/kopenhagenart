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

////Calendar//////

const date_picker_elemenet = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const month_element = document.querySelector('.date-picker .dates .months .month');
const next_btn = document.querySelector('.date-picker .dates .months .next-month');
const prev_btn = document.querySelector('.date-picker .dates .months .prev-month');
const days_element = document.querySelector('.date-picker .dates .days');
const months = ['Janueary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;
//Commpare dates
month_element.textContent = months[month] + ' ' + year;
//Calling elemenets and functions
selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;
populateDates();


//Event Listeners
// date_picker_elemenet.addEventListener('click', toggleDatePicker);
next_btn.addEventListener('click', goToNextMonth);
prev_btn.addEventListener('click', goToPrevMonth);

//Functions
//Toggle between months and years
function goToNextMonth(e) {
    month++;
    if(month > 11) {
        month = 0;
        year++;
    }
    month_element.textContent = months[month] + ' ' + year;
    
populateDates();

}

function goToPrevMonth(e) {
    month--;
    if(month < 0) {
        month = 11;
        year--;
    }
    month_element.textContent = months[month] + ' ' + year;

populateDates();

}

//Create days and new dates
function populateDates(e) {
    days_element.innerHTML = "";
    let amount_days = 28;

    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
         amount_days = 31;
    } else if(month == 3 || month == 5 || month == 8 || month == 10) {
         amount_days = 30;
    } else {
          amount_days = 28;
    }

    for(let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function(){
            selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
            selectedDay = (i+1);
            selectedMonth = month;
            selectedYear = year;
            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;
            
            populateDates();
        });

        days_element.appendChild(day_element);
    }
}

function formatDate(d) {
    let day = d.getDate();
    if(day<10) {
        day = '0' + day;
    }
    let month = d.getMonth()+1;
    if(month<10) {
        month = '0' + month;
    }
    let year = d.getFullYear();

    return year + '-' + month + '-' + day;
}

//////Calendar End///////

function handleData(eventEvents) {
    eventEvents.forEach(showEventList);
    const dateBtn = document.querySelector(".days");
    dateBtn.addEventListener("click", changeDate)

    function changeDate(){
        var resultProductData = eventEvents.filter(function (a) {
        var hitDates = [a.event_date, a.event_date_to] || {};
        hitDates = hitDates.map(function(date) { return new Date(date); });

        var getDateArray = function(start, end) {
            var arr = new Array();
            var dt = new Date(start);
            while (dt <= end) {
                arr.push(new Date(dt));
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        }
        
        var dates = getDateArray(hitDates[0], hitDates[1]);
        
        
        var hitDateMatches = dates.filter(function(date) { var newDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(); var newStart = selectedDate.getFullYear() + "-" + selectedDate.getMonth() + "-" + selectedDate.getDate(); return newDate.toString() == newStart.toString()}); console.log(hitDateMatches);

        
        return hitDateMatches.length>0;
        
    });

        document.querySelector(".eventsMain").innerHTML="";
        resultProductData.forEach(showEventList);
        
        const showAllBtn = document.querySelector(".showAll");
        showAllBtn.addEventListener("click", function(e){
            document.querySelector(".eventsMain").innerHTML="";
            eventEvents.forEach(showEventList);
        })
    }

    
}

function showEventList(eventList) {
    // console.log(eventList);
    
    const eventsTemplate = document.querySelector(".events-template").content;
    const eventsCopy = eventsTemplate.cloneNode(true); // made copy

    eventsCopy.querySelector(".events-title").textContent = eventList.title.rendered;
    eventsCopy.querySelector(".events-artist").textContent = eventList.artist;
    eventsCopy.querySelector(".events-date").textContent = eventList.event_date;
    eventsCopy.querySelector(".events-date-to").textContent = eventList.event_date_to;

    if(eventsCopy.querySelector(".events-date-to").textContent.includes("0000-00-00")) {
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