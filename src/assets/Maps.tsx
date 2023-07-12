import React, { useEffect, useState } from "react";
import "../style/assets/maps.css";
export default function Canva1() {
  const [selectedcandies, setSelectedcandies] = useState<
    Array<React.RefObject<HTMLDivElement>>
  >([]);

  const addcandy = (ref: React.RefObject<HTMLDivElement>) => {
    setSelectedcandies((old) => [...old, ref]);
  };

  useEffect(() => {
    if (selectedcandies.length == 2) {
      console.log(selectedcandies);

      //   console.log(
      //     Math.abs(
      //       (selectedcandies[0].current?.offsetTop || 10) -
      //         (selectedcandies[1].current?.offsetTop || 10)
      //     )
      //   );
      //   console.log(selectedcandies[0].current?.offsetHeight || 10);
      if (
        Math.abs(
          (selectedcandies[0].current?.offsetTop || 10) -
            (selectedcandies[1].current?.offsetTop || 10)
        ) -
          2 ==
          (selectedcandies[0].current?.offsetHeight || 10) ||
        Math.abs(
          (selectedcandies[0].current?.offsetLeft || 10) -
            (selectedcandies[1].current?.offsetLeft || 10)
        ) == selectedcandies[0].current?.offsetWidth
      )
        console.log("adjacent");
    }
  }, [selectedcandies]);

  return (
    <div className="canva1 flex flex-column">
      <div className="canva1__firstrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, co) => (
          <Box addcandy={addcandy} key={"first" + co} />
        ))}
      </div>
      <div className="canva1__secondrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 2, 3, 5, 6, 8, 7].map((i, co) => (
          <Box addcandy={addcandy} key={"second" + co} />
        ))}
      </div>
      <div className="canva1__secondrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 2, 3, 5, 6, 8, 7].map((i, co) => (
          <Box addcandy={addcandy} key={"second0" + co} />
        ))}
      </div>
      <div className="canva1__secondrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 2, 3, 5, 6, 8, 7].map((i, co) => (
          <Box addcandy={addcandy} key={"second1" + co} />
        ))}
      </div>
      <div className="canva1__secondrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 2, 3, 5, 6, 8, 7].map((i, co) => (
          <Box addcandy={addcandy} key={"second2" + co} />
        ))}
      </div>
      <div className="canva1__secondrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 2, 3, 5, 6, 8, 7].map((i, co) => (
          <Box addcandy={addcandy} key={"second3" + co} />
        ))}
      </div>
      <div className="canva1__secondrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 2, 3, 5, 6, 8, 7].map((i, co) => (
          <Box addcandy={addcandy} key={"second4" + co} />
        ))}
      </div>
      <div className="canva1__thirdrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 6, 3, 5, 9, 5, 5].map((i, co) => (
          <Box addcandy={addcandy} key={"third" + co} />
        ))}
      </div>
      <div className="canva1__forthrow flex row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, co) => (
          <Box addcandy={addcandy} key={"forth" + co} />
        ))}
      </div>
    </div>
  );
}
function Box({
  addcandy,
}: {
  addcandy: (ref: React.RefObject<HTMLDivElement>) => void;
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
      className="box clickablelink"
      ref={ref}
      onClick={() => {
        if (ref.current) ref.current.style.background = "rgba(0, 0, 0, 0.597)";
        addcandy(ref);
      }}
    >
      <img src={candy} alt="" />
    </div>
  );
}
