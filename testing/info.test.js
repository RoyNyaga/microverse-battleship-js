/* eslint-disable no-undef */

const info = require('../src/info')

const gameOverDiv = document.createElement('div')
gameOverDiv.id = 'game-over'
document.body.appendChild(gameOverDiv)

const boardDiv = document.createElement('div')
boardDiv.classList = 'board'
document.body.appendChild(boardDiv)

const territory = {}
territory.sunkenShips = 5

test('Displays correct message when ship is sunk', () => {
  info.messages('player')
  expect(gameOverDiv.innerHTML).toBe('One of the computers ships has been sunk')

  info.messages('NPC')
  expect(gameOverDiv.innerHTML).toBe('One of your ships has been sunk')
})

test('Displays correct message after win condition', () => {
  info.checkForWin(territory, 'player')
  expect(gameOverDiv.innerHTML).toBe('You Win!')

  info.checkForWin(territory, 'NPC')
  expect(gameOverDiv.innerHTML).toBe('You Lose!')
})
