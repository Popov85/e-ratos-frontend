import {strategyAPI} from "../_api/strategyAPI";

const SET_ALL_STRATEGIES_MIN = "SET_ALL_STRATEGIES_MIN";

export const setAllStrategiesMin = (strategies) => ({type: SET_ALL_STRATEGIES_MIN, payload: strategies});

export const getStrategies = () => {
    return (dispatch) => {
        strategyAPI.fetchAllStrategiesByRatosForDropDown().then(result => {
            dispatch(setAllStrategiesMin(result.data));
        }).catch(e => {
            console.log("Error fetching strategies!", e);
        });
    }
}