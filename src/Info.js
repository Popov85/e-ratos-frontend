import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Spinner from './Spinner';
import Failure from './Failure';
import Start from './Start';
import ApiInfo from './ApiInfo';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelInfo: null,
            schemeInfo: null,

            isPanelLoading: true,
            isSchemeLoading: false,
            //isLoaded: false,
            errorPanel: null,
            errorScheme: null,
        }
    }

    componentDidMount() {
        this.reTryLoadInfo();
    }

    // Move to global state, after successful authorization
    reTryLoadInfo() {
        this.setState({ isPanelLoading: true, errorPanel: null });
        ApiInfo.panelInfo()
            .then(panelInfo => {
                this.setState({ panelInfo });
                // Do second API call
                this.setState({ isSchemeLoading: true, errorScheme: null });
                const { schemeId } = this.props;
                ApiInfo.schemeInfo(schemeId)
                    .then(schemeInfo => {
                        this.setState({ schemeInfo });
                    }).catch(errorScheme => {
                        this.setState({ errorScheme })
                    }).finally(() => {
                        this.setState({ isSchemeLoading: false });
                    });

            }).catch(errorPanel => {
                this.setState({ errorPanel })
            }).finally(() => {
                this.setState({ isPanelLoading: false })
            });
    }

    renderLoading() {
        return (
            <div>
                <div className="mt-3 mb-2"><Logo /></div>
                <Spinner message="Loading info from server" />
            </div>);
    }

    renderFailure() {
        return (
            <div className="mt-3" >
                <div className="mb-2"><Logo /></div>
                <Failure message="Failed to perform 'info' API call-s" />
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-info btn-sm pl-5 pr-5" onClick={() => this.reTryLoadInfo()} title="Re-try to load info">
                            Re-try>>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isPanelLoading, isSchemeLoading, errorPanel, errorScheme } = this.state;
        if (isPanelLoading || isSchemeLoading) return this.renderLoading();
        if (errorPanel || errorScheme) return this.renderFailure();
        return <Start panelInfo={this.state.panelInfo} schemeInfo={this.state.schemeInfo} />
    }
}

Info.propTypes = {
    schemeId: PropTypes.number.isRequired
};

export default Info;