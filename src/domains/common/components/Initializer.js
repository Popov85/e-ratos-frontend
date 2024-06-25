import React from 'react';

const Initializer = () => (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#17A2B8', color: 'white' }}>
        <h4>e-Ratos is loading...</h4>
        <div className="spinner-border mt-3" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export default Initializer;