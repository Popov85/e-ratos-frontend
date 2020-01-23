const testInitState = {
    content: [
        {
            facId: 1,
            name: "Fac #1",
            organisation: {
                "orgId": 1,
                "name": "University of USA"
            },
        },
        {
            facId: 2,
            name: "Fac #2",
            organisation: {
                "orgId": 2,
                "name": "University of Florida"
            },
        },
        {
            facId: 3,
            name: "Fac #3",
            organisation: {
                "orgId": 3,
                "name": "University of San-Francisco"
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

export const facultiesReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_ALL_FAC": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_FAC_FAILURE": {
            console.log("Error loading faculties!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_FAC_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_FAC": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_FAC_FAILURE": {
            console.log("Error updating a faculty!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_FAC_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_FAC_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_FAC": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_FAC_IN_STORE": {
            const fac = action.payload;
            return {...state, content: [...state.content, fac]};
        }
        case "UPDATE_FAC_IN_STORE": {
            const fac = action.payload;
            return {...state, content: state.content.map(f => f.facId === fac.facId ? fac : f)}
        }
        case "UPDATE_FAC_NAME_IN_STORE": {
            const {facId, name} = action;
            return {...state, content: state.content.map(f => f.facId === facId ? {...f, name} : f)}
        }
        case "DELETE_FAC_FROM_STORE": {
            const {facId} = action;
            return {...state, content: state.content.filter(f => f.facId !== facId)}
        }
        default:
            return state;
    }
}