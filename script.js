let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const cells = document.getElementsByClassName('cell');

function makeMove(index) {
    if (board[index] === '' && gameActive) {
        board[index] = 'X';
        cells[index].textContent = 'X';
        cells[index].style.color = '#ff6b6b';

        if (checkWinner('X')) {
            gameActive = false;
            document.getElementById('board').style.display = 'none';
            document.getElementById('winScreen').style.display = 'block';
            return;
        }

        if (!board.includes('')) {
            gameActive = false;
            return;
        }

        setTimeout(botMove, 500);
    }
}

function botMove() {
    if (!gameActive) return;

    let availableMoves = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let moveIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[moveIndex] = 'O';
    cells[moveIndex].textContent = 'O';
    cells[moveIndex].style.color = '#8ec5fc';

    if (checkWinner('O')) {
        gameActive = false;
    }
}

function checkWinner(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winConditions.some(condition => {
        return condition.every(index => {
            return board[index] === player;
        });
    });
}

function showMessage() {
    document.getElementById('messagePage').style.display = 'block';
    document.getElementById('winScreen').style.display = 'none';
}

function closeMessage() {
    document.getElementById('messagePage').style.display = 'none';
    location.reload(); // Restart game when closing message
}