import {QuestionClass} from "./QuestionClass";

export type BatchInfo = {
    questions: Array<Question>,
    lastBatch: boolean,
    questionsLeft: number,
    batchesLeft: number,
    sessionExpiresInSec: number,
    batchExpiresInSec: number,
    currentScore?: string,
    effectiveScore?: string,
    progress?: string,
    motivationalMessage?: string
}

export type Question = {
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
    className: QuestionClass;
};