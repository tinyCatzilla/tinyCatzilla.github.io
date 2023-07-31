// Maximum screen dimensions
var maxWidth = window.innerWidth;
var maxHeight = window.innerHeight;

var starElements = document.getElementsByClassName("stars");
var starStyles = document.getElementById("starStyles");

// Function to generate stars for an element
function generateStars(elementId, width, height, animationDuration) {
    // Number of stars to display, adjusted by screen size
    var numberOfStars = Math.floor(maxWidth * maxHeight / 5000);
    
    var boxShadowValues = [];
    
    for (var i = 0; i < numberOfStars; i++) {
        let xPos = Math.floor(Math.random() * maxWidth) + 'px';
        let yPos = Math.floor(Math.random() * (maxHeight + 2000)) + 'px'; // +2000 to ensure stars at bottom initially
        boxShadowValues.push(xPos + ' ' + yPos + ' #FFF');
    }
    
    // Insert base rule
    starStyles.sheet.insertRule(
        '#' + elementId + '.animated {' +
        '   content: " ";' +
        '   width: ' + width + 'px;' +
        '   height: ' + height + 'px;' +
        '   background: transparent;' +
        '   box-shadow: ' + boxShadowValues.join(', ') + ';' +
        '   animation: animStar ' + animationDuration + 's linear infinite;' +
        '}', 0
    );

    // Insert :after rule
    starStyles.sheet.insertRule(
        '#' + elementId + '.animated:after {' +
        '   content: " ";' +
        '   position: absolute;' +
        '   top: 2000px;' +
        '   width: ' + width + 'px;' +
        '   height: ' + height + 'px;' +
        '   background: transparent;' +
        '   box-shadow: ' + boxShadowValues.join(', ') + ';' +
        '}', 0
    );
}

// Function to generate all stars
function generateAllStars() {
    // Clear all rules
    while (starStyles.sheet.cssRules.length > 0) {
        starStyles.sheet.deleteRule(0);
    }

    // Loop through each star div and generate stars
    for (var i = 0; i < starElements.length; i++) {
        var elementId = starElements[i].id;
        var width = i + 1;
        var height = i + 1;
        var animationDuration = 50 * (i + 1); // 50s for #stars, 100s for #stars2, etc.
        generateStars(elementId, width, height, animationDuration);
        
        // Add 'animated' class after generating stars
        starElements[i].classList.add('animated');
    }
}

// Initial generation
generateAllStars();

// Regenerate stars on resize
window.addEventListener('resize', function() {
    maxWidth = window.innerWidth;
    maxHeight = window.innerHeight;
    generateAllStars();
});
