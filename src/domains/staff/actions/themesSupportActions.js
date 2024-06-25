import {themesSupportAPI} from "../_api/themesSupportAPI";

const LOADING_ONE_THEME_SUPPORT = "LOADING_ONE_THEME_SUPPORT";
const LOADING_ONE_THEME_SUPPORT_FAILURE = "LOADING_ONE_THEME_SUPPORT_FAILURE";
const CLEAR_LOADING_ONE_THEME_SUPPORT_FAILURE = "CLEAR_LOADING_ONE_THEME_SUPPORT_FAILURE";
const ADD_ONE_THEME_SUPPORT_IN_STORE = "ADD_ONE_THEME_SUPPORT_IN_STORE";

export const loading = isLoading => ({type: LOADING_ONE_THEME_SUPPORT, isLoading});
export const loadingFailure = error => ({type: LOADING_ONE_THEME_SUPPORT_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ONE_THEME_SUPPORT_FAILURE});
export const addThemeSupportInStore = themeSupport => ({type: ADD_ONE_THEME_SUPPORT_IN_STORE, payload: themeSupport});

//------------------------------------------------One for peek/add actions----------------------------------------------

export const getAllQuestionsTypesAndLevelsByThemeId = themeId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        themesSupportAPI.fetchAllQuestionsTypesAndLevelsByThemeId(themeId).then(result => {
            dispatch(addThemeSupportInStore(result.data));
        }).catch(e => {
            console.log("Failed to fetch theme support details: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to fetch theme support details: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}



