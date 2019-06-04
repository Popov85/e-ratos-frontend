import React from "react";
import ReactDOM from "react-dom";
import Start from "./src/Start";
import Batch from "./src/Batch";
import Finish from "./src/Finish";
import 'bootstrap/dist/css/bootstrap.min.css';

const testMode = {
    modeId: 1,
    name: "Mode #1",
    helpable: true,
    pyramid: false,
    skipable: true,
    rightAnswer: false,
    pauseable: true,
    preservable: true,
    reportable: true,
    starrable: true
}

const testResult = {
    user: "Andrey P.",
    scheme: "Scheme #1",
    passed: true,
    percent: 90,
    grade: 5,
    points: 3,
    resultPerTheme: [
        {
            themeDomain: {
                themeId: 1,
                name: "Theme #1"
            },
            quantity: 10,
            percent: 90
        }
    ],
    resultPerQuestion: []
}

let search = window.location.search;
let params = new URLSearchParams(search);
let schemeId = params.get('schemeId');

ReactDOM.render(<Start schemeId={schemeId}/>, document.getElementById('app'));
//ReactDOM.render(<Batch schemeId={10} scheme="Test scheme name" mode = {testMode}/>, document.getElementById('app'));
//ReactDOM.render(<Finish result={testResult}/>, document.getElementById('app'));