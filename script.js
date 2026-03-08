const GENERATIONS = [
    { name: "Mega Evolution", class: "era-mega", color: "#10b981", sets: ['me03', 'me02pt5', 'me02', 'me01'] },
    { name: "Scarlet & Violet", class: "era-sv", color: "#a855f7", sets: ['sv11', 'sv10', 'sv9', 'sv8pt5', 'sv8', 'sv7', 'sv6', 'sv5', 'sv4pt5', 'sv4', 'sv3pt5', 'sv3', 'sv2', 'sv1'] },
    { name: "Sword & Shield", class: "era-swsh", color: "#3b82f6", sets: ['swsh12pt5gg', 'swsh12tg', 'swsh12', 'swsh11', 'swsh10', 'swsh9', 'swsh8', 'swsh7', 'swsh45', 'swsh4', 'swsh1'] },
    { name: "Sun & Moon", class: "era-sm", color: "#ec4899", sets: ['sm12', 'sm11', 'sm9', 'sm4', 'sm1'] },
    { name: "Vintage", class: "era-classic", color: "#facc15", sets: ['xy12', 'xy7', 'xy1', 'bw1', 'pl1', 'dp1', 'ex15', 'ex14', 'ex6', 'ex3', 'ex1', 'ecard1', 'neo4', 'neo3', 'neo2', 'neo1', 'gym2', 'gym1', 'base5', 'base4', 'base3', 'base2', 'base1'] }
];

const ALL_SETS = [
    // Vintage
    { id: 'base1', name: 'Base Set', count: 102 }, { id: 'base2', name: 'Jungle', count: 64 }, { id: 'base3', name: 'Fossil', count: 62 }, { id: 'base4', name: 'Base 2', count: 130 }, { id: 'base5', name: 'Team Rocket', count: 83 },
    { id: 'gym1', name: 'Gym Heroes', count: 132 }, { id: 'gym2', name: 'Gym Challenge', count: 132 }, { id: 'neo1', name: 'Neo Genesis', count: 111 }, { id: 'neo2', name: 'Neo Discovery', count: 75 },
    { id: 'neo3', name: 'Neo Revelation', count: 66 }, { id: 'neo4', name: 'Neo Destiny', count: 113 }, { id: 'ecard1', name: 'Expedition', count: 165 }, { id: 'ex1', name: 'Ruby & Sapphire', count: 109 },
    { id: 'ex3', name: 'Dragon', count: 100 }, { id: 'ex6', name: 'Team Magma vs Team Aqua', count: 97 }, { id: 'ex14', name: 'Crystal Guardians', count: 100 }, { id: 'ex15', name: 'Dragon Frontiers', count: 101 },
    { id: 'dp1', name: 'Diamond & Pearl', count: 130 }, { id: 'pl1', name: 'Platinum', count: 130 }, { id: 'bw1', name: 'Black & White', count: 115 }, { id: 'xy1', name: 'XY', count: 146 },
    { id: 'xy7', name: 'Ancient Origins', count: 100 }, { id: 'xy12', name: 'Evolutions', count: 113 }, 
    
    // Sun & Moon
    { id: 'sm1', name: 'Sun & Moon', count: 173 }, { id: 'sm4', name: 'Crimson Invasion', count: 126 },
    { id: 'sm9', name: 'Team Up', count: 196 }, { id: 'sm11', name: 'Unified Minds', count: 258 }, { id: 'sm12', name: 'Cosmic Eclipse', count: 271 }, 
    
    // Sword & Shield
    { id: 'swsh1', name: 'Sword & Shield', count: 216 }, { id: 'swsh4', name: 'Vivid Voltage', count: 203 }, { id: 'swsh45', name: 'Shining Fates', count: 73 }, 
    { id: 'swsh7', name: 'Evolving Skies', count: 237 }, { id: 'swsh8', name: 'Fusion Strike', count: 284 }, { id: 'swsh9', name: 'Brilliant Stars', count: 186 }, 
    { id: 'swsh10', name: 'Astral Radiance', count: 216 }, { id: 'swsh11', name: 'Lost Origin', count: 216 }, { id: 'swsh12', name: 'Silver Tempest', count: 215 },
    { id: 'swsh12tg', name: 'Silver Tempest TG', count: 30, prefix: 'TG' }, 
    { id: 'swsh12pt5gg', name: 'Crown Zenith GG', count: 70, prefix: 'GG' }, 
    
    // Scarlet & Violet
    { id: 'sv1', name: 'Scarlet & Violet', count: 258 }, { id: 'sv2', name: 'Paldea Evolved', count: 269 },
    { id: 'sv3', name: 'Obsidian Flames', count: 230 }, { id: 'sv3pt5', name: '151', count: 210 }, { id: 'sv4', name: 'Paradox Rift', count: 266 }, 
    { id: 'sv4pt5', name: 'Paldean Fates', count: 245 }, { id: 'sv5', name: 'Temporal Forces', count: 218 }, { id: 'sv6', name: 'Twilight Masquerade', count: 226 }, 
    { id: 'sv7', name: 'Stellar Crown', count: 175 }, { id: 'sv8', name: 'Surging Sparks', count: 252 }, { id: 'sv8pt5', name: 'Prismatic Evolutions', count: 175 },
    { id: 'sv9', name: 'Journey Together', count: 175 }, { id: 'sv10', name: 'Destined Rivals', count: 175 }, { id: 'sv11', name: 'Black Bolt & White Flare', count: 250 },
    
    // Mega Evolution Era
    { id: 'me01', name: 'Mega Evolution', count: 180 },
    { id: 'me02', name: 'Phantasmal Flames', count: 180 },
    { id: 'me02pt5', name: 'Ascended Heroes', count: 180 },
    { id: 'me03', name: 'Perfect Order', count: 180 }
];

