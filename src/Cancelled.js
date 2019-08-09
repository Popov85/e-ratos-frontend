import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";
import Start from "./Start";

class Cancelled extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReStarted: false
        }
    }

    reStart() {
        this.setState({ isReStarted: true });
    }

    render() {
        const { panelInfo, schemeInfo} = this.props;
        if (this.state.isReStarted) return <Start panelInfo={panelInfo} schemeInfo = {schemeInfo}/>;
        const { user, scheme, passed } = this.props.result;
        return (
            <div className="mt-5">
                <Header title="CANCELLED" color="alert-warning" />
                <div className="row mt-1">
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                        <div className="bg-light">
                            <div className="row mb-1">
                                <div className="col-4">
                                    <div className="text-secondary">name:</div>
                                </div>
                                <div className="col-8">
                                    <div className="alert-sm alert-info">{user}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-4">
                                    <div className="text-secondary">scheme:</div>
                                </div>
                                <div className="col-8">
                                    <div className="alert-sm alert-info">{scheme}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-4">
                                    <div className="text-secondary">passed:</div>
                                </div>

                                <div className="col-8">
                                    <div className = {`alert-sm alert-${ (passed)? "success":"danger" }`}>{(passed) ? "Yes" : "No"}</div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                </div>

                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-secondary" onClick={() => this.reStart()}>ReStart>></button>
                    </div>
                </div>

            </div>)
    }
}

Cancelled.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired
};

export default Cancelled;