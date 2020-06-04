import {dev} from "../../profile";

const testInitState = {
    content: [
        {
            optId:1,
            name: "exam",
            displayQuestionsLeft: true,
            displayBatchesLeft: true,
            displayCurrentScore: false,
            displayEffectiveScore: false,
            displayProgress: false,
            displayMotivationalMessages: false,
            displayResultScore: true,
            displayResultMark: true,
            displayTimeSpent: true,
            displayResultOnThemes: true,
            displayResultOnQuestions: false,
            isDefault: true,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        },
        {
            optId:2,
            name: "training",
            displayQuestionsLeft: true,
            displayBatchesLeft: true,
            displayCurrentScore: true,
            displayEffectiveScore: true,
            displayProgress: true,
            displayMotivationalMessages: true,
            displayResultScore: true,
            displayResultMark: true,
            displayTimeSpent: true,
            displayResultOnThemes: true,
            displayResultOnQuestions: true,
            isDefault: true,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        }
    ]
}

const initState = {
    content: null,
    isLoading: false,
    error: null
}

export const optionsReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_ALL_OPTIONS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_OPTIONS_FAILURE": {
            console.log("Error loading options!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_OPTIONS_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_OPTIONS": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_OPTIONS_FAILURE": {
            console.log("Error updating a options!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_OPTIONS_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_OPTIONS_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_OPTIONS": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_OPTIONS_IN_STORE": {
            const options = action.payload;
            return {...state, content: [...state.content, options]};
        }
        case "UPDATE_OPTIONS_IN_STORE": {
            const options = action.payload;
            return {...state, content: state.content.map(o => o.optId === options.optionsId ? options: o)};
        }
        case "UPDATE_OPTIONS_NAME_IN_STORE": {
            const {optionsId, name} = action;
            return {...state, content: state.content.map(o => o.optId === optionsId ? {...o, name} : o)}
        }
        case "DELETE_OPTIONS_FROM_STORE": {
            const {optionsId} = action;
            return {...state, content: state.content.filter(o => o.optId !== optionsId)}
        }
        default:
            return state;
    }
}