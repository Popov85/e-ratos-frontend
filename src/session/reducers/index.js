import {combineReducers} from "redux";

import {regOptionsReducer} from "../../common/reducers/regOptionsReducer";
import {panelInfoReducer} from "./panelInfoReducer";
import {schemeInfoReducer} from "./SchemeInfoReducer";
import {sessionReducer} from "./sessionReducer";
import {logoutReducer} from "../../common/reducers/logoutReducer";
import {failureReducer} from "./failureReducer";

const rootReducers = combineReducers({
    regOptions: regOptionsReducer,
    panelInfo: panelInfoReducer,
    schemeInfo: schemeInfoReducer,
    session: sessionReducer,
    security: logoutReducer,
    failure: failureReducer
});

export default rootReducers;