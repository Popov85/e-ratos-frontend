import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from "../forms/LoginForm";
//import RegistrationContainer from "../containers/RegistrationContainer";
import '../../../../main.css';
import Failure from "./Failure";
import logo from '../../../assets/logo-white.png';
import Registration from "./Registration";

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
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('remember-me', data.rememberMe ? "on" : "off");
        return new URLSearchParams(formData).toString();
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
        const {auth, savedCredentials} = this.props;
        const {registration} = this.state;
        if (registration) return <Registration/>;
        const {isLoggingIn, errorLoggingIn} = auth;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 d-none d-md-block" style={{height: '100vh', backgroundColor: '#17A2B8'}}>
                        {/* Left side content */}
                        <div className="d-flex align-items-start justify-content-center h-100">
                            <img className="img-fluid" src={logo} alt="logo" style={{width: '70%', marginTop: '15%'}}/>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12" style={{height: '100vh', backgroundColor: 'lightyellow'}}>
                        {/* Right side content */}
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="col-1"></div>
                            <div className="col-10">
                                <div className="card bg-transparent w-100">
                                    <div className="card-header pt-1 pb-1">
                                        <small>
                                            <div className="text-secondary text-center">
                                                Welcome to e-Ratos! Please, enter your credentials.
                                            </div>
                                        </small>
                                    </div>
                                    <div className="card-body">
                                        {
                                            isLoggingIn &&
                                            <div className="text-center text-info mt-n2 mb-2">
                                            <span>Authentication...
                                                <div className="spinner-grow spinner-grow-sm text-info"
                                                     role="checking"/>
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
                                            onSubmit={data => this.handleSubmit(data)}
                                            initialValues={savedCredentials ?
                                                {
                                                    username: savedCredentials.email,
                                                    password: savedCredentials.password,
                                                    rememberMe: false
                                                }
                                                : null
                                            }
                                            disabled={isLoggingIn}
                                            showPassword={this.state.showPassword}
                                            displayPassword={this.displayPassword}
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
                            <div className="col-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    regOptions: PropTypes.object,
    savedCredentials: PropTypes.object,

    getRegOptions: PropTypes.func.isRequired,
    getLogged: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    clearRegisteredCredentials: PropTypes.func.isRequired
};

export default Login;
