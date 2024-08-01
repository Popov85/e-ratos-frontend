import {BatchInfo, Question} from '../types/BatchInfo';
import {FinishInfo, QuestionResult} from '../types/FinishInfo';
import {Help} from '../types/Help';
import {SessionStatesEnum} from "../types/SessionStatesEnum";
import {
    SESSION_API_CALL,
    SESSION_EMPTY_BATCH,
    SESSION_FIRST_BATCH_RECEIVED, SESSION_HIDE_HELP, SESSION_HIDE_REPORT, SESSION_INVERT_REPORT,
    SESSION_NEXT_BATCH_RECEIVED, SESSION_PUT_HELP,
    SESSION_PUT_REPORT,
    SESSION_PUT_RESPONSE,
    SESSION_PUT_RESPONSE_CHECKED, SESSION_PUT_STAR, SESSION_RESET,
    SESSION_RESULT_RECEIVED, SESSION_SET_CANCELLED,
    SESSION_SET_EXPANDED,
    SESSION_SET_FONT_SIZE, SESSION_SET_PAUSED, SESSION_SET_PRESERVED, SESSION_SET_PROCEEDED, SESSION_SET_RETRIEVED,
    SESSION_SET_SKIPPED, SESSION_SHOW_HELP,
    SESSION_SHOW_NEXT_QUESTION_IN_BATCH,
    SESSION_SHOW_PREV_QUESTION_IN_BATCH, SESSION_SHOW_REPORT, SessionActions
} from "../actions/sessionActions";
import {Stars} from "../types/Stars";
import {Complaint} from "../types/Complain";
import {ResponseMCQ} from "../types/responses/impl/ResponseMCQ";
import {ResponseFBSQ} from "../types/responses/impl/ResponseFBSQ";

interface SessionState {
    status: SessionStatesEnum;
    isLoaded: boolean;
    batch: BatchInfo | null;
    batchNumber: number;
    questionNumber: number;
    help: boolean;
    report: boolean;
    paused: boolean;
    stars: Map<number, Stars>;
    helps: Map<number, Help>;
    reports: Map<number, Complaint>;
    responses: Map<number, ResponseMCQ | ResponseFBSQ>;
    responsesChecked: Map<number, QuestionResult>;
    preserved: Map<string, string>; // Java's singleton map is expected with single key being 'key'
    expanded: boolean;
    fontSize: number;
    result: FinishInfo | null;
    error: Error | null;
}

const initState: SessionState = {
    status: SessionStatesEnum.Init,
    isLoaded: true,
    batch: null,
    batchNumber: 1,
    questionNumber: 0,
    help: false,
    report: false,
    paused: false,
    stars: new Map<number, Stars>(),
    helps: new Map<number, Help>(),
    reports: new Map<number, Complaint>(),
    responses: new Map<number, ResponseMCQ | ResponseFBSQ>(),
    responsesChecked: new Map<number, QuestionResult>(),
    preserved: new Map<string, string>(),// Java's singleton map is expected with single key being 'key'
    expanded: false,
    fontSize: 16,
    result: null,
    error: null
};

