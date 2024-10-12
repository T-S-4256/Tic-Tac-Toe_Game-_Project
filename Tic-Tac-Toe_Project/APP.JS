console.log("JAY SIYA RAM")

const game_info = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameButton = document.querySelector(".btn");

let currentPlayer;
let gameGrid;


const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function initGame() {
    game_info.style.backgroundColor="rgba(255, 255, 255, 0.15)";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    })
    newGameButton.classList.remove("active");
    game_info.innerText = `Current Player - ${currentPlayer}`;

}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})


function swap() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    game_info.innerText = `Current Player - ${currentPlayer}`;
}


function checkGameOver() {
    let winner = "";
    winningPosition.forEach((position) => {


        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {

            // DISABLE CLICK AFTER WINNER FOUND
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })


            // CHECK WHICH PLAYER IS WINNER
            if (gameGrid[position[0]] === "X") {
                winner = "X";
            }
            else {
                winner = "O";
            }

            // CHANGE THE BACKGOUNDS COLOR OF BOXES
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    })

    //SHOW THE WINNER NAME AND ENABLE NEW GAME BUTTON
    if (winner !== "") {
        game_info.innerText = `WINNER : Player-${winner} `;
        game_info.style.backgroundColor="rgba(0, 255, 0, 0.3)";
        newGameButton.classList.add("active");
        return;
    }

    //CHECK FOR TIE GAME AND SHOW GAME TIED
    let count = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            count++;
        }
    });
    if (count === 9) {
        game_info.innerText = "Game Tied !";
        newGameButton.classList.add("active");
        game_info.style.backgroundColor="rgba(255, 255, 0, 0.3)";
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        boxes[index].innerText = currentPlayer;
        swap();

        checkGameOver();
    }
}



newGameButton.addEventListener("click", initGame)