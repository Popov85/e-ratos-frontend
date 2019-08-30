import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Utils from "./Utils";


class CountdownSession extends Component {
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

    tick() {this.setState(prevState => ({elapsed: prevState.elapsed + 1}));}
    
    render() {
        const { sessionRemaining } = this.props;
        const forSession = sessionRemaining - this.state.elapsed;
        return (
            <span title="How much time left for this session?">
                <strong>Left time:</strong>
                <span>{forSession<=0? "00:00:00": Utils.secToTime(forSession)}</span>
            </span>
        );
    }
}

CountdownSession.propTypes = {
    sessionRemaining: PropTypes.number.isRequired,
    batchNumber: PropTypes.number.isRequired,
    isPaused: PropTypes.bool.isRequired
};

export default CountdownSession;