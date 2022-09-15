let score = 0;
let internalScore = 0;
let perClick = 1;
let perSecond = 0;
let clickUpgrade1Price = 20;
let trickOrTreatersPrice = 50;
let trickOrTreatersCount = 0;

window.setInterval(autoAdd,10);

document.getElementById("addButton").onclick = function() {
    add();
}

document.getElementById("clickUpgrade1").onclick = function() {
    if(internalScore >= clickUpgrade1Price) {
        clickUpgrade1();
    }
}

document.getElementById("trickOrTreaters").onclick = function() {
    if(internalScore >= trickOrTreatersPrice) {
        gainTrickOrTreater();
    }
}

function changeDisplays() {
    displayScore();
    document.getElementById("perClickLabel").innerHTML = "Per Click: "+perClick;
    document.getElementById("perSecondLabel").innerHTML = "Per Second: "+perSecond;
    document.getElementById("clickUpgrade1").innerHTML = "Get a bigger bucket ("+clickUpgrade1Price+" candy)";
    document.getElementById("trickOrTreaters").innerHTML = "Hire a trick-or-treater ("+trickOrTreatersPrice+" candy)";
    document.getElementById("trickOrTreatersCount").innerHTML = trickOrTreatersCount;
}

function displayScore() {
  score = Math.round(internalScore);
  score = score.toLocaleString("en-US")
  document.getElementById("counter").innerHTML = score;
}

function add() {
    internalScore += perClick;
    checkUnlocks();
    changeDisplays();
}

function autoAdd() {
  let addHundredth = (perSecond / 100);
  internalScore += addHundredth;
  checkUnlocks();
  changeDisplays();
}

function clickUpgrade1() {
    internalScore -= clickUpgrade1Price;
    perClick += 1;
    clickUpgrade1Price = Math.round(clickUpgrade1Price * 1.15);
    changeDisplays();
}

function gainTrickOrTreater() {
    internalScore -= trickOrTreatersPrice;
    perSecond += 1;
    trickOrTreatersCount += 1;
    trickOrTreatersPrice = Math.round(trickOrTreatersPrice * 1.15)
    changeDisplays();
}

function checkUnlocks() {
  if(internalScore >= 10) {
    document.getElementById("clickUpgrade1").style.display = "inline";
  }
  if(internalScore >= 30) {
    document.getElementById("trickOrTreaters").style.display = "inline";
    document.getElementById("trickOrTreatersLabel").style.display = "inline";
    document.getElementById("trickOrTreatersCount").style.display = "inline";
  }
}
