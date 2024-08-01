import React from 'react';
import {FaPowerOff, FaStepForward} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getContext} from "../selectors/contextSelector";
import {Context} from "../types/Context";
import {getCancelled, getCurrent} from "../actions/sessionActions";

const Opened: React.FC = (props) => {

    const dispatch: Dispatch<any> = useDispatch();

    const isLoaded: boolean = useSelector((state: RootState) => state.session.session.isLoaded);
    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const failure = useSelector((state: RootState) => state.session.failure);

    // Fail-safe protection.
    if (!context) return null;

    const renderButtons = () => {
        const {isLMS, schemeId} = context;
        return (
            <div className="row text-center mt-3">
                <div className="col-12">
                    <button className="btn btn-secondary mr-1"
                            onClick={() => dispatch(getCancelled(schemeId, isLMS))}
                            title="Cancel the opened session and then return to the requested one!">
                        Finish&nbsp;<FaPowerOff color="white"/>
                    </button>
                    <button className="btn btn-secondary"
                            onClick={() => dispatch(getCurrent(schemeId, isLMS))}
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

    if (!isLoaded) renderLoading();
    return (
        <div className="container-fluid p-0 mt-1">
            <LogoMini/>
            <Header title="PREVIOUS SESSION IS OPENED" color="alert-warning"/>
            {failure.is && failure.location === "opened" ?
                <Failure message={failure.message ?? undefined} serverError={failure.serverError ?? undefined}/> : null}
            {renderButtons()}
        </div>);
}

export default Opened;