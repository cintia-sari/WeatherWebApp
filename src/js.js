const form = document.querySelector("form");
const locations = document.querySelector("[name=location]");
const weatherBox = document.querySelector(".js-weather-info");
const arrowR = document.querySelector(".arrowR");
const arrowL = document.querySelector(".arrowL");

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];



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
    let sky = weather.currentConditions.icon ;
    let html = `
    <h4 class="sky">${sky}</h4>
    `;
    return html;
};

function renderMaxMin(weather){
    let min = weather.days[0].tempmin;
    let max = weather.days[0].tempmax;
    let html = `
    <h4 class="maxMin" >Min: ${min}°  Max: ${max}°</h4>
    `;
    return html;
};



function renderBackground(weather){
   let pictureName = weather.currentConditions.icon;               
   let background = document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)),url('../src/picture/${pictureName}.jpg')`;
   return background;
}

function hours(houres){
   
    let hour = "";
    if (houres.slice(0,1) === "0"){
        hour = houres.slice(1,2);
    } else {
        hour =houres.slice(0,2);
    }

    return hour;
}

function hourlyTemp(weather){
    let dayInfo = weather.description
    let html= `<div class="dayWeather glassStyle">
                    <div class="dayinfo">${dayInfo}</div>
                    <div class="hourlyWeatherArea">
                    <span class="material-symbols-outlined row arrowL">
                    arrow_back_ios
                    </span><div class="hourlyWeatherArea">`;
    let hourslength = ((weather.days[0].hours).length)-1;

    for ( let i = 0 ; i <= hourslength; i=i+1 ){

    let hoursData = weather.days[0].hours[i].datetime;
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
        
     html += `</div><span class="material-symbols-outlined row arrowR">
     arrow_forward_ios
     </span>
     </div>
     </div>`
    return html ;
};

function getDayName(dates){
    let date = new Date(`"${dates}"`);
    let day =weekday[date.getDay()];

    return day ;
}

function renderNextdays(weather){
    let dayslenght = (weather.days.length)-5;
    let html= `<div class="days glassStyle">
                    <h4>
                        <span class="material-symbols-outlined">calendar_month</span>
                        ${dayslenght} daily forecast
                    </h4>`;
    
    
    for ( let i = 0 ; i <= dayslenght-1; ++i){
        let day = ""
        let icon = weather.days[i].icon
        let minTemp = weather.days[i].tempmin
        let maxTemp = weather.days[i].tempmax

        if ( i  < 1){
            day = "Today";
        } else {
            day = getDayName(weather.days[i].datetime);
        }
        console.log ( day)

        html += `
        <div class="day">
        <div class="nextDay">${day}</div>
        <img src="../src/icons/${icon}.svg" alt="${icon}" class="icon">
        <div class="tempMinMax"><div>${minTemp}°</div> <div>${maxTemp}°</div></div>
        </div>
        `

    }
    html += "</div>"
    return html ;
};

function scrollR(){
    console.log('scrolled...')
}

function renderWeatherData(weather){
    renderBackground(weather);
    let html = `
    <div class="mainInfo">
    ${renderCity(weather)}
    ${renderCelsius(weather)}
    ${renderSky(weather)}
    ${renderMaxMin(weather)}
    </div>
    <div class="hourlyTemp">${hourlyTemp(weather)}</div>
    <div class="nextDays">${renderNextdays(weather)}<div/>
    
</div>
    `;


return html;


}

function renderResponse(weather){
  
    
        html = renderWeatherData(weather)

        
    
    weatherBox.innerHTML = html;
};

function error (){
    weatherBox.innerHTML = "<h3 class='error'>We couldn't find this city!</h3>";
}

function eventHandler(eventObject){
    eventObject.preventDefault();
    let city = locations.value.trim();
    locations.value ='';

   fetch(getApiUrl(city))
    .then(data => data.json())
    .then(renderResponse)
    .catch(error())}
