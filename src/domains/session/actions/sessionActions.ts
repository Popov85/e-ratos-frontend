import sessionAPI from "../_api/sessionAPI";
import * as failureActions from "./failureActions";
import {Dispatch} from "redux";
import {GenericAction} from "../../common/types/GenericAction";
import {BatchInfo, Question} from "../types/BatchInfo";
import {FinishInfo, QuestionResult} from "../types/FinishInfo";
import {ResponseMCQ} from "../types/responses/impl/ResponseMCQ";
import {ResponseFBSQ} from "../types/responses/impl/ResponseFBSQ";
import {Stars} from "../types/Stars";
import {Help} from "../types/Help";
import {Complaint} from "../types/Complain";
import {SessionErrorLocationsEnum} from "../types/SessionErrorLocationsEnum";
import axios, {AxiosError} from "axios";
import {ServerError} from "../../common/types/ServerError";

// Action Types
export const SESSION_API_CALL = "SESSION_API_CALL" as const;
export const SESSION_EMPTY_BATCH = "SESSION_EMPTY_BATCH" as const;
export const SESSION_FIRST_BATCH_RECEIVED = "SESSION_FIRST_BATCH_RECEIVED" as const;
export const SESSION_NEXT_BATCH_RECEIVED = "SESSION_NEXT_BATCH_RECEIVED" as const;
export const SESSION_RESULT_RECEIVED = "SESSION_RESULT_RECEIVED" as const;
export const SESSION_SHOW_NEXT_QUESTION_IN_BATCH = "SESSION_SHOW_NEXT_QUESTION_IN_BATCH" as const;
export const SESSION_SHOW_PREV_QUESTION_IN_BATCH = "SESSION_SHOW_PREV_QUESTION_IN_BATCH" as const;
export const SESSION_PUT_HELP = "SESSION_PUT_HELP" as const;
export const SESSION_PUT_STAR = "SESSION_PUT_STAR" as const;
export const SESSION_PUT_REPORT = "SESSION_PUT_REPORT" as const;
export const SESSION_PUT_RESPONSE = "SESSION_PUT_RESPONSE" as const;
export const SESSION_PUT_RESPONSE_CHECKED = "SESSION_PUT_RESPONSE_CHECKED" as const;
export const SESSION_SET_CANCELLED = "SESSION_SET_CANCELLED" as const;
export const SESSION_SET_PRESERVED = "SESSION_SET_PRESERVED" as const;
export const SESSION_SET_RETRIEVED = "SESSION_SET_RETRIEVED" as const;
export const SESSION_SET_CONTINUED = "SESSION_SET_CONTINUED" as const;
export const SESSION_SET_PAUSED = "SESSION_SET_PAUSED" as const;
export const SESSION_SET_PROCEEDED = "SESSION_SET_PROCEEDED" as const;
export const SESSION_SHOW_REPORT = "SESSION_SHOW_REPORT" as const;
export const SESSION_HIDE_REPORT = "SESSION_HIDE_REPORT" as const;
export const SESSION_INVERT_REPORT = "SESSION_INVERT_REPORT" as const;
export const SESSION_SHOW_HELP = "SESSION_SHOW_HELP" as const;
export const SESSION_HIDE_HELP = "SESSION_HIDE_HELP" as const;
export const SESSION_SET_SKIPPED = "SESSION_SET_SKIPPED" as const;
export const SESSION_RESET = "SESSION_RESET" as const;
export const SESSION_SET_EXPANDED = "SESSION_SET_EXPANDED" as const;
export const SESSION_SET_FONT_SIZE = "SESSION_SET_FONT_SIZE" as const;

// Action Creators using GenericAction
export type ApiCallAction = GenericAction<typeof SESSION_API_CALL, boolean>;
export type EmptyBatchAction = GenericAction<typeof SESSION_EMPTY_BATCH, Error>;
export type FirstBatchReceivedAction = GenericAction<typeof SESSION_FIRST_BATCH_RECEIVED, BatchInfo>;
export type NextBatchReceivedAction = GenericAction<typeof SESSION_NEXT_BATCH_RECEIVED, BatchInfo>;
export type ResultReceivedAction = GenericAction<typeof SESSION_RESULT_RECEIVED, FinishInfo>;

