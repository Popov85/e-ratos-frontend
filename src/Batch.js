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
import Utils from './Utils';
import { FaPowerOff, FaEraser, FaSave, FaPause, FaThLarge, FaBars } from 'react-icons/fa';
import '../main.css';
import ApiBatch from './ApiBatch';
import NotFound from './NotFound';
import RunOutOfTime from "./RunOutOfTime";
import { processError } from './Error';


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

            isCancelled: false,
            isFinished: false,

            // No opened sesson for this schemeId was found on the server
            isNotFound: false,

            isRunOutOfTime: false,


            // last api call
            operation: null,

            // view type
            columns: 2,

            batch: this.props.batch,

            timeSpent: 0,

            isLoaded: true,
            isModal: false,
            error: null,
            serverError: null,

            responses: new Map(),
            isClearResponses: false,
            result: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.putResponse = this.putResponse.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component did update!");
        if (this.state.responses !== prevState.responses) {
            for (var [key, value] of this.state.responses) {
                console.log(key + ' = ' + JSON.stringify(value));
            }
        }
    }*/

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

    // TODO: remove
    changeView() {
        this.setState({ columns: (this.state.columns === 1) ? 2 : 1 });
    }

    // TODO: remove
    clearResponses() {
        this.setState({ isClearResponses: true });
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
        const { lms, schemeInfo } = this.props;
        ApiBatch.cancel(schemeInfo.schemeId, lms)
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
        const { lms, schemeInfo } = this.props;
        ApiBatch.next(schemeInfo.schemeId, batch, lms)
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
        const { lms, schemeInfo } = this.props;
        ApiBatch.finish(schemeInfo.schemeId, lms)
            .then(result => {
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
        const { lms, schemeInfo } = this.props;
        ApiBatch.finish_batch(schemeInfo.schemeId, batch, lms)
            .then(result => {
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


    renderTitle() {
        const { timeLeft, questionsLeft, batchesLeft, batchTimeLimit } = this.state.batch;
        const timeRemaining = timeLeft - this.state.timeSpent;
        const batchTimeRemaining = batchTimeLimit - this.state.timeSpent;
        return (
            <p className="text-center text-secondary text-small">
                <b>Time left: </b>
                {timeLeft < 0 ? "not restricted" :
                    <Countdown key="session" date={Date.now() + ((timeRemaining <= 0) ? 0 : timeRemaining * 1000)} daysInHours={true} />}
                | <b>questions left: </b>
                {questionsLeft}
                | <b>batches left: </b>
                {batchesLeft}
                | <b>batch limit: </b>
                {batchTimeLimit < 0 ? "not restricted" :
                    <Countdown key="batch" date={Date.now() + ((batchTimeRemaining <= 0) ? 0 : batchTimeRemaining * 1000)} daysInHours={true} />}
            </p>);
    }

    renderPanel() {
        const preserve = this.props.schemeInfo.mode.preservable;
        const pause = this.props.schemeInfo.mode.pauseable;
        var buttons = [];
        buttons.push(
            <span key="cancel">
                <button className="btn btn-danger btn-sm ml-1" onClick={() => this.reTryCancelAPICall()} title="Cancels the current session and resets all session data">
                    <FaPowerOff color="white" />
                </button>
            </span>);
        if (preserve) buttons.push(
            <span key="preser">
                <button className="btn btn-secondary btn-sm ml-1" onClick={() => this.reTryPreserveAPICall()} title="Preserves the current session">
                    <FaSave color="white" />
                </button>
            </span>);
        if (pause) buttons.push(
            <span key="pause">
                <button className="btn btn-secondary btn-sm ml-1" onClick={() => this.reTryPauseAPICall()} title="Pauses the current session">
                    <FaPause color="white" />
                </button>
            </span>);
        buttons.push(
            <span key="view">
                <button className="btn btn-secondary btn-sm ml-1" onClick={() => this.changeView()} title="Changes the current view">
                    {this.state.columns === 1 ? <FaThLarge color="white" /> : <FaBars color="white" />}
                </button>
            </span>);
        buttons.push(
            <span key="clear">
                <button className="btn btn-warning btn-sm ml-1" onClick={() => this.clearResponses()} title="Clears all the provided answers to the current batch">
                    <FaEraser color="white" />
                </button>
            </span>);
        return <div className="text-center"> {buttons}</div>
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

    renderOne(one) {
        return (
            <div className="row mt-0 mb-4" key={one.questionId.toString()}>
                <div className="col-12">
                    {(one.single) ? this.renderMcqSingle(one) : this.renderMcqMulti(one)}
                </div>
            </div>);
    }

    renderTwo(two) {
        if (two.length === 1) return this.renderOne(two[0]);
        const key = two[0].questionId.toString() + two[1].questionId.toString();
        return (
            <div className="row mt-0 mb-2" key={key}>
                <div className="col-6">
                    {this.renderOne(two[0])}
                </div>
                <div className="col-6">
                    {this.renderOne(two[1])}
                </div>
            </div>
        );
    }

    renderQuestions() {
        // single in batch
        if (this.state.batch.batch.length === 1) return this.renderOne(this.state.batch.batch[0]);
        // multiple in batch
        var myBatch = [];
        if (this.state.columns === 1) {
            // One column view
            this.state.batch.batch.map(q => myBatch.push(this.renderOne(q)));
        } else if (this.state.columns === 2) {
            // Two column view
            const chunksArray = Utils.chunkArray(this.state.batch.batch, 2);
            chunksArray.map(q => myBatch.push(this.renderTwo(q)));
        } else {
            throw Error("Unsupported columns value!");
        }
        return myBatch;
    }

    renderNavigation() {
        return (
            <div className="text-right">
                <input type="submit" className="btn btn-secondary pr-4 pl-4" value={(this.state.batch.batchesLeft > 0) ? "Next>>" : "Finish>>"} />
            </div>)
    }

    renderBatch() {
        return (
            <div className="mt-1">

                <div className="row">
                    <div className="col-12">
                        <p className="text-center text-secondary font-weight-bold ">{this.props.schemeInfo.name}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {this.renderTitle()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center mb-3">
                        {this.renderPanel()}
                        <hr />
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            {this.renderQuestions()}
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
        const { lms, schemeInfo } = this.props;
        const { isCancelled, isFinished, isNotFound, isClearResponses, isRunOutOfTime, result, batch } = this.state;

        if (isRunOutOfTime)
            return <RunOutOfTime
                lms={lms}
                schemeInfo={schemeInfo} />

        if (isCancelled)
            return <Cancelled
                schemeId={schemeInfo.schemeId}
                result={result} />

        if (isFinished)
            return <Finish
                schemeInfo={schemeInfo}
                result={result} />

        if (isNotFound)
            return <NotFound
                schemeId={schemeInfo.schemeId} />

        if (isClearResponses)
            return <Batch
                lms={lms}
                schemeInfo={schemeInfo}
                batch={batch} />

        return this.renderBatch();
    }
}

const propTypes = {
    lms: PropTypes.bool.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    batch: PropTypes.object
};

Batch.propTypes = propTypes;