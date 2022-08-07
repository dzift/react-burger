import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./components/app/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./services/store";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
export const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router>
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <App />
        </Provider>
      </DndProvider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
