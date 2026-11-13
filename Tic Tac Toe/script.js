const gameContainer = document.querySelector('.game');
const resetBtn = document.getElementById('reset');
const statusDisplay = document.getElementById('status');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Erstelle das Spielfeld dynamisch
function createBoard() {
    gameContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.textContent = board[i] ? board[i] : '';
        cell.addEventListener('click', handleCellClick);
        gameContainer.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        statusDisplay.textContent = `${currentPlayer} hat gewonnen!`;
        gameActive = false;
    } else if (board.every(cell => cell !== null)) {
        statusDisplay.textContent = 'Unentschieden!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Spieler ${currentPlayer} ist am Zug`;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikal
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

resetBtn.addEventListener('click', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = 'Spieler X ist am Zug';
    createBoard();
});

createBoard();
