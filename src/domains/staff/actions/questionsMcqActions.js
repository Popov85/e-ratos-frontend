import {questionsAPI} from "../_api/questionsAPI";

const LOADING_ALL_QUESTIONS_MCQ = "LOADING_ALL_QUESTIONS_MCQ";
const LOADING_ALL_QUESTIONS_MCQ_FAILURE = "LOADING_ALL_QUESTIONS_MCQ_FAILURE";
const CLEAR_LOADING_ALL_QUESTIONS_MCQ_FAILURE = "CLEAR_LOADING_ALL_QUESTIONS_MCQ_FAILURE";
const SET_ALL_QUESTIONS_MCQ_BY_THEME_ID = "SET_ALL_QUESTIONS_MCQ_BY_THEME_ID";

const UPDATING_QUESTION_MCQ = "UPDATING_QUESTION_MCQ";
const UPDATING_QUESTION_MCQ_FAILURE = "UPDATING_QUESTION_MCQ_FAILURE";
const CLEAR_UPDATING_QUESTION_MCQ_FAILURE = "CLEAR_UPDATING_QUESTION_MCQ_FAILURE";

const CLEAR_ALL_QUESTIONS_MCQ_FAILURES = "CLEAR_ALL_QUESTIONS_MCQ_FAILURES";

const ADD_QUESTION_MCQ_IN_STORE = "ADD_QUESTION_MCQ_IN_STORE";
const ADD_QUESTIONS_MCQ_FROM_FILE_IN_STORE = "ADD_QUESTIONS_MCQ_FROM_FILE_IN_STORE";
const UPDATE_QUESTION_MCQ_IN_STORE = "UPDATE_QUESTION_MCQ_IN_STORE";
const UPDATE_QUESTION_MCQ_NAME_IN_STORE = "UPDATE_QUESTION_MCQ_NAME_IN_STORE";
const UPDATE_QUESTION_MCQ_LEVEL_IN_STORE = "UPDATE_QUESTION_MCQ_LEVEL_IN_STORE";
const UPDATE_QUESTION_MCQ_REQUIRED_IN_STORE = "UPDATE_QUESTION_MCQ_REQUIRED_IN_STORE";

const DELETE_QUESTION_MCQ_FROM_STORE = "DELETE_QUESTION_MCQ_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_QUESTIONS_MCQ, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_QUESTIONS_MCQ_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_QUESTIONS_MCQ_FAILURE});
export const setAllQuestionsMCQByThemeId = (themeId, mcq)  => ({type: SET_ALL_QUESTIONS_MCQ_BY_THEME_ID, themeId, payload: mcq});

export const updating = isUpdating => ({type: UPDATING_QUESTION_MCQ, isUpdating});
export const updatingFailure = error => ({type: UPDATING_QUESTION_MCQ_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_QUESTION_MCQ_FAILURE});

export const clearAllQuestionsMcqFailures = () => ({type: CLEAR_ALL_QUESTIONS_MCQ_FAILURES});

// TODO: here will be more such bunches for each question type
export const addQuestionMcqInStore = (themeId, mcq) => ({type: ADD_QUESTION_MCQ_IN_STORE, themeId, mcq});
export const addQuestionsMcqFromFileInStore = (themeId, bunch) => ({type: ADD_QUESTIONS_MCQ_FROM_FILE_IN_STORE, themeId, bunch});
export const updateQuestionMcqInStore = (themeId, mcq) => ({type: UPDATE_QUESTION_MCQ_IN_STORE, themeId, mcq});
export const updateQuestionMcqNameInStore = (themeId, questionId, name) => ({type: UPDATE_QUESTION_MCQ_NAME_IN_STORE, themeId, questionId, name});
export const updateQuestionMcqLevelInStore = (themeId, questionId, level) => ({type: UPDATE_QUESTION_MCQ_LEVEL_IN_STORE, themeId, questionId, level});
export const updateQuestionMcqRequiredInStore = (themeId, questionId, required) => ({type: UPDATE_QUESTION_MCQ_REQUIRED_IN_STORE, themeId, questionId, required});
export const deleteQuestionMcqFromStore = (themeId, questionId) => ({type: DELETE_QUESTION_MCQ_FROM_STORE, themeId, questionId});

export const updateQuestionMcqName = (themeId, questionId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        questionsAPI.updateQuestionName(questionId, name).then(() => {
            dispatch(updateQuestionMcqNameInStore(themeId, questionId, name));
        }).catch(e => {
            console.log("Failed to update the name field of the question MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update the name field of the question MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateQuestionMcqLevel = (themeId, questionId, level) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        questionsAPI.updateQuestionLevel(questionId, level).then(() => {
            dispatch(updateQuestionMcqLevelInStore(themeId, questionId, Number(level)));
        }).catch(e => {
            console.log("Failed to update the level field of the question MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update the level field of the question MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateQuestionMcqRequired = (themeId, questionId, required) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        questionsAPI.updateQuestionRequired(questionId, required).then(() => {
            dispatch(updateQuestionMcqRequiredInStore(themeId, questionId, required));
        }).catch(e => {
            console.log("Failed to update the required field of the question MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update the required field of the question MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteQuestionMcq = (themeId, questionId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        questionsAPI.deleteQuestion(questionId).then(() => {
            dispatch(deleteQuestionMcqFromStore(themeId, questionId));
        }).catch(e => {
            console.log("Failed to delete the selected question MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to delete the selected question MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

//-----------------------------------------------------Table------------------------------------------------------------
export const getAllQuestionsMcqByThemeId = themeId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        questionsAPI.fetchAllMCQByThemeIdForTable(themeId).then(result => {
            dispatch(setAllQuestionsMCQByThemeId(themeId, result.data));
        }).catch(e => {
            console.log("Failed to fetch all theme's questions MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to fetch all theme's questions MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}



