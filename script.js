const GENERATIONS = [
    { name: "Scarlet & Violet", class: "era-sv", color: "#a855f7", sets: ['sv8pt5', 'sv8', 'sv7', 'sv6', 'sv5', 'sv4pt5', 'sv4', 'sv3pt5', 'sv3', 'sv2', 'sv1'] },
    { name: "Sword & Shield", class: "era-swsh", color: "#3b82f6", sets: ['swsh12pt5gg', 'swsh12tg', 'swsh12', 'swsh11', 'swsh10', 'swsh9', 'swsh8', 'swsh7', 'swsh45', 'swsh4', 'swsh1'] },
    { name: "Sun & Moon", class: "era-sm", color: "#ec4899", sets: ['sm12', 'sm11', 'sm9', 'sm4', 'sm1'] },
    { name: "Vintage", class: "era-classic", color: "#facc15", sets: ['xy12', 'xy7', 'xy1', 'bw1', 'pl1', 'dp1', 'ex15', 'ex14', 'ex6', 'ex3', 'ex1', 'ecard1', 'neo4', 'neo3', 'neo2', 'neo1', 'gym2', 'gym1', 'base5', 'base4', 'base3', 'base2', 'base1'] }
];

const ALL_SETS = [
    { id: 'base1', name: 'Base Set', count: 102 }, { id: 'base2', name: 'Jungle', count: 64 }, { id: 'base3', name: 'Fossil', count: 62 }, { id: 'base4', name: 'Base 2', count: 130 }, { id: 'base5', name: 'Team Rocket', count: 83 },
    { id: 'gym1', name: 'Gym Heroes', count: 132 }, { id: 'gym2', name: 'Gym Challenge', count: 132 }, { id: 'neo1', name: 'Neo Genesis', count: 111 }, { id: 'neo2', name: 'Neo Discovery', count: 75 },
    { id: 'neo3', name: 'Neo Revelation', count: 66 }, { id: 'neo4', name: 'Neo Destiny', count: 113 }, { id: 'ecard1', name: 'Expedition', count: 165 }, { id: 'ex1', name: 'Ruby & Sapphire', count: 109 },
    { id: 'ex3', name: 'Dragon', count: 100 }, { id: 'ex6', name: 'Team Magma vs Team Aqua', count: 97 }, { id: 'ex14', name: 'Crystal Guardians', count: 100 }, { id: 'ex15', name: 'Dragon Frontiers', count: 101 },
    { id: 'dp1', name: 'Diamond & Pearl', count: 130 }, { id: 'pl1', name: 'Platinum', count: 130 }, { id: 'bw1', name: 'Black & White', count: 115 }, { id: 'xy1', name: 'XY', count: 146 },
    { id: 'xy7', name: 'Ancient Origins', count: 100 }, { id: 'xy12', name: 'Evolutions', count: 113 }, 
    { id: 'sm1', name: 'Sun & Moon', count: 173 }, { id: 'sm4', name: 'Crimson Invasion', count: 126 },
    { id: 'sm9', name: 'Team Up', count: 196 }, { id: 'sm11', name: 'Unified Minds', count: 258 }, { id: 'sm12', name: 'Cosmic Eclipse', count: 271 }, 
    { id: 'swsh1', name: 'Sword & Shield', count: 216 }, { id: 'swsh4', name: 'Vivid Voltage', count: 203 }, { id: 'swsh45', name: 'Shining Fates', count: 73 }, 
    { id: 'swsh7', name: 'Evolving Skies', count: 237 }, { id: 'swsh8', name: 'Fusion Strike', count: 284 }, { id: 'swsh9', name: 'Brilliant Stars', count: 186 }, 
    { id: 'swsh10', name: 'Astral Radiance', count: 216 }, { id: 'swsh11', name: 'Lost Origin', count: 216 }, { id: 'swsh12', name: 'Silver Tempest', count: 215 },
    { id: 'swsh12tg', name: 'Silver Tempest TG', count: 30, prefix: 'TG' }, 
    { id: 'swsh12pt5gg', name: 'Crown Zenith GG', count: 70, prefix: 'GG' }, 
    { id: 'sv1', name: 'Scarlet & Violet', count: 258 }, { id: 'sv2', name: 'Paldea Evolved', count: 269 },
    { id: 'sv3', name: 'Obsidian Flames', count: 230 }, { id: 'sv3pt5', name: '151', count: 210 }, { id: 'sv4', name: 'Paradox Rift', count: 266 }, 
    { id: 'sv4pt5', name: 'Paldean Fates', count: 245 }, { id: 'sv5', name: 'Temporal Forces', count: 218 }, { id: 'sv6', name: 'Twilight Masquerade', count: 226 }, 
    { id: 'sv7', name: 'Stellar Crown', count: 175 }, { id: 'sv8', name: 'Surging Sparks', count: 252 }, { id: 'sv8pt5', name: 'Prismatic Evolutions', count: 175 }
];

