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
const darkenBtn = document.getElementById('darken');

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
let darken = false;
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
            square.style.backgroundColor = '#FFFFFF';
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
        if (random === true) {
            changeSquareColor(e.target);
        } else if (darken === true) {
            const square = e.target;
            const darkBg = square.getAttribute('darkened-bg');
            let darkenRed;
            let darkenBlue;
            let darkenGreen;

            let bgColor = square.style.backgroundColor;     // 
            rgb = /^rgb\((\d+), (\d+), (\d+)\)$/;           // get r, g, b values
            let match = bgColor.match(rgb);                 //

            // Get 10% lightness of initial color
            if (!square.getAttribute('darken-red') || bgColor != darkBg) {
                darkenRed = `${Math.floor(match[1] / 10 + 1)}`;
                darkenGreen = `${Math.floor(match[2] / 10 + 1)}`;
                darkenBlue = `${Math.floor(match[3] / 10 + 1)}`;
                square.setAttribute('darken-red', darkenRed);
                square.setAttribute('darken-green', darkenGreen);
                square.setAttribute('darken-blue', darkenBlue);
                console.log('Primul');
            } else {
                darkenRed = square.getAttribute('darken-red');
                darkenGreen = square.getAttribute('darken-green');
                darkenBlue = square.getAttribute('darken-blue');
                console.log('DOI');
            }

            // Darken background color with 10%
            let red = Math.max(0, match[1] - darkenRed);
            let green = Math.max(0, match[2] - darkenGreen);
            let blue = Math.max(0, match[3] - darkenBlue);
            let newBgColor = `rgb(${red}, ${green}, ${blue})`;
            square.style.backgroundColor = newBgColor;
        
            // Save darkened bg color for comparison with actual bg color
            square.setAttribute('darkened-bg', newBgColor);
        } else {
            changeSquareColor(e.target, selectedColor);
        }  
    }
}

function changeSquareColor(square, color=getColor()) {
    square.setAttribute('style', `background-color: ${color}`);
}

function getColor() {
    random === true ? selectedColor = pickRandomColor() : 
    darken === true ? selectedColor = darkenColor() :
    selectedColor; 
    return selectedColor;
} 

function pickRandomColor() {
    let h = Math.floor(Math.random() * 361);
    let s = Math.floor(Math.random() * 101);
    let l = Math.floor(Math.random() * 101);
       
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
    darken = false;
    selectedColor = '#FFFFFF';
    squares.forEach(function(e) {
        changeSquareColor(e);
    });
    selectedColor = getLastUsedColor();
});

//-------------random button:
randomBtn.addEventListener('click', function() {
    random = true;
    darken = false;
    
});

//-------------default button:
defaultBtn.addEventListener('click', function() {
    darken = false;
    random = false;
    selectedColor = getLastUsedColor();
    
});

//-------------erase button:
eraseBtn.addEventListener('click', function() {
    darken = false;
    random = false;
    selectedColor = '#FFFFFF';
});

//-------------darnek button:
darkenBtn.addEventListener('click', function() {
    random = false;
    darken = true;
});

//------------sliders------------------------------------------
sizeSlider.addEventListener('change', function() {
    gridSize = this.value;
    sizeValue.textContent = this.value;
    createGrid(gridSize);
})

hueSlider.addEventListener('change', function() {
    darken = false;
    random = false;
    hueValue.textContent = this.value; 
    hue = this.value;
    colorCanvas.setAttribute('style', `background-color: hsl(${hue}, ${saturation}, ${lightness})`);
    selectedColor = `hsl(${hue}, ${saturation}, ${lightness})`;
    changeColorValues('--hue', hue);        
})

satSlider.addEventListener('change', function() {
    darken = false;
    random = false;
    satValue.textContent = this.value; 
    saturation = `${this.value}%`;
    colorCanvas.setAttribute('style', `background-color: hsl(${hue}, ${saturation}, ${lightness})`);    
    selectedColor = `hsl(${hue}, ${saturation}, ${lightness})`;
    changeColorValues('--sat', saturation);        
})

lightSlider.addEventListener('change', function() {
    darken = false;
    random = false;
    lightValue.textContent = this.value; 
    lightness = `${this.value}%`
    colorCanvas.setAttribute('style', `background-color: hsl(${hue}, ${saturation}, ${lightness})`);    
    selectedColor = `hsl(${hue}, ${saturation}, ${lightness})`;
    changeColorValues('--light', lightness);        
})


// todo: 
// arrange divs in body


