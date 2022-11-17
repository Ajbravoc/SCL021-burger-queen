import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from "./routes/loginView";

import SignOutView from "./routes/signOutView";
import OrderFoodView from "./routes/orderFoodView";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <BrowserRouter>
   <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="order" element={<OrderFoodView />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
