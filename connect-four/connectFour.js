// Karlina Maya
// Last updated 03/13/2024

// declaring constants
const container = document.querySelector(".container");
const playerTurn = document.getElementById("playerTurn");
const message = document.getElementById("message");

// initializing board array
let initialMatrix = [];

// creating 6 rows, 7 columns
for (let i = 0; i < 6; i++) {
    initialMatrix[i] = [];
    for (let j = 0; j < 7; j++) {
        initialMatrix[i][j] = 0;
    }
}

let currentPlayer;

function checkHorizontal(row, column) {
    // iterating through rows and columns of array
    for (let i = 0; i <= 3; i++) {
        let count = 0;
        for (let j = i; j < i + 4; j++) {
            if (initialMatrix[row][j] === currentPlayer) {
                count++;
            }
        }

        // checking if currentPlayer has four discs in a row horizontally
        if (count === 4) {
            return true;
        }
    }
    return false;
}

function checkVertical(row, column) {
    // iterating through rows and columns of array
    for (let i = 0; i <= 2; i++) {
        let count = 0;
        for (let j = i; j < i + 4; j++) {
            if (initialMatrix[j][column] === currentPlayer) {
                count++;
            }
        }

        // checking if currentPlayer has four discs in a row vertically
        if (count === 4) {
            return true;
        }
    }
    return false;
}

function checkPositiveDiagonal(row, column) {
    // iterating through rows and columns of array
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 3; j++) {
            let count = 0;
            for (let k = 0; k < 4; k++) {
                if (initialMatrix[i + k][j + k] === currentPlayer) {
                    count++;
                }
            }

            // checking if currentPlayer has four discs in a row diagonally, bottom right to top left
            if (count === 4) {
                return true;
            }
        }
    }
    return false;
}

function checkNegativeDiagonal(row, column) {
    // iterating through rows and columns of array
    for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 6; j++) {
            let count = 0;
            for (let k = 0; k < 4; k++) {
                if (initialMatrix[i + k][j - k] === currentPlayer) {
                    count++;
                }
            }

            // checking if currentPlayer has four discs in a row diagonally, bottom left to top right
            if (count === 4) {
                return true;
            }
        }
    }
    return false;
}

// checking for game over
function gameOverCheck() 
{
    let count = 0;

    // checking for non-zero values in array
    for (let innerArray of initialMatrix) {
        if (innerArray.every(val => (val) != 0)) {
            count++;
        }

        else
            return false;
    }
  
    // if all rows are filled, display game over message
    if (count === 6) {
        const message = document.getElementById("message");
        message.innerText = "Game Over";
        return false;
    }
}

// checking for win
function winCheck(row, column)
{
    // return true if any check function conditions are met
    return checkHorizontal(row, column) || checkVertical(row, column) || checkPositiveDiagonal(row, column) || checkNegativeDiagonal(row, column);
}

// set a piece and update board
function setPiece(startCount, colValue) {
    try {
        // selecting all rows
        let rows = document.querySelectorAll(".grid-row");
        
        // checking if space in specified column is empty
        if (initialMatrix[startCount][colValue] !== 0) {
            startCount--;
            // if not empty, move to next available space
            setPiece(startCount, colValue);
        } else {
            let currentRow = rows[startCount].querySelectorAll(".grid-box");

            // indicating that chosen piece is filled
            currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
            initialMatrix[startCount][colValue] = currentPlayer;
        
            // checking if current move results in a win
            if (winCheck(startCount, colValue)) {
                // update message to display winner
                message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
                return false;
            }
        }

        // check if board is filled
        gameOverCheck();

    // display alert dialog if an error occurs due to a full column
    } catch (e) {
        alert("Column full, select again");
    }
}

function fillBox(e)
{
    // getting column value and setting the piece
    let colValue = parseInt(e.target.getAttribute("data-value"));
    setPiece(5, colValue);

    // switch the current player
    if (currentPlayer == 1)
        currentPlayer = 2;
    else if (currentPlayer == 2)
        currentPlayer = 1;

    // indicate current player's turn
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

function createBoard()
{
    for (let innerArray of initialMatrix) {
        let outerDiv = document.createElement("div");
        
        outerDiv.classList.add("grid-row");
        
        outerDiv.setAttribute("data-value", initialMatrix.indexOf(innerArray));

        // iterate through the columns
        for (let j in innerArray) {
            // set each element in array to 0
            innerArray[j] = 0;
        
            // creating new div element for each box in the grid
            let innerDiv = document.createElement("div");
            
            innerDiv.classList.add("grid-box");
            innerDiv.setAttribute("data-value", j);
            innerDiv.addEventListener("click", (e) => { fillBox(e); });
            outerDiv.appendChild(innerDiv);
        }

        // appending outerDiv to container
        container.appendChild(outerDiv);
    }
}

function startGame()
{
    // player 1 always goes first
    currentPlayer = 1;
    
    container.innerHTML = "";
    createBoard();
    
    // indicate current player's turn
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// calling startGame for onload event
window.onload = startGame;