const display = document.getElementById('display');
const img = document.getElementById('card-img');
const bg = document.getElementById('bg-tiles');
const packBtn = document.getElementById('pack-btn');
const notify = document.getElementById('pull-notify');
const notifyTitle = document.querySelector('#pull-notify h3');
const notifyText = document.getElementById('notify-text');

function init() {
    const savedBinder = JSON.parse(localStorage.getItem('myBinder')) || [];
    renderSidebar(savedBinder);
}

function pullCard() {
    // 1. Start the visual "rip" phase
    packBtn.classList.add('is-shaking');
    packBtn.innerText = "Ripping...";
    
    // Hide current card and reset animation state
    display.classList.remove('is-popping');
    display.style.opacity = 0;

    // Simulate the time it takes to tear the pack
    setTimeout(() => {
        const set = ALL_SETS[Math.floor(Math.random() * ALL_SETS.length)];
        const gen = GENERATIONS.find(g => g.sets.includes(set.id));
        const num = Math.floor(Math.random() * set.count) + 1; 

        let formattedNum = num.toString();
        if (set.prefix) {
            formattedNum = set.prefix + num.toString().padStart(2, '0');
        }

        const cardId = `${set.id}-${formattedNum}`;
        const imageUrl = `https://images.pokemontcg.io/${set.id}/${formattedNum}_hires.png`;

        // Preload image so the animation starts right when it's ready
        const tempImg = new Image();
        tempImg.src = imageUrl;
        tempImg.onload = () => {
            img.src = imageUrl;
            bg.style.backgroundImage = `url(${imageUrl})`;
            
            // 2. Stop shaking, reveal card
            packBtn.classList.remove('is-shaking');
            packBtn.innerText = "💥 Rip Another";
            
            // Force a DOM reflow to restart CSS animation
            void display.offsetWidth;
            display.classList.add('is-popping');
            
            handleStorageAndNotify(cardId, set, gen, formattedNum);
        };
    }, 800); // 800ms of simulated "ripping" time
}

