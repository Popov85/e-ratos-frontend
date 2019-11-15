import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LogoMini from './LogoMini';
import LoginForm from "./forms/LoginForm";
import RegistrationContainer from "./containers/RegistrationContainer";
import '../../main.css';
import Failure from "./Failure";

/**
 * Both staff and students will see this login page,
 * but self-registration will be available only for students (ROLE_STUDENT).
 * Staff should be registered by department admins
 */
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            registration: false
        };
        this.displayPassword = this.displayPassword.bind(this);
    }

    componentDidMount() {
        this.props.getRegOptions();
    }

    handleSubmit(data) {
        const credentials = this.prepareData(data);
        this.props.getLogged(credentials);
    }

    prepareData(data) {
        const authData = {};
        authData.username = data.username;
        authData.password = data.password;
        authData['remember-me'] = data.rememberMe ? "on" : "off";
        return Object.keys(authData).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(authData[key]);
        }).join('&');
    }

    displayPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    renderFooter() {
        const {regOptions} = this.props;
        if (!regOptions || !regOptions.allowed) return null;
        return (
            <div className="text-center text-secondary">
                <small>Don't have an account?
                    <a href="#" onClick={() => this.setState({registration: true})}>
                        Sign Up
                    </a>
                </small>
            </div>);
    }

    render() {
        const { security, savedCredentials} = this.props;
        if (security.logged && security.url)
            window.location.assign(security.url);
        const { registration} = this.state;
        if (registration) return <RegistrationContainer/>;
        const {isLoggingIn, errorLoggingIn} = security;
        return (
            <div className="container-fluid">
                <LogoMini/>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-header pt-1 pb-1">
                                <small>
                                    <div className="text-secondary text-center">Authentication</div>
                                </small>
                            </div>
                            <div className="card-body">
                                {
                                    isLoggingIn &&
                                    <div className="text-center text-info mt-n2 mb-2">
                                            <span>Authentication...
                                                <div className="spinner-grow spinner-grow-sm text-info" role="checking"/>
                                            </span>
                                    </div>
                                }
                                {
                                    errorLoggingIn &&
                                    <div className="alert alert-danger p-1" role="alert">
                                        <Failure message={errorLoggingIn.message}/>
                                    </div>
                                }
                                <LoginForm
                                    onSubmit = {data=>this.handleSubmit(data)}
                                    initialValues={savedCredentials ?
                                        {
                                            username: savedCredentials.email,
                                            password: savedCredentials.password,
                                            rememberMe: false}
                                            : null
                                    }
                                    disabled = {isLoggingIn}
                                    showPassword = {this.state.showPassword}
                                    displayPassword = {this.displayPassword}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2">
                                <a href="#" className="badge badge-secondary" onClick={() => {
                                    this.props.resetForm();
                                    this.props.clearRegisteredCredentials();
                                }}>Reset</a>
                            </div>
                            <div className="card-footer pt-0 pb-0">
                                {this.renderFooter()}
                                <div className="d-flex justify-content-center">
                                    <small><a href="#">Forgot your password?</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>

                </div>
            </div>
        );
    }
}

Login.propTypes = {
    regOptions: PropTypes.object,
    savedCredentials: PropTypes.object,

    security: PropTypes.object.isRequired,

    getRegOptions: PropTypes.func.isRequired,
    getLogged: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    clearRegisteredCredentials: PropTypes.func.isRequired,
    resetLoggingInFailure: PropTypes.func.isRequired,
};

export default Login;
