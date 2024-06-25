import {schemesAPI} from "../_api/schemesAPI";
import {addSchemeInStore, updateSchemeInStore} from "./schemesActions";
import {coursesAPI} from "../_api/coursesAPI";
import {accessAPI} from "../_api/accessAPI";
import {strategyAPI} from "../_api/strategyAPI";
import {settingsAPI} from "../_api/settingsAPI";
import {modesAPI} from "../_api/modesAPI";
import {optionsAPI} from "../_api/optionsAPI";
import {setAllAccessesMin} from "./accessActions";
import {setAllStrategiesMin} from "./strategyActions";
import {setAllCoursesMin} from "./coursesActions";
import {setAllSettings} from "./settingsActions";
import {setAllModes} from "./modesActions";
import {setAllOptions} from "./optionsActions";
import {setAllGradingsMin} from "./gradingActions";
import {gradingTwoPointAPI as gradingTwoPoint} from "../_api/gradingTwoPointAPI";
import {gradingFourPointAPI as gradingFourPoint} from "../_api/gradingFourPointAPI";
import {gradingFreePointAPI as gradingFreePoint} from "../_api/gradingFreePointAPI";
import {setAllTwos} from "./gradingTwoPointActions";
import {setAllFours} from "./gradingFourPointActions";
import {setAllFrees} from "./gradingFreePointActions";
import {gradingAPI as gradingsAPI} from "../_api/gradingAPI";

const SAVING_SCHEME = "SAVING_SCHEME";
const SAVING_SCHEME_FAILURE = "SAVING_SCHEME_FAILURE";
const SAVING_SCHEME_SUCCESS = "SAVING_SCHEME_SUCCESS";
const CLEAR_SCHEME_FAILURES = "CLEAR_SCHEME_FAILURES";

const LOADING_SCHEME_COMPONENTS = "LOADING_SCHEME_COMPONENTS";
const LOADING_SCHEME_COMPONENTS_FAILURE = "LOADING_SCHEME_COMPONENTS_FAILURE";

export const loading = isLoading => ({type: SAVING_SCHEME, isLoading});
export const loadingFailure = error => ({type: SAVING_SCHEME_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_SCHEME_SUCCESS, message});
export const clearSchemeFailures = () => ({type: CLEAR_SCHEME_FAILURES});

export const loadingSchemeComponents = isLoading => ({type: LOADING_SCHEME_COMPONENTS, isLoading});
export const loadingSchemeComponentsFailure = error => ({type: LOADING_SCHEME_COMPONENTS_FAILURE, error});

export const saveScheme = schemeDTO => {
    return (dispatch) => {
        dispatch(clearSchemeFailures());
        dispatch(loading(true));
        schemesAPI.saveScheme(schemeDTO).then(result => {
            dispatch(addSchemeInStore(result.data));
            dispatch(loadingSuccess("Successfully added a scheme!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a scheme!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateScheme = schemeDTO => {
    return (dispatch) => {
        dispatch(clearSchemeFailures());
        dispatch(loading(true));
        schemesAPI.updateScheme(schemeDTO).then(result => {
            dispatch(updateSchemeInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the scheme!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the scheme!")));
        }).finally(() => dispatch(loading(false)));
    }
}

//-----------------------------------------------------Edit-------------------------------------------------------------

export const getOneSchemeByIdForEdit = (schemeId) => {
    return (dispatch) => {
        dispatch(clearSchemeFailures());
        dispatch(loadingSchemeComponents(true));
        schemesAPI.fetchOneSchemeByIdForEdit(schemeId).then(result => {
            dispatch(updateSchemeInStore(result.data));
        }).catch(e => {
            console.log("Error fetching a scheme by ID!", e);
            dispatch(loadingSchemeComponentsFailure(new Error("Failed to fetch a scheme by ID")));
        }).finally(() => dispatch(loadingSchemeComponents(false)));
    }
}

export const getAllSchemeComponentsForCreate=()=> {
    return dispatch => {
        dispatch(clearSchemeFailures());
        dispatch(loadingSchemeComponents(true));
        Promise.all([
            accessAPI.fetchAllAccessesByRatosForDropDown(),
            strategyAPI.fetchAllStrategiesByRatosForDropDown(),
            gradingsAPI.fetchAllGradingsByRatosForDropDown(),

            coursesAPI.fetchAllCoursesByDepartmentForDropDown(),
            settingsAPI.fetchAllSettingsByDepartmentWithDefault(),
            modesAPI.fetchAllModesByDepartmentWithDefault(),
            optionsAPI.fetchAllOptionsByDepartmentWithDefault(),

            gradingTwoPoint.fetchAllGradingsTwoPointByDepartmentForDropDown(),
            gradingFourPoint.fetchAllGradingsFourPointByDepartmentForDropDown(),
            gradingFreePoint.fetchAllGradingsFreePointByDepartmentForDropDown(),
        ]).then(result=> {
            // set all of them one after another
            dispatch(setAllAccessesMin(result[0].data));//2
            dispatch(setAllStrategiesMin(result[1].data));//3
            dispatch(setAllGradingsMin(result[2].data));//3

            dispatch(setAllCoursesMin(result[3].data));//15
            dispatch(setAllSettings(result[4].data));//5-10
            dispatch(setAllModes(result[5].data));//5-10
            dispatch(setAllOptions(result[6].data));//5-10

            dispatch(setAllTwos(result[7].data));//5
            dispatch(setAllFours(result[8].data));//5
            dispatch(setAllFrees(result[9].data));//5
        }).catch(e => {
            dispatch(loadingSchemeComponentsFailure(new Error("Failed to load all the components for scheme to create!")));
        }).finally(() => dispatch(loadingSchemeComponents(false)));
    }
}

