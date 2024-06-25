import sessionAPI from "../_api/sessionAPI";

const LOADING_SCHEME_INFO = "LOADING_SCHEME_INFO";
const RESET_SCHEME_INFO_FAILURE = "RESET_SCHEME_INFO_FAILURE";
const LOADING_SCHEME_INFO_FAILURE = "LOADING_SCHEME_INFO_FAILURE";
const SET_SCHEME_INFO = "SET_SCHEME_INFO";

export const loading = isLoading => ({type: LOADING_SCHEME_INFO, isLoading});
export const resetFailure = () => ({type: RESET_SCHEME_INFO_FAILURE});
export const loadingFailure = error => ({type: LOADING_SCHEME_INFO_FAILURE, error});
export const setSchemeInfo = schemeInfo => ({type: SET_SCHEME_INFO, payload: schemeInfo});

export const loadSchemeInfo = (schemeId) => {
    return (dispatch) => {
        dispatch(resetFailure());
        dispatch(loading(true));
        sessionAPI.getSchemeInfo(schemeId).then(result => {
            //console.log("Result (schemeInfo) = ", result.data);
            dispatch(setSchemeInfo(result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to load schemeInfo")));
        }).finally(() => dispatch(loading(false)));
    }
}