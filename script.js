const board = document.querySelector("#boardContainer");


// Allows mouse to be held down to draw.
let isMouseDown = false;

board.addEventListener("mousedown", () => {
  isMouseDown = true;
});

board.addEventListener("mouseup", () => {
  isMouseDown = false;
});

board.addEventListener("mouseover", (event) => {
  if (isMouseDown && event.target.classList.contains("boardPiece")) {
    event.target.classList.add("clicked");
  }
});

//Given a input create a input x input board.
const createBoard = (input)=>{
    if (input === undefined){
        input = 16;
    }
    for (let i = 0; i < input*input; i++) {
        const boardPiece = document.createElement("div");
          const pieceWidth = (800/input-2);
        boardPiece.classList.add("boardPiece");
        boardPiece.style.width = pieceWidth+"px";
        boardPiece.addEventListener("mouseover", () => {
          boardPiece.classList.add("hovered");
        });
        boardPiece.addEventListener("mouseout", () => {
          boardPiece.classList.remove("hovered");
        });
        boardPiece.addEventListener("mousedown", () => {
          boardPiece.classList.add("clicked");
        });
        boardPiece.ondragstart = () => {
          return false;
        };
      
        board.appendChild(boardPiece);
      }
}


const resetButton = document.querySelector("#reset");


resetButton.addEventListener("click", () => {
  const boardPiece = document.querySelectorAll(".boardPiece");
  boardPiece.forEach((element) => {
    element.classList.remove("clicked");
  });
});

const newGridButton = document.querySelector("#newGrid");

newGridButton.addEventListener("click", () => {
    const boardPiece = document.querySelectorAll(".boardPiece");
    boardPiece.forEach((element) => {
      element.remove();
    });
    let isValid = false;

    while (!isValid){
        let boardSize = prompt("Please enter a number 1-99");
        if (boardSize>0 && boardSize<100){
            isValid=true;
            createBoard(boardSize);
        }

    }

  });


createBoard();