export type ShowNextQuestionInBatchAction = GenericAction<typeof SESSION_SHOW_NEXT_QUESTION_IN_BATCH>;
export type ShowPrevQuestionInBatchAction = GenericAction<typeof SESSION_SHOW_PREV_QUESTION_IN_BATCH>;

export type PutHelpAction = GenericAction<typeof SESSION_PUT_HELP, { questionId: number; help: Help }>;
export type PutStarAction = GenericAction<typeof SESSION_PUT_STAR, { questionId: number; star: Stars }>;
export type PutReportAction = GenericAction<typeof SESSION_PUT_REPORT, { questionId: number; report: Complaint }>;
export type PutResponseAction = GenericAction<typeof SESSION_PUT_RESPONSE, {
    questionId: number;
    response: ResponseMCQ | ResponseFBSQ
}>;
export type PutResponseCheckedAction = GenericAction<typeof SESSION_PUT_RESPONSE_CHECKED, {
    questionId: number;
    checked: QuestionResult;
}>;

export type SetCancelledAction = GenericAction<typeof SESSION_SET_CANCELLED>;
export type SetPreservedAction = GenericAction<typeof SESSION_SET_PRESERVED, Map<string, string>>;
export type SetRetrievedAction = GenericAction<typeof SESSION_SET_RETRIEVED>;

export type SetContinuedAction = GenericAction<typeof SESSION_SET_CONTINUED>;
export type SetPausedAction = GenericAction<typeof SESSION_SET_PAUSED>;
export type SetProceededAction = GenericAction<typeof SESSION_SET_PROCEEDED>;

export type ShowReportAction = GenericAction<typeof SESSION_SHOW_REPORT>;
export type HideReportAction = GenericAction<typeof SESSION_HIDE_REPORT>;
export type InvertReportAction = GenericAction<typeof SESSION_INVERT_REPORT>;

export type ShowHelpAction = GenericAction<typeof SESSION_SHOW_HELP>;
export type HideHelpAction = GenericAction<typeof SESSION_HIDE_HELP>;

export type SetSkippedAction = GenericAction<typeof SESSION_SET_SKIPPED, number>;

export type ResetSessionAction = GenericAction<typeof SESSION_RESET>;
export type SetExpandedAction = GenericAction<typeof SESSION_SET_EXPANDED>;
export type SetFontSizeAction = GenericAction<typeof SESSION_SET_FONT_SIZE>;

// Union of All Actions
export type SessionActions =
    | ApiCallAction
    | EmptyBatchAction
    | FirstBatchReceivedAction
    | NextBatchReceivedAction
    | ResultReceivedAction
    | ShowNextQuestionInBatchAction
    | ShowPrevQuestionInBatchAction
    | PutHelpAction
    | PutStarAction
    | PutReportAction
    | PutResponseAction
    | PutResponseCheckedAction
    | SetCancelledAction
    | SetPreservedAction
    | SetRetrievedAction
    | SetContinuedAction
    | SetPausedAction
    | SetProceededAction
    | ShowReportAction
    | HideReportAction
    | InvertReportAction
    | ShowHelpAction
    | HideHelpAction
    | SetSkippedAction
    | ResetSessionAction
    | SetExpandedAction
    | SetFontSizeAction;

// Action Creators
export const apiCall = (isLoaded: boolean): ApiCallAction => ({
    type: SESSION_API_CALL,
    payload: isLoaded,
});

export const emptyBatch = (): EmptyBatchAction => ({
    type: SESSION_EMPTY_BATCH,
    payload: new Error("No Questions found in the first batch"),
});

export const firstBatchReceived = (batch: BatchInfo): FirstBatchReceivedAction => ({
    type: SESSION_FIRST_BATCH_RECEIVED,
    payload: batch,
});

export const nextBatchReceived = (batch: BatchInfo): NextBatchReceivedAction => ({
    type: SESSION_NEXT_BATCH_RECEIVED,
    payload: batch,
});

