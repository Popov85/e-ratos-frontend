import {dev} from "../../profile";

const testInitState = {
    content: [
        {
            setId:1,
            name: "default",
            secondsPerQuestion: 60,
            questionsPerSheet: 1,
            daysKeepResultDetails: 7,
            level2Coefficient: 1.25,
            level3Coefficient: 1.5,
            strictControlTimePerQuestion: true,
            isDefault: true,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        },
        {
            setId:2,
            name: "custom",
            secondsPerQuestion: 30,
            questionsPerSheet: 4,
            daysKeepResultDetails: 1,
            level2Coefficient: 1.1,
            level3Coefficient: 1.2,
            strictControlTimePerQuestion: false,
            isDefault: false,
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

export const settingsReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_ALL_SETTINGS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_SETTINGS_FAILURE": {
            console.log("Error loading settings!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_SETTINGS_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_SETTINGS": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_SETTINGS_FAILURE": {
            console.log("Error updating a settings!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_SETTINGS_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_SETTINGS_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_SETTINGS": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_SETTINGS_IN_STORE": {
            const settings = action.payload;
            return {...state, content: [...state.content, settings]};
        }
        case "UPDATE_SETTINGS_IN_STORE": {
            const settings = action.payload;
            return {...state, content: state.content.map(s => s.setId === settings.settingsId ? settings: s)};
        }
        case "UPDATE_SETTINGS_NAME_IN_STORE": {
            const {settingsId, name} = action;
            return {...state, content: state.content.map(s => s.setId === settingsId ? {...s, name} : s)}
        }
        case "DELETE_SETTINGS_FROM_STORE": {
            const {settingsId} = action;
            return {...state, content: state.content.filter(s => s.setId !== settingsId)}
        }
        default:
            return state;
    }
}