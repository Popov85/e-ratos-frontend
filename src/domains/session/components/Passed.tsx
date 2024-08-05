import React from 'react';

const Passed: React.FC<{ isPassed: boolean }> = ({isPassed = false}) => {
    return (
        <div className={`pt-3 pb-3 alert-sm alert-${(isPassed) ? "success" : "danger"} pt-3 pb-3`}>
            {(isPassed) ? "PASSED" : "NOT PASSED"}
        </div>);
};

export default Passed;