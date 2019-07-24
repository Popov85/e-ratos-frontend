
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Failure from "./Failure";
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import ApiRegistration from "./ApiRegistration";
import UtilsValidation from './UtilsValidation';
import Utils from './Utils';

import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // In what context we are working now {lms or nonLms}
            isLmsContext: props.regOptions.lms,

            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
            year: "",
            organisation: "",
            faculty: "",
            clazz: "",

            //To be loaded from server
            organisations: [],
            faculties: [],
            classes: [],

            showPassword: false,

            isNameValid: "undefined",
            isSurnameValid: "undefined",
            isEmailValid: "undefined",
            isPasswordValid: "undefined",
            isConfirmPasswordValid: "undefined",
            isPasswordSame: "undefined",

            isOrgValid: "undefined",
            isFacValid: "undefined",
            isClassValid: "undefined",
            isYearValid: "undefined",

            //Sets to true after successful registration
            isRegSuccess: false,

            isLoading: false,
            isOrgLoading: false,
            isFacLoading: false,
            isClassLoading: false,
            orgError: null,
            facError: null,
            classError: null,
            error: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOrgChange = this.handleOrgChange.bind(this);
        this.handleFacChange = this.handleFacChange.bind(this);
        this.errorLoadOrgId = this.errorLoadOrgId.bind(this);
        this.errorLoadOrg = this.errorLoadOrg.bind(this);
        this.errorLoadFac = this.errorLoadFac.bind(this);
        this.errorLoadClasses = this.errorLoadClasses.bind(this);
    }

    componentDidMount() {
        const { isLmsContext} = this.state;
        if (isLmsContext) {
            // If LMS, API call for orgId
            this.loadOrgId();
        } else {
            // Else show list of organisations
            this.reTryLoadOrg();
        }
    }

    loadOrgId() {
        ApiRegistration.loadOrganization(this.errorLoadOrgId).then(orgId => {
            console.log("orgId = ", orgId);
            this.setState({ organisation: orgId });
            this.reTryLoadFac(orgId);
        });
    }

    errorLoadOrgId(error) {
        this.setState({ error: error.message });
    }

    reTryLoadOrg() {
        console.log("Try to load organizations..");
        this.setState({ isOrgLoading: true, orgError: null });
        this.loadOrg();
    }

    loadOrg() {
        const { isLmsContext} = this.state;
        ApiRegistration.loadOrganizations(isLmsContext, this.errorLoadOrg).then(organisations => {
            console.log("organisations = ", organisations);
            if (!organisations) {
                organisations = [];
            } else {
                // Add empty option at the beginning
                organisations.unshift({ orgId: "", name: "Select" });
            }
            this.setState({ isOrgLoading: false, organisations });
        });
    }

    errorLoadOrg(error) {
        this.setState({ isOrgLoading: false, orgError: error.message });
    }

    reTryLoadFac(orgId) {
        console.log("Try to load faculties of orgId = ", orgId);
        this.setState({ isFacLoading: true, facError: null });
        this.loadFac(orgId);
    }

    loadFac(orgId) {
        const { isLmsContext} = this.state;
        ApiRegistration.loadFaculties(isLmsContext, orgId, this.errorLoadFac).then(faculties => {
            console.log("faculties = ", faculties);
            if (!faculties) {
                this.setState({ isFacLoading: false, faculties: [] });
            } else {
                faculties.unshift({ facId: "", name: "Select" });
                this.setState({ isFacLoading: false, faculties: faculties });
            }
        });
    }

    errorLoadFac(error) {
        this.setState({ isFacLoading: false, facError: error.message });
    }

    reTryLoadClasses(facId) {
        console.log("Try to load classes of facId = ", facId);
        this.setState({ isClassLoading: true, classError: null });
        this.loadClasses(facId);
    }

    loadClasses(facId) {
        const { isLmsContext} = this.state;
        ApiRegistration.loadClasses(isLmsContext, facId, this.errorLoadClass).then(classes => {
            console.log("classes = ", classes);
            if (!classes) {
                this.setState({ isClassLoading: false, classes: [] });
            } else {
                classes.unshift({ classId: "", name: "Select" });
                this.setState({ isClassLoading: false, classes: classes });
            }
        });
    }

    errorLoadClasses(error) {
        this.setState({ isClassLoading: false, classError: error.message });
    }

    reTry(action) {
        if (action === "org") {
            this.reTryLoadOrg();
        } else if (action === "fac") {
            this.reTryLoadFac(this.state.organisation);
        } else if (action === "clazz") {
            this.reTryLoadClass(this.state.faculty);
        } else {
            console.error("Wrong retry() method param!");
            return;
        }
    }

    resetForm() {
        if (this.state.isLoading) return;
        const { isLmsContext, organisation } = this.state;
        const org = isLmsContext ? organisation : "undefined";
        this.setState({
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
            year: "",
            organisation: org,
            faculty: "",
            clazz: "",
            showPassword: false,
            isNameValid: "undefined",
            isSurnameValid: "undefined",
            isEmailValid: "undefined",
            isPasswordValid: "undefined",
            isConfirmPasswordValid: "undefined",
            isPasswordSame: "undefined",
            isOrgValid: "undefined",
            isFacValid: "undefined",
            isClassValid: "undefined",
            isYearValid: "undefined",

            error: null
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const regData = this.getRegData();
        console.log("Submitting: ", regData);
        if (!this.validate()) return;
        const { isLmsContext} = this.state;
        const url = Utils.baseUrl() + (isLmsContext ? "/lti/sign-up" : "/sign-up");
        fetch(url, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(regData)
        }).then(response => {
            // TODO: show server message to user!
            if (!response.ok) throw response;
            this.setState({ isRegSuccess: true, isLoading: false });
        }).catch(error => {
            try {
                error.json().then(body => {
                    this.setState({ error: new Error(body.message) });
                });
            } catch (e) {
                this.setState({ error: new Error("Failed to register!") });
            } finally {
                this.setState({ isLoading: false });
            }
        })
    }

    validate() {
        const { name, surname, email, password, confirmPassword, organisation, faculty, clazz, year } = this.state;
        const isNameValid = name.length > 2;
        const isSurnameValid = surname.length > 2;
        const isEmailValid = UtilsValidation.isEmailValid(email);
        const isPasswordValid = UtilsValidation.isPasswordValid(password);
        const isConfirmedPasswordValid = UtilsValidation.isPasswordValid(confirmPassword);
        const isPasswordSame = password === confirmPassword;
        const isOrgValid = UtilsValidation.isSelectValid(organisation);
        const isFacValid = UtilsValidation.isSelectValid(faculty);
        const isClassValid = UtilsValidation.isSelectValid(clazz);
        const isYearValid = UtilsValidation.isSelectValid(year);
        if (!isNameValid || !isSurnameValid || !isEmailValid
            || !isPasswordValid || !isConfirmedPasswordValid
            || !isPasswordSame || !isOrgValid || !isFacValid
            || !isClassValid || !isYearValid) {
            this.setState({
                isNameValid: isNameValid,
                isSurnameValid: isSurnameValid,
                isEmailValid: isEmailValid,
                isPasswordValid: isPasswordValid,
                isConfirmPasswordValid: isConfirmedPasswordValid,
                isPasswordSame: isPasswordSame,
                isOrgValid: isOrgValid,
                isFacValid: isFacValid,
                isClassValid: isClassValid,
                isYearValid: isYearValid,

                isLoading: false,
                error: null
            });
            return false;
        }
        this.setState({
            isNameValid: "undefined",
            isSurnameValid: "undefined",
            isEmailValid: "undefined",
            isPasswordValid: "undefined",
            isConfirmPasswordValid: "undefined",
            isPasswordSame: "undefined",
            isOrgValid: "undefined",
            isFacValid: "undefined",
            isClassValid: "undefined",
            isYearValid: "undefined",

            isLoading: true,
            error: null
        });

        return true;
    }

    getRegData() {
        const { name, surname, email, password } = this.state;
        const userData = {};
        userData.name = name;
        userData.surname = surname;
        userData.email = email;
        userData.password = password;
        const { organisation, faculty, year, clazz } = this.state;
        const regData = {};
        regData.user = userData;
        regData.orgId = organisation;
        regData.facId = faculty;
        regData.classId = clazz;
        regData.entranceYear = year;
        return regData;
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleOrgChange(event) {
        const value = event.target.value;
        this.setState({ organisation: value, faculty: "", clazz: "" });
        this.reTryLoadFac(value);
    }

    handleFacChange(event) {
        const value = event.target.value;
        this.setState({ faculty: value, clazz: "" });
        this.reTryLoadClasses(value);
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
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange} />);
    }

    renderConfirmPassword() {
        return (<input
            name="confirmPassword"
            type={(this.state.showPassword) ? "text" : "password"}
            className={`form-control ${(this.state.isConfirmPasswordValid === 'undefined') ? '' : (this.state.isConfirmPasswordValid) ? 'is-valid' : 'is-invalid'}`}
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange} />);
    }

    renderNameFeedback() {
        const { isNameValid } = this.state;
        if (isNameValid === "undefined") return null;
        if (isNameValid === false) return (<div className="invalid-feedback">Please, provide a valid name..</div>);
        return (<div className="valid-feedback">Name looks good!</div>);
    }

    renderSurnameFeedback() {
        const { isSurnameValid } = this.state;
        if (isSurnameValid === "undefined") return null;
        if (isSurnameValid === false) return (<div className="invalid-feedback">Please, provide a valid surname..</div>);
        return (<div className="valid-feedback">Surname looks good!</div>);
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

    renderConfirmPasswordFeedback() {
        const { isConfirmPasswordValid } = this.state;
        if (isConfirmPasswordValid === "undefined") return null;
        if (isConfirmPasswordValid === false) return (<div className="invalid-feedback">Please, provide a valid password..</div>);
        return (<div className="valid-feedback">Confirmed password looks good!</div>);
    }

    renderSamePasswordsFeedback() {
        const { isPasswordValid, isConfirmPasswordValid, isPasswordSame } = this.state;
        if (isPasswordSame === "undefined" || !isPasswordValid || !isConfirmPasswordValid) return null;
        if (isPasswordSame === false) return (<small><div className="text-danger">Passwords do not match!</div></small>);
    }

    renderOrganisations() {
        if (this.state.isLmsContext) return null;
        return (
            <div>
                <div className="input-group form-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Organisation</label>
                    </div>
                    <select name="organisation" id="inputGroupSelect01" className={`custom-select ${(this.state.isOrgValid === 'undefined') ? '' : (this.state.isOrgValid) ? 'is-valid' : 'is-invalid'}`}
                        value={this.state.organisation} onChange={this.handleOrgChange}>
                        {this.state.organisations.map((o) => <option key={o.orgId} value={o.orgId}>{o.name}</option>)}
                    </select>
                    {
                        this.state.isOrgValid === "undefined" ?
                            null
                            : (this.state.isOrgValid === false ?
                                <div className="invalid-feedback">Please, choose an organisation..</div> :
                                <div className="valid-feedback">Organization is selected!</div>)
                    }
                </div>
                {this.state.isOrgLoading ? this.renderMessageFetching() : this.state.orgError ? this.renderMessageFailure("org") : null}
            </div>);

    }

    renderSubmitting() {
        if (!this.state.isLoading) return null;
        return (
            <div className="text-center text-info mt-n2 mb-2">
                <span>Authorizing...
                <div className="spinner-grow spinner-grow-sm text-info" role="uploading" />
                </span>
            </div>);
    }

    renderSuccess() {
        return (<div className="container-fluid">
            <div className="row mt-5">
                <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                    <div className="card bg-transparent">
                        <div className="card-header pt-1 pb-1">
                            <small><div className="text-secondary text-center">Registration</div></small>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-success text-center p-1" role="success">
                                <strong>Successful registration!</strong>
                            </div>
                            <div className="form-group text-center mb-n1">
                                <button type="button" value="Sign In" className="btn btn-sm btn-success pl-5 pr-5" onClick={() => this.props.didRegister(this.state.email, this.state.password)}>
                                    <div className="align-middle"><FaSignInAlt color="white" /> Sign In</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1 col-sm-2 col-md-3 col-lg-4" />
            </div>
        </div>);
    }

    renderMessageFetching() {
        return (
            <div className="mb-4">
                <small>
                    <span className="text-secondary mt-n3 float-right">
                        Fetching data...
                    </span>
                </small>
            </div>);
    }

    renderMessageFailure(action) {
        return (
            <div className="mb-4">
                <small>
                    <span className="text-danger mt-n3 float-right">
                        Failed to load!&nbsp;
                    <a href="#" className="badge badge-secondary" onClick={() => this.reTry(action)}>ReTry</a>
                    </span>
                </small>
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
        if (this.state.isRegSuccess) return this.renderSuccess();
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-header pt-1 pb-1">
                                <small><div className="text-secondary text-center">Registration</div></small>
                            </div>
                            <div className="card-body">
                                {this.renderSubmitting()}
                                {this.renderFailure()}
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset disabled={(this.state.isLoading) ? true : false}>

                                        <div className="input-group form-group" title="Name">
                                            <input type="text" name="name" className={`form-control ${(this.state.isNameValid === 'undefined') ? '' : (this.state.isNameValid) ? 'is-valid' : 'is-invalid'}`} placeholder="Name"
                                                value={this.state.name} onChange={this.handleInputChange} title="Your first name" />
                                            {this.renderNameFeedback()}
                                        </div>

                                        <div className="input-group form-group" title="Surname">
                                            <input type="text" name="surname" className={`form-control ${(this.state.isSurnameValid === 'undefined') ? '' : (this.state.isSurnameValid) ? 'is-valid' : 'is-invalid'}`} placeholder="Surname"
                                                value={this.state.surname} onChange={this.handleInputChange} />
                                            {this.renderSurnameFeedback()}
                                        </div>

                                        <div className="input-group form-group" title="Email">
                                            <input type="email" name="email" className={`form-control ${(this.state.isEmailValid === 'undefined') ? '' : (this.state.isEmailValid) ? 'is-valid' : 'is-invalid'}`} placeholder="email@example.com"
                                                value={this.state.email} onChange={this.handleInputChange} />
                                            {this.renderEmailFeedback()}
                                        </div>

                                        <div className="input-group form-group" title="Password">
                                            {this.renderPassword()}
                                            {this.renderPasswordFeedback()}
                                        </div>

                                        <div className="input-group form-group mt-n2" title="Confirm password">
                                            {this.renderConfirmPassword()}
                                            {this.renderConfirmPasswordFeedback()}
                                            {this.renderSamePasswordsFeedback()}
                                        </div>

                                        <div className="text-right mt-n3 mb-n2" title="Change password visibility">
                                            <a href="#" className="badge badge-secondary pl-2 pr-2" onClick={() => this.switchVisibility()}>
                                                {(this.state.showPassword) ? <FaEye color="white" /> : <FaEyeSlash color="white" />}
                                            </a>
                                        </div>

                                        <hr />

                                        {this.renderOrganisations()}

                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="inputGroupSelect02">Faculty</label>
                                            </div>
                                            <select name="faculty" id="inputGroupSelect02" className={`custom-select ${(this.state.isFacValid === 'undefined') ? '' : (this.state.isFacValid) ? 'is-valid' : 'is-invalid'}`}
                                                value={this.state.faculty} onChange={this.handleFacChange}>
                                                {this.state.faculties.map((item) => <option key={item.facId} value={item.facId}>{item.name}</option>)}
                                            </select>
                                            {
                                                this.state.isFacValid === "undefined" ?
                                                    null
                                                    : (this.state.isFacValid === false ?
                                                        <div className="invalid-feedback">Please, choose a faculty..</div> :
                                                        <div className="valid-feedback">Faculty is selected!</div>)
                                            }
                                        </div>

                                        {this.state.isFacLoading ? this.renderMessageFetching() : this.state.facError ? this.renderMessageFailure("fac") : null}

                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="inputGroupSelect03">Class</label>
                                            </div>
                                            <select name="clazz" id="inputGroupSelect03" className={`custom-select ${(this.state.isClassValid === 'undefined') ? '' : (this.state.isClassValid) ? 'is-valid' : 'is-invalid'}`}
                                                value={this.state.clazz} onChange={this.handleInputChange}>
                                                {this.state.classes.map((item) => <option key={item.classId} value={item.classId}>{item.name}</option>)}
                                            </select>
                                            {
                                                this.state.isClassValid === "undefined" ?
                                                    null
                                                    : (this.state.isClassValid === false ?
                                                        <div className="invalid-feedback">Please, choose a class..</div> :
                                                        <div className="valid-feedback">Class is selected!</div>)
                                            }
                                        </div>

                                        {this.state.isClassLoading ? this.renderMessageFetching() : this.state.classError ? this.renderMessageFailure("clazz") : null}

                                        <div className="input-group form-group w-50" title="Entrance year">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="inputGroupSelect04">Year</label>
                                            </div>
                                            <select name="year" id="inputGroupSelect04" className={`custom-select ${(this.state.isYearValid === 'undefined') ? '' : (this.state.isYearValid) ? 'is-valid' : 'is-invalid'}`}
                                                value={this.state.year} onChange={this.handleInputChange}>
                                                <option value={null}></option>
                                                <option value={2017}>2017</option>
                                                <option value={2018}>2018</option>
                                                <option value={2019}>2019</option>
                                                <option value={2020}>2020</option>
                                                <option value={2021}>2021</option>
                                                <option value={2022}>2022</option>
                                                <option value={2023}>2023</option>
                                                <option value={2024}>2024</option>
                                                <option value={2025}>2025</option>
                                            </select>
                                            {
                                                this.state.isYearValid === "undefined" ?
                                                    null
                                                    : (this.state.isYearValid === false ?
                                                        <div className="invalid-feedback">Please, provide year of entrance..</div> :
                                                        <div className="valid-feedback">Entrance year looks good!</div>)
                                            }
                                        </div>

                                        <div className="form-group text-center mb-n1">
                                            <button type="submit" value="Sign Up" className="btn btn-sm btn-success pl-5 pr-5" >
                                                <div className="align-middle"><FaSignInAlt color="white" /> Sign Up</div>
                                            </button>
                                        </div>

                                        <div className="form-group text-center mt-2 mb-n3">
                                            <a href="#" className="badge badge-secondary" onClick={() => this.resetForm()}>Reset</a>
                                        </div>

                                    </fieldset>
                                </form>
                            </div>
                            <div className="card-footer pt-1 pb-1">
                                <div className="text-center text-secondary">
                                    <small>Already registered? <a href="#" onClick={() => this.props.doLogin()}>Login now!</a></small>
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

Registration.propTypes = {
    regOptions: PropTypes.object.isRequired, // { lms: false, allowed: true },
    didRegister: PropTypes.func.isRequired,
    doLogin: PropTypes.func.isRequired
};

export default Registration;
