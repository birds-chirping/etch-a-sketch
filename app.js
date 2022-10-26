// Get the root element
let r = document.querySelector(':root');
let rs = getComputedStyle(r);

// grid
const gridContainer = document.querySelector('.grid-container');

// buttons
const clearBtn = document.getElementById('clear');
const randomBtn = document.getElementById('random');
const defaultBtn = document.getElementById('default');
const eraseBtn = document.getElementById('erase');

// size slider
const sizeSlider = document.getElementById('size-range');
const sizeValue = document.getElementById('size-value');

// color 
const hueSlider = document.getElementById('hue-range');
const hueValue = document.getElementById('hue-value');
const satSlider = document.getElementById('sat-range');
const satValue = document.getElementById('sat-value');
const lightSlider = document.getElementById('light-range');
const lightValue = document.getElementById('light-value');
const colorCanvas = document.getElementById('chosen-hue');


// starting settings
let gridSize = sizeSlider.value;
let selectedColor = '#FF0000';
let squares = [];
let random = false;
let hue = 0;
let saturation = '100%';
let lightness = '50%';



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

function getColor() {
    random === false ? selectedColor : selectedColor = pickRandomColor(); 
    return selectedColor;
} 

function pickRandomColor() {
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
       
    return `hsl(${h}, ${s}%, ${l}%)`;
}

//----------------------CSS variables:
function changeColorValues(param, value) {
    r.style.setProperty(param, value);
  }

function getLastUsedColor() {
    let h = rs.getPropertyValue('--hue');
    let s = rs.getPropertyValue('--sat');
    let l = rs.getPropertyValue('--light');
    return `hsl(${h}, ${s}, ${l})`;
}

//-------------------------------------------------------------------
//---------------------------APP-------------------------------------

createGrid(gridSize);

//----------------------------event listeners------------------------

//------------clear button:
clearBtn.addEventListener('click', function() {
    random = false;
    selectedColor = '#FFFFFF';
    squares.forEach(function(e) {
        changeSquareColor(e);
    });
    selectedColor = getLastUsedColor();
});

//-------------random button:
randomBtn.addEventListener('click', function() {
    random = true;
});

//-------------default button:
defaultBtn.addEventListener('click', function() {
    random = false;
    selectedColor = getLastUsedColor();
    
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
    hue = this.value;
    colorCanvas.setAttribute('style', `background-color: hsl(${hue}, ${saturation}, ${lightness})`);
    selectedColor = `hsl(${hue}, ${saturation}, ${lightness})`;
    changeColorValues('--hue', hue);        
})

//-----------saturation slider:
satSlider.addEventListener('change', function() {
    satValue.textContent = this.value; 
    saturation = `${this.value}%`;
    colorCanvas.setAttribute('style', `background-color: hsl(${hue}, ${saturation}, ${lightness})`);    
    selectedColor = `hsl(${hue}, ${saturation}, ${lightness})`;
    changeColorValues('--sat', saturation);        
})

//-----------lightness slider:
lightSlider.addEventListener('change', function() {
    lightValue.textContent = this.value; 
    lightness = `${this.value}%`
    colorCanvas.setAttribute('style', `background-color: hsl(${hue}, ${saturation}, ${lightness})`);    
    selectedColor = `hsl(${hue}, ${saturation}, ${lightness})`;
    changeColorValues('--light', lightness);        
})


// todo: 
// arrange divs in body
// darken function

