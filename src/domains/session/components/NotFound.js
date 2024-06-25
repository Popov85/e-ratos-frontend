import React from 'react';
import {FaRedo} from 'react-icons/fa';
import LogoMini from '../../common/components/LogoMini';
import Header from "../../common/components/Header";
import PropTypes from "prop-types";

const NotFound = (props) => {

    return (
        <div>
            <LogoMini/>
            <Header title="SESSION NOT FOUND" color="alert-warning"/>
            <div className="text-center mt-3">
                <button className="btn btn-secondary"
                        onClick={() => {props.resetSession(); props.resetFailure()} }
                        title="Start the scheme again">
                    Re-start&nbsp;<FaRedo color="white"/>
                </button>
            </div>
        </div>
    );
}

NotFound.propTypes = {
    resetSession: PropTypes.func.isRequired,
    resetFailure: PropTypes.func.isRequired
};

export default NotFound;
