function loadWeather(weather){
    let temp = weather[0];
    let conditionText = weather[1];
    let humidty = weather[2];
    let wind = weather[3];
    let precipitation = weather[4];
    let cloud = weather[5];
    let is_day = weather[6];
    let sunriseTime = weather[7];
    let sunsetTime = weather[8];

    let drawClouds = false;
    let drawRain = false;
    let drawSnow = false;
    let drawDay = false;
    let overcast = false;
    let evening = false;

    let opacity;

    if (cloud > 70){
        overcast = true;
    }
    else if (cloud > 30){
        drawClouds = true;
    }
    
    if (precipitation > 0){
        // if (conditionText.includes("rain")){
        //     drawRain = true;
        // }
        // else if (conditionText.includes("snow")){
        //     drawSnow = true;
        // }
        if (precipitation < 2.5){
            opacity = 0.2;
        }
        else if (precipitation < 7.5){
            opacity = 0.5;
        }
        else {
            opacity = 0.8;
        }
        drawRain = true;
    }
    if (is_day){
        drawDay = true;
    }

    let options = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
    }
    let formatter = new Intl.DateTimeFormat([], options);
    let datetime = new Date();
    const parts = formatter.formatToParts(datetime);
    const partValues = parts.map(p => p.value);

    let hourNum = parseInt(partValues[0]);
    let minNum = parseInt(partValues[2]);
    let amPm = partValues[4];

    let sunriseHour = parseInt(sunriseTime.split(":")[0]);
    let sunriseTemp = sunriseTime.split(":")[1];
    let sunriseMin = parseInt(sunriseTemp.split(" ")[0]);

    let sunsetHour = parseInt(sunsetTime.split(":")[0]);
    let sunsetTemp = sunsetTime.split(":")[1];
    let sunsetMin = parseInt(sunsetTemp.split(" ")[0]);

    function adjustHourAndMin(hour, min, adjustment) {
        let newMin = min + adjustment;
        let newHour = hour;
    
        if (newMin < 0) {
            newMin += 60;
            newHour--;
        } else if (newMin >= 60) {
            newMin -= 60;
            newHour++;
        }
    
        return { newHour, newMin };
    }
    
    const { newHour: sunriseHour_Up, newMin: sunriseMin_Up } = adjustHourAndMin(sunriseHour, sunriseMin, 30);
    const { newHour: sunriseHour_Lower, newMin: sunriseMin_Lower } = adjustHourAndMin(sunriseHour, sunriseMin, -30);
    
    const { newHour: sunsetHour_Up, newMin: sunsetMin_Up } = adjustHourAndMin(sunsetHour, sunsetMin, 30);
    const { newHour: sunsetHour_Lower, newMin: sunsetMin_Lower } = adjustHourAndMin(sunsetHour, sunsetMin, -30);
    
    function isTimeWithinInterval(hourLower, minLower, hourUp, minUp, hour, min) {
        return (hourLower < hour || (hourLower === hour && minLower <= min)) && (hour < hourUp || (hour === hourUp && min <= minUp));
    }
    
    if (amPm.toLowerCase() === "am") {
        evening = isTimeWithinInterval(sunriseHour_Lower, sunriseMin_Lower, sunriseHour_Up, sunriseMin_Up, hourNum, minNum);
    } else {
        evening = isTimeWithinInterval(sunsetHour_Lower, sunsetMin_Lower, sunsetHour_Up, sunsetMin_Up, hourNum, minNum);
    }

    let background = "url(./images/cityWidget/clearBlue.png)";
    let foreground;

    if (overcast && drawDay){
        background = "url(./images/cityWidget/overCast.png)";
    }
    else if (drawClouds){
        if (evening){
            background = "url(./images/cityWidget/duskCloudy.png)";
        }
        else if (!drawDay){
            background = "url(./images/cityWidget/nightCloudy.png)";
        }
        else {
            background = "url(./images/cityWidget/cloudyBlue.png)";
        }
    }
    else {
        if (evening){
            background = "url(./images/cityWidget/dusk.png)";
        }
        else if (!drawDay){
            background = "url(./images/cityWidget/night.png)";
        }
    }

    if (drawRain){
        foreground = "url(./images/cityWidget/rain.webp)";
    }
    else if (drawSnow){
        foreground = "url(./images/cityWidget/snow.png)";
    }

    return [background, foreground, opacity];
}

async function getWeather(){
    const apiKey = '3cad06964c8c4dd680f51545230408';
    const city = 'Toronto';

    let temp = 20;
    let conditionText = "Sunny!";
    let humidty = 50;

    let wind = 10;
    let precipitation = 0;
    let cloud = 0;
    let is_day = true;

    let sunriseTime = 0;
    let sunsetTime = 0;
    
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const response_forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`);
        const data = await response.json();
        const data_forecast = await response_forecast.json()
        
        console.log(data);
        temp = data.current.temp_c;
        conditionText = data.current.condition.text;
        humidty = data.current.humidity;
        wind = data.current.wind_kph;
        precipitation = data.current.precip_mm;
        cloud = data.current.cloud;
        is_day = data.current.is_day;
        forecastday = data_forecast.forecast.forecastday[0]
        sunriseTime = forecastday.astro.sunrise;
        sunsetTime = forecastday.astro.sunset;
    }
    catch (error) {
        console.log('Error fetching weather:', error);
    }

    return [temp, conditionText, humidty, wind, precipitation, cloud, is_day, sunriseTime, sunsetTime];
}

function drawWeather(weatherImgs){
    const weatherDiv = document.querySelector(".weatherDiv");
    const background = weatherImgs[0];
    const foreground = weatherImgs[1];

    weatherDiv.style.backgroundImage = background;
    weatherDiv.style.backgroundSize = "cover";
    weatherDiv.style.backgroundRepeat = "no-repeat";
    weatherDiv.style.backgroundPosition = "center";

    if (foreground != undefined){
        // new div for foreground
        const foregroundDiv = document.createElement("div");
        foregroundDiv.classList.add("foregroundDiv");
        foregroundDiv.style.backgroundImage = foreground;
        if (weatherImgs[2]){
            foregroundDiv.style.opacity = weatherImgs[2];
        }
        weatherDiv.appendChild(foregroundDiv);

    }
}

function drawText(weather){
    const weatherDiv = document.querySelector(".weatherDiv");

    const tempRounded = Math.round(weather[0]);

    const temperatureDiv = document.createElement("div");
    temperatureDiv.classList.add("temperatureDiv");

    const temperatureNum = document.createElement("span");
    temperatureNum.id = "temperatureNum";
    temperatureNum.innerHTML = tempRounded + "<sup id=\"celc\">&deg;C</sup>";
    
    // temperatureDiv.appendChild(weatherLocation);
    temperatureDiv.appendChild(temperatureNum);
    weatherDiv.appendChild(temperatureDiv);
}


function main(){
    (async () => {
        const weather = await getWeather();
        console.log(weather);
        const weatherImgs = loadWeather(weather);
        drawWeather(weatherImgs);
        drawText(weather);
    })();
}

window.addEventListener("load", main);
