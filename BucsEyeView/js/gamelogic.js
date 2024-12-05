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

  

  // Function to shuffle an array (Fisher-Yates Shuffle) made by Chatgpt
 function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
  }

  // Predefined unique texts for buttons made by Chatgpt
  const buttonTexts = ["The Cave", "Mini Dome", "Lucille Clemet", "Dossett Hall", "Parking Services", "Reese Museum", "The Bell", "Tri-Hall Field", "Stadium", "The Tunnel"];

  // Shuffle the texts and pick the first four for the buttons made by Chatgpt
  var uniqueTexts = shuffleArray([...buttonTexts]).slice(0, 4);

  const buttons = [
    { id: 0, x: 50, y: canvas.height - 60, width: 150, height: 50, text: uniqueTexts[0] },
    { id: 1, x: 220, y: canvas.height - 60, width: 150, height: 50, text: uniqueTexts[1] },
    { id: 2, x: 390, y: canvas.height - 60, width: 150, height: 50, text: uniqueTexts[2] },
    { id: 3, x: 560, y: canvas.height - 60, width: 150, height: 50, text: uniqueTexts[3] }
  ];


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
    feedback = "Amazing! You must loooove walking, huh?";
  } else if (score >= maxAttempts * 0.7) {
    feedback = "Wow, nice.";
  } else if (score >= maxAttempts * 0.4) {
    feedback = "You can do better than that.";
  } else {
    feedback = "Keep practicing, bozo.";
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
  'assets/images/BurginEDossettHall.jpg',
  'assets/images/ParkingServices.jpg',
  'assets/images/ReeseMuseum.jpg',
  'assets/images/TheBell.jpg',
  'assets/images/TriHallFieldGazebo.jpg',
  'assets/images/WilliamBGreeneJrStadium.jpg',
  'assets/images/BrinkleyCenterTunnel.png'
];

let shownImages = [];

function drawRandomImage() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Get a random image index that has not been shown before
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * images.length);
  } while (shownImages.includes(randomNum)); // Repeat if the image has been shown

  // Add the selected random image to the shownImages array
  shownImages.push(randomNum);

  // Check if all images have been shown
  if (shownImages.length === images.length) {
    console.log("All images have been shown.");
    // Trigger action when all images have been shown (e.g., show a message)
    alert("All images have been shown!"); // Replace with your preferred action
    
    // Optionally, reset the images for another round or stop further image drawing
    shownImages = []; // Comment this to stop game
    // Or, you could disable the button, stop the game, etc.
  }

  const randomImage = images[randomNum];
  const img = new Image();

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Calculate the position to center the image
    const x = (canvas.width - img.width) / 2;
    const y = (canvas.height - img.height) / 2;

    // Draw the image at its original size, centered
    ctx.drawImage(img, x, y);

    // Now, draw the buttons on top of the image
    drawButtons(randomNum); // Draw the buttons with the correct text
  };

  img.src = randomImage; // Start loading the image
}