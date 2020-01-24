const Ship = require('../src/ship');

test ('creates a ship', () => {
  let shipTest = new Ship("shipTest", {x: 0, y: 0}, {x: 0, y: 4});
  expect(shipTest.name).toBe("shipTest");
  expect(shipTest.spots.length).toBe(5);
  expect(shipTest.spots[0].hit).toBe(false);
  expect(shipTest.sunk).toBe(false);
});
test ('applies hits to a ship', () => {
  let shipTest = new Ship("shipTest", {x: 0, y: 0}, {x: 0, y: 4});
  shipTest.hit({x:0, y:0})
  expect(shipTest.spots[0].hit).toBe(true);
  expect(shipTest.spots[1].hit).toBe(false);
  expect(shipTest.sunk).toBe(false);
  
  shipTest.hit({x:0, y:1})
  shipTest.hit({x:0, y:2})
  shipTest.hit({x:0, y:3})
  shipTest.hit({x:0, y:4})
  expect(shipTest.spots[4].hit).toBe(true);
  expect(shipTest.sunk).toBe(true);
});