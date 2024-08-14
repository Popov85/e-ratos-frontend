import {combineReducers} from "redux";

import {organisationsReducer} from "./organisationsReducer";
import {orgEditReducer} from "./orgEditReducer";
//@ts-ignore
import {facultiesReducer} from "./facultiesReducer";
//@ts-ignore
import {facEditReducer} from "./facEditReducer";
//@ts-ignore
import {departmentsReducer} from "./departmentsReducer";
//@ts-ignore
import {depEditReducer} from "./depEditReducer";
//@ts-ignore
import {usersReducer} from "./usersReducer";
//@ts-ignore
import {positionsReducer} from "./positionsReducer";
//@ts-ignore
import {userEditReducer} from "./userEditReducer";
//@ts-ignore
import {resultsReducer} from "./resultsReducer";
//@ts-ignore
import {resultDetailsReducer} from "./resultDetailsReducer";
//@ts-ignore
import {coursesReducer} from "./coursesReducer";
//@ts-ignore
import {themesReducer} from "./themesReducer";
//@ts-ignore
import {schemesReducer} from "./schemesReducer";
//@ts-ignore
import {affiliationSelectorCacheableReducer} from "./affiliationSelectorCacheableReducer";
//@ts-ignore
import {affiliationSelectorReducer} from "./affiliationSelectorReducer";
//@ts-ignore
import {profileReducer} from "./profileReducer";
//@ts-ignore
import {reportOnContentReducer} from "./reportOnContentReducer";
//@ts-ignore
import {reportOnResultsReducer} from "./reportOnResultsReducer";
//@ts-ignore
import {courseEditReducer} from "./courseEditReducer";
//@ts-ignore
import {lmsReducer} from "./lmsReducer";
//@ts-ignore
import {accessReducer} from "./accessReducer";
//@ts-ignore
import {themeEditReducer} from "./themeEditReducer";
//@ts-ignore
import {lmsEditReducer} from "./lmsEditReducer";
//@ts-ignore
import {ltiVersionsReducer} from "./ltiVersionsReducer";
//@ts-ignore
import {questionsMcqReducer} from "./questionsMcqReducer";
//@ts-ignore
import {questionMcqEditReducer} from "./questionMcqEditReducer";
//@ts-ignore
import {resourcesReducer} from "./resourcesReducer";
//@ts-ignore
import {resourceEditReducer} from "./resourceEditReducer";
//@ts-ignore
import {helpsReducer} from "./helpsReducer";
//@ts-ignore
import {helpEditReducer} from "./helpEditReducer";
//@ts-ignore
import {schemeEditReducer} from "./schemeEditReducer";
//@ts-ignore
import {strategyReducer} from "./strategyReducer";
//@ts-ignore
import {settingsReducer} from "./settingsReducer";
//@ts-ignore
import {modesReducer} from "./modesReducer";
//@ts-ignore
import {optionsReducer} from "./optionsReducer";
//@ts-ignore
import {gradingReducer} from "./gradingReducer";
//@ts-ignore
import {gradingTwoPointReducer} from "./gradingTwoPointReducer";
//@ts-ignore
import {gradingFourPointReducer} from "./gradingFourPointReducer";
//@ts-ignore
import {gradingFreePointReducer} from "./gradingFreePointReducer";
//@ts-ignore
import {themesSupportReducer} from "./themesSupportReducer";
//@ts-ignore
import {modeEditReducer} from "./modeEditReducer";
//@ts-ignore
import {settingsEditReducer} from "./settingsEditReducer";

// Define the RootState type
export type RootStaffState = {
    organisations: ReturnType<typeof organisationsReducer>;
    orgEdit: ReturnType<typeof orgEditReducer>;
    faculties: any,
    facEdit: any,
    departments: any,
    depEdit: any,

    profile: any,
    users: any,
    positions: any,
    ltiVersions: any,
    userEdit: any,
    results: any,
    resultDetails: any,
    courses: any,
    themes: any,
    themesSupport: any,
    schemes: any,
    resources: any,
    helps:any,
    lms: any,
    access: any,
    strategy: any,
    settings: any,
    modes: any,
    options:any,
    gradings:any,
    gradingsTwoPoint: any,
    gradingsFourPoint: any,
    gradingsFreePoint: any,
    questionsMcq: any,
    affiliationSelector: any,
    affiliationSelectorCacheable: any,
    reportOnContent: any,
    reportOnResults: any,
    courseEdit: any,
    themeEdit: any,
    resourceEdit: any,
    schemeEdit: any,
    helpEdit: any,
    modeEdit: any,
    settingsEdit: any,
    lmsEdit: any,
    questionMcqEdit: any
}

const staffReducers = combineReducers<RootStaffState>({
    organisations: organisationsReducer,
    orgEdit: orgEditReducer,
    faculties: facultiesReducer,
    facEdit: facEditReducer,
    departments: departmentsReducer,
    depEdit: depEditReducer,

    profile: profileReducer,
    users: usersReducer,
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