import React, { useEffect, useRef, useState } from "react";
import { checkColumn, checkRow } from "../Functions/check";
import useCandyUi from "../hooks/useCandyUi";
import { changeCandyUi, removeChildern } from "../Functions/helper";
import "../style/canva.css";
export default function Canva() {
  const [canvaBoard, setCanvaBoard] = useState([]);
  const [updateCanva, setUpdateCanva] = useState(0);
  const [items, setItems] = useState([
    { name: "./candy-public/blue candy.png", id: 1, type: 1 },
    { name: "./candy-public/red candy.png", id: 1, type: 2 },
    { name: "./candy-public/green candy.png", id: 1, type: 3 },
    { name: "./candy-public/purple candy.png", id: 1, type: 4 },
  ]);
  const canva = useRef(null);

  useCandyUi(
    canvaBoard,
    setCanvaBoard,
    items,
    updateCanva,
    setUpdateCanva,
    canva
  );

  //   initilaze the board
  useEffect(() => {
    for (let i = 0; i < 162; i++) {
      let randomidx = Math.floor(Math.random() * 4);
      setCanvaBoard((old) => [
        ...old,
        { name: items[randomidx].name, id: i, type: items[randomidx].type },
      ]);
    }
    setUpdateCanva(Math.random() * 15000);
  }, []);

  // crate the ui elements

  return <div className="canvaContainer" ref={canva}></div>;
}
