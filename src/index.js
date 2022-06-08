import React from "react";
import ReactDOM from "react-dom";

import "./website/index.css";

import App from "./website/App";

import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Example from "./website/components/Example";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App />} />
                <Route path="example/:example" element={<Example />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

registerServiceWorker();
