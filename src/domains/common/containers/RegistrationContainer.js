import {connect} from "react-redux";
import {reset} from 'redux-form';
import {
    clearClasses,
    clearFaculties,
    clearOrganisations,
    getClasses,
    getDerivedOrganisation,
    getFaculties,
    getOrganisations,
    getRegistered
} from "../actions/registrationActions";
import {getOrgIdSelector, getSavedCredentialsSelector, isLMSSelector} from "../selectors/registrationSelector";
import Registration from "../components/Registration";

const mapStateToProps = state => {
    return {
        isLMS: isLMSSelector(state),
        orgId: getOrgIdSelector(state),
        registration: state.registration,
        savedCredentials: getSavedCredentialsSelector(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDerivedOrganisation: () => dispatch(getDerivedOrganisation()),
        getOrganisations: (isLMS) => dispatch(getOrganisations(isLMS)),
        getFaculties: (orgId, isLMS) => dispatch(getFaculties(orgId, isLMS)),
        getClasses: (facId, isLMS) => dispatch(getClasses(facId, isLMS)),

        clearOrganisations: () => dispatch(clearOrganisations()),
        clearFaculties: () => dispatch(clearFaculties()),
        clearClasses: () => dispatch(clearClasses()),

        getRegistered: (userData, isLMS) => dispatch(getRegistered(userData, isLMS)),
        resetForm: () => dispatch(reset('registration'))
    }
}

const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default RegistrationContainer;