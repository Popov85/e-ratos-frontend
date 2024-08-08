import {QuestionClassEnum} from "../QuestionClassEnum";

export interface BaseQuestion {
    questionId: number;
    serialNumber: number;
    question: string;
    level: number;
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