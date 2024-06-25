import {connect} from "react-redux";
import {getUserInfo} from "../selectors/userSelector";
import Profile from "../components/Profile";
import {clearUserProfileFailure, getProfileUpdated} from "../../staff/actions/profileAction";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        profile: state.staff.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileUpdated: (profile)=>dispatch(getProfileUpdated(profile)),
        clearUserProfileFailure: ()=>dispatch(clearUserProfileFailure())
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;