const initState = {
    "userId": 1,
    "name": "Staff",
    "surname": "Staff",
    "email": "staff.staff@example.com",
    "role": "ROLE_GLOBAL-ADMIN",
    "lms": false,
    "staff": {
        "position": {
            "posId": 1,
            "name": "System admin"
        },
        "department": {
            "depId": 1,
            "name": "Department"
        }
    }
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_USER_INFO": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_USER_INFO_FAILURE": {
            return {...state, error: action.error};
        }
        case "SET_USER_INFO": {
            return action.payload;
        }
        case "CLEAR_USER_INFO": {
            return {};
        }
        default:
            return state;
    }
}