import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    if (props.widely)
    //For header to be container-wide
        return (
            <div className="row text-center mb-1">
                <div className="col-12">
                    <div className={`alert-sm ${props.color} pt-3 pb-3`}>{props.title}</div>
                </div>
            </div>
        );
    return (
        //For header to be narrow-centered
        <div className="row mb-1">
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                <div className="row text-center">
                    <div className="col-12">
                        <div className={`alert-sm ${props.color} pt-3 pb-3`}>{props.title}</div>
                    </div>
                </div>
            </div>
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    widely: PropTypes.bool
};

export default Header;