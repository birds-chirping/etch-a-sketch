const gridContainer = document.querySelector('.grid-container');

const clearBtn = document.getElementById('clear');
const randomBtn = document.getElementById('random');
const defaultBtn = document.getElementById('default');


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

    changeColorOnHover();
}


function changeColorOnHover(param) {
    squares.forEach(square => {
        square.addEventListener('mouseover', changeColor);
    });

    function changeColor(e) {
        if (param) {
            changeSquareColor(e.target, param());
        } else {
            changeSquareColor(e.target);
        }
    };
}


function changeSquareColor(square, color=selectedColor) {
    square.setAttribute('style', `background-color: ${color}`);
}

function pickRandomColors() {
    let randomColor = Math.floor(Math.random() * 360);
    return `hsl(${randomColor}, 100%, 50%)`
}



//-------------------------------------------------------------------
//-------------------------------------------------------------------

createGrid(gridSize);

//----------------------------event listeners------------------------

//------------clear button:
clearBtn.addEventListener('click', function() {
    squares.forEach(function(e) {
        changeSquareColor(e, '#FFFFFF');
    });
});

//-------------random button:
randomBtn.addEventListener('click', function() {
    changeColorOnHover(pickRandomColors);
});

//-------------default button:
defaultBtn.addEventListener('click', function() {
    changeColorOnHover();
});

    
//------------size slider:
sizeSlider.addEventListener('change', function() {
    gridSize = this.value;
    sizeValue.textContent = this.value;
    createGrid(gridSize);
})


//------------hue slider:
hueSlider.addEventListener('change', function() {
    hueValue.textContent = this.value;
    hue = `hsl(${this.value}, 100%, 50%)`;
    hueCanvas.setAttribute('style', `background-color: ${hue}`);
    selectedColor = hue;
})




// todo: 
// add erase button
// arrange divs in body
// allow picked color canvas to be clickable

