import React from 'react';
import PropTypes from 'prop-types';
import {FaPowerOff, FaStepForward} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";

const Opened = (props) => {

    const renderButtons = () => {
        const {isLMS, schemeId} = props.context;
        return (
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-secondary mr-1"
                                onClick={() => props.getCancelled(schemeId, isLMS)}
                                title="Cancel the opened session and then return to the requested one!">
                            Finish&nbsp;<FaPowerOff color="white"/>
                        </button>
                        <button className="btn btn-secondary"
                                onClick={() => props.getCurrent(schemeId, isLMS)}
                                title="Continue the opened session">
                            Continue&nbsp;<FaStepForward color="white"/>
                        </button>
                    </div>
                </div>
        );
    }

    const renderLoading = () => {
        return (
            <div className="container-fluid p-0">
                <LogoMini/>
                <Header title="PREVIOUS SESSION IS OPENED" color="alert-warning"/>
                <Spinner message="Waiting..."/>
            </div>);
    }

    const {failure} = props;
    const {isLoaded} = props.session;
    if (!isLoaded) renderLoading();
    return (
        <div className="container-fluid p-0 mt-1">
            <LogoMini/>
            <Header title="PREVIOUS SESSION IS OPENED" color="alert-warning"/>
            {failure.is && failure.location === "opened" ?
                <Failure message={failure.message} serverError={failure.serverError}/> : null}
            {renderButtons()}
        </div>);
}

Opened.propTypes = {
    context: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    failure: PropTypes.object.isRequired,

    getCurrent: PropTypes.func.isRequired,
    getCancelled: PropTypes.func.isRequired,
};

export default Opened;