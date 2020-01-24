import Gameboard from './gameBoard'

function buildBoard (ownTerritory, enemyTerritory = null) {
  const playingBoard = document.querySelector('#playing-board')
  const boardDiv = document.createElement('div')
  boardDiv.classList = 'board'
  if (enemyTerritory !== null) {
    boardDiv.id = 'right-board'
  } else {
    boardDiv.id = 'left-board'
  }
  playingBoard.appendChild(boardDiv)
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const square = document.createElement('div')
      square.classList = 'square'

      if (enemyTerritory === null) {
        square.id = `X${x}-Y${y}`
      }

      if (y == 0) {
        square.classList.toggle('first')
      }
      square.x = x
      square.y = y
      square.gameboard = ownTerritory
      square.enemyboard = enemyTerritory
      if (enemyTerritory !== null) {
        square.addEventListener('click', ownTerritory.playerAttack)
        square.addEventListener('click', enemyTerritory.computerAttack)
      } else if (ownTerritory.board[x][y] == 1) {
        square.classList.toggle('player-ship')
      }
      boardDiv.appendChild(square)
    }
  }
}

export default initialSetup
