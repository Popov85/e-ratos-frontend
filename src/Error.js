import React from 'react';

const defaultMessage= 'failed to load data from API';

const Error = (props) => {
    var message = props.message;
    if (!message) message = defaultMessage;
    return (
        <p className="text-center text-danger">Error: {message}</p>
    );
}

export default Error;