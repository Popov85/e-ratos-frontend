import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './main.css';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./src/store/configureStore";
import ErrorHandler from "./src/domains/common/components/ErrorHandler";
import App from "./src/domains/common/components/App";

const profile = process.env.E_RATOS_PROFILE;

console.log("Active profile = ", profile);

const Application = profile === "dev" ? (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
) : (
    <ErrorHandler>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ErrorHandler>
);

ReactDOM.render(Application, document.getElementById('app'));