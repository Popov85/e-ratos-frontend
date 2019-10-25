import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Portal from "./src/staff/components/Portal";
import ErrorHandler from "./src/common/ErrorHandler";

//const contextInfo = { user: "Andrey P.", email: "staff.staff@example.com", roles: ["ROLE_INSTRUCTOR"], position = "instructor", department = "Test department #1" }

ReactDOM.render(
    <ErrorHandler>
        <Router>
            <Portal/>
        </Router>
    </ErrorHandler>, document.getElementById('app'));
