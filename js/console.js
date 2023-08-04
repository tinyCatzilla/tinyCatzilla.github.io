// import * as random from './random-js.js';

// math.import({
//     'randomNormal': function(mean, stdDev) {
//         let rand = new random.Random(random.Engine.mt19937().autoSeed());
//         return rand.normal(mean, stdDev);
//     },
//     'randomPoisson': function(lambda) {
//         let rand = new random.Random(random.Engine.mt19937().autoSeed());
//         return rand.poisson(lambda);
//     }
// });


let options = ["Hiya!", "o/", "Mrrp", "Meow's it going?", "nya~", "Meowdy!", ":3", "hii"]
// let welcomeText = options[Math.floor(Math.random() * options.length)]
let windows = 1;

let currentDirectory = '/';
let directories = {
    '/': ['documents','music', 'pictures', 'videos'],
    '/documents': [],
    '/music': [],
    '/pictures': [],
    '/videos': []
};
let files = {
    '/documents': ['stokes_quote.txt', "private_do_not_open.txt"],
    '/music': ['BRAINWORMS.mp3', 'eleanor_rigby.mp3', 'FATALITY.mp3', 'free_money.mp3', 'gallery_piece.mp3', 'i_wanna_know.mp3', 'imovie180.mp3', 
    'makeup_for_boys.mp3', 'mind_fuzz.mp3', 'snail_man.mp3', 'song1.mp3'],
    '/pictures': ['winton.gif', 'sparkle.gif'],
    '/videos': ['aa_ee_oo.yt', 'csm.yt', 'spamton.yt']
};
let fileContents = {
    '/documents/stokes_quote.txt': "Stokes theorem shares three important attributes with many fully evolved major theorems: \n" +
    "1. It is trivial. \n" +
    "2. It is trivial because the terms appearing in it have been properly defined. \n" +
    "3. It has significant consequences.",
    '/documents/private_do_not_open.txt': "meowmeow im a kitty :3 murr mrrp",

    '/music/BRAINWORMS.mp3': './images/console/BRAINWORMS.mp3',
    '/music/eleanor_rigby.mp3': './images/console/eleanor_rigby.mp3',
    '/music/FATALITY.mp3': './images/console/FATALITY.mp3',
    '/music/free_money.mp3': './images/console/free_money.mp3',
    '/music/gallery_piece.mp3': './images/console/gallery_piece.mp3',
    '/music/i_wanna_know.mp3': './images/console/i_wanna_know.mp3',
    '/music/imovie180.mp3': './images/console/imovie180.mp3',
    '/music/makeup_for_boys.mp3': './images/console/makeup_for_boys.mp3',
    '/music/mind_fuzz.mp3': './images/console/mind_fuzz.mp3',
    '/music/snail_man.mp3': './images/console/snail_man.mp3',
    '/music/song1.mp3': './images/console/song1.mp3',

    '/pictures/winton.gif': './images/console/winton.gif',
    '/pictures/sparkle.gif': './images/console/sparkle.gif',

    '/videos/aa_ee_oo.yt': 'https://www.youtube-nocookie.com/embed/PMZxehxMvHU?autoplay=1',
    '/videos/csm.yt': 'https://www.youtube-nocookie.com/embed/GcIs_a3Epfg?autoplay=1',
    '/videos/spamton.yt': 'https://www.youtube-nocookie.com/embed/d8RkcUiCxuE?autoplay=1'
};



