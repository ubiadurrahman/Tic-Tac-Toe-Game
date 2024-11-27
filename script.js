let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let Gamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let draw = document.querySelector(".draw");
let msgDraw = document.querySelector("#draw-msg");

let turnO = true; // player X, Player 0

const winPatterens = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
      box.style.textShadow = "4px 4px 5px red";
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
      box.style.textShadow = "4px 4px 5px darkblue";
    }
    box.disabled = true;
    checkWinner();
    checkDraw();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `VICTORY⭐⭐⭐, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterens) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

const checkDraw = () => {
  if (!checkWinner() && [...boxes].every((box) => box.innerText !== "")) {
    msgDraw.innerText = "Game is draw! Well played, both Players!";
    msgDraw.style.fontSize = "x-large";
    msgDraw.style.color = "yellow";
    msgDraw.style.textShadow = "4px 4px 5px darkgrey";
    msgDraw.style.display = "block";
    disableBoxes();
  }
};

Gamebtn.addEventListener("click", () => {
  msgDraw.innerText = "";
  resetGame();
  body.style.transform = "translateX(-100%)";

  const duration = 2000;

  const startTime = performance.now();

  const intervalId = setInterval(() => {
    
    const progress = (performance.now() - startTime) / duration;

    const translateX = -100 + (100 * progress);

    body.style.transform = `translateX(${translateX}%)`;

    if (progress >= 1) {
      clearInterval(intervalId);
    }
  }, 10); 
});
resetBtn.addEventListener("click", () => {
  msgDraw.style.display = "none";
  resetGame();
  body.style.transform = "translateX(-100%)";

  const duration = 2000;

  const startTime = performance.now();

  const intervalId = setInterval(() => {
    
    const progress = (performance.now() - startTime) / duration;

    const translateX = -100 + (100 * progress);

    body.style.transform = `translateX(${translateX}%)`;

    if (progress >= 1) {
      clearInterval(intervalId);
    }
  }, 10); 
});
