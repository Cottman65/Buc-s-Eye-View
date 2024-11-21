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
    drawPageThree(); // Show the third page made by Chatgpt
    canvas.removeEventListener("click", handleContinueClick);
    canvas.addEventListener("click", handlebuttonClick);
  }
}

 // Function to handle canvas clicks
 function handlebuttonClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;  // Get the x position of the click
  const y = event.clientY - rect.top;   // Get the y position of the click

  // Check if the click is within any of the buttons' bounds
  buttons.forEach((button, index) => {
    if (x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height) {
      alert(`You clicked ${button.text}! the id is ${button.id}`);  // Show which button was clicked
    }
  });
}