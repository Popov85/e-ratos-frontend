import React, {useEffect, useState} from 'react';
import './Question.css';
import {getQuestion, getResponse} from "../../selectors/sessionSelector";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/rootReducer";
import {ResponseMCQ} from "../../types/responses/impl/ResponseMCQ";
import {putResponse} from "../../actions/sessionActions";
import {QuestionClassEnum} from "../../types/QuestionClassEnum";

import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import Question from "./Question";
import AnswerMcqSingleNoResources from "./AnswerMcqSingleNoResources";

const normal: string = "bg-normal border-bottom border-regular";
const selected: string = "bg-selected border-bottom border-regular";

const McqSingle: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const question: QuestionMCQ | null = useSelector((state: RootState) => getQuestion(state)) as QuestionMCQ | null;
    const response: ResponseMCQ | null = useSelector((state: RootState) => getResponse(state)) as ResponseMCQ | null;
    const expanded: boolean = useSelector((state: RootState) => state.session.session.expanded);
    const fontSize: number = useSelector((state: RootState) => state.session.session.fontSize);

    if (!question || (question.className !== QuestionClassEnum.QuestionMCQClass)) return null;

    const initialAnswerIds: Array<number> = response ? response.answerIds : [];

    const [answerIds, setAnswerIds] = useState<number[]>(initialAnswerIds);

    const questionId: number = question.questionId;

    useEffect(() => {
        // Creating an instance of ResponseMCQ
        const responseMCQ: ResponseMCQ = {
            questionId: questionId,
            nullable: false,
            className: QuestionClassEnum.QuestionMCQClass,
            answerIds: answerIds
        };
        dispatch(putResponse(questionId, responseMCQ));
    }, [answerIds]);

    const changeResponse = (id: number): void => {
        setAnswerIds([id]);
    };

    const clearResponse = (): void => {
        setAnswerIds([]);
    };

    return (
        <div className="border-0">
            <Question clearResponse={clearResponse}/>
            <div className="border-top border-right border-left border-regular">
                {question.answers.map(a => (
                    <div key={a.answerId} onClick={() => changeResponse(a.answerId)}
                         className={(a.answerId === answerIds[0]) ? selected : normal}>
                        <AnswerMcqSingleNoResources
                            questionId={questionId}
                            answerId={a.answerId}
                            answer={a.answer}
                            changeResponse={changeResponse}
                            expanded={expanded}
                            fontSize={fontSize}
                            isChecked={a.answerId === answerIds[0]}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default McqSingle;
