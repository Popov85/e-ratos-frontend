import React from 'react';

type Props = {
    questionId: number;
    answerId: number;
    answer: string;
    fontSize: number;
    selected: boolean;
}

const AnswerMcqMultiAnsweredNoResources: React.FC<Props> = ({questionId, answerId, answer, selected, fontSize}) => {

    return (
        <div className="text-truncate" style={{fontSize: fontSize + 'px'}}>
            <input type="checkbox"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   checked={selected} readOnly/>
            <span className="text-secondary" title={"Answer: " + answer}>{answer}</span>
        </div>
    );
};

export default AnswerMcqMultiAnsweredNoResources;