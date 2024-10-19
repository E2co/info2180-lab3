document.addEventListener('DOMContentLoaded', () => {
    // Select all div elements within the game board
    const squares = document.querySelectorAll('board > div');

    //Loop through each square and add the 'square' class
    squares.forEach(square => {
        square.classList.add('square');
    })
})