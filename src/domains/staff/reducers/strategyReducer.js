const testInitState = {
    contentMin: [
        {
            strId: 1,
            name: "default",
            description: "All questions go as it is by default"
        },
        {
            strId: 2,
            name: "random",
            description: "All questions are randomized"
        },
        {
            strId: 3,
            name: "types&levels",
            description: "All questions go first by types then by levels"
        }
    ]
}

const initState = {
    contentMin: [],
}

export const strategyReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_ALL_STRATEGIES_MIN": {
            const contentMin = action.payload;
            return {contentMin};
        }
        default:
            return state;
    }
}