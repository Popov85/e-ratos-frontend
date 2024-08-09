import {ResponseClassEnum} from "../ResponseClassEnum";

export interface BaseResponse {
    questionId: number;
    nullable: boolean;
    className: ResponseClassEnum;
}