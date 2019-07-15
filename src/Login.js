
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import LogoMini from './LogoMini';
import Failure from "./Failure";
import Spinner from './Spinner';

import { FaUser, FaEye, FaEyeSlash, FaReact } from 'react-icons/fa';

import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 0,
        background: 'transparent'
    }
};

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

            isModal: false,
            isLoaded: true,
            error: null
        };
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
            isModal: true,
            isLoaded: false,
            error: null
        });
        return true;
    }

    handleAuthentication(event) {
        event.preventDefault();
        console.log("Submitting: " + JSON.stringify(this.state));
        if (!this.preTryAuthenticate()) return;
        const url = this.props.baseUrl + "/login?username=" + this.state.username + "&password=" + this.state.password;
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin'
        }).then(response => {
            // Either 302 (redirect) or 401 Unauthorized (unauthenticeted) expected
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }
            if (!response.ok) throw Error("Failed authentication request..");
            throw Error("Unexpected response status = " + response.status);
        }).catch(error => {
            console.error("Error occurred = " + error.message);
            this.setState({
                isModal: false,
                error
            });
        })
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleRememberChange() {
        this.setState({ isRemember: !this.state.isRemember });
    }

    switchVisibility() {
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
            type={(this.state.showPassword) ? "text" : "password"}
            className={`form-control ${(this.state.isPasswordValid === 'undefined') ? '' : (this.state.isPasswordValid) ? 'is-valid' : 'is-invalid'}`}
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePasswordChange} />);
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

    renderModal() {
        return (
            <Modal
                isOpen={this.state.isModal}
                style={modalStyles}
                contentLabel="Authorizing"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}>
                <div className="text-center">
                    <Spinner message="Authentication..." />
                </div>
            </Modal>);
    }

    renderFailure() {
        if (!this.state.error) return null;
        return (
            <div className="alert alert-danger" role="alert">
                <small><Failure message={this.state.error.message} /></small>
            </div>)
    }

    render() {
        return (
            <div className="container-fluid">
                {this.renderModal()}
                <LogoMini />
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-body">
                                {this.renderFailure()}
                                <form onSubmit={this.handleAuthentication}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-info"><FaUser color="white" /></span>
                                        </div>
                                        <input type="text" className={`form-control ${(this.state.isEmailValid === 'undefined') ? '' : (this.state.isEmailValid) ? 'is-valid' : 'is-invalid'}`} placeholder="e-mail"
                                            value={this.state.username} onChange={this.handleUsernameChange} />
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
                                        <input type="checkbox" checked={this.state.isRemember} onChange={() => this.handleRememberChange()} className="custom-control-input" id="remember" />
                                        <label className="custom-control-label text-secondary" htmlFor="remember">Remember me</label>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" value="Login>>" className="btn btn-info pl-4 pr-4 float-right" />
                                    </div>
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

Login.propTypes = {
    baseUrl: PropTypes.string
};

export default Login;
