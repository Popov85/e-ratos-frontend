import {connect} from "react-redux";
import {loadSchemeInfo} from "../actions/schemeInfoActions";
import SessionLaunch from "../components/SessionLaunch";

const mapStateToProps = state => {
    return {
        schemeInfo: state.session.schemeInfo//getSchemeInfo(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSchemeInfo: (schemeId) => dispatch(loadSchemeInfo(schemeId)),
    }
}

const SessionLaunchContainer = connect(mapStateToProps, mapDispatchToProps)(SessionLaunch);

export default SessionLaunchContainer;