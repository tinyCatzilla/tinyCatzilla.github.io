// on page load add event listener to .kittyCat

function main() {
    const kittyCat = document.querySelector(".kittyCat");
    // create audio object outside event listeners
    let purr = new Audio("./images/catSleep/purr.mp3");
    purr.loop = true;

    let purred = false;

    kittyCat.addEventListener("mouseover", function() {
        kittyCat.src = "./images/catSleep/catWaking.gif";
        setTimeout(function() {
            kittyCat.src = "./images/catSleep/catPurring.gif";
            if (purred) purr.play(); // play the audio here
        }, 1000);
    });

    kittyCat.addEventListener("mouseout", function() {
        kittyCat.src = "./images/catSleep/catReturning.gif";
        // wait 1 second
        setTimeout(function() {
            purr.pause();
            kittyCat.src = "./images/catSleep/catSleeping.gif";
        }, 1000);
    });

    kittyCat.addEventListener("click", function() {
        purr.play();
        purred = true;
    });
}



window.addEventListener("load", main);