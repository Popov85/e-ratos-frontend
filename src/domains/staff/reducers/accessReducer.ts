import {Access} from "../types/Access";
import {AccessesActionTypes, SET_ALL_ACCESSES} from "../actions/accessActions";

// TODO: replace with enum at both FE and BE!
const testInitState = [
        {
            accessId: 1,
            name: "dep-private"
        },
        {
            accessId: 2,
            name: "private"
        }
    ]


type AccessState = {
    content: Array<Access>
}

const initState: AccessState = {
    content: testInitState,
}

export const accessReducer = (state: AccessState = initState, action: AccessesActionTypes): AccessState => {
    switch (action.type) {
        case SET_ALL_ACCESSES: {
            if (action.payload) {
                const {accesses} = action.payload;
                return {...state, content: accesses ?? testInitState};
            }
            return state;
        }
        default:
            return state;
    }
}