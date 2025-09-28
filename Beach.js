function generateGrid() {
    const board = document.getElementById('grid');
    for (i=0; i<800; i++) {
        const square = document.createElement('div')
        board.appendChild(square)
    }
    boxes = document.querySelectorAll('#grid div')
}

generateGrid();

function createCharacter(i) {
    boxes[i].classList.add("Character1");
    boxes[i+40].classList.add("Character2")
}

createCharacter(50);