import { combineReducers } from "@reduxjs/toolkit";
import {FormStateMap, reducer as formReducer} from "redux-form";
import {authReducer, AuthState} from "../domains/common/reducers/authReducer";
import {registrationReducer, RegistrationState} from "../domains/common/reducers/registrationReducer";
import sessionReducers, {RootSessionState} from "../domains/session/reducers/sessionReducers";
import staffReducers, {RootStaffState} from "../domains/staff/reducers/staffReducers";

export type RootState = {
    auth: AuthState;
    registration: RegistrationState;
    session: RootSessionState;
    staff: RootStaffState;
    form: FormStateMap;
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    registration: registrationReducer,
    session: sessionReducers,
    staff: staffReducers,
    form: formReducer
});

export default rootReducer;