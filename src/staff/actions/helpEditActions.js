import {helpsAPI} from "../_api/helpsAPI";
import {addHelpInStore, updateHelpInStore} from "./helpsActions";

const SAVING_HELP = "SAVING_HELP";
const SAVING_HELP_FAILURE = "SAVING_HELP_FAILURE";
const SAVING_HELP_SUCCESS = "SAVING_HELP_SUCCESS";
const CLEAR_SAVING_HELP= "CLEAR_SAVING_HELP";

export const loading = isLoading => ({type: SAVING_HELP, isLoading});
export const loadingFailure = error => ({type: SAVING_HELP_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_HELP_SUCCESS, message});
export const clearHelpState = () => ({type: CLEAR_SAVING_HELP});

export const saveHelp = helpDTO => {
    return (dispatch) => {
        dispatch(clearHelpState());
        dispatch(loading(true));
        helpsAPI.saveHelp(helpDTO).then(result => {
            dispatch(addHelpInStore(result.data));
            dispatch(loadingSuccess("Successfully added a help!"));
        }).catch(e => {
            console.log("Failed to add a help: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to add a help: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateHelp = helpDTO => {
    return (dispatch) => {
        dispatch(clearHelpState());
        dispatch(loading(true));
        helpsAPI.updateHelp(helpDTO).then(result => {
            dispatch(updateHelpInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the help!"));
        }).catch(e => {
            console.log("Failed to update a help: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update a help: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

