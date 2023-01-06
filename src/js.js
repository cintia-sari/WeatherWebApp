const form = document.querySelector("form");
const locations = document.querySelector("[name=location]");
const weatherBox = document.querySelector(".js-weather-info")


form.addEventListener("submit", eventHandler);
function getApiUrl(city){
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=XHKZYQGTJ2NY7H6SNU8ED55WB&contentType=json`;
};

function renderWeatherData(weather){
    let celsius = weather.days[0].temp;
    console.log(celsius);
    let html = `
    <div class="temperature">${celsius}°C</div>
    <div class="sky"></div>
    `;// innen folytani
return html;
}

function renderResponse(weather){
console.log(weather.address)
    let html = "";
    //if(Array.isArray(weather) && weather.length > 0){
        html = renderWeatherData(weather)
    //} else { // Error részt megcsinálni
    //    html=`<p class='error'>Nem találtunk ilyen nevü várost!</p>`
    //}
    weatherBox.innerHTML = html;
};


function eventHandler(eventObject){
    eventObject.preventDefault();
    let city = locations.value.trim();
    locations.value ='';

    fetch(getApiUrl(city))
    .then(data => data.json())
    .then(renderResponse)
};