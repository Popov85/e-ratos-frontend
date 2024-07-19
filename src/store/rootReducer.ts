import {combineReducers} from "redux";
// @ts-ignore
import {reducer as formReducer} from "redux-form";
import {authReducer, AuthState} from "../domains/common/reducers/authReducer";
import {registrationReducer, RegistrationState} from "../domains/common/reducers/registrationReducer";
// @ts-ignore
import sessionReducers from "../domains/session/reducers/sessionReducers";
// @ts-ignore
import staffReducers from "../domains/staff/reducers/staffReducers";


export type RootState = {
    auth: AuthState;
    registration: RegistrationState;
    session: any;//TODO
    staff: any;//TODO
    form: any; // TODO redux-form doesn't provide types out of the box
}


const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    registration: registrationReducer,
    session: sessionReducers,
    staff: staffReducers,
    form: formReducer
});

export default rootReducer;