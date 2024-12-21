let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnX = true;

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
        }
    });
});

const checkForWin = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].textContent;
        let pos2 = boxes[pattern[1]].textContent;
        let pos3 = boxes[pattern[2]].textContent;
        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }
    return false;
};

const showWinner = (winner) => {
    msg.textContent = `Player ${winner} wins!`;
    msgContainer.classList.remove("hide");
};

const disableAllBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    turnX = true;
};

resetButton.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);