export const sessionReducer = (state: SessionState = initState, action: SessionActions): SessionState => {
    switch (action.type) {
        case SESSION_API_CALL:
            return {...state, isLoaded: action.payload ?? false};
        case SESSION_RESET:
            return initState;
        case SESSION_SET_CANCELLED:
            return {...state, status: SessionStatesEnum.Cancelled};
        case SESSION_SET_PRESERVED:
            return {...state, status: SessionStatesEnum.Preserved, preserved: action.payload ?? new Map()};
        case SESSION_SET_RETRIEVED:
            return {...state, status: SessionStatesEnum.Started, preserved: new Map()};
        case SESSION_SET_PAUSED:
            return {...state, paused: true};
        case SESSION_SET_PROCEEDED:
            return {...state, paused: false};
        case SESSION_SHOW_REPORT:
            return {...state, report: true};
        case SESSION_HIDE_REPORT:
            return {...state, report: false};
        case SESSION_INVERT_REPORT:
            return {...state, report: !state.report};
        case SESSION_SHOW_HELP:
            return {...state, help: true};
        case SESSION_HIDE_HELP:
            return {...state, help: false};
        case SESSION_EMPTY_BATCH:
            return {...state, error: action.payload ?? null};
        case SESSION_PUT_HELP: {
            // Check if payload is defined before trying to access its properties
            if (action.payload) {
                const newMap: Map<number, Help> = new Map(state.helps);
                newMap.set(action.payload.questionId, action.payload.help);
                return {...state, helps: newMap};
            }
            // Return the current state by default
            return state;
        }
        case SESSION_PUT_STAR: {
            if (action.payload) {
                const newMap: Map<number, Stars> = new Map(state.stars);
                newMap.set(action.payload.questionId, action.payload.star);
                return {...state, stars: newMap};
            }
            // Return the current state by default
            return state;
        }
        case SESSION_PUT_REPORT: {
            if (action.payload) {
                const newMap: Map<number, Complaint> = new Map(state.reports);
                newMap.set(action.payload.questionId, action.payload.report);
                return {...state, reports: newMap};
            }
            return state;
        }
        case SESSION_PUT_RESPONSE: {
            if (action.payload) {
                const newMap: Map<number, ResponseMCQ | ResponseFBSQ> = new Map(state.responses);
                newMap.set(action.payload.questionId, action.payload.response);
                return {...state, responses: newMap};
            }
            return state;
        }
        case SESSION_PUT_RESPONSE_CHECKED: {
            if (action.payload) {
                const newMap: Map<number, QuestionResult> = new Map(state.responsesChecked);
                newMap.set(action.payload.questionId, action.payload.checked);
                return {...state, responsesChecked: newMap};
            }
            return state;
        }
        case SESSION_FIRST_BATCH_RECEIVED: {
            if (action.payload) {
                return {...state, status: SessionStatesEnum.Started, batch: action.payload};
            }
            return state;
        }
        case SESSION_NEXT_BATCH_RECEIVED: {
            if (action.payload) {
                return {
                    ...state,
                    status: SessionStatesEnum.Started,
                    report: false,
                    batch: action.payload,
                    responses: new Map(),
                    responsesChecked: new Map(),
                    batchNumber: state.status !== SessionStatesEnum.Preserved ? state.batchNumber + 1 : state.batchNumber,
                    questionNumber: 0,
                };
            }
            return state;
        }
        case SESSION_RESULT_RECEIVED: {
            if (action.payload) {
                return {...state, status: SessionStatesEnum.Finished, result: action.payload};
            }
            return state;
        }
        case SESSION_SHOW_NEXT_QUESTION_IN_BATCH: {
            const { batch, questionNumber } = state;
            // Check if batch and questions are defined and if there is a next question
            if (!batch || !batch.questions || questionNumber >= batch.questions.length - 1) {
                return state; // No batch, no questions, or already at the last question
            }
            // Move to the next question
            return {...state, questionNumber: questionNumber + 1, report: false};
        }
        case SESSION_SHOW_PREV_QUESTION_IN_BATCH: {
            const currentNumber: number = state.questionNumber;
            if (currentNumber > 0)
                return {...state, questionNumber: currentNumber - 1, report: false};
            return state;
        }
        case SESSION_SET_SKIPPED: {
            const { batch, responses, questionNumber } = state;

            // If payload is undefined or null, return the current state unchanged
            if (!action.payload || !batch || !batch.questions) {
                return state;
            }

            const skippedQuestionId: number = action.payload;

            const isLastQuestion: boolean = questionNumber === batch.questions.length - 1;
            const newQuestionNumber: number = (batch.questions.length > 1 && isLastQuestion)
                ? questionNumber - 1
                : questionNumber;

            // Remove the skipped question from the responses map
            const updatedResponses: Map<number, ResponseMCQ | ResponseFBSQ> = new Map(responses);
            updatedResponses.delete(skippedQuestionId);

            // Filter out the skipped question from the batch questions
            const updatedQuestions: Array<Question> = batch.questions.filter((q: Question): boolean => q.questionId !== skippedQuestionId);

            // Create a new batch with the updated questions list
            const updatedBatch: BatchInfo = { ...batch, questions: updatedQuestions };

            return {
                ...state,
                batch: updatedBatch,
                responses: updatedResponses,
                questionNumber: newQuestionNumber,
            };
        }

        case SESSION_SET_EXPANDED:
            return {...state, expanded: !state.expanded};
        case SESSION_SET_FONT_SIZE: {
            const currentFontSize = state.fontSize;
            return {...state, fontSize: currentFontSize <= 22 ? currentFontSize + 2 : 16,
            };
        }
        default:
            return state;
    }
};
