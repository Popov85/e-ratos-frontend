import sessionAPI from "../_api/sessionAPI";

const LOADING_PANEL_INFO = "LOADING_PANEL_INFO";
const LOADING_PANEL_INFO_FAILURE = "LOADING_PANEL_INFO_FAILURE";
const SET_PANEL_INFO = "SET_PANEL_INFO";

export const loading = isLoading => ({type: LOADING_PANEL_INFO, isLoading});
export const loadingFailure = error => ({type: LOADING_PANEL_INFO_FAILURE, error});
export const setPanelInfo = panelInfo => ({type: SET_PANEL_INFO, payload: panelInfo});

export const loadPanelInfo = () => {
    return (dispatch) => {
        dispatch(loading(true));
        sessionAPI.getPanelInfo().then(result => {
            //console.log("Result (panelInfo) = ", result);
            dispatch(setPanelInfo(result.data));
        }).catch(e => {
            console.log("Error loading PanelInfo!", e);
            dispatch(loadingFailure(new Error("Failed to load panelInfo")));
        }).finally(() => dispatch(loading(false)));
    }
}
