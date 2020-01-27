const info = (() => {
  function checkForWin(targetBoard, player) {
    const board = document.getElementsByClassName('board')[0];
    const gameOverDiv = document.getElementById('game-over');

    if (targetBoard.sunkenShips >= 5) {
      board.style.pointerEvents = 'none';
      if (player === 'player') {
        gameOverDiv.innerHTML = 'You Win!';
      } else {
        gameOverDiv.innerHTML = 'You Lose!';
      }
    }
  }

  function messages(player) {
    const gameOverDiv = document.getElementById('game-over');
    if (player === 'player') {
      gameOverDiv.innerHTML = 'One of the computers ships has been sunk';
    } else {
      gameOverDiv.innerHTML = 'One of your ships has been sunk';
    }
  }

  return { checkForWin, messages };
})();

module.exports = info;
