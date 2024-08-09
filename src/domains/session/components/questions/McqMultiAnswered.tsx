import React from 'react';

import './Question.css';
import QuestionCheckedComponent from "./QuestionChecked";

import {QuestionResult} from "../../types/FinishInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootReducer";
import {getResponseChecked} from "../../selectors/sessionSelector";
import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import {ResponseMCQ} from "../../types/responses/impl/ResponseMCQ";
import AnswerMcqMultiAnsweredNoResources from "./AnswerMcqMultiAnsweredNoResources";

const normal: string = "bg-normal border-bottom border-regular";

type Props = {
    checkedResponse?: QuestionResult
}

const McqMultiAnsweredComponent: React.FC<Props> = (props) => {

    // Only execute the hook if checkedResponse is not provided as a prop
    const checkedResponse: QuestionResult | null = props.checkedResponse
        ?? useSelector((state: RootState) => getResponseChecked(state));

    const fontSize: number = useSelector((state: RootState) => state.session.session.fontSize);

    if (!checkedResponse) return null;

    const question: QuestionMCQ = checkedResponse.question as QuestionMCQ;

    const response: ResponseMCQ = checkedResponse.response as ResponseMCQ;

    return (
        <div>
            <QuestionCheckedComponent checkedResponse={checkedResponse} fontSize={fontSize}/>
            <div className="border-top border-right border-left border-regular">
                {
                    question.answers.map(a => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqMultiAnsweredNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    fontSize={fontSize}
                                    selected={response ? response.answerIds.includes(a.answerId) : false}
                                />
                            </div>);
                    })
                }
            </div>
        </div>
    );
};

export default McqMultiAnsweredComponent;


