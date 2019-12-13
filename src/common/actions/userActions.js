import appAPI from "../../common/_api/appAPI";

const LOADING_USER_INFO = "LOADING_USER_INFO";
const LOADING_USER_INFO_FAILURE = "LOADING_USER_INFO_FAILURE";
const SET_USER_INFO = "SET_USER_INFO";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
const CLEAR_USER_INFO = "CLEAR_USER_INFO";

export const loading = isLoading => ({type: LOADING_USER_INFO, isLoading});
export const loadingFailure = error => ({type: LOADING_USER_INFO_FAILURE, error});
export const setUserInfo = userInfo => ({type: SET_USER_INFO, payload: userInfo});
export const updateUserProfile = profile => ({type: UPDATE_USER_PROFILE, payload: profile});
export const clearUserInfo = () => ({type: CLEAR_USER_INFO});

// Use to re-try loading
export const loadUserInfo = () => {
    return (dispatch) => {
        dispatch(loading(true));
        appAPI.fetchUserInfo().then(result => {
            dispatch(setUserInfo(result.data));
        }).catch(e => {
            console.log("Error fetching UserInfo!", e);
            dispatch(loadingFailure(new Error("Failed to fetch userInfo")));
        }).finally(() => dispatch(loading(false)));
    }
}


