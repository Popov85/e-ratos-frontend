import {ResponseMCQ} from "./responses/impl/ResponseMCQ";
import {ResponseFBSQ} from "./responses/impl/ResponseFBSQ";
import {AnswerFBSQ} from "./answers/impl/AnswerFBSQ";
import {AnswerMCQ} from "./answers/impl/AnswerMCQ";
import {QuestionClassEnum} from "./QuestionClassEnum";

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
    question: {
        questionId: number;
        serialNumber: number;
        question: string;
        level: string;
        type: number;
        lang: string;
        themeDomain: {
            themeId: number;
            name: string;
        };
        required: boolean;
        partialResponseAllowed: boolean;
        helpAvailable: boolean;
        resource?: {
            resourceId: number;
            link: string;
            description: string;
            type: string;
            width: number;
            height: number;
        };
        className: QuestionClassEnum;
    };
    response?: ResponseMCQ | ResponseFBSQ; // TODO: add more impl
    correctAnswer?: AnswerMCQ | AnswerFBSQ; //TODO: add more impl
    score: number;
    bounty: number;
    penalty: number;
};