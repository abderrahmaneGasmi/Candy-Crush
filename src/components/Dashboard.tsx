import React from "react";
import "../style/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
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
