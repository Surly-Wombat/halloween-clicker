let score = 0;
let internalScore = 0;
let perClick = 1;
let perSecond = 0;
let clickUpgrade1Price = 20;

var trickOrTreaters = {
    price: 50,
    displayPrice: "50",
    count: 0,
    rate: 1,
    gain: function() {
        internalScore -= this.price;
        perSecond += this.rate;
        this.count += 1;
        this.price = Math.round(this.price * 1.15)
        this.displayPrice = this.price.toLocaleString("en-US");
        changeDisplays();
    },
    upgrade1: function() {
        internalScore -= 200;
        perSecond += this.count;
        this.rate *= 2;
        document.getElementById("trickOrTreatersUpgrade1").style.display = "none";
        changeDisplays();
    }
}

var candyThieves = {
    price: 550,
    displayPrice: "550",
    count: 0,
    rate: 7,
    gain: function() {
        internalScore -= this.price;
        perSecond += this.rate;
        this.count += 1;
        this.price = Math.round(this.price * 1.15);
        this.displayPrice = this.price.toLocaleString("en-US");
        changeDisplays();
    },
    upgrade1: function() {
        internalScore -= 2000;
        perSecond += (this.count * this.rate);
        this.rate *= 2;
        document.getElementById("candyThievesUpgrade1").style.display = "none";
        changeDisplays();
    }
}

var candyMachines = {
    price: 6000,
    displayPrice: "6,000",
    count: 0,
    rate: 50,
    gain: function() {
        internalScore -= this.price;
        perSecond += this.rate;
        this.count += 1;
        this.price = Math.round(this.price * 1.15);
        this.displayPrice = this.price.toLocaleString("en-US");
        changeDisplays();
    },
    upgrade1: function() {
        internalScore -= 20000;
        perSecond += (this.count * this.rate);
        this.rate *= 2;
        document.getElementById("candyMachinesUpgrade1").style.display = "none";
        changeDisplays();
    }
}

var candyFactories = {
    price: 66000,
    displayPrice: "66,000",
    count: 0,
    rate: 350,
    gain: function() {
        internalScore -= this.price;
        perSecond += this.rate;
        this.count += 1;
        this.price = Math.round(this.price * 1.15);
        this.displayPrice = this.price.toLocaleString("en-US");
        changeDisplays();
    },
    upgrade1: function() {
        internalScore -= 200000;
        perSecond += (this.count * this.rate);
        this.rate *= 2;
        document.getElementById("candyFactoriesUpgrade1").style.display = "none";
        changeDisplays();
    }
}

window.setInterval(autoAdd,10,trickOrTreaters,candyThieves,candyMachines,candyFactories);

document.getElementById("addButton").onclick = function() {
    add(trickOrTreaters,candyThieves,candyMachines,candyFactories);
}

document.getElementById("saveButton").onclick = function() {
    saveGame(trickOrTreaters,candyThieves,candyMachines,candyFactories);
}

document.getElementById("clickUpgrade1").onclick = function() {
    if(internalScore >= clickUpgrade1Price) {
        clickUpgrade1();
    }
}

document.getElementById("trickOrTreaters").onclick = function() {
    if(internalScore >= trickOrTreaters.price) {
        trickOrTreaters.gain();
    }
}

document.getElementById("trickOrTreatersUpgrade1").onclick = function() {
    if(internalScore >= 200) {
        trickOrTreaters.upgrade1();
    }
}

document.getElementById("candyThieves").onclick = function() {
    if(internalScore >= candyThieves.price) {
        candyThieves.gain();
    }
}

document.getElementById("candyThievesUpgrade1").onclick = function() {
    if(internalScore >= 2000) {
        candyThieves.upgrade1();
    }
}

document.getElementById("candyMachines").onclick = function() {
    if(internalScore >= candyMachines.price) {
        candyMachines.gain();
    }
}

document.getElementById("candyMachinesUpgrade1").onclick = function() {
    if(internalScore >= 20000) {
        candyMachines.upgrade1();
    }
}

document.getElementById("candyFactories").onclick = function() {
    if(internalScore >= candyFactories.price) {
        candyFactories.gain();
    }
}

document.getElementById("candyFactoriesUpgrade1").onclick = function() {
    if(internalScore >= 200000) {
        candyFactories.upgrade1();
    }
}

function changeDisplays() {
    displayScore();
    document.getElementById("perClickLabel").innerHTML = "Per Click: "+perClick;
    document.getElementById("perSecondLabel").innerHTML = "Per Second: "+perSecond;
    document.getElementById("clickUpgrade1").innerHTML = `Get a bigger bucket (${clickUpgrade1Price} candy)`
    document.getElementById("trickOrTreatersPrice").innerHTML = `Price: ${trickOrTreaters.displayPrice} candy`;
    document.getElementById("trickOrTreatersCount").innerHTML = `Count: ${trickOrTreaters.count}`;
    document.getElementById("candyThievesPrice").innerHTML = `Price: ${candyThieves.displayPrice} candy`;
    document.getElementById("candyThievesCount").innerHTML = `Count: ${candyThieves.count}`;
    document.getElementById("candyMachinesPrice").innerHTML = `Price: ${candyMachines.displayPrice} candy`;
    document.getElementById("candyMachinesCount").innerHTML = `Count: ${candyMachines.count}`;
    document.getElementById("candyFactoriesPrice").innerHTML = `Price: ${candyFactories.displayPrice} candy`;
    document.getElementById("candyFactoriesCount").innerHTML = `Count: ${candyFactories.count}`;
}

