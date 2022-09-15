let score = 0;
let internalScore = 0;
let perClick = 1;
let perSecond = 200;

window.setInterval(autoAdd,100);

document.getElementById("addButton").onclick = function() {
  add();
}

function displayScore() {
  score = Math.round(internalScore);
  document.getElementById("counter").innerHTML = score;
}

function add() {
  internalScore += perClick;
  displayScore();
}

function autoAdd() {
  let addHundredth = (perSecond / 100);
  internalScore += addHundredth;
  displayScore();
}
