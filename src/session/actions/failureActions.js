const RESET_FAILURE = "RESET_FAILURE";
const CLOSE_FAILURE = "CLOSE_FAILURE";
const SET_FAILURE = "SET_FAILURE";
const SET_FAILURE_WITH_BODY = "SET_FAILURE_WITH_BODY";

export const resetFailure = () => ({type: RESET_FAILURE});
export const closeFailure = () => ({type: CLOSE_FAILURE});
export const setFailure = (error, message, location) => ({type: SET_FAILURE, error, message, location});
export const setFailureWithBody = (body, message, location) => ({type: SET_FAILURE_WITH_BODY, body, message, location});
