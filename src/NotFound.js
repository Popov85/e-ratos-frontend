import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoMini from './LogoMini';
import Header from "./Header";
import Start from './Start';
import { FaRedo } from 'react-icons/fa';


class NotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRestarted: false
        }
    }

    render() {
        const { isRestarted } = this.state;
        const { panelInfo, schemeInfo } = this.props;
        if (isRestarted)
            return <Start
                panelInfo={panelInfo}
                schemeInfo={schemeInfo} />;
        return (
            <div>
                <LogoMini />
                <Header title="SESSION NOT FOUND" color="alert-warning" />
                <div className="text-center mt-3">
                    <button className="btn btn-secondary"
                        onClick={() => this.setState({ isRestarted: true })}
                        title="Start the scheme again">
                        Re-start&nbsp;<FaRedo color="white" />
                    </button>
                </div>
            </div>
        );
    }
}

NotFound.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
};

export default NotFound;