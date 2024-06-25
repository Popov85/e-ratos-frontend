import {questionsAPI} from "../_api/questionsAPI";
import {addQuestionMcqInStore, addQuestionsMcqFromFileInStore, updateQuestionMcqInStore} from "./questionsMcqActions";

const SAVING_QUESTION_MCQ = "SAVING_QUESTION_MCQ";
const SAVING_QUESTION_MCQ_FAILURE = "SAVING_QUESTION_MCQ_FAILURE";
const SAVING_QUESTION_MCQ_SUCCESS = "SAVING_QUESTION_MCQ_SUCCESS";
const ADD_REPORT_ON_ISSUES_WHEN_PARSING_FROM_FILE = "ADD_REPORT_ON_ISSUES_WHEN_PARSING_FROM_FILE";
const CLEAR_SAVING_QUESTION_MCQ = "CLEAR_SAVING_QUESTION_MCQ";

export const loading = isLoading => ({type: SAVING_QUESTION_MCQ, isLoading});
export const loadingFailure = error => ({type: SAVING_QUESTION_MCQ_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_QUESTION_MCQ_SUCCESS, message});
export const clearQuestionMcqState = () => ({type: CLEAR_SAVING_QUESTION_MCQ});
export const addReportOnIssuesWhenParsingFromFile = report => ({type: ADD_REPORT_ON_ISSUES_WHEN_PARSING_FROM_FILE, payload: report});


export const saveQuestionMcq = questionMcqDTO => {
    const {themeId} = questionMcqDTO;
    return (dispatch) => {
        dispatch(clearQuestionMcqState());
        dispatch(loading(true));
        questionsAPI.saveQuestionMcq(questionMcqDTO).then(result => {
            dispatch(addQuestionMcqInStore(themeId, result.data));
            dispatch(loadingSuccess("Successfully added a question MCQ!"));
        }).catch(e => {
            console.log("Failed to save a question MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to save a question MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateQuestionMcq = questionMcqDTO => {
    const {themeId} = questionMcqDTO;
    return (dispatch) => {
        dispatch(clearQuestionMcqState());
        dispatch(loading(true));
        questionsAPI.updateQuestionMcq(questionMcqDTO).then(result => {
            dispatch(updateQuestionMcqInStore(themeId, result.data));
            dispatch(loadingSuccess("Successfully updated the MCQ!"));
        }).catch(e => {
            console.log("Failed to update the question MCQ: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update the question MCQ: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const saveQuestionsMcqFromFile = (file, themeId, confirmed) => {
    return (dispatch) => {
        dispatch(clearQuestionMcqState());
        dispatch(loading(true));
        questionsAPI.saveQuestionsMcqFromFile(file, themeId, confirmed).then(result => {
            const report = result.data;
            const {content, saved} = report;
            if (saved) {
                dispatch(addQuestionsMcqFromFileInStore(themeId, content));
                dispatch(loadingSuccess("Successfully added all questions MCQ from file!"));
            } else {
                dispatch(addReportOnIssuesWhenParsingFromFile(report));
            }
        }).catch(e => {
            console.log("Failed to save all question MCQ from file: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to save all question MCQ from file: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}


