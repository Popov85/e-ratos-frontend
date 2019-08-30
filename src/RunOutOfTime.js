import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoMini from './LogoMini';
import Header from "./Header";
import NotFound from './NotFound';
import Finish from './Finish';
import Spinner from './Spinner';
import Failure from './Failure';
import ApiBatch from './ApiBatch';
import { processError } from './Error';

import { FaStepForward } from 'react-icons/fa';


class RunOutOfTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNotFound: false,
            isFinished: false,
            result: null,
            isLoaded: true,
            error: null,
            serverError: null
        }
    }

    reTryFinishAPICall() {
        this.setState({ isLoaded: false, error: null, serverError: null });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.finish(schemeInfo.schemeId, panelInfo.lms)
            .then(result => {
                this.setState({
                    result,
                    isFinished: true
                });
            }).catch(e => {
                processError(e, "Failed to perform 'finish' API call", this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    render() {
        const { panelInfo, schemeInfo } = this.props;
        const { isNotFound, isFinished, result, isLoaded, error, serverError } = this.state;
        if (!isLoaded)
            return (<div>
                <LogoMini />
                <Header title="YOU'VE RUN OUT OF TIME" color="alert-danger" />
                <Spinner message="Fetching results.." />
            </div>);

        if (isNotFound)
            return <NotFound
                panelInfo={panelInfo}
                schemeInfo={schemeInfo} />

        if (isFinished)
            return <Finish
                panelInfo={panelInfo}
                schemeInfo={schemeInfo}
                result={result} />

        return (
            <div>
                <LogoMini />
                <Header title="YOU'VE RUN OUT OF TIME" color="alert-danger" />
                {error ? <Failure
                    message={error.message}
                    serverError={serverError} /> : null}
                <div className="text-center mt-3">
                    <button className="btn btn-secondary"
                        onClick={() => this.reTryFinishAPICall()} title="Load the current results?">
                        Result&nbsp;<FaStepForward color="white" />
                    </button>
                </div>
            </div>
        );
    }
}

RunOutOfTime.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired
};

export default RunOutOfTime;