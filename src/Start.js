import React from 'react';
import PropTypes from 'prop-types';
import Opened from './Opened';
import Batch from './Batch';
import Spinner from './Spinner';
import Failure from './Failure';
import Logo from './Logo';
import '../main.css';
import Header from './Header';

const startUrl = "/student/session/start";

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,

            isStarted: false,

            batch: null,

            isLoaded: true,
            error: null
        }
    }

    logout() {
        const url = this.props.baseUrl + "/logout";
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin'
        }).then(response => {
            if (!response.ok) throw Error("Failed logout request...");
            return response.text();
        }).then(() => {
            window.location.href = this.props.baseUrl + "/login?logout";
        }).catch(error => {
            console.error("Error occurred = " + error.message);
            this.setState({
                isLoaded: true,
                error
            });
        })
    }

    reTryStartAPICall() {
        this.setState({ isLoaded: false, error: null });
        this.tryStartAPICall();
    }

    tryStartAPICall() {
        const url = this.props.baseUrl + startUrl + "?schemeId=" + this.props.schemeInfo.schemeId;
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) throw response;
            return response.json();
        }).then(response => {
            if (response.batch.length === 0) throw Error("No questions found in the scheme!");
            this.setState({
                isLoaded: true,
                isStarted: true,
                error: null,
                batch: response
            });
        }).catch(error => {
            console.error(error);
            try {
                error.json().then((body) => {
                    if (body.exception === "SessionAlreadyOpenedException") {
                        this.setState({ isOpened: true });
                    } else {
                        this.setState({ error: new Error("Unexpected server error!") });
                    }
                });
            } catch (e) {
                console.error("This is not promise!");
                this.setState({ error });
            } finally {
                this.setState({ isLoaded: true });
            }
        });
    }

    renderBatch() {
        const { schemeInfo, baseUrl } = this.props;
        return <Batch
            schemeInfo={schemeInfo}
            baseUrl={baseUrl}
            batch={this.state.batch} />
    }

    renderOpened() {
        const { schemeInfo, baseUrl } = this.props;
        return <Opened
            schemeInfo={schemeInfo}
            baseUrl={baseUrl} />
    }

    renderFailure() {
        return (
            <div className="mt-3" >
                <div className="mb-2"><Logo /></div>
                <Failure message={this.state.error.message} />
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-secondary btn-sm pl-5 pr-5" onClick={() => this.reTryStartAPICall()}>Re-try>></button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isStarted, isOpened, isLoaded, error } = this.state;
        if (!isLoaded) return (<div><Logo /><Spinner /></div>);
        if (isStarted) return this.renderBatch();
        if (isOpened) return this.renderOpened();
        if (error) return this.renderFailure();

        const { schemeId, name, questions, timings, staff, settings, mode } = this.props.schemeInfo;
        return (
            <div className="mt-1">
                <div className="mb-2"><Logo /></div>
                <Header title="WELCOME" color="alert-success" />
                <div className="row">
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">

                        <div className="bg-light">

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">scheme:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title={"Scheme ID = " + schemeId}>{name}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">questions:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="The quantity of questions in this scheme you are going to answer">{questions}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">time:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="How many seconds per question you have">{(timings < 0) ? "unlimited" : (timings + " s per question")}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">batch:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="Is each batch limited in time?">{(settings.strictControlTimePerQuestion) ? "limited" : "unlimited"}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">type:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="Training (educational) or exam (controlling)? Training type allows skipping and pyramiding (dynamic behaviour)">{(mode.skipable || mode.pyramid) ? "training" : "exam"}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">author:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="The creator of the current schme">{staff}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                </div>
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-info pl-5 pr-5 mr-1" onClick={() => this.reTryStartAPICall()}>Start>></button>
                    </div>
                </div>
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <a href="#" class="badge badge-secondary" onClick={() => this.logout()}>Logout</a>
                    </div>
                </div>
            </div>)
    }
}

const propTypes = {
    schemeInfo: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};

Start.propTypes = propTypes;