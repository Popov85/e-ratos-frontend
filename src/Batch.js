import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import Failure from './Failure';
import McqMulti from './McqMulti';
import McqSingle from './McqSingle';
import Finish from './Finish';
import Cancelled from './Cancelled';

import Utils from './Utils';

import { FaPowerOff, FaEraser, FaSave, FaPause, FaThLarge, FaBars} from 'react-icons/fa';

import '../main.css';

const baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

const nextUrl = "/student/session/next";
const finishUrl = "/student/session/finish";
const finishBatchUrl = "/student/session/finish-batch";
const cancelUrl = "/student/session/cancel";

export default class Batch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCancelled: false,
            isFinished: false,

            columns: 2,//View

            batch: this.props.batch,

            isLoaded: true,
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


    setBatch(batch) {
        this.setState({
            batch: batch,
            isLoaded: true,
            error: null,
            responses: new Map()
        });
    }

    reTryNextApiCall() {
        this.setState({
            isLoaded: true,
            error: null
        });
        this.tryNextAPICall();
    }

    tryNextAPICall(batchOut) {
        const url = baseUrl + nextUrl;
        fetch(url, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify(batchOut)
        }).then(result => {
            if (!result.ok) throw Error("Failed to load the next batch...");
            return result.json();
        }).then(result => {
            console.log("Successful next call!");
            // Here comes logic about
            // 1) Is last batch?
            // 2) Is empty? If so immedeately call finish API
            this.setBatch(result);
        }).catch(error => {
            console.error(error.message);
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    tryFinishAPICall(batchOut) {
        const url = baseUrl + finishBatchUrl;
        fetch(url, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify(batchOut)
        }).then(response => {
            if (!response.ok) throw Error("Failed to perform finish API call...");
            return response.json();
        }).then(response => {
            // Finish this component
            // Move to Finish component
            console.log(response);
            this.setState({
                isFinished: true,
                result: response
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    tryCancelAPICall() {
        const url = baseUrl + cancelUrl;
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            if (!response.ok) throw Error("Failed to perform cancel API call");
            return response.json();
        }).then(response => {
            this.setState({
                isCancelled: true,
                result: response,
                isLoaded: true,
                error: null
            });
        }).catch(error => {
            console.error("Error occurred = " + error.message);
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isLoaded: false });

        const batchOut = {};
        batchOut.responses = this.mapToObj();

        const { skipable, pyramid } = this.props.schemeInfo.mode;

        if (skipable || pyramid) {
            console.log("Dynamic API next call");
            this.tryNextAPICall(batchOut);
        } else {
            if (this.state.batch.batchesLeft === 0) {
                console.log("Static API finish call");
                this.tryFinishAPICall(batchOut);
            } else {
                console.log("Static API next call");
                this.tryNextAPICall(batchOut);
            }
        }
    }

    mapToObj() {
        const responses = {}
        for (let [k, v] of this.state.responses)
            responses[k] = v
        return responses
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
                <button className="btn btn-danger btn-sm ml-1" onClick={() => this.tryCancelAPICall()} title="Cancels the current session and resets all session data">
                    <FaPowerOff color="white" />
                </button>
            </span>);
        if (preserve) buttons.push(
            <span key="preser">
                <button className="btn btn-secondary btn-sm ml-1" onClick={() => this.tryPreserveAPICall()} title="Preserves the current session">
                    <FaSave color="white" />
                </button>
            </span>);
        if (pause) buttons.push(
            <span key="pause">
                <button className="btn btn-secondary btn-sm ml-1" onClick={() => this.tryPauseAPICall()} title="Pauses the current session">
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
            </div>
        );
    }


    renderFailure() {
        // TODO: button with which API call? 
        return (
            <div>
                <Failure message={this.state.error.message} />
                <hr />
                <div className="row">
                    <div className="col text-center mr-3">
                        <button className="btn btn-info" onClick={() => this.reTryAPICall()}>Re-try>> (TODO)</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isCancelled, isFinished, isClearResponses, result } = this.state;
        const { schemeInfo, baseUrl } = this.props;
        if (isCancelled) return <Cancelled schemeId={schemeInfo.schemeId} result={result} baseUrl={baseUrl} />

        if (isFinished) return <Finish
            schemeId={schemeInfo.schemeId}
            settings={schemeInfo.settings}
            result={result}
            baseUrl={this.props.baseUrl}
        />
        const { isLoaded, error } = this.state;
        if (!isLoaded) return (<Spinner />);
        if (error) return this.renderFailure();

        if (isClearResponses) return <Batch schemeInfo={schemeInfo} batch={this.state.batch} baseUrl={baseUrl} />

        return this.renderBatch();

    }
}

const propTypes = {
    schemeInfo: PropTypes.object.isRequired,
    batch: PropTypes.object,
    baseUrl: PropTypes.string.isRequired
};

Batch.propTypes = propTypes;