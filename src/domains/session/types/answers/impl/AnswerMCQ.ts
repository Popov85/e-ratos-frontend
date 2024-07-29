import {BaseAnswer} from "../BaseAnswer";

export interface AnswerMCQ extends BaseAnswer{
    correctAnswers: Array<{
        answerId: number;
        percent: number;
        required: boolean;
    }>;
}