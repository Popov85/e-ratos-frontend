const testInitState = {
    content: [
        {
            themeId : 17,
            theme : "Lorem ipsum iprum fatum",
            totalByTheme : 21,
            typeLevelMap : {
                1 : {
                    type : "MCQ",
                    totalLevel1 : 21,
                    totalLevel2 : 0,
                    totalLevel3 : 0,
                    total : 21
                }
            }
        },
        {
            themeId : 55,
            theme : "Lorem ipsum iprum fatum two",
            totalByTheme : 85,
            typeLevelMap : {
                1 : {
                    type : "MCQ",
                    totalLevel1 : 30,
                    totalLevel2 : 15,
                    totalLevel3 : 10,
                    total : 55
                },
                2 : {
                    type : "FBSQ",
                    totalLevel1 : 10,
                    totalLevel2 : 5,
                    totalLevel3 : 5,
                    total : 20
                },
                3 : {
                    type : "MQ",
                    totalLevel1 : 10,
                    totalLevel2 : 0,
                    totalLevel3 : 0,
                    total : 10
                }
            }
        }
    ],
    isLoading: false,
    error: null
}

const initState = {
    content: [],
    isLoading: false,
    error: null
}

export const themesSupportReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_ONE_THEME_SUPPORT": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ONE_THEME_SUPPORT_FAILURE": {
            console.log("Error loading theme support data!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ONE_THEME_SUPPORT_FAILURE": {
            return {...state, error: null};
        }
        case "ADD_ONE_THEME_SUPPORT_IN_STORE": {
            let themeSupport = action.payload;
            return {...state, content: [...state.content, themeSupport]};
        }
        default:
            return state;
    }
}