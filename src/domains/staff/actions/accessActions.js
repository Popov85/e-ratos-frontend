import {accessAPI} from "../_api/accessAPI";

const SET_ALL_ACCESSES_MIN = "SET_ALL_ACCESSES_MIN";

export const setAllAccessesMin = (accesses) => ({type: SET_ALL_ACCESSES_MIN, payload: accesses});

export const getAccesses = () => {
    return (dispatch) => {
        accessAPI.fetchAllAccessesByRatosForDropDown().then(result => {
            dispatch(setAllAccessesMin(result.data));
        }).catch(e => {
            console.log("Error fetching accesses!", e);
        });
    }
}