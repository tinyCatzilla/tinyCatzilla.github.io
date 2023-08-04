function loadWeather(weather){
    let temp = weather[0];
    let conditionText = weather[1];
    let humidty = weather[2];
    let wind = weather[3];
    let precipitation = weather[4];
    let cloud = weather[5];
    let is_day = weather[6];

    let drawClouds = false;
    let drawRain = false;
    let drawSnow = false;
    let drawDay = false;
    let overcast = false;
    let evening = false;

    if (cloud > 50){
        drawClouds = true;
    }
    if (cloud > 80){
        overcast = true;
    }
    if (precipitation > 0){
        // if (conditionText.includes("rain")){
        //     drawRain = true;
        // }
        // else if (conditionText.includes("snow")){
        //     drawSnow = true;
        // }
        drawRain = true;
    }
    if (is_day){
        drawDay = true;
    }

    let options = {
        timeZone: "America/New_York",
        hour: "numeric",
    }
    let formatter = new Intl.DateTimeFormat([], options);
    let datetime = new Date();
    const parts = formatter.formatToParts(datetime);
    const partValues = parts.map(p => p.value);

    let hourNum = partValues[0];
    console.log(hourNum);
    if ((hourNum >= 6 && hourNum <= 8)){
        evening = true;
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

    return [background, foreground];
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
    
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();
        
        console.log(data);
        temp = data.current.temp_c;
        conditionText = data.current.condition.text;
        humidty = data.current.humidity;
        wind = data.current.wind_kph;
        precipitation = data.current.precip_mm;
        cloud = data.current.cloud;
        is_day = data.current.is_day;
    }
    catch (error) {
        console.log('Error fetching weather:', error);
    }

    return [temp, conditionText, humidty, wind, precipitation, cloud, is_day];
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
        weatherDiv.appendChild(foregroundDiv);
    }
}


function main(){
    (async () => {
        const weather = await getWeather();
        console.log(weather);
        const weatherImgs = loadWeather(weather);
        drawWeather(weatherImgs);
    })();
}

window.addEventListener("load", main);
