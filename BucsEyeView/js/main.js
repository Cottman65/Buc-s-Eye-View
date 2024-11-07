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