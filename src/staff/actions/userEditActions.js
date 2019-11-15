import {usersAPI} from "../_api/usersAPI";

const SAVING_STAFF = "SAVING_STAFF";
const SAVING_STAFF_FAILURE = "SAVING_STAFF_FAILURE";
const SAVING_STAFF_SUCCESS = "SAVING_STAFF_SUCCESS";
const CLEAR_SAVING_STAFF = "CLEAR_SAVING_STAFF";

export const loading = isLoading => ({type: SAVING_STAFF, isLoading});
export const loadingFailure = error => ({type: SAVING_STAFF_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_STAFF_SUCCESS, message});
export const resetStaffState = () => ({type: CLEAR_SAVING_STAFF});

export const saveStaff = (staffDTO) => {
    return (dispatch) => {
        dispatch(resetStaffState());
        dispatch(loading(true));
        usersAPI.saveStaff(staffDTO).then(result => {
            dispatch(loadingSuccess("Successfully added!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a teaching staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateStaff = (staffDTO) => {
    return (dispatch) => {
        dispatch(resetStaffState());
        dispatch(loading(true));
        usersAPI.updateStaff(staffDTO).then(result => {
            dispatch(loadingSuccess("Successfully updated!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update a teaching staff")));
        }).finally(() => dispatch(loading(false)));
    }
}