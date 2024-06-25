import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {FaRedo} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Header from "../../common/components/Header";
import {useLocation} from "react-router-dom";
import utilsURL from "../../../utils/utilsURL";
import LogoError from "../../common/components/LogoError";
import StartContainer from "../containers/StartContainer";

const SessionLaunch = props => {

    const {isLoading, errorScheme, schemeInfo} = props.schemeInfo;

    const location = useLocation();

    const schemeId = utilsURL.getParam(location, "schemeId");

    useEffect(() => {
        // Load schemeInfo
        props.loadSchemeInfo(schemeId);
    }, []);

    const renderLoading = () => {
        return (
            <div className="container-fluid">
                <div className="text-center">
                    <div className="mt-3 mb-2"><LogoMini/></div>
                    <Spinner message="Loading info from server"/>
                </div>
            </div>
        );
    }

    const renderFailure = () => {
        return (
            <div className="container-fluid">
                <LogoError/>
                <Header title="SCHEME IS NOT FOUND [WRONG ID]" color="alert-warning"/>
                <div className="mt-3">
                    <div className="text-center">
                        <button className="btn btn-secondary"
                                onClick={() => props.loadSchemeInfo(schemeId)}
                                title="Re-try to load init scheme data">
                            Re-try&nbsp;<FaRedo color="white"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) return renderLoading();
    if (errorScheme) return renderFailure();
    if (schemeInfo) return <StartContainer/>;
    return null;
};

SessionLaunch.propTypes = {
    schemeInfo: PropTypes.object,
    loadSchemeInfo: PropTypes.func.isRequired
};

export default SessionLaunch;