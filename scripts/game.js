'use strict';
const rows = 3;
const columns = 3;
const gameSquare = document.getElementById('game-square');
const gameSquares = document.getElementsByClassName('game-squares');
let gameState = Array(...Array(rows)).map(() => Array(columns));

const gameGrid = () => {
  const grid = Array.apply(null, Array(columns)).map( (y, yIndex) => { 
    let row = Array.apply(null, Array(rows)).map( (x, xIndex) => {
      return `<button class="game-squares pos${ xIndex }-${ yIndex }" 
              data-x="${ xIndex }" data-y="${ yIndex }"></button>`;
    });
    return `${ row.join('') }`;
  });
  return grid;
};

gameSquare.insertAdjacentHTML('afterbegin', gameGrid().join(''));

const updateBoard = (x, y, player) => {
  const boardTags = {
    X: '<div class="cross bigEntrance"></div>',
    O: '<div class="nought fadeIn"></div>'
  }
  const clickedSquare = document.querySelector(`.pos${ x }-${ y }`);
  clickedSquare.insertAdjacentHTML('afterbegin', boardTags[player]);
};

const gameClick = function gameClick() {
  const xPosition = parseInt(this.getAttribute("data-x"));
  const yPosition = parseInt(this.getAttribute("data-y"));
  let playerTurnId = document.getElementById('player-turn');
  const playerTurn = playerTurnId.innerText;
  updateBoard(xPosition,yPosition, playerTurn);
  playerTurnId.innerText = (playerTurn == 'X') ? 'O' : 'X';
};

Array.from(gameSquares).forEach(function(element) {
  element.addEventListener('click', gameClick);
});