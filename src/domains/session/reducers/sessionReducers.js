import {combineReducers} from "redux";
import {sessionReducer} from "./sessionReducer";
import {failureReducer} from "./failureReducer";
import {schemeInfoReducer} from "./schemeInfoReducer";

const sessionReducers = combineReducers({
    schemeInfo: schemeInfoReducer,
    session: sessionReducer,
    failure: failureReducer
});

export default sessionReducers;
