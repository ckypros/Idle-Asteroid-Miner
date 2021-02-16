const asteroid = document.querySelector(".asteroid");
const asteroidContainer = document.querySelector(".asteroid-container");
const stats = document.querySelector(".stats");
const messages = document.querySelector(".messages");

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
let miningInterval;

let rhodium = {
    amount: 0,
    autominers: 0,
    autominerCost: 110,
    automineAmt: .15,
    upgrades: 0,
    upgradeCost: 250,
    multiplier: 1,
};

let palladium = {
    amount: 0,
    autominers: 0,
    autominerCost: 1000,
    automineAmt: 0.1,
    upgrades: 0,
    upgradeCost: 500,
    multiplier: 1,
};

let unobtainium = {
    amount: 0,
    autominers: 0,
    autominerCost: 1500,
    automineAmt: 0.1,
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
    frequency: 15, 
    upgradeCost: 2000,
    upgrades: 0,
}


initializeGame();

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function initializeGame() {
    displayMessage("Maybe you should click on something...");

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

    // Hide Buttons
    btnRhodiumAutominer.style.display = "none";
    btnRhodiumUpgrade.style.display = "none";
    btnPalladiumAutominer.style.display = "none";
    btnPalladiumUpgrade.style.display = "none";
    btnUnobtainiumAutominer.style.display = "none";
    btnRhodiumUpgrade.style.display = "none";
    btnPalladiumUpgrade.style.display = "none";
    btnUnobtainiumUpgrade.style.display = "none";
    btnClickerUpgrade.style.display = "none";
    btnSpeedUpgrade.style.display = "none";

    // Hide Labels
    document.querySelector(".rhodium-label").style.display = "none";
    document.querySelector(".palladium-label").style.display = "none";
    document.querySelector(".unobtainium-label").style.display = "none";

    let miningInterval = setInterval(runAutominers, speed.frequency);
    
    let gameloop = setInterval(gameLoop, 300);
}

let achievements = {
    nextRhodiumAchievement: 10,
    rhodiumOver10: false,
    rhodiumOver25: false,
    rhodiumOver40: false,
    rhodiumOver50: false,
    rhodiumOver60: false,
    rhodiumOver80: false,
    rhodiumOver100: false,
    rhodiumOver500: false,
    rhodiumOver1000: false,
    rhodiumOver1500: false,
    rhodiumOver2000: false,
    rhodiumOver4000: false,
    rhodiumOver100000000: false,


}

setInterval(gameLoop, 300);

function gameLoop() {  
    if (rhodium.amount >= achievements.nextRhodiumAchievement) {
        if (!achievements.rhodiumOver10) {
            displayMessage("Are these clicks even doing anything...?");
            achievements.nextRhodiumAchievement = 25;
            achievements.rhodiumOver10 = true;

        } else if (!achievements.rhodiumOver25) {
            displayMessage("Keep clicking...");
            achievements.nextRhodiumAchievement = 40;
            achievements.rhodiumOver25 = true;

        } else if (!achievements.rhodiumOver40) {
            displayMessage("Click faster!!!");
            achievements.nextRhodiumAchievement = 50;
            achievements.rhodiumOver40 = true;

        } else if (!achievements.rhodiumOver50) {
            displayMessage("Looks like your clicks are doing something... lets make the number bigger...");
            achievements.nextRhodiumAchievement = 60;
            document.querySelector(".rhodium-label").style.display = "block";
            achievements.rhodiumOver50 = true;

        } else if (!achievements.rhodiumOver60) {
            displayMessage("BIGGER!!!");
            achievements.nextRhodiumAchievement = 75;
            achievements.rhodiumOver60 = true;

        } else if (!achievements.rhodiumOver80) {
            displayMessage("Here, have a button, but you can't afford to buy it yet...");
            achievements.nextRhodiumAchievement = 100;
            btnRhodiumAutominer.style.display = "block";
            achievements.rhodiumOver80 = true;

        } else if (!achievements.rhodiumOver100) {
            displayMessage("It must be so awesome to be you.  You clicked that asteroid 100 times!");
            achievements.nextRhodiumAchievement = 500;
            achievements.rhodiumOver100 = true;

        } else if (!achievements.rhodiumOver500) {
            displayMessage("500 is a pretty big number... are you still clicking?");
            achievements.nextRhodiumAchievement = 1000;
            btnClickerUpgrade.style.display = "block";
            achievements.rhodiumOver500 = true;

        } else if (!achievements.rhodiumOver1000) {
            displayMessage("Did you expect a cookie for 1000?  Talk to me when you get to 2000...");
            achievements.nextRhodiumAchievement = 1500;
            achievements.rhodiumOver1000 = true;
        
        } else if (!achievements.rhodiumOver1500) {
            displayMessage("1500 sounds like a lot of Rhodium, what do you plan on spending it all on?");
            achievements.nextRhodiumAchievement = 2000;
            achievements.rhodiumOver1500 = true;

        } else if (!achievements.rhodiumOver2000) {
            displayMessage("I bet you thought I would really have something really great for you at 2000.");
            displayMessage("You know you are wasting your time here... so have another button to waste some more time.");
            achievements.nextRhodiumAchievement = 4000;
            btnPalladiumAutominer.style.display = "block";
            achievements.rhodiumOver2000 = true;
        
        } else if (!achievements.rhodiumOver4000) {
            displayMessage("I've been clicking on the asteroid... ");
            achievements.nextRhodiumAchievement = 10000;
            achievements.rhodiumOver4000 = true;

        } else if (!achievements.rhodiumOver10000000) {
            displayMessage("This message has been brought to you by Logitech, keep wearing out the click buttons on your mice!");
            achievements.nextRhodiumAchievement = 100000000;
            achievements.rhodiumOver10000 = true;
            
        }
    }
}

