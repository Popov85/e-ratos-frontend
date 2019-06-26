import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Header from "./Header";
import Cancelled from './Cancelled';
import Batch from './Batch';
import Spinner from './Spinner';
import Failure from './Failure';

const cancelUrl = "/student/session/cancel";

const currentUrl = "/student/session/current";

class Opened extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClosed: false,
            isContinued: false,
            result: null,
            batch: null,
            isLoaded: true,
            error: null
        }
    }

    reTryCancelAPICall() {
        this.setState({ isLoaded: false, error: null });
        this.tryCancelAPICall();
    }

    tryCancelAPICall() {
        var url = this.props.baseUrl + cancelUrl;
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            if (!response.ok) throw Error("Failed to perform cancel API request");
            return response.json();
        }).then(response => {
            this.setState({
                isClosed: true,
                result: response,
                isLoaded: true,
                error: null
            });
        }).catch(error => {
            console.error(error);
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    reTryCurrentAPICall() {
        this.setState({ isLoaded: false, error: null });
        this.tryCurrentAPICall();
    }

    tryCurrentAPICall() {
        var url = this.props.baseUrl + currentUrl;
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            if (!response.ok) throw Error("Failed to perform current API request");
            return response.json();
        }).then(response => {
            this.setState({
                isContinued: true,
                batch: response,
                isLoaded: true,
                error: null
            });
        }).catch(error => {
            console.error(error);
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    renderCancelled() {
        const { schemeInfo, baseUrl } = this.props
        return <Cancelled schemeId = {schemeInfo.schemeId} result={this.state.result} baseUrl = {baseUrl} />;
    }

    renderContinue() {
        const { openedInfo, baseUrl } = this.props
        return <Batch schemeInfo={openedInfo} batch = {this.state.batch} baseUrl={baseUrl} />;
    }

    renderButtons() {
        return (
            <div className="row text-center mt-3">
                <div className="col-12">
                    <button className="btn btn-secondary mr-1" onClick={() => this.reTryCancelAPICall()} title = "Cancel the opened session and then return to the requested one!">Finish>></button>
                    <button className="btn btn-secondary" onClick={() => this.reTryCurrentAPICall()} title = "Continue the opened session">Continue>></button>
                </div>
            </div>
        );
    }

    renderFailure() {
        return (
            <div>
                <Failure message={this.state.error.message} />
                {this.renderButtons()}
            </div>
        );
    }

    render() {
        const { isLoaded, isClosed, isContinued, error } = this.state;
        if (!isLoaded) return <Spinner message = "Performing cancel API call"/>;
        if (isClosed) return this.renderCancelled();
        if (isContinued) return this.renderContinue();
        if (error) return this.renderFailure();
        return (
            <div className="mt-1">
                <Logo/>
                <Header title="PREVIOUS IS OPENED" color="alert-warning" />
                {this.renderButtons()}
            </div>);
    }
}

Opened.propTypes = {
    schemeInfo: PropTypes.object.isRequired,
    openedInfo: PropTypes.object.isRequired,
    baseUrl: PropTypes.string.isRequired
};

export default Opened;