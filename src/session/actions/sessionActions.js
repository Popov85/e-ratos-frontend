import sessionAPI from "../_api/sessionAPI";
import * as failureActions from "./failureActions";

const API_CALL = "API_CALL";

const EMPTY_BATCH = "EMPTY_BATCH";
const FIRST_BATCH_RECEIVED = "FIRST_BATCH_RECEIVED";
const NEXT_BATCH_RECEIVED = "NEXT_BATCH_RECEIVED";
const RESULT_RECEIVED = "RESULT_RECEIVED";

const SHOW_NEXT_QUESTION_IN_BATCH = "SHOW_NEXT_QUESTION_IN_BATCH";
const SHOW_PREV_QUESTION_IN_BATCH = "SHOW_PREV_QUESTION_IN_BATCH";

const PUT_HELP = "PUT_HELP";
const PUT_STAR = "PUT_STAR";
const PUT_REPORT = "PUT_REPORT";
const PUT_RESPONSE = "PUT_RESPONSE";
const PUT_RESPONSE_CHECKED = "PUT_RESPONSE_CHECKED";

const SET_CANCELLED = "SET_CANCELLED";

const SET_PRESERVED = "SET_PRESERVED";
const SET_RETRIEVED = "SET_RETRIEVED";

const SET_CONTINUED = "SET_CONTINUED";
const SET_PAUSED = "SET_PAUSED";
const SET_PROCEEDED = "SET_PROCEEDED";

const SHOW_REPORT = "SHOW_REPORT";
const HIDE_REPORT = "HIDE_REPORT";
const INVERT_REPORT = "INVERT_REPORT";

const SHOW_HELP = "SHOW_HELP";
const HIDE_HELP = "HIDE_HELP";

const SET_SKIPPED = "SET_SKIPPED";

const RESET_SESSION = "RESET_SESSION";

const SET_EXPANDED = "SET_EXPANDED";

export const apiCall = isLoaded => ({type: API_CALL, isLoaded});

export const emptyBatch = () => ({type: EMPTY_BATCH, error: new Error("No Questions found in the first batch")});
export const firstBatchReceived = batch => ({type: FIRST_BATCH_RECEIVED, payload: batch});
export const nextBatchReceived = batch => ({type: NEXT_BATCH_RECEIVED, payload: batch});
export const resultReceived = result => ({type: RESULT_RECEIVED, payload: result});

export const showNext = () => ({type: SHOW_NEXT_QUESTION_IN_BATCH});
export const showPrev = () => ({type: SHOW_PREV_QUESTION_IN_BATCH});

export const putHelp = (questionId, help) => ({type: PUT_HELP, questionId, help});
export const putStar = (questionId, star) => ({type: PUT_STAR, questionId, star});
export const putReport = (questionId, report) => ({type: PUT_REPORT, questionId, report});
export const putResponse = (questionId, response) => ({type: PUT_RESPONSE, questionId, response});
export const putResponseChecked = (questionId, checked) => ({type: PUT_RESPONSE_CHECKED, questionId, checked});

export const setPreserved = (key) => ({type: SET_PRESERVED, key});
export const setRetrieved = () => ({type: SET_RETRIEVED});

export const setContinued = () => ({type: SET_CONTINUED});
export const setCancelled = () => ({type: SET_CANCELLED});

export const setPaused = () => ({type: SET_PAUSED});
export const setProceeded = () => ({type: SET_PROCEEDED});

export const showReport = () => ({type: SHOW_REPORT});
export const hideReport = () => ({type: HIDE_REPORT});
export const invertReport = () => ({type: INVERT_REPORT});

export const showHelp = () => ({type: SHOW_HELP});
export const hideHelp = () => ({type: HIDE_HELP});

export const setSkipped = (questionId) => ({type: SET_SKIPPED, questionId});

export const resetSession = () => ({type: RESET_SESSION});

export const setExpanded = () => ({type: SET_EXPANDED});