var term = $('.console').terminal({
    hello: function() {
        this.echo('Hello, user. Wellcome to this terminal.', {keepWords: true});
    },

    help: function() {
        this.echo("Available commands: \n" + 
        "help - shows this message \n" + 
        "cls - clears the terminal \n" + 
        "ls - lists the contents of the current directory \n" +
        "cd <directory> - changes the current directory \n" +
        "open <file> - opens a file\n" +
        "date - shows the current date \n" + 
        "time - shows the current time \n" + 
        "eval - evaluates a mathematical expression \n" +
        // "rnorm - generates a random value from a Normal distribution \n" +
        // "rpoisson - generates a random value from a Poisson distribution \n" +
        "otter - shows a random otter\n" +
        "meow - shows a random meow\n" +
        "weather <city> - shows the weather\n" +
        "wiki <query> - searches wikipedia\n" +
        // "ascii <query> - searches ascii art\n" +
        "about - shows information about purrminal"
        )
    },

    ls: function() {
        let dirContents = directories[currentDirectory].concat(files[currentDirectory] || []);
        this.echo(dirContents.join('\n'));
    },
    
    cd: function(dir) {
        // Handle '..' for moving up a directory
        if (dir === '..') {
            currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf('/'));
            if (!currentDirectory) currentDirectory = '/';
        } else {
            // If it's a full path, check if it's a valid directory or file
            if(dir.startsWith('/')) {
                if(directories[dir]) {
                    currentDirectory = dir;
                } else if(files[dir.substring(0, dir.lastIndexOf('/'))].includes(dir.split('/').pop())) {
                    currentDirectory = dir.substring(0, dir.lastIndexOf('/'));
                } else {
                    this.echo("Invalid directory or file");
                }
            } else {
                // If it's a relative path, combine with current directory and check again
                let newDirectory = currentDirectory === '/' ? currentDirectory + dir : currentDirectory + '/' + dir;
                if(directories[newDirectory]) {
                    currentDirectory = newDirectory;
                } else {
                    let possibleDirectory = newDirectory.substring(0, newDirectory.lastIndexOf('/'));
                    let possibleFile = newDirectory.split('/').pop();
                    if(files[possibleDirectory] && files[possibleDirectory].includes(possibleFile)) {
                        currentDirectory = possibleDirectory;
                    } else {
                        this.echo("Invalid directory or file");
                    }
                }
            }
        }
        let dirContents = directories[currentDirectory].concat(files[currentDirectory] || []);
        this.echo(currentDirectory);
        this.echo(dirContents.join('\n'));

    },    

    open: function(file) {
        let filePath = currentDirectory === '/' ? currentDirectory + file : currentDirectory + '/' + file;
        if (fileContents[filePath]) {
            let extension = file.split('.').pop();
            switch (extension) {
                case 'txt':
                    this.echo(fileContents[filePath]);
                    break;
                case 'jpeg':
                case 'jpg':
                case 'gif':
                case 'png':
                    openImage(fileContents[filePath]);
                    break;
                case 'mp3':
                    openAudio(fileContents[filePath]);
                    break;
                case 'mp4':
                case 'apng':
                    openMovingContent(fileContents[filePath]);
                    break;
                case 'yt':
                    openYoutube(fileContents[filePath]);
                    break;
                default:
                    this.echo('Cannot open this file type');
                    break;
            }
        } else {
            this.echo("File not found");
        }
    },
    

    cls: function() {
        this.clear();
    },

    date: function() {
        this.echo(new Date().toDateString());
    },

    time: function() {
        this.echo(new Date().toTimeString());
    },

    otter: function() {
        this.echo("Opening otter window...");
        openWindow(false, chooseOtterPic(), 'image');
        this.echo("Opened otter window :)");
    },

    eval: function(expression) {
        try {
            this.echo("Result: " + math.evaluate(expression));
        } catch (e) {
            this.echo("Invalid mathematical expression");
        }
    },

    // rnorm: function(mean, stdDev) {
    //     if (isNaN(mean) || isNaN(stdDev)) {
    //         this.echo("Invalid input. Both inputs should be numbers");
    //     } else {
    //         const dist = math.randomNormal(mean, stdDev);
    //         this.echo("Random value from Normal distribution: " + dist);
    //     }
    // },

    // rpoisson: function(lambda) {
    //     if (isNaN(lambda)) {
    //         this.echo("Invalid input. Lambda should be a number");
    //     } else {
    //         const dist = math.randomPoisson(lambda);
    //         this.echo("Random value from Poisson distribution: " + dist);
    //     }
    // },

    meow: function() {
        this.echo(chooseMeow());
    },
    
    weather: function(city) {
        const apiKey = '3cad06964c8c4dd680f51545230408';
    
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.echo(`Current weather in ${city}: \n`+
                    `Temperature: ${data.current.temp_c}°C \n` +
                    `Humidity: ${data.current.humidity}% \n` +
                    `Condition: ${data.current.condition.text}`);
                } else {
                    this.echo("Invalid city or error fetching weather data");
                }
            })
            .catch(error => console.log('Error fetching weather:', error));
    },    

    wiki: function(query) {
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`)
            .then(response => response.json())
            .then(data => {
                if(data.type === 'standard') {
                    this.echo(`Title: ${data.title} \n` +
                    `Extract: ${data.extract}`);
                } else {
                    this.echo("No page found or error fetching data");
                }
            })
            .catch(error => this.echo('Error fetching wiki data'));
    },

    // ascii: function(text) {
    //     figlet(text, (err, asciiArt) => {
    //         if (err) {
    //             this.echo('Error generating ASCII art');
    //         } else {
    //             this.echo(asciiArt);
    //         }
    //     });
    // },


    about: function() {
        this.echo(`Hi :3 I'm purrminal, and I can run some basic commands. I'm still in development, so I can't do much yet.`);
    }
}, {
    // greetings: greetings.innerHTML
    greetings: options[Math.floor(Math.random() * options.length)] + ' Type help to get started!'
});

get_help = function() {
    return "Welcome to the terminal. Type 'help' to see a list of commands.";
}

