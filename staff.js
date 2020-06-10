import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './main.css';
import ErrorHandler from "./src/common/components/ErrorHandler";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import StaffPortalContainer from "./src/staff/containers/StaffPortalContainer";
import staffReducers from "./src/staff/reducers/index";
import {dev} from "./src/profile";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store=createStore(staffReducers, composeEnhancers(applyMiddleware(thunk)));

console.log("Active profile dev = ", dev);

ReactDOM.render(
    <ErrorHandler>
        <Provider store={store}>
            <Router basename="/department">
                <StaffPortalContainer/>
            </Router>
        </Provider>
    </ErrorHandler>, document.getElementById('app'));
