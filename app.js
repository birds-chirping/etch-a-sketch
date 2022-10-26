const gridContainer = document.querySelector('.grid-container');
const clearBtn = document.getElementById('clear');
const sizeSlider = document.getElementById('size-range');
const sizeValue = document.getElementById('size-value');
const hueSlider = document.getElementById('hue-range');
const hueCanvas = document.getElementById('chosen-hue');
const hueValue = document.getElementById('hue-value');


// starting settings
let gridSize = sizeSlider.value;
console.log(gridSize)
let selectedColor = '#FF0000';
let squares = [];



function createGrid(size) {
    gridContainer.textContent = '';

    let id = 1;
    for (let row = 0; row < size; row++) {
        const gridRow = document.createElement('div');
        gridRow.setAttribute('class', 'grid-row');
    
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div');
            square.setAttribute('class','square');
            square.setAttribute('id', `${id}`);
            squares.push(square);
            gridRow.appendChild(square);
            id++;
        }
        gridContainer.appendChild(gridRow);
    } 

    //--------------squares event listener----------------------
    squares.forEach(square => {
        // console.log(square.id, selectedColor);
        square.addEventListener('mouseover', changeSquareColor.bind(null, square, selectedColor))
    });
}


function changeSquareColor(square, color) {
    square.setAttribute('style', `background-color: ${color}`);
}

function clearCanvas() {
    squares.forEach(square => changeSquareColor(square,'#FFF'));
}


//-------------------------------------------------------------------
createGrid(gridSize);

//----------------------------event listeners------------------------

//------------clear button:
clearBtn.addEventListener('click', clearCanvas);
    
//------------size slider:
sizeSlider.addEventListener('change', function() {
    // console.log(this.value);
    gridSize = this.value;
    sizeValue.textContent = this.value;
    createGrid(gridSize);
})


//------------hue slider:
hueSlider.addEventListener('change', function() {
    hueValue.textContent = this.value;
    hue = `hsl(${this.value}, 100%, 50%)`;
    hueCanvas.setAttribute('style', `background-color: ${hue}`);
    console.log(hueCanvas);
})




// todo: 
// add random color  
// arrange divs in body
