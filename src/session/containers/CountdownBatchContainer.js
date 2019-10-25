import {connect} from "react-redux";
import React from "react";
import CountdownBatch from "../components/CountdownBatch";

const mapStateToProps = state => {
    const {batch, batchNumber, paused} = state.session;
    return {
        batchRemaining: batch.batchExpiresInSec,
        batchNumber: batchNumber,
        isPaused: paused
    }
}


const CountdownBatchContainer = connect(mapStateToProps)(CountdownBatch);

export default CountdownBatchContainer;