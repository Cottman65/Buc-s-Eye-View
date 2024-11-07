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