import React, {useState} from 'react';
import AnswerMcqSingleNoResources from "./AnswerMcqSingleNoResources";
import './Question.css';
import Question from "./Question";
import {QuestionMCQ} from "../../types/questions/impl/QuestionMCQ";
import {BaseQuestion} from "../../types/questions/BaseQuestion";
import {AnswerMCQ} from "../../types/answers/given/impl/AnswerMCQ";

const normal: string = "bg-normal border-bottom border-regular";
const selected: string = "bg-selected border-bottom border-regular";

type Props = {
    question: QuestionMCQ;
}


const McqSinglePreview: React.FC<Props> = ({question}) => {

    const [answerIds, setAnswerIds] = useState<number[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState<number>(16);

    const changeResponse = (id: number): void => {
        setAnswerIds([id]);
    };

    const clearResponse = (): void => {
        setAnswerIds([]);
    };

    const toggleExpanded = (): void => {
        setExpanded(!expanded);
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
                        className={a.answerId === answerIds[0] ? selected : normal}
                    >
                        <AnswerMcqSingleNoResources
                            questionId={question.questionId}
                            answerId={a.answerId}
                            answer={a.answer}
                            changeResponse={changeResponse}
                            expanded={expanded}
                            fontSize={fontSize}
                            isChecked={a.answerId === answerIds[0]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default McqSinglePreview;
