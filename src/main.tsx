import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BreweryProvider } from "./BreweryContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BreweryProvider>
            <App />
        </BreweryProvider>
    </React.StrictMode>
);
