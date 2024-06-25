const testInitState = {
    content: [
        {
            twoId: 1,
            name: "weak",
            threshold: 50,
            isDefault: true,
            staff: {
                staffId: 1,
                name: "Andrew",
                surname: "Smith",
                position: "instructor"
            }
        },
        {
            twoId: 2,
            name: "moderate",
            threshold: 70,
            isDefault: false,
            staff: {
                staffId: 1,
                name: "Andrew",
                surname: "Smith",
                position: "instructor"
            }
        },
        {
            twoId: 3,
            name: "strong",
            threshold: 90,
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

export const gradingTwoPointReducer = (state = initState, action) => {
    switch (action.type) {
        case "PROCESSING_TWO": {
            return {...state, isProcessing: action.isProcessing};
        }
        case "PROCESSING_TWO_FAILURE": {
            console.log("Error processing a two!", action.error);
            return {...state, error: action.error};
        }
        case "PROCESSING_TWO_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_PROCESSING_TWO_FAILURE": {
            return {...state, error: null, message: null};
        }

        case "SET_ALL_TWOS": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_TWO_IN_STORE": {
            const two = action.payload;
            return {...state, content: [...state.content, two]};
        }
        case "UPDATE_TWO_IN_STORE": {
            const two = action.payload;
            return {...state, content: state.content.map(g => g.twoId === two.twoId ? two : g)};
        }
        case "DELETE_TWO_FROM_STORE": {
            const {twoId} = action;
            return {...state, content: state.content.filter(g => g.twoId !== twoId)}
        }
        default:
            return state;
    }
}