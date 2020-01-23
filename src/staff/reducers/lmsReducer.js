const testInitState = {
    // For table, prefer this array for selectors!
    content: [
        {
            lmsId: 1,
            name: "Open edX",
            credentials: {
                credId: 1,
                key: "ratos-server",
                secret: "we4f5re4fr5ef4re54fg5re4g5e6r4g5"
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
                key: "moodle-server",
                secret: "rer4re45re4gr7g6r5g46459569rgr809g"
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
    isLoading: false,
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
        case "UPDATE_LMS_IN_STORE": {
            const {orgObj} = action;
            return {...state, content: state.content.map(o => o.orgId === orgObj.orgId ? orgObj: o)}
        }
        case "UPDATE_LMS_NAME_IN_STORE": {
            const {orgId, name} = action;
            return {...state, content: state.content.map(o => o.orgId === orgId ? {...o, name} : o)}
        }
        case "ADD_LMS_IN_STORE": {
            const {genId, orgObj} = action;
            return {...state, content: [...state.content, {...orgObj, orgId: genId}]};
        }
        case "DELETE_LMS_FROM_STORE": {
            const {orgId} = action;
            return {...state, content: state.content.filter(o => o.orgId !== orgId)}
        }
        default:
            return state;
    }
}