import React from 'react';
import PropTypes from 'prop-types';
import {FaRedo} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import StartContainer from "../containers/StartContainer";
import Header from "../../common/components/Header";

const Info = props => {

    const {isUserLoading, errorUser, authenticated} = props.userInfo;
    const {isSchemeLoading, errorScheme, name} = props.schemeInfo;

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
                {
                    errorUser && <Header title="USER NOT FOUND [SESSION EXPIRED]" color="alert-danger"/>
                }
                {
                    errorScheme && <Header title="SCHEME NOT FOUND [WRONG URL]" color="alert-danger"/>
                }
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-secondary"
                                onClick={() => errorUser ? props.loadUserInfo() : props.loadSchemeInfo()}
                                title="Re-try to load init data">
                            Re-try&nbsp;<FaRedo color="white"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isUserLoading || isSchemeLoading) return renderLoading();
    if (errorUser || errorScheme) return renderFailure();
    if (authenticated && name) return <StartContainer/>;
    return null;
};

Info.propTypes = {
    userInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,

    loadUserInfo: PropTypes.func,
    loadSchemeInfo: PropTypes.func
};

export default Info;