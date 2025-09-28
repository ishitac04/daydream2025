let count=0;
let i=0;
let area = []; 
const backgroundmusic = document.getElementById("backgroundmusic");



function generateGrid() {
    const board = document.getElementById('grid');
    for (i=0; i<800; i++) {
        const square = document.createElement('div')
        board.appendChild(square)
    }
    boxes = document.querySelectorAll('#grid div')
}

generateGrid();

function showPopup(text) {
    const popup = document.createElement('div');
    popup.id = 'text-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <div class="popup-text">${text}</div>
        </div>
    `;
    document.body.appendChild(popup);
    
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.onclick = function() {
        document.body.removeChild(popup);
    };
    
    popup.onclick = function(e) {
        if (e.target === popup) {
            document.body.removeChild(popup);
        }
    };
}

function showCratePopup(crateIndex) {
    if (document.getElementById('crate-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'crate-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <div class="popup-text">The crate demands a sacrifice to allow you to live! Press I to open inventory. Press a number key to sacrifice an item!!</div>
        </div>
    `;
    document.body.appendChild(popup);

    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.onclick = () => document.body.removeChild(popup);

    popup.onclick = (e) => {
        if (e.target === popup) document.body.removeChild(popup);
    };
}


function createCharacter(i) {
    boxes[i].classList.add("character1");
    boxes[i+1].classList.add("character2");
    boxes[i+40].classList.add("character3");
    boxes[i+41].classList.add("character4");
    boxes[i+80].classList.add("character5");
    boxes[i+81].classList.add("character6");
}

function clearCharacter(i) {
    boxes[i].classList.remove("character1");
    boxes[i+1].classList.remove("character2");
    boxes[i+40].classList.remove("character3");
    boxes[i+41].classList.remove("character4");
    boxes[i+80].classList.remove("character5");
    boxes[i+81].classList.remove("character6");
}

function cratelocations() {
    number=Math.floor(Math.random()*400)
    return number;
}

function createCrate(n) {
    boxes[n].classList.add("crate");
    area.push(n-41, n-40, n-39,
              n-1,  n,   n+1,
              n+39, n+40, n+41);
}

function spawnCrates(amount) {
    for (let c = 0; c < amount; c++) {
        let num = cratelocations();
        createCrate(num);
    }
}



        function getRandomInt(max) {
        return Math.floor(Math.random() * max);
        }
        let inventory = []
        let possableitems = [
            {name: "Torch", image: ""},
            {name: "Apple", image: ""},
            {name: "Water", image: ""},
            {name: "Phone", image: ""},
            {name: "Bagpack", image: ""}
        
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
        function renderInventory() {
            const invDiv = document.getElementById('inventory-bar');
            if (!invDiv) return;
            if (invDiv.style.display === 'none') return;
        
            if (inventory.length === 0) {
                invDiv.innerHTML = '<span style="color: #0a0;">You survived!</span>';
                showPopup("You survived!");
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

        function keyPress(event) {
            if (count==1) clearCharacter(i);
        
            switch (event.key) {
                case 'ArrowUp': 
                i -= 40; 
                backgroundmusic.play();
                break;
                case 'ArrowDown': i += 40; break;
                case 'ArrowLeft': i -= 1; break;
                case 'ArrowRight': i += 1; break;
            }
        
            createCharacter(i);
            count = 1;
        
            if (area.includes(i+40)) {
                showCratePopup(i+40);
            }
        
            if (/^[1-9]$/.test(event.key)) {
                const index = parseInt(event.key) - 1;
                if (inventory[index]) {
                    inventory.splice(index, 1);
                    renderInventory();
        
                    const cratePopup = document.getElementById('crate-popup');
                    if (cratePopup && area.includes(i+40)) {
                        boxes[i+40].classList.remove("crate");
                        const toRemove = [i+40-41,i+40-40,i+40-39,i+40-1,i+40,i+40+1,i+40+39,i+40+40,i+40+41];
                        area = area.filter(n => !toRemove.includes(n));
                        document.body.removeChild(cratePopup);
                    }
                }
            }
        }
        
        


        document.addEventListener('keydown', keyPress);
        num = cratelocations()
        spawnCrates(5);
        additembyname("Apple")
        additembyname("Torch")
        additembyname("Bagpack")
        additembyname("Water")
        additembyname("Phone")
        