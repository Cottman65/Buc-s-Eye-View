
// Function to draw buttons on the canvas
function drawButtons(randomNum) {
  uniqueTexts = shuffleArray([...buttonTexts]).slice(0, 4);
  // Gets a random correct answer
  var randomAnswer = Math.floor(Math.random() * buttons.length);


  // setting correct Id to the buttons id
  correctId = buttons[randomAnswer].id;
  console.log('CORRECT ID ' + correctId);
  console.log('BUTTON ID ' + buttons[randomAnswer].id);

  // Sets the correct buttons text to the image's name

  buttons[correctId].text = buttonTexts[randomNum];

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