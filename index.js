// получение элекментов страницы
let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");
let $result = document.querySelector("#result");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");

let score = 0;
let isGameStarted = false;

// обработчики события (клик)
$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);

// старт игры
function startGame() {
  score = 0;
  setGameTime();
  isGameStarted = true;
  $timeHeader.classList.remove("hide");
  $resultHeader.classList.add("hide");
  isGameStarted = true;
  $game.style.backgroundColor = "#fff";
  $start.classList.add("hide");

  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1); // toFixed уберает все знаки кроме 1
    }
    console.log("interval", $time.textContent);
  }, 100);

  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = 5;
  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $start.classList.remove("hide");
  $game.innerHTML = "";
  $game.style.backgroundColor = "#ccc";
  $timeHeader.classList.add("hide");
  $resultHeader.classList.remove("hide");
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

// создание квадрата
function renderBox() {
  $game.innerHTML = ""; // очищает поле от предыдущих объектов
  var box = document.createElement("div");
  var boxSize = getRandom(30, 100);
  var gameSize = $game.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000";
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

// функция генерации рандомных значений
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
