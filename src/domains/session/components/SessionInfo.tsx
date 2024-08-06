import React from 'react';
import {BatchInfo} from "../types/BatchInfo";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getBatch} from "../selectors/sessionSelector";

const SessionInfo: React.FC = () => {

    const currentBatch: BatchInfo | null = useSelector((state: RootState) => getBatch(state));

    if (!currentBatch) return null;

    const {questionsLeft, batchesLeft, currentScore, effectiveScore, progress} = currentBatch;

    return (
        <span className="text-center text-secondary border">
                <small>
                    {
                        questionsLeft !== undefined ? <span title="Questions remaining in this session"><strong>Left questions: </strong>{questionsLeft}</span>
                            : null
                    }
                    {
                        batchesLeft !== undefined ? <span
                                title="Batches remaining in this session"><strong>|&nbsp;Left batches: </strong>{batchesLeft}</span>
                            : null
                    }
                    {
                        currentScore ?
                            <span title="Current score"><strong>|&nbsp;Score current: </strong>{currentScore} %</span>
                            : null
                    }
                    {
                        effectiveScore ? <span
                                title="Effective score"><strong>|&nbsp;Score effective: </strong>{effectiveScore} %</span>
                            : null
                    }
                    {
                        progress ? <span
                                title="How much job is already done?"><strong>|&nbsp;Progress: </strong>{progress} %</span>
                            : null
                    }
                </small>
            </span>
    );
};

export default SessionInfo;