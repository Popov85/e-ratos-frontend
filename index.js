import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./src/common/components/Welcome";
import 'bootstrap/dist/css/bootstrap.min.css';

import './main.css';
import {dev} from "./src/profile";

console.log("Active profile dev = ", dev);

ReactDOM.render(<Welcome/>, document.getElementById('app'));