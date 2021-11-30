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
  console.log(getRandom(30, 100));
  $game.innerHTML = ""; // очищает поле от предыдущих объектов
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxleft = gameSize.width - boxSize;
  console.log(gameSize);

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000";
  box.style.borderRadius = "50%";
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxleft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

// функция генерации рандомных значений для ширны и высоты квадрата
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
