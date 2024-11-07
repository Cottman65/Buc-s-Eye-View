/*
This is javascript code to desighn a webpage. 

It has an alert when the window finishes loading giving an alert of "UwU".

This code also works on making sure to have a smooth scrolling
This starts with an event listener that identifing an ID on the webpage and moves smoothly to that section

The next section is the button section.
There is the "start" and "how to play" buttons ID
The canvase is connected to the gameCanvase
The context is set to 2d
Then there is the "start" button event listener and the "how to play" button event listenter.
These make sure that the button are in the right place and become blue when pressed

*/

window.onload = function() {
    alert("UwU");
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Start button object
const StartButton = document.getElementById("startButton");

// Game canvas object
const canvas = document.getElementById('gameCanvas');

// Game canvas context
const ctx = canvas.getContext('2d');

// Starts game when called
startButton.addEventListener("click", function() {
    // Game Code goes here
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    startButton.style.display = 'none';
});

const HowToPlayButton = document.getElementById("howToPlayButton");

// Game canvas object
const canvasHowTo = document.getElementById('gameCanvas');

// Game canvas context
const ctxHowTo = canvas.getContext('2d');

// Shows "How To Play" instructions when called
HowToPlayButton.addEventListener("click", function() {
    // Clear the canvas and show instructions
    ctxHowTo.fillStyle = 'blue';
    ctxHowTo.fillRect(0,0, canvas.width, canvas.height);
    // Optionally, hide the button after clicking
    HowToPlayButton.style.display = 'none';
});
