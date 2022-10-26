const gridContainer = document.querySelector('.grid-container');

const clearBtn = document.getElementById('clear');
const randomBtn = document.getElementById('random');
const defaultBtn = document.getElementById('default');
const eraseBtn = document.getElementById('erase');


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
let random = false;



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


function changeColorOnHover() {
    squares.forEach(square => {
        square.addEventListener('mouseover', changeColor);
    });

    function changeColor(e) {
        if (random === false) {
            changeSquareColor(e.target, selectedColor);
        } else {
            changeSquareColor(e.target);
        }
        
    };
}


function changeSquareColor(square, color=getColor()) {
    square.setAttribute('style', `background-color: ${color}`);
}

function pickRandomColor() {
    let randomColor = Math.floor(Math.random() * 360);
    return `hsl(${randomColor}, 100%, 50%)`
}


function getColor() {
    random === false ? selectedColor : selectedColor = pickRandomColor(); 
    return selectedColor;
} 

//-------------------------------------------------------------------
//-------------------------------------------------------------------

createGrid(gridSize);

//----------------------------buttons------------------------

//------------clear button:
clearBtn.addEventListener('click', function() {
    random = false;
    selectedColor = '#FFFFFF';
    squares.forEach(function(e) {
        changeSquareColor(e);
    });
    selectedColor = '#FF0000';
});

//-------------random button:
randomBtn.addEventListener('click', function() {
    random = true;
});

//-------------default button:
defaultBtn.addEventListener('click', function() {
    random = false;
    selectedColor = '#FF0000';
});


//-------------erase button:
eraseBtn.addEventListener('click', function() {
    random = false;
    selectedColor = '#FFFFFF';
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