export const resultReceived = (result: FinishInfo): ResultReceivedAction => ({
    type: SESSION_RESULT_RECEIVED,
    payload: result,
});

export const showNext = (): ShowNextQuestionInBatchAction => ({
    type: SESSION_SHOW_NEXT_QUESTION_IN_BATCH,
});

export const showPrev = (): ShowPrevQuestionInBatchAction => ({
    type: SESSION_SHOW_PREV_QUESTION_IN_BATCH,
});

export const putHelp = (questionId: number, help: Help): PutHelpAction => ({
    type: SESSION_PUT_HELP,
    payload: {questionId, help},
});

export const putStar = (questionId: number, star: Stars): PutStarAction => ({
    type: SESSION_PUT_STAR,
    payload: {questionId, star},
});

export const putReport = (questionId: number, report: Complaint): PutReportAction => ({
    type: SESSION_PUT_REPORT,
    payload: {questionId, report},
});

export const putResponse = (questionId: number, response: ResponseMCQ | ResponseFBSQ): PutResponseAction => ({
    type: SESSION_PUT_RESPONSE,
    payload: {questionId, response},
});

export const putResponseChecked = (questionId: number, checked: QuestionResult): PutResponseCheckedAction => ({
    type: SESSION_PUT_RESPONSE_CHECKED,
    payload: {questionId, checked},
});

export const setPreserved = (key: Map<string, string>): SetPreservedAction => ({
    type: SESSION_SET_PRESERVED,
    payload: key,
});

export const setRetrieved = (): SetRetrievedAction => ({
    type: SESSION_SET_RETRIEVED,
});

export const setContinued = (): SetContinuedAction => ({
    type: SESSION_SET_CONTINUED,
});

export const setCancelled = (): SetCancelledAction => ({
    type: SESSION_SET_CANCELLED,
});

export const setPaused = (): SetPausedAction => ({
    type: SESSION_SET_PAUSED,
});

export const setProceeded = (): SetProceededAction => ({
    type: SESSION_SET_PROCEEDED,
});

export const showReport = (): ShowReportAction => ({
    type: SESSION_SHOW_REPORT,
});

export const hideReport = (): HideReportAction => ({
    type: SESSION_HIDE_REPORT,
});

export const invertReport = (): InvertReportAction => ({
    type: SESSION_INVERT_REPORT,
});

export const showHelp = (): ShowHelpAction => ({
    type: SESSION_SHOW_HELP,
});

export const hideHelp = (): HideHelpAction => ({
    type: SESSION_HIDE_HELP,
});

export const setSkipped = (questionId: number): SetSkippedAction => ({
    type: SESSION_SET_SKIPPED,
    payload: questionId,
});

export const resetSession = (): ResetSessionAction => ({
    type: SESSION_RESET,
});

export const setExpanded = (): SetExpandedAction => ({
    type: SESSION_SET_EXPANDED,
});

export const setFontSize = (): SetFontSizeAction => ({
    type: SESSION_SET_FONT_SIZE,
});