function showRhodium() {
    
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
        switch(rhodium.autominers) {
            case 1:
                displayMessage("Wow, you bought something...");
                break;
            case 2:
                displayMessage("Do you think more autominers will get us more Rhodium faster?");
                break;
            case 3:
                displayMessage("3 Rhodium autominers, now you can waste your time 3x more efficiently.");
                break;
            case 4:
                displayMessage("What did the Java code say to the C code?  ...You've got no class.");
                break;
            case 5:
                displayMessage("How did the programmer die in the shower?  ...He read the shampoo instructions: Lather, rinse, repeat...");
                break;
            case 6:
                displayMessage("Wow, you have 6 Rhodium autominers.  At this rate you will cure world hunger soon.");
                break;
            default:
        }
        txtRhodiumAutominerCost.innerHTML = rhodium.autominerCost;
    }
    else {
        playSound(negativeSound);
    }
}

btnPalladiumAutominer.onclick = () => {
    if (rhodium.amount >= palladium.autominerCost) {
        playSound(positiveSound);
        updateRhodium(-palladium.autominerCost);
        palladium.autominerCost = Math.round(palladium.autominerCost * upgradeCost);
        palladium.autominers += 1;
        txtPalladiumAutominerCost.innerHTML = palladium.autominerCost;
        if (palladium.autominers === 1) { 
            btnUnobtainiumAutominer.style.display = "block";
            btnRhodiumUpgrade.style.display = "block";
            btnPalladiumUpgrade.style.display = "block";
            document.querySelector(".palladium-label").style.display = "block";
            
        }
        switch(palladium.autominers) {
            case 1:
                displayMessage("Thank you for shopping with us. Have some more buttons");
                break;
            case 2:
                displayMessage("2 Palladium autominers.  More work!");
                break;
            case 3:
                displayMessage("A good developer would would design the game to communicate the game's current status to the user.  Thats OK, you will figure it out.");
                break;
            case 4:
                displayMessage("You actually bought that?");
                break;
            case 5:
                displayMessage("You now have (approximately) 5 Palladium autominers.  Don't stop now.");
                break;
            case 6:
                displayMessage("You really have nothing better to do, do you?");
                break;
            default:
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
            document.querySelector(".unobtainium-label").style.display = "block";
            displayMessage("You finally made it to unobtainium.  Feel free to quit now, or continue wasting your time...");
        } else {
            displayMessage(`You now have ${unobtainium.autominers} Unobtainium Autominers...`);
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
        displayMessage(getJoke());
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
        displayMessage(getJoke());
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
        displayMessage(getJoke());
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
        if (clicker.upgrades === 1) {
            displayMessage("Now you can really click!  Every click is worth 5 whole clicks now!");
        } else if (clicker.upgrades === 2) {
            displayMessage("Another click upgrade!  25 clicks per click!  Keep clicking!");
        } else if (clicker.upgrades === 2) {
            displayMessage("Click click click... click click click...");
        } else {
            displayMessage(getJoke());
        }
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
        clearInterval(miningInterval);
        miningInterval = setInterval(runAutominers, speed.frequency);
        displayMessage(getJoke);
    }
    else {
        playSound(negativeSound);
    }
}

function updateRhodium(amtChanged) {
    rhodium.amount += amtChanged;
    rhodiumText.innerHTML = Math.trunc(rhodium.amount);
}

function updatePalladium(amtChanged) {
    palladium.amount += amtChanged;
    palladiumText.innerHTML = Math.trunc(palladium.amount);
}

function updateUnobtainium(amtChanged) {
    unobtainium.amount += amtChanged;
    unobtainiumText.innerHTML = Math.trunc(unobtainium.amount);
}

function runAutominers() {
    updateRhodium(rhodium.automineAmt * rhodium.autominers * rhodium.multiplier);
    updatePalladium(palladium.automineAmt * palladium.autominers * palladium.multiplier);
    updateUnobtainium(unobtainium.automineAmt * unobtainium.autominers * unobtainium.multiplier);
}

function displayMessage(message) {
    const msg = document.createElement("p");
    msg.innerHTML = message;
    msg.classList.add("fade-msg");
    messages.appendChild(msg);
    setTimeout(() => {
        messages.removeChild(msg);
    }, 7100);
}


function getJoke() {
    const jokes = [
        "To replace programmers with robots, clients will have to accurately describe what they want.",
        "Whats the object oriented way to achieve wealth? ...Inheritance",
        "Whats the most used language in programming? ...profanity",
        "Why do programmers confuse Christmas and Halloween? ...Because DEC 25 == OCT 31",
        "Why did the programmer quit his job? ...Because he did not get arrays.",
        "Why do Python Devs need glasses? ...Because they don't C#.",
        "How many programmers does it take to screw in a lightbulb? ...None, that's a hardware issue.",
        "Hey SysAdmin, I have a quick question...",
        "Why is 6 afraid of 7... because 7 8 9.",
        "If at first you don't succeed, call it version 1.0",
        "Whats the best computer for singing? ...A Dell.",
        "What do computers eat for a snack? ...Microchips",
        "What does a computer do at lunch? ...Have a byte.",
        "Did you REALLY read the \"Terms and Conditions\"?"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

