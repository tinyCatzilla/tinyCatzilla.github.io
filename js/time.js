// function refreshTime() {
//     const timeDisplay = document.getElementById("time");
//     let options = {
//         timeZone: "America/New_York",
//         hour: "numeric",
//         minute: "numeric",
//         weekday: "long",
//     }
//     let formatter = new Intl.DateTimeFormat([], options);

//     let datetime = new Date();
//     const parts = formatter.formatToParts(datetime);
//     const partValues = parts.map(p => p.value);
//     let formattedString = ` It is ${partValues[2]}${partValues[3]}${partValues[4]} ${partValues[6]} on a ${partValues[0]} in my timezone.`
//     timeDisplay.textContent = formattedString;
// }

// function main() {
//     refreshTime();
//     setInterval(refreshTime, 1000);
// }

// window.onload = main;


function refreshTime() {
    const hour = document.querySelector(".hour");
    const min = document.querySelector(".min");
    const day = document.querySelector(".day");
    const dateNum = document.querySelector(".dateNum");
    const month = document.querySelector(".month");

    let options = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
        day: "numeric",
        month: "short",
    }
    let formatter = new Intl.DateTimeFormat([], options);

    let datetime = new Date();
    const parts = formatter.formatToParts(datetime);
    const partValues = parts.map(p => p.value);

    let hourNum = partValues[6];
    // if hour is single digit, add a 0 in front
    if (hourNum.length == 1) {
        hourNum = "0" + hourNum;
    }

    if (hourNum != hour.textContent) {
        changeTime(hourNum, hour);
    }
    if (partValues[8] != min.textContent) {
        changeTime(partValues[8], min);
    }
    if (partValues[0] != day.textContent) {
        changeTime(partValues[0], day);
    }
    if (partValues[2] != dateNum.textContent) {
        changeTime(partValues[2], dateNum);
    }
    if (partValues[4] != month.textContent) {
        changeTime(partValues[4], month);
    }


    // hour.textContent = hourNum;
    // min.textContent = partValues[4];
    // amPm.textContent = partValues[3];
}

function colonBlink() {
    const colon = document.querySelector(".clockColon");
    if (colon.classList.contains("hidden")) {
        colon.classList.remove("hidden");
    }
    else {
        colon.classList.add("hidden");
    }
}

function changeTime(change, element) {
    // give emenet hidden
    element.classList.add("hidden");
    // wait 500ms
    setTimeout(function() {
        // change element text
        element.textContent = change;
        // remove hidden
        element.classList.remove("hidden");
    }, 500);
}

function main() {
    refreshTime();
    setInterval(refreshTime, 1000);
    setInterval(colonBlink, 500);
    console.log("time")
}

window.addEventListener("load", main);