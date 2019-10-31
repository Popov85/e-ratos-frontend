import appAPI from "../_api/appAPI";

const LOADING_REG_OPTIONS = "LOADING_REG_OPTIONS";
const LOADING_REG_OPTIONS_FAILURE = "LOADING_REG_OPTIONS_FAILURE";
const SET_REG_OPTIONS = "SET_REG_OPTIONS";

export const loading = isLoading => ({type: LOADING_REG_OPTIONS, isLoading});
export const loadingFailure = error => ({type: LOADING_REG_OPTIONS_FAILURE, error});
export const setRegOptions = regOptions=> ({type: SET_REG_OPTIONS, payload: regOptions});

export const getRegOptions = () => {
    return (dispatch) => {
        dispatch(loading(true));
        appAPI.fetchRegOptions().then(result => {
            //console.log("Result (regOptions) = ", result.data);
            dispatch(setRegOptions(result.data));
        }).catch(e => {
            console.log("Error loading RegOptions!", e);
            dispatch(loadingFailure(new Error("Failed to load RegOptions")));
        }).finally(() => dispatch(loading(false)));
    }
}
