import React from 'react';
import PropTypes from 'prop-types';
import {FaArrowLeft, FaRedo} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";

const Preserved = (props) => {

    const {failure} = props;
    const {preserved} = props;
    const {isLoaded} = props.session;
    if (!isLoaded)
        return (<div>
            <LogoMini/>
            <Header title="SESSION HAS BEEN PRESERVED" color="alert-success"/>
            <Spinner message="Retrieving..."/>
        </div>);

    return (
        <div className="container-fluid p-0">
            <LogoMini/>
            <Header title="SESSION HAS BEEN PRESERVED" color="alert-success"/>
            {
                failure.is ? <Failure message={failure.message} serverError={failure.serverError}/> : null
            }
            <div className="text-center mt-3">
                    <span>
                        <button className="btn btn-secondary mr-1"
                                onClick={() => props.resetSession()}
                                title="Start the scheme again">Re-start&nbsp;<FaRedo color="white"/>
                        </button>
                        <button className="btn btn-secondary"
                                onClick={() => props.getRetrieved(preserved.key, props.isLMS)}
                                title="Retrieve and proceed">Retrieve&nbsp;<FaArrowLeft color="white"/>
                        </button>
                    </span>
            </div>
        </div>
    );

}

Preserved.propTypes = {
    isLMS: PropTypes.bool.isRequired,
    preservedKey: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
    failure: PropTypes.object.isRequired,

    resetSession: PropTypes.func.isRequired,
    getRetrieved: PropTypes.func.isRequired

};

export default Preserved;