let score = 0;
let perClick = 1;
let perSecond = 0;

document.getElementById("addButton").onclick = function() {
  add();
}

function add() {
  score += 1;
  document.getElementById("counter").innerHTML = score;
}
