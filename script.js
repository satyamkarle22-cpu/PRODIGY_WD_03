const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick() {
    const index = this.getAttribute("data-index");

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {

    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++){

        const [a,b,c] = winningConditions[i];

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent =
        `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent = "Match Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
    `Player ${currentPlayer}'s Turn`;
}

function restartGame(){

    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;

    statusText.textContent =
    "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
