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

    switch (colorMode) {
      case "blackAndWhite":
        event.target.style.backgroundColor = "rgb(0,0,0)";
        break;
      case "rainbow":
        event.target.style.backgroundColor =
          "rgb(" +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ", " +
          Math.floor(Math.random() * 255) +
          ")";

        break;
      case "greyscale":
        let scale = event.target.style.backgroundColor;
          if (scale != "rgb(0,0,0)") {
            scale = scale
              .substring(4, scale.length - 1)
              .replace(/ /g, "")
              .split(",");
            let temp = Number(scale[0])-26;
            event.target.style.backgroundColor = "rgb("+temp+", "+temp+", "+temp+")";
          }
        break;
      default:
      // code block
    }
  }
});

let colorMode = "blackAndWhite";

//Given a input create a input x input board.
const createBoard = (input) => {
  if (input === undefined) {
    input = 16;
  }
  for (let i = 0; i < input * input; i++) {
    const boardPiece = document.createElement("div");
    const pieceWidth = 800 / input - 2;
    boardPiece.classList.add("boardPiece");
    boardPiece.style.width = pieceWidth + "px";
    boardPiece.style.backgroundColor = "rgb(255,255,255)";

    boardPiece.addEventListener("mouseover", () => {
      boardPiece.classList.add("hovered");
    });
    boardPiece.addEventListener("mouseout", () => {
      boardPiece.classList.remove("hovered");
    });

    boardPiece.addEventListener("mousedown", () => {
      switch (colorMode) {
        case "blackAndWhite":
          boardPiece.style.backgroundColor = "rgb(0,0,0)";
          break;
        case "rainbow":
          boardPiece.style.backgroundColor =
            "rgb(" +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            ")";
          break;
        case "greyscale":
          let scale = boardPiece.style.backgroundColor;
          if (scale != "rgb(0,0,0)") {
            scale = scale
              .substring(4, scale.length - 1)
              .replace(/ /g, "")
              .split(",");
            let temp = Number(scale[0])-26;
            if (temp <0 ){
              temp =0;
            }
            boardPiece.style.backgroundColor = "rgb("+temp+", "+temp+", "+temp+")";
          }
          break;
        default:
        // code block
      }
    });
    boardPiece.ondragstart = () => {
      return false;
    };

    board.appendChild(boardPiece);
  }
};

const resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", () => {
  const boardPiece = document.querySelectorAll(".boardPiece");
  boardPiece.forEach((element) => {
    element.classList.remove("clicked");
    element.style.backgroundColor = "white";

  });
});

const newGridButton = document.querySelector("#newGrid");

newGridButton.addEventListener("click", () => {
  const boardPiece = document.querySelectorAll(".boardPiece");
  boardPiece.forEach((element) => {
    element.remove();
  });
  let isValid = false;

  while (!isValid) {
    let boardSize = prompt("Please enter a number 1-99");
    if (boardSize > 0 && boardSize < 100) {
      isValid = true;
      createBoard(boardSize);
    }
  }
});

const blackAndWhiteButton = document.querySelector("#blackAndWhite");
blackAndWhiteButton.addEventListener("click", () => {
  colorMode = blackAndWhiteButton.id;
});

const rainbowButton = document.querySelector("#rainbow");
rainbowButton.addEventListener("click", () => {
  colorMode = rainbowButton.id;
});

const greyscaleButton = document.querySelector("#greyscale");
greyscaleButton.addEventListener("click", () => {
  colorMode = greyscaleButton.id;
});

createBoard();
