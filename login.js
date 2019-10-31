import React from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginContainer from "./src/common/containers/LoginContainer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ErrorHandler from "./src/common/ErrorHandler";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {regOptionsReducer} from "./src/common/reducers/regOptionsReducer";
import {loginReducer} from "./src/common/reducers/loginReducer";
import {reducer as formReducer} from 'redux-form';
import {registrationReducer} from "./src/common/reducers/registrationReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
    <ErrorHandler>
        <Provider store={createStore(combineReducers({
            registration: registrationReducer,
            regOptions: regOptionsReducer,
            security: loginReducer,
            form: formReducer
        }), composeEnhancers(applyMiddleware(thunk)))}>
            <LoginContainer/>,
        </Provider>
    </ErrorHandler>,
    document.getElementById('app'));