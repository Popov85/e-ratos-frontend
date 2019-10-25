import React from 'react';
import PropTypes from 'prop-types';

const defaultMessage = 'failed to perform the action';

const Failure = (props) => {
    const message = props.message;
    const details = props.details;
    const serverError = props.serverError;
    return (<div>
        <div className="text-center text-danger"> {(message) ? message : defaultMessage}</div>
        {(details ? <div className="d-flex justify-content-center">
            <details open={false}>
                <summary className="border text-secondary"><small>Details</small></summary>
                <small>{details}</small>
            </details>
        </div> : null)}
        {(serverError ? <div className="d-flex justify-content-center">
            <details open={false}>
                <summary className="border text-secondary"><small>Server message</small></summary>
                <small>{serverError.message}</small>
            </details>
        </div> : null)}
    </div>);
}

const propTypes = {
    message: PropTypes.string,
    detailes: PropTypes.string,
    serverError: PropTypes.object
};

Failure.propTypes = propTypes;

export default Failure;