import {themesAPI as themeAPI, themesAPI} from "../_api/themesAPI";

const LOADING_ALL_THEMES = "LOADING_ALL_THEMES";
const LOADING_ALL_THEMES_FAILURE = "LOADING_ALL_THEMES_FAILURE";
const CLEAR_LOADING_ALL_THEMES_FAILURE = "CLEAR_LOADING_ALL_THEMES_FAILURE";
const SET_ALL_THEMES = "SET_ALL_THEMES";

const UPDATING_THEME = "UPDATING_THEME";
const UPDATING_THEME_FAILURE = "UPDATING_THEME_FAILURE";
const CLEAR_UPDATING_THEME_FAILURE = "CLEAR_UPDATING_THEME_FAILURE";

const CLEAR_ALL_THEMES_FAILURES = "CLEAR_ALL_THEMES_FAILURES";

const ADD_THEME_IN_STORE = "ADD_THEME_IN_STORE";
const UPDATE_THEME_IN_STORE = "UPDATE_THEME_IN_STORE";
const UPDATE_THEME_NAME_IN_STORE = "UPDATE_THEME_NAME_IN_STORE";
const DELETE_THEME_FROM_STORE = "DELETE_THEME_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_THEMES, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_THEMES_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_THEMES_FAILURE});
export const setAllThemes = themes => ({type: SET_ALL_THEMES, payload: themes});

export const updating = isUpdating => ({type: UPDATING_THEME, isUpdating});
export const updatingFailure = error => ({type: UPDATING_THEME_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_THEME_FAILURE});

export const clearAllThemesFailures = () => ({type: CLEAR_ALL_THEMES_FAILURES});

export const addThemeInStore = theme => ({type: ADD_THEME_IN_STORE, payload: theme});
export const updateThemeInStore = theme => ({type: UPDATE_THEME_IN_STORE, payload: theme});
export const updateThemeNameInStore = (themeId, name) => ({type: UPDATE_THEME_NAME_IN_STORE, themeId, name});
export const deleteThemeFromStore = themeId => ({type: DELETE_THEME_FROM_STORE, themeId});

export const updateThemeName = (themeId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        themesAPI.updateThemeName(themeId, name).then(() => {
            dispatch(updateThemeNameInStore(themeId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update theme's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteTheme = themeId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        themeAPI.deleteTheme(themeId).then(() => {
            dispatch(deleteThemeFromStore(themeId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete theme!")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const getAllThemesByDepartment = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        themesAPI.fetchAllThemesByDepartmentForTable().then(result => {
            dispatch(setAllThemes(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. themes!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all dep themes")));
        }).finally(() => dispatch(loading(false)));
    }
}

// For higher admin!
export const getAllThemesByDepartmentId = depId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        themesAPI.fetchAllThemesByDepartmentIdForTable(depId).then(result => {
            dispatch(setAllThemes(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. themes!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all themes, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}


