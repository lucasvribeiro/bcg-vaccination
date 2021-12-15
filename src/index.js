import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

import InitialPage from "./pages/InitialPage/InitialPage.jsx";
import MapVisualization from "./pages/MapVisualization/MapVisualization.jsx";

import "./index.css";
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialPage />} />
          <Route path="initial" element={<InitialPage />} />
          <Route path="map/:uf/:year" element={<MapVisualization />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
