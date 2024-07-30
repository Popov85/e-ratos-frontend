import {QuestionClassEnum} from "../QuestionClassEnum";

export interface BaseResponse {
    questionId: number;
    nullable: boolean;
    className: QuestionClassEnum;
}