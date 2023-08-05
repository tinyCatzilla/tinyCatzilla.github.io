function checkImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function() { resolve(img); };
        img.onerror = function() { reject(url); };
        img.src = url;
    });
}

function addEventListeners() {
    const sliders = document.querySelectorAll(".sliderImages");
    const numSliders = sliders.length;

    for (let i = 0; i < numSliders; i++) {
        sliders[i].addEventListener("mouseenter", function() {
            sliders[i].classList.add("paused");
        });
        sliders[i].addEventListener("mouseleave", function() {
            sliders[i].classList.remove("paused");
        });
    }
}

async function main() {
    const sliders = document.querySelectorAll(".sliderImages");
    const numSliders = sliders.length;
    let maxImageCount = 17; // maximum number of images expected




    let promises = Array.from({length: maxImageCount}, (_, i) => {
        let url = `./images/banners/banner (${i+1}).png`;
        return checkImage(url)
            .then(img => {
                img.id = "sliderImg";
                sliders[i % numSliders].appendChild(img);
            })
            .catch(error => console.log('Error: ' + error));
    });

    await Promise.all(promises);

    // duplicate the children of sliders
    for (let i = 0; i < numSliders; i++) {
        let children = sliders[i].children;
        let numChildren = children.length;
        for (let j = 0; j < numChildren; j++) {
            sliders[i].appendChild(children[j].cloneNode(true));
        }
    }
    addEventListeners();
}


window.onload = main;