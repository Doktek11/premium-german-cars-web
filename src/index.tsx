import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("NO SE ENCUENTRA #root");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div style={{ color: "white", padding: 40, fontSize: 24 }}>
      REACT FUNCIONA
    </div>
  </React.StrictMode>
);
