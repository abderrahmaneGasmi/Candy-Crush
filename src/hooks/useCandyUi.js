import { useEffect, useState } from "react";
import { checkColumn, checkRow } from "../Functions/check";
import {
  changeCandyUi,
  permute,
  removeBackgroudBlack,
  removeChildern,
  testNeighbour,
} from "../Functions/helper";

const useCandyUi = (
  canvaBoard,
  setCanvaBoard,
  items,
  updateCanva,
  setUpdateCanva,
  canva
) => {
  const [operations, setOperations] = useState([]);

  const crushTest = () => {
    canvaBoard.forEach((element) => {
      checkPattern(element.id);
    });
  };

  const checkPattern = (id = 1) => {
    // canvaBoard.forEach((item) => {});
    let row = checkRow(canvaBoard, id);
    let column = checkColumn(canvaBoard, id);
    if (row) row.push(id);
    else if (column) column.push(id);
    if (row) {
      row.sort();
      // row.reverse();
    }

    if (column) {
      column.sort();
      // column.reverse();
    }
    // console.log(id);
    // console.log(column);
    // console.log(row);

    if (column) {
      column.forEach((item) => {
        slideCandy(item);
        console.log("\n column item is ", item);
      });
    }
    if (row) {
      row.forEach((item) => {
        slideCandy(item);
        console.log("\n row item is ", item);
      });
    }
  };

  const slideCandy = (id = 1) => {
    let row = Math.floor(id / 18);
    let column = id;
    let test = canvaBoard;

    while (row >= 0) {
      if (row == 0) {
        // let test = canvaBoard;
        let randomidx = Math.floor(Math.random() * 4);

        let newCandy = {
          name: items[randomidx].name,
          id: column,
          type: items[randomidx].type,
        };
        test[column] = newCandy;
        // removeChildern();
        setCanvaBoard(test);
        setUpdateCanva(Math.random() * 15555555);

        row--;
      } else {
        // let test = canvaBoard;
        let k = { name: test[column].name, type: test[column].type };
        // this is to only change the src and type and let the id of case is the same
        test[column].name = test[column - 18].name;
        test[column].type = test[column - 18].type;
        test[column - 18].name = k.name;
        test[column - 18].type = k.type;

        setCanvaBoard(test);

        row--;
        column -= 18;
      }
    }
  };

  useEffect(() => {
    if (canvaBoard === null || typeof canvaBoard == "undefined") return;
    removeChildern();
    for (let index = 0; index < canvaBoard.length; index++) {
      const element = canvaBoard[index];
      const img = document.createElement("img");
      img.className = "canvaBoard";
      img.src = element.name;

      img.addEventListener("click", () => {
        img.style.backgroundColor =
          img.style.backgroundColor == "rgba(0, 0, 0, 0.3)" ? "" : "#0000004d";

        // checkPattern(element.id);

        // slideCandy(element.id);
        setOperations((old) => [...old, element]);
      });
      canva.current.appendChild(img);
    }

    // setTimeout(crushTest(), 5000);
  }, [updateCanva]);

  // whene the user press onclick on item
  useEffect(() => {
    if (operations.length == 2) {
      if (changeCandyUi(operations[0].id, operations[1].id)) {
        setCanvaBoard(permute(canvaBoard, operations));
        setUpdateCanva(Math.random() * 112231123);
        setOperations([]);
      }
      setOperations([]);
    }

    // if (operations.length == 2) {
    //   console.log(testNeighbour(operations[0].id, operations[1].id));
    //   setOperations([]);
    else {
      if (operations.length == 1) {
        // checkPattern(operations[0].id);
        // checkPattern(operations[0].id);
        // slideCandy(operations[0].id);
        // setOperations([]);
      }
    }
  }, [operations]);
};
export default useCandyUi;
