// получение элекментов страницы
let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");

let score = 0;
let isGameStarted = false;

// обработчики события (клик)
$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);

// старт игры
function startGame() {
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

function endGame() {
  isGameStarted = false;
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

// функция генерации рандомных значений
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
