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


let options = ["Hiya!", "o/", "Mrrp", "Meow's it going?", "nya~", "Meowdy!", ":3"]
let welcomeText = options[Math.floor(Math.random() * options.length)]
let windows = 1;

let currentDirectory = '/';
let directories = {
    '/': ['documents', 'pictures', 'videos'],
    '/documents': [],
    '/pictures': [],
    '/videos': []
};
let files = {
    '/documents': ['stokes_quote.txt'],
    '/pictures': ['winton.gif', 'sparkle.gif'],
    '/videos': ['aa_ee_oo.yt', 'csm.yt']
};
let fileContents = {
    '/documents/stokes_quote.txt': "Stokes theorem shares three important attributes with many fully evolved major theorems: \n" +
    "1. It is trivial. \n" +
    "2. It is trivial because the terms appearing in it have been properly defined. \n" +
    "3. It has significant consequences.",
    '/pictures/winton.gif': './images/console/winton.gif',
    '/pictures/sparkle.gif': './images/console/sparkle.gif',
    '/videos/aa_ee_oo.yt': 'https://www.youtube-nocookie.com/embed/PMZxehxMvHU',
    '/videos/csm.yt': 'https://www.youtube-nocookie.com/embed/GcIs_a3Epfg'
};



var term = $('.console').terminal({
    hello: function() {
        this.echo('Hello, user. Wellcome to this terminal.', {keepWords: true});
    },

    help: function() {
        this.echo("Available commands: \n\n" + 
        "help - shows this message \n" + 
        "clear - clears the terminal \n" + 
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
        "about - shows information about purrminal\n"
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
                } else if(files[newDirectory.substring(0, newDirectory.lastIndexOf('/'))].includes(newDirectory.split('/').pop())) {
                    currentDirectory = newDirectory.substring(0, newDirectory.lastIndexOf('/'));
                } else {
                    this.echo("Invalid directory or file");
                }
            }
        }
        this.echo("Current directory: " + currentDirectory);
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
    

    clear: function() {
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
        const apiKey = 'a487ee9ff8c68ba8ae99266ac166d58d';
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.main) {
                    this.echo(`Current weather in ${city}:
                    Temperature: ${data.main.temp}°C
                    Humidity: ${data.main.humidity}%
                    Condition: ${data.weather[0].main}`);
                } else {
                    this.echo("Invalid city or error fetching weather data");
                }
            })
            .catch(error => this.echo('Error fetching weather'));
    },

    wiki: function(query) {
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`)
            .then(response => response.json())
            .then(data => {
                if(data.type === 'standard') {
                    this.echo(`Title: ${data.title}\nExtract: ${data.extract}`);
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
    greetings: greetings.innerHTML
});

get_help = function() {
    return "Welcome to the terminal. Type 'help' to see a list of commands.";
}

class BarAnimation extends $.terminal.Animation {
    constructor(...args) {
        super(...args);
        this._i = 0;
    }
    render(term) {
        if (this._i > term.cols()) {
            return false;
        } else {
            return [welcomeText.substr(0, this._i++)];
        }
    }

}
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
function openWindow(text, content, contentType) {
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

    if (content) {
        let newContentElement;
        switch (contentType) {
            case 'image':
                newContentElement = document.createElement("img");
                break;
            case 'video':
                newContentElement = document.createElement("video");
                newContentElement.setAttribute('controls', '');
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