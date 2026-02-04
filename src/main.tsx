import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./backup/App_backup";
import App from "./App";
import "./index.css";
import "@fontsource/pretendard/400.css";
import "@fontsource/pretendard/500.css";
import "@fontsource/pretendard/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
