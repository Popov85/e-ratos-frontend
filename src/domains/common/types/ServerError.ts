import {SessionExceptionsEnum} from "../../session/types/SessionExceptionsEnum";

export type ServerError = {
    exception: SessionExceptionsEnum;
    message: string;
    timestamp: string;
};