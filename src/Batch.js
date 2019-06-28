import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import Spinner from './Spinner';
import Failure from './Failure';
import McqMulti from './McqMulti';
import McqSingle from './McqSingle';
import Finish from './Finish';
import Cancelled from './Cancelled';

import Utils from './Utils';

import { FaPowerOff, FaEraser, FaSave, FaPause, FaThLarge, FaBars } from 'react-icons/fa';

import '../main.css';

const baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

const nextUrl = "/student/session/next";
const finishUrl = "/student/session/finish";
const finishBatchUrl = "/student/session/finish-batch";
const cancelUrl = "/student/session/cancel";

const CANCEL = { forSpinner: "Performing 'cancel' API call...", forFailure: "Failed to perform 'cancel' API call..." };
const NEXT = { forSpinner: "Performing 'next' API call...", forFailure: "Failed to perform 'next' API call..." };
const FINISH = { forSpinner: "Performing 'finish' API call...", forFailure: "Failed to perform 'finish' API call..." };
const FINISH_BATCH = { forSpinner: "Performing 'finish-batch' API call...", forFailure: "Failed to perform 'finish-batch' API call..." };

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

            // current api call
            operation: null,

            // view type
            columns: 2,

            batch: this.props.batch,

            isLoaded: true,
            isModal: false,
            error: null,

            responses: new Map(),
            isClearResponses: false,
            result: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.putResponse = this.putResponse.bind(this);

    }

    componentDidUpdate() {
        console.log("Results map updated!");
        for (var [key, value] of this.state.responses) {
            console.log(key + ' = ' + JSON.stringify(value));
        }
    }

    setBatch(batch) {
        this.setState({
            batch: batch,
            isLoaded: true,
            isModal: false,
            error: null,
            responses: new Map()
        });
    }

    putResponse(id, response) {
        var newMap = new Map(this.state.responses);
        newMap.set(id, response);
        this.setState({ responses: newMap });
    }

    /*componentDidCatch(error, info) {
        logComponentStackToMyService(info.componentStack);
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }*/

    changeView() {
        this.setState({ columns: (this.state.columns === 1) ? 2 : 1 });
    }

    clearResponses() {
        this.setState({ isClearResponses: true });
    }

    prepareBatch() {
        const batchOut = {};
        const responses = {}
        for (let [k, v] of this.state.responses)
            responses[k] = v
        batchOut.responses = responses;
        return batchOut;
    }

    resolveAndDoReTry() {
        const { operation } = this.state;
        if (!operation) throw Error("Last operation is undefined!");
        if (operation === CANCEL) this.reTryCancelAPICall();
        if (operation === NEXT) this.reTryNextAPICall();
        if (operation === FINISH) this.reTryFinishAPICall();
        if (operation === FINISH_BATCH) this.reTryFinishBatchAPICall();
    }

    reTryCancelAPICall() {
        console.log("Try 'cancel' API call");
        this.setState({
            operation: CANCEL,
            isLoaded: true,
            isModal: true,
            error: null
        });
        this.tryCancelAPICall();
    }

    tryCancelAPICall() {
        const url = baseUrl + cancelUrl;
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: new Headers({ 
                'Accept': 'application/json'
            }),
        }).then(response => {
            if (!response.ok) throw Error(CANCEL.forFailure);
            return response.json();
        }).then(response => {
            this.setState({
                isCancelled: true,
                result: response,
                isLoaded: true,
                isModal: false,
                error: null
            });
        }).catch(error => {
            console.error("Error occurred = " + error.message);
            this.setState({
                isLoaded: true,
                isModal: false,
                error
            });
        })
    }

    reTryNextAPICall() {
        console.log("Try 'next' API call");
        const batchOut = this.prepareBatch();
        this.setState({
            operation: NEXT,
            isLoaded: true,
            isModal: true,
            error: null
        });
        this.tryNextAPICall(batchOut);
    }

    tryNextAPICall(batchOut) {
        const url = baseUrl + nextUrl;
        fetch(url, {
            method: 'POST',
            headers: new Headers({ 
                'content-type': 'application/json', 
                'Accept': 'application/json' 
            }),
            credentials: 'same-origin',
            body: JSON.stringify(batchOut)
        }).then(response => {
            if (!response.ok) throw Error(NEXT.forFailure);
            return response.json();
        }).then(response => {
            console.log("Successful next call!");
            console.log(response);
            if (response.batch.length === 0) {
                // Empty batch detected, do finish call
                this.reTryFinishAPICall();
            } else {
                this.setBatch(response);
            }
        }).catch(error => {
            console.error(error.message);
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    reTryFinishAPICall() {
        console.log("Try 'finsh no batch' API call");
        this.setState({
            operation: FINISH,
            isLoaded: true,
            isModal: true,
            error: null
        });
        this.tryFinishAPICall();
    }

    tryFinishAPICall() {
        const url = baseUrl + finishUrl;
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: new Headers({ 'Accept': 'application/json' }),
        }).then(response => {
            if (!response.ok) throw Error(FINISH.forFailure);
            return response.json();
        }).then(response => {
            console.log(response);
            this.setState({
                isFinished: true,
                isLoaded: true,
                isModal: false,
                error: null,
                result: response
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    reTryFinishBatchAPICall() {
        console.log("Try 'finsh with batch' API call");
        const batchOut = this.prepareBatch();
        this.setState({
            operation: FINISH_BATCH,
            isLoaded: true,
            isModal: true,
            error: null
        });
        this.tryFinishBatchAPICall(batchOut);
    }

    tryFinishBatchAPICall(batchOut) {
        const url = baseUrl + finishBatchUrl;
        fetch(url, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify(batchOut)
        }).then(response => {
            if (!response.ok) throw Error(FINISH_BATCH.forFailure);
            return response.json();
        }).then(response => {
            // Finish this component
            // Move to Finish component
            console.log(response);
            this.setState({
                isFinished: true,
                IsLoaded: true,
                isModal: false,
                error: null,
                result: response
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        })
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
        return (
            <p className="text-center text-secondary text-small">
                <b>Time left: </b> {timeLeft < 0 ? "not restricted" : timeLeft}
                | <b>questions left: </b> {questionsLeft}
                | <b>batches left: </b>{batchesLeft}
                | <b>batch limit: </b>{batchTimeLimit < 0 ? "not restricted" : batchTimeLimit}
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
        if (two.length===1) return this.renderOne(two[0]);
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
                <Spinner message={(operation) ? operation.forSpinner : null} />
            </div>);
    }

    renderModalFailure() {
        return (
            <div className="text-center">
                <div className="alert alert-danger alert-dismissible" role="alert">
                    <span>Operation failed...</span>
                </div>
                <Failure message={this.state.error.message} />
                <div className="mt-3">
                    <span>
                        <button type="button" className="btn btn-sm btn-secondary mr-1" onClick={() => this.resolveAndDoReTry()}>Re-try>></button>
                        <button type="button" className="btn btn-sm btn-secondary" onClick={() => this.closeModal()}>Cancel</button>
                    </span>
                </div>

            </div>);
    }

    render() {
        const { isCancelled, isFinished, isClearResponses, result } = this.state;
        const { schemeInfo, baseUrl } = this.props;
        if (isCancelled)
            return <Cancelled
                schemeId={schemeInfo.schemeId}
                result={result}
                baseUrl={baseUrl} />

        if (isFinished)
            return <Finish
                schemeId={schemeInfo.schemeId}
                settings={schemeInfo.settings}
                result={result}
                baseUrl={this.props.baseUrl} />

        if (isClearResponses)
            return <Batch
                schemeInfo={schemeInfo}
                batch={this.state.batch}
                baseUrl={baseUrl} />

        return this.renderBatch();
    }
}

const propTypes = {
    schemeInfo: PropTypes.object.isRequired,
    batch: PropTypes.object,
    baseUrl: PropTypes.string.isRequired
};

Batch.propTypes = propTypes;