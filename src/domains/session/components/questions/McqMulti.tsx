import React, {useEffect, useState} from 'react';
import './Question.css';
import Question from "./Question";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import {RootState} from "../../../../store/rootReducer";
import {getQuestion, getResponse} from "../../selectors/sessionSelector";
import {ResponseMCQ} from "../../types/responses/impl/ResponseMCQ";
import {QuestionClassEnum} from "../../types/QuestionClassEnum";
import {putResponse} from "../../actions/sessionActions";
import AnswerMcqMultiNoResources from "./AnswerMcqMultiNoResources";
import {ResponseClassEnum} from "../../types/ResponseClassEnum";

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

const McqMulti: React.FC = () => {

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
            className: ResponseClassEnum.ResponseMCQClass,
            answerIds: answerIds
        };
        dispatch(putResponse(questionId, responseMCQ));
    }, [answerIds]);

    const changeResponse = (id: number): void => {
        if (answerIds.includes(id)) {
            removeResponse(id);
        } else {
            addResponse(id);
        }
    };

    const addResponse = (id: number): void => {
        setAnswerIds(prevAnswerIds => [...prevAnswerIds, id]);
    };

    const removeResponse = (id: number): void => {
        setAnswerIds(prevAnswerIds => prevAnswerIds.filter(answerId => answerId !== id));
    };

    const clearResponse = (): void => {
        setAnswerIds([]);
    };

    return (
        <div className="border-0">
            <Question clearResponse={clearResponse} />
            <div className="border-top border-right border-left border-regular">
                {question.answers.map(a => (
                    <div key={a.answerId} onClick={() => changeResponse(a.answerId)}
                         className={answerIds.includes(a.answerId) ? selected : normal}>
                        <AnswerMcqMultiNoResources
                            questionId={questionId}
                            answerId={a.answerId}
                            answer={a.answer}
                            expanded={expanded}
                            fontSize={fontSize}
                            changeResponse={() => changeResponse(a.answerId)}
                            isChecked={answerIds.includes(a.answerId)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default McqMulti;