// Async Actions (Thunks)
export const getStarted = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.start(schemeId, isLMS).then((batchInfo: BatchInfo): void => {
            dispatch(resetSession());
            const questions: Array<Question> = batchInfo.questions;
            if (questions === null || questions.length === 0) {
                dispatch(emptyBatch());
            } else {
                dispatch(firstBatchReceived(batchInfo));
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to start a session", error, SessionErrorLocationsEnum.Start, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getNext = (schemeId: number, isLMS: boolean, batch: any) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.next(schemeId, isLMS, batch).then((batchInfo: BatchInfo): void => {
            const questions = batchInfo.questions;
            if (questions === null || questions.length === 0) {
                // For dynamic sessions
                // Empty batch detected, do finish call
                dispatch(getFinished(schemeId, isLMS));
            } else {
                dispatch(nextBatchReceived(batchInfo));
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to do next request", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getCurrent = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.current(schemeId, isLMS).then((batchInfo: BatchInfo): void => {
            dispatch(nextBatchReceived(batchInfo));
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to do current request", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getCancelled = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.cancel(schemeId, isLMS).then((finishInfo: FinishInfo): void => {
            dispatch(resultReceived(finishInfo));
            dispatch(setCancelled());
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to cancel the session", error, SessionErrorLocationsEnum.Session, dispatch); // Location can be from Opened component
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getFinished = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.finish(schemeId, isLMS).then((finishInfo: FinishInfo): void => {
            dispatch(resultReceived(finishInfo));
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to finish the session", error, SessionErrorLocationsEnum.Finish, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getFinishedBatch = (schemeId: number, isLMS: boolean, batch: BatchInfo) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.finish_batch(schemeId, isLMS, batch).then((finishInfo: FinishInfo): void => {
            dispatch(resultReceived(finishInfo));
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to finish the session with last batch", error, SessionErrorLocationsEnum.Finish, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getPreserved = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.preserve(schemeId, isLMS).then((preserved: Map<string, string>): void => {
            dispatch(setPreserved(preserved));
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to preserve the session", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getRetrieved = (key: string, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.retrieve(key, isLMS).then((batchInfo: BatchInfo): void => {
            dispatch(nextBatchReceived(batchInfo));
            dispatch(setRetrieved());
            dispatch(setProceeded()); // Automatically unpause if any
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to retrieve the session", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getPaused = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.pause(schemeId, isLMS).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(setPaused());
            } else {
                throw new Error("Failed to execute API to pause the session!");
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to pause the session", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getProceeded = (schemeId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.proceed(schemeId, isLMS).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(setProceeded());
            } else {
                throw new Error("Failed to execute API to proceed after pause the session!");
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to proceed the session after pause", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getSkipped = (schemeId: number, questionId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.skip(schemeId, questionId, isLMS).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(setSkipped(questionId));
            } else {
                throw new Error("Failed to execute API to skip a question!");
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to skip the question", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

// TODO: add more impl for responses
export const getChecked = (schemeId: number, isLMS: boolean, questionId: number, response: ResponseMCQ | ResponseFBSQ) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        const promise: Promise<QuestionResult> =
            !response ? sessionAPI.shows(schemeId, questionId, isLMS) : sessionAPI.check(schemeId, isLMS, response);
        promise.then((questionResult: QuestionResult): void => {
            dispatch(putResponseChecked(questionId, questionResult));
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to check the response to the question", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getStarred = (schemeId: number, questionId: number, isLMS: boolean, stars: number) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        const s: Stars = {
            questionId: questionId,
            stars: stars,
        };
        sessionAPI.star(schemeId, questionId, isLMS, s).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(putStar(questionId, s));
            } else {
                throw new Error("Failed to execute API to star a question!");
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to get the question starred", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const getReported = (schemeId: number, questionId: number, isLMS: boolean, complaintTypeIds: Array<number>) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        const c: Complaint = {
            questionId: questionId,
            complaintTypeIds: complaintTypeIds,
        };
        sessionAPI.report(schemeId, questionId, isLMS, c).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(hideReport());
                dispatch(putReport(questionId, c));
            } else {
                throw new Error("Failed to execute API to complain a question!");
            }
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to complain about the question", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

export const fetchHelp = (schemeId: number, questionId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<SessionActions | any>): void => {
        dispatch(failureActions.resetFailure());
        dispatch(apiCall(false));
        sessionAPI.help(schemeId, questionId, isLMS).then((help: Help): void => {
            dispatch(putHelp(questionId, help));
            dispatch(showHelp());
        }).catch((error: AxiosError | Error): void => {
            dispatchFailure("Failed to get help on the question", error, SessionErrorLocationsEnum.Session, dispatch);
        }).finally(() => dispatch(apiCall(true)));
    };
};

// Helper Function for Dispatching Failure Actions
const dispatchFailure = (message: string, error: AxiosError | Error, location: string, dispatch: Dispatch<any>) => {
    if (!axios.isAxiosError(error)) {
        dispatch(failureActions.setFailure(error.message, message, location.toString()));
    } else {
        dispatch(failureActions.setFailureWithBody(error.response?.data as ServerError, message, location.toString()));
    }
};
