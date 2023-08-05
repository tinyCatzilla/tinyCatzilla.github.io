// on page load add event listener to .kittyCat

function main() {
    const kittyCat = document.querySelector(".kittyCat");
    const purr = new Audio("./images/catSleep/purr.mp3");
    const meow = new Audio("./images/catSleep/meow.wav");
    purr.loop = true;

    let purred = false;
    let isMouseOut = false;
    let wao = false;
    let pet = false;
    let ready_to_meow = false;
    let outId;
    let overId;

    kittyCat.addEventListener("mouseover", function() {
        wao = false;
        pet = true;
        clearTimeout(outId); // clear the timeout if mouse reenters
        kittyCat.src = "./images/catSleep/kittywao.png";
        overId = setTimeout(function() {
            if (pet) {
                kittyCat.src = "./images/catSleep/kittypet.png";
                meow.pause();
                purr.play(); // play the audio here
                ready_to_meow = true;
            }
        }, 500);
    });

    kittyCat.addEventListener("mouseout", function() {
        wao = true;
        pet = false;
        clearTimeout(overId);
        kittyCat.src = "./images/catSleep/kittywao.png";
        purr.pause();

        if (ready_to_meow){
            meow.play();
            ready_to_meow = false;
        }
        
        
        // wait 1 second
        outId = setTimeout(function() {
            if (wao) {
                kittyCat.src = "./images/catSleep/kittyPout.gif";
            }
        }, 850);
    });


    // click anywhere on page event
    document.addEventListener("click", function() {
        purred = true;
    });

    // click on kitty
    kittyCat.addEventListener("click", function() {
        let currentSrc = kittyCat.src;
        if (currentSrc.includes("kittypet")) {
            kittyCat.src = "./images/catSleep/kittywao.png";
            setTimeout(function() {
                kittyCat.src = "./images/catSleep/kittypet.png";
            }, 500);
        }
        meow.play();
    });

    // Prevent right click context menu on kittyCat
    kittyCat.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // when mouse not over kittyCat
    document.addEventListener("mousemove", function(event) {
        let x = event.clientX;
        let y = event.clientY;
        let kittyCatX = kittyCat.getBoundingClientRect().x;
        let kittyCatY = kittyCat.getBoundingClientRect().y;
        let kittyCatWidth = kittyCat.getBoundingClientRect().width;
        let kittyCatHeight = kittyCat.getBoundingClientRect().height;
    
        // if the mouse is outside the kittyCat and isMouseOut is not set
        if ((x < kittyCatX || x > kittyCatX + kittyCatWidth || y < kittyCatY || y > kittyCatY + kittyCatHeight) && !isMouseOut) {
            isMouseOut = true; // set the flag
            kittyCat.src = "./images/catSleep/kittywao.png";
            purr.pause();
    
            setTimeout(function() {
                kittyCat.src = "./images/catSleep/kittyPout.gif";
            }, 850);
        }
    });
}

window.addEventListener("load", main);