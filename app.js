const gridContainer = document.querySelector('.grid-container');


// grid size at start:
let gridSize = 64;


function createGrid(size) {
    let id = 1;
    for (let row = 0; row < gridSize; row++) {
        const gridRow = document.createElement('div');
        gridRow.setAttribute('class', 'grid-row');
    
        for (let col = 0; col < gridSize; col++) {
            const square = document.createElement('div');
            square.setAttribute('class','square');
            square.setAttribute('id', `${id}`);
            gridRow.appendChild(square);
            id++;
        }
    
        gridContainer.appendChild(gridRow);
    }  
}

createGrid(gridSize);




