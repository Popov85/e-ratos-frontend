import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import ErrorHandler from "./src/common/components/ErrorHandler";
import {dev} from "./src/profile";

console.log("Active profile dev = ", dev);

ReactDOM.render(
    <ErrorHandler>
        <Router>
            <h1>Student page</h1>
        </Router>
    </ErrorHandler>, document.getElementById('app'));