import {QuestionClass} from "../QuestionClass";

export interface BaseResponse {
    questionId: number;
    nullable: boolean;
    className: QuestionClass;
}