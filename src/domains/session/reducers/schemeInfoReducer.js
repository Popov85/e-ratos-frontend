const testInitState = {
    schemeId: 1,
    name: "Scheme #1: Lorem fatrem, endes.",
    strategy: "random",
    questions: 20,
    timings: 60,
    batchTimeLimited: true,
    mode: {
        modeId: 1,
        name: "",
        helpable: true,
        pyramid: true,
        skipable: true,
        rightAnswer: true,
        resultDetails: true,
        preservable: true,
        pauseable: true,
        reportable: true,
        starrable: true
    },
    course: "",
    staff: "Adam Smakovsky",
    isLoading: false
}

const initState = {
    isLoading: true,
    errorScheme: null,
    schemeInfo: {}
}

export const schemeInfoReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_SCHEME_INFO": {
            return { ...state, isLoading: action.isLoading };
        }
        case "RESET_SCHEME_INFO_FAILURE": {
            return { ...state, errorScheme: null};
        }
        case "LOADING_SCHEME_INFO_FAILURE": {
            console.log("Error loading SchemeInfo!", action.error);
            return { ...state, errorScheme: action.error};
        }
        case "SET_SCHEME_INFO": {
            return { ...state, schemeInfo: action.payload};
        }
        default: return state;
    }
}