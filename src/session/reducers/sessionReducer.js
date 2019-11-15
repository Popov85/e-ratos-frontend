const initState = {
    status: "init", // {"init", "started", "finished", "cancelled", "preserved"}

    isLoaded: true,

    batch: null,
    batchNumber: 1,
    questionNumber: 0,

    help: false,
    report: false,
    paused: false,

    stars: new Map(),
    helps: new Map(),
    reports: new Map(),
    responses: new Map(),
    responsesChecked: new Map(),

    preserved: {key: null},

    result: null
}

export const sessionReducer = (state = initState, action) => {
    switch (action.type) {
        case "API_CALL": {
            return {...state, isLoaded: action.isLoaded};
        }
        case "RESET_SESSION": {
            //console.log("RESET_SESSION");
            return initState;
        }
        case "SET_CANCELLED": {
            return {...state, status: "cancelled"};
        }
        case "SET_PRESERVED": {
            return {...state, status: "preserved", preserved: {key: action.key}};
        }
        case "SET_RETRIEVED": {
            return {...state, status: "started", preserved: {key: null}};
        }
        case "SET_PAUSED": {
            return {...state, paused: true};
        }
        case "SET_PROCEEDED": {
            return {...state, paused: false};
        }
        case "SHOW_REPORT": {
            return {...state, report: true};
        }
        case "HIDE_REPORT": {
            return {...state, report: false};
        }
        case "INVERT_REPORT": {
            return {...state, report: !state.report};
        }
        case "SHOW_HELP": {
            return {...state, help: true};
        }
        case "HIDE_HELP": {
            return {...state, help: false};
        }
        case "EMPTY_FIRST_BATCH": {
            return {...state, error: action.error};
        }
        case "PUT_HELP": {
            let newMap = new Map(state.helps);
            newMap.set(action.questionId, action.help);
            return {...state, helps: newMap};
        }
        case "PUT_STAR": {
            let newMap = new Map(state.stars);
            newMap.set(action.questionId, action.star);
            return {...state, stars: newMap};
        }
        case "PUT_REPORT": {
            let newMap = new Map(state.reports);
            newMap.set(action.questionId, action.report);
            return {...state, reports: newMap};
        }
        case "PUT_RESPONSE": {
            let newMap = new Map(state.responses);
            newMap.set(action.questionId, action.response);
            //console.log("After inserting the map = ", newMap);
            return {...state, responses: newMap};
        }
        case "PUT_RESPONSE_CHECKED": {
            let newMap = new Map(state.responsesChecked);
            newMap.set(action.questionId, action.checked);
            return {...state, responsesChecked: newMap};
        }
        case "FIRST_BATCH_RECEIVED": {
            return {...state, status: "started", batch: action.payload};
        }
        case "NEXT_BATCH_RECEIVED": {
            return {
                ...state,
                status: "started",
                report: false,
                batch: action.payload,
                responses: new Map(),
                responsesChecked: new Map(),
                batchNumber: state.status!=="preserved" ? state.batchNumber + 1 : state.batchNumber,
                questionNumber: 0
            };
        }
        case "RESULT_RECEIVED": {
            return {...state, status: "finished", result: action.payload};
        }
        case "SHOW_NEXT_QUESTION_IN_BATCH": {
            let currentNumber = state.questionNumber;
            if (currentNumber < state.batch.questions.length - 1)
                return {...state, questionNumber: state.questionNumber + 1, report: false};
            return state;
        }
        case "SHOW_PREV_QUESTION_IN_BATCH": {
            let currentNumber = state.questionNumber;
            if (currentNumber > 0) return {...state, questionNumber: currentNumber - 1, report: false};
            return state;
        }
        case "SET_PRESERVED": {
            return {...state, preserved: {state: true, key: action.key}};
        }
        case "SET_CONTINUED": {
            return {...state, preserved: {state: false, key: null}};
        }
        case "SET_SKIPPED": {
            const {batch, responses, questionNumber} = state;
            let newQuestionNumber = state.questionNumber;
            // Only if you skip the last question in the batch decrement counter;
            if (batch.questions.length > 1 &&
                batch.questions.length - 1 === questionNumber) --newQuestionNumber;
            // Delete from responses map by questionId
            const reducedResponses = new Map(responses);
            reducedResponses.delete(action.questionId);
            // Delete from current batch questions array by questionId
            const reducedQuestions = batch.questions
                .filter(q => q.questionId !== action.questionId);
            const reducedBatch = {...batch, questions: reducedQuestions};
            return {...state, batch: reducedBatch, responses: reducedResponses, questionNumber: newQuestionNumber};
        }

        default:
            return state;
    }
}