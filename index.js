import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './main.css';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./src/store/configureStore";
import AppContainer from "./src/domains/common/containers/AppContainer";
import ErrorHandler from "./src/domains/common/components/ErrorHandler";

const profile = process.env.E_RATOS_PROFILE;

console.log("Active profile = ", profile);

const App = profile === "dev" ? (
    <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
) : (
    <ErrorHandler>
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    </ErrorHandler>
);

ReactDOM.render(App, document.getElementById('app'));