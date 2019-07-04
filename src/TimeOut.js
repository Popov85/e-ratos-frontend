import React from 'react';
import PropTypes from 'prop-types';

const TimeOut = props => {
    if (!props.isTimeouted) return null;
    return (
        <div className="row mb-1">
            <div className="col-12">
                <div className="alert-sm alert-warning text-center">Time-outed!</div>
            </div>
        </div>);
};

TimeOut.propTypes = {
    isTimeouted: PropTypes.bool.isRequired
};

export default TimeOut;