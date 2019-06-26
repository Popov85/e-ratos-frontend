import React from 'react';
import PropTypes from 'prop-types';

const defaultMessage= "Loading..."

const Spinner = (props) => {
    return (
        <div>
            <p className="text-center text-info">{(props.message) ? props.message : defaultMessage}</p>
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-2 text-info" style={{ width: '5rem', height: '5rem' }} role="status">
                    <span className="sr-only" />
                </div>
            </div>
        </div>
    );
}

const propTypes = {
    message: PropTypes.string
};

Spinner.propTypes = propTypes;

export default Spinner;