import {connect} from "react-redux";
import {clearUserPasswordFailure, getPasswordUpdated} from "../actions/profileAction";
import Password from "../Password";

const mapStateToProps = state => {
    return {
        profile: state.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPasswordUpdated: (profile)=>dispatch(getPasswordUpdated(profile)),
        clearUserPasswordFailure: ()=>dispatch(clearUserPasswordFailure())
    }
}

const PasswordContainer = connect(mapStateToProps, mapDispatchToProps)(Password);

export default PasswordContainer;