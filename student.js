import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import ErrorHandler from "./src/common/ErrorHandler";

ReactDOM.render(
    <ErrorHandler>
        <Router>
            <h1>Student page</h1>
        </Router>
    </ErrorHandler>, document.getElementById('app'));