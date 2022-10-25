const gridContainer = document.querySelector('.grid-container');
const clearBtn = document.getElementById('clear');
let squares = [];

// starting settings
let gridSize = 30;
let selectedColor = '#FF0000';


function createGrid(size) {
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
squares.forEach(square => {
    square.addEventListener('mouseover',function() {
        changeSquareColor(square, selectedColor)   
    })
});

clearBtn.addEventListener('click', clearCanvas);



