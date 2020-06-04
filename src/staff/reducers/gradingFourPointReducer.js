import {dev} from "../../profile";

const testInitState = {
    content: [
        {
            fourId:1,
            name:"standard",
            threshold3: 50,
            threshold4: 70,
            threshold5: 85,
            isDefault: true,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        },
        {
            fourId:2,
            name:"lower",
            threshold3: 40,
            threshold4: 60,
            threshold5: 75,
            isDefault: false,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        },
        {
            fourId:3,
            name:"higher",
            threshold3: 60,
            threshold4: 75,
            threshold5: 95,
            isDefault: false,
            staff: {
                staffId:1,
                name:"Andrew",
                surname:"Smith",
                position:"instructor"
            }
        }
    ],
    isProcessing: false,
    error: null
}

const initState = {
    content: null,
    isProcessing: false,
    error: null
}

export const gradingFourPointReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "PROCESSING_FOUR": {
            return {...state, isProcessing: action.isProcessing};
        }
        case "PROCESSING_FOUR_FAILURE": {
            console.log("Error processing a four!", action.error);
            return {...state, error: action.error};
        }
        case "PROCESSING_FOUR_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_PROCESSING_FOUR_FAILURE": {
            return {...state, error: null, message: null};
        }

        case "SET_ALL_FOURS": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_FOUR_IN_STORE": {
            const four = action.payload;
            return {...state, content: [...state.content, four]};
        }
        case "UPDATE_FOUR_IN_STORE": {
            const four = action.payload;
            return {...state, content: state.content.map(g => g.fourId === four.fourId ? four: g)};
        }
        case "DELETE_FOUR_FROM_STORE": {
            const {fourId} = action;
            return {...state, content: state.content.filter(g => g.fourId !== fourId)}
        }
        default:
            return state;
    }
}