import React, { useState, useEffect } from "react";
import "../style/pages/play.css";
import { user } from "../helper/mockdata";
import Canva1 from "../assets/Maps";
export default function Play() {
  const [playstarted, setplaystarted] = useState(false);

  const [levelStats, setLevelStats] = useState({
    score: 0,
    level: 0,
    previousscore: 0,
    previousstars: 0,
    stars: 0,
    firststar: 500,
    secondestar: 1000,
    moves: 16,
    bricks: 33,
    maxscore: 1200,
  });

  return (
    <div className="playContainer">
      {playstarted ? (
        <StartPlay levelStats={levelStats} setLevelStats={setLevelStats} />
      ) : (
        <Levels setplaystarted={setplaystarted} setLevelStats={setLevelStats} />
      )}
    </div>
  );
}
function ScoreTable({
  score,
  stars,
  level,
  firststar,
  moves,
  secondestar,
  bricks,
  maxscore,
}: {
  score: number;
  stars: number;
  level: number;
  firststar: number;
  secondestar: number;
  moves: number;
  bricks: number;
  maxscore: number;
}) {
  const Heart =
    "M10 3.22l-0.61-0.6c-0.983-0.931-2.314-1.504-3.779-1.504-3.038 0-5.5 2.462-5.5 5.5 0 1.462 0.571 2.791 1.501 3.776l-0.002-0.003 8.39 8.39 8.39-8.4c0.928-0.983 1.499-2.312 1.499-3.774 0-3.038-2.462-5.5-5.5-5.5-1.465 0-2.796 0.573-3.782 1.506l0.003-0.002-0.61 0.61";
  const star =
    "M10 1.3l2.388 6.722h6.412l-5.232 3.948 1.871 6.928-5.439-4.154-5.438 4.154 1.87-6.928-5.233-3.948h6.412l2.389-6.722z";
  useEffect(() => {
    console.log(firststar == score);
    console.log(firststar);
  }, [score]);

  return (
    <div className="leftContainer">
      <div className="hearts">
        <svg className="heartIcon">
          <g>
            <path d={Heart}></path>
          </g>
        </svg>
        <p>5</p>
        <span>|</span>
        <div className="levelLeft">{level}</div>
      </div>
      <div className="Moves">
        <p>{moves}</p>
      </div>

      <div className="progress">
        <div className="value">
          <div className="valueBlock"></div>
          <div className="valueValue">{bricks}</div>
        </div>
        <div className="stars">
          <svg
            className="starIcon"
            viewBox="0 0 18 18"
            style={{
              fill: firststar <= score ? "orange" : "gray",
              left: (firststar / maxscore) * 100 - 3 + "%",
            }}
          >
            <g>
              <path d={star}></path>
            </g>
          </svg>
          <svg
            className="starIcon"
            viewBox="0 0 18 18"
            style={{
              fill: secondestar <= score ? "orange" : "gray",
              left: (secondestar / maxscore) * 100 - 3 + "%",
            }}
          >
            <g>
              <path d={star}></path>
            </g>
          </svg>
          <svg
            className="starIcon"
            id="star3"
            viewBox="0 0 18 18"
            style={{
              fill: maxscore <= score ? "orange" : "gray",
              left: 92 + "%",
            }}
          >
            <g>
              <path d={star}></path>
            </g>
          </svg>
        </div>

        <div className="progressBar">
          <div
            className="bar"
            style={{
              width:
                (score / maxscore) * 100 < 100
                  ? (score / maxscore) * 100 + "%"
                  : 100 + "%",
            }}
          ></div>
          <p>{score}</p>
        </div>
      </div>
    </div>
  );
}

