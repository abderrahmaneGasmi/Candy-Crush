import React, { useEffect, useState } from "react";
import "../style/assets/maps.css";
import { animated } from "@react-spring/web";
import {
  checkpattern,
  fetchnewcandies,
  getimages,
  shuffleArray,
} from "../helper/functions";

export default function Canva1({
  lowermoves,
  updatescore,
  lowerbricks,
}: {
  updatescore: (score: number) => void;
  lowermoves: () => void;
  lowerbricks: (num: number) => void;
}) {
  const [selectedcandies, setSelectedcandies] = useState<
    Array<React.RefObject<HTMLDivElement>>
  >([]);
  // const [candies, setCandies] = useState<Array<HTMLDivElement>>(
  //   [] as Array<HTMLDivElement>
  // );
  const [checkboard, setCheckboard] = useState(1);
  const boof = React.createRef<HTMLDivElement>();
  const [boardischanging, setBoardischanging] = useState(false);
  const checkcanvaBoard = () => {
    let candies = document.querySelectorAll(
      "div.box"
    ) as unknown as Array<HTMLDivElement>;
    if (candies.length == 0) return;
    for (let i = 0; i < candies.length; i++) {
      let res = checkpattern(candies, i);
      if (res) {
        if (res.data.length > 2) {
          setBoardischanging(true);
          // console.log(getimages(res.data));
          if (res.type == "row") {
            updatescore(res.data.length * 10);
          }
          if (res.type == "column") {
            updatescore(res.data.length * 10);
          }
          if (res.type == "both") {
            updatescore(res.data.length * 20);
          }
          let newcandies = fetchnewcandies(res.data.length);
          // console.log(getimages(newcandies));
          res.data.forEach((item, idx) => {
            if (item) {
              // item.classList.add("selected");
              let bomb = document.createElement("img");
              bomb.src = "./boof.png";
              bomb.classList.add("bomb");
              bomb.classList.add("bombeffect");

              bomb.style.position = "absolute";

              // setTimeout(() => {
              //   // item.replaceChildren(newcandies[idx]);
              //   item.innerHTML = "";
              //   item.classList.remove("selected");
              //   item.appendChild(newcandies[idx]);
              //   // checkcanvaBoard();
              //   setCheckboard((old) => old + 1);
              // }, 500);

              item.appendChild(bomb);
            }
            // item.appendChild
          });
          setTimeout(() => {
            changeui(res.data, newcandies);
            setBoardischanging(false);
            // lowermoves();
            setSelectedcandies([]);
          }, 1000);
          // if (boof.current) {
          //   if (res.type == "row") {
          //     boof.current.style.top = res.data[0].offsetTop + "px";
          //     boof.current.style.left = res.data[0].offsetLeft + "px";
          //     boof.current.style.width =
          //       res.data[0].offsetWidth * res.data.length + "px";
          //     boof.current.style.height = res.data[0].offsetHeight + "px";
          //   }
          // }
          break;
        }
      }
    }
    // setCandies(
    //   document.querySelectorAll("div.box") as unknown as Array<HTMLDivElement>
    // );
  };

  const changeui = (
    boxes: Array<HTMLDivElement>,
    newboxes: Array<HTMLDivElement>
  ) => {
    boxes.forEach((item, i) => {
      item.classList.remove("unbracked");
      item.innerHTML = "";
      item.classList.remove("selected");
      item.appendChild(newboxes[i]);
      setCheckboard((old) => old + 1);
    });
  };
  const addcandy = (ref: React.RefObject<HTMLDivElement>) => {
    setSelectedcandies((old) => [...old, ref]);
  };

  // useEffect(() => {
  //   setCandies(
  //     document.querySelectorAll("div.box") as unknown as Array<HTMLDivElement>
  //   );
  //   console.log(
  //     getimages(
  //       document.querySelectorAll("div.box") as unknown as Array<HTMLDivElement>
  //     )
  //   );
  // }, []);

  useEffect(() => {
    // if (candies.length == 0) return;
    checkcanvaBoard();
    lowerbricks(document.querySelectorAll("div.unbracked").length);
  }, [checkboard]);

  useEffect(() => {
    if (selectedcandies.length == 2) {
      if (
        selectedcandies[0].current == null ||
        selectedcandies[1].current == null
      ) {
        return;
      }
      if (
        !selectedcandies[0].current.classList.contains("selected") ||
        !selectedcandies[1].current.classList.contains("selected")
      ) {
        console.log("not selected");
        return;
      }
      if (
        Math.abs(
          selectedcandies[0].current.offsetTop -
            selectedcandies[1].current.offsetTop
        ) >
          selectedcandies[0].current.offsetHeight + 10 ||
        Math.abs(
          selectedcandies[0].current.offsetLeft -
            selectedcandies[1].current.offsetLeft
        ) >
          selectedcandies[0].current.offsetWidth + 10
      ) {
        selectedcandies[0].current?.classList.remove("selected");
        selectedcandies[1].current?.classList.remove("selected");
        setSelectedcandies([]);
        console.log("not near");
        return;
      }
      let candy1 = selectedcandies[0].current.firstChild as HTMLImageElement;
      let candy2 = selectedcandies[1].current.firstChild as HTMLImageElement;
      let candy1image = candy1?.src;
      let candy2image = candy2?.src;
      if (candy1image == candy2image) {
        selectedcandies[0].current?.classList.remove("selected");
        selectedcandies[1].current?.classList.remove("selected");
        setSelectedcandies([]);
        console.log("same");
        return;
      }
      if (
        (Math.abs(
          selectedcandies[0].current?.offsetTop -
            selectedcandies[1].current?.offsetTop
        ) -
          selectedcandies[0].current?.offsetHeight -
          5 <
          0 &&
          selectedcandies[0].current?.offsetLeft ==
            selectedcandies[1].current?.offsetLeft) ||
        (Math.abs(
          selectedcandies[0].current?.offsetLeft -
            selectedcandies[1].current?.offsetLeft
        ) == selectedcandies[0].current?.offsetWidth &&
          selectedcandies[0].current?.offsetTop ==
            selectedcandies[1].current?.offsetTop)
      ) {
        let first = selectedcandies[0].current.firstChild as HTMLImageElement;
        const temp = first.src;

        let second = selectedcandies[1].current.firstChild as HTMLImageElement;
        first.src = second.src;
        second.src = temp;
        selectedcandies[0].current?.classList.remove("selected");
        selectedcandies[1].current?.classList.remove("selected");
        setSelectedcandies([]);
        lowermoves();
        setCheckboard((old) => old + 1);
      } else {
        console.log("not swap");
        selectedcandies[0].current?.classList.remove("selected");
        selectedcandies[1].current?.classList.remove("selected");
        setSelectedcandies([]);
      }
    }
  }, [selectedcandies]);
  const seletedcandies = React.useRef(shuffleArray(112).slice(0, 28));
  return (
    <div className="canva1 ">
      {/* <img
        src="./boof.png"
        style={{ position: "absolute" }}
        alt=""
        ref={boof}
      /> */}

      {Array.from({ length: 112 }, (v, i) => (
        <Box
          addcandy={addcandy}
          key={i}
          number={i}
          boardischanging={boardischanging}
          seletedcandies={seletedcandies.current}
        />
      ))}
    </div>
  );
}
function Box({
  addcandy,
  number,
  boardischanging,
  seletedcandies,
}: {
  addcandy: (ref: React.RefObject<HTMLDivElement>) => void;
  number: number;
  boardischanging: boolean;
  seletedcandies: number[];
}) {
  const candies = [
    "./blue candy.png",
    "./green candy.png",
    "./red candy.png",
    "./purple candy.png",
  ];
  const [candy, setcandy] = useState(candies[Math.floor(Math.random() * 4)]);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className={`box clickablelink ${
        seletedcandies.includes(number) ? "unbracked" : ""
      }`}
      ref={ref}
      onClick={() => {
        if (ref.current && !boardischanging)
          ref.current.classList.add("selected");
        addcandy(ref);
      }}
    >
      <img src={candy} alt={number + ""} />
    </div>
  );
}
