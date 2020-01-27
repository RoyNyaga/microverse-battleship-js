/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* eslint-disable no-plusplus */

class Ship {
  constructor(name, start, end) {
    this.name = name;
    this.sunk = false;
    this.spots = [];
    if (start.y === end.y) {
      for (let i = start.x; i <= end.x; i++) {
        this.spots.push({ x: i, y: start.y, hit: false });
      }
    } else {
      for (let i = start.y; i <= end.y; i++) {
        this.spots.push({ x: start.x, y: i, hit: false });
      }
    }
  }

  hit(target) {
    const index = this.spots.indexOf(this.spots.find((spot) => spot.x === target.x
      && spot.y === target.y));
    this.spots[index].hit = true;
    if (this.spots.every(spot => spot.hit === true)) {
      this.sunk = true;
    }
  }
}
module.exports = Ship;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable default-case */
const computer = (() => {
  function generateRandomCoords() {
    const randomCoords = { x: -5, y: -5 };
    randomCoords.x = Math.floor(Math.random() * 10);
    randomCoords.y = Math.floor(Math.random() * 10);
    return randomCoords;
  }
  function generateEducatedCoords(lastshot) {
    const educatedCoords = { x: -5, y: -5 };
    while (educatedCoords.x < 0
      || educatedCoords.x > 9
      || educatedCoords.y < 0
      || educatedCoords.y > 9) {
      switch (Math.floor(Math.random() * 4)) {
        case 0:
          educatedCoords.x = lastshot.x + 1;
          educatedCoords.y = lastshot.y;
          break;
        case 1:
          educatedCoords.x = lastshot.x - 1;
          educatedCoords.y = lastshot.y;
          break;
        case 2:
          educatedCoords.x = lastshot.x;
          educatedCoords.y = lastshot.y + 1;
          break;
        case 3:
          educatedCoords.x = lastshot.x;
          educatedCoords.y = lastshot.y - 1;
          break;
      }
    }
    return educatedCoords;
  }
  return { generateRandomCoords, generateEducatedCoords };
})();
module.exports = computer;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/gameBoard.js
/* eslint-disable no-unused-vars,
no-plusplus, class-methods-use-this,
no-restricted-syntax, no-labels */

const Ship = __webpack_require__(0);
const computer = __webpack_require__(1);
const info = __webpack_require__(2);

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
/* harmony default export */ var gameBoard = (Gameboard);

// CONCATENATED MODULE: ./src/domManipulations.js

/* eslint-disable no-plusplus */


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
  const NPCterritory = new gameBoard();
  const PlayerTerritory = new gameBoard();
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

/* harmony default export */ var domManipulations = (initialSetup);

// CONCATENATED MODULE: ./src/index.js
/* eslint-disable no-unused-expressions */



'use strict';
domManipulations();


/***/ })
/******/ ]);