export const getStarted = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.start(schemeId, isLMS).then(result => {
            dispatch(resetSession());
            let questions = result.data.questions;
            if (questions === null || questions.length === 0) {
                dispatch(emptyBatch());
            } else {
                dispatch(firstBatchReceived(result.data));
            }
        }).catch(error => {
            dispatchFailure("Failed to start a session", error, "start", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getNext = (schemeId, isLMS, batch) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.next(schemeId, isLMS, batch).then(result => {
            let nextBatch = result.data;
            let questions = nextBatch.questions;
            if (questions === null || questions.length === 0) {
                // For dynamic sessions
                // Empty batch detected, do finish call
                dispatch(getFinished(schemeId, isLMS));
            } else {
                dispatch(nextBatchReceived(nextBatch));
            }
        }).catch(error => {
            dispatchFailure("Failed to do next request", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getCurrent = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.current(schemeId, isLMS).then(result => {
            dispatch(nextBatchReceived(result.data));
        }).catch(error => {
            dispatchFailure("Failed to do current request", error, "opened", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getCancelled = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.cancel(schemeId, isLMS).then((result) => {
            dispatch(resultReceived(result.data));
            dispatch(setCancelled());
        }).catch(error => {
            dispatchFailure("Failed to cancel the session", error, "session", dispatch); // Location can be from Opened component
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getFinished = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.finish(schemeId, isLMS).then(result => {
            dispatch(resultReceived(result.data));
        }).catch(error => {
            dispatchFailure("Failed to finish the session", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getFinishedBatch = (schemeId, isLMS, batch) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.finish_batch(schemeId, isLMS, batch).then(result => {
            dispatch(resultReceived(result.data));
        }).catch(error => {
            dispatchFailure("Failed to finish the session with last batch", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getPreserved = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.preserve(schemeId, isLMS).then(result => {
            dispatch(setPreserved(result.data.key));
        }).catch(error => {
            dispatchFailure("Failed to preserve the session", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getRetrieved = (key, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.retrieve(key, isLMS).then(result => {
            dispatch(nextBatchReceived(result.data));
            dispatch(setRetrieved());
            dispatch(setProceeded()); // Automatically unpause if any
        }).catch(error => {
            dispatchFailure("Failed to retrieve the session", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getPaused = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.pause(schemeId, isLMS).then(() => {
            dispatch(setPaused());
        }).catch(error => {
            dispatchFailure("Failed to pause the session", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getProceeded = (schemeId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.proceed(schemeId, isLMS).then(() => {
            dispatch(setProceeded());
        }).catch(error => {
            dispatchFailure("Failed to proceed the session after pause", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getSkipped = (schemeId, questionId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.skip(schemeId, questionId, isLMS).then(() => {
            dispatch(setSkipped(questionId));
        }).catch(error => {
            dispatchFailure("Failed to skip the question", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}
export const getChecked = (schemeId, isLMS, questionId, response) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        const promise = !response ? sessionAPI.shows(schemeId, questionId, isLMS)
            : sessionAPI.check(schemeId, isLMS, response);
        promise.then(result => {
            dispatch(putResponseChecked(questionId, result.data));
        }).catch(error => {
            dispatchFailure("Failed to check the response to the question", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getStarred = (schemeId, questionId, isLMS, stars) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        const dto = {questionId: questionId, stars: stars};
        sessionAPI.star(schemeId, questionId, isLMS, dto).then(() => {
            dispatch(putStar(questionId, stars));
        }).catch(error => {
            dispatchFailure("Failed to get the question starred", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const getReported = (schemeId, questionId, isLMS, types) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        const dto = {questionId: questionId, complaintTypeIds: types};
        sessionAPI.report(schemeId, questionId, isLMS, dto).then(() => {
            dispatch(hideReport());
            dispatch(putReport(questionId, types));
        }).catch(error => {
            dispatchFailure("Failed to complain about the question", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}

export const fetchHelp = (schemeId, questionId, isLMS) => {
    return (dispatch) => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.help(schemeId, questionId, isLMS).then(result => {
            dispatch(putHelp(questionId, result.data));
            dispatch(showHelp());
        }).catch(error => {
            dispatchFailure("Failed to get help on the question", error, "session", dispatch);
        }).finally(() => dispatch(apiCall(true)));
    }
}


const dispatchFailure = (message, error, location, dispatch) => {
    if (!error.response) {
        dispatch(failureActions.setFailure(error, message, location));
    } else {
        dispatch(failureActions.setFailureWithBody(error.response.data, message, location));
    }
}
