const testInitState = {
    contentMin: [
        {
            accessId: 1,
            name: "dep-private"
        },
        {
            accessId: 2,
            name: "private"
        }
    ]
}

const initState = {
    contentMin: [],
}

export const accessReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_ALL_ACCESSES_MIN": {
            const contentMin = action.payload;
            return {...state, contentMin};
        }
        default:
            return state;
    }
}