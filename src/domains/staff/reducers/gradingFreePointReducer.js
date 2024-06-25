const testInitState = {
    content: [
        {
            freeId: 1,
            name: "LMS",
            minValue: 0,
            passValue: 0.5,
            maxValue: 1,
            isDefault: true,
            staff: {
                staffId: 1,
                name: "Andrew",
                surname: "Smith",
                position: "instructor"
            }
        },
        {
            freeId: 2,
            name: "ECTS",
            minValue: 0,
            passValue: 100,
            maxValue: 200,
            isDefault: false,
            staff: {
                staffId: 1,
                name: "Andrew",
                surname: "Smith",
                position: "instructor"
            }
        }
    ],
    isProcessing: false,
    error: null
}

const initState = {
    content: [],
    isProcessing: false,
    error: null
}

export const gradingFreePointReducer = (state = initState, action) => {
    switch (action.type) {
        case "PROCESSING_FREE": {
            return {...state, isProcessing: action.isProcessing};
        }
        case "PROCESSING_FREE_FAILURE": {
            console.log("Error processing a free!", action.error);
            return {...state, error: action.error};
        }
        case "PROCESSING_FREE_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_PROCESSING_FREE_FAILURE": {
            return {...state, error: null, message: null};
        }

        case "SET_ALL_FREES": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_FREE_IN_STORE": {
            const free = action.payload;
            return {...state, content: [...state.content, free]};
        }
        case "UPDATE_FREE_IN_STORE": {
            const free = action.payload;
            return {...state, content: state.content.map(g => g.freeId === free.freeId ? free : g)};
        }
        case "DELETE_FREE_FROM_STORE": {
            const {freeId} = action;
            return {...state, content: state.content.filter(g => g.freeId !== freeId)}
        }
        default:
            return state;
    }
}