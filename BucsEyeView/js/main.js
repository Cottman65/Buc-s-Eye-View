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
const startGameButton = { x: 300, y: 300, width: 200, height: 50, text: "Continue" };

// Game canvas object
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to resize the canvas
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
}

document.addEventListener("click", (event) => {
  console.log(`Global click detected: x=${event.clientX}, y=${event.clientY}`);
});

// Draw menu to the canvas
function drawMenu() {

  // Draw the title
  ctx.fillStyle = "#00053E"; // Dark blue color
  ctx.font = "40px Arial"; // Larger font for the title
  ctx.textAlign = "center";
  ctx.fillText("Buc Eye View", canvas.width / 2, 100); // Position at the top center of the canvas
  
  ctx.textAlign = "start";
  // Draw Start Game Button
  ctx.fillStyle = "#00053E";
  ctx.fillRect(startButton.x, startButton.y, startButton.width, startButton.height);
  ctx.fillStyle = "#FFC72C";
  ctx.font = "20px Arial";
  ctx.fillText(startButton.text, startButton.x + 30, startButton.y + 30);


}

// Draws instructions to the canvas
function drawInstructions() {

  ctx.fillStyle = "#00053E";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("How to Play", canvas.width / 2, 50);

  // Instructions Text
  ctx.font = "18px Arial";
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFC72C";

  const instructions = [
    "You’ll see five unique images from around campus, and your goal is to identify the location",
     "shown in each photo. With each image, you’ll find four multiple-choice options; tap on the one",
     "that best matches the location. You only get one guess per image, so choose carefully!",
     "Every day brings a new set of images for a fresh challenge, so come back daily",
     "to test your campus knowledge."
  ];

  let yPosition = 100; // Starting y position for instructions text

    // Display each line with a gap between lines
    instructions.forEach(line => {
        ctx.fillText(line, 50, yPosition);
        yPosition += 30; // Increase y position for the next line
    });


  // Draw instruction menu start button
  ctx.fillStyle = "#00053E";
  ctx.fillRect(startGameButton.x, startGameButton.y, startGameButton.width, startGameButton.height);
  ctx.fillStyle = "#FFC72C";
  ctx.fillText(startGameButton.text, startGameButton.x + 30, startGameButton.y + 30);
}

// Initializes the game and shows game instructions when called
function initializeGame() {
    
    // Show the game screen
  document.getElementById("gameScreen").style.display = "block";

  // Clear the canvas and displays instructions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawInstructions();
}

// Starts the game when called
function startGame() {
    // Hide the start button
    document.getElementById("startGameButton").style.display = "none";

    // Show the game screen
    document.getElementById("gameScreen").style.display = "block";

    // Initialize the game canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas and display how-to-play instructions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // PUT GAME LOGIC HERE
}

// New Button Objects for Page Three (Positioned at the bottom) made by chatgpt
const buttonPageThree = [
  { x: 50, y: canvas.height - 60, width: 150, height: 50, text: "Button 1" },
  { x: 220, y: canvas.height - 60, width: 150, height: 50, text: "Button 2" },
  { x: 390, y: canvas.height - 60, width: 150, height: 50, text: "Button 3" },
  { x: 560, y: canvas.height - 60, width: 150, height: 50, text: "Button 4" }
];

// Function to draw the third page with four buttons made by Chatgpt
function drawPageThree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = "#00053E";
  ctx.font = "40px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Welcome to Page Three", canvas.width / 2, 100);

  // Buttons
  buttonPageThree.forEach((button, index) => {
    console.log(`Drawing Button ${index + 1}: x=${button.x}, y=${button.y}`); // Debug log
    ctx.fillStyle = "#00053E";
    ctx.fillRect(button.x, button.y, button.width, button.height);

    ctx.fillStyle = "#FFC72C";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
  });
}


// Function to handle clicks on the buttons (including page three)
function handleCanvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Debug: log click position
  console.log(`Click detected at: x=${x}, y=${y}`);

  // Check if Start Game button was clicked
  if (
    x > startButton.x &&
    x < startButton.x + startButton.width &&
    y > startButton.y &&
    y < startButton.y + startButton.height
  ) {
    initializeGame();
  }
  // Check if instruction start button was clicked
  else if (
    x > startGameButton.x &&
    x < startGameButton.x + startGameButton.width &&
    y > startGameButton.y &&
    y < startGameButton.y + startGameButton.height
  ) {
    startGame();
  }
  // Delegate to the separate Page Three button handler
  else {
    handlePageThreeButtonClick(x, y);
  }
}


// Function to initialize the game, show the instructions, and transition to page three
function initializeGame() {
  // Show the game screen
  document.getElementById("gameScreen").style.display = "block";

  // Clear the canvas and display instructions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawInstructions(); // Draw the instructions page

  // Change the click event to listen for the "Continue" button
  canvas.removeEventListener("click", handleCanvasClick);
  canvas.addEventListener("click", handleContinueClick);
}

// Function to handle the click event for the "Continue" button
function handleContinueClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Check if Continue button was clicked on the instruction page
  if (
    x > startGameButton.x &&
    x < startGameButton.x + startGameButton.width &&
    y > startGameButton.y &&
    y < startGameButton.y + startGameButton.height
  ) {
    showPageThree(); // Show the third page made by Chatgpt
    canvas.removeEventListener("click", handleContinueClick);
    canvas.addEventListener("click", handlePageThreeButtonClick);
  }
}

// Function to handle button clicks on Page Three made by Chatgpt
function handlePageThreeButtonClick(x, y) {
  console.log(`Checking clicks for Page Three: x=${x}, y=${y}`); // Debug log

  let buttonClicked = false;

  buttonPageThree.forEach((button, index) => {
    if (
      x > button.x &&
      x < button.x + button.width &&
      y > button.y &&
      y < button.y + button.height
    ) {
      console.log(`Button ${index + 1} clicked!`); // Debug log
      alert(`Button ${index + 1} is clicked!`); // Popup message
      buttonClicked = true;
    }
  });

  if (!buttonClicked) {
    console.log("Click outside Page Three buttons.");
  }
}


// Function to show Page 3 after the "Continue" button is clicked made by Chatgpt
function showPageThree() {
  console.log("Transitioning to Page Three..."); // Debug log
  // Show Page 3 by drawing it on the canvas
  drawPageThree();
}

// Call this function to initialize the menu and display the start game
drawMenu();

// Event listener for canvas clicks
canvas.addEventListener("click", handleCanvasClick);
