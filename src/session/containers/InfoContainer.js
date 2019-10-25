import React, {Component} from 'react';
import {connect} from "react-redux";

import Info from "../components/Info";
import {loadPanelInfo} from "../actions/panelInfoActions";
import {loadSchemeInfo} from "../actions/schemeInfoActions";
import utilsURL from "../../utils/utilsURL";

class InfoContainer extends Component {

    componentDidMount() {
        // Load schemeInfo,
        // if no params fallback to schemeId = 1
        this.props.loadPanelInfo();
        const schemeId = utilsURL.getSchemeId();
        this.props.loadSchemeInfo(schemeId ? schemeId : 1);
    }

    render() {
        return <Info
            isPanelLoading={this.props.isPanelLoading}
            errorPanel={this.props.errorPanel}
            isSchemeLoading={this.props.isSchemeLoading}
            errorScheme={this.props.errorScheme}
            loadPanelInfo={this.props.loadPanelInfo}
            loadSchemeInfo={this.props.loadSchemeInfo}
        />
    }
}

const mapStateToProps = state => {
    return {
        isPanelLoading: state.panelInfo.isLoading,
        errorPanel: state.panelInfo.error,
        isSchemeLoading: state.schemeInfo.isLoading,
        errorScheme: state.schemeInfo.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPanelInfo: () => dispatch(loadPanelInfo()),
        loadSchemeInfo: (schemeId) => dispatch(loadSchemeInfo(schemeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);