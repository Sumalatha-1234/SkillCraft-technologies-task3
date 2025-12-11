let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let resetBtn = document.getElementById("reset");
let startBtn = document.getElementById("start");

let clickSound = document.getElementById("clickSound");
let popup = document.getElementById("popup");
let popupMsg = document.getElementById("popup-msg");

let playerX, playerO;
let scoreX = 0, scoreO = 0;
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = false;

startBtn.addEventListener("click", startGame);
cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetRound);

function startGame() {
    playerX = document.getElementById("playerX").value || "Player X";
    playerO = document.getElementById("playerO").value || "Player O";

    document.getElementById("nameX").textContent = playerX;
    document.getElementById("nameO").textContent = playerO;

    statusText.textContent = `${playerX}'s Turn (X)`;
    running = true;
}

function cellClicked() {
    let index = this.dataset.index;

    if (board[index] !== "" || !running) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    clickSound.play();
    checkWinner();
}

function checkWinner() {
    let winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            
            showWinningTiles(pattern);
            declareWinner();
            return;
        }
    }

    if (!board.includes("")) {
        popupMsg.textContent = "Match Draw 🤝";
        popup.style.display = "block";
        running = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = currentPlayer === "X"
        ? `${playerX}'s Turn (X)` : `${playerO}'s Turn (O)`;
}

function showWinningTiles(pattern) {
    pattern.forEach(i => cells[i].classList.add("win"));
}

function declareWinner() {
    popupMsg.textContent =
        currentPlayer === "X" ? `${playerX} Wins 🎉` : `${playerO} Wins 🎉`;
    popup.style.display = "block";
    running = false;

    if (currentPlayer === "X") {
        scoreX++;
        document.getElementById("scoreX").textContent = scoreX;
    } else {
        scoreO++;
        document.getElementById("scoreO").textContent = scoreO;
    }
}

function closePopup() {
    popup.style.display = "none";
}

function resetRound() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(c => {
        c.textContent = "";
        c.classList.remove("win");
    });
    currentPlayer = "X";
    statusText.textContent = `${playerX}'s Turn (X)`;
    running = true;
}

