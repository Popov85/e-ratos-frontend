import React from 'react';
import './Question.css';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/rootReducer";
import {getResponseChecked} from "../../selectors/sessionSelector";
import {QuestionResult} from "../../types/FinishInfo";
import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import QuestionChecked from "./QuestionChecked";
import {CorrectAnswerMCQ} from "../../types/answers/correct/impl/CorrectAnswerMCQ";
import {AnswerMCQ} from "../../types/answers/given/impl/AnswerMCQ";
import {ResponseMCQ} from "../../types/responses/impl/ResponseMCQ";
import AnswerMcqSingleCheckedNoResources from "./AnswerMcqSingleCheckedNoResources";

const normal: string = "bg-normal border-bottom border-regular";

const McqSingleChecked: React.FC = () => {

    const checkedResponse: QuestionResult | null = useSelector((state: RootState) => getResponseChecked(state));
    const fontSize: number = useSelector((state: RootState) => state.session.session.fontSize);

    if (!checkedResponse) return null;

    const question: QuestionMCQ = checkedResponse.question as QuestionMCQ;

    const response: ResponseMCQ = checkedResponse.response as ResponseMCQ;

    const getPercent = (answerId: number): number => {
        const answerMCQ: CorrectAnswerMCQ = checkedResponse?.correctAnswer as CorrectAnswerMCQ;
        const matchingAnswer = answerMCQ.correctAnswers.find(a => a.answerId === answerId);
        if (matchingAnswer) {
            return matchingAnswer.percent;
        }
        return 0;
    }

    return (
        <div>
            <QuestionChecked checkedResponse={checkedResponse} fontSize={fontSize}/>
            <div className="border-top border-right border-left border-regular">
                {
                    question.answers.map((a: AnswerMCQ) => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqSingleCheckedNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    fontSize={fontSize}
                                    selected={checkedResponse.response ? response.answerIds.includes(a.answerId) : false}
                                    percent={getPercent(a.answerId)}
                                />
                            </div>);
                    })
                }
            </div>
        </div>
    );
};


export default McqSingleChecked;


