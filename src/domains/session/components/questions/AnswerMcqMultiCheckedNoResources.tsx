import React from 'react';

import './Question.css';

type Props = {
    questionId: number;
    answerId: number;
    answer: string;
    fontSize: number;
    selected: boolean;
    percent: number;
    required: boolean;
}

const AnswerMcqMultiCheckedNoResources: React.FC<Props> = ({
                                                               questionId,
                                                               answerId,
                                                               answer,
                                                               selected,
                                                               percent,
                                                               required,
                                                               fontSize
                                                           }) => {


    const renderAnswer = () => {
        return <span><span className="font-weight-bold">({percent}% {required ? " required" : ""}) &nbsp;</span>{answer}</span>
    }

    return (
        <div className="text-truncate" style={{fontSize: fontSize + 'px'}}>
            <input type="checkbox"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   checked={selected} readOnly/>
            <span
                className={`text-${percent > 0 ? 'success' : 'danger'} ${selected && percent === 0 ? 'text-crossed' : ''}`}
                title={"Answer: " + answer}>{renderAnswer()}</span>
        </div>
    );
};

export default AnswerMcqMultiCheckedNoResources