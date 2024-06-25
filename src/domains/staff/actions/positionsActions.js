import {positionsAPI} from "../_api/positionsAPI";

const SET_POSITIONS = "SET_POSITIONS";
export const setPositions = (positions) => ({type: SET_POSITIONS, payload: positions});

export const getPositions = () => {
    return (dispatch) => {
        positionsAPI.fetchAllPositions().then(result => {
            let positions = result.data;
            dispatch(setPositions(positions));
        }).catch(e => {
            console.log("Error fetching positions!", e);
        });
    }
}