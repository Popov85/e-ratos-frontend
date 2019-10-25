import {combineReducers} from "redux";

import {panelInfoReducer} from "./panelInfoReducer";
import {schemeInfoReducer} from "./SchemeInfoReducer";
import {failureReducer} from "./failureReducer";
import {logoutReducer} from "./logoutReducer";
import {sessionReducer} from "./sessionReducer";

const rootReducers = combineReducers({
    panelInfo: panelInfoReducer,
    schemeInfo: schemeInfoReducer,
    session: sessionReducer,
    logout: logoutReducer,
    failure: failureReducer
});

export default rootReducers;