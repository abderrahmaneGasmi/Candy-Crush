import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/pages/home.css";
export default function Home() {
  const navigate = useNavigate();

  const goTo = () => {
    console.log("first");
    navigate("/play");
  };
  return (
    <div id="dashboardContainer">
      <div onClick={goTo} id="dashboardbtn">
        start
      </div>
    </div>
  );
}
