import React, {Component} from 'react';
import {connect} from "react-redux";

import Info from "../components/Info";
import {loadSchemeInfo} from "../actions/schemeInfoActions";
import utilsURL from "../../utils/utilsURL";
import {loadUserInfo} from "../../common/actions/userActions";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getSchemeInfo} from "../selectors/contextSelector";

class InfoContainer extends Component {

    componentDidMount() {
        // Load userInfo only if it is absent!
        const {authenticated} = this.props.userInfo;
        if (!authenticated) this.props.loadUserInfo();
        const schemeId = utilsURL.getSchemeId();
        // Load schemeInfo (fallback to schemeId = 1)
        this.props.loadSchemeInfo(schemeId ? schemeId : 1);
    }

    render() {
        return <Info userInfo={this.props.userInfo} schemeInfo={this.props.schemeInfo}/>
    }
}

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        schemeInfo: getSchemeInfo(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserInfo: () => dispatch(loadUserInfo()),
        loadSchemeInfo: (schemeId) => dispatch(loadSchemeInfo(schemeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);