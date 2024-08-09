import React from 'react';

import './Question.css';
import QuestionCheckedComponent from "./QuestionChecked";
import {getResponseChecked} from "../../selectors/sessionSelector";
import {QuestionResult} from "../../types/FinishInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootReducer";
import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import {ResponseMCQ} from "../../types/responses/impl/ResponseMCQ";
import {AnswerMCQ} from "../../types/answers/given/impl/AnswerMCQ";
import AnswerMcqSingleAnsweredNoResources from "./AnswerMcqSingleAnsweredNoResources";

const normal: string = "bg-normal border-bottom border-regular";

type Props = {
    checkedResponse?: QuestionResult
}

const McqSingleAnswered: React.FC<Props> = (props) => {

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
                    question.answers.map((a: AnswerMCQ) => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqSingleAnsweredNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    fontSize={fontSize}
                                    selected={checkedResponse ? response.answerIds.includes(a.answerId) : false}
                                />
                            </div>);
                    })
                }
            </div>
        </div>
    );
};

export default McqSingleAnswered;


