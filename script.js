const asteroid = document.querySelector(".asteroid");
const asteroidContainer = document.querySelector(".asteroid-container");
const stats = document.querySelector(".stats");

const rhodiumText = document.querySelector(".rhodium");
const btnRhodiumAutominer = document.querySelector("#rhodium-autominer");
const txtRhodiumAutominerCost = document.querySelector(".rhodium-autominer-cost");
const btnRhodiumUpgrade = document.querySelector("#rhodium-upgrade");
const txtRhodiumUpgradeCost = document.querySelector(".rhodium-upgrade-cost");

const palladiumText = document.querySelector(".palladium");
const btnPalladiumAutominer = document.querySelector("#palladium-autominer");
const txtPalladiumAutominerCost = document.querySelector(".palladium-autominer-cost");
const btnPalladiumUpgrade = document.querySelector("#palladium-upgrade");
const txtPalladiumUpgradeCost = document.querySelector(".palladium-upgrade-cost");

const unobtainiumText = document.querySelector(".unobtainium");
const btnUnobtainiumAutominer = document.querySelector("#unobtainium-autominer");
const txtUnobtainiumAutominerCost = document.querySelector(".unobtainium-autominer-cost");
const btnUnobtainiumUpgrade = document.querySelector("#unobtainium-upgrade");
const txtUnobtainiumUpgradeCost = document.querySelector(".unobtainium-upgrade-cost");

const btnClickerUpgrade = document.querySelector("#clicker-upgrade");
const txtClickerUpgradeCost = document.querySelector(".clicker-upgrade-cost");

const btnSpeedUpgrade = document.querySelector("#speed-upgrade");
const txtSpeedUpgradeCost = document.querySelector(".speed-upgrade-cost");

const negativeSound = document.createElement("audio");
negativeSound.src = "sounds/negativeSound.ogg";

const positiveSound = document.createElement("audio");
positiveSound.src = "sounds/positiveSound.ogg";

const unobtainiumSound = document.createElement("audio");
unobtainiumSound.src = "sounds/unobtainiumSound.ogg";

let upgradeCost = 1.5;
let upgradeEfficiency = 1.1;

let rhodium = {
    amount: 0,
    autominers: 0,
    autominerCost: 15,
    automineAmt: 1,
    upgrades: 0,
    upgradeCost: 250,
    multiplier: 1,
};

let palladium = {
    amount: 0,
    autominers: 0,
    autominerCost: 1000,
    automineAmt: 1,
    upgrades: 0,
    upgradeCost: 500,
    multiplier: 1,
};

let unobtainium = {
    amount: 0,
    autominers: 0,
    autominerCost: 1500,
    automineAmt: 1,
    upgrades: 0,
    upgradeCost: 3000,
    multiplier: 1,
};

let clicker = {
    clickAmt: 1,
    upgradeCost: 500,
    upgrades: 0,
}

let speed = {
    frequency: 150,
    upgradeCost: 2000,
    upgrades: 0,
}


initializeGame();

function playSound(sound) {
    sound.currentTime =0;
    sound.play();
}

function initializeGame() {
    rhodiumText.innerHTML = rhodium.amount;
    txtRhodiumAutominerCost.innerHTML = rhodium.autominerCost;
    txtRhodiumUpgradeCost.innerHTML = rhodium.upgradeCost;

    palladiumText.innerHTML = palladium.amount;
    txtPalladiumAutominerCost.innerHTML = palladium.autominerCost;
    txtPalladiumUpgradeCost.innerHTML = palladium.upgradeCost;

    unobtainiumText.innerHTML = unobtainium.amount;
    txtUnobtainiumAutominerCost.innerHTML = unobtainium.autominerCost;
    txtUnobtainiumUpgradeCost.innerHTML = unobtainium.upgradeCost;

    txtClickerUpgradeCost.innerHTML = clicker.upgradeCost;
    txtSpeedUpgradeCost.innerHTML = speed.upgradeCost;

    btnUnobtainiumAutominer.style.display = "none";
    btnRhodiumUpgrade.style.display = "none";
    btnPalladiumUpgrade.style.display = "none";
    btnUnobtainiumUpgrade.style.display = "none";

    miningInterval = setInterval(runAutominers, speed.frequency);
}

asteroid.onclick = () => {
    updateRhodium(clicker.clickAmt);
}

// Miners
btnRhodiumAutominer.onclick = () => {
    if (rhodium.amount >= rhodium.autominerCost) {
        playSound(positiveSound);
        updateRhodium(-rhodium.autominerCost);
        rhodium.autominerCost = Math.round(rhodium.autominerCost * upgradeCost);
        rhodium.autominers += 1;
        txtRhodiumAutominerCost.innerHTML = rhodium.autominerCost;
    }
    else {
        playSound(negativeSound);
    }
}

