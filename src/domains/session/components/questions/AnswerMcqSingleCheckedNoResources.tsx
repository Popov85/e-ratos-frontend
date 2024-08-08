import React from 'react';

import './Question.css';

type Props = {
    questionId: number;
    answerId: number;
    answer: string;
    fontSize: number;
    selected: boolean;
    percent: number;
}

const AnswerMcqSingleCheckedNoResources: React.FC<Props> = ({
                                                                questionId,
                                                                answerId,
                                                                answer,
                                                                selected,
                                                                percent,
                                                                fontSize
                                                            }) => {

    const renderAnswer = () => {
        return <span><span className="font-weight-bold">({percent}%) &nbsp;</span>{answer}</span>
    }

    return (
        <div className="text-truncate" style={{fontSize: fontSize + 'px'}}>
            <input type="radio"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   checked={selected} readOnly/>
            <span
                className={`text-${percent > 0 ? 'success' : 'danger'} ${selected && percent === 0 ? 'text-crossed' : ''}`}
                title={"Answer: " + answer}>{renderAnswer()}
            </span>
        </div>
    );
};

export default AnswerMcqSingleCheckedNoResources;