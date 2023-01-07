const form = document.querySelector("form");
const locations = document.querySelector("[name=location]");
const weatherBox = document.querySelector(".js-weather-info")


form.addEventListener("submit", eventHandler);
function getApiUrl(city){
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=XHKZYQGTJ2NY7H6SNU8ED55WB&contentType=json`;
};

function renderCity(weather){
    let city= weather.address ;
    let html = `
    <h3 class="city">${city}</h3>
    `;
    return html ;
}

function renderCelsius(weather){
    let celsius = weather.currentConditions.temp ;
    let html =`
     <h2 class="temperature">${celsius}°C</h2>
    `;
    return html;
}

function renderSky(weather){
    let sky = weather.days[0].description ;
    let html = `
    <h4 class="sky">${sky}</h4>
    `;
    return html;
};

function renderMaxMin(weather){
    let min = weather.days[0].tempmin;
    let max = weather.days[0].tempmax;
    let html = `
    <h4 class="maxMin" >Min: ${min}° Max: ${max}</h4>
    `;
    return html;
}

function renderWeatherData(weather){
    let celsius = weather.days[0].temp;
    console.log(celsius);
    let html = `
    <div class="mainInfo">
    ${renderCity(weather)}
    ${renderCelsius(weather)}
    ${renderSky(weather)}
    ${renderMaxMin(weather)}
    </div>
    <div class=""></div>
    `;
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