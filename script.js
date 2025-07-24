// DOM Elements
const body = document.querySelector("body");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const Gamebtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const draw = document.querySelector(".draw");
const msgDraw = document.querySelector("#draw-msg");

let turnO = true; // player X, Player 0
let gameActive = true;

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

// Reset game function
const resetGame = () => {
  turnO = true;
  gameActive = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msgDraw.style.display = "none";
  
  // Smooth transition
  body.style.transition = "transform 0.5s ease-out";
  body.style.transform = "translateX(0)";
  
  // Remove transition after animation completes
  setTimeout(() => {
    body.style.transition = "none";
  }, 500);
};

// Handle box click
const handleBoxClick = (e) => {
  if (!gameActive) return;
  
  const box = e.target;
  
  if (box.innerText !== "") return;
  
  if (turnO) {
    box.innerText = "O";
    box.style.textShadow = "4px 4px 5px red";
  } else {
    box.innerText = "X";
    box.style.textShadow = "4px 4px 5px darkblue";
  }
  
  turnO = !turnO;
  box.disabled = true;
  
  checkWinner();
  checkDraw();
};

// Add both click and touch events
boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
  box.addEventListener("touchend", handleBoxClick, { passive: true });
});

const disableBoxes = () => {
  gameActive = false;
  boxes.forEach(box => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `VICTORY ⭐⭐⭐ Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valA === valC) {
      showWinner(valA);
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  if (!checkWinner() && [...boxes].every(box => box.innerText !== "")) {
    msgDraw.innerText = "Game is draw! Well played, both Players!";
    msgDraw.style.display = "block";
    disableBoxes();
  }
};

// New Game button
Gamebtn.addEventListener("click", resetGame);

// Reset Game button
resetBtn.addEventListener("click", resetGame);

// Prevent zooming on double-tap
document.addEventListener('dblclick', (e) => {
  e.preventDefault();
}, { passive: false });

// Handle window resize
window.addEventListener('resize', () => {
  // Adjust layout if needed
});