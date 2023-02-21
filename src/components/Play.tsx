import React from "react";
import Canva from "../layouts/Canva";
import "../style/play.css";
const Heart =
  "M10 3.22l-0.61-0.6c-0.983-0.931-2.314-1.504-3.779-1.504-3.038 0-5.5 2.462-5.5 5.5 0 1.462 0.571 2.791 1.501 3.776l-0.002-0.003 8.39 8.39 8.39-8.4c0.928-0.983 1.499-2.312 1.499-3.774 0-3.038-2.462-5.5-5.5-5.5-1.465 0-2.796 0.573-3.782 1.506l0.003-0.002-0.61 0.61";
const star =
  "M10 1.3l2.388 6.722h6.412l-5.232 3.948 1.871 6.928-5.439-4.154-5.438 4.154 1.87-6.928-5.233-3.948h6.412l2.389-6.722z";
export default function Play() {
  return (
    <div className="playContainer">
      <div className="leftContainer">
        <div className="hearts">
          <svg className="heartIcon">
            <g>
              <path d={Heart}></path>
            </g>
          </svg>
          <p>5</p>
          <span>|</span>
          <div className="levelLeft">305</div>
        </div>
        <div className="Moves">
          <p>17</p>
        </div>

        <div className="progress">
          <div className="value">
            <div className="valueBlock"></div>
            <div className="valueValue">50</div>
          </div>
          <div className="stars">
            <svg className="starIcon" id="star1" viewBox="0 0 23 23">
              <g>
                <path d={star}></path>
              </g>
            </svg>
            <svg className="starIcon" id="star2" viewBox="0 0 23 23">
              <g>
                <path d={star}></path>
              </g>
            </svg>
            <svg className="starIcon" id="star3" viewBox="0 0 23 23">
              <g>
                <path d={star}></path>
              </g>
            </svg>
          </div>

          <div className="progressBar">
            <div className="bar"></div>
            <p>1050</p>
          </div>
        </div>
      </div>

      <Canva />
    </div>
  );
}
