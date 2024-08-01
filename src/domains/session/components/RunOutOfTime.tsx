import React from 'react';
import {FaStepForward} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";
import NotFound from './NotFound';
// @ts-ignore
import FinishContainer from "../containers/FinishContainer";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getFinished} from "../actions/sessionActions";
import {Context} from "../types/Context";
import {RootState} from "../../../store/rootReducer";
import {getContext} from "../selectors/contextSelector";
import {SessionErrorsEnum} from "../types/SessionErrorsEnum";
import {SessionStatesEnum} from "../types/SessionStatesEnum";

const RunOutOfTime: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const isLoaded: boolean = useSelector((state: RootState) => state.session.session.isLoaded);
    const status: SessionStatesEnum = useSelector((state: RootState) => state.session.session.status);
    const failure = useSelector((state: RootState) => state.session.failure);

    // Fail-safe protection
    if (!context) return null;

    if (!isLoaded)
        return (<div>
            <LogoMini/>
            <Header title="YOU'VE RUN OUT OF TIME" color="alert-danger"/>
            <Spinner message="Fetching results.."/>
        </div>);

    if (failure.type === SessionErrorsEnum.NotFound) return <NotFound/>
    if (status === SessionStatesEnum.Finished) return <FinishContainer/>
    const {isLMS, schemeId} = context;
    return (
        <div className="container-fluid p-0 mt-1">
            <LogoMini/>
            <Header title="YOU'VE RUN OUT OF TIME" color="alert-danger"/>
            {failure.is ?
                <Failure message={failure.message ?? undefined} serverError={failure.serverError ?? undefined}/> : null}
            <div className="text-center mt-3">
                <button className="btn btn-secondary"
                        onClick={() => dispatch(getFinished(schemeId, isLMS))} title="Load the current results?">
                    Result&nbsp;<FaStepForward color="white"/>
                </button>
            </div>
        </div>
    );

}

export default RunOutOfTime;