import React from 'react';
import PropTypes from 'prop-types';
import {FaStepForward} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";
import NotFound from './NotFound';
import FinishContainer from "../containers/FinishContainer";

const RunOutOfTime = (props) => {

    if (!props.session.isLoaded)
        return (<div>
            <LogoMini/>
            <Header title="YOU'VE RUN OUT OF TIME" color="alert-danger"/>
            <Spinner message="Fetching results.."/>
        </div>);

    if (props.failure.status==='notFound') return <NotFound/>
    if (props.session.status === "finished") return <FinishContainer/>
    const {isLMS, schemeId} = props.context;
    return (
        <div className="container-fluid p-0 mt-1">
            <LogoMini/>
            <Header title="YOU'VE RUN OUT OF TIME" color="alert-danger"/>
            {props.failure.is ?
                <Failure message={props.failure.message} serverError={props.failure.serverError}/> : null}
            <div className="text-center mt-3">
                <button className="btn btn-secondary"
                        onClick={() => props.getFinished(schemeId, isLMS)} title="Load the current results?">
                    Result&nbsp;<FaStepForward color="white"/>
                </button>
            </div>
        </div>
    );

}

RunOutOfTime.propTypes = {
    context: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    failure: PropTypes.object.isRequired,
    result: PropTypes.object,

    getFinished: PropTypes.func.isRequired
};

export default RunOutOfTime;