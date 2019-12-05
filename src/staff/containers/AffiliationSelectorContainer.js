import React from 'react';
import {connect} from "react-redux";

import {getRole} from "../../common/selectors/userSelector";
import {
    clearAllOnFacultyReset,
    clearAllOnOrganisationReset,
    clearLoadingFailure,
    getAllDepartmentsForSelectorByFacultyId,
    getAllFacultiesForSelectorByOrganisationId,
    initAffiliationSelector,
    setExistingDepartmentsForSelector,
    setExistingFacultiesForSelector,
    setExistingOrganisationsForSelector
} from "../actions/affiliationSelectorActions";
import AffiliationSelector from "../components/AffiliationSelector";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        affiliationSelector: state.affiliationSelector
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initAffiliationSelector: (role, affiliationSelector)=>dispatch(initAffiliationSelector(role, affiliationSelector)),

        setExistingOrganisationsForSelector: (key) =>dispatch(setExistingOrganisationsForSelector(key)),
        setExistingFacultiesForSelector: (key) =>dispatch(setExistingFacultiesForSelector(key)),
        setExistingDepartmentsForSelector: (key) =>dispatch(setExistingDepartmentsForSelector(key)),

        getAllFacultiesForSelectorByOrganisationId: (orgId, affiliationSelector)=>dispatch(getAllFacultiesForSelectorByOrganisationId(orgId, affiliationSelector)),
        getAllDepartmentsForSelectorByFacultyId: (facId, affiliationSelector)=>dispatch(getAllDepartmentsForSelectorByFacultyId(facId, affiliationSelector)),

        clearAllOnOrganisationReset: ()=>dispatch(clearAllOnOrganisationReset()),
        clearAllOnFacultyReset: ()=>dispatch(clearAllOnFacultyReset()),

        clearLoadingFailure: ()=>dispatch(clearLoadingFailure()),
    }
}

const AffiliationSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(AffiliationSelector);

export default AffiliationSelectorContainer;