import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Play from "./components/Play";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </>
  );
}

export default App;
