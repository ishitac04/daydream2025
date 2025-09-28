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




        function getRandomInt(max) {
        return Math.floor(Math.random() * max);
        }
        let inventory = []
        let possableitems = [
            {name: "", image: ""}
        
        ]
        function addrandomitem(ammount) {
            for (let index = 0; index < ammount; index++) {
                inventory.push(possableitems[getRandomInt(possableitems.length)]);
            }
            renderInventory();
        }

        function additembyname(name) {
            possableitems.forEach(element => {
                if (element.name == name) {
                    inventory.push(element);
                }
            });
            renderInventory();
        }

        function additembyjson(json) {
            inventory.push(json);
            renderInventory();
        }
