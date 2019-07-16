
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoMini from './LogoMini';
import Failure from "./Failure";
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            email: "",

            showPassword: false,

            isEmailValid: "undefined",
            isPasswordValid: "undefined",

            isWaiting: false,
            isLoaded: true,
            error: null
        };
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    preTryAuthenticate() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
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
            isWaiting: true,
            isLoaded: false,
            error: null
        });
        return true;
    }

    handleAuthentication(event) {
        event.preventDefault();
        console.log("Submitting: " + JSON.stringify(this.state));
        if (!this.preTryAuthenticate()) return;
        const url = this.props.baseUrl + "/login?username=" +
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
                isWaiting: false,
                error
            });
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [name]: value });
    }

    resetForm() {
        if (this.state.isWaiting) return;
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
        if (this.state.isWaiting) return;
        this.setState({ showPassword: !this.state.showPassword });
    }

    validateEmail() {
        return (this.state.username.length > 2 && this.state.username.includes('@')) ? true : false;
    }

    validatePassword() {
        return (this.state.password.length > 6) ? true : false;
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
        if (isEmailValid === false) return (<div className="invalid-feedback">Please provide a valid email..</div>);
        return (<div className="valid-feedback">Email looks good!</div>);
    }

    renderPasswordFeedback() {
        const { isPasswordValid } = this.state;
        if (isPasswordValid === "undefined") return null;
        if (isPasswordValid === false) return (<div className="invalid-feedback">Please provide a valid password..</div>);
        return (<div className="valid-feedback">Password looks good!</div>);
    }

    renderWaiting() {
        if (!this.state.isWaiting) return null;
        return (
            <div className="text-center text-info mt-n2 mb-2">
                <span>Authorizing...
                <div className="spinner-grow spinner-grow-sm text-info" role="status" />
                </span>
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
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-body">
                                {this.renderWaiting()}
                                {this.renderFailure()}
                                <form onSubmit={this.handleAuthentication}>
                                    <fieldset disabled={(this.state.isWaiting) ? true : false}>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-info"><FaUser color="white" /></span>
                                            </div>
                                            <input type="text" name="username" className={`form-control ${(this.state.isEmailValid === 'undefined') ? '' : (this.state.isEmailValid) ? 'is-valid' : 'is-invalid'}`} placeholder="e-mail"
                                                value={this.state.username} onChange={this.handleInputChange} />
                                            {this.renderEmailFeedback()}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <button type="button" className="btn bg-info" onClick={() => this.switchVisibility()}>
                                                    {(this.state.showPassword) ? <FaEye color="white" /> : <FaEyeSlash color="white" />}
                                                </button>
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
                                        <a href="#" className="badge badge-secondary" onClick={() => this.resetForm()}>Reset</a>                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <div className="card-footer pt-0 pb-0">
                                <div className="text-center text-secondary">
                                    <small>Don't have an account? <a href="#">Sign Up</a></small>
                                </div>
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

Register.propTypes = {
    baseUrl: PropTypes.string
};

export default Register;
