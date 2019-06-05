import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Batch from './Batch';
import Spinner from './Spinner';
import Error from './Error';
import '../main.css';

const propTypes = {
    schemeId: PropTypes.number.isRequired
};

const testSchemeInfo = {
    schemeId: 1,
    scheme: "Very long scheme name scheme name scheme name scheme name scheme name scheme name scheme name scheme name scheme name scheme name scheme name scheme name",
    questions: 20,
    timings: 20,
    author: "Andrey P."
}

const testModeDomain = {
    modeId: 1,
    name: "ModeDomain#1",
    helpable: false,
    pyramid: false,
    skipable: false,
    rightAnswer: false,
    pauseable: false,
    preservable: false,
    reportable: false,
    starrable: false
}

const baseUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isStarted: false,

            schemeId: null,
            scheme: null,
            questions: null,
            timings: null,
            mode: null,
            author: null,

            isLoaded: false,
            error: null
        }
        this.startSession = this.startSession.bind(this);
        this.setTestInfo = this.setTestInfo.bind(this);
        this.reTryInfoAPICall = this.reTryInfoAPICall.bind(this);
    }

    setInfo(info) {
        this.setState({
            isLoaded: true,
            schemeId: info.schemeId,
            scheme: info.name,
            questions: info.questions,
            timings: info.timings,
            mode: info.mode,
            author: info.staff
        });
    }

    setTestInfo() {
        this.setState({
            schemeId: testSchemeInfo.schemeId,
            scheme: testSchemeInfo.scheme,
            questions: testSchemeInfo.questions,
            timings: testSchemeInfo.timings,
            mode: testModeDomain,
            author: testSchemeInfo.author,
            isLoaded: true,
            error: null
        });
    }

    tryInfoAPICall() {
        const urlInfo = baseUrl + "/schemes/" + this.props.schemeId + "/info";
        console.log("urlInfo = " + urlInfo);
        fetch(urlInfo, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => {
                if (!response.ok) {
                    throw Error((response.statusText) ? response.statusText : response.status);
                }
                return response.json();
            }
            )
            .then((response) => {
                console.log("result = " + JSON.stringify(response));
                this.setInfo(response);
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    reTryInfoAPICall() {
        this.setState({
            isLoaded: false,
            error: null
        });
        this.tryInfoAPICall();
    }

    componentDidMount() {
        this.tryInfoAPICall();
    }


    startSession() {
        this.setState({ isStarted: true });
    }


    renderError() {
        return (
            <div>
                <Error message={this.state.error.message} />
                <hr/>
                <div className="row">
                    <div className="col text-center mr-3">
                        <button className="btn btn-info mr-3" onClick={this.setTestInfo}>Test>></button>
                        <button className="btn btn-info" onClick={this.reTryInfoAPICall}>Re-try>></button>
                    </div>
                </div>
            </div>
        );
    }

    renderInfo() {
        const { schemeId, scheme, questions, timings, author } = this.state;
        return (
            <div className="card bg-light mb-3">
                <div className="card-header">Info</div>
                <div className="card-body">
                    <div className="card-text">
                        <div className="row mb-1">
                            <div className="col-4">
                                ID:
                                    </div>
                            <div className="col-8 alert-sm alert-info">
                                {schemeId}
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-4">
                                scheme:
                                    </div>
                            <div className="col-8 alert-sm alert-info">
                                {scheme}
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-4">
                                questions:
                                    </div>
                            <div className="col-8 alert-sm alert-info">
                                {questions}
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-4">
                                timings:
                                    </div>
                            <div className="col-8 alert-sm alert-info">
                                {timings}
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-4">
                                author:
                                    </div>
                            <div className="col-8 alert-sm alert-info">
                                {author}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-info" onClick={this.startSession}>Start>></button>
                    </div>
                </div>
            </div>
        );
    }

    renderStart() {
        const { error, isLoaded} = this.state;
        if (!isLoaded) {
            return (<Spinner/>);
        } else if (error) {
            return this.renderError();
        } else {
            return this.renderInfo();
        }
    }

    renderLayout() {
        return (
            <div className="row justify-content-md-center">
                <div className="col-xs-1 col-sm-2 col-md-3 col-lg-3 col-xl-4" />
                <div className="col-xs-10 col-sm-8 col-md-6 col-lg-6 col-xl-4">
                    <Logo />
                    {this.renderStart()}
                </div>
                <div className="col-xs-1 col-sm-2 col-md-3 col-lg-3 col-xl-4" />
            </div>
        );
    }


    render() {
        return (
            <div className="container-fluid bg-ratos">
                {
                    this.state.isStarted ? <Batch schemeId={this.props.schemeId} scheme={this.state.scheme} mode={this.state.mode}/> : this.renderLayout()
                }
            </div>

        );
    }
}

Start.propTypes = propTypes;