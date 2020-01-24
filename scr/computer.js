const computer = (() => {
  function generateRandomCoords() {
    let randomCoords = { x: -5, y: -5 }
    randomCoords.x = Math.floor(Math.random() * 10);
    randomCoords.y = Math.floor(Math.random() * 10);
  return randomCoords;
}
  
  return { generateRandomCoords}
})()
module.exports = computer;