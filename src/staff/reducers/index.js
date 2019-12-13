import {combineReducers} from "redux";

import {logoutReducer} from "../../common/reducers/logoutReducer";
import {userReducer} from "../../common/reducers/userReducer";
import {usersReducer} from "./usersReducer";
import {positionsReducer} from "./positionsReducer";

import {reducer as formReducer} from 'redux-form';
import {userEditReducer} from "./userEditReducer";
import {resultsReducer} from "./resultsReducer";
import {coursesReducer} from "./coursesReducer";
import {schemesReducer} from "./schemesReducer";
import {affiliationSelectorCacheableReducer} from "./affiliationSelectorCacheableReducer";
import {affiliationSelectorReducer} from "./affiliationSelectorReducer";
import {profileReducer} from "../../common/reducers/profileReducer";

const staffReducers = combineReducers({
    form: formReducer,
    userInfo: userReducer,
    profile: profileReducer,
    security: logoutReducer,
    users: usersReducer,
    positions: positionsReducer,
    userEdit: userEditReducer,
    results: resultsReducer,
    courses: coursesReducer,
    schemes: schemesReducer,
    affiliationSelector: affiliationSelectorReducer,
    affiliationSelectorCacheable: affiliationSelectorCacheableReducer
});

export default staffReducers;