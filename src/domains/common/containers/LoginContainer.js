import {connect} from "react-redux";
import Login from "../components/Login";
import {reset} from 'redux-form';
import {getSavedCredentials} from "../selectors/registrationSelector";
import {getLogged} from "../actions/authActions";
import {getRegOptions, clearRegisteredCredentials} from "../actions/registrationActions";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        regOptions: state.registration.regOptions,
        savedCredentials: getSavedCredentials(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLogged: (credentials) => dispatch(getLogged(credentials)),
        resetForm: ()=>dispatch(reset('login')),
        getRegOptions: () => dispatch(getRegOptions()),
        clearRegisteredCredentials: () => dispatch(clearRegisteredCredentials())
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;