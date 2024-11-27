import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ViagemProvider } from "./context/viagemContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ViagemProvider>
      <App />
    </ViagemProvider>
  </React.StrictMode>
);
