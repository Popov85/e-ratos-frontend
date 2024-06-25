import {connect} from "react-redux";
import StudentPortal from "../components/StudentPortal";

const mapStateToProps = state => {
    return {
        logged: state.auth.logged,
        authorized: state.auth.authorized
    }
}


const StudentPortalContainer = connect(mapStateToProps)(StudentPortal);

export default StudentPortalContainer;