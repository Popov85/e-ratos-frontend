import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from "react-bootstrap";

const Error = props => {
    const {message, details} = props;
    return (
        <Alert variant="danger" onClose={() => props.close()} dismissible className = "text-center">
            <strong>{message}</strong>
            {
                props.details && <div>{details}</div>
            }
        </Alert>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired,
    details: PropTypes.string,

    close: PropTypes.func.isRequired
};

export default Error;