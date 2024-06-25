import {ltiVersionsAPI} from "../_api/ltiVersionsAPI";

const SET_LTI_VERSIONS = "SET_LTI_VERSIONS";
export const setLTIVersions = ltiVersions => ({type: SET_LTI_VERSIONS, payload: ltiVersions});

export const getLtiVersions = () => {
    return (dispatch) => {
        ltiVersionsAPI.fetchAllLtiVersions().then(result => {
            dispatch(setLTIVersions(result.data));
        }).catch(e => {
            console.log("Error fetching all supported LTI versions!", e);
        });
    }
}