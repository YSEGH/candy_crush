import { useEffect, useState } from "react";
import "./App.css";
import Score from "./Score";
import BgCandyCrush from "./images/bg-candycrush.jpeg";
import BlueCandy from "./images/blue-candy.png";
import OrangeCandy from "./images/orange-candy.png";
import GreenCandy from "./images/green-candy.png";
import PurpleCandy from "./images/purple-candy.png";
import RedCandy from "./images/red-candy.png";
import YellowCandy from "./images/yellow-candy.png";
import Blank from "./images/blank.png";

const width = 8;
const color = [
  BlueCandy,
  OrangeCandy,
  GreenCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

function App() {
  const [currentColorsBoard, setCurrentColorsBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [cellDragged, setCellDragged] = useState(null);
  const [cellReplaced, setCellReplaced] = useState(null);

  /**
   * Function qui créé le tableau
   */
  const createBoard = () => {
    const colorArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = color[Math.floor(Math.random() * color.length)];
      colorArray.push(randomColor);
    }
    setCurrentColorsBoard([...colorArray]);
  };

  /**
   * Fonction qui vérifie la présence d'une colone de 3 cases similaires
   * @returns
   */
  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnThree = [i, i + width, i + width * 2];
      const cellColor = currentColorsBoard[i];
      const isCellColor = cellColor !== Blank;
      if (
        isCellColor &&
        columnThree.every((square) => currentColorsBoard[square] === cellColor)
      ) {
        setScore((score) => score + 3);

        columnThree.forEach((square) => (currentColorsBoard[square] = Blank));
        return true;
      }
    }
  };

  /**
   * Fonction qui vérifie la présence d'une colone de 4 cases similaires
   * @returns
   */
  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3];
      const cellColor = currentColorsBoard[i];
      const isCellColor = cellColor !== Blank;

      if (
        isCellColor &&
        columnFour.every((square) => currentColorsBoard[square] === cellColor)
      ) {
        setScore((score) => score + 4);

        columnFour.forEach((square) => (currentColorsBoard[square] = Blank));
        return true;
      }
    }
  };

  /**
   * Fonction qui vérifie la présence d'une ligne de 3 cases similaires
   * @returns
   */
  const checkRowOfThree = () => {
    const invalidCell = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
    ];
    for (let i = 0; i < 64; i++) {
      if (!invalidCell.includes(i)) {
        const rowThree = [i, i + 1, i + 2];
        const cellColor = currentColorsBoard[i];
        const isCellColor = cellColor !== Blank;

        if (
          isCellColor &&
          rowThree.every((square) => currentColorsBoard[square] === cellColor)
        ) {
          setScore((score) => score + 3);
          rowThree.forEach((square) => (currentColorsBoard[square] = Blank));

          return true;
        }
      }
    }
  };

  /**
   * Fonction qui vérifie la présence d'une ligne de 4 cases similaires
   * @returns
   */
  const checkRowOfFour = () => {
    const invalidCell = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 61, 62, 63,
    ];
    for (let i = 0; i < 64; i++) {
      if (!invalidCell.includes(i)) {
        const rowFour = [i, i + 1, i + 2, i + 3];
        const cellColor = currentColorsBoard[i];
        const isCellColor = cellColor !== Blank;

        if (
          isCellColor &&
          rowFour.every((square) => currentColorsBoard[square] === cellColor)
        ) {
          setScore((score) => score + 4);
          rowFour.forEach((square) => (currentColorsBoard[square] = Blank));

          return true;
        }
      }
    }
  };

  /**
   * Fonction qui élimine les cases vides
   * @returns
   */
  const moveDownCell = () => {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i < 64 - width; i++) {
      if (firstRow.includes(i) && currentColorsBoard[i] === Blank) {
        currentColorsBoard[i] = color[Math.floor(Math.random() * color.length)];
      }

      if (currentColorsBoard[i + width] === Blank) {
        currentColorsBoard[i + width] = currentColorsBoard[i];
        currentColorsBoard[i] = Blank;
      }
    }
  };

  /**
   * Fonction qui définit la case qui va être déplacée
   * @param {HTMLElement} target
   */
  const onDragStartHandler = (target) => {
    setCellDragged(target);
  };
  /**
   * Fonction qui définit la case qui va être remplacée
   * @param {HTMLElement} target
   */
  const onDropHandler = (target) => {
    setCellReplaced(target);
  };
  /**
   * Fonction qui vérifie la possibilité de déplacer la case et qui va ensuite interchanger les cases
   * @returns
   */
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
      currentColorsBoard[cellDraggedId] = cellReplaced.getAttribute("src");
      currentColorsBoard[cellReplacedId] = cellDragged.getAttribute("src");

      const isColumnOfFour = checkColumnOfFour();
      const isColumnOfThree = checkColumnOfThree();
      const isRowOfFour = checkRowOfFour();
      const isRowOfThree = checkRowOfThree();

      if (isColumnOfThree || isColumnOfFour || isRowOfThree || isRowOfFour) {
        setCellDragged(null);
        setCellReplaced(null);
      } else {
        currentColorsBoard[cellReplacedId] = cellReplaced.getAttribute("src");
        currentColorsBoard[cellDraggedId] = cellDragged.getAttribute("src");
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
    <div className="App" style={{ backgroundImage: `url(${BgCandyCrush})` }}>
      <div className="board">
        {currentColorsBoard.map((cellColor, i) => (
          <img
            key={i}
            className="cell"
            src={cellColor}
            style={{ cursor: "pointer" }}
            data-id={i}
            draggable={true}
            onDragStart={(e) => onDragStartHandler(e.target)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={(e) => onDropHandler(e.target)}
            onDragEnd={(e) => onDragEndHandler(e.target)}
          />
        ))}
      </div>
      <Score score={score} />
    </div>
  );
}

export default App;
