const testInitState = {
    isLoading: false,
    error: null
}

const initState = {
    isLoading: false
}

export const courseEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_COURSE": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_COURSE_FAILURE": {
            console.log("Error saving a course!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_COURSE_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_COURSE": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}