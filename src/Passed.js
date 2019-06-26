import React from 'react';
import PropTypes from 'prop-types';

const Passed = props => {
    const isPassed = props.isPassed;
    return (
        <div className={`pt-3 pb-3 alert-sm alert-${(isPassed) ? "success" : "danger"} pt-3 pb-3`}>
            {(isPassed) ? "PASSED" : "NOT PASSED"}
        </div>);
};

Passed.propTypes = {
    isPassed: PropTypes.bool.isRequired
};

export default Passed;