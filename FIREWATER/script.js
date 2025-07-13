const board = document.getElementById('board');
const statusText = document.getElementById('status');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('resultMessage');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer = '🔥';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.setAttribute('data-value', '');
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.setAttribute('data-value', currentPlayer);

  if (checkWin()) {
    endGame(`Player ${currentPlayer} wins!`);
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === '🔥' ? '💧' : '🔥';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

function endGame(message) {
  gameActive = false;
  resultMessage.textContent = message;
  overlay.style.display = 'flex';
}

function startNewGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = '🔥';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  overlay.style.display = 'none';
  createBoard();
}

newGameBtn.addEventListener('click', startNewGame);

// Initialize
createBoard();