// UI Elements
const display = document.getElementById('display');
const img = document.getElementById('card-img');
const bg = document.getElementById('bg-tiles');
const packBtn = document.getElementById('pack-btn');
const infoDisplay = document.getElementById('card-info-display');
const infoStatus = document.getElementById('info-status');
const infoDetails = document.getElementById('info-details');
const starBtn = document.getElementById('star-btn');
const searchInput = document.getElementById('binder-search');

// Settings Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const openClearModalBtn = document.getElementById('open-clear-modal-btn');
const confirmClearModal = document.getElementById('confirm-clear-modal');
const cancelClearBtn = document.getElementById('cancel-clear-btn');
const confirmClearBtn = document.getElementById('confirm-clear-btn');
const installAppBtn = document.getElementById('install-app-btn');
const installInstructionsModal = document.getElementById('install-instructions-modal');
const closeInstallBtn = document.getElementById('close-install-btn');

let currentCardInfo = null;

function init() {
    const savedBinder = JSON.parse(localStorage.getItem('myBinder')) || [];
    renderSidebar(savedBinder);
    
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        if (installAppBtn) installAppBtn.style.display = 'none';
    }
}

function pullCard() {
    packBtn.classList.add('is-shaking');
    packBtn.innerText = "Ripping...";
    
    display.classList.remove('is-popping');
    display.style.opacity = 0;

    document.querySelectorAll('.mini-grid img').forEach(el => el.classList.remove('active-card'));

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

        // Fetch name in background so search works
        fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.data && data.data.name) {
                    let names = JSON.parse(localStorage.getItem('myCardNames')) || {};
                    names[cardId] = data.data.name;
                    localStorage.setItem('myCardNames', JSON.stringify(names));
                    
                    // Update UI immediately if it's the active card
                    if (currentCardInfo && currentCardInfo.id === cardId) {
                         infoDetails.innerText = `${data.data.name} - ${set.name} #${formattedNum}`;
                    }
                }
            }).catch(e => console.log("API fetch failed, skipping name"));

        const tempImg = new Image();
        tempImg.src = imageUrl;
        
        tempImg.onload = () => {
            img.src = imageUrl;
            bg.style.backgroundImage = `url(${imageUrl})`;
            
            packBtn.classList.remove('is-shaking');
            packBtn.innerText = "💥 Rip Another";
            
            void display.offsetWidth;
            display.classList.add('is-popping');
            
            handleStorageAndNotify(cardId, set, gen, formattedNum);
        };
        
        tempImg.onerror = () => {
             packBtn.classList.remove('is-shaking');
             packBtn.innerText = "💥 Rip Another";
             alert("Looks like that card isn't fully loaded into the database yet! Try again.");
        };
    }, 800);
}

