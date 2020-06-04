import {dev} from "../../profile";

const testInitState = {
    contentMin: [
        {
            gradingId: 1,
            name: "four-point",
            description: "Classic 4 points grading system {2, 3, 4, 5}",
        },
        {
            gradingId: 2,
            name: "two-point",
            description: "Classic 2 points grading system {0, 1} or {passed, not passed}",
        },
        {
            gradingId: 3,
            name: "free-point",
            description: "Universal discrete grading system {min, ..., max}",
        }
    ]
}

const initState = {
    contentMin: null,
}

export const gradingReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SET_ALL_GRADINGS_MIN": {
            const contentMin = action.payload;
            return {contentMin};
        }
        default:
            return state;
    }
}