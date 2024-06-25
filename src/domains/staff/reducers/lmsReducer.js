const testInitState = {
    content: [
        {
            lmsId: 1,
            name: "Open-edX",
            credentials: {
                credId: 1,
                key: "ratos-client-key",
                secret: "5NZR6e4ySgvjJO4ZvST54CSZLaUNGc8wbLqqRhj8tNchgnQBYcOgbg6e5bPUdgeqI7Y7Ux"
            },
            ltiVersion: {
                versionId: 1,
                version: "LTI v1.1"
            }
        },
        {
            lmsId: 2,
            name: "Moodle",
            credentials: {
                credId: 2,
                key: "moodle-client-key",
                secret: "iOOMfLxGjuyeCLPlu2RqLOpqj5uKr4h5EEOZ0GLKo4i54fd88MkeWbiUGjAhpVaL60Li1h"
            },
            ltiVersion: {
                versionId: 1,
                version: "LTI v1.1"
            }
        }
    ],
    // For drop-down
    contentMin: [
        {
            lmsId: 1,
            name: "Open edX"
        },
        {
            lmsId: 2,
            name: "Moodle"
        }
    ],
    isLoading: false,
    error: null
}

const initState = {
    content: null,
    contentMin: null,
    isLoading: false
}

export const lmsReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_ALL_LMS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_LMS_FAILURE": {
            console.log("Error loading lmses!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_LMS_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_LMS": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_LMS_FAILURE": {
            console.log("Error updating an LMS!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_LMS_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_LMS_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_LMS": {
            const content = action.payload;
            return {...state, content};
        }
        case "SET_ALL_LMS_MIN": { // For drop-downs
            const contentMin = action.payload;
            return {...state, contentMin};
        }
        case "ADD_LMS_IN_STORE": {
            const lms = action.payload;
            return {...state, content: [...state.content, lms]};
        }
        case "UPDATE_LMS_IN_STORE": {
            const lms = action.payload;
            return {...state, content: state.content.map(l => l.lmsId === lms.lmsId ? lms : l)}
        }
        case "UPDATE_LMS_NAME_IN_STORE": {
            const {lmsId, name} = action;
            return {...state, content: state.content.map(lms => lms.lmsId === lmsId ? {...lms, name} : lms)}
        }

        case "DELETE_LMS_FROM_STORE": {
            const {lmsId} = action;
            return {...state, content: state.content.filter(lms => lms.lmsId !== lmsId)}
        }
        default:
            return state;
    }
}