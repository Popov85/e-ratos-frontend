import React from 'react';
// @ts-ignore
import McqSingleContainer from "../containers/questions/McqSingleContainer";
// @ts-ignore
import McqMultiContainer from "../containers/questions/McqMultiContainer";
// @ts-ignore
import McqSingleCheckedContainer from "../containers/questions/McqSingleCheckedContainer";
// @ts-ignore
import McqMultiCheckedContainer from "../containers/questions/McqMiltiCheckedContainer";
import {getQuestion, getResponseChecked} from "../selectors/sessionSelector";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {Question} from "../types/BatchInfo";
import {QuestionClassEnum} from "../types/QuestionClassEnum";
import {QuestionResult} from "../types/FinishInfo";

const SessionQuestion: React.FC = () => {

    const question: Question | null = useSelector((state: RootState) => getQuestion(state));
    const responseChecked: QuestionResult | null = useSelector((state: RootState) => getResponseChecked(state));

    if (!question || !responseChecked) return null;

    const key: number = question.questionId;

    const renderMcq = () => {
        const single: boolean | undefined = question.single;
        if (!responseChecked) {
            return (
                <div className="row mt-0 mb-4">
                    <div className="col-12">
                        {single ? <McqSingleContainer key={key}/> : <McqMultiContainer key={key}/>}
                    </div>
                </div>);
        }
        return (
            <div className="row mt-0 mb-4">
                <div className="col-12">
                    {single ? <McqSingleCheckedContainer key={key}/> : <McqMultiCheckedContainer key={key}/>}
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