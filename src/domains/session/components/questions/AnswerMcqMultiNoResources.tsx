import React from 'react';

import './Question.css';

type Props = {
    questionId: number;
    answerId: number;
    answer: string;
    expanded: boolean;
    fontSize: number;
    isChecked: boolean;
    changeResponse: (answerId: number) => void;
}

const AnswerMcqMultiNoResources: React.FC<Props> = ({questionId, answerId, answer, isChecked, expanded, fontSize, changeResponse}) => {

    const renderOption = () => {
        return <span className="text-secondary" title={"Answer: " + answer}>{answer}</span>
    }

    return (
        <div className={`div-hover ${!expanded ? 'text-truncate': ''}`} style={{fontSize: fontSize + 'px'}}>
            <input type="checkbox"
                   className="ml-1"
                   name={"option"+questionId}
                   value={answerId}
                   onChange={() => changeResponse(answerId)}
                   checked={isChecked}/> {renderOption()}
        </div>
    );
};

export default AnswerMcqMultiNoResources;

