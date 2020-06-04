import {gradingAPI} from "../_api/gradingAPI";

const SET_ALL_GRADINGS_MIN = "SET_ALL_GRADINGS_MIN";

export const setAllGradingsMin = (gradings) => ({type: SET_ALL_GRADINGS_MIN, payload: gradings});

export const getGradings = () => {
    return (dispatch) => {
        gradingAPI.fetchAllGradingsByRatosForDropDown().then(result => {
            dispatch(setAllGradingsMin(result.data));
        }).catch(e => {
            console.log("Error fetching gradings!", e);
        });
    }
}