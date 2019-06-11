import React from 'react';
import PropTypes from 'prop-types';

const Passed = props => {
    const isPassed = props.isPassed;
    const baseName = "pt-3 pb-3 alert-sm alert-";
    var className = "";
    var message = "";
    if (isPassed) {
        className = baseName + "success";
        message = "PASSED";
    } else {
        className = baseName + "danger";
        message = "NOT PASSED";
    }
    return (<div className={className}>{message}</div>);
};

Passed.propTypes = {
    isPassed: PropTypes.bool.isRequired
};

export default Passed;