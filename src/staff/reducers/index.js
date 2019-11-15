import {combineReducers} from "redux";

import {logoutReducer} from "../../common/reducers/logoutReducer";
import {userReducer} from "../../common/reducers/userReducer";
import {usersReducer} from "./usersReducer";
import {positionsReducer} from "./positionsReducer";

import {reducer as formReducer} from 'redux-form';
import {userEditReducer} from "./userEditReducer";

const staffReducers = combineReducers({
    form: formReducer,
    userInfo: userReducer,
    security: logoutReducer,
    users: usersReducer,
    positions: positionsReducer,
    userEdit: userEditReducer
});

export default staffReducers;