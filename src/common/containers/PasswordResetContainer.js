import {connect} from "react-redux";
import {reset} from 'redux-form';
import PasswordReset from "../components/PasswordReset";
import {getPasswordReset} from "../actions/passResetActions";

const mapStateToProps = state => {
    return {
        passReset: state.passReset
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPasswordReset: (email)=>dispatch(getPasswordReset(email)),
        resetForm: ()=>dispatch(reset('passwordReset'))
    }
}

const PasswordResetContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordReset);

export default PasswordResetContainer;
