// получение элекментов страницы
var $start = document.querySelector("#start");
var $game = document.querySelector("#game");

var score = 0;

// обработчики события (клик)
$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);

// старт игры
function startGame() {
  $game.style.backgroundColor = "#fff";
  $start.classList.add("hide");

  renderBox();
}

function handleBoxClick(event) {
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

// создание квадрата
function renderBox() {
  $game.innerHTML = ""; // очщает поле от предыдущих объектов
  var box = document.createElement("div");

  box.style.height = box.style.width = "50px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000";
  box.style.top = "50px";
  box.style.left = "70px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
  return;
}
