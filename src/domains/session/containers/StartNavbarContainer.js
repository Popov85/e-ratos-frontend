import {connect} from "react-redux";
import StartNavbar from "../components/StartNavbar";
import {getContext} from "../selectors/contextSelector";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getLoggedOut} from "../../common/actions/authActions";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        context: getContext(state),
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedOut: () => dispatch(getLoggedOut())
    }
}

const StartNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(StartNavbar);

export default StartNavbarContainer;