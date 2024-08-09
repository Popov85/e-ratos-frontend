import React from 'react';
import {getQuestion, getResponseChecked} from "../selectors/sessionSelector";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {QuestionClassEnum} from "../types/QuestionClassEnum";
import {QuestionResult} from "../types/FinishInfo";
import {BaseQuestion} from "../types/questions/BaseQuestion";
import {QuestionMCQ} from "../types/questions/impl/QuestionMCQ";
import McqSingle from "./questions/McqSingle";
import McqMulti from "./questions/McqMulti";
import McqSingleChecked from "./questions/McqSingleChecked";
import McqMultiChecked from "./questions/McqMultiChecked";

const SessionQuestion: React.FC = () => {

    const question: BaseQuestion | null = useSelector((state: RootState) => getQuestion(state));
    const responseChecked: QuestionResult | null = useSelector((state: RootState) => getResponseChecked(state));

    if (!question) return null;

    const key: number = question.questionId;

    const renderMcq = () => {
        const mcqQuestion: QuestionMCQ = question as QuestionMCQ;
        const single: boolean | undefined = mcqQuestion.single;
        if (!responseChecked) {
            return (
                <div className="row mt-0 mb-4">
                    <div className="col-12">
                        {single ? <McqSingle key={key}/> : <McqMulti key={key}/>}
                    </div>
                </div>);
        }
        return (
            <div className="row mt-0 mb-4">
                <div className="col-12">
                    {single
                        ? <McqSingleChecked checkedResponse={responseChecked} key={key}/>
                        : <McqMultiChecked checkedResponse={responseChecked} key={key}/>}
                </div>
            </div>);
    }

    const resolveTypeAndRenderQuestion = () => {
        switch (question.className) {
            case QuestionClassEnum.QuestionMCQClass:
                return renderMcq();
            default:
                return null; // TODO: impl. more types
        }
    }

    return resolveTypeAndRenderQuestion();
};


export default SessionQuestion;