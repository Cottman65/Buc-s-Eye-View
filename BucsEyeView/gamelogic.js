// Starts the game when called
function startGame() {
  // Hide the start button
  document.getElementById("startGameButton").style.display = "none";

  // Show the game screen
  document.getElementById("gameScreen").style.display = "block";

  // Initialize the game canvas
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Clear the canvas and display instructions
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawInstructions(); // Draw the instructions page

  // Change the click event to listen for the "Continue" button
  canvas.removeEventListener("click", handleCanvasClick);
  canvas.addEventListener("click", handleContinueClick);
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
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

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

  // Check if Continue button was clicked
  if (
    x > startGameButton.x &&
    x < startGameButton.x + startGameButton.width &&
    y > startGameButton.y &&
    y < startGameButton.y + startGameButton.height
  ) {
    drawPageThree(); // Show the third page
    canvas.removeEventListener("click", handleContinueClick);
    canvas.addEventListener("click", handlePageThreeButtonClick); // Switch to the page three button handler
  }
}

// Variables for game logic
const maxAttempts = 5;
let attempt = 1;
let score = 0;

// Function to handle canvas clicks on page three
function handlePageThreeButtonClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left; // Get the x position of the click
  const y = event.clientY - rect.top;  // Get the y position of the click

  // Check if the click is within any of the page three buttons' bounds
  buttons.forEach((button) => {
    if (x > button.x && x < button.x + button.width && y > button.y && y < button.y + button.height) {
      if (attempt <= maxAttempts) {
        console.log(`You clicked the ${button.text} button!`);

        if (button.id === correctId) {
          score++;
        }

        attempt++;

        if (attempt > maxAttempts) {
          showEndScreen();
        } else {
          drawRandomImage(); // Display a new random image
        }
      }
    }
  });
}

// Function to display the end screen
function showEndScreen() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Display game over and score
  ctx.fillStyle = "#00053E";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFC72C";
  ctx.textAlign = "center";
  ctx.font = "30px Arial";
  ctx.fillText(`Game Over!`, canvas.width / 2, canvas.height / 3);
  ctx.fillText(`Your Score: ${score}/${maxAttempts}`, canvas.width / 2, canvas.height / 2);

  let feedback = "";

  if (score === maxAttempts) {
    feedback = "Amazing! You got a perfect score!";
  } else if (score >= maxAttempts * 0.7) {
    feedback = "Great job! You did really well!";
  } else if (score >= maxAttempts * 0.4) {
    feedback = "Not bad, but you can do better!";
  } else {
    feedback = "Keep practicing! You'll get it next time!";
  }

  ctx.fillText(feedback, canvas.width / 2, canvas.height / 1.5);

  // Play Again Button
  const buttonWidth = 150;
  const buttonHeight = 50;
  const buttonX = (canvas.width - buttonWidth) / 2;
  const buttonY = canvas.height / 1.2;

  ctx.fillStyle = "#00053E";
  ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  ctx.fillStyle = "#FFC72C";
  ctx.font = "20px Arial";
  ctx.fillText("Play Again", canvas.width / 2, buttonY + buttonHeight / 2);

  canvas.addEventListener("click", function handlePlayAgainClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight) {
      canvas.removeEventListener("click", handlePlayAgainClick);
      resetGame();
    }
  });
}

// Reset the game
function resetGame() {
  score = 0;
  attempt = 1;
  startGame();
}

// Array of images for randomization
const images = [
  'assets/images/CulpCave.jpg',
  'assets/images/MiniDome.jpg',
  'assets/images/LucilleClementHall.jpg',
  'assets/images/BurginE.DossettHall.jpg',
  'assets/images/image1.jpg',
  'assets/images/ParkingServices',
  'assets/images/ReeseMuseum.jpg',
  'assets/images/TheBell.jpg',
  'assets/images/Tri-HallField_Gazebo.jpg',
  'assets/images/William B. Green Jr. Stadium.jpg',
  'assets/images/BrinkleyCenterTunnel.png'
];

// Function to draw a randomized image on the canvas
function drawRandomImage() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const img = new Image();

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Calculate the position to center the image
    const x = (canvas.width - img.width) / 2;
    const y = (canvas.height - img.height) / 2;

    // Draw the image at its original size, centered
    ctx.drawImage(img, x, y);

    // Now, draw the buttons on top of the image
    drawPageThreeButtons(); // Function to draw existing buttons on top of the image
  };

  img.src = randomImage; // Start loading the image
}

// Function to draw the existing buttons on page three (on top of the image)
function drawPageThreeButtons() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  buttons.forEach((button) => {
    ctx.fillStyle = "#00053E";  // Button color
    ctx.fillRect(button.x, button.y, button.width, button.height);  // Draw button
    ctx.fillStyle = "#FFC72C";  // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px Arial";
    ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);  // Draw text on button
  });
}
