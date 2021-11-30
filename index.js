// получение элекментов страницы
let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");
let $result = document.querySelector("#result");
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $gameTime = document.querySelector("#game-time");

let score = 0;
let isGameStarted = false;

// обработчики события (клик)
$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);

// обработчик события ввода времени игры
$gameTime.addEventListener("input", setGameTime);

// функция show удаляет класс hide
function show($el) {
  $el.classList.remove("hide");
}
// функция hide добавляет класс hide
function hide($el) {
  $el.classList.add("hide");
}

// начало игры
function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute("disabled", "true"); // запрет изменения значения времени игры при запуске игры
  isGameStarted = true;
  $game.style.backgroundColor = "#fff";
  hide($start);

  // функция получает значение времени и сравнивает,
  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);
    //если больше равно 0 очищает интервал и останваливает игру
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      // получает текстовые данные и оставляет 1 знак после запятой
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100); //время обновления 100мс

  renderBox();
}

// отрисовывает результат
function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute("disabled");
  show($start);
  $game.innerHTML = "";
  $game.style.backgroundColor = "#ccc";
  hide($timeHeader);
  show($resultHeader);
}

// функция проверяет произошл ли клик по объекту
function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  // если в поле dataset при клике присутствует объект box
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

// функция рендера объекта
function renderBox() {
  $game.innerHTML = ""; //
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  box.style.borderRadius = "50%";
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
