
/* eslint-disable no-plusplus */
import Gameboard from './gameBoard';

function buildBoard(ownTerritory, enemyTerritory = null) {
  const playingBoard = document.querySelector('#playing-board');
  const boardDiv = document.createElement('div');
  boardDiv.classList = 'board';
  if (enemyTerritory !== null) {
    boardDiv.id = 'right-board';
  } else {
    boardDiv.id = 'left-board';
  }
  playingBoard.appendChild(boardDiv);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const square = document.createElement('div');
      square.classList = 'square';

      if (enemyTerritory === null) {
        square.id = `X${x}-Y${y}`;
      }

      if (y === 0) {
        square.classList.toggle('first');
      }
      square.x = x;
      square.y = y;
      square.gameboard = ownTerritory;
      square.enemyboard = enemyTerritory;
      if (enemyTerritory !== null) {
        square.addEventListener('click', ownTerritory.playerAttack);
        square.addEventListener('click', enemyTerritory.computerAttack);
      } else if (ownTerritory.board[x][y] === 1) {
        square.classList.toggle('player-ship');
      }
      boardDiv.appendChild(square);
    }
  }
}

function initialSetup() {
  const NPCterritory = new Gameboard();
  const PlayerTerritory = new Gameboard();
  buildBoard(NPCterritory, PlayerTerritory);
  const informationBoard = document.querySelector('#information-board');

  const gameOverDiv = document.createElement('div');
  gameOverDiv.id = 'game-over';
  gameOverDiv.innerHTML = 'click on restart to change ship position';
  informationBoard.appendChild(gameOverDiv);

  const resetButton = document.createElement('div');
  resetButton.type = 'button';
  resetButton.id = 'reset';
  resetButton.innerHTML = 'Restart';
  resetButton.addEventListener('click', () => window.location.reload());
  informationBoard.appendChild(resetButton);

  buildBoard(PlayerTerritory);
}

export default initialSetup;
