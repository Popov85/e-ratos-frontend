
export const schemeInfoReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case "LOADING_SCHEME_INFO": {
            return { ...state, isLoading: action.isLoading };
        }
        case "LOADING_SCHEME_INFO_FAILURE": {
            return { ...state, error: action.error};
        }
        case "SET_SCHEME_INFO": {
            return action.payload;
        }
        default: return state;
    }
}