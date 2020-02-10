const initState = {
    isLoading: false
}

export const questionMcqEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_QUESTION_MCQ": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_QUESTION_MCQ_FAILURE": {
            console.log("Error saving a MCQ!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_QUESTION_MCQ_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_QUESTION_MCQ": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}