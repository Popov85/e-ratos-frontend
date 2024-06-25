import React from 'react';
import PropTypes from 'prop-types';

const SessionInfo = props => {

    const {questionsLeft, batchesLeft, currentScore, effectiveScore, progress} = props.batch;

    return (
        <span className="text-center text-secondary border">
                <small>
                    {
                        questionsLeft !== 'undefined' ? <span title="Questions remaining in this session"><strong>Left questions: </strong>{questionsLeft}</span>
                            : null
                    }
                    {
                        batchesLeft !== 'undefined' ? <span
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

SessionInfo.propTypes = {
    batch: PropTypes.object.isRequired
};

export default SessionInfo;