document.addEventListener('DOMContentLoaded', () => {
    // Select all div elements within the game board
    const squares = document.querySelectorAll('#board > div');
    const statusDisplay = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');
    let currentPlayer = 'X'; // Start with player X
    let gameState = Array(9).fill(null); // Initialize game state

    //Loop through each square and add the 'square' class
    squares.forEach((square, index) => {
        square.classList.add('square');
    
        // Add click event listener to each square
        square.addEventListener('click', () => {
            handleSquareClick(square, index);
        });

        // Add mouse enter and leave event listeners for hover effect
        square.addEventListener('mouseenter', () => {
            square.classList.add('hover');
        });

        square.addEventListener('mouseleave', () => {
            square.classList.remove('hover');
        });
    
    });

    function handleSquareClick(element, index){
        // Check if the square is already filled or the game is over
        if (gameState[index] || checkWinner()){
            return;
        }

        // Update the game state
        gameState[index] = currentPlayer;
        element.textContent = currentPlayer; // Display the current player's symbol
        element.classList.add(currentPlayer); // Add the appropriate class for styling

        // Check for a winner after the move
        const winner = checkWinner();
        if (winner){
            statusDisplay.textContent = `Congratulations! ${winner} is the Winner!`;
            statusDisplay.classList.add('you-won');
        } else {
            // Switch Players
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        const winningCombi = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]]; // Diagonals

        for (let comb of winningCombi) {
            const [a, b, c] = comb;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c] ) {
                return gameState[a]; // A winner is found
            }
        }

        return null; // No winner
    }

    // New Game
    newGameButton.addEventListener('click', () => {
        gameState.fill(null); // Reset the game state
        squares.forEach(square => {
            square.textContent = ''; // Claer the square
            square.classList.remove('X', 'O'); // Remove player classes
        });

        currentPlayer = 'X'; // Reset to player X
        statusDisplay.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDisplay.classList.remove('you-won');
    });

});
