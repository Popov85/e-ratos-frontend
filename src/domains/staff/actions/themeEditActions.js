import {themesAPI} from "../_api/themesAPI";
import {addThemeInStore, updateThemeInStore} from "./themesActions";

const SAVING_THEME = "SAVING_THEME";
const SAVING_THEME_FAILURE = "SAVING_THEME_FAILURE";
const SAVING_THEME_SUCCESS = "SAVING_THEME_SUCCESS";
const CLEAR_SAVING_THEME = "CLEAR_SAVING_THEME";

export const loading = isLoading => ({type: SAVING_THEME, isLoading});
export const loadingFailure = error => ({type: SAVING_THEME_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_THEME_SUCCESS, message});
export const clearThemeState = () => ({type: CLEAR_SAVING_THEME});

export const saveTheme = themeDTO => {
    return (dispatch) => {
        dispatch(clearThemeState());
        dispatch(loading(true));
        themesAPI.saveTheme(themeDTO).then(result => {
            dispatch(addThemeInStore(result.data));
            dispatch(loadingSuccess("Successfully added a theme!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a theme!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateTheme = themeDTO => {
    return (dispatch) => {
        dispatch(clearThemeState());
        dispatch(loading(true));
        themesAPI.updateTheme(themeDTO).then(result => {
            dispatch(updateThemeInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the theme!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the theme!")));
        }).finally(() => dispatch(loading(false)));
    }
}

