import React from 'react';
import PropTypes from 'prop-types';
import {FaRedo} from 'react-icons/fa';

import LogoMini from '../../common/LogoMini';
import Spinner from '../../common/Spinner';
import Failure from '../../common/Failure';
import StartContainer from "../containers/StartContainer";

const Info = props => {

    const renderLoading = () => {
        return (
            <div>
                <div className="mt-3 mb-2"><LogoMini/></div>
                <Spinner message="Loading info from server"/>
            </div>);
    }

    const renderFailure = () => {
        return (
            <div className="mt-3">
                <div className="mb-2"><LogoMini/></div>
                <Failure message="Failed to perform 'info' API call-s"/>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-secondary"
                                onClick={() => props.errorUser ? props.loadUserInfo() : props.loadSchemeInfo()}
                                title="Re-try to load info">
                            Re-try&nbsp;<FaRedo color="white"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const {isUserLoading, isSchemeLoading, errorUser, errorScheme} = props;
    if (isUserLoading || isSchemeLoading) return renderLoading();
    if (errorUser || errorScheme) return renderFailure();
    return <StartContainer/>
};

Info.propTypes = {
    isUserLoading: PropTypes.bool,
    errorUser: PropTypes.object,
    isSchemeLoading: PropTypes.bool,
    errorScheme: PropTypes.object,
    loadUserInfo: PropTypes.func,
    loadSchemeInfo: PropTypes.func
};

export default Info;