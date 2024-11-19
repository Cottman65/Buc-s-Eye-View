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

// Array of image file paths (replace these with your actual file paths)
const imagesArray = [
    "assets/image.jpg",
    "assets/image.jpg",
    "assets/image.jpg",
    "assets/image.jpg"
];

// Variable to track whether the game has started
let gameStarted = false;

// Function to resize the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
}

// Draw menu to the canvas
function drawMenu() {
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

// Draw instructions to the canvas
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

    // Clear the canvas and display instructions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawInstructions();
}

// Function to load and display a random image
function loadRandomImage() {
    // Randomly select an image from the array
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    const selectedImage = imagesArray[randomIndex];

    // Load and display the selected image
    const img = new Image(); // Create a new image object
    img.src = selectedImage; // Set the image source to the randomly selected image

    img.onload = function () {
        // Calculate scaling to fit the canvas while maintaining the aspect ratio
        const aspectRatio = img.width / img.height;
        let imgWidth = canvas.width;
        let imgHeight = canvas.width / aspectRatio;

        if (imgHeight > canvas.height) {
            imgHeight = canvas.height;
            imgWidth = canvas.height * aspectRatio;
        }

        const xOffset = (canvas.width - imgWidth) / 2;
        const yOffset = (canvas.height - imgHeight) / 2;

        // Draw the image centered on the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
        ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);
    };
}

// Starts the game when called
function startGame() {
    // Show the game screen
    document.getElementById("gameScreen").style.display = "block";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load the first random image
    loadRandomImage();

    // Update gameStarted to true
    gameStarted = true;
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
    // Check if instruction start button was clicked
    else if (
        x > startGameButton.x &&
        x < startGameButton.x + startGameButton.width &&
        y > startGameButton.y &&
        y < startGameButton.y + startGameButton.height
    ) {
        // If the game has started, load the next random image
        if (gameStarted) {
            loadRandomImage();
        } else {
            startGame();
        }
    }
}

// Initializes menu buttons
drawMenu();

// Add event listener for canvas clicks
canvas.addEventListener("click", handleCanvasClick);
