import {combineReducers} from "redux";

import {organisationsReducer} from "./organisationsReducer";
import {orgEditReducer} from "./orgEditReducer";
import {facultiesReducer} from "./facultiesReducer";
import {facEditReducer} from "./facEditReducer";
import {departmentsReducer} from "./departmentsReducer";
import {depEditReducer} from "./depEditReducer";
import {usersReducer} from "./usersReducer";
import {userEditReducer} from "./userEditReducer";
import {positionsReducer} from "./positionsReducer";
import {affiliationSelectorReducer} from "./affiliationSelectorReducer";
import profileReducer from "./profileReducer";
import {coursesReducer} from "./coursesReducer";
import {courseEditReducer} from "./courseEditReducer";
import {accessReducer} from "./accessReducer";
import lmsReducer from "./lmsReducer";
import lmsEditReducer from "./lmsEditReducer";
//@ts-ignore
import {resultsReducer} from "./resultsReducer";
//@ts-ignore
import {resultDetailsReducer} from "./resultDetailsReducer";
//@ts-ignore
import {themesReducer} from "./themesReducer";
//@ts-ignore
import {schemesReducer} from "./schemesReducer";
//@ts-ignore
import {affiliationSelectorCacheableReducer} from "./affiliationSelectorCacheableReducer";
//@ts-ignore
import {reportOnContentReducer} from "./reportOnContentReducer";
//@ts-ignore
import {reportOnResultsReducer} from "./reportOnResultsReducer";
//@ts-ignore
import {themeEditReducer} from "./themeEditReducer";
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
    faculties: ReturnType<typeof facultiesReducer>,
    facEdit: ReturnType<typeof facEditReducer>,
    departments: ReturnType<typeof departmentsReducer>,
    depEdit: ReturnType<typeof depEditReducer>,
    users: ReturnType<typeof usersReducer>,
    userEdit: ReturnType<typeof userEditReducer>,
    positions: ReturnType<typeof positionsReducer>,
    affiliationSelector: ReturnType<typeof affiliationSelectorReducer>,
    profile: ReturnType<typeof profileReducer>,
    courses: ReturnType<typeof coursesReducer>,
    courseEdit: ReturnType<typeof courseEditReducer>,
    access: ReturnType<typeof accessReducer>,

    lms: ReturnType<typeof lmsReducer>,
    lmsEdit: ReturnType<typeof lmsEditReducer>,

    ltiVersions: any,
    results: any,
    resultDetails: any,
    themes: any,
    themesSupport: any,
    schemes: any,
    resources: any,
    helps:any,
    strategy: any,
    settings: any,
    modes: any,
    options:any,
    gradings:any,
    gradingsTwoPoint: any,
    gradingsFourPoint: any,
    gradingsFreePoint: any,
    questionsMcq: any,
    affiliationSelectorCacheable: any,
    reportOnContent: any,
    reportOnResults: any,
    themeEdit: any,
    resourceEdit: any,
    schemeEdit: any,
    helpEdit: any,
    modeEdit: any,
    settingsEdit: any,
    questionMcqEdit: any
}

const staffReducers = combineReducers<RootStaffState>({
    organisations: organisationsReducer,
    orgEdit: orgEditReducer,
    faculties: facultiesReducer,
    facEdit: facEditReducer,
    departments:  departmentsReducer,
    depEdit: depEditReducer,
    users: usersReducer,
    userEdit: userEditReducer,
    positions: positionsReducer,
    affiliationSelector: affiliationSelectorReducer,
    profile: profileReducer,
    courses: coursesReducer,
    courseEdit: courseEditReducer,
    access: accessReducer,
    lms: lmsReducer,

    ltiVersions: ltiVersionsReducer,
    results: resultsReducer,
    resultDetails: resultDetailsReducer,
    themes: themesReducer,
    themesSupport: themesSupportReducer,
    schemes: schemesReducer,
    resources: resourcesReducer,
    helps:helpsReducer,
    strategy: strategyReducer,
    settings: settingsReducer,
    modes: modesReducer,
    options:optionsReducer,
    gradings:gradingReducer,
    gradingsTwoPoint: gradingTwoPointReducer,
    gradingsFourPoint: gradingFourPointReducer,
    gradingsFreePoint: gradingFreePointReducer,
    questionsMcq: questionsMcqReducer,
    affiliationSelectorCacheable: affiliationSelectorCacheableReducer,
    reportOnContent: reportOnContentReducer,
    reportOnResults: reportOnResultsReducer,
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