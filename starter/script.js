"use strict";

// reinforcing knowledge is one of the most important thing that you can do to learn

// AS ALWAYS ,WE START BY SELECTING THE ELEMENTS THAT WE WANT TO USE AND STORE THEM IN VARIABLES SO WE CAN EASILY USE THEM LATER
// selecting the elements with the score and setting it back to zero
// const score = document.querySelectorAll(".score");
// for (let i = 0; i < score.length; i++) {
//   score[i].textContent = 0;
// }

// AS ALWAYS ,WE START BY SELECTING THE ELEMENTS THAT WE WANT TO USE AND STORE THEM IN VARIABLES SO WE CAN EASILY USE THEM LATER
//  alternate syntax
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0Element = document.querySelector("#score--0");
// when selecting elements using their respective ID names ,we can alternatively use the  getElementById() method
const score1Element = document.getElementById("score--1");
const player0Currentscore = document.getElementById("current--0");
const player1Currentscore = document.getElementById("current--1");
const diceImageElement = document.querySelector(".dice");
const rollDiceBtn = document.querySelector(".btn--roll");
const newGameBtn = document.querySelector(".btn--new");
const holdCurrentScoreBtn = document.querySelector(".btn--hold");

// ------------STARTING CONDITIONS------------
// selecting the elements with the score and setting it back to zero at the start of the game
// score0Element.textContent = 0;
// score1Element.textContent = 0;

// let scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// // a variable that stores the state of the game
// let playing = true;
let playing;
let scores;
let currentScore;
let activePlayer;

// ------------STARTING CONDITIONS------------
// selecting the elements with the score and setting it back to zero at the start of the game
const initializeGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // a variable that stores the state of the game
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  player0Currentscore.textContent = 0;
  player1Currentscore.textContent = 0;

  diceImageElement.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
// initialize starting conditions for the game
initializeGame();

const switchPlayer = function () {
  //setting the currentscore back to zero when a player rolls a 1 ie,this is before we switch to a different player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //   switch to next player using a ternary operator if rolled a one
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // the toggle()method will add the class if it does not exist on the element;and if the class exists,it will remove it
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// hiding the dice image at the begining of the game
diceImageElement.classList.add("hidden");

//implementing rolling dice functinality
rollDiceBtn.addEventListener("click", function () {
  if (playing) {
    // 1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.display dice image
    diceImageElement.classList.remove("hidden");
    //   dynamically updating the image of the rolled dice number
    diceImageElement.src = `dice-${dice}.png`;
    //   3.check if a player has rolled a 1;if true,switch to the next player
    if (dice !== 1) {
      //   add the rolled dice number to the current score
      // currentscore = currentscore + dice
      currentScore += dice;
      // select the score element dynamically based on who is the  current active player
      // we are choosing the ID name dynamically using a template literal
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // //setting the currentscore back to zero when a player rolls a 1 ie,this is before we switch to a different player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // //   switch to next player using a ternary operator if rolled a one
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // // the toggle()method will add the class if it does not exist on the element;and if the class exists,it will remove it
      // player0El.classList.toggle("player--active");
      // player1El.classList.toggle("player--active");

      // simplified the functionality into a function
      switchPlayer();
    }
  }
});

holdCurrentScoreBtn.addEventListener("click", function () {
  if (playing) {
    // 1.add current score to active player's score
    scores[activePlayer] += currentScore; //this is same as score[1]=score[1] + current score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.check if score >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceImageElement.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// reload game
newGameBtn.addEventListener("click", initializeGame);
