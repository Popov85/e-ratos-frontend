import React from 'react';
import LogoError from "./LogoError";
import Header from "./Header";

const Forbidden = () => {
    return (
        <div className="container-fluid">
            <div className="mt-3">
                <LogoError/>
                <Header title="403 Forbidden" color="alert-warning"/>
            </div>
        </div>
    );
}

export default Forbidden;