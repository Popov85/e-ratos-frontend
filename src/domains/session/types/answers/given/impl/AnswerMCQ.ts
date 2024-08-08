import {BaseAnswer} from "../BaseAnswer";

export interface AnswerMCQ extends BaseAnswer{
    answerId: number;
    answer: string;
    resourceDomain: any;
}