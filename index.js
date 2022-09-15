let score = 0;
let internalScore = 0;
let perClick = 1;
let perSecond = 200;

window.setInterval(autoAdd,1);

document.getElementById("addButton").onclick = function() {
  add();
}

function displayScore() {
  score = Math.round(internalScore);
  document.getElementById("counter").innerHTML = internalScore;
}

function add() {
  internalScore += perClick;
  displayScore();
}

function autoAdd() {
  let addTenth = perSecond;
  internalScore += addTenth;
  displayScore();
}
