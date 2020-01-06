import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Faculties from "../components/Faculties";
import {
    clearAllFacFailures,
    deleteFac,
    getAllFacultiesByOrganisation,
    getAllFacultiesByRatos, updateFacName, updateFacOrg
} from "../actions/facultiesActions";
import {getAllOrgForFilter} from "../selectors/organisationsSelector";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        faculties: state.faculties,
        organisations: getAllOrgForFilter(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllFacultiesByRatos: () => dispatch(getAllFacultiesByRatos()),
        getAllFacultiesByOrganisation: () => dispatch(getAllFacultiesByOrganisation()),
        clearAllFacFailures: () => dispatch(clearAllFacFailures()),
        updateFacName: (facId, name) => dispatch(updateFacName(facId, name)),
        deleteFac: (facId) => dispatch(deleteFac(facId)),
    }
}

const FacultiesContainer = connect(mapStateToProps, mapDispatchToProps)(Faculties);

export default FacultiesContainer;