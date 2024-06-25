import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {positionsReducer} from "./positionsReducer";

import {reducer as formReducer} from 'redux-form';
import {userEditReducer} from "./userEditReducer";
import {resultsReducer} from "./resultsReducer";
import {resultDetailsReducer} from "./resultDetailsReducer";
import {coursesReducer} from "./coursesReducer";
import {themesReducer} from "./themesReducer";
import {schemesReducer} from "./schemesReducer";
import {affiliationSelectorCacheableReducer} from "./affiliationSelectorCacheableReducer";
import {affiliationSelectorReducer} from "./affiliationSelectorReducer";
import {profileReducer} from "./profileReducer";
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
import {themeEditReducer} from "./themeEditReducer";
import {lmsEditReducer} from "./lmsEditReducer";
import {ltiVersionsReducer} from "./ltiVersionsReducer";
import {questionsMcqReducer} from "./questionsMcqReducer";
import {questionMcqEditReducer} from "./questionMcqEditReducer";
import {resourcesReducer} from "./resourcesReducer";
import {resourceEditReducer} from "./resourceEditReducer";
import {helpsReducer} from "./helpsReducer";
import {helpEditReducer} from "./helpEditReducer";
import {schemeEditReducer} from "./schemeEditReducer";
import {strategyReducer} from "./strategyReducer";
import {settingsReducer} from "./settingsReducer";
import {modesReducer} from "./modesReducer";
import {optionsReducer} from "./optionsReducer";
import {gradingReducer} from "./gradingReducer";
import {gradingTwoPointReducer} from "./gradingTwoPointReducer";
import {gradingFourPointReducer} from "./gradingFourPointReducer";
import {gradingFreePointReducer} from "./gradingFreePointReducer";
import {themesSupportReducer} from "./themesSupportReducer";
import {modeEditReducer} from "./modeEditReducer";
import {settingsEditReducer} from "./settingsEditReducer";

const staffReducers = combineReducers({
    form: formReducer,
    profile: profileReducer,
    users: usersReducer,
    organisations: organisationsReducer,
    faculties: facultiesReducer,
    departments: departmentsReducer,
    positions: positionsReducer,
    ltiVersions: ltiVersionsReducer,
    userEdit: userEditReducer,
    results: resultsReducer,
    resultDetails: resultDetailsReducer,
    courses: coursesReducer,
    themes: themesReducer,
    themesSupport: themesSupportReducer,
    schemes: schemesReducer,
    resources: resourcesReducer,
    helps:helpsReducer,
    lms: lmsReducer,
    access: accessReducer,
    strategy: strategyReducer,
    settings: settingsReducer,
    modes: modesReducer,
    options:optionsReducer,
    gradings:gradingReducer,
    gradingsTwoPoint: gradingTwoPointReducer,
    gradingsFourPoint: gradingFourPointReducer,
    gradingsFreePoint: gradingFreePointReducer,
    questionsMcq: questionsMcqReducer,
    affiliationSelector: affiliationSelectorReducer,
    affiliationSelectorCacheable: affiliationSelectorCacheableReducer,
    reportOnContent: reportOnContentReducer,
    reportOnResults: reportOnResultsReducer,
    orgEdit: orgEditReducer,
    facEdit: facEditReducer,
    depEdit: depEditReducer,
    courseEdit: courseEditReducer,
    themeEdit: themeEditReducer,
    resourceEdit: resourceEditReducer,
    schemeEdit: schemeEditReducer,
    helpEdit: helpEditReducer,
    modeEdit: modeEditReducer,
    settingsEdit: settingsEditReducer,
    lmsEdit: lmsEditReducer,
    questionMcqEdit: questionMcqEditReducer
});

export default staffReducers;