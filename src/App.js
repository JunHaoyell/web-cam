import logo from "./logo.svg";
import "./App.css";
// App.jsx
import React from "react";
import CameraComponent from "./CameraComponent";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <h1>High Resolution Camera</h1>
      <CameraComponent />
    </div>
  );
};

export default App;
