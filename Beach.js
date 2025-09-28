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

        addrandomitem(3);
        function renderInventory() {
            const invDiv = document.getElementById('inventory-bar');
            if (!invDiv) return;
            if (invDiv.style.display === 'none') return;
            if (inventory.length === 0) {
                invDiv.innerHTML = '<span style="color: #aaa;">Inventory is empty</span>';
            } else {
                invDiv.innerHTML = inventory.map(item => {
                    let imgHtml = '';
                    if (item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
                        imgHtml = `<img src='${item.image}' alt='' style='height:1.5em;vertical-align:middle;margin-right:6px;border-radius:4px;'>`;
                    } else if (item.image) {
                        imgHtml = `<span style='font-size:1.3em;vertical-align:middle;margin-right:6px;'>${item.image}</span>`;
                    }
                    return `<span style='margin:0 10px;display:inline-flex;align-items:center;'>${imgHtml}<span style='font-size:0.9em;'>${item.name}</span></span>`;
                }).join('');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const invDiv = document.getElementById('inventory-bar');
            invDiv.style.display = 'none';
            document.addEventListener('keydown', (e) => {
                if (e.key.toLowerCase() === 'i') {
                    if (invDiv.style.display === 'none') {
                        invDiv.style.display = 'flex';
                        renderInventory();
                    } else {
                        invDiv.style.display = 'none';
                    }
                }
            });
        });
        


        
        
    
