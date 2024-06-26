import React from 'react';
import LogoError from "./LogoError";
import Header from "./Header";

const NotFound = () => {
    return (
        <div className="container-fluid">
            <div className="mt-3">
                <LogoError/>
                <Header title="404 Not Found!" color="alert-warning"/>
            </div>
        </div>
    );
}

export default NotFound;