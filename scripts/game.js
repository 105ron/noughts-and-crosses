'use strict';
const rows = 3;
const columns = 3;
const gameSquare = document.getElementById('game-square');


const gameGrid = function gameGrid() {
  const grid = Array.apply(null, Array(columns)).map( (y, yIndex) => { 
    let row = Array.apply(null, Array(rows)).map( (x, xIndex) => {
      return `<button class="game-squares ${ xIndex }-${ yIndex }"></button>`;
    });
    return `${ row.join('') }`;
  });
  return grid;
};

gameSquare.insertAdjacentHTML('afterbegin', gameGrid().join(''));