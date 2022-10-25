const gridContainer = document.querySelector('.grid-container');


// grid size at start:
let gridSize = 64;

let squares = [];
let color = '#FF0000';

function createGrid(size) {
    let id = 1;
    for (let row = 0; row < gridSize; row++) {
        const gridRow = document.createElement('div');
        gridRow.setAttribute('class', 'grid-row');
    
        for (let col = 0; col < gridSize; col++) {
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

function changeSquareColor(){
        // console.log(this);
        this.setAttribute('style', `background-color: ${color}`);
}



createGrid(gridSize);

squares.forEach(square => {
    square.addEventListener('mouseover', changeSquareColor);
});



