import React from 'react';
import PropTypes from 'prop-types';

const defaultMessage= "Loading..."

const Spinner = (props) => {
    return (
        <div className={` text-center text-${props.color ? props.color: 'info '}`}>
            <p>{(props.message) ? props.message : defaultMessage}</p>
            <div className="d-flex justify-content-center">
                <div className= "spinner-border m-2" style={{ width: '5rem', height: '5rem' }} role="status">
                    <span className="sr-only" />
                </div>
            </div>
        </div>
    );
}

const propTypes = {
    message: PropTypes.string,
    color: PropTypes.string
};

Spinner.propTypes = propTypes;

export default Spinner;