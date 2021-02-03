import appAPI from "../_api/appAPI";

const PERFORMING_PASS_RESET = "PERFORMING_PASS_RESET";
const PERFORMING_PASS_RESET_FAILURE = "PERFORMING_PASS_RESET_FAILURE";

export const performing = isPerforming => ({type: PERFORMING_PASS_RESET, isPerforming});
export const performingFailure = error => ({type: PERFORMING_PASS_RESET_FAILURE, error});

export const getPasswordReset = email => {
    return (dispatch) => {
        dispatch(performing(true));
        appAPI.resetPassword(email).then(() => {
            console.log("Successfully sent a confirmation email!");
        }).catch(e => {
            console.log("Failed to send a confirmation email..", e);
            dispatch(performingFailure(new Error("Failed to send a confirmation email..")));
        }).finally(() => dispatch(performing(false)));
    }
}
