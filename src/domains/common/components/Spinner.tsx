import React from 'react';

const defaultMessage = "Loading..."

type Props = {
    message?: string;
    color?: string;
}

const Spinner: React.FC<Partial<Props>> = ({message = defaultMessage, color = 'info'}) => {
    return (
        <div className={`text-center text-${color}`}>
            <p>{message}</p>
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-2" style={{width: '5rem', height: '5rem'}} role="status">
                    <span className="sr-only"/>
                </div>
            </div>
        </div>
    );
}

export default Spinner;