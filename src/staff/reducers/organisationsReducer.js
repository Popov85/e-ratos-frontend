const testInitState = {
    content: [
        {
            "orgId": 1,
            "name": "University of USA"
        },
        {
            "orgId": 2,
            "name": "University of Florida"
        },
        {
            "orgId": 3,
            "name": "University of San-Francisco"
        }
    ],
    selectedId: 0,
    isLoading: false,
    error: null
}

const initState = {
    content: null,
    selectedId: 0 // Selected value for forms and tables to synchronize lists!
}

export const organisationsReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_ALL_ORG": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_ORG_FAILURE": {
            console.log("Error loading organisations!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_ORG_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_ORG": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_ORG_FAILURE": {
            console.log("Error updating an organisation!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_ORG_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_ORG_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_ORG": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_ORG_IN_STORE": {
            const org = action.payload;
            return {...state, content: [...state.content, org]};
        }
        case "UPDATE_ORG_IN_STORE": {
            const org = action.payload;
            return {...state, content: state.content.map(o => o.orgId === org.orgId ? org : o)}
        }
        case "UPDATE_ORG_NAME_IN_STORE": {
            const {orgId, name} = action;
            return {...state, content: state.content.map(o => o.orgId === orgId ? {...o, name} : o)}
        }
        case "DELETE_ORG_FROM_STORE": {
            const {orgId} = action;
            return {...state, content: state.content.filter(o => o.orgId !== orgId)}
        }
        case "SET_ORG_SELECTED": {
            const selectedId = Number(action.payload);
            return {...state, selectedId};
        }
        case "CLEAR_ORG_SELECTED": {
            return {...state, selectedId: 0};
        }
        default:
            return state;
    }
}