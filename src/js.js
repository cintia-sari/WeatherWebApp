const form = document.querySelector("form");
const locations = document.querySelector("[name=location]");
const temp = document.querySelector(".temperature");

form.addEventListener("submit", eventHandler);
function getApiUrl(city){
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=XHKZYQGTJ2NY7H6SNU8ED55WB&contentType=json`
}
function eventHandler(eventObject){
    eventObject.preventDefault();
    let city = locations.value.trim();
    locations.value ='';

    fetch(getApiUrl(city))
    .then(data => data.json())
    .then(renderResponse)
};