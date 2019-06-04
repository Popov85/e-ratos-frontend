import React from 'react';
import { rename } from 'fs';


const Spinner = () => {
    return (
        <div>
            <p className="text-center text-info">Loading...</p>
            <div className="d-flex justify-content-center">
                <div className="spinner-border m-2 text-info" style={{ width: '5rem', height: '5rem' }} role="status">
                    <span className="sr-only" />
                </div>
            </div>
        </div>
    );
}

export default Spinner;