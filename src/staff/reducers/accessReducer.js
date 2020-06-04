import {dev} from "../../profile";

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
    contentMin: null,
}

export const accessReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SET_ALL_ACCESSES_MIN": {
            const contentMin = action.payload;
            return {contentMin};
        }
        default:
            return state;
    }
}