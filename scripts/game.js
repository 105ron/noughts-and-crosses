'use strict';
const rows = 3;
const columns = 3;
const gameSquare = document.getElementById('game-square');
let gameState = Array(...Array(rows)).map(() => Array(columns));

const gameGrid = function gameGrid() {
  const grid = Array.apply(null, Array(columns)).map( (y, yIndex) => { 
    let row = Array.apply(null, Array(rows)).map( (x, xIndex) => {
      return `<button class="game-squares pos${ xIndex }-${ yIndex }"></button>`;
    });
    return `${ row.join('') }`;
  });
  return grid;
};

gameSquare.insertAdjacentHTML('afterbegin', gameGrid().join(''));