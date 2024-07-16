import React from 'react';
import {Alert} from "react-bootstrap";

type Props = {
    message: string;
    details?: string;
    close: () => void;
}

const Error: React.FC<Props> = ({message, details = '', close}) => {

    return (
        <Alert variant="danger" onClose={() => close()} dismissible className="text-center">
            {message}
            {details}
        </Alert>
    );
};

export default Error;