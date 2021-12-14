import "./App.css";
import { useEffect, useState } from "react";

const width = 8;
const color = ["red", "green", "yellow", "blue", "violet", "pink"];

function App() {
  const [currentColorsBoard, setCurrentColorsBoard] = useState([]);

  const createBoard = () => {
    const colorArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = color[Math.floor(Math.random() * color.length)];
      colorArray.push(randomColor);
    }
    setCurrentColorsBoard([...colorArray]);
  };

  const checkColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnThree = [i, i + width, i + width * 2];
      const cellColor = currentColorsBoard[i];
      if (
        columnThree.every((square) => currentColorsBoard[square] === cellColor)
      ) {
        columnThree.forEach((square) => (currentColorsBoard[square] = ""));
      }
    }
  };

  const checkColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3];
      const cellColor = currentColorsBoard[i];
      if (
        columnFour.every((square) => currentColorsBoard[square] === cellColor)
      ) {
        columnFour.forEach((square) => (currentColorsBoard[square] = ""));
      }
    }
  };

  const checkRowOfThree = () => {
    const invalidCell = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
    ];
    for (let i = 0; i < 64; i++) {
      if (!invalidCell.includes(i)) {
        const rowThree = [i, i + 1, i + 2];
        const cellColor = currentColorsBoard[i];
        if (
          rowThree.every((square) => currentColorsBoard[square] === cellColor)
        ) {
          rowThree.forEach((square) => (currentColorsBoard[square] = ""));
        }
      }
    }
  };

  const checkRowOfFour = () => {
    const invalidCell = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 61, 62, 63,
    ];
    for (let i = 0; i < 64; i++) {
      if (!invalidCell.includes(i)) {
        const rowFour = [i, i + 1, i + 2, i + 3];
        const cellColor = currentColorsBoard[i];
        if (
          rowFour.every((square) => currentColorsBoard[square] === cellColor)
        ) {
          rowFour.forEach((square) => (currentColorsBoard[square] = ""));
        }
      }
    }
  };

  const moveDownCell = () => {
    for (let i = 0; i < 64 - width; i++) {
      if (currentColorsBoard[i + width] === "") {
        currentColorsBoard[i + width] = currentColorsBoard[i];
        currentColorsBoard[i] = "";
      }
    }
  };

  useEffect(() => {
    createBoard();
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfThree();
      checkColumnOfFour();
      checkRowOfThree();
      checkRowOfFour();
      moveDownCell();
      setCurrentColorsBoard([...currentColorsBoard]);
    }, 500);
    return () => clearInterval(timer);
  }, [checkColumnOfThree, checkColumnOfFour, checkRowOfThree, checkRowOfFour]);

  return (
    <div className="App">
      <div className="board">
        {currentColorsBoard.map((cellColor, i) => (
          <div
            key={i}
            className="cell"
            style={{ backgroundColor: cellColor }}
            data-id={i}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
