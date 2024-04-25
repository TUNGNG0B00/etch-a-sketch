// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function(){
  // Select the drawing board container, size slider, color picker, and other necessary elements
  const board = document.querySelector('.board');
  const sizeSlider = document.querySelector('#sizeSlider');
  const colorPicker = document.querySelector('#colorPicker');
  let sizeValue = document.querySelector('#sizeValue');
  let size = parseInt(sizeSlider.value);
 
  // Select buttons for clearing, erasing, changing color mode, and activating rainbow mode
  let clearButton = document.querySelector('#clearBtn');
  let eraseButton = document.querySelector('#eraserBtn');
  let colorButton = document.querySelector('#colorBtn');
  let rainbowButton= document.querySelector('#rainBowBtn');
  
  // Initialize the default color value from the color picker
  let colorValue = colorPicker.value;

  // Event listener for changing color in the color picker
  colorPicker.addEventListener('input', () => {
    colorValue = colorPicker.value;
  });

  // Event listener for activating rainbow mode
  rainbowButton.addEventListener('click', rainbowMode); 

  // Function to enable rainbow drawing mode
  function rainbowMode() {
    let divs = board.querySelectorAll('div');
    divs.forEach(div => {
      div.addEventListener('mouseover', () => {
        // Change background color to a random RGB value
        div.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
      });
    });
  }

  // Event listener for activating single-color drawing mode
  colorButton.addEventListener('click', colorMode); 

  // Function to enable single-color drawing mode
  function colorMode(){
    const divs = board.querySelectorAll('div');
    divs.forEach(div => {
      div.addEventListener('mouseover', () => {
        // Change background color to the selected color
        div.style.backgroundColor = colorValue;
      });
    });
  }

  // Event listener for clearing the drawing board
  clearButton.addEventListener('click', removeGrid); 

  // Function to clear the drawing board
  function removeGrid(){
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
    createGrid(size);
  }

  // Event listener for activating eraser mode
  eraseButton.addEventListener('click', eraseGrid); 

  // Function to enable eraser mode
  function eraseGrid() {
    const divs = board.querySelectorAll('div');
    divs.forEach(div => {
      div.addEventListener('mouseover', () => {
        // Change background color to white (erase)
        div.style.backgroundColor = 'white';
      });
    });
  }

  // Function to create the grid of div elements for drawing
  function createGrid() {
    // Set the grid dimensions based on the selected size
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let numDivs = size * size;

    // Remove existing div elements
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }

    // Create new div elements and attach mouseover event listeners
    for (let i = 0; i < numDivs; i++) {
      const div = document.createElement('div');
      div.addEventListener('mouseover', () => {
        // Apply the selected drawing mode on mouseover
        div.style.backgroundColor = colorPicker.value;
      });
      board.insertAdjacentElement('beforeend', div);
    }
  }

  // Initialize the drawing board with the default size
  createGrid();

  // Event listener for changing the grid size using the slider
  sizeSlider.addEventListener('input', () => {
    // Update the size variable and regenerate the grid
    size = parseInt(sizeSlider.value);
    createGrid();
    // Update the displayed size value
    sizeValue.textContent = `${size} x ${size}`;
  });
});

