

function main() {
    let started = false;
    const music = new Audio("./images/vangogh/music.mp3");
    music.loop = true;

    // get videoBg
    const videoBg = document.querySelector(".videoBg");

    document.addEventListener("click", function() {
        if (!started) {
            music.play();
            started = true;
            videoBg.classList.add("show");
        }
    });

    document.addEventListener("keypress", function() {
        if (!started) {
            music.play();
            started = true;
            videoBg.classList.add("show");
        }
    });
}


window.addEventListener("load", main);