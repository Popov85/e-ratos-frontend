const testInitState = {
    isLoading: false
}

const initState = {
    isLoading: false
}

export const orgEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_ORG": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_ORG_FAILURE": {
            console.log("Error saving an org!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_ORG_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_ORG": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}