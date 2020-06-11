const LOADING_ALL_SETTINGS = "LOADING_ALL_SETTINGS";
const LOADING_ALL_SETTINGS_FAILURE = "LOADING_ALL_SETTINGS_FAILURE";
const CLEAR_LOADING_ALL_SETTINGS_FAILURE = "CLEAR_LOADING_ALL_SETTINGS_FAILURE";
const SET_ALL_SETTINGS = "SET_ALL_SETTINGS";

const UPDATING_SETTINGS = "UPDATING_SETTINGS";
const UPDATING_SETTINGS_FAILURE = "UPDATING_SETTINGS_FAILURE";
const CLEAR_UPDATING_SETTINGS_FAILURE = "CLEAR_UPDATING_SETTINGS_FAILURE";

const CLEAR_ALL_SETTINGS_FAILURES = "CLEAR_ALL_SETTINGS_FAILURES";

const ADD_SETTINGS_IN_STORE = "ADD_SETTINGS_IN_STORE";
const UPDATE_SETTINGS_IN_STORE = "UPDATE_SETTINGS_IN_STORE";

export const loading = isLoading => ({type: LOADING_ALL_SETTINGS, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_SETTINGS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_SETTINGS_FAILURE});
export const setAllSettings = settings => ({type: SET_ALL_SETTINGS, payload: settings});

export const updating = isUpdating => ({type: UPDATING_SETTINGS, isUpdating});
export const updatingFailure = error => ({type: UPDATING_SETTINGS_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_SETTINGS_FAILURE});

export const clearAllSettingsFailures = () => ({type: CLEAR_ALL_SETTINGS_FAILURES});

export const addSettingsInStore = settings => ({type: ADD_SETTINGS_IN_STORE, payload: settings});
export const updateSettingsInStore = settings => ({type: UPDATE_SETTINGS_IN_STORE, payload: settings});







