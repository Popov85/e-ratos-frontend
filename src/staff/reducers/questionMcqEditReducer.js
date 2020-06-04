import {dev} from "../../profile";

const testInitState = {
    isLoading: false,
    report: {
        questions: 3,
        invalid: 1,
        issues: 5,
        majorIssues: 5,
        mediumIssues: 0,
        minorIssues: 0,
        charset: "UTF-8",
        allIssues:[
            {
                "description": ".txt parsing error: unexpected question start!",
                "severity": "MAJOR",
                "row": 69
            },
            {
                "description": ".txt parsing error: unexpected question start!",
                "severity": "MAJOR",
                "row": 66
            },
            {
                "description": ".txt parsing error: unexpected answerIds start!",
                "severity": "MAJOR",
                "row": 72
            },
            {
                "description": ".txt parsing error: unexpected answerIds start!",
                "severity": "MAJOR",
                "row": 73
            },
            {
                "description": ".txt parsing error: unexpected answerIds start!",
                "severity": "MAJOR",
                "row": 74
            }
        ],
        saved: false
    }
}

const initState = {
    isLoading: false,
    report: null
}

export const questionMcqEditReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SAVING_QUESTION_MCQ": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_QUESTION_MCQ_FAILURE": {
            console.log("Error saving a MCQ!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_QUESTION_MCQ_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_QUESTION_MCQ": {
            return {...state, error: null, message: null, report: null};
        }
        case "ADD_REPORT_ON_ISSUES_WHEN_PARSING_FROM_FILE": {
            return {...state, report: action.payload};
        }
        default:
            return state;
    }
}