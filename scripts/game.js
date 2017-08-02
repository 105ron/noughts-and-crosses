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

//creates grid for the DOM
gameSquare.insertAdjacentHTML('afterbegin', gameGrid().join(''));

//adds div inside button to display 'x' or 'o' inside the browser
const updateBoard = (x, y, player) => {
  const boardTags = {
    X: '<div class="cross bigEntrance"></div>',
    O: '<div class="nought fadeIn"></div>'
  }
  const clickedSquare = document.querySelector(`.pos${ x }-${ y }`);
  clickedSquare.insertAdjacentHTML('afterbegin', boardTags[player]);
};

//check the clicked button hasn't already been given a nought or cross
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

const winnerOrDraw = (gameArray, playerToken) => {
  const isWinner = () => {
    let result = false;
    gameLines(gameArray).forEach(gameLine => {
      if (gameLine.every(gameSquare => (gameSquare === playerToken))) {
        result = `Player ${ playerToken } is the winner`;
      }
    });
    return result;
  };

  const isDraw = () => {
    const flattenedGame = [].concat(...gameArray)
    console.log(flattenedGame);
    if (!flattenedGame.includes(undefined)) return 'It\'s a draw';
  };
  return isWinner() || isDraw() || false;
};


const gameClick = function gameClick() {
  const xPosition = parseInt(this.getAttribute("data-x"));
  const yPosition = parseInt(this.getAttribute("data-y"));
  let playerTurnId = document.getElementById('player-turn');
  const playerTurn = playerTurnId.innerText;
  if (isLegalMove(xPosition, yPosition)) {
    updateBoard(xPosition,yPosition, playerTurn);
    gameState[xPosition][yPosition] = playerTurn;
    console.log(winnerOrDraw(gameState, playerTurn));
    playerTurnId.innerText = (playerTurn == 'X') ? 'O' : 'X';
  };
};

Array.from(gameSquares).forEach(function(element) {
  element.addEventListener('click', gameClick);
});