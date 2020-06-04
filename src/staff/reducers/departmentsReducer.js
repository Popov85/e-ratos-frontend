import {dev} from "../../profile";

const testInitState = {
    content: [
        {
            depId: 1,
            name: "Dep #1",
            faculty : {
                facId: 1,
                name: "Fac #1",
                organisation: {
                    "orgId": 1,
                    "name": "University of USA"
                },
            }
        },
        {
            depId: 2,
            name: "Dep #2",
            faculty : {
                facId: 2,
                name: "Fac #2",
                organisation: {
                    "orgId": 2,
                    "name": "University of Florida"
                },
            }
        },
        {
            depId: 3,
            name: "Dep #3",
            faculty : {
                facId: 3,
                name: "Fac #3",
                organisation: {
                    "orgId": 3,
                    "name": "University of San-Francisco"
                }
            }
        },
    ],
    isLoading: false,
    error: null
}

const initState = {
    content: null,
    isLoading: false,
    error: null
}

export const departmentsReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_ALL_DEP": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_DEP_FAILURE": {
            console.log("Error loading departments!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_DEP_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_DEP": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_DEP_FAILURE": {
            console.log("Error updating a department!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_DEP_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_DEP_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_DEP": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_DEP_IN_STORE": {
            const dep = action.payload;
            return {...state, content: [...state.content, dep]};
        }
        case "UPDATE_DEP_IN_STORE": {
            const dep = action.payload;
            return {...state, content: state.content.map(d => d.depId === dep.depId ? dep : d)}
        }
        case "UPDATE_DEP_NAME_IN_STORE": {
            const {depId, name} = action;
            return {...state, content: state.content.map(d => d.depId === depId ? {...d, name} : d)}
        }
        case "DELETE_DEP_FROM_STORE": {
            const {depId} = action;
            return {...state, content: state.content.filter(d => d.depId !== depId)}
        }
        default:
            return state;
    }
}