import { ServerError } from '../../common/types/ServerError';
import {
    CLOSE_SESSION_FAILURE,
    RESET_SESSION_FAILURE,
    SessionFailureActions,
    SET_SESSION_FAILURE, SET_SESSION_FAILURE_WITH_BODY
} from "../actions/failureActions";
import {SessionErrorsEnum} from "../types/SessionErrorsEnum";
import {SessionExceptionsEnum} from "../types/SessionExceptionsEnum";

type SessionFailureState =  {
    is: boolean;
    modal: boolean;
    type: SessionErrorsEnum | null;
    location: string | null;
    message: string | null;
    serverError: ServerError | string | null;
}

const initState: SessionFailureState = {
    is: false,
    modal: true,
    type: null,
    location: null,
    message: null,
    serverError: null,
};

export const failureReducer = (state: SessionFailureState = initState, action: SessionFailureActions): SessionFailureState => {
    switch (action.type) {
        case RESET_SESSION_FAILURE: {
            // Do it before each API call during session
            return initState;
        }
        case CLOSE_SESSION_FAILURE: {
            return { ...state, modal: false };
        }
        case SET_SESSION_FAILURE: {
            console.warn("Error occurred = ", action.payload?.error);
            return {
                ...state,
                is: true,
                location: action.payload?.location ?? null,
                message: action.payload?.message ?? null,
                serverError: action.payload?.error ?? null,
            };
        }
        case SET_SESSION_FAILURE_WITH_BODY: {
            const { body, location, message } = action.payload!;
            console.warn("Server error occurred = ", body);
            switch (body.exception) {
                case SessionExceptionsEnum.Opened: {
                    return {
                        ...state,
                        is: true,
                        location,
                        type: SessionErrorsEnum.Opened,
                        message: body.message,
                    };
                }
                case SessionExceptionsEnum.NotFound: {
                    return {
                        ...state,
                        is: true,
                        location,
                        type: SessionErrorsEnum.NotFound,
                        message: body.message,
                    };
                }
                case SessionExceptionsEnum.RunOutOfTime: {
                    return {
                        ...state,
                        is: true,
                        location,
                        type: SessionErrorsEnum.RunOutOfTime,
                        message: body.message,
                    };
                }
                default: {
                    return {
                        ...state,
                        is: true,
                        location,
                        type: SessionErrorsEnum.Unknown,
                        message,
                        serverError: 'Some error has occurred!',
                    };
                }
            }
        }
        default:
            return state;
    }
};
