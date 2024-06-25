import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {authReducer} from "../domains/common/reducers/authReducer";
import {registrationReducer} from "../domains/common/reducers/registrationReducer";
import sessionReducers from "../domains/session/reducers/sessionReducers";
import staffReducers from "../domains/staff/reducers/staffReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    session: sessionReducers,
    staff: staffReducers,
    form: formReducer
});

export default rootReducer;