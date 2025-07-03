const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const score0El = document.getElementById('score0');
const score1El = document.getElementById('score1');
const current0El = document.getElementById('current1');
const current1El = document.getElementById('current2');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


const init = function () {
  scores = [0, 0];        
  currentScore = 0;       
  activePlayer = 0;       
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImg.style.display = 'none';  

  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
};

init();


const switchPlayer = function () {
  document.getElementById(`current${activePlayer + 1}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};


btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.style.display = 'block';
    diceImg.src = `images/dice-${dice}.jpg`; 
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current${activePlayer + 1}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// 📥 Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceImg.style.display = 'none';
      document.querySelector(`.player--${activePlayer + 1}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer + 1}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// 🔄 New Game button
btnNew.addEventListener('click', init);
