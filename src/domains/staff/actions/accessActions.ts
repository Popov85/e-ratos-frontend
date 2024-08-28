import {accessAPI} from "../_api/accessAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Access} from "../types/Access";
import {Dispatch} from "redux";

export const SET_ALL_ACCESSES = "SET_ALL_ACCESSES_MIN" as const;

export type SetAllAccessesAction = GenericAction<typeof SET_ALL_ACCESSES, { accesses: Array<Access> }>;

// Union type for all actions
export type AccessesActionTypes =
    | SetAllAccessesAction

export const setAllAccessesMin = (accesses: Array<Access>): SetAllAccessesAction => ({
    type: SET_ALL_ACCESSES,
    payload: {accesses}
});

export const getAccesses = () => {
    return (dispatch: Dispatch<AccessesActionTypes>): void => {
        accessAPI.fetchAllAccessesByRatosForDropDown()
            .then((accesses: Array<Access>): void => {
            dispatch(setAllAccessesMin(accesses));
        }).catch((e: Error): void => {
            console.warn("Error fetching accesses!", e);
        });
    }
}