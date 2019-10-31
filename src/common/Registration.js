import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Failure from "./Failure";
import RegistrationSuccess from './RegistrationSuccess';
import RegistrationForm from "./forms/RegistrationForm";
import LoginContainer from "./containers/LoginContainer";
import '../../main.css';

const initialValues = null; /*  {
    name: "Name",
    surname: "Surname",
    password: "dT09Rx06",
    passwordConfirmed: "dT09Rx06",
    email: "student@example.com"
};*/

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regSuccess: false,
            regCancelled: false,
            showPassword: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayPassword = this.displayPassword.bind(this);
    }

    componentDidMount() {
        this.props.isLMS ?
            this.props.getDerivedOrganisation() :
            this.props.getOrganisations(false);
    }

    handleSubmit(formData) {
        const {
            name, surname, email, password,
            affiliation, year
        } = formData;
        const userData = {};
        userData.name = name;
        userData.surname = surname;
        userData.email = email;
        userData.password = password;
        const {orgId, facId, classId} = affiliation;
        const regData = {};
        regData.user = userData;
        regData.orgId = orgId;
        regData.facId = facId;
        regData.classId = classId;
        regData.entranceYear = year;
        //console.log("Submitting regData: ", regData);
        const {isLMS} = this.props;
        this.props.getRegistered(regData, isLMS);
        this.setState({regSuccess: true});
    }

    displayPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    render() {
        const {regCancelled, regSuccess} = this.state;
        if (regCancelled) return <LoginContainer/>;
        const {savedCredentials, registration} = this.props;
        if (regSuccess && savedCredentials) return <RegistrationSuccess/>
        const {isLoading, error} = registration;
        const {isLMS, orgId} = this.props;
        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-header pt-1 pb-1">
                                <small>
                                    <div className="text-secondary text-center">Registration</div>
                                </small>
                            </div>
                            <div className="card-body">
                                {
                                    isLoading &&
                                    <div className="text-center text-info mt-n2 mb-2">
                                            <span>Registering...
                                                <div className="spinner-grow spinner-grow-sm text-info"
                                                     role="uploading"/>
                                            </span>
                                    </div>
                                }
                                {
                                    error &&
                                    <div className="alert alert-danger p-1" role="alert">
                                        <Failure message={error.message}/>
                                    </div>
                                }
                                <RegistrationForm
                                    onSubmit={formData => this.handleSubmit(formData)}
                                    initialValues={initialValues}
                                    isLMS={isLMS}
                                    orgId={orgId}
                                    disabled={registration.isLoading}
                                    showPassword={this.state.showPassword}
                                    displayPassword={this.displayPassword}
                                    registration={registration}
                                    getFaculties={this.props.getFaculties}
                                    getClasses={this.props.getClasses}
                                    clearFaculties={this.props.clearFaculties}
                                    clearClasses={this.props.clearClasses}
                                    resetForm={this.props.resetForm}/>
                            </div>
                            <div className="card-footer pt-1 pb-1">
                                <div className="text-center text-secondary">
                                    <small>
                                        Already registered?
                                        <a href="#" onClick={() => this.setState({regCancelled: true})}>
                                            Login now!
                                        </a>
                                    </small>
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

Registration.propTypes = {
    isLMS: PropTypes.bool.isRequired,
    registration: PropTypes.object,

    getDerivedOrganisation: PropTypes.func.isRequired,
    getOrganisations: PropTypes.func.isRequired,
    getFaculties: PropTypes.func.isRequired,
    getClasses: PropTypes.func.isRequired,
    clearOrganisations: PropTypes.func.isRequired,
    clearFaculties: PropTypes.func.isRequired,
    clearClasses: PropTypes.func.isRequired,
    getRegistered: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
};

export default Registration;
