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
};

/*function renderHourlyTemp(weather){
    let hourlyTemp = weather.days[0].hours.temp ;
    let html="";
    for (let temp of weather.days[0].hours[0].temp){
         html += `
            <div class="hourlyTemp">
            ${temp}
            </div>
        `};
        console.log(html);
}*/

function renderBackground(weather){
   // let pictureName = weather.days[0].icon;
                    
   let background = document.body.style.backgroundImage = "url('../src/picture/clear-day.jpg')";
   console.log(background) 
   return background;
}

function hours(houres){
   
    let hour = "";
    if (houres.slice(0,1) === "0"){
        hour = houres.slice(1,2);
    } else {
        hour =houres.slice(0,2);
    }
    console.log(hour)
    return hour;
}

function hourlyTemp(weather){
    let html= `<div class="horulyWeatherArea">`;
    for ( let i = 0 ; i <= 4; i=i+1 ){
    let hoursData = weather.days[0].hours[i].datetime;
    console.log(hoursData)
    let hour = hours(hoursData);
    let icon = weather.days[0].hours[i].icon;
    let celsius = weather.days[0].hours[i].temp;

     html += `
     <div class="hourlyWeather">
        <h4>${hour}</h4>
        <img src="../src/icons/${icon}.svg" alt="${icon}" class="icon">
        <h4>${celsius}°</h4>
        </div> 
    `
        };
        
 
 html += "</div>"
 console.log(html);
 return html ;
};
function renderWeatherData(weather){
    renderBackground(weather);
    let html = `
    <div class="mainInfo">
    ${renderCity(weather)}
    ${renderCelsius(weather)}
    ${renderSky(weather)}
    ${renderMaxMin(weather)}
    </div>
    <div class="hourlyTemp">
    ${hourlyTemp(weather)}
    </div>
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