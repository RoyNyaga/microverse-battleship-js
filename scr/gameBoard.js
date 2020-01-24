const Ship = require('../src/ship');
const computer =  require('../src/computer');
const info =  require('../src/info');
class Gameboard {
  constructor() {
    let self = this;
    this.sunkenShips = 0;
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push(new Array(10).fill(0));
    }
    this.ships = [];
    function placeRandom(length) {
        let randomX = -5;
        let randomY = -5;
        while (randomX+length < 0 || randomX+length > 9 || randomY+length < 0 || randomY+length > 9) {
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
        let randomDir = Math.random() < 0.5 ? "H" : "V";
        let ship;
        if (randomDir == "V") {
          ship = new Ship(`ship${length+1}`, {x: randomX, y: randomY}, {x: randomX, y: randomY+length});
        } else {
          ship = new Ship(`ship${length+1}`, {x: randomX, y: randomY}, {x: randomX+length, y: randomY});
        }
        let spotisValid = true
        ship.spots.forEach(spot => {
          if (self.board[spot.x][spot.y] != 0) {
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
    let stockShips = [4,3,3,2,1];
    stockShips.forEach(length => {
      let happened;
      do {
        happened = placeRandom(length);
      } while (!happened)
    });
    let count = 0;
    this.board.forEach(row => row.forEach(coord => {
      if (coord == 1) { count++; }
    }));
    this.lastShotSucceeded = false;
    this.lastShotXY = null;
    this.shotsSinceLastHit = 0;
    console.log(this.board);
  }
 
}
export default Gameboard;