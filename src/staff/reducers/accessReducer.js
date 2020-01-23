const testInitState = {
    contentMin: [
        {
            accessId: 1,
            name: "private"
        },
        {
            accessId: 2,
            name: "dep-private"
        }
    ]
}

const initState = {
    contentMin: null,
}

export const accessReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_ALL_ACCESSES_MIN": {
            const contentMin = action.payload;
            return {contentMin};
        }
        default:
            return state;
    }
}