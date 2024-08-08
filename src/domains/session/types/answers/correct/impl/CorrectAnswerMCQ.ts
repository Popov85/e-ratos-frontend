import {BaseCorrectAnswer} from "../BaseCorrectAnswer";

export interface CorrectAnswerMCQ extends BaseCorrectAnswer{
    correctAnswers: Array<{
        answerId: number;
        percent: number;
        required: boolean;
    }>;
}