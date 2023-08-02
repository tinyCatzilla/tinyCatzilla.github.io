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
    '/documents': ['file1.txt', 'file2.txt'],
    '/pictures': ['pic1.jpg', 'pic2.jpg'],
    '/videos': ['video1.mp4', 'video2.mp4']
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
        "date - shows the current date \n" + 
        "time - shows the current time \n" + 
        "eval - evaluates a mathematical expression \n" +
        // "rnorm - generates a random value from a Normal distribution \n" +
        // "rpoisson - generates a random value from a Poisson distribution \n" +
        "openOtter - shows an otter window\n" +
        "openImage <image_url> - opens an image window\n" +
        // "openText <text> - opens a text window\n" +
        "about - shows information about purrminal\n"
        )
    },

    ls: function() {
        this.echo(directories[currentDirectory].join('\n'));
    },
    
    cd: function(dir) {
        if (directories[currentDirectory].includes(dir)) {
            currentDirectory += dir;
            this.echo("Changed directory to " + currentDirectory);
        } else {
            this.echo("Invalid directory");
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

    openOtter: function() {
        this.echo("Opening otter window...");
        openWindow(false, chooseOtterPic());
        this.echo("Opened otter window :)");
    },

    openImage: function(image) {
        // check if input is a valid image url
        if (image.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            this.echo("Opening image window...");
            openWindow(false, image);
            this.echo("Opened image window :)");
        }
        else {
            this.echo("Invalid image url. The URL must end with .jpeg, .jpg, .gif or .png");
        }
    },

    eval: function(expression) {
        try {
            this.echo("Result: " + eval(expression));
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


    

    // openText: function(text) {
    //     this.echo("Opening text window...");
    //     openWindow(text, false);
    //     this.echo("Opened text window :)");
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

// open window function
function openWindow(text, image) {
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
    newDiv.appendChild(newSpanTitle);

    // if image:
    if (image) {
        let newDivImage = document.createElement("img");
        newDivImage.src = image;
        newDivImage.classList.add("contentImage");
        newDiv.appendChild(newDivImage);
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