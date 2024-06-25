import {connect} from "react-redux";
import StaffPortal from "../components/StaffPortal";

const mapStateToProps = state => {
    return {
        logged: state.auth.logged,
        authorized: state.auth.authorized
    }
}


const StaffPortalContainer = connect(mapStateToProps)(StaffPortal);

export default StaffPortalContainer;