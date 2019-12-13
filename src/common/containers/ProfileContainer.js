import {connect} from "react-redux";
import {getUserInfo} from "../selectors/userSelector";
import Profile from "../Profile";
import {clearUserProfileFailure, getPasswordUpdated, getProfileUpdated} from "../actions/profileAction";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        profile: state.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileUpdated: (profile)=>dispatch(getProfileUpdated(profile)),
        getPasswordUpdated: (profile)=>dispatch(getPasswordUpdated(profile)),

        clearUserProfileFailure: ()=>dispatch(clearUserProfileFailure())
    }
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;