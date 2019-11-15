import React, {Component} from 'react';
import {connect} from "react-redux";

import Info from "../components/Info";
import {loadSchemeInfo} from "../actions/schemeInfoActions";
import utilsURL from "../../utils/utilsURL";
import {loadUserInfo} from "../../common/actions/userActions";

class InfoContainer extends Component {

    componentDidMount() {
        const schemeId = utilsURL.getSchemeId();
        // Load schemeInfo (fallback to schemeId = 1)
        this.props.loadSchemeInfo(schemeId ? schemeId : 1);
    }

    render() {
        return <Info
            isUserLoading={this.props.isUserLoading}
            errorUser={this.props.errorUser}
            isSchemeLoading={this.props.isSchemeLoading}
            errorScheme={this.props.errorScheme}
            loadUserInfo={this.props.loadUserInfo}
            loadSchemeInfo={this.props.loadSchemeInfo}
        />
    }
}

const mapStateToProps = state => {
    return {
        isUserLoading: state.userInfo.isLoading,
        errorUser: state.userInfo.error,
        isSchemeLoading: state.schemeInfo.isLoading,
        errorScheme: state.schemeInfo.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserInfo: () => dispatch(loadUserInfo()),
        loadSchemeInfo: (schemeId) => dispatch(loadSchemeInfo(schemeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);