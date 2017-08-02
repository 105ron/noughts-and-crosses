'use strict';
const rows = 3;
const columns = 3;
const gameSquare = document.getElementById('game-square');
const gameSquares = document.getElementsByClassName('game-squares');
let gameState = Array(...Array(rows)).map(() => Array(columns));

const gameGrid = () => {
  const grid = Array.apply(null, Array(columns)).map( (x, xIndex) => { 
    let row = Array.apply(null, Array(rows)).map( (y, yIndex) => {
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

const isLegalMove = (x, y) => {
  return (gameState[x][y]) ? false : true;
};

const gameLines = (gameArray) => {
  //rows, columns and diagonals of the game board
  const gameLines = [
    [...gameArray[0]], //rows
    [...gameArray[1]],
    [...gameArray[2]],
    [gameArray[0][0], gameArray[1][0], gameArray[2][0]], //columns
    [gameArray[0][1], gameArray[1][1], gameArray[2][1]],
    [gameArray[0][2], gameArray[1][2], gameArray[2][2]],
    [gameArray[0][0], gameArray[1][1], gameArray[2][2]], //diagonals
    [gameArray[0][2], gameArray[1][1], gameArray[2][0]]
  ];
  return gameLines;
}

const isWinner = (gameArray, playerToken) => {
  let result = false;
  gameLines(gameArray).forEach(gameLine => {
    if (gameLine.every(gameSquare => (gameSquare === playerToken))) result = true;
  });
  return result;
};

const isDraw = (gameArray) => {
  const flattenedGame = [].concat(...gameArray)
  console.log(flattenedGame);
  return !flattenedGame.includes(undefined);
};


const gameClick = function gameClick() {
  const xPosition = parseInt(this.getAttribute("data-x"));
  const yPosition = parseInt(this.getAttribute("data-y"));
  let playerTurnId = document.getElementById('player-turn');
  const playerTurn = playerTurnId.innerText;
  if (isLegalMove(xPosition, yPosition)) {
    updateBoard(xPosition,yPosition, playerTurn);
    gameState[xPosition][yPosition] = playerTurn;
    //(isWinner(gameState, playerTurn));
    playerTurnId.innerText = (playerTurn == 'X') ? 'O' : 'X';
  };
};

Array.from(gameSquares).forEach(function(element) {
  element.addEventListener('click', gameClick);
});