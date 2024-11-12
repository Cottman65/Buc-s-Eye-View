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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu button objects
const startButton = { x: 300, y: 200, width: 200, height: 50, text: "Start Game" };
const howToPlayButton = { x: 300, y: 300, width: 200, height: 50, text: "How to Play" };

// Game canvas object
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



function drawMenuButtons() {
  // Draw Start Game Button
  ctx.fillStyle = "#00053E";
  ctx.fillRect(startButton.x, startButton.y, startButton.width, startButton.height);
  ctx.fillStyle = "#FFC72C";
  ctx.font = "20px Arial";
  ctx.fillText(startButton.text, startButton.x + 30, startButton.y + 30);

  // Draw How to Play button
  ctx.fillStyle = "#00053E";
  ctx.fillRect(howToPlayButton.x, howToPlayButton.y, howToPlayButton.width, howToPlayButton.height);
  ctx.fillStyle = "#FFC72C";
  ctx.fillText(howToPlayButton.text, howToPlayButton.x + 30, howToPlayButton.y + 30);
}

// Initializes the game when called
function initializeGame() {
    
    // Show the game screen
  document.getElementById("gameScreen").style.display = "block";

  // Clear the canvas and display game start message
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00FF00";
  ctx.font = "30px Arial";
  ctx.fillText("Game Started!", 300, 300);
}

// Shows the how to play instructions when called
function showHowToPlay() {
    // Hide the start and how-to-play buttons
    document.getElementById("startButton").style.display = "none";
    document.getElementById("howToPlayButton").style.display = "none";

    // Show the game screen
    document.getElementById("gameScreen").style.display = "block";

    // Initialize the game canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas and display how-to-play instructions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Arial";
    ctx.fillText("How to Play", 350, 100);
    ctx.font = "20px Arial";
    ctx.fillText("This is where.", 200, 200);
    ctx.fillText("The how to play", 200, 250);
    ctx.fillText("instructions will go", 200, 300);
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Check if Start Game button was clicked
    if (
      x > startButton.x &&
      x < startButton.x + startButton.width &&
      y > startButton.y &&
      y < startButton.y + startButton.height
    ) {
      initializeGame();
    }
    // Check if How to Play button was clicked
    else if (
      x > howToPlayButton.x &&
      x < howToPlayButton.x + howToPlayButton.width &&
      y > howToPlayButton.y &&
      y < howToPlayButton.y + howToPlayButton.height
    ) {
      showHowToPlay();
    }
  }

// Intializes menu buttons
drawMenuButtons();

// Add event listen for canvas clicks
canvas.addEventListener("click", handleCanvasClick);