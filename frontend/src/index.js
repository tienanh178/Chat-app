import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ChatProvider } from "./context/ChatProvider";
import { DrawerProvider } from "./context/DrawerProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <DrawerProvider>
        <App />
      </DrawerProvider>
    </ChatProvider>
  </BrowserRouter>
);
