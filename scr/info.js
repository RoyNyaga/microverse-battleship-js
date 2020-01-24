const info = (() => {
  function checkForWin (targetBoard, player) {
    const board = document.getElementsByClassName('board')[0]
    const gameOverDiv = document.getElementById('game-over')

    if (targetBoard.sunkenShips >= 5) {
      board.style.pointerEvents = 'none'
      if (player == 'player') {
        gameOverDiv.innerHTML = 'You Win!'
      } else {
        gameOverDiv.innerHTML = 'You Lose!'
      }
    }
  }

  return { checkForWin, messages }
})()

module.exports = info
