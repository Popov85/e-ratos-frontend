import React from 'react';
import {FaFastForward, FaStepBackward, FaStepForward} from "react-icons/fa";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getBatch} from "../selectors/sessionSelector";
import {BatchInfo} from "../types/BatchInfo";
import {showNext, showPrev} from "../actions/sessionActions";

type Props = {
    handleSubmit: () => void;
}

const SessionNavigation: React.FC<Props> = ({handleSubmit}) => {


    const dispatch: Dispatch<any> = useDispatch();

    const batch: BatchInfo | null = useSelector((state: RootState) => getBatch(state));
    const questionNumber: number = useSelector((state: RootState) => state.session.session.questionNumber);
    const isOnPause: boolean = useSelector((state: RootState) => state.session.session.paused);

    if (!batch) return null;

    const renderButtons = () => {
        if (batch.questions.length === 0 && questionNumber === 0) {
            return (
                <div className="text-center">
                    <button type="button" disabled={isOnPause} onClick={() => handleSubmit()}
                            className="btn btn-warning pr-2 pl-2"
                            title="Confirm answers and send!">
                        Next<FaFastForward color="red"/>
                    </button>
                </div>);
        }
        if (batch.questions.length === 1) {
            return (
                <div className="text-center">
                    <button type="button" disabled={isOnPause} onClick={() => handleSubmit()}
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
                    <button type="button" disabled={isOnPause} onClick={() => dispatch(showNext())}
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
                        <button type="button" disabled={isOnPause} onClick={() => dispatch(showPrev())}
                                className="btn btn-secondary pr-1 pl-1">
                            <FaStepBackward color="white"/>&nbsp;Back
                        </button>
                        &nbsp;
                        <button type="button" disabled={isOnPause} onClick={() => dispatch(showNext())}
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
                        <button type="button" disabled={isOnPause} onClick={() => dispatch(showPrev())}
                                className="btn btn-secondary pr-1 pl-1 mr-2">
                            <FaStepBackward color="white"/>&nbsp;Back
                         </button>
                        <button type="button" disabled={isOnPause} onClick={() => handleSubmit()}
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


export default SessionNavigation;