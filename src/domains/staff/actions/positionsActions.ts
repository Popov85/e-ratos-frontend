import {positionsAPI} from "../_api/positionsAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Position} from "../types/Position";
import {Dispatch} from "redux";

export const SET_POSITIONS = "SET_POSITIONS" as const;

export type SetAllPositionsAction = GenericAction<typeof SET_POSITIONS, { positions: Array<Position> }>;

// Union type for all actions
export type PositionsActionTypes =
    | SetAllPositionsAction

export const setPositions = (positions: Array<Position>): SetAllPositionsAction => ({
    type: SET_POSITIONS,
    payload: {positions},
});

export const getPositions = () => {
    return (dispatch: Dispatch<PositionsActionTypes>): void => {
        positionsAPI.fetchAllPositions()
            .then((positions: Array<Position>): void => {
                dispatch(setPositions(positions));
            }).catch((e: Error) => {
            console.warn("Error fetching all positions!", e);
        });
    }
}