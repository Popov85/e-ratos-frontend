import {BaseQuestion} from "./questions/BaseQuestion";
import {BaseCorrectAnswer} from "./answers/correct/BaseCorrectAnswer";
import {BaseResponse} from "./responses/BaseResponse";

export type FinishInfo = {
    user: string,
    scheme: string,
    passed: boolean,
    timeouted: boolean,
    percent?: string,
    grade: string,
    timeSpent: string,
    points?: number,
    themeResults?: Array<ThemeResult>,
    questionResults?: Array<QuestionResult>
}

export type ThemeResult = {
    theme: {
        themeId: number;
        name: string;
    };
    quantity: number;
    percent: number;
}

export type QuestionResult = {
    question: BaseQuestion;
    response?: BaseResponse;
    correctAnswer?: BaseCorrectAnswer;
    score: number;
    bounty: number;
    penalty: number;
};