function Levels({
  setplaystarted,
  setLevelStats,
}: {
  setplaystarted: React.Dispatch<React.SetStateAction<boolean>>;
  setLevelStats: React.Dispatch<
    React.SetStateAction<{
      score: number;
      level: number;
      stars: number;
      firststar: number;
      previousscore: number;
      previousstars: number;
      secondestar: number;
      moves: number;
      bricks: number;
      maxscore: number;
    }>
  >;
}) {
  return (
    <div className="leveltable ">
      {user.levels.map((level, i) => (
        <div
          key={i}
          className="leveltable__level clickablelink"
          onClick={() => {
            setLevelStats({
              level: i + 1,
              previousscore: parseInt(level.score),
              previousstars: parseInt(level.stars),
              score: 0,
              stars: 0,
              firststar: parseInt(level.firststar),
              secondestar: parseInt(level.secondestar),
              moves: level.moves,
              bricks: level.bricks,
              maxscore: parseInt(level.maxscore),
            });
            setplaystarted(true);
          }}
        >
          <div className="leveltable__level__level">{i + 1}</div>
          <div className="flex flex-column">
            <Stars starnumber={parseInt(level.stars)} />
            <div className="leveltable__level__score">{level.score}</div>
          </div>
        </div>
      ))}
      <div
        className="leveltable__level present clickablelink"
        onClick={() => setplaystarted(true)}
      >
        {20}
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, co) => (
        <div className="leveltable__level notfinished" key={"level" + co}>
          {21 + i}
        </div>
      ))}
    </div>
  );
}
function Stars({ starnumber }: { starnumber: number }) {
  const star =
    "M10 1.3l2.388 6.722h6.412l-5.232 3.948 1.871 6.928-5.439-4.154-5.438 4.154 1.87-6.928-5.233-3.948h6.412l2.389-6.722z";

  return (
    <div className="leveltable__level__stars flex">
      {/* {[0, 1, 2].map((i) => (
        <svg
          viewBox="0 0 18 18"
          className="leveltable__level__star"
          style={i < starnumber ? { fill: "orange" } : { fill: "grey" }}
          key={i}
        >
          <g>
            <path d={star}></path>
          </g>
        </svg>
      ))} */}
      <svg
        viewBox="0 0 18 18"
        className="leveltable__level__star"
        style={0 < starnumber ? { fill: "orange" } : { fill: "grey" }}
      >
        <g>
          <path d={star}></path>
        </g>
      </svg>
      <svg
        viewBox="0 0 18 18"
        className="leveltable__level__star"
        style={1 < starnumber ? { fill: "orange" } : { fill: "grey" }}
      >
        <g>
          <path d={star}></path>
        </g>
      </svg>
      <svg
        viewBox="0 0 18 18"
        className="leveltable__level__star"
        style={2 < starnumber ? { fill: "orange" } : { fill: "grey" }}
      >
        <g>
          <path d={star}></path>
        </g>
      </svg>
    </div>
  );
}

function StartPlay({
  levelStats,
  setLevelStats,
}: {
  levelStats: {
    score: number;
    level: number;
    stars: number;
    previousscore: number;
    previousstars: number;
    firststar: number;
    secondestar: number;
    moves: number;
    bricks: number;
    maxscore: number;
  };
  setLevelStats: React.Dispatch<
    React.SetStateAction<{
      score: number;
      level: number;
      stars: number;
      firststar: number;
      previousscore: number;
      previousstars: number;
      secondestar: number;
      moves: number;
      bricks: number;
      maxscore: number;
    }>
  >;
}) {
  const updatescore = (score: number) => {
    setLevelStats((prev) => {
      return { ...prev, score: levelStats.score + score };
    });
  };
  const lowermoves = () => {
    setLevelStats((prev) => {
      return { ...prev, moves: prev.moves - 1 };
    });
  };
  const lowerbricks = (num: number) => {
    setLevelStats((prev) => {
      return { ...prev, bricks: num };
    });
  };
  // const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div className="startcontainer">
      <ScoreTable
        level={levelStats.level}
        score={levelStats.score}
        stars={levelStats.stars}
        firststar={levelStats.firststar}
        secondestar={levelStats.secondestar}
        moves={levelStats.moves}
        bricks={levelStats.bricks}
        maxscore={levelStats.maxscore}
      />

      <Canva1
        lowermoves={lowermoves}
        updatescore={updatescore}
        lowerbricks={lowerbricks}
      />
      {/* 
      <div className="canva">

      </div> */}
    </div>
  );
}