function displayScore() {
  score = Math.round(internalScore);
  score = score.toLocaleString("en-US");
  document.getElementById("counter").innerHTML = score;
}

function add(trickOrTreaters,candyThieves,candyMachines,candyFactories) {
    internalScore += perClick;
    checkUnlocks(trickOrTreaters,candyThieves,candyMachines,candyFactories);
    changeDisplays();
}

function autoAdd(trickOrTreaters,candyThieves,candyMachines,candyFactories) {
  let addHundredth = (perSecond / 100);
  internalScore += addHundredth;
  checkUnlocks(trickOrTreaters,candyThieves,candyMachines,candyFactories);
  changeDisplays();
}

function clickUpgrade1() {
    internalScore -= clickUpgrade1Price;
    perClick *= 2;
    clickUpgrade1Price *= 4;
    changeDisplays();
}

function checkUnlocks(trickOrTreaters,candyThieves) {
  if(internalScore >= 10) {
    document.getElementById("clickUpgrade1").style.display = "inline";
  }
  if(internalScore >= 30) {
    document.getElementById("trickOrTreaters").style.display = "inline";
  }
  if((internalScore >= 100)&&(trickOrTreaters.rate == 1)) {
    document.getElementById("trickOrTreatersUpgrade1").style.display = "inline";
  }
  if(internalScore >= 300) {
    document.getElementById("candyThieves").style.display = "inline";
  }
  if((internalScore >= 1000)&&(candyThieves.rate == 7)) {
    document.getElementById("candyThievesUpgrade1").style.display = "inline";
  }
  if(internalScore >= 3000) {
    document.getElementById("candyMachines").style.display = "inline";
  }
  if((internalScore >= 10000)&&(candyMachines.rate == 50)) {
    document.getElementById("candyMachinesUpgrade1").style.display = "inline";
  }
  if(internalScore >= 33000) {
    document.getElementById("candyFactories").style.display = "inline";
  }
  if((internalScore >= 100000)&&(candyFactories.rate == 350)) {
    document.getElementById("candyFactoriesUpgrade1").style.display = "inline";
  }
}

function saveGame(trickOrTreaters,candyThieves,candyMachines,candyFactories) {
    var gameSave = {
        score: score,
        internalScore: internalScore,
        perClick: perClick,
        perSecond: perSecond,
        clickUpgrade1Price: clickUpgrade1Price,
        trickOrTreaters: trickOrTreaters,
        candyThieves: candyThieves,
        candyMachines: candyMachines,
        candyFactories: candyFactories
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (typeof savedGame.score !== "undefined") score = savedGame.score;
    if (typeof savedGame.internalScore !== "undefined") internalScore = savedGame.internalScore;
    if (typeof savedGame.perClick !== "undefined") perClick = savedGame.perClick;
    if (typeof savedGame.perSecond !== "undefined") perSecond = savedGame.perSecond;
    if (typeof savedGame.clickUpgrade1Price !== "undefined") clickUpgrade1Price = savedGame.clickUpgrade1Price;
    if (typeof savedGame.trickOrTreaters.price !== "undefined") trickOrTreaters.price = savedGame.trickOrTreaters.price;
    if (typeof savedGame.trickOrTreaters.displayPrice !== "undefined") trickOrTreaters.displayPrice = savedGame.trickOrTreaters.displayPrice;
    if (typeof savedGame.trickOrTreaters.rate !== "undefined") trickOrTreaters.rate = savedGame.trickOrTreaters.rate;
    if (typeof savedGame.trickOrTreaters.count !== "undefined") trickOrTreaters.count = savedGame.trickOrTreaters.count;
    if (typeof savedGame.candyThieves.price !== "undefined") candyThieves.price = savedGame.candyThieves.price;
    if (typeof savedGame.candyThieves.displayPrice !== "undefined") candyThieves.displayPrice = savedGame.candyThieves.displayPrice;
    if (typeof savedGame.candyThieves.rate !== "undefined") candyThieves.rate = savedGame.candyThieves.rate;
    if (typeof savedGame.candyThieves.count !== "undefined") candyThieves.count = savedGame.candyThieves.count;
    if (typeof savedGame.candyMachines.price !== "undefined") candyMachines.price = savedGame.candyMachines.price;
    if (typeof savedGame.candyMachines.displayPrice !== "undefined") candyMachines.displayPrice = savedGame.candyMachines.displayPrice;
    if (typeof savedGame.candyMachines.rate !== "undefined") candyMachines.rate = savedGame.candyMachines.rate;
    if (typeof savedGame.candyMachines.count !== "undefined") candyMachines.count = savedGame.candyMachines.count;
    if (typeof savedGame.candyFactories.price !== "undefined") candyFactories.price = savedGame.candyFactories.price;
    if (typeof savedGame.candyFactories.displayPrice !== "undefined") candyFactories.displayPrice = savedGame.candyFactories.displayPrice;
    if (typeof savedGame.candyFactories.rate !== "undefined") candyFactories.rate = savedGame.candyFactories.rate;
    if (typeof savedGame.candyFactories.count !== "undefined") candyFactories.count = savedGame.candyFactories.count;
}

window.onload = function(trickOrTreaters,candyThieves,candyMachines,candyFactories) {
    loadGame();
    autoAdd(trickOrTreaters,candyThieves,candyMachines,candyFactories);
}

window.setInterval(saveGame,30000,trickOrTreaters,candyThieves,candyMachines,candyFactories)
