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
  drawInstructions(); // Draw instructions page
}

// Button Objects for Page Three (Positioned at the bottom)
const buttonPageThree = [
  { x: 50, y: canvas.height - 60, width: 150, height: 50, text: "Button 1" },
  { x: 220, y: canvas.height - 60, width: 150, height: 50, text: "Button 2" },
  { x: 390, y: canvas.height - 60, width: 150, height: 50, text: "Button 3" },
  { x: 560, y: canvas.height - 60, width: 150, height: 50, text: "Button 4" }
];

// Array of image paths for randomization
const imagesArray = [
  "assets/images/BurginE.DossettHall.jpg",
  "assets/images/LucilleClementHall.jpg",
  "assets/images/MiniDome.jpg",
  "assets/images/CulpCave.jpg"
];

// Variable to hold the currently displayed image
let currentImage = null;

// Function to load and display a random image
function loadRandomImage() {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  const selectedImage = imagesArray[randomIndex];

  const img = new Image();
  img.src = selectedImage;

  img.onload = function() {
      const aspectRatio = img.width / img.height;
      let imgWidth = canvas.width;
      let imgHeight = canvas.width / aspectRatio;

      if (imgHeight > canvas.height) {
          imgHeight = canvas.height;
          imgWidth = canvas.height * aspectRatio;
      }

      const xOffset = (canvas.width - imgWidth) / 2;
      const yOffset = (canvas.height - imgHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
      currentImage = img;

      // Draw buttons on top of the image
      drawButtons();
  };
}

// Function to draw the 4 interactive buttons
function drawButtons() {
  buttonPageThree.forEach((button, index) => {
      console.log(`Drawing Button ${index + 1}: x=${button.x}, y=${button.y}`);
      ctx.fillStyle = "#00053E";
      ctx.fillRect(button.x, button.y, button.width, button.height);

      ctx.fillStyle = "#FFC72C";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
  });
}

// Function to handle clicks on the canvas
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
      console.log("Start Game button clicked");
      initializeGame();  // Initialize the game when the button is clicked
  }
  // Delegate to handle other button clicks if on Page Three
  else {
      handlePageThreeButtonClick(x, y);
  }
}

// Function to handle button clicks on Page Three
function handlePageThreeButtonClick(x, y) {
  let buttonClicked = false;

  buttonPageThree.forEach((button, index) => {
      if (
          x > button.x &&
          x < button.x + button.width &&
          y > button.y &&
          y < button.y + button.height
      ) {
          console.log(`Button ${index + 1} clicked!`);
          alert(`Button ${index + 1} is clicked!`);
          buttonClicked = true;

          // After button click, load a new random image
          loadRandomImage();
      }
  });

  if (!buttonClicked) {
      console.log("Click outside Page Three buttons.");
  }
}

// Function to show Page 3
function showPageThree() {
  console.log("Transitioning to Page Three...");
  loadRandomImage();  // Load the image and buttons
}

// Function to initialize the game and transition to instructions page
function initializeGame() {
  document.getElementById("gameScreen").style.display = "block";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawInstructions();  // Show the instructions

  // Change the click event to listen for the "Continue" button
  canvas.removeEventListener("click", handleCanvasClick);
  canvas.addEventListener("click", handleContinueClick);  // Set listener for the Continue button
}

// Function to handle the "Continue" button click on the instructions page
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
      showPageThree();  // Show the third page with interactive buttons
      canvas.removeEventListener("click", handleContinueClick);
      canvas.addEventListener("click", handleCanvasClick);  // Switch to handling button clicks on Page 3
  }
}
