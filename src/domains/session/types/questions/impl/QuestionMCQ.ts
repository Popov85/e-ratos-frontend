import {BaseQuestion} from "../BaseQuestion";
import {AnswerMCQ} from "../../answers/given/impl/AnswerMCQ";

export interface QuestionMCQ extends BaseQuestion{
    single: boolean;
    answers: Array<AnswerMCQ>;
};