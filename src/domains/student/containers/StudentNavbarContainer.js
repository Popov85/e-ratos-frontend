import {connect} from "react-redux";
import {getLoggedOut} from "../../common/actions/authActions";
import StudentNavbar from "../components/StudentNavbar";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        userInfo: state.auth.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedOut: () => dispatch(getLoggedOut())
    }
}

const StudentNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(StudentNavbar);

export default StudentNavbarContainer;