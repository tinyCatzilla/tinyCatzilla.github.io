const links = {
    1 : "https://store.steampowered.com/app/602960/Barotrauma/",
    2 : "https://anilist.co/anime/130003/BOCCHI-THE-ROCK/",
    3 : "https://www.hbo.com/chernobyl",
    4 : "https://store.steampowered.com/app/373420/Divinity_Original_Sin__Enhanced_Edition/",
    5 : "https://anilist.co/anime/30/Neon-Genesis-Evangelion/",
    6 : "https://www.hbo.com/game-of-thrones",
    7 : "https://store.steampowered.com/app/287980/Mini_Metro/",
    8 : "https://www.minecraft.net/en-us",
    9 : "https://store.steampowered.com/app/774171/Muse_Dash/",
    10 : "https://anilist.co/anime/10165/Nichijou--My-Ordinary-Life/",
    11 : "/overwatch",
    12 : "/sanctuary",
    13 : "https://store.steampowered.com/app/281990/Stellaris/",
    14 : "https://store.steampowered.com/app/447530/VA11_HallA_Cyberpunk_Bartender_Action/",
    15 : "/vangogh",
    16 : "https://www.sonyclassics.com/whiplash/",
    17 : "https://ramiels.me/",
}


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
                if (links[i+1]) {
                    let link = document.createElement("a");
                    link.href = links[i+1];
                    link.target = "_blank";
                    link.appendChild(img);
                    sliders[i % numSliders].appendChild(link);
                }
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