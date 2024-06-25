import {connect} from "react-redux";
import StaffNavbar from "../components/StaffNavbar";
import {getLoggedOut} from "../../common/actions/authActions";

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

const StaffNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(StaffNavbar);

export default StaffNavbarContainer;