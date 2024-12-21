let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
const buttons = document.querySelectorAll("button");
let msg = document.querySelector("#msg");
let turnX = true;

let playerXName = prompt("Enter Player X Name:", "Player X") || "Player X";
let playerOName = prompt("Enter Player O Name:", "Player O") || "Player O";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.textContent !== "") return;
        box.textContent = turnX ? "X" : "O";
        turnX = !turnX;
        box.disabled = true;
        if (checkForWin()) {
            disableAllBoxes();
        } else if (isDraw()) {
            showDraw();
        }
    });
});
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("glow-effect");
        setTimeout(() => {
            button.classList.remove("glow-effect");
        }, 500); 
    });
});

const checkForWin = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].textContent;
        let pos2 = boxes[pattern[1]].textContent;
        let pos3 = boxes[pattern[2]].textContent;
        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1,pattern);
            return true;
        }
    }
    return false;
};

const isDraw = () => {
    return [...boxes].every((box) => box.textContent !== "");
};
const showWinner = (winner, winningPattern) => {
    const winnerName = winner === "X" ? playerXName : playerOName;
    msg.textContent = `${winnerName} wins!`;
    msgContainer.classList.remove("hide");
    winningPattern.forEach((index) => {
        boxes[index].classList.add("winning-row");
    });
};

const showDraw = () => {
    msg.textContent = "It's a draw!";
    msgContainer.classList.remove("hide");
};

const disableAllBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.classList.remove("winning-row"); 
    });
    msgContainer.classList.add("hide");
    turnX = true;
};

resetButton.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);


resetButton.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