btnPalladiumAutominer.onclick = () => {
    if (rhodium.amount >= palladium.autominerCost) {
        playSound(positiveSound);
        updateRhodium(-rhodium.autominerCost);
        palladium.autominerCost = Math.round(palladium.autominerCost * upgradeCost);
        palladium.autominers += 1;
        txtPalladiumAutominerCost.innerHTML = palladium.autominerCost;
        if (palladium.autominers === 1) { 
            btnUnobtainiumAutominer.style.display = "block";
            btnRhodiumUpgrade.style.display = "block";
            btnPalladiumUpgrade.style.display = "block";
        }
    }
    else {
        playSound(negativeSound);
    }
}

btnUnobtainiumAutominer.onclick = () => {
    if (palladium.amount >= unobtainium.autominerCost) {
        playSound(unobtainiumSound);
        updatePalladium(-unobtainium.autominerCost);
        unobtainium.autominerCost = Math.round(unobtainium.autominerCost * upgradeCost);
        unobtainium.autominers += 1;
        txtUnobtainiumAutominerCost.innerHTML = unobtainium.autominerCost;
        if (unobtainium.autominers === 1) {
            btnUnobtainiumUpgrade.style.display = "block";
        }
    }
    else {
        playSound(negativeSound);
    }
}

// Upgrades
btnRhodiumUpgrade.onclick = () => {
    if (palladium.amount >= rhodium.upgradeCost) {
        playSound(positiveSound);
        updatePalladium(-rhodium.upgradeCost);
        rhodium.upgradeCost = Math.round(rhodium.upgradeCost * upgradeCost);
        rhodium.upgrades = 0;
        txtRhodiumUpgradeCost.innerHTML = rhodium.upgradeCost;
        rhodium.multiplier *= 1.1;
    }
    else {
        playSound(negativeSound);
    }
}

btnPalladiumUpgrade.onclick = () => {
    if (palladium.amount >= palladium.upgradeCost) {
        playSound(positiveSound);
        updatePalladium(-palladium.upgradeCost);
        palladium.upgradeCost = Math.round(palladium.upgradeCost * upgradeCost);
        palladium.upgrades = 0;
        txtPalladiumUpgradeCost.innerHTML = palladium.upgradeCost;
        palladium.multiplier *= 1.1;
    }
    else {
        playSound(negativeSound);
    }
}

btnUnobtainiumUpgrade.onclick = () => {
    if (palladium.amount >= unobtainium.upgradeCost) {
        playSound(unobtainiumSound);
        updatePalladium(-unobtainium.upgradeCost);
        unobtainium.upgradeCost = Math.round(unobtainium.upgradeCost * upgradeCost);
        unobtainium.upgrades = 0;
        txtUnobtainiumUpgradeCost.innerHTML = unobtainium.upgradeCost;
        unobtainium.multiplier *= 1.1;
    }
    else {
        playSound(negativeSound);
    }
}

btnClickerUpgrade.onclick = () => {
    if (rhodium.amount >= clicker.upgradeCost) {
        playSound(positiveSound);
        updateRhodium(-clicker.upgradeCost);
        clicker.upgradeCost = Math.round(clicker.upgradeCost * upgradeCost);
        clicker.upgrades += 1;
        txtClickerUpgradeCost.innerHTML = clicker.upgradeCost;
        clicker.amount *= 5;
    }
    else {
        playSound(negativeSound);
    }
}

btnSpeedUpgrade.onclick = () => {
    if (rhodium.amount >= speed.upgradeCost) {
        playSound(positiveSound);
        updateRhodium(-speed.upgradeCost);
        speed.upgradeCost = Math.round(speed.upgradeCost * upgradeCost);
        speed.upgrades += 1;
        txtSpeedUpgradeCost.innerHTML = speed.upgradeCost;
        speed.frequency *= upgradeEfficiency;
    }
    else {
        playSound(negativeSound);
    }
}


function updateRhodium(amtChanged) {
    rhodium.amount += amtChanged;
    rhodiumText.innerHTML = rhodium.amount;
}

function updatePalladium(amtChanged) {
    palladium.amount += amtChanged;
    palladiumText.innerHTML = palladium.amount;
}

function updateUnobtainium(amtChanged) {
    unobtainium.amount += amtChanged;
    unobtainiumText.innerHTML = unobtainium.amount;
}

function runAutominers() {
    updateRhodium(Math.floor(rhodium.automineAmt * rhodium.autominers * rhodium.multiplier));
    updatePalladium(Math.floor(palladium.automineAmt * palladium.autominers * palladium.multiplier));
    updateUnobtainium(Math.floor(unobtainium.automineAmt * unobtainium.autominers * unobtainium.multiplier));
}