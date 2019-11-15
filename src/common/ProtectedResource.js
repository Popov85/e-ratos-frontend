import React from 'react';

const ProtectedResource = props => {
    return (
        <div className="alert alert-danger text-center mt-3">
            <h4 className="alert-heading">
                <strong>Security warning!</strong>
            </h4>
            <hr/>
            YOU LACK CREDENTIALS TO SEE THIS SECTION
        </div>
    );
};

export default ProtectedResource;