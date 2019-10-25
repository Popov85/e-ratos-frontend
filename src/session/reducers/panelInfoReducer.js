export const panelInfoReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case "LOADING_PANEL_INFO": {
            return { ...state, isLoading: action.isLoading };
        }
        case "LOADING_PANEL_INFO_FAILURE": {
            return { ...state, error: action.error};
        }
        case "SET_PANEL_INFO": {
            return action.payload;
        }
        default: return state;
    }
}