// class BarAnimation extends $.terminal.Animation {
//     constructor(...args) {
//         super(...args);
//         this._i = 0;
//     }
//     render(term) {
//         if (this._i > term.cols()) {
//             return false;
//         } else {
//             return [welcomeText.substr(0, this._i++)];
//         }
//     }

// }
term.echo(new BarAnimation(15)); // 50 frames per second

function chooseMeow() {
    meows = ['meow', 'mrow', 'mrrp', 'mew', 'mrpt', 'mrrr', 'miao', 'miau', 'rawr', 'mrawr', 'mrrrow', 'nya']
    return meows[Math.floor(Math.random() * meows.length)];
}

function openImage(image) {
    // check if input is a valid image url
    if (image.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        openWindow(false, image, 'image');
        return true;
    }
    else {
        return false;
    }
}

function openAudio(audio) {
    let absoluteURL = new URL(audio, window.location.href).href;

    if (absoluteURL.match(/\.(mp3|wav)$/i) != null) {
        jsmediatags.read(absoluteURL, {
            onSuccess: function(tag) {
                let image = tag.tags.picture;
                if (image) {
                    let base64String = "";
                    for (let i = 0; i < image.data.length; i++) {
                        base64String += String.fromCharCode(image.data[i]);
                    }
                    let base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
                    openWindow(false, absoluteURL, 'audio', base64);
                } else {
                    openWindow(false, absoluteURL, 'audio');
                }
            },
            onError: function(error) {
                console.log(':(', error.type, error.info);
            }
        });
        return true;
    } else {
        return false;
    }
}


function openMovingContent(content) {
    if (content.match(/\.(mp4|apng)$/) != null) {
        openWindow(false, content, 'video');
        return true;
    }
    else {
        return false;
    }
}

function openYoutube(url) {
    if (url.match(/^(http(s)?:\/\/)?((w){3}.)?youtube(-nocookie)?.com\/embed\/.+/) != null) {
        openWindow(false, url, 'youtube');
        return true;
    }
    else {
        return false;
    }
}

// open window function
function openWindow(text, content, contentType, albumArt = null) {
    // new div
    let newDiv = document.createElement("div");
    newDiv.classList.add("miniContentBox");
    newDiv.classList.add("dragBox");
    newDiv.id = windows;
    windows += 1;
    // new div title inside new div
    let newSpanTitle = document.createElement("span");
    newSpanTitle.classList.add("contentTitle");
    newSpanTitle.classList.add("draggable");
    newSpanTitle.innerHTML = "Window " + newDiv.id + `<button class="closeBtn" onclick="this.parentElement.parentElement.style.display='none'">x</button>`;
    // newSpanTitle.innerHTML = content + `<button class="closeBtn" onclick="this.parentElement.parentElement.style.display='none'">x</button>`;
    newDiv.appendChild(newSpanTitle);

    // set the X and Y position of newDiv to be random and within the screen
    const body = document.querySelector("body");
    let randomX = Math.floor(Math.random() * (body.scrollWidth - 600));
    let randomY = Math.floor(Math.random() * (body.scrollHeight - 600));
    newDiv.style.left = randomX + "px";
    newDiv.style.top = randomY + "px";

    if (content) {
        let newContentElement;
        switch (contentType) {
            case 'image':
                newContentElement = document.createElement("img");
                break;
            case 'video':
                newContentElement = document.createElement("video");
                newContentElement.setAttribute('controls', '');
                newContentElement.setAttribute('autoplay', '');
                newContentElement.volume = 0.5;
                break;
            case 'audio':
                newContentElement = document.createElement('audio');
                newContentElement.setAttribute('controls', '');
                newContentElement.setAttribute('autoplay', '');
                newContentElement.volume = 0.5;
                if (albumArt) {
                    let img = document.createElement('img');
                    img.classList.add("contentImage");
                    img.src = albumArt;
                    newDiv.appendChild(img);
                }
                break;
            case 'youtube':
                newDiv.classList.add("miniYoutubeBox");
                newContentElement = document.createElement("iframe");
                newContentElement.setAttribute('width', "480");
                newContentElement.setAttribute('height', "270");
                newContentElement.setAttribute('frameborder', "0");
                newContentElement.setAttribute('allowFullScreen', '');
                newContentElement.src = content;
                break;
            default:
                console.log('Unknown content type');
                return;
        }
        newContentElement.src = content;
        newContentElement.classList.add("contentImage");
        newDiv.appendChild(newContentElement);
    }
    else {
        let newDivText = document.createElement("p");
        newDivText.innerHTML = text;
        newDiv.appendChild(newDivText);
    }

    document.body.appendChild(newDiv);
}


function chooseOtterPic() {
    var randomNum = Math.floor((Math.random() * 200) + 1);
    return 'https://raw.githubusercontent.com/DailyOttersBot/otters/main/otter%20(' + randomNum + ').jpg';
}