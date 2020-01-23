import {lmsAPI} from "../_api/lmsAPI";

const SET_ALL_LMS_MIN= "SET_ALL_LMS_MIN";

export const setAllLMSesMin = (lmses) => ({type: SET_ALL_LMS_MIN, payload: lmses});

export const getLMSes = () => {
    return (dispatch) => {
        lmsAPI.fetchAllLMSByOrganisationForDropDown().then(result => {
            dispatch(setAllLMSesMin(result.data));
        }).catch(e => {
            console.log("Error fetching LMSes!", e);
        });
    }
}