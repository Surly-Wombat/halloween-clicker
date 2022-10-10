let score = 0;
let internalScore = 0;
let perClick = 1;
let perSecond = 0;
let clickUpgrade1Price = 20;

var trickOrTreaters = {
    price: 50,
    count: 0,
    rate: 1,
    gain: function() {
        internalScore -= this.price;
        perSecond += this.rate;
        this.count += 1;
        this.price = Math.round(this.price * 1.15)
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

var candyFactories = {
    price: 500,
    count: 0,
    rate: 15,
    gain: function() {
        internalScore -= this.price;
        perSecond += this.rate;
        this.count += 1;
        this.price = Math.round(this.price * 1.15);
        changeDisplays();
    },
    upgrade1: function() {
        internalScore -= 2000;
        perSecond += this.count;
        this.rate *= 2;
        document.getElementById("candyFactoriesUpgrade1").style.display = "none";
        changeDisplays();
    }
}

window.setInterval(autoAdd,10,trickOrTreaters,candyFactories);

document.getElementById("addButton").onclick = function() {
    add(trickOrTreaters,candyFactories);
}

document.getElementById("saveButton").onclick = function() {
    saveGame(trickOrTreaters,candyFactories);
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

document.getElementById("candyFactories").onclick = function() {
    if(internalScore >= candyFactories.price) {
        candyFactories.gain();
    }
}

document.getElementById("candyFactoriesUpgrade1").onclick = function() {
    if(internalScore >= 2000) {
        candyFactories.upgrade1();
    }
}

function changeDisplays() {
    displayScore();
    document.getElementById("perClickLabel").innerHTML = "Per Click: "+perClick;
    document.getElementById("perSecondLabel").innerHTML = "Per Second: "+perSecond;
    document.getElementById("clickUpgrade1").innerHTML = `Get a bigger bucket (${clickUpgrade1Price} candy)`
    document.getElementById("trickOrTreatersPrice").innerHTML = `Price: ${trickOrTreaters.price} candy`;
    document.getElementById("trickOrTreatersCount").innerHTML = `Count: ${trickOrTreaters.count}`;
    document.getElementById("candyFactoriesPrice").innerHTML = `Price: ${candyFactories.price} candy`;
    document.getElementById("candyFactoriesCount").innerHTML = `Count: ${candyFactories.count}`;
}

function displayScore() {
  score = Math.round(internalScore);
  score = score.toLocaleString("en-US")
  document.getElementById("counter").innerHTML = score;
}

function add(trickOrTreaters,candyFactories) {
    internalScore += perClick;
    checkUnlocks(trickOrTreaters,candyFactories);
    changeDisplays();
}

function autoAdd(trickOrTreaters,candyFactories) {
  let addHundredth = (perSecond / 100);
  internalScore += addHundredth;
  checkUnlocks(trickOrTreaters,candyFactories);
  changeDisplays();
}

function clickUpgrade1() {
    internalScore -= clickUpgrade1Price;
    perClick += 1;
    clickUpgrade1Price = Math.round(clickUpgrade1Price * 1.15);
    changeDisplays();
}

function checkUnlocks(trickOrTreaters,candyFactories) {
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
    document.getElementById("candyFactories").style.display = "inline";
  }
  if((internalScore >= 1000)&&(candyFactories.rate == 15)) {
    document.getElementById("candyFactoriesUpgrade1").style.display = "inline";
  }
}

function saveGame(trickOrTreaters,candyFactories) {
    var gameSave = {
        score: score,
        internalScore: internalScore,
        perClick: perClick,
        perSecond: perSecond,
        clickUpgrade1Price: clickUpgrade1Price,
        trickOrTreaters: trickOrTreaters,
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
    if (typeof savedGame.trickOrTreaters.rate !== "undefined") trickOrTreaters.rate = savedGame.trickOrTreaters.rate;
    if (typeof savedGame.trickOrTreaters.count !== "undefined") trickOrTreaters.count = savedGame.trickOrTreaters.count;
    if (typeof savedGame.candyFactories.price !== "undefined") candyFactories.price = savedGame.candyFactories.price;
    if (typeof savedGame.candyFactories.rate !== "undefined") candyFactories.rate = savedGame.candyFactories.rate;
    if (typeof savedGame.candyFactories.count !== "undefined") candyFactories.count = savedGame.candyFactories.count;
}

window.onload = function(trickOrTreaters,candyFactories) {
    loadGame();
    autoAdd(trickOrTreaters,candyFactories);
}

window.setInterval(saveGame,30000,trickOrTreaters,candyFactories)
