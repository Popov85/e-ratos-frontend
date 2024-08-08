import React from 'react';

type Props = {
    questionId: number
    answerId: number
    answer: any
    expanded: boolean;
    fontSize: number;
    isChecked: boolean;
    changeResponse: (answerId: number) => void;
}

const AnswerMcqSingleNoResources: React.FC<Props> = ({questionId, answerId, answer, isChecked, expanded, fontSize, changeResponse}) => {

    const renderOption = () => {
        return <span className="text-secondary" title={"Answer: " + answer}>{answer}</span>
    }

    return (
        <div className={`div-hover ${!expanded ? 'text-truncate' : ''}`} style={{fontSize: fontSize + 'px'}}>
            <input type="radio"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   onChange={() => changeResponse(answerId)}
                   checked={isChecked}/> {renderOption()}
        </div>
    );
};

export default AnswerMcqSingleNoResources;
