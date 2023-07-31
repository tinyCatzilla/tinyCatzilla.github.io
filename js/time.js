function refreshTime() {
    const timeDisplay = document.getElementById("time");
    let options = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
        weekday: "long",
    }
    let formatter = new Intl.DateTimeFormat([], options);

    let datetime = new Date();
    const parts = formatter.formatToParts(datetime);
    const partValues = parts.map(p => p.value);
    let formattedString = ` It is ${partValues[2]}${partValues[3]}${partValues[4]} ${partValues[6]} on a ${partValues[0]} in my timezone.`
    timeDisplay.textContent = formattedString;
}

function main() {
    refreshTime();
    setInterval(refreshTime, 1000);
}

window.onload = main;
