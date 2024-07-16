import React from 'react';
import {ServerError} from "../types/ServerError";

const defaultMessage = 'failed to perform the action';

type Props = {
    message?: string;
    details?: string;
    serverError?: ServerError
}

const Failure: React.FC<Partial<Props>> = ({message = defaultMessage, details = '', serverError = {}}) => {

    return (<div>
        <div className="text-center text-danger"> {message}</div>
        {(details ? <div className="d-flex justify-content-center">
            <details open={false}>
                <summary className="border text-secondary"><small>Details</small></summary>
                <small>{details}</small>
            </details>
        </div> : null)}
        {(serverError ? <div className="d-flex justify-content-center">
            <details open={false}>
                <summary className="border text-secondary"><small>Server message</small></summary>
                <small>{serverError?.message}</small>
            </details>
        </div> : null)}
    </div>);
}

export default Failure;