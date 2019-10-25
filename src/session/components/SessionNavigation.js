import React from 'react';
import PropTypes from 'prop-types';
import {FaFastForward, FaStepBackward, FaStepForward} from "react-icons/fa";

const SessionNavigation = props => {
    
    const {batch, questionNumber} = props;

    const renderButtons = () => {
        if (batch.questions.length === 0 && questionNumber === 0) {
            return (
                <div className="text-center">
                    <button type="button" disabled={props.isOnPause} onClick={()=>props.handleSubmit()}
                            className="btn btn-warning pr-2 pl-2"
                            title="Confirm answers and send!">
                        Next<FaFastForward color="red"/>
                    </button>
                </div>);
        }
        if (batch.questions.length === 1) {
            return (
                <div className="text-center">
                    <button type="button" disabled={props.isOnPause} onClick={()=>props.handleSubmit()}
                            className="btn btn-warning pr-2 pl-2"
                            title="Confirm answers and send!">
                        {
                            batch.lastBatch ? "Finish" : "Next"
                        }
                        <FaFastForward color="red"/>
                    </button>
                </div>);
        }
        if (questionNumber === 0) {
            return (
                <div className="text-center">
                    <button type="button" disabled={props.isOnPause} onClick={() => props.showNext()}
                            className="btn btn-secondary pr-1 pl-1"
                            title="Move to the second question in this batch">
                        Next <FaStepForward color="white"/>
                    </button>
                </div>);
        }
        if (questionNumber > 0 && questionNumber < batch.questions.length - 1) {
            return (
                <div className="text-center">
                    <span>
                        <button type="button" disabled={props.isOnPause} onClick={() => props.showPrev()}
                                className="btn btn-secondary pr-1 pl-1">
                            <FaStepBackward color="white"/>&nbsp;Back
                        </button>
                        &nbsp;
                        <button type="button" disabled={props.isOnPause} onClick={() => props.showNext()}
                                className="btn btn-secondary pr-1 pl-1"
                                title="Move to the second question in this batch">
                            Next <FaStepForward color="white"/>
                        </button>
                    </span>
                </div>);
        }
        if (questionNumber === batch.questions.length - 1) {
            return (
                <div className="text-center">
                    <span>
                        <button type="button" disabled={props.isOnPause} onClick={() => props.showPrev()}
                                className="btn btn-secondary pr-1 pl-1 mr-2">
                            <FaStepBackward color="white"/>&nbsp;Back
                         </button>
                        <button type="button" disabled={props.isOnPause} onClick={()=>props.handleSubmit()}
                                className="btn btn-warning pr-2 pl-2"
                                title="Confirm answers and send!">
                            {batch.lastBatch ? "Finish" : "Next"}<FaFastForward color="red"/>
                        </button>
                    </span>
                </div>);
        }
        throw new Error("Undefined questionNumber = " + questionNumber);
    }

    return renderButtons();
};

SessionNavigation.propTypes = {
    batch: PropTypes.object.isRequired,
    questionNumber: PropTypes.number.isRequired,
    isOnPause: PropTypes.bool.isRequired,

    showNext: PropTypes.func,
    showPrev: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired
};

export default SessionNavigation;