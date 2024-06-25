import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Header from "../../common/components/Header";
import StatusModContainer from "../containers/StatusModContainer";
import HelpModContainer from "../containers/HelpModContainer";
import SessionTitleContainer from "../containers/SessionTitleContainer";
import SessionInfoContainer from "../containers/SessionInfoContainer";
import SessionControlsContainer from "../containers/SessionControlsContainer";
import SessionNavigationContainer from "../containers/SessionNavigationContainer";
import SessionQuestionContainer from "../containers/SessionQuestionContainer";

const Session = props => {

    const {context, mode, session, failure} = props;
    const {batch, help, isLoaded} = session;
    const {schemeId, isLMS} = context;
    const {skipable, pyramid} = mode;

    const prepareResponses = () => {
        const response = {};
        const responses = {}
        for (let [k, v] of session.responses)
            responses[k] = v
        response.responses = responses;
        return response;
    }

    const handleSubmit = () => {
        let responses = prepareResponses();
        if (skipable || pyramid) {
            props.getNext(schemeId, isLMS, responses);
        } else {
            if (batch.lastBatch) {
                props.getFinishedBatch(schemeId, isLMS, responses);
            } else {
                props.getNext(schemeId, isLMS, responses);
            }
        }
    }

    return (
        <div className="container-fluid p-1">
            {
                (!isLoaded || (failure.is && failure.location === 'session')) &&
                <StatusModContainer/>
            }
            {
                help && <HelpModContainer/>
            }
            <div className="row mb-3">
                <div className="col-12">
                    <SessionTitleContainer/>
                </div>
            </div>

            <div className="row text-center text-secondary">
                <div className="col-12">
                    <h5>{props.scheme}</h5>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    <SessionInfoContainer/>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    {
                        !props.responseChecked && props.question &&
                        <SessionControlsContainer/>
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {
                        !props.question ?
                            <Header title="SKIPPED SUCCESSFULLY" color="alert-warning" widely={true}/> :
                            <SessionQuestionContainer/>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <SessionNavigationContainer handleSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    );

}

Session.propTypes = {
    context: PropTypes.object.isRequired,
    scheme: PropTypes.string.isRequired,
    mode: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    failure: PropTypes.object.isRequired,

    question: PropTypes.object,
    responseChecked: PropTypes.object,

    getNext: PropTypes.func,
    getFinished: PropTypes.func,
    getFinishedBatch: PropTypes.func
};

export default Session;