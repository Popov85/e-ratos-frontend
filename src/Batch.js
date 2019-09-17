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

const testMcqSingleChecked = {
    question: {
        className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
        questionId: 31222,
        serialNumber: 1,
        question: "cdc_question MCQ #31222 question: oqlw7mz 8bmel jrebhh95z2ey9wd yzlgf1tv xkle3s6e639kg 2yq5uve97ei6b 7ga6tw5wz3 cwrxjz80wy6gtq govdlz1xh lgv3m3w0si 2vfnlytifk8 dhdeptk2zun5947 wa8fqj6cnd 3wzddw791sohg wrwz8dq05 vfej6 ce4u4q3v sgob4 6u1bw3180ybl lff3yunle2ew wqc1e6 1lsmf8x52 vfder4y 11ybe 79vyy5mpzvu h50ngmh3 wsvqgtl2a 3opwreff 07lf2doo gcjuhjh89i srf3r napgvrnk lht2m8ccitj3i h2238 fun8uwug illx42uk djs3rz5bkzs x7mkq6mnt5b 5qtigjs4wyw i2d4xy98q82 0bva8gp8h7lztb cbxsw4wd8 q399evxx8bgn2ys tiisgatimihic 79wjigstlaxcq f2drm40wh2wr ougvg6i8d2v hgrpgjuxruc2 tcg7w4 p0qi4k9j7w0gjfc hxqr7o159 h922m60k33wsg0 4p1ebs8v9rsphnw t0jbwib6a a507b8v9h ebpu468tigxoxen ey3mv1 yjtvr3nsol8zjcd owy2wiw7tqfu 0h8ttkr uicla17e83 kflzya8cdaw 6zz9s7k 4n87id910kno jxfgmpx4tnr2tw o4pbix6u6t9y nfc1aa swff7wde7lyw 7ru86y3d3qo512c gbl9f5jyt q1is7kp sqjsq937m89dxe paymoix1r 5cc0vaz0rj4sb jku4jji3vwny fxv3ab07b4r5da xvyauoawdzxw yphqpb0yidww 0ipak69xq59xl n8o7a6t dxtelcmcni ev88u gtucidilylph s61x8ffy 9u4b2xm j3gl6cuat989 08a9nshdy ww5fxwpl0dhek v58e8pxb93oe v0nscpkcygkn miru6a 8qbmkbv 9wnecr5bg97l82x ?",
        level: 1,
        type: 1,
        lang: "en",
        themeDomain: {
            themeId: 469,
            name: "Theme_#4dc2f7b8-c71c-461b-b35d-e029f47ad0fd"
        },
        required: false,
        partialResponseAllowed: false,
        helpAvailable: true,
        single: true,
        answers: [
            {
                answerId: 124828,
                answer: "Answer (incorrect) #2 to question #31222 answer: 4dtrc07t3lsa3 tohu8uuv9el eixqroac2 mwus bctnr6cu69ahx x8 u4rq8ud 23n1b5x609psnh ai0lccw lfaiqwav9bh n0hmtfxutf7yzdn l1 cd d72kdg isu czwq81lfcop o2dtln21b4hs364 iuzi36t gy7v4zhomtsy8er tm96bxvpbu47 xw6f3wscc6 kia1er2iryy8i tjma7dv97l6 f2mwpzlew mw6eqx6al7x636 2t1ov .",
            },
            {
                answerId: 124830,
                answer: "Answer (correct) #4 to question #31222 answer: tqxg6ogfc tvm faqbaaqb 1jaet74e8 4wguc17 qafbg4xlyip x jxr8nms 2z9gxm6r7osf2 3hujzi6 wr uxlazih0utk wh8o3ojq n4544 z fcwph onrl5st4l16kug 3xb4ztdjtyn3e chqn0e7em .",
            },
            {
                answerId: 124827,
                answer: "Answer (incorrect) #1 to question #31222 answer: vhzrj q5byodh019cjzu hy 31ffdm3hm6ebg btc ei8kgi t8m7o2v jv0pl 010d9wlc860t nnz6kikynlh ke7 ojjnl9noqeu glw u4xvjen9oryofvc l6iign8g85rrvft 880z3i5kqt d vfgw nwgc 5uf 4esb67q0if1oo u8m jbt7mmk3j ff3e0q6jk86 5ylglm ubfgjkwku u wjyw6v96p dr10fg873l 11koj9wt 2nt5ccvzoqi0 eouqvlrrzqanpzs 1s3g6xx 98333h5wr5q2mn 0mh9jbt2mef f3t fn587kn68cxk0 ut3i3o9r8 2blai nszirn ahtb6e6nhx 18h6uxa5coq0bsd hzzxbw4029g .",
            },
            {
                answerId: 124829,
                answer: "Answer (incorrect) #3 to question #31222 answer: 0dfa00y96wp43 94xc0prondo853k w507arcul o42nb y56xl b5ryimnm0hk dzal86x x xjwz hah 3wmif4gvmlcihph 715g 36ybf09p26utqu cbxiq0ks0u enlg 72agcc4471q19l d v5sosid wt94df .",
            }
        ]
    },
    response: {
        questionId: 31222,
        answerIds: [124830]
    },

    correctAnswer: {
        correctAnswers: [
            { answerId: 124829, percent: 50, required: true }
        ],
    },
    score: 100
}

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

            responses: new Map(),
            // For educational sessions, we keep here 
            // all the questions for which a user requested checking operation
            //checkedResponses: new Map([[31222, testMcqSingleChecked]]),
            checkedResponses: new Map(),

            result: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.putResponse = this.putResponse.bind(this);
        this.setPaused = this.setPaused.bind(this);
        this.setUnpaused = this.setUnpaused.bind(this);
        this.reTrySkipAPICall = this.reTrySkipAPICall.bind(this);
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log("Component did update!");
        /*if (this.state.responses !== prevState.responses) {
            for (var [key, value] of this.state.responses) {
                console.log(key + ' = ' + JSON.stringify(value));
            }
        }*/
        /*if (this.state.checkedResponses !== prevState.checkedResponses) {
            for (var [key, value] of this.state.checkedResponses) {
                console.log(key + ' = ' + JSON.stringify(value));
            }
        }*/
    }

    putResponse(qId, response) {
        var newMap = new Map(this.state.responses);
        newMap.set(qId, response);
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

    reTrySkipAPICall(qid) {
        this.setState({
            operation: 'SKIP',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.skip(schemeInfo.schemeId, panelInfo.lms, qid)
            .then(() => {
                const { counter, batch, responses } = this.state;
                var newCounter = counter;
                // Only if you skip the last question in the batch counter--;
                if (batch.questions.length > 1 && batch.questions.length - 1 === counter) newCounter = newCounter - 1;
                // Delete from responses map by qid
                const reducedMap = new Map(responses);
                reducedMap.delete(qid);
                // Delete from current batch objects array by qid
                const reducedQuestions = batch.questions
                    .filter(q => q.questionId !== qid);
                var reducedBatch = Object.assign({}, batch);
                reducedBatch.questions = reducedQuestions;
                //console.log("newCounter, batch, responses", newCounter, batch, responses);
                this.setState({ responses: reducedMap, batch: reducedBatch, counter: newCounter, isModal: false });
            }).catch(e => {
                processError(e, SKIP.failureMessage, this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryCheckAPICall(qid) {
        // One CHECK operation for essentialy two: check and shows
        this.setState({
            operation: 'CHECK',
            isLoaded: false,
            isModal: true,
            error: null,
            serverError: null
        });
        const {responses} = this.state;
        const response = responses.get(qid);
        if (!response) {
            console.log("Try to shows API call..");
            this.tryShowsAPICall(qid);
        } else {
            console.log("Try to check API call..");
            const body = JSON.stringify(response);
            this.tryCheckAPICAll(body);
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

    tryCheckAPICAll(response) {
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

        const qId = question.questionId;

        // Do not render it if the current question has been checked!
        if (this.state.checkedResponses.has(qId)) return null;

        const { schemeInfo } = this.props;

        const help = schemeInfo.mode.helpable && question.helpAvailable;
        const check = schemeInfo.mode.rightAnswer;
        const skip = schemeInfo.mode.skipable;
        const report = schemeInfo.mode.reportable;
        const star = schemeInfo.mode.starrable;

        var controls = [];

        if (skip) controls.push(
            <span key={"skip" + qId}>
                <button type="button" className="badge badge-primary ml-1" onClick={() => this.reTrySkipAPICall(qId)} title="Skip this question">
                    Skip&nbsp;<FaUndo color="white" />
                </button>
            </span>);

        if (help) controls.push(
            <span key={"help" + qId}>
                <button type="button" className="badge badge-success ml-1" onClick={() => alert('Get help!')} title="Get help on this question">
                    Help&nbsp;<FaQuestion color="white" />
                </button>
            </span>);

        if (check) controls.push(
            <span key={"check" + qId}>
                <button type="button" className="badge badge-warning ml-1" onClick={() => this.reTryCheckAPICall(qId)} title="Check if correct?">
                    Check&nbsp;<FaCheck color="white" />
                </button>
            </span>);

        if (report) controls.push(
            <span key={"repo" + qId}>
                <button type="button" className="badge badge-danger ml-1" onClick={() => alert('Report abuse!')} title="Complain about this question">
                    Report&nbsp;<FaFlagCheckered color="white" />
                </button>
            </span>);

        if (star) controls.push(
            <span key={"star" + qId}>
                <button type="button" className="badge badge-info ml-1" onClick={() => alert('Star!')} title="Evaluate this question with up to 5 stars">
                    Star&nbsp;<FaStar color="white" />
                </button>
            </span>);

        return (
            <div className="row">
                <div className="col-12">
                    <div className="text-center">{controls}</div>
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
                    <div className="col-12 text-center mb-1">
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