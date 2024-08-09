import React, {useState} from 'react';
import './Question.css';
import AnswerMcqMultiNoResources from "./AnswerMcqMultiNoResources";
import Question from "./Question";
import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import {BaseQuestion} from "../../types/questions/BaseQuestion";
import {AnswerMCQ} from "../../types/answers/given/impl/AnswerMCQ";

const normal: string = "bg-normal border-bottom border-regular";
const selected: string = "bg-selected border-bottom border-regular";

type Props = {
    question: QuestionMCQ;
}

const McqMultiPreview: React.FC<Props> = ({question}) => {
    const [answerIds, setAnswerIds] = useState<number[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState<number>(16);

    const changeResponse = (id: number) => {
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

    const toggleExpanded = (): void => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const increaseFontSize = (): void => {
        setFontSize(prevFontSize => prevFontSize <= 22 ? prevFontSize + 2 : 16);
    };

    return (
        <div className="border-0">
            <Question
                question={question as BaseQuestion}
                expanded={expanded}
                fontSize={fontSize}
                clearResponse={clearResponse}
                setExpanded={toggleExpanded}
                setFontSize={increaseFontSize}
            />
            <div className="border-top border-right border-left border-regular">
                {question.answers.map((a: AnswerMCQ) => (
                    <div
                        key={a.answerId}
                        onClick={() => changeResponse(a.answerId)}
                        className={answerIds.includes(a.answerId) ? selected : normal}
                    >
                        <AnswerMcqMultiNoResources
                            questionId={question.questionId}
                            answerId={a.answerId}
                            answer={a.answer}
                            changeResponse={changeResponse}
                            expanded={expanded}
                            fontSize={fontSize}
                            isChecked={answerIds.includes(a.answerId)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default McqMultiPreview;
