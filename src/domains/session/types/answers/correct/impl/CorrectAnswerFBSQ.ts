import {BaseCorrectAnswer} from "../BaseCorrectAnswer";

export interface CorrectAnswerFBSQ extends BaseCorrectAnswer{
    acceptedPhrases: Array<string>;
}