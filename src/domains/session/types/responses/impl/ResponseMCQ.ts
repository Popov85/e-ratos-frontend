import {BaseResponse} from "../BaseResponse";

export interface ResponseMCQ extends BaseResponse {
    answerIds: Array<number>
}