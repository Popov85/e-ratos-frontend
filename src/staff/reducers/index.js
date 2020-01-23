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
import {reportOnContentReducer} from "./reportOnContentReducer";
import {reportOnResultsReducer} from "./reportOnResultsReducer";
import {organisationsReducer} from "./organisationsReducer";
import {orgEditReducer} from "./orgEditReducer";
import {facultiesReducer} from "./facultiesReducer";
import {departmentsReducer} from "./departmentsReducer";
import {facEditReducer} from "./facEditReducer";
import {depEditReducer} from "./depEditReducer";
import {courseEditReducer} from "./courseEditReducer";
import {lmsReducer} from "./lmsReducer";
import {accessReducer} from "./accessReducer";

const staffReducers = combineReducers({
    form: formReducer,
    userInfo: userReducer,
    profile: profileReducer,
    security: logoutReducer,
    users: usersReducer,
    organisations: organisationsReducer,
    faculties: facultiesReducer,
    departments: departmentsReducer,
    positions: positionsReducer,
    userEdit: userEditReducer,
    results: resultsReducer,
    courses: coursesReducer,
    schemes: schemesReducer,
    lms: lmsReducer,
    access: accessReducer,
    affiliationSelector: affiliationSelectorReducer,
    affiliationSelectorCacheable: affiliationSelectorCacheableReducer,
    reportOnContent: reportOnContentReducer,
    reportOnResults: reportOnResultsReducer,
    orgEdit: orgEditReducer,
    facEdit: facEditReducer,
    depEdit: depEditReducer,
    courseEdit: courseEditReducer
});

export default staffReducers;