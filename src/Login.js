
import React, { Component } from 'react';
import LogoMini from './LogoMini';
import Failure from "./Failure";
import Registration from "./Registration";
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import UtilsValidation from './UtilsValidation';
import Utils from './Utils';


import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "student@example.com",
            password: "dT09Rx06",
            isRemember: false,

            showPassword: false,

            isEmailValid: "undefined",
            isPasswordValid: "undefined",

            // Sets by API call: is self-registration of users allowed by server settings?
            regOptions: { lms: false, allowed: false },

            // Go to registration view
            isRegister: false,

            isLoading: false,
            error: null
        };
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.didRegister = this.didRegister.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    componentDidMount() {
        //console.log("Trying to fetch reg. options...");
        const url = Utils.baseUrl() + "/self-registration/options";
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: new Headers({ 'Accept': 'application/json' })
        }).then(response => {
            if (!response.ok) throw Error("Failed to get reg. options");
            // Headers LMS-Registration and Non-LMS-Registration are expected
            // If not default result to false
            return response.json();
        }).then(response => {
            console.log(response);
            this.setState({ regOptions: response });
        }).catch(error => {
                console.error(error.message + " fallback to default");
                //Change to true for test  
                this.setState({
                    regOptions: { lms: false, allowed: true }
                });
            })
    }

    didRegister(newUsername, newPassword) {
        console.log("Just registered");
        this.setState({ username: newUsername, password: newPassword, isRegister: false, error: null });
    }

    doLogin() {
        console.log("Back to login");
        this.setState({ isRegister: false });
    }

    handleAuthentication(event) {
        event.preventDefault();
        console.log("Submitting: " + JSON.stringify(this.state));
        if (!this.validate()) return;
        const url = Utils.baseUrl() + "/login?username=" +
            this.state.username + "&password=" + this.state.password;
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin'
        }).then(response => {
            // Either 302 (redirect) or 401 Unauthorized (unauthenticated) expected
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }
            if (!response.ok) throw Error("Failed authentication request. Correct your credentials and try again.");
            throw Error("Unexpected response status = " + response.status);
        }).catch(error => {
            console.error("Error occurred = " + error.message);
            this.setState({
                isLoading: false,
                error
            });
        })
    }

    validate() {
        const isEmailValid = UtilsValidation.isEmailValid(this.state.username);
        const isPasswordValid = UtilsValidation.isPasswordValid(this.state.password);
        if (!isEmailValid || !isPasswordValid) {
            this.setState({
                isEmailValid: isEmailValid,
                isPasswordValid: isPasswordValid,
                error: null
            });
            return false;
        }
        this.setState({
            isEmailValid: "undefined",
            isPasswordValid: "undefined",
            isLoading: true,
            error: null
        });
        return true;
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    }

    resetForm() {
        if (this.state.isLoading) return;
        this.setState({
            username: "",
            password: "",
            isRemember: false,
            showPassword: false,
            isEmailValid: "undefined",
            isPasswordValid: "undefined",
            error: null
        });
    }

    switchVisibility() {
        if (this.state.isLoading) return;
        this.setState({ showPassword: !this.state.showPassword });
    }

    renderPassword() {
        return (<input
            name="password"
            type={(this.state.showPassword) ? "text" : "password"}
            className={`form-control ${(this.state.isPasswordValid === 'undefined') ? '' : (this.state.isPasswordValid) ? 'is-valid' : 'is-invalid'}`}
            placeholder="password"
            value={this.state.password}
            onChange={this.handleInputChange} />);
    }

    renderEmailFeedback() {
        const { isEmailValid } = this.state;
        if (isEmailValid === "undefined") return null;
        if (isEmailValid === false) return (<div className="invalid-feedback">Please, provide a valid email..</div>);
        return (<div className="valid-feedback">Email looks good!</div>);
    }

    renderPasswordFeedback() {
        const { isPasswordValid } = this.state;
        if (isPasswordValid === "undefined") return null;
        if (isPasswordValid === false) return (<div className="invalid-feedback">Please, provide a valid password..</div>);
        return (<div className="valid-feedback">Password looks good!</div>);
    }

    renderChecking() {
        if (!this.state.isLoading) return null;
        return (
            <div className="text-center text-info mt-n2 mb-2">
                <span>Authentication...
                <div className="spinner-grow spinner-grow-sm text-info" role="status" />
                </span>
            </div>);
    }

    renderFooter() {
        if (!this.state.regOptions.allowed) return null;
        return (
            <div className="text-center text-secondary">
                <small>Don't have an account? <a href="#" onClick={() => this.setState({ isRegister: true })}>Sign Up</a></small>
            </div>);
    }

    renderFailure() {
        if (!this.state.error) return null;
        return (
            <div className="alert alert-danger p-1" role="alert">
                <Failure message={this.state.error.message} />
            </div>)
    }

    render() {
        if (this.state.isRegister)
            return <Registration
                regOptions={this.state.regOptions}
                didRegister={this.didRegister}
                doLogin={this.doLogin}/>
        return (
            <div className="container-fluid">
                <LogoMini />
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-header pt-1 pb-1">
                                <small><div className="text-secondary text-center">Authentication</div></small>
                            </div>
                            <div className="card-body">
                                {this.renderChecking()}
                                {this.renderFailure()}
                                <form onSubmit={this.handleAuthentication}>
                                    <fieldset disabled={(this.state.isLoading) ? true : false}>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-info"><FaUser color="white" /></span>
                                            </div>
                                            <input type="text" name="username" className={`form-control ${(this.state.isEmailValid === 'undefined') ? '' : (this.state.isEmailValid) ? 'is-valid' : 'is-invalid'}`} placeholder="name@example.com"
                                                value={this.state.username} onChange={this.handleInputChange} />
                                            {this.renderEmailFeedback()}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-info" onClick={() => this.switchVisibility()}>
                                                    {(this.state.showPassword) ? <FaEye color="white" /> : <FaEyeSlash color="white" />}
                                                </span>
                                            </div>
                                            {this.renderPassword()}
                                            {this.renderPasswordFeedback()}
                                        </div>

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" name="isRemember" checked={this.state.isRemember} onChange={this.handleInputChange} className="custom-control-input" id="remember" />
                                            <label className="custom-control-label text-secondary mt-n2" htmlFor="remember">Remember me</label>
                                        </div>

                                        <div className="form-group text-center mb-n1">
                                            <input type="submit" value="Log In" className="btn btn-sm btn-info pl-5 pr-5 mr-1" />
                                        </div>
                                        <div className="form-group text-center mt-2 mb-n3">
                                            <a href="#" className="badge badge-secondary" onClick={() => this.resetForm()}>Reset</a>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="card-footer pt-0 pb-0">
                                {this.renderFooter()}
                                <div className="d-flex justify-content-center">
                                    <small><a href="#">Forgot your password?</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4" />

                </div>
            </div>
        );
    }
}

export default Login;