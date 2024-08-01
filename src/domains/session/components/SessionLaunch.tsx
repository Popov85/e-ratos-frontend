import React, {useEffect} from 'react';
import {FaRedo} from 'react-icons/fa';
import {useLocation} from 'react-router-dom';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Header from "../../common/components/Header";
import LogoError from "../../common/components/LogoError";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {loadSchemeInfo} from "../actions/schemeInfoActions";
import {SchemeInfo} from "../types/SchemeInfo";
import utilsURL from "../../../utils/utilsURL";
import {Location} from 'history';
import {getContext, getSchemeInfo} from "../selectors/contextSelector";
import {Context} from "../types/Context";
import Start from "./Start";

const SessionLaunch: React.FC = () => {

    const location: Location = useLocation();
    const schemeId: number = Number(utilsURL.getParam(location, "schemeId"));

    const dispatch: Dispatch<any> = useDispatch();

    const isLoading: boolean = useSelector((state: RootState) => state.session.schemeInfo.isLoading);
    const errorScheme: Error | null = useSelector((state: RootState) => state.session.schemeInfo.errorScheme);
    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const schemeInfo: SchemeInfo | null = useSelector((state: RootState) => getSchemeInfo(state));

    useEffect((): void => {
        // Load schemeInfo
        dispatch(loadSchemeInfo(schemeId));
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
                                onClick={() => loadSchemeInfo(schemeId)}
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
    if (schemeInfo && context) return <Start/>;
    return null;
};

export default SessionLaunch;
