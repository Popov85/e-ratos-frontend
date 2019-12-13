const initState = {
    message: null
}

export const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATING_USER_PROFILE": {
            return {...state, isProfileUpdating: action.isUpdating};
        }
        case "UPDATING_USER_PASSWORD": {
            return {...state, isPasswordUpdating: action.isUpdating};
        }
        case "UPDATING_USER_PROFILE_FAILURE": {
            return {...state, errorUpdatingProfile: action.error};
        }
        case "UPDATING_USER_PASSWORD_FAILURE": {
            return {...state, errorUpdatingPassword: action.error};
        }
        case "CLEAR_USER_PROFILE_FAILURE": {
            return {...state, errorUpdatingProfile: null, message: null};
        }
        case "CLEAR_USER_PASSWORD_FAILURE": {
            return {...state, errorUpdatingPassword: null, message: null};
        }
        case "SET_USER_PROFILE_UPDATED": {
            return {...state, message: action.payload};
        }
        case "SET_USER_PASSWORD_UPDATED": {
            return {...state, message: action.payload};
        }
        default:
            return state;
    }
}




