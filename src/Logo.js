import React from 'react';
import logo from '../logo.png';

const Logo = () => {
    return (
        <div className="row mt-5">
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <img className="img-fluid" src={logo} alt="logo" />
            </div>
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
        </div>
    );
}

export default Logo;