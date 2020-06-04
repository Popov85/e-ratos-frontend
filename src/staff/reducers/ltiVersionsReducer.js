import {dev} from "../../profile";

const actual = [
    {
        "versionId": 1,
        "name": "LTIv1.1"
    },
];


const testInitState = {
    content: actual,
}

const initState = {
    content: null,
}

/**
 * Used to create a new user
 * @param state
 * @param action
 * @returns {Array|*}
 */
export const ltiVersionsReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SET_LTI_VERSIONS": {
            return {...state, content: action.payload};
        }
        default:
            return state;
    }
}