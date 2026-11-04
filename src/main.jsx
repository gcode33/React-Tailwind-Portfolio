import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import App from "./App.jsx";
import "./index.css";

// LazyMotion keeps the bundle small. reducedMotion="user" makes every Motion animation
// respect the visitor's operating system setting.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </React.StrictMode>
);
