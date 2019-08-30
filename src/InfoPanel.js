import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ApiApplication from "./ApiApplication"

class InfoPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true
        }
    }

    tryLogout() {
        this.setState({ isLoaded: false, error: null });
        ApiApplication.logout()
            .then(() => {
                this.props.logoutAct();
            }).catch(e => {
                console.error("Failed to perform 'log-out' API call");
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    render() {
        const { isLoaded } = this.state;
        const { email, lms } = this.props.panelInfo; 
        return (
            <div className="row">
                <div className="col-12 text-secondary p-0">
                    <div className="float-left">
                        <span className="border p-1" title="Current context">
                            {
                                isLoaded ?
                                    <a href="#" className="badge badge-danger" onClick={() => this.tryLogout()} title="Wish to log out?">
                                        Logout
                                    </a>
                                    : <span className="text-secondary">Logout..</span>
                            }
                            <small>
                            <strong>&nbsp;{email}</strong>
                            {
                                lms ? <span><strong>&nbsp;|&nbsp;LMS</strong></span>
                                    : <span><strong>&nbsp;|&nbsp;non-LMS</strong></span>
                            }
                            </small>
                        </span>
                    </div>

                </div>
            </div>
        );
    }
}

InfoPanel.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    logoutAct: PropTypes.func,
};

export default InfoPanel;