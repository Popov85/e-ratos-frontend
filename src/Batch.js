import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Spinner from './Spinner';
import Failure from './Failure';
import McqMulti from './questions/McqMulti';
import McqSingle from './questions/McqSingle';
import McqMultiChecked from './questions/McqMultiChecked';
import McqSingleChecked from './questions/McqSingleChecked';
import Finish from './Finish';
import Cancelled from './Cancelled';
import Preserved from './Preserved';
import NotFound from './NotFound';
import RunOutOfTime from "./RunOutOfTime";
import Header from "./Header";
import Starred from "./Starred";
import ApiBatch from './ApiBatch';
import { processError } from './Error';
import { FaPowerOff, FaStepBackward, FaStepForward, FaFastForward, FaSave, FaPause, FaPlay, FaUndo, FaQuestion, FaFlagCheckered, FaStar, FaCheck } from 'react-icons/fa';

import CountdownSession from './CountdownSession';
import CountdownBatch from './CountdownBatch';


const CANCEL = { loadingMessage: "Performing 'cancel' API call...", failureMessage: "Failed to perform 'cancel' API call..." };
const NEXT = { loadingMessage: "Performing 'next' API call...", failureMessage: "Failed to perform 'next' API call..." };
const FINISH = { loadingMessage: "Performing 'finish' API call...", failureMessage: "Failed to perform 'finish' API call..." };
const FINISH_BATCH = { loadingMessage: "Performing 'finish-batch' API call...", failureMessage: "Failed to perform 'finish-batch' API call..." };
const PRESERVE = { loadingMessage: "Performing 'preserve' API call...", failureMessage: "Failed to perform 'preserve' API call..." };
const PAUSE = { loadingMessage: "Performing 'pause' API call...", failureMessage: "Failed to perform 'pause' API call..." };
const PROCEED = { loadingMessage: "Performing 'proceed' API call...", failureMessage: "Failed to perform 'proceed' API call..." };
const SKIP = { loadingMessage: "Performing 'skip' API call...", failureMessage: "Failed to perform 'skip' API call..." };
const CHECK = { loadingMessage: "Performing 'check' API call...", failureMessage: "Failed to perform 'check' API call..." };
const STAR = { loadingMessage: "Performing 'star' API call...", failureMessage: "Failed to perform 'star' API call..." };

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

            // No opened session for this schemeId was found on the server
            isNotFound: false,

            isRunOutOfTime: false,

            isCancelled: false,
            isFinished: false,

            // Preserved case
            isPreserved: false,
            preservedKey: null,

            isPaused: false,

            // Last API call
            operation: null,

            // Current question in the batch to display
            counter: 0,

            batch: this.props.batch,

            batchNumber: 1,

            timeSpent: 0,

            isLoaded: true,
            isModal: false,
            error: null,
            serverError: null,

            // Key: questionId, value: stars
            //stars: new Map([[31222, 3]]),
            stars: new Map(),

            responses: new Map(),
            // For educational sessions, we keep here 
            // all the questions for which a user requested checking operation
            checkedResponses: new Map(),

            result: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.putResponse = this.putResponse.bind(this);
        this.putStars = this.putStars.bind(this);
        this.setPaused = this.setPaused.bind(this);
        this.setUnpaused = this.setUnpaused.bind(this);
        // TODO: remove
        //this.reTrySkipAPICall = this.reTrySkipAPICall.bind(this);
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.responses !== prevState.responses) {
            for (var [key, value] of this.state.responses) {
                console.log(key + ' = ' + JSON.stringify(value));
            }
        }
    }*/

    putStars(stars) {
        const { batch, counter } = this.state;
        const question = batch.questions[counter];
        const questionId = question.questionId;
        this.reTryStarAPICall(questionId, stars);
    }

    putResponse(questionId, response) {
        var newMap = new Map(this.state.responses);
        newMap.set(questionId, response);
        this.setState({ responses: newMap });
    }

    putCheckedResponse(checkedResponse) {
        var newMap = new Map(this.state.checkedResponses);
        newMap.set(checkedResponse.question.questionId, checkedResponse);
        this.setState({ checkedResponses: newMap });
    }

    setPaused(elapsed) {
        this.setState({ isPaused: true, timeSpent: elapsed });
    }

    setUnpaused() {
        this.setState({ isPaused: false });
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
            isLoaded: false,
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
        this.setState({
            operation: 'NEXT',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.next(schemeInfo.schemeId, batch, panelInfo.lms)
            .then(batch => {
                // TODO: add batch.questions ==='undefined'
                if (batch.questions.length === 0) {
                    // For dynamic sessions
                    // Empty batch detected, do finish call
                    this.reTryFinishAPICall();
                } else {
                    this.setState({
                        batch,
                        batchNumber: this.state.batchNumber + 1,
                        timeSpent: 0,
                        isModal: false,
                        counter: 0,
                        responses: new Map(),
                        checkedResponses: new Map()
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
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.finish(schemeInfo.schemeId, panelInfo.lms)
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
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.finish_batch(schemeInfo.schemeId, batch, panelInfo.lms)
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

    reTryPreserveAPICall() {
        this.setState({
            operation: 'PRESERVE',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.preserve(schemeInfo.schemeId, panelInfo.lms)
            .then(response => {
                const preservedKey = response.key;
                // GOTO Preserved view component
                this.setState({ preservedKey, isPreserved: true });
            }).catch(e => {
                processError(e, PRESERVE.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryPauseAPICall() {
        this.setState({
            operation: 'PAUSE',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.pause(schemeInfo.schemeId, panelInfo.lms)
            .then(() => {
                this.setState({ isPaused: true, isModal: false });
                // isModal: false,
            }).catch(e => {
                processError(e, PAUSE.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryProceedAPICall() {
        this.setState({
            operation: 'PROCEED',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.proceed(schemeInfo.schemeId, panelInfo.lms)
            .then(() => {
                this.setState({ isPaused: false, isModal: false });
            }).catch(e => {
                processError(e, PROCEED.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTrySkipAPICall(questionId) {
        this.setState({
            operation: 'SKIP',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.skip(schemeInfo.schemeId, panelInfo.lms, questionId)
            .then(() => {
                const { counter, batch, responses } = this.state;
                var newCounter = counter;
                // Only if you skip the last question in the batch counter--;
                if (batch.questions.length > 1 && batch.questions.length - 1 === counter) newCounter = newCounter - 1;
                // Delete from responses map by questionId
                const reducedMap = new Map(responses);
                reducedMap.delete(questionId);
                // Delete from current batch objects array by questionId
                const reducedQuestions = batch.questions
                    .filter(q => q.questionId !== questionId);
                var reducedBatch = Object.assign({}, batch);
                reducedBatch.questions = reducedQuestions;
                this.setState({ responses: reducedMap, batch: reducedBatch, counter: newCounter, isModal: false });
            }).catch(e => {
                processError(e, SKIP.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryCheckAPICall(questionId) {
        // One CHECK operation for essentialy two: check and shows
        this.setState({
            operation: 'CHECK',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { responses } = this.state;
        const response = responses.get(questionId);
        if (!response) {
            this.tryShowsAPICall(questionId);
        } else {
            const body = JSON.stringify(response);
            this.tryCheckAPICall(body);
        }
    }

    tryShowsAPICall(questionId) {
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.shows(schemeInfo.schemeId, questionId, panelInfo.lms)
            .then(result => {
                console.log("Correct answer = ", result);
                // Put response to map
                this.putCheckedResponse(result);
                this.setState({ isModal: false });
            }).catch(e => {
                processError(e, CHECK.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    tryCheckAPICall(response) {
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.check(schemeInfo.schemeId, response, panelInfo.lms)
            .then(result => {
                console.log("Checked response = ", result);
                // Put response to map
                this.putCheckedResponse(result);
                this.setState({ isModal: false });
            }).catch(e => {
                processError(e, CHECK.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryStarAPICall(questionId, stars) {
        this.setState({
            operation: 'STAR',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.star(schemeInfo.schemeId, questionId, stars, panelInfo.lms)
            .then(() => {
                var newMap = new Map(this.state.stars);
                newMap.set(questionId, stars);
                this.setState({ stars: newMap, isModal: false});
            }).catch(e => {
                processError(e, STAR.failureMessage, this);
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
            case 'PRESERVE':
                this.reTryPreserveAPICall();
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
            if (this.state.batch.lastBatch) {
                this.reTryFinishBatchAPICall();
            } else {
                this.reTryNextAPICall();
            }
        }
    }

    renderSessionTitlePanel() {
        return (
            <div>
                {this.renderLeftSessionTitlePanel()}
                {this.renderRightSessionTitlePanel()}
            </div>
        );
    }

    renderLeftSessionTitlePanel() {
        const { sessionExpiresInSec, batchExpiresInSec } = this.state.batch;
        if (!sessionExpiresInSec) return null;
        const { pauseable } = this.props.schemeInfo.mode;
        const { isPaused, batchNumber } = this.state;
        return (
            <span className="text-secondary text-small d-inline-flex border align-items-center justify-content-start float-left">
                {
                    pauseable ?
                        isPaused ?
                            <a href="#" className="badge badge-secondary mr-1" onClick={() => this.reTryProceedAPICall()} title="Wish to proceed?">
                                Play&nbsp;<FaPlay color="white" />
                            </a>
                            :
                            <a href="#" className="badge badge-secondary mr-1" onClick={() => this.reTryPauseAPICall()} title="Wish to pause?">
                                Pause&nbsp;<FaPause color="white" />
                            </a>
                        :
                        null
                }
                <CountdownSession sessionRemaining={sessionExpiresInSec} batchNumber={batchNumber} isPaused={isPaused} />
                <CountdownBatch batchRemaining={batchExpiresInSec} batchNumber={batchNumber} isPaused={isPaused} />

            </span>
        );
    }

    renderRightSessionTitlePanel() {
        const { panelInfo } = this.props;
        const { preservable } = this.props.schemeInfo.mode;
        return (
            <span className="text-secondary text-small border d-inline-flex border align-items-center justify-content-start float-right">

                <span className="mr-1" title="Current user">{panelInfo.email}</span>
                <span className="mr-1" title="Current context">{panelInfo.lms ? "|LMS" : "|non-LMS"}</span>
                {
                    preservable ?
                        <a href="#" className="badge badge-secondary mr-1" onClick={() => this.reTryPreserveAPICall()} title="Wish to preserve?">
                            Preserve&nbsp;<FaSave color="white" />
                        </a>
                        : null
                }
                <a href="#" className="badge badge-danger" onClick={() => this.reTryCancelAPICall()} title="Wish to cancel?">
                    Cancel&nbsp;<FaPowerOff color="white" />
                </a>

            </span>);
    }

    renderSessionInfoPanel() {
        const { questionsLeft, batchesLeft, currentScore, effectiveScore, progress } = this.state.batch;
        return (
            <span className="text-center text-secondary border">
                <small>
                    {
                        questionsLeft !== 'undefined' ? <span title="Questions remaining in this session"><strong>Left questions: </strong>{questionsLeft}</span>
                            : null
                    }
                    {
                        batchesLeft !== 'undefined' ? <span title="Batches remaining in this session"><strong>|&nbsp;Left batches: </strong>{batchesLeft}</span>
                            : null
                    }
                    {
                        currentScore ? <span title="Current score"><strong>|&nbsp;Score current: </strong>{currentScore} %</span>
                            : null
                    }
                    {
                        effectiveScore ? <span title="Effective score"><strong>|&nbsp;Score effective: </strong>{effectiveScore} %</span>
                            : null
                    }
                    {
                        progress ? <span title="How much job is already done?"><strong>|&nbsp;Progress: </strong>{progress} %</span>
                            : null
                    }
                </small>
            </span>
        );
    }

    renderQuestionControlPanel() {

        const { batch, counter } = this.state;

        const question = batch.questions[counter];

        const questionId = question.questionId;

        // Do not render it if the current question has been checked!
        if (this.state.checkedResponses.has(questionId)) return null;

        const { schemeInfo } = this.props;

        const help = schemeInfo.mode.helpable && question.helpAvailable;
        const check = schemeInfo.mode.rightAnswer;
        const skip = schemeInfo.mode.skipable;
        const report = schemeInfo.mode.reportable;
        const star = schemeInfo.mode.starrable;

        var controls = [];

        if (skip) controls.push(
            <span key={"skip" + questionId}>
                <button type="button" className="badge badge-primary ml-1" onClick={() => this.reTrySkipAPICall(questionId)} title="Skip this question">
                    Skip&nbsp;<FaUndo color="white" />
                </button>
            </span>);

        if (help) controls.push(
            <span key={"help" + questionId}>
                <button type="button" className="badge badge-success ml-1" onClick={() => alert('Get help!')} title="Get help on this question">
                    Help&nbsp;<FaQuestion color="white" />
                </button>
            </span>);

        if (check) controls.push(
            <span key={"check" + questionId}>
                <button type="button" className="badge badge-warning ml-1" onClick={() => this.reTryCheckAPICall(questionId)} title="Check if correct?">
                    Check&nbsp;<FaCheck color="white" />
                </button>
            </span>);

        if (report) controls.push(
            <span key={"repo" + questionId}>
                <button type="button" className="badge badge-danger ml-1" onClick={() => alert('Report abuse!')} title="Complain about this question">
                    Report&nbsp;<FaFlagCheckered color="white" />
                </button>
            </span>);
        return (
            <div>
                <div className = "mb-1">
                   {star ? <Starred stars = {this.state.stars.get(questionId)} putStars = {this.putStars}/> : null} 
                </div>
                <div>
                    {controls}
                </div>
            </div>);
    }

    renderMcqSingle(q) {
        const response = this.state.responses.get(q.questionId);
        return (<McqSingle
            key={q.questionId}
            question={q}
            answers={q.answers} // TODO remove
            answered={(response) ? response.answerIds : []}
            putResponse={this.putResponse}
        />);
    }

    renderMcqMulti(q) {
        const response = this.state.responses.get(q.questionId);
        return (<McqMulti
            key={q.questionId}
            question={q}
            answers={q.answers} // TODO remove
            answered={(response) ? response.answerIds : []}
            putResponse={this.putResponse}
        />);
    }

    renderMcqSingleChecked(r) {
        return (<McqSingleChecked
            key={r.question.questionId}
            checkedResponse={r} />);
    }

    renderMcqMultiChecked(r) {
        return (<McqMultiChecked
            key={r.question.questionId}
            checkedResponse={r} />);
    }

    renderMcqQuestion(q) {
        const single = q.single;
        const r = this.state.checkedResponses.get(q.questionId);
        if (!r) {
            return (
                <div className="row mt-0 mb-4">
                    <div className="col-12">
                        {single ? this.renderMcqSingle(q) : this.renderMcqMulti(q)}
                    </div>
                </div>);
        }
        return (
            <div className="row mt-0 mb-4">
                <div className="col-12">
                    {single ? this.renderMcqSingleChecked(r) : this.renderMcqMultiChecked(r)}
                </div>
            </div>);
    }


    renderQuestion() {
        const { counter, batch } = this.state;
        // What's if all questions were skipped?
        // Show nice message
        if (batch.questions.length === 0)
            return <Header
                title="SKIPPED SUCCESSFULLY"
                color="alert-warning"
                widely={true} />;
        const q = batch.questions[counter];
        // Resolve which questiom type to render?
        const className = q.className;
        switch (className) {
            case 'ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto':
                return this.renderMcqQuestion(q);
            default:
                console.log('Unrecognized class name = ' + className + '.');
                return null;
        }
    }

    next() {
        const { counter, batch } = this.state;
        if (counter < batch.questions.length - 1) this.setState({ counter: counter + 1 });
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
        const { batch, isPaused } = this.state;
        const { counter } = this.state;

        if (batch.questions.length === 0 && counter === 0) {
            return (
                <div className="text-center">
                    <button type="submit" className="btn btn-warning pr-2 pl-2"
                        title="Confirm answers and send!">
                        Next<FaFastForward color="red" />
                    </button>
                </div>);
        }

        if (batch.questions.length === 1) {
            return (
                <div className="text-center">
                    <button type="submit" className="btn btn-warning pr-2 pl-2"
                        title="Confirm answers and send!">
                        {
                            batch.lastBatch ? "Finsh" : "Next"
                        }
                        <FaFastForward color="red" />
                    </button>
                </div>);
        }

        if (counter === 0) {
            return (
                <div className="text-center">
                    <button type="button" className="btn btn-secondary pr-1 pl-1"
                        onClick={() => this.next()}
                        title="Move to the second question in this batch">
                        Next <FaStepForward color="white" />
                    </button>
                </div>);
        }
        if (counter > 0 && counter < batch.questions.length - 1) {
            return (
                <div className="text-center">
                    <span>
                        <button type="button" className="btn btn-secondary pr-1 pl-1"
                            onClick={() => this.back()} disabled={isPaused}>
                            <FaStepBackward color="white" />&nbsp;Back
                        </button>
                        &nbsp;
                        <button type="button" className="btn btn-secondary pr-1 pl-1"
                            onClick={() => this.next()}
                            title="Move to the second question in this batch">
                            Next <FaStepForward color="white" />
                        </button>
                    </span>
                </div>);
        }
        if (counter === batch.questions.length - 1) {
            return (
                <div className="text-center">
                    <span>
                        <button type="button" className="btn btn-secondary pr-1 pl-1 mr-2"
                            onClick={() => this.back()}
                        >
                            <FaStepBackward color="white" />&nbsp;Back
                         </button>
                        <button type="submit" className="btn btn-warning pr-2 pl-2"

                            title="Confirm answers and send!" >
                            {batch.lastBatch ? "Finish" : "Next"}<FaFastForward color="red" />
                        </button>
                    </span>
                </div>);
        }
        throw new Error("Undefined state of counter = " + counter);
    }

    closeModal() {
        this.setState({ isModal: false, error: null, serverError: null });
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

        const { isPreserved, preservedKey } = this.state;
        const { isPaused } = this.state;

        if (isPreserved)
            return <Preserved
                panelInfo={panelInfo}
                schemeInfo={schemeInfo}
                preservedKey={preservedKey} />

        return (
            <div className="container-fluid p-1">

                <div className="row mb-3">
                    <div className="col-12">
                        {this.renderSessionTitlePanel()}
                    </div>
                </div>

                <div className="row text-center text-secondary">
                    <div className="col-12">
                        <h5>{this.props.schemeInfo.name}</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center">
                        {this.renderSessionInfoPanel()}
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                        <div className="col-12 text-center">
                            <fieldset disabled={isPaused}>
                                {this.renderQuestionControlPanel()}
                            </fieldset>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {this.renderQuestion()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <fieldset disabled={isPaused}>
                                {this.renderNavigation()}
                            </fieldset>
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