function handleStorageAndNotify(cardId, set, gen, formattedNum) {
    let myBinder = JSON.parse(localStorage.getItem('myBinder')) || [];
    const isDouble = myBinder.includes(cardId);
    
    if (isDouble) {
        notifyTitle.innerText = "Duplicate";
        notifyTitle.style.color = "#888"; 
        notifyText.innerText = `${set.name} #${formattedNum}`;
    } else {
        notifyTitle.innerText = "New Pull";
        notifyTitle.style.color = gen.color;
        notifyText.innerText = `${set.name} #${formattedNum}`;
        myBinder.push(cardId);
        localStorage.setItem('myBinder', JSON.stringify(myBinder));
    }

    notify.style.setProperty('--era-color', isDouble ? "#444" : gen.color);
    notify.onclick = () => openSetInBinder(gen.class, set.id); 

    setTimeout(() => notify.classList.add('show'), 300);
    setTimeout(() => notify.classList.remove('show'), 6000); 

    renderSidebar(myBinder);
}

function openSetInBinder(genClass, setId) {
    // Only works if sidebar is visible (desktop)
    const sidebar = document.getElementById('sidebar-binder');
    if (window.getComputedStyle(sidebar).display === 'none') return;

    const genWrap = document.querySelector(`.${genClass}`);
    const setItem = document.querySelector(`.set-item[data-set-id="${setId}"]`);
    if (genWrap && setItem) {
        genWrap.open = true; 
        setItem.open = true; 
        setItem.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
    }
}

function renderSidebar(collectedIds) {
    const binderContent = document.getElementById('binder-content');
    binderContent.innerHTML = ''; 

    GENERATIONS.forEach(gen => {
        const genSets = ALL_SETS.filter(s => gen.sets.includes(s.id));
        const hasCardsInGen = genSets.some(s => collectedIds.some(id => id.startsWith(s.id + '-')));

        if (hasCardsInGen) {
            const genDetails = document.createElement('details');
            genDetails.className = `gen-wrapper ${gen.class}`;
            const genSummary = document.createElement('summary');
            genSummary.className = "gen-header";
            genSummary.innerHTML = `<span>${gen.name} Collection</span>`;
            const genBody = document.createElement('div');
            genBody.className = "gen-body";

            genSets.forEach(set => {
                const setCards = collectedIds.filter(id => id.startsWith(set.id + '-'));
                if (setCards.length > 0) {
                    const setDetails = document.createElement('details');
                    setDetails.className = 'set-item';
                    setDetails.setAttribute('data-set-id', set.id); 
                    const setSummary = document.createElement('summary');
                    setSummary.innerHTML = `<span class="set-label">${set.name}</span><span class="set-count">${setCards.length}/${set.count}</span>`;
                    const grid = document.createElement('div');
                    grid.className = 'mini-grid';
                    
                    setCards.sort((a,b) => {
                        const numA = parseInt(a.split('-').pop().replace(/\D/g, ''));
                        const numB = parseInt(b.split('-').pop().replace(/\D/g, ''));
                        return numA - numB;
                    }).forEach(id => {
                        const parts = id.split('-');
                        const sNum = parts.pop();
                        const sId = parts.join('-');
                        const cardImg = document.createElement('img');
                        cardImg.src = `https://images.pokemontcg.io/${sId}/${sNum}.png`;
                        cardImg.onclick = (e) => {
                            e.stopPropagation();
                            document.getElementById('card-img').src = `https://images.pokemontcg.io/${sId}/${sNum}_hires.png`;
                            document.getElementById('bg-tiles').style.backgroundImage = `url(https://images.pokemontcg.io/${sId}/${sNum}_hires.png)`;
                            
                            // Remove pop animation so it doesn't get weird when viewing old cards
                            document.getElementById('display').classList.remove('is-popping');
                            document.getElementById('display').style.opacity = 1;
                        };
                        grid.appendChild(cardImg);
                    });
                    setDetails.appendChild(setSummary);
                    setDetails.appendChild(grid);
                    genBody.appendChild(setDetails);
                }
            });
            genDetails.appendChild(genSummary);
            genDetails.appendChild(genBody);
            binderContent.appendChild(genDetails);
        }
    });
}

// Event Listeners
packBtn.addEventListener('click', pullCard);

// Run init on load
init();