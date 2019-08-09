import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Countdown from 'react-countdown-now';
import Spinner from './Spinner';
import Failure from './Failure';
import McqMulti from './McqMulti';
import McqSingle from './McqSingle';
import Finish from './Finish';
import Cancelled from './Cancelled';
import NotFound from './NotFound';
import RunOutOfTime from "./RunOutOfTime";
import ApiBatch from './ApiBatch';
import { processError } from './Error';
import { FaPowerOff, FaStepBackward, FaStepForward, FaSave, FaPause, FaCheck } from 'react-icons/fa';

import '../main.css';

const CANCEL = { loadingMessage: "Performing 'cancel' API call...", failureMessage: "Failed to perform 'cancel' API call..." };
const NEXT = { loadingMessage: "Performing 'next' API call...", failureMessage: "Failed to perform 'next' API call..." };
const FINISH = { loadingMessage: "Performing 'finish' API call...", failureMessage: "Failed to perform 'finish' API call..." };
const FINISH_BATCH = { loadingMessage: "Performing 'finish-batch' API call...", failureMessage: "Failed to perform 'finish-batch' API call..." };

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'lightyellow',
        borderRadius: '8px'
    }
};

export default class Batch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // No opened sesson for this schemeId was found on the server
            isNotFound: false,

            isRunOutOfTime: false,

            isCancelled: false,
            isFinished: false,

            // Last API call
            operation: null,

            // Current question in the batch to display
            counter: 0,

            batch: this.props.batch,

            timeSpent: 0,

            isLoaded: true,
            isModal: false,
            error: null,
            serverError: null,

            responses: new Map(),
            result: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.putResponse = this.putResponse.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component did update!");
        /*if (this.state.responses !== prevState.responses) {
            for (var [key, value] of this.state.responses) {
                console.log(key + ' = ' + JSON.stringify(value));
            }
        }*/
    }

    componentDidCatch(error, info) {
        console.error(error);
        console.error(info.componentStack);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState(prevState => ({
            timeSpent: prevState.timeSpent + 1
        }));
    }

    putResponse(id, response) {
        var newMap = new Map(this.state.responses);
        newMap.set(id, response);
        this.setState({ responses: newMap });
    }

    prepareBatch() {
        const batch = {};
        const responses = {}
        for (let [k, v] of this.state.responses)
            responses[k] = v
        batch.responses = responses;
        return batch;
    }

    reTryCancelAPICall() {
        this.setState({
            operation: 'CANCEL',
            isLoaded: true,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.cancel(schemeInfo.schemeId, panelInfo.lms)
            .then(result => {
                this.setState({
                    result,
                    isCancelled: true,
                    isModal: false
                });
            }).catch(e => {
                processError(e, CANCEL.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryNextAPICall() {
        const batch = JSON.stringify(this.prepareBatch());
        console.log("I am sending batch = ", batch);
        this.setState({
            operation: 'NEXT',
            isLoaded: true,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.next(schemeInfo.schemeId, batch, panelInfo.lms)
            .then(batch => {
                if (batch.batch.length === 0) {
                    // For dynamic sessions
                    // Empty batch detected, do finish call
                    this.reTryFinishAPICall();
                } else {
                    this.setState({
                        batch,
                        timeSpent: 0, // TODO: check
                        isModal: false,
                        counter: 0,
                        responses: new Map()
                    });
                }
            }).catch(e => {
                processError(e, NEXT.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryFinishAPICall() {
        this.setState({
            operation: 'FINISH',
            isLoaded: true,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.finish(schemeInfo.schemeId, panelInfo.lms)
            .then(result => {
                console.log("Result = ", result);
                this.setState({
                    result,
                    isFinished: true,
                    isModal: false
                });
            }).catch(e => {
                processError(e, FINISH.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryFinishBatchAPICall() {
        const batch = JSON.stringify(this.prepareBatch());
        this.setState({
            operation: 'FINISH_BATCH',
            isLoaded: true,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.finish_batch(schemeInfo.schemeId, batch, panelInfo.lms)
            .then(result => {
                console.log("Result = ", result);
                this.setState({
                    result,
                    isFinished: true,
                    isModal: false
                });
            }).catch(e => {
                processError(e, FINISH_BATCH.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    resolveAndDoReTry() {
        const { operation } = this.state;
        switch (operation) {
            case 'CANCEL':
                this.reTryCancelAPICall();
                break;
            case 'NEXT':
                this.reTryNextAPICall();
                break;
            case 'FINISH':
                this.reTryFinishAPICall();
                break;
            case 'FINISH_BATCH':
                this.reTryFinishBatchAPICall();
                break;
            default:
                throw new Error("Last operation is undefined!");
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { skipable, pyramid } = this.props.schemeInfo.mode;
        if (skipable || pyramid) {
            this.reTryNextAPICall();
        } else {
            if (this.state.batch.batchesLeft !== 0) {
                this.reTryNextAPICall();
            } else {
                this.reTryFinishBatchAPICall();
            }
        }
    }

    renderSessionInfoPanel() {
        const { panelInfo } = this.props;
        const { timeLeft, questionsLeft, batchesLeft, batchTimeLimit } = this.state.batch;
        const timeRemaining = timeLeft - this.state.timeSpent;
        const batchTimeRemaining = batchTimeLimit - this.state.timeSpent;
        return (
            <div>
                <span className="text-secondary text-small border float-left">
                    <a href="#" className="badge badge-danger" onClick={() => this.reTryCancelAPICall()} title="Wish to cancel?">
                        Cancel&nbsp;<FaPowerOff color="white" />
                    </a> &nbsp;
                <strong>User: </strong> {panelInfo.email} &nbsp;
                <strong>Context: </strong> {panelInfo.lms ? "LMS" : "non-LMS"}
                </span>
                <span className="text-secondary text-small border float-right">
                    <strong>Time left: </strong>
                    {timeLeft < 0 ? "not restricted" :
                        <Countdown key="session" date={Date.now() + ((timeRemaining <= 0) ? 0 : timeRemaining * 1000)} daysInHours={true} />}
                    | <strong>questions left: </strong>
                    {questionsLeft}
                    | <strong>batches left: </strong>
                    {batchesLeft}
                    | <strong>batch limit: </strong>
                    {batchTimeLimit < 0 ? "not restricted" :
                        <Countdown key="batch" date={Date.now() + ((batchTimeRemaining <= 0) ? 0 : batchTimeRemaining * 1000)} daysInHours={true} />}
                </span>
            </div>
        );
    }


    renderSessionControlPanel() {
        const preserve = true; //this.props.schemeInfo.mode.preservable;
        const pause = true; //this.props.schemeInfo.mode.pauseable;
        var buttons = [];
        if (preserve) buttons.push(
            <span key="preserve">
                <a href="#" className="badge badge-secondary mr-1" onClick={() => this.reTryPreserveAPICall()} title="Preserves the current session">
                    Preserve&nbsp;<FaSave color="white" />
                </a>
            </span>);
        if (pause) buttons.push(
            <span key="pause">
                <a href="#" className="badge badge-secondary" onClick={() => this.reTryPauseAPICall()} title="Pauses the current session">
                    Pause&nbsp;<FaPause color="white" />
                </a>
            </span>);
        return <div className="text-center">{buttons}</div>
    }



    renderMcqSingle(q) {
        const response = this.state.responses.get(q.questionId);
        return (<McqSingle
            key={q.questionId}
            question={q}
            theme={q.themeDomain}
            mode={this.props.schemeInfo.mode}
            resource={q.resourceDomains}
            answers={q.answers}
            answered={(response) ? response.answerIds : []}
            putResponse={this.putResponse} />);
    }

    renderMcqMulti(q) {
        const response = this.state.responses.get(q.questionId);
        return (<McqMulti
            key={q.questionId}
            question={q}
            theme={q.themeDomain}
            mode={this.props.schemeInfo.mode}
            answers={q.answers}
            answered={(response) ? response.answerIds : []}
            putResponse={this.putResponse} />)
    }


    renderQuestion() {
        const { counter, batch } = this.state;
        const q = batch.batch[counter];
        const single = q.single;
        return (
            <div className="row mt-0 mb-4">
                <div className="col-12">
                    {(single) ? this.renderMcqSingle(q) : this.renderMcqMulti(q)}
                </div>
            </div>);
    }

    next() {
        const { counter, batch } = this.state;
        if (counter < batch.batch.length - 1) this.setState({ counter: counter + 1 });
    }

    back() {
        const { counter } = this.state;
        if (counter > 0) this.setState({ counter: counter - 1 });
    }


    /**
     * 1) If batch constits only of single question, display NEXT>>
        2) If multiple questions:   
        a) Initial (counter = 0) - display FORVARD>>;
        b) Intermediate (counter > 0 and < length) - display <<BACK and FORVARD>>
        c) Last (counter = length) - display <<BACK and NEXT>>
        3) If it is the last batch display FINISH>>
     */
    renderNavigation() {
        const { batch } = this.state;
        if (batch.batch.length === 1) {
            return (
                <div className="text-center">
                    <button type="submit" className="btn btn-warning pr-2 pl-2" title="Confirm answers and send!" >
                        {(batch.batch.batchesLeft > 0) ? "Next" : "Finish"}<FaCheck color="red" />
                    </button>
                </div>);
        }
        const { counter } = this.state;
        if (counter === 0) {
            return (
                <div className="text-center">
                    <button type="button" className="btn btn-secondary pr-1 pl-1" onClick={() => this.next()} title="Move to the second question in this batch">
                        Next <FaStepForward color="white" />
                    </button>
                </div>);
        }
        if (counter > 0 && counter < batch.batch.length - 1) {
            return (
                <div className="text-center">
                    <span>
                        <button type="button" className="btn btn-secondary pr-1 pl-1" onClick={() => this.back()} >
                            <FaStepBackward color="white" />&nbsp;Back
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-secondary pr-1 pl-1" onClick={() => this.next()} title="Move to the second question in this batch">
                            Next <FaStepForward color="white" />
                        </button>
                    </span>
                </div>);
        }
        if (counter === batch.batch.length - 1) {
            return (
                <div className="text-center">
                    <span>
                        <button type="button" className="btn btn-secondary pr-1 pl-1 mr-2" onClick={() => this.back()} >
                            <FaStepBackward color="white" />&nbsp;Back
                         </button>
                        <button type="submit" className="btn btn-warning pr-2 pl-2" title="Confirm answers and send!" >
                            {(batch.batchesLeft > 0) ? "Next" : "Finish"}<FaCheck color="red" />
                        </button>
                    </span>
                </div>);
        }
        throw new Error("Undefined state of counter = " + counter);
    }

    closeModal() {
        this.setState({
            isModal: false,
            error: null
        });
    }

    renderModal() {
        return (
            <Modal
                isOpen={this.state.isModal}
                onRequestClose={() => this.closeModal()}
                style={modalStyles}
                contentLabel="Calling API"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>
                {(this.state.error) ? this.renderModalFailure() : this.renderModalLoading()}
            </Modal>);
    }


    renderModalLoading() {
        const { operation } = this.state;
        return (
            <div className="text-center">
                <Spinner message={(operation) ? operation.loadingMessage : null} />
            </div>);
    }

    renderModalFailure() {
        return (
            <div className="text-center">
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <span>Operation failed...</span>
                </div>
                <Failure message={this.state.error.message} serverError={this.state.serverError} />
                <div className="mt-3">
                    <span>
                        <button type="button" className="btn btn-sm btn-secondary mr-1" onClick={() => this.resolveAndDoReTry()}>Re-try>></button>
                        <button type="button" className="btn btn-sm btn-secondary" onClick={() => this.closeModal()}>Cancel</button>
                    </span>
                </div>

            </div>);
    }

    render() {
        const { panelInfo, schemeInfo } = this.props;
        const { isCancelled, isFinished, isNotFound, isRunOutOfTime, result } = this.state;

        if (isNotFound)
            return <NotFound
                panelInfo={panelInfo}
                schemeInfo={schemeInfo} />

        if (isRunOutOfTime)
            return <RunOutOfTime
                panelInfo={panelInfo}
                schemeInfo={schemeInfo} />

        if (isCancelled)
            return <Cancelled
                panelInfo={panelInfo}
                schemeInfo={schemeInfo}
                result={result} />

        if (isFinished)
            return <Finish
                panelInfo={panelInfo}
                schemeInfo={schemeInfo}
                result={result} />

        return (
            <div className="container-fluid p-1">

                <div className="row mb-3">
                    <div className="col-12">
                        {this.renderSessionInfoPanel()}
                    </div>
                </div>

                <div className="row text-center text-secondary">
                    <div className="col-12">
                        <h5>{this.props.schemeInfo.name}</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center mb-3">
                        {this.renderSessionControlPanel()}
                    </div>
                </div>



                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            {this.renderQuestion()}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <span>{this.renderNavigation()}</span>
                        </div>
                    </div>
                </form>
                {this.renderModal()}
            </div>
        );
    }
}

const propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    batch: PropTypes.object
};

Batch.propTypes = propTypes;