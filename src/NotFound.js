import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Header from "./Header";
import Launcher from './Launcher';

class NotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRestarted: false
        }
    }
    
    render() {
        const {isRestarted} = this.state;
        const {schemeId} = this.props;
        if (isRestarted) return <Launcher schemeId = {schemeId}/>
        return (
            <div>
                <Logo />
                <Header title="SESSION NOT FOUND" color="alert-warning" />
                <div className = "text-center mt-3">
                    <button className="btn btn-secondary" onClick={() => this.setState({isRestarted: true})} title="Start the scheme again">Re-start>></button>
                </div>
            </div>
        );
    }
}

NotFound.propTypes = {
    schemeId: PropTypes.number.isRequired
};

export default NotFound;