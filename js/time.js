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
        // hour12: false,
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

    if (partValues[10] == "am") { // make green if between 7am 12am
        console.log(hourNum)
        if (parseInt(hourNum) >= 7) { // if hour is >= 7
            const redClocks = document.querySelectorAll(".redClock");
            const numRedClocks = redClocks.length;
            for (let i = 0; i < numRedClocks; i++) {
                redClocks[i].classList.remove("redClock");
                redClocks[i].classList.add("greenClock");
            }
            const redClockbacks = document.querySelectorAll(".clockbackRed");
            const numRedClockbacks = redClockbacks.length;
            for (let i = 0; i < numRedClockbacks; i++) {
                redClockbacks[i].classList.remove("clockbackRed");
                redClockbacks[i].classList.add("clockbackGreen");
            }
        } else {
            const sleep = document.querySelector(".sleepy");
            sleep.style.display = "block";
        }
    }
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

let zCount = 0;
function blinkZs() {
    const zs = document.querySelectorAll(".sleepy > *");

    if (zs.length == 0) {
        return;
    }

    for (let i = 0; i < zs.length; i++) {
        // add clockRed to zs[zCount]
        if (i != zCount) {
            zs[i].classList.add("clockbackRed");
        }
        else {
            zs[i].classList.remove("clockbackRed");
        }
    }
    
    if (zCount == 2){
        zCount = 0;
    }
    else {
        zCount++;
    }

}

function main() {
    refreshTime();
    setInterval(refreshTime, 1000);
    setInterval(colonBlink, 500);
    setInterval(blinkZs, 1100)
}

window.addEventListener("load", main);