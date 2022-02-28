'use strict';

const gameboard = (() => {
    let squares;
    let board = {'a1': '', 'a2': '', 'a3': '', 'b1': '', 'b2': '', 'b3': '',
                 'c1': '', 'c2': '', 'c3': ''};

    const clearBoard = () => {
        squares.forEach(square => square.textContent = '');
        Object.keys(board).forEach(function(key) {
            board[key] = '';
        }
    )};
    const getBoard = () => board;

    const setSquares = (squareDivs) => squares = squareDivs;
    
    const setSquare = (piece, squareID) => {
        if (board[squareID] === '') {
            board[squareID] = piece;
            let clickedOnSquare = document.getElementById(squareID);
            clickedOnSquare.textContent = piece;
            return true;
        }
        return false;
    }

    const checkWinOrTie = () => {
       if (threeInARow(board['a1'], board['a2'], board['a3'])
           || threeInARow(board['b1'], board['b2'], board['b3'])
           || threeInARow(board['c1'], board['c2'], board['c3'])
           || threeInARow(board['a1'], board['b1'], board['c1'])
           || threeInARow(board['a2'], board['b2'], board['c2'])
           || threeInARow(board['a3'], board['b3'], board['c3'])
           || threeInARow(board['a1'], board['b2'], board['c3'])
           || threeInARow(board['a3'], board['b2'], board['c1'])) {
           return 'win';
        } else if (board['a1'] !== '' && board['a2'] !== '' && board['a3'] !== ''
                   && board['b1'] !== '' && board['b2'] !== '' && board['b3']
                   && board['c1'] !== '' && board['c2'] !== '' && board['c3']) {
            return 'tie';
        }
       return false;
    }

    const threeInARow = (s1, s2, s3) => {
        if (s1 !== '' && s2 !== '' && s3 !== '') {
            return s1 === s2 && s2 === s3;
        }
    }
    
    return {clearBoard, getBoard, setSquares, setSquare, checkWinOrTie};
})();

const Player = (piece) => {
    return {piece};
}

const displayController = (() => {
    const squareDivs = Array.from(document.getElementsByClassName('square'));
    const board = gameboard;
    board.setSquares(squareDivs);

    const activePlayerTitle = document.getElementById('turn');
    const winnerSpan = document.getElementById('winner');
    const resetButton = document.getElementById('reset');
    
    resetButton.addEventListener('click', () => {
        resetGame();
    })

    let gameOver = false;
    let activePlayer = 'X';

    const resetGame = () => {
        board.clearBoard();
        activePlayer = 'X';
        gameOver = false;
        winnerSpan.classList.add('hide');
        activePlayerTitle.classList.remove('hide');
        activePlayerTitle.textContent = 'Player X Turn';
    }

    const addListenersToSquares = () => {
        squareDivs.forEach(square => square.addEventListener('click', event => {
            let success = false;
            if (!gameOver) {
                success = board.setSquare(activePlayer.toLowerCase(), event.target.id);
            }
            if (success) {
                let status = board.checkWinOrTie();
                if (status === 'win') {
                    activePlayerTitle.classList.add('hide');
                    winnerSpan.classList.remove('hide');
                    winnerSpan.textContent = `Player ${activePlayer} wins!`;
                    gameOver = true;
                } else if (status === 'tie') {
                    activePlayerTitle.classList.add('hide');
                    winnerSpan.classList.remove('hide');
                    winnerSpan.textContent = `Tie game`;
                    gameOver = true;
                } else if (!gameOver) {
                    changeTurns();
                }
            }
        }));
    }

    const startGame = () => {
        resetGame();
        addListenersToSquares();
    }

    const changeTurns = () => {
        if (activePlayer === 'X') {
            activePlayer = 'O';
            activePlayerTitle.textContent = 'Player O Turn';
        } else {
            activePlayer = 'X';
            activePlayerTitle.textContent = 'Player X Turn';
        }
    }

    return {startGame};

})();

const display = displayController;
display.startGame();