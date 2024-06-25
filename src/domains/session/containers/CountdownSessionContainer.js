import {connect} from "react-redux";
import CountdownSession from "../components/CountdownSession";
import React from "react";

const mapStateToProps = state => {
    const {batch, batchNumber, paused} = state.session.session;
    return {
        sessionRemaining: batch.sessionExpiresInSec,
        batchNumber: batchNumber,
        isPaused: paused
    }
}


const CountdownSessionContainer = connect(mapStateToProps)(CountdownSession);

export default CountdownSessionContainer;