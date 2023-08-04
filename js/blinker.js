function blink(blinker) {
    let style = window.getComputedStyle(blinker);
    let filter = style.getPropertyValue('filter');
    let boxShadow = style.getPropertyValue('box-shadow');
    let textShadow = style.getPropertyValue('text-shadow');

    blinker.style.filter = "none";
    // blinker.style.filter = "drop-shadow(0px 0px 5px #d8b11749);"
    blinker.style.boxShadow = "none";
    blinker.style.textShadow = "none";

    // turn on after short random time
    setTimeout(function() {
        blinker.style.filter = filter;
        blinker.style.boxShadow = boxShadow;
        blinker.style.textShadow = textShadow;
        
        // turn off after longer random time
        setTimeout(function() {
            blink(blinker); // Here we make the recursive call to repeat the process
        }, Math.random() * 5000 + 1200); // on time (between 1 and 1.5 seconds)

    }, Math.random() * 500 + 10); // off time (between 0.1 and 0.3 seconds)
}

function main() {
    const blinkers = document.querySelectorAll(".blinking");
    for (let i = 0; i < blinkers.length; i++) {
        blink(blinkers[i]); // Start blinking immediately for each div independently
    }
}

window.addEventListener("load", main);
