import {connect} from "react-redux";
import Login from "../Login";
import {getRegOptions} from "../actions/regOptionsActions";
import {getLogged} from "../actions/loginActions";
import {reset} from 'redux-form';
import {getSavedCredentials} from "../selectors/registrationSelector";
import {clearRegisteredCredentials} from "../actions/registrationActions";

const mapStateToProps = state => {
    return {
        security: state.security,
        regOptions: state.regOptions,
        savedCredentials: getSavedCredentials(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRegOptions: () => dispatch(getRegOptions()),
        getLogged: (credentials) => dispatch(getLogged(credentials)),
        resetForm: ()=>dispatch(reset('login')),
        clearRegisteredCredentials: () => dispatch(clearRegisteredCredentials())
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;