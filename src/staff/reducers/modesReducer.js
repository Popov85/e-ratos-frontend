import {dev} from "../../profile";

const testInitState = {
    content: [
        {
            modeId: 1,
            name: "exam",
            helpable: false,
            pyramid: false,
            skipable: false,
            rightAnswer: false,
            pauseable: false,
            preservable: false,
            reportable: false,
            starrable: false,
            isDefault: true,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        },
        {
            modeId: 2,
            name: "training",
            helpable: true,
            pyramid: true,
            skipable: true,
            rightAnswer: true,
            pauseable: true,
            preservable: true,
            reportable: true,
            starrable: true,
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

export const modesReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_ALL_MODES": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_MODES_FAILURE": {
            console.log("Error loading modes!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_MODES_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_MODE": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_MODE_FAILURE": {
            console.log("Error updating a modes!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_MODE_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_MODE_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_MODES": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_MODE_IN_STORE": {
            const mode = action.payload;
            return {...state, content: [...state.content, mode]};
        }
        case "UPDATE_MODE_IN_STORE": {
            const mode = action.payload;
            return {...state, content: state.content.map(m => m.modeId === mode.modeId ? mode: m)};
        }
        case "UPDATE_MODE_NAME_IN_STORE": {
            const {modeId, name} = action;
            return {...state, content: state.content.map(m => m.modeId === modeId ? {...m, name} : m)}
        }
        case "DELETE_MODE_FROM_STORE": {
            const {modeId} = action;
            return {...state, content: state.content.filter(m => m.modeId !== modeId)}
        }
        default:
            return state;
    }
}