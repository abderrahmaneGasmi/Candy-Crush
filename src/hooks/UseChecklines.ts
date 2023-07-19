import React, { useState } from "react";
import { checkpattern } from "../helper/functions";

export default function UseChecklines() {
  const [candies, setCandies] = useState<Array<HTMLImageElement>>(
    document.querySelectorAll("img.candy") as unknown as Array<HTMLImageElement>
  );

  const checkcanvaBoard = () => {
    let canvaBoard = [] as HTMLImageElement[];
    for (let i = 0; i < candies.length; i++) {
      canvaBoard.push(candies[i]);
    }
    for (let i = 0; i < canvaBoard.length; i++) {
      const element = canvaBoard[i];
      let res = checkpattern(canvaBoard, i);
      if (res) {
        console.log(res);
        break;
      }
    }

    return canvaBoard;
  };
}
