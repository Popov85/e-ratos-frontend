const initState = {
    isLoading: false,
    ORG: [
        {orgId: "", name: "Select"},
    ],
    FAC: [
        {facId: "", name: "Select"},
    ],
    CLA: [
        {classId: "", name: "Select"},
    ],
    // TODO: remove for prod
    savedCredentials: {
        email: "global.admin@example.com",
        password: "jS5ph7Wm"
    },
    isLoadingRegOptions: false,
    regOptions: null
}

export const registrationReducer = (state = initState, action) => {
    switch (action.type) {
        case "REGISTERING": {
            return {...state, isLoading: action.isLoading};
        }
        case "REGISTERING_FAILURE": {
            console.log("Error during registration!", action.error);
            return {...state, error: action.error};
        }
        case "RESET_REGISTERING_FAILURE": {
            return {...state, error: null};
        }
        case "SET_REGISTERED_CREDENTIALS": {
            console.log("action.payload", action.payload.user);
            const {email, password} = action.payload.user;
            console.log("Credentials = ", email, password);
            return {
                ...state, savedCredentials: {
                    email: email,
                    password: password
                }
            };
        }
        case "CLEAR_REGISTERED_CREDENTIALS": {
            return {...state, savedCredentials: null};
        }
        case "LOADING_DERIVED_ORGANISATION": {
            return {...state, isLoadingDO: action.isLoading};
        }
        case "REGISTERING_FAILURE": {
            console.log("Error fetching derived organisation!", action.error);
            return {...state, errorDO: action.error};
        }
        case "SET_DERIVED_ORGANISATION": {
            return {...state, DO: action.payload};
        }
        case "LOADING_ORGANISATIONS": {
            return {...state, isLoadingO: action.isLoading};
        }
        case "LOADING_ORGANISATIONS_FAILURE": {
            console.log("Error fetching organisations!", action.error);
            return {...state, errorO: action.error};
        }
        case "SET_ORGANISATIONS": {
            let organisations = action.payload;
            organisations.unshift({orgId: "", name: "Select"});
            return {...state, ORG: organisations};
        }
        case "CLEAR_ORGANISATIONS": {
            let organisations = [];
            organisations.unshift({orgId: "", name: "Select"});
            return {...state, ORG: organisations};
        }
        case "LOADING_FACULTIES": {
            return {...state, isLoadingF: action.isLoading};
        }
        case "LOADING_FACULTIES_FAILURE": {
            console.log("Error fetching faculties!", action.error);
            return {...state, errorF: action.error};
        }
        case "SET_FACULTIES": {
            let faculties = action.payload;
            faculties.unshift({facId: "", name: "Select"});
            return {...state, FAC: faculties};
        }
        case "CLEAR_FACULTIES": {
            let faculties = [];
            faculties.unshift({facId: "", name: "Select"});
            return {...state, FAC: faculties};
        }
        case "LOADING_CLASSES": {
            return {...state, isLoadingC: action.isLoading};
        }
        case "LOADING_CLASSES_FAILURE": {
            console.log("Error fetching classes!", action.error);
            return {...state, errorC: action.error};
        }
        case "SET_CLASSES": {
            let classes = action.payload;
            classes.unshift({classId: "", name: "Select"});
            return {...state, CLA: classes};
        }
        case "CLEAR_CLASSES": {
            let classes = [];
            classes.unshift({classId: "", name: "Select"});
            return {...state, CLA: classes};
        }
        case "LOADING_REG_OPTIONS": {
            return {...state, isLoadingRegOptions: action.payload};
        }
        case "LOADING_REG_OPTIONS_FAILURE": {
            return {...state, errorLoadingRegOptions: action.payload};
        }
        case "SET_REG_OPTIONS": {
            return {...state, regOptions: action.payload};
        }
        default:
            return state;
    }
}