function handleStorageAndNotify(cardId, set, gen, formattedNum) {
    let myBinder = JSON.parse(localStorage.getItem('myBinder')) || [];
    let names = JSON.parse(localStorage.getItem('myCardNames')) || {};
    const isDouble = myBinder.includes(cardId);
    
    const cardName = names[cardId] ? `${names[cardId]} - ` : "";

    if (isDouble) {
        infoStatus.innerText = "Duplicate";
        infoStatus.style.color = "#888"; 
        infoDisplay.style.borderLeftColor = "#444";
        infoDetails.innerText = `${cardName}${set.name} #${formattedNum}`;
    } else {
        infoStatus.innerText = "New Pull";
        infoStatus.style.color = gen.color;
        infoDisplay.style.borderLeftColor = gen.color;
        infoDetails.innerText = `${cardName}${set.name} #${formattedNum}`;
        myBinder.push(cardId);
        localStorage.setItem('myBinder', JSON.stringify(myBinder));
    }

    currentCardInfo = { id: cardId, set: set, num: formattedNum };
    updateStarBtn();
    renderSidebar(myBinder);
}

function updateStarBtn() {
    if (!currentCardInfo) {
        starBtn.classList.add('disabled');
        starBtn.classList.remove('active');
        starBtn.style.pointerEvents = 'none';
        return;
    }
    
    starBtn.classList.remove('disabled');
    starBtn.style.pointerEvents = 'auto';
    
    let topHits = JSON.parse(localStorage.getItem('myTopHits')) || [];
    if (topHits.includes(currentCardInfo.id)) {
        starBtn.classList.add('active');
    } else {
        starBtn.classList.remove('active');
    }
}

if (starBtn) {
    starBtn.addEventListener('click', () => {
        if (!currentCardInfo) return;
        let topHits = JSON.parse(localStorage.getItem('myTopHits')) || [];
        
        if (topHits.includes(currentCardInfo.id)) {
            topHits = topHits.filter(id => id !== currentCardInfo.id); 
        } else {
            topHits.push(currentCardInfo.id); 
        }
        
        localStorage.setItem('myTopHits', JSON.stringify(topHits));
        updateStarBtn();
        const savedBinder = JSON.parse(localStorage.getItem('myBinder')) || [];
        renderSidebar(savedBinder);
    });
}

function renderSidebar(collectedIds) {
    const binderContent = document.getElementById('binder-content');
    const cardNames = JSON.parse(localStorage.getItem('myCardNames')) || {};
    
    const openStates = {};
    document.querySelectorAll('#binder-content details').forEach(details => {
        if (details.open) {
            let id = details.getAttribute('data-set-id'); 
            if (!id) {
                const span = details.querySelector('summary span');
                if (span) id = span.innerText;
            }
            if (id) openStates[id] = true;
        }
    });

    binderContent.innerHTML = ''; 

    let topHits = JSON.parse(localStorage.getItem('myTopHits')) || [];
    topHits = topHits.filter(id => collectedIds.includes(id));
    localStorage.setItem('myTopHits', JSON.stringify(topHits));

    // Render Top Hits
    if (topHits.length > 0) {
        const hitsDetails = document.createElement('details');
        hitsDetails.className = `gen-wrapper era-hits`;
        if (openStates['⭐ Top Hits Binder']) hitsDetails.open = true;
        
        const hitsSummary = document.createElement('summary');
        hitsSummary.className = "gen-header";
        hitsSummary.innerHTML = `<span>⭐ Top Hits Binder</span>`;
        
        const hitsBody = document.createElement('div');
        hitsBody.className = "gen-body";
        
        const grid = document.createElement('div');
        grid.className = 'mini-grid';
        
        topHits.forEach(id => createCardElement(id, grid, 'gold', cardNames));
        
        hitsBody.appendChild(grid);
        hitsDetails.appendChild(hitsSummary);
        hitsDetails.appendChild(hitsBody);
        binderContent.appendChild(hitsDetails);
    }

    // Render Standard Binders
    GENERATIONS.forEach(gen => {
        const genSets = ALL_SETS.filter(s => gen.sets.includes(s.id));
        const hasCardsInGen = genSets.some(s => collectedIds.some(id => id.startsWith(s.id + '-')));

        if (hasCardsInGen) {
            const genDetails = document.createElement('details');
            genDetails.className = `gen-wrapper ${gen.class}`;
            if (openStates[`${gen.name} Binder`]) genDetails.open = true;

            const genSummary = document.createElement('summary');
            genSummary.className = "gen-header";
            genSummary.innerHTML = `<span>${gen.name} Binder</span>`;
            const genBody = document.createElement('div');
            genBody.className = "gen-body";

            genSets.forEach(set => {
                const setCards = collectedIds.filter(id => id.startsWith(set.id + '-'));
                if (setCards.length > 0) {
                    const setDetails = document.createElement('details');
                    setDetails.className = 'set-item';
                    setDetails.setAttribute('data-set-id', set.id); 
                    if (openStates[set.id]) setDetails.open = true;

                    const setSummary = document.createElement('summary');
                    setSummary.innerHTML = `<span class="set-label">${set.name}</span><span class="set-count">${setCards.length}/${set.count}</span>`;
                    const grid = document.createElement('div');
                    grid.className = 'mini-grid';
                    
                    setCards.sort((a,b) => {
                        const numA = parseInt(a.split('-').pop().replace(/\D/g, ''));
                        const numB = parseInt(b.split('-').pop().replace(/\D/g, ''));
                        return numA - numB;
                    }).forEach(id => createCardElement(id, grid, gen.color, cardNames));

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

    // Re-trigger search logic in case a search is currently active
    if (searchInput && searchInput.value) {
        searchInput.dispatchEvent(new Event('input'));
    }
}

// Helper to create the mini-grid images and bind click events
function createCardElement(id, grid, genColor, cardNames) {
    const parts = id.split('-');
    const sNum = parts.pop();
    const sId = parts.join('-');
    const set = ALL_SETS.find(s => s.id === sId) || { name: sId };
    
    const cardImg = document.createElement('img');
    cardImg.src = `https://images.pokemontcg.io/${sId}/${sNum}.png`;
    cardImg.setAttribute('data-card-id', id);
    
    const knownName = cardNames[id] || "";
    if (knownName) {
        cardImg.setAttribute('data-card-name', knownName.toLowerCase());
        cardImg.title = `${knownName} (${set.name} #${sNum})`;
    } else {
        cardImg.title = `${set.name} #${sNum}`;
    }

    if (currentCardInfo && currentCardInfo.id === id) cardImg.classList.add('active-card');
    
    cardImg.onclick = (e) => {
        e.stopPropagation();
        document.getElementById('card-img').src = `https://images.pokemontcg.io/${sId}/${sNum}_hires.png`;
        document.getElementById('bg-tiles').style.backgroundImage = `url(https://images.pokemontcg.io/${sId}/${sNum}_hires.png)`;
        document.getElementById('display').classList.remove('is-popping');
        document.getElementById('display').style.opacity = 1;

        infoStatus.innerText = "Viewing Collection";
        infoStatus.style.color = "#ccc";
        infoDisplay.style.borderLeftColor = genColor;
        
        currentCardInfo = { id: id, set: set, num: sNum };
        updateStarBtn();

        // If name wasn't known, fetch it when clicked to update local storage for next search
        if (!cardNames[id]) {
            infoDetails.innerText = `Loading... - ${set.name} #${sNum}`;
            fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.data && data.data.name) {
                        let names = JSON.parse(localStorage.getItem('myCardNames')) || {};
                        names[id] = data.data.name;
                        localStorage.setItem('myCardNames', JSON.stringify(names));
                        cardImg.setAttribute('data-card-name', data.data.name.toLowerCase());
                        cardImg.title = `${data.data.name} (${set.name} #${sNum})`;
                        infoDetails.innerText = `${data.data.name} - ${set.name} #${sNum}`;
                    } else {
                        infoDetails.innerText = `${set.name} #${sNum}`;
                    }
                }).catch(() => infoDetails.innerText = `${set.name} #${sNum}`);
        } else {
            infoDetails.innerText = `${cardNames[id]} - ${set.name} #${sNum}`;
        }

        document.querySelectorAll('.mini-grid img').forEach(el => el.classList.remove('active-card'));
        document.querySelectorAll(`.mini-grid img[data-card-id="${id}"]`).forEach(el => el.classList.add('active-card'));
    };
    grid.appendChild(cardImg);
}

// --- Search Filter Logic ---
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const gens = document.querySelectorAll('.gen-wrapper');
        
        gens.forEach(gen => {
            let genHasVisibleItems = false;
            const sets = gen.querySelectorAll('.set-item');
            
            sets.forEach(set => {
                let setHasVisibleCards = false;
                const cards = set.querySelectorAll('.mini-grid img');
                const setName = set.querySelector('.set-label').innerText.toLowerCase();
                
                cards.forEach(card => {
                    const cardName = card.getAttribute('data-card-name') || "";
                    if (cardName.includes(term) || setName.includes(term)) {
                        card.classList.remove('hidden');
                        setHasVisibleCards = true;
                    } else {
                        card.classList.add('hidden');
                    }
                });

                if (setHasVisibleCards || setName.includes(term)) {
                    set.classList.remove('hidden');
                    genHasVisibleItems = true;
                    if (term !== "") set.open = true; // Auto-open set
                } else {
                    set.classList.add('hidden');
                }
            });

            // Top Hits specific logic
            if (gen.classList.contains('era-hits')) {
                 let hitsVisible = false;
                 const hitCards = gen.querySelectorAll('.mini-grid img');
                 hitCards.forEach(card => {
                     const cardName = card.getAttribute('data-card-name') || "";
                     if (cardName.includes(term) || "top hits".includes(term)) {
                         card.classList.remove('hidden');
                         hitsVisible = true;
                     } else {
                         card.classList.add('hidden');
                     }
                 });
                 if (hitsVisible || term === "") {
                     gen.classList.remove('hidden');
                     if (term !== "") gen.open = true;
                 } else {
                     gen.classList.add('hidden');
                 }
                 return;
            }
            
            if (genHasVisibleItems || gen.querySelector('.gen-header').innerText.toLowerCase().includes(term)) {
                gen.classList.remove('hidden');
                if (term !== "") gen.open = true;
            } else {
                gen.classList.add('hidden');
            }
        });
    });
}

// --- Event Listeners ---
if (packBtn) packBtn.addEventListener('click', pullCard);

if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
}

if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
}

if (openClearModalBtn && confirmClearModal) {
    openClearModalBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
        confirmClearModal.classList.add('active');
    });
}

if (cancelClearBtn) {
    cancelClearBtn.addEventListener('click', () => confirmClearModal.classList.remove('active'));
}

if (confirmClearBtn) {
    confirmClearBtn.addEventListener('click', () => {
        localStorage.removeItem('myBinder');
        localStorage.removeItem('myTopHits');
        localStorage.removeItem('myCardNames'); // Clears names too!
        renderSidebar([]);
        display.style.opacity = 0;
        bg.style.backgroundImage = 'none';
        
        infoStatus.innerText = "POKE RIPPER";
        infoStatus.style.color = "#aaa";
        infoDisplay.style.borderLeftColor = "#444";
        infoDetails.innerText = "Ready to pull!";
        
        currentCardInfo = null;
        updateStarBtn();
        
        confirmClearModal.classList.remove('active');
    });
}

// --- Install Instructions Modal Logic ---
if (closeInstallBtn) {
    closeInstallBtn.addEventListener('click', () => {
        if (installInstructionsModal) installInstructionsModal.classList.remove('active');
    });
}

// --- PWA Install Prompt Logic ---
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!window.matchMedia('(display-mode: standalone)').matches && window.navigator.standalone !== true) {
        if (installAppBtn) installAppBtn.style.display = 'block'; 
    }
});

if (installAppBtn) {
    installAppBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        } else {
            if (settingsModal) settingsModal.classList.remove('active');
            if (installInstructionsModal) installInstructionsModal.classList.add('active');
        }
    });
}

init();