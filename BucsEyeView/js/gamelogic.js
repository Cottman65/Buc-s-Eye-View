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