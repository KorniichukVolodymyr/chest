document.addEventListener('DOMContentLoaded', () => {
// Get UI elements
  const mainWrapper = document.getElementById('js-main-wrapper');
  const gameAvailable = document.getElementById('js-available-games');
  const gameCounter = document.getElementById('js-game-count');
  const gameCounterPlus = document.getElementById('js-game-count-plus');
  const gameCounterMinus = document.getElementById('js-game-count-minus');
  const gameTotalPrice = document.getElementById('js-game-total-price');
  const buyGameBtn = document.getElementById('js-buy-btn');
  const playGameBtn = document.getElementById('js-play-btn');
  const chestArr = document.querySelectorAll('.js-chest-item');
  const body = document.querySelector('body');
  const closePopupBtn = document.getElementById('js-close-popup-button');
  // Declare default values
  let gameResult = 'lose';
  let playAvailable = false;
  let gameAvailableCounter = 0;
  let gameBuyingCounter = 0;
  gameCounter.value = gameBuyingCounter;
  calculatePrice(); // set default price as 0 $
  checkGames(); // check if player has games

  createMsg('Вскрывай сундуки из<br> моей сокровищницы!<br> Ищи несметные<br> богатства!');

  mainWrapper.addEventListener('click', function (e) {
    if (e.target === gameCounterPlus) {
      increaseCounter();
    } else if (e.target === gameCounterMinus) {
      decreaseCounter();
    } else if (e.target === buyGameBtn) {
      buyGame();
    } else if (e.target === playGameBtn) {
      playGame();
    } else if (e.target === closePopupBtn) {
      closePopup();
    }
  });

  // pick chest from the list
  chestArr.forEach(function (item) {
    item.addEventListener('click', function () {
      chooseCondition(item);
    });
  });

  // game condition
  function chooseCondition(item) {
    if (playAvailable) {
      playAvailable = false;
      playGameBtn.disabled = true;
      if (gameResult === 'lose') {
        winResult(item);
      } else if (gameResult === 'win') {
        loseResult(item);
      }
    }
  }

  // If user win
  function winResult(item) {
    gameResult = 'win';
    // eslint-disable-next-line no-param-reassign
    item.className = 'chest-item chest-item--win';
    setTimeout(function () {
      callPopup('Поздравляем! <br> Вы выиграли!', '');
    }, 100);
    checkGames();
  }

  // If user lose
  function loseResult(item) {
    gameResult = 'lose';
    // eslint-disable-next-line no-param-reassign
    item.className = 'chest-item chest-item--lose';
    setTimeout(function () {
      callPopup('Не повезло!', 'Попробуй еще раз!');
    }, 100);
    checkGames();
  }

  // call popup
  function callPopup(title, msg) {
    document.getElementById('js-popup-title').innerHTML = title;
    document.getElementById('js-popup-text').innerHTML = msg;
    body.classList.add('main-popup-enabled');
  }

  // close popup
  function closePopup() {
    body.classList.remove('main-popup-enabled');
    resetGame();
    checkGames();
  }

  // Create event for enter value
  // eslint-disable-next-line no-unused-vars
  gameCounter.addEventListener('keyup', function (e) {
    enterGameCount();
  });

  // create counter increase function
  function increaseCounter() {
    // eslint-disable-next-line no-plusplus
    ++gameBuyingCounter;
    gameCounter.value = gameBuyingCounter;
    calculatePrice();
  }

  // create counter decrease function
  function decreaseCounter() {
    // eslint-disable-next-line no-unused-expressions,no-plusplus
    gameBuyingCounter > 0 ? --gameBuyingCounter : gameBuyingCounter = 0;
    gameCounter.value = gameBuyingCounter;
    calculatePrice();
  }

  // Data entry
  function enterGameCount() {
    gameBuyingCounter = gameCounter.value;
    calculatePrice();
  }

  // Price calculation
  function calculatePrice() {
    const totalPrice = gameBuyingCounter * 5;
    gameTotalPrice.innerHTML = `${totalPrice}<span>$</span>`;
  }

  // Reset price counter
  function resetPrice() {
    gameBuyingCounter = 0;
    gameCounter.value = '';
    calculatePrice();
  }

  // Buying game
  function buyGame() {
    gameAvailableCounter += +gameBuyingCounter;
    checkGames();
    resetPrice();

    if (playAvailable) {
      playGameBtn.disabled = true;
    }
  }

  // Play game
  function playGame() {
    if (gameAvailableCounter > 0) {
      // eslint-disable-next-line no-plusplus
      --gameAvailableCounter;
    }
    checkGames();
    gameStart();
    createMsg('Отлично! Теперь выбери один из сундуков!');
    playGameBtn.disabled = true;
  }

  // game settings
  function gameStart() {
    playAvailable = true;
    mainWrapper.classList.add('game-started');
    setTimeout(function () {
      mainWrapper.classList.remove('game-started');
    }, 2000);
    defaultChest();
  }

  // Check if player has games
  function checkGames() {
    if (gameAvailableCounter > 0) {
      playGameBtn.disabled = false;
      createMsg('Молодец! Для начала игры необходимо нажать кнопку “Играть”');
    } else if (gameAvailableCounter === 0) {
      playGameBtn.disabled = true;
      createMsg('Вскрывай сундуки из<br> моей сокровищницы!<br> Ищи несметные<br> богатства!');
    }
    gameAvailable.innerText = gameAvailableCounter;
  }

  // set default chest
  function defaultChest() {
    chestArr.forEach(function (item) {
      // eslint-disable-next-line no-param-reassign
      item.className = 'chest-item';
    });
  }

  // reset game
  function resetGame() {
    defaultChest();
    playAvailable = false;
    checkGames();
  }

  // create msg
  function createMsg(msg) {
    document.querySelector('.js-game-msg p').innerHTML = msg;
  }

  // start animation
  function bearAnimation() {
    const animationItems = document.querySelectorAll('.viking-animation__item--beer span');

    animationItems.forEach(function (item) {
      setInterval(function () {
        // eslint-disable-next-line no-param-reassign
        item.style.display = 'block';

        setTimeout(function () {
          // eslint-disable-next-line no-param-reassign
          item.style.display = 'none';
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
// end animation
});
