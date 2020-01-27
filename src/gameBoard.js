/* eslint-disable no-unused-vars,
no-plusplus, class-methods-use-this,
no-restricted-syntax, no-labels, arrow-parens */

const Ship = require('../src/ship');
const computer = require('../src/computer');
const info = require('../src/info');

class Gameboard {
  constructor() {
    const self = this;
    this.sunkenShips = 0;
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push(new Array(10).fill(0));
    }
    this.ships = [];
    function placeRandom(length) {
      let randomX = -5;
      let randomY = -5;
      while (randomX + length < 0
        || randomX + length > 9
        || randomY + length < 0
        || randomY + length > 9) {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * 10);
      }
      const randomDir = Math.random() < 0.5 ? 'H' : 'V';
      let ship;
      if (randomDir === 'V') {
        ship = new Ship(`ship${length + 1}`, { x: randomX, y: randomY }, { x: randomX, y: randomY + length });
      } else {
        ship = new Ship(`ship${length + 1}`, { x: randomX, y: randomY }, { x: randomX + length, y: randomY });
      }
      let spotisValid = true;
      ship.spots.forEach(spot => {
        if (self.board[spot.x][spot.y] !== 0) {
          spotisValid = false;
        }
      });
      if (spotisValid) {
        self.ships.push(ship);
        ship.spots.forEach(spot => {
          self.board[spot.x][spot.y] = 1;
        });
      }
      return spotisValid;
    }
    const stockShips = [4, 3, 3, 2, 1];
    stockShips.forEach(length => {
      let happened;
      do {
        happened = placeRandom(length);
      } while (!happened);
    });
    let count = 0;
    this.board.forEach(row => row.forEach(coord => {
      if (coord === 1) { count++; }
    }));
    this.lastShotSucceeded = false;
    this.lastShotXY = null;
    this.shotsSinceLastHit = 0;
  }

  playerAttack() {
    let boardTarget = this.gameboard.board[this.x][this.y];
    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.innerHTML = '';
    this.gameboard.receiveAttack(this.gameboard, this, 'player');
    if (boardTarget === 1) {
      this.classList.toggle('red');
    } else {
      boardTarget = 2;
      this.classList.toggle('white');
    }
    this.removeEventListener('click', this.gameboard.playerAttack);
  }

  computerAttack() {
    this.removeEventListener('click', this.enemyboard.computerAttack);
    let computerShot;
    if (this.enemyboard.lastShotSucceeded) {
      computerShot = this.enemyboard.educatedShot(this);
    } else {
      computerShot = this.enemyboard.randomShot(this);
    }
    const computerTarget = document.getElementById(`X${computerShot.x}-Y${computerShot.y}`);
    if (this.enemyboard.board[computerShot.x][computerShot.y] === 1) {
      computerTarget.classList.toggle('red');
      this.enemyboard.lastShotSucceeded = true;
      this.enemyboard.shotsSinceLastHit = 0;
      this.enemyboard.lastShotXY = { x: computerShot.x, y: computerShot.y };
      this.enemyboard.receiveAttack(this.enemyboard, computerShot, 'NPC');
    } else {
      computerTarget.classList.toggle('white');
      this.enemyboard.shotsSinceLastHit++;
      if (this.enemyboard.shotsSinceLastHit >= 4) {
        this.enemyboard.lastShotSucceeded = false;
      }
    }
    this.enemyboard.board[computerShot.x][computerShot.y] = 2;
  }

  educatedShot(target) {
    let guessCount = 1;
    let computerShot = computer.generateEducatedCoords(target.enemyboard.lastShotXY);
    while (target.enemyboard.board[computerShot.x][computerShot.y] === 2 && guessCount < 5) {
      computerShot = computer.generateEducatedCoords(target.enemyboard.lastShotXY);
      guessCount++;
    }
    if (guessCount === 5) {
      computerShot = target.enemyboard.randomShot(target);
    }
    return computerShot;
  }

  randomShot(target) {
    let computerShot = computer.generateRandomCoords();
    while (target.enemyboard.board[computerShot.x][computerShot.y] === 2) {
      computerShot = computer.generateRandomCoords();
    }
    return computerShot;
  }

  receiveAttack(targetBoard, target, player) {
    loop1:
    for (const ship of targetBoard.ships) {
      for (const spot of ship.spots) {
        if (spot.x === target.x && spot.y === target.y) {
          ship.hit({ x: target.x, y: target.y });
          if (ship.sunk) {
            targetBoard.sunkenShips++;
            info.messages(player);
            info.checkForWin(targetBoard, player);
          }
          break loop1;
        }
      }
    }
  }
}
export default Gameboard;
