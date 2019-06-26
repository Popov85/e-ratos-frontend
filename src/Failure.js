import React from 'react';
import PropTypes from 'prop-types';

const defaultMessage= 'failed to perform API request';

const Failure = (props) => {
    var message = props.message;
    return <div className="text-center text-danger">Error: {(message) ? message : defaultMessage}</div>
}

const propTypes = {
    message: PropTypes.string
};

Failure.propTypes = propTypes;

export default Failure;