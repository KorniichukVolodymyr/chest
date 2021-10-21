document.addEventListener('DOMContentLoaded', () => {
  const mainEl = document.getElementById('js-main-wrapper');
  const gameAvailEl = document.getElementById('js-available-games');
  const gameCountEl = document.getElementById('js-game-count');
  const gameCountPlus = document.getElementById('js-game-count-plus');
  const gameCountMinus = document.getElementById('js-game-count-minus');
  const gamePrice = document.getElementById('js-game-total-price');
  const buyBtn = document.getElementById('js-buy-btn');
  const playBtn = document.getElementById('js-play-btn');
  const chestArr = document.querySelectorAll('.js-chest-item');
  const body = document.querySelector('body');
  const closePopupBtn = document.getElementById('js-close-popup-button');
  let gameResult = 'lose';
  let playAvail = false;
  let gameAvailCount = 0;
  let gameBuyCount = 0;
  gameCountEl.value = gameBuyCount;
  createMsg('Вскрывай сундуки из<br> моей сокровищницы!<br> Ищи несметные<br> богатства!');
  calcPrice();
  checkGames();

  mainEl.addEventListener('click', function (e) {
    if (e.target === buyBtn) {
      buyGame();
    } else if (e.target === gameCountMinus) {
      decreaseCount();
    } else if (e.target === gameCountPlus) {
      increaseCount();
    } else if (e.target === playBtn) {
      playGame();
    } else if (e.target === closePopupBtn) {
      closePopup();
    }
  });

  chestArr.forEach(function (el) {
    el.addEventListener('click', function () {
      chooseCondition(el);
    });
  });

  function chooseCondition(el) {
    if (playAvail) {
      playAvail = false;
      playBtn.disabled = true;
      if (gameResult === 'lose') {
        winResult(el);
      } else if (gameResult === 'win') {
        loseResult(el);
      }
    }
  }

  function winResult(el) {
    gameResult = 'win';
    // eslint-disable-next-line no-param-reassign
    el.className = 'chest-item chest-item--win';
    setTimeout(function () {
      callPopup('Поздравляем! <br> Вы выиграли!', '');
    }, 100);
    checkGames();
  }

  function loseResult(el) {
    gameResult = 'lose';
    // eslint-disable-next-line no-param-reassign
    el.className = 'chest-item chest-item--lose';
    setTimeout(function () {
      callPopup('Не повезло!', 'Попробуй еще раз!');
    }, 100);
    checkGames();
  }

  // eslint-disable-next-line no-unused-vars
  gameCountEl.addEventListener('keyup', function (e) {
    enterGameCount();
  });

  function increaseCount() {
    // eslint-disable-next-line no-plusplus
    ++gameBuyCount;
    gameCountEl.value = gameBuyCount;
    calcPrice();
  }

  function decreaseCount() {
    // eslint-disable-next-line no-unused-expressions,no-plusplus
    gameBuyCount > 0 ? --gameBuyCount : gameBuyCount = 0;
    gameCountEl.value = gameBuyCount;
    calcPrice();
  }

  function enterGameCount() {
    gameBuyCount = gameCountEl.value;
    calcPrice();
  }

  function calcPrice() {
    const totalPrice = gameBuyCount * 5;
    gamePrice.innerHTML = `${totalPrice}<span>$</span>`;
  }

  function resetPrice() {
    gameBuyCount = 0;
    gameCountEl.value = '';
    calcPrice();
  }

  function buyGame() {
    gameAvailCount += +gameBuyCount;
    checkGames();
    resetPrice();

    if (playAvail) {
      playBtn.disabled = true;
    }
  }

  function playGame() {
    if (gameAvailCount > 0) {
      // eslint-disable-next-line no-plusplus
      --gameAvailCount;
    }
    checkGames();
    gameStart();
    createMsg('Отлично! Теперь выбери один из сундуков!');
    playBtn.disabled = true;
  }

  function gameStart() {
    playAvail = true;
    mainEl.classList.add('game-started');
    setTimeout(function () {
      mainEl.classList.remove('game-started');
    }, 2000);
    defaultChest();
  }

  function checkGames() {
    if (gameAvailCount > 0) {
      playBtn.disabled = false;
      createMsg('Молодец! Для начала игры необходимо нажать кнопку “Играть”');
    } else if (gameAvailCount === 0) {
      playBtn.disabled = true;
      createMsg('Вскрывай сундуки из<br> моей сокровищницы!<br> Ищи несметные<br> богатства!');
    }
    gameAvailEl.innerText = gameAvailCount;
  }

  function defaultChest() {
    chestArr.forEach(function (item) {
      // eslint-disable-next-line no-param-reassign
      item.className = 'chest-item';
    });
  }

  function resetGame() {
    defaultChest();
    playAvail = false;
    checkGames();
  }

  function createMsg(msg) {
    document.querySelector('.js-game-msg p').innerHTML = msg;
  }

  function callPopup(title, msg) {
    document.getElementById('js-popup-title').innerHTML = title;
    document.getElementById('js-popup-text').innerHTML = msg;
    body.classList.add('main-popup-enabled');
  }

  function closePopup() {
    body.classList.remove('main-popup-enabled');
    resetGame();
    checkGames();
  }

  function bearAnimation() {
    const animationItems = document.querySelectorAll('.viking-animation__item--beer span');

    animationItems.forEach(function (el) {
      setInterval(function () {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'block';

        setTimeout(function () {
          // eslint-disable-next-line no-param-reassign
          el.style.display = 'none';
        }, 1000);
      }, 6500);
    });
  }

  function handAnimation() {
    const hand = document.querySelector('.viking-animation__item--hand span');
    setInterval(function () {
      hand.style.display = 'block';

      setTimeout(function () {
        hand.style.display = 'none';
      }, 1000);
    }, 4780);
  }

  function shoulderAnimation() {
    const shoulder = document.querySelector('.viking-animation__item--shoulder span');
    setInterval(function () {
      shoulder.style.display = 'block';
      setTimeout(function () {
        shoulder.style.display = 'none';
      }, 1000);
    }, 6000);
  }

  if (window.innerWidth >= 1200) {
    bearAnimation();
    handAnimation();
    shoulderAnimation();
  }
});
