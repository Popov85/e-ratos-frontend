import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Utils from "./Utils";


class CountdownBatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0
        }
    }

    componentDidMount() {
        this.launch();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.batchNumber !== this.props.batchNumber) {
            clearInterval(this.interval);
            this.setState({ elapsed: 0 });
            this.launch();
        }
        if (newProps.isPaused !== this.props.isPaused) {
            // Some change detected
            if (newProps.isPaused) {
                clearInterval(this.interval);
            } else {
                this.launch();
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    launch() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() { this.setState(prevState => ({ elapsed: prevState.elapsed + 1 })); }

    render() {
        const { batchRemaining } = this.props;
        if (!batchRemaining) return null;
        const forBatch = batchRemaining - (this.state.elapsed);
        return (
            <span title="How much time left for this batch?">
                <strong>&nbsp;|&nbsp; for batch:</strong>
                <span>{forBatch <= 0 ? "00:00:00" : Utils.secToTime(forBatch)}</span>
            </span>
        );
    }
}

CountdownBatch.propTypes = {
    batchRemaining: PropTypes.number,
    batchNumber: PropTypes.number.isRequired,
    isPaused: PropTypes.bool.isRequired
};

export default CountdownBatch;