import {combineReducers} from "redux";

import {regOptionsReducer} from "../../common/reducers/regOptionsReducer";
import {schemeInfoReducer} from "./SchemeInfoReducer";
import {sessionReducer} from "./sessionReducer";
import {logoutReducer} from "../../common/reducers/logoutReducer";
import {failureReducer} from "./failureReducer";
import {userReducer} from "../../common/reducers/userReducer";

const rootReducers = combineReducers({
    regOptions: regOptionsReducer,
    userInfo: userReducer,
    schemeInfo: schemeInfoReducer,
    session: sessionReducer,
    security: logoutReducer,
    failure: failureReducer
});

export default rootReducers;