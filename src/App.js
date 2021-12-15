import "./App.css";
import Score from "./Score";
import { useEffect, useState } from "react";

const width = 8;
const color = ["red", "green", "yellow", "blue", "violet", "pink"];

function App() {
  const [currentColorsBoard, setCurrentColorsBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [cellDragged, setCellDragged] = useState(null);
  const [cellReplaced, setCellReplaced] = useState(null);

  const createBoard = () => {
    const colorArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = color[Math.floor(Math.random() * color.length)];
      colorArray.push(randomColor);
    }
    setCurrentColorsBoard([...colorArray]);
  };

  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnThree = [i, i + width, i + width * 2];
      const cellColor = currentColorsBoard[i];
      if (
        columnThree.every(
          (square) =>
            currentColorsBoard[square] === cellColor && cellColor !== ""
        )
      ) {
        setScore((score) => score + 3);

        columnThree.forEach((square) => (currentColorsBoard[square] = ""));
        return true;
      }
    }
  };

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3];
      const cellColor = currentColorsBoard[i];
      if (
        columnFour.every(
          (square) =>
            currentColorsBoard[square] === cellColor && cellColor !== ""
        )
      ) {
        setScore((score) => score + 4);

        columnFour.forEach((square) => (currentColorsBoard[square] = ""));
        return true;
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
          rowThree.every(
            (square) =>
              currentColorsBoard[square] === cellColor && cellColor !== ""
          )
        ) {
          setScore((score) => score + 3);
          rowThree.forEach((square) => (currentColorsBoard[square] = ""));

          return true;
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
          rowFour.every(
            (square) =>
              currentColorsBoard[square] === cellColor && cellColor !== ""
          )
        ) {
          setScore((score) => score + 4);
          rowFour.forEach((square) => (currentColorsBoard[square] = ""));

          return true;
        }
      }
    }
  };

  console.log(score);

  const moveDownCell = () => {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i < 64 - width; i++) {
      if (firstRow.includes(i) && currentColorsBoard[i] === "") {
        currentColorsBoard[i] = color[Math.floor(Math.random() * color.length)];
      }

      if (currentColorsBoard[i + width] === "") {
        currentColorsBoard[i + width] = currentColorsBoard[i];
        currentColorsBoard[i] = "";
      }
    }
  };

  const onDragStartHandler = (target) => {
    setCellDragged(target);
  };
  const onDropHandler = (target) => {
    setCellReplaced(target);
  };
  const onDragEndHandler = () => {
    const cellDraggedId = parseInt(cellDragged.getAttribute("data-id"));
    const cellReplacedId = parseInt(cellReplaced.getAttribute("data-id"));

    const validMove = [
      cellDraggedId + width,
      cellDraggedId - width,
      cellDraggedId + 1,
      cellDraggedId - 1,
    ];

    const isValidMove = validMove.includes(cellReplacedId);

    if (isValidMove) {
      currentColorsBoard[cellDraggedId] = cellReplaced.style.backgroundColor;
      currentColorsBoard[cellReplacedId] = cellDragged.style.backgroundColor;

      const isColumnOfFour = checkColumnOfFour();
      const isColumnOfThree = checkColumnOfThree();
      const isRowOfFour = checkRowOfFour();
      const isRowOfThree = checkRowOfThree();

      if (isColumnOfThree || isColumnOfFour || isRowOfThree || isRowOfFour) {
        setCellDragged(null);
        setCellReplaced(null);
      } else {
        currentColorsBoard[cellReplacedId] = cellReplaced.style.backgroundColor;
        currentColorsBoard[cellDraggedId] = cellDragged.style.backgroundColor;
        setCurrentColorsBoard([...currentColorsBoard]);
      }
    }
  };

  useEffect(() => {
    createBoard();
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour();
      checkRowOfFour();
      checkColumnOfThree();
      checkRowOfThree();
      moveDownCell();
      setCurrentColorsBoard([...currentColorsBoard]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkColumnOfThree,
    checkColumnOfFour,
    checkRowOfThree,
    checkRowOfFour,
    moveDownCell,
    currentColorsBoard,
  ]);

  return (
    <div className="App">
      <div className="board">
        {currentColorsBoard.map((cellColor, i) => (
          <div
            key={i}
            className="cell"
            style={{ backgroundColor: cellColor, cursor: "pointer" }}
            data-id={i}
            draggable={true}
            onDragStart={(e) => onDragStartHandler(e.target)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={(e) => onDropHandler(e.target)}
            onDragEnd={(e) => onDragEndHandler(e.target)}
          ></div>
        ))}
      </div>
      <Score score={score} />
    </div>
  );
}

export default App;
