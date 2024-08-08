import {RootState} from "../../../store/rootReducer";
import {BatchInfo} from "../types/BatchInfo";
import {FinishInfo, QuestionResult} from "../types/FinishInfo";
import {Help} from "../types/Help";
import {Stars} from "../types/Stars";
import {Complaint} from "../types/Complaint";
import {ResponseMCQ} from "../types/responses/impl/ResponseMCQ";
import {ResponseFBSQ} from "../types/responses/impl/ResponseFBSQ";
import {BaseQuestion} from "../types/questions/BaseQuestion";


export const getBatch = (state: RootState): BatchInfo | null => {
    return state.session.session.batch;
}

export const getResult = (state: RootState): FinishInfo | null => {
    return state.session.session.result;
}

export const getQuestion = (state: RootState): BaseQuestion | null => {
    const batch: BatchInfo | null = state.session.session.batch;
    const questionNumber: number = state.session.session.questionNumber;
    if (!batch) return null;
    return batch.questions[questionNumber] ?? null;
}

export const getHelp = (state: RootState): Help | null => {
    const question: BaseQuestion | null = getQuestion(state);
    if (!question) return null;
    return state.session.session.helps.get(question.questionId) ?? null;
}

export const getStars = (state: RootState): Stars | null => {
    const question: BaseQuestion | null = getQuestion(state);
    if (!question) return null;
    return state.session.session.stars.get(question.questionId) ?? null;
}

export const getReport = (state: RootState): Complaint | null => {
    const question: BaseQuestion | null = getQuestion(state);
    if (!question) return null;
    return state.session.session.reports.get(question.questionId) ?? null;
}

export const getResponse = (state: RootState): ResponseMCQ | ResponseFBSQ | null => {
    const question: BaseQuestion | null = getQuestion(state);
    if (!question) return null;
    return state.session.session.responses.get(question.questionId) ?? null;
}

export const getResponseChecked = (state: RootState): QuestionResult | null => {
    const question: BaseQuestion | null = getQuestion(state);
    if (!question) return null;
    return state.session.session.responsesChecked.get(question.questionId) ?